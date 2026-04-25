<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * AfricasTalkingService
 *
 * Thin wrapper around the Africa's Talking SMS API.
 * Uses HTTP directly so you don't need the PHP SDK package —
 * just set these in your .env:
 *
 *   AT_API_KEY=atsk_your_key_here
 *   AT_USERNAME=sandbox          ← use "sandbox" for dev, your AT username for prod
 *   AT_ENV=sandbox               ← "sandbox" or "production"
 */
class AfricasTalkingService
{
    private string $apiKey;
    private string $username;
    private string $smsUrl;

    public function __construct()
    {
        $this->apiKey   = config('services.africastalking.api_key');
        $this->username = config('services.africastalking.username');

        $env = config('services.africastalking.env', 'sandbox');

        $this->smsUrl = $env === 'production'
            ? 'https://api.africastalking.com/version1/messaging'
            : 'https://api.sandbox.africastalking.com/version1/messaging';
    }

    /**
     * Send an SMS to one recipient.
     *
     * @param  string $to      E.164 format e.g. +255612422001
     * @param  string $message Plain text, no special characters
     */
    public function sendSms(string $to, string $message): void
    {
        try {
            Log::info('AT SMS sending', [
                'to'      => $to,
                'message' => $message,
            ]);

            $response = Http::withHeaders([
                'apiKey' => $this->apiKey,
                'Accept' => 'application/json',
            ])->asForm()->post($this->smsUrl, [
                'username' => $this->username,
                'to'       => $to,
                'message'  => $message,
            ]);

            Log::info('AT SMS sent', [
                'to'       => $to,
                'status'   => $response->status(),
                'response' => $response->json(),
            ]);
        } catch (\Throwable $e) {
            // Never let an SMS failure kill the USSD response
            Log::error('AT SMS failed', [
                'to'    => $to,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
