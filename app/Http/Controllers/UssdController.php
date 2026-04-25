<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\UssdService;
use Illuminate\Support\Facades\Log;
use Throwable;

class UssdController extends Controller
{
    public function __construct(protected UssdService $ussd) {}

    public function handle(Request $request): Response
    {
        $request->headers->set('Accept', 'application/json');

        $sessionId   = $request->input('sessionId', '');
        $phoneNumber = $request->input('phoneNumber', '');
        $text        = $request->input('text') ?? ''; // null → '' (fixes ConvertEmptyStringsToNull)

        Log::info('USSD request', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'text'        => $text,
        ]);

        try {
            $response = $this->ussd->processMenu($sessionId, $phoneNumber, $text);
        } catch (Throwable $e) {
            Log::error('USSD handler crashed', [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ]);
            $response = 'END Sorry, something went wrong. Please try again.';
        }

        return response($response, 200)
            ->header('Content-Type', 'text/plain');
    }

    public function notify(Request $request): Response
    {
        $request->headers->set('Accept', 'application/json');

        try {
            Log::info('USSD session ended', [
                'sessionId'        => $request->input('sessionId'),
                'phoneNumber'      => $request->input('phoneNumber'),
                'status'           => $request->input('status'),
                'durationInMillis' => $request->input('durationInMillis'),
                'hopsCount'        => $request->input('hopsCount'),
                'cost'             => $request->input('cost'),
                'input'            => $request->input('input'),
                'lastAppResponse'  => $request->input('lastAppResponse'),
                'errorMessage'     => $request->input('errorMessage'),
            ]);
        } catch (Throwable $e) {
            Log::error('USSD notify crashed', ['error' => $e->getMessage()]);
        }

        return response('OK', 200)->header('Content-Type', 'text/plain');
    }
}
