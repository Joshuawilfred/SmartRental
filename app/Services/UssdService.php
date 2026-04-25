<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * UssdService
 *
 * Handles all menu logic for the SmartRental USSD flow.
 *
 * Session state is carried entirely by the `$text` field that Africa's Talking
 * concatenates on every request (values separated by *). No DB session table needed.
 *
 * Menu tree:
 *   ""          → Welcome, enter PIN
 *   "PIN"       → PIN check → main menu (CON) or END Invalid PIN
 *   "PIN*1"     → View due date
 *   "PIN*2"     → Room / floor number
 *   "PIN*3"     → Generate GePG control number + send SMS
 *   "PIN*4"     → Last payment receipt
 *   "PIN*0"     → Exit
 */
class UssdService
{
    // ─── Hardcoded demo tenant (swap for DB lookup in production) ───────────────
    private array $demoTenant = [
        'pin'         => '1234',
        'phone'       => '+255612422001',
        'name'        => 'John Doe',
        'room'        => 'B12',
        'floor'       => '2nd Floor',
        'dueDate'     => '30th April 2026',
        'rentAmount'  => 'TZS 200,000',
        'lastPayment' => 'TZS 200,000 on 1st April 2026',
    ];

    public function __construct(protected AfricasTalkingService $at) {}

    // ─── Main entry point ────────────────────────────────────────────────────────

    public function processMenu(string $sessionId, string $phoneNumber, string $text): string
    {
        // AT sometimes sends a trailing * — strip it
        $text  = rtrim($text, '*');
        $parts = $text === '' ? [] : explode('*', $text);
        $depth = count($parts);

        Log::info('USSD processMenu', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'text'        => $text,
            'depth'       => $depth,
        ]);

