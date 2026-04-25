<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\UssdService;
use Illuminate\Support\Facades\Log;

class UssdController extends Controller
{
    public function __construct(protected UssdService $ussd) {}

    /**
     * Main USSD callback — Africa's Talking POSTs here on every user interaction.
     * Route: POST /ussd/callback  (CSRF excluded)
     */
    public function handle(Request $request): Response
    {
        $sessionId   = $request->input('sessionId', '');
        $phoneNumber = $request->input('phoneNumber', '');
        $text        = $request->input('text', '');

        Log::info('USSD request', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'text'        => $text,
        ]);

        $response = $this->ussd->processMenu($sessionId, $phoneNumber, $text);

        Log::info('USSD response', [
            'sessionId'  => $sessionId,
            'type'       => str_starts_with($response, 'CON') ? 'CON' : 'END',
            'response'   => $response,
        ]);

        return response($response, 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * End-of-session notification — Africa's Talking POSTs here when a session closes.
     * Route: POST /ussd/notify  (CSRF excluded)
     */
    public function notify(Request $request): Response
    {
        Log::info('USSD session ended', [
            'sessionId'        => $request->input('sessionId'),
            'phoneNumber'      => $request->input('phoneNumber'),
            'status'           => $request->input('status'),        // Success | Incomplete | Failed
            'durationInMillis' => $request->input('durationInMillis'),
            'hopsCount'        => $request->input('hopsCount'),
            'cost'             => $request->input('cost'),
            'input'            => $request->input('input'),
            'lastAppResponse'  => $request->input('lastAppResponse'),
            'errorMessage'     => $request->input('errorMessage'),  // only on Failed
        ]);

        return response('OK', 200);
    }
}