        return match (true) {
            // ── Level 0: first dial ──────────────────────────────────────────────
            $depth === 0 => $this->showWelcome($sessionId, $phoneNumber),

            // ── Level 1: PIN entered ─────────────────────────────────────────────
            $depth === 1 => $this->handlePin($parts[0], $phoneNumber, $sessionId),

            // ── Level 2: menu option chosen ──────────────────────────────────────
            $depth === 2 => $this->handleMenuOption($parts[0], $parts[1], $phoneNumber, $sessionId),

            // ── Fallback ─────────────────────────────────────────────────────────
            default => $this->logAndEnd($sessionId, $phoneNumber, 'fallback', "END Invalid option. Please dial again."),
        };
    }

    // ─── Level 0 ─────────────────────────────────────────────────────────────────

    private function showWelcome(string $sessionId, string $phoneNumber): string
    {
        Log::info('USSD session started', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
        ]);

        return "CON Welcome to SmartRental\n"
            . "Please enter your PIN:";
    }

    // ─── Level 1: PIN validation ──────────────────────────────────────────────────

    private function handlePin(string $pin, string $phoneNumber, string $sessionId): string
    {
        $tenant = $this->findTenant($phoneNumber, $sessionId);

        if (!$tenant || $pin !== $tenant['pin']) {
            Log::warning('USSD PIN invalid', [
                'sessionId'   => $sessionId,
                'phoneNumber' => $phoneNumber,
                'tenantFound' => $tenant !== null,
            ]);
            return "END Invalid PIN. Please try again.";
        }

        Log::info('USSD PIN accepted, showing main menu', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
        ]);

        return "CON Login successful!\n"
            . "1. View Due Date\n"
            . "2. Room/Floor Number\n"
            . "3. Payment\n"
            . "4. Receipts\n"
            . "0. Exit";
    }

    // ─── Level 2: menu options ────────────────────────────────────────────────────

    private function handleMenuOption(
        string $pin,
        string $choice,
        string $phoneNumber,
        string $sessionId
    ): string {
        // Re-validate PIN at every depth so session cannot be forged
        $tenant = $this->findTenant($phoneNumber, $sessionId);

        if (!$tenant || $pin !== $tenant['pin']) {
            Log::warning('USSD PIN re-validation failed', [
                'sessionId'   => $sessionId,
                'phoneNumber' => $phoneNumber,
            ]);
            return "END Session expired. Please dial again.";
        }

        Log::info('USSD menu option selected', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'choice'      => $choice,
        ]);

        return match ($choice) {
            '1' => $this->viewDueDate($tenant, $sessionId, $phoneNumber),
            '2' => $this->viewRoom($tenant, $sessionId, $phoneNumber),
            '3' => $this->generatePayment($tenant, $phoneNumber, $sessionId),
            '4' => $this->viewReceipt($tenant, $sessionId, $phoneNumber),
            '0' => $this->logAndEnd($sessionId, $phoneNumber, 'exit', "END Thank you for using SmartRental. Goodbye!"),
            default => $this->logAndEnd($sessionId, $phoneNumber, 'invalid_choice', "END Invalid choice. Please dial again."),
        };
    }

    // ─── Menu actions ─────────────────────────────────────────────────────────────

    private function viewDueDate(array $tenant, string $sessionId, string $phoneNumber): string
    {
        Log::info('USSD action: view due date', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'dueDate'     => $tenant['dueDate'],
            'rentAmount'  => $tenant['rentAmount'],
        ]);

        return "END Your rent of {$tenant['rentAmount']} is due on {$tenant['dueDate']}.";
    }

    private function viewRoom(array $tenant, string $sessionId, string $phoneNumber): string
    {
        Log::info('USSD action: view room', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'room'        => $tenant['room'],
            'floor'       => $tenant['floor'],
        ]);

        return "END Your assigned room is {$tenant['room']}, {$tenant['floor']}.";
    }

    private function generatePayment(array $tenant, string $phoneNumber, string $sessionId): string
    {
        // Generate simulated GePG control number
        $controlNumber = 'GEPG-' . random_int(100000, 999999);

        Log::info('USSD action: GePG control number generated', [
            'sessionId'     => $sessionId,
            'phoneNumber'   => $phoneNumber,
            'controlNumber' => $controlNumber,
            'rentAmount'    => $tenant['rentAmount'],
        ]);

        // Send SMS to the caller's number (not hardcoded phone)
        $smsMessage = "SmartRental: Your GePG control number is {$controlNumber}. "
            . "Pay {$tenant['rentAmount']} via Vodacom, Airtel, Tigo, or Halotel.";

        $this->at->sendSms($phoneNumber, $smsMessage);

        return "END Your GePG control number is {$controlNumber}.\n"
            . "Pay via Vodacom, Airtel, Tigo, Halotel, or Bank.\n"
            . "Details sent to your phone via SMS.";
    }

    private function viewReceipt(array $tenant, string $sessionId, string $phoneNumber): string
    {
        Log::info('USSD action: view receipt', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'lastPayment' => $tenant['lastPayment'],
        ]);

        return "END Last payment: {$tenant['lastPayment']}.";
    }

    // ─── Tenant lookup ────────────────────────────────────────────────────────────

    /**
     * Find tenant by phone number.
     *
     * For the hackathon demo this matches the hardcoded tenant.
     * For production: replace with  Tenant::where('phone', $phone)->first()
     * and return $tenant->toArray() or null.
     */
    private function findTenant(string $phoneNumber, string $sessionId): ?array
    {
        // Demo: match any caller to the single demo tenant
        // (Africa's Talking sandbox always sends the registered test number)
        if ($phoneNumber === $this->demoTenant['phone'] || app()->environment('local', 'staging')) {
            Log::debug('USSD tenant lookup: found', [
                'sessionId'   => $sessionId,
                'phoneNumber' => $phoneNumber,
            ]);
            return $this->demoTenant;
        }

        Log::warning('USSD tenant lookup: not found', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
        ]);

        // Production lookup (uncomment when you have a tenants table):
        // $tenant = Tenant::where('phone', $phoneNumber)->first();
        // return $tenant?->toArray();

        return null;
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────────

    private function logAndEnd(string $sessionId, string $phoneNumber, string $reason, string $message): string
    {
        Log::info('USSD session ending', [
            'sessionId'   => $sessionId,
            'phoneNumber' => $phoneNumber,
            'reason'      => $reason,
        ]);

        return $message;
    }
}
