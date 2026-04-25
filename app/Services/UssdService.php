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

        return match (true) {
            // ── Level 0: first dial ──────────────────────────────────────────────
            $depth === 0 => $this->showWelcome(),

            // ── Level 1: PIN entered ─────────────────────────────────────────────
            $depth === 1 => $this->handlePin($parts[0], $phoneNumber),

            // ── Level 2: menu option chosen ──────────────────────────────────────
            $depth === 2 => $this->handleMenuOption($parts[0], $parts[1], $phoneNumber, $sessionId),

            // ── Fallback ─────────────────────────────────────────────────────────
            default => "END Invalid option. Please dial again.",
        };
    }

    // ─── Level 0 ─────────────────────────────────────────────────────────────────

    private function showWelcome(): string
    {
        return "CON Welcome to SmartRental\n"
            . "Please enter your PIN:";
    }

    // ─── Level 1: PIN validation ──────────────────────────────────────────────────

    private function handlePin(string $pin, string $phoneNumber): string
    {
        $tenant = $this->findTenant($phoneNumber);

        if (!$tenant || $pin !== $tenant['pin']) {
            return "END Invalid PIN. Please try again.";
        }

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
        $tenant = $this->findTenant($phoneNumber);

        if (!$tenant || $pin !== $tenant['pin']) {
            return "END Session expired. Please dial again.";
        }

        return match ($choice) {
            '1' => $this->viewDueDate($tenant),
            '2' => $this->viewRoom($tenant),
            '3' => $this->generatePayment($tenant, $phoneNumber),
            '4' => $this->viewReceipt($tenant),
            '0' => "END Thank you for using SmartRental. Goodbye!",
            default => "END Invalid choice. Please dial again.",
        };
    }

    // ─── Menu actions ─────────────────────────────────────────────────────────────

    private function viewDueDate(array $tenant): string
    {
        return "END Your rent of {$tenant['rentAmount']} is due on {$tenant['dueDate']}.";
    }

    private function viewRoom(array $tenant): string
    {
        return "END Your assigned room is {$tenant['room']}, {$tenant['floor']}.";
    }

    private function generatePayment(array $tenant, string $phoneNumber): string
    {
        // Generate simulated GePG control number
        $controlNumber = 'GEPG-' . random_int(100000, 999999);

        // Send SMS to the caller's number (not hardcoded phone)
        $smsMessage = "SmartRental: Your GePG control number is {$controlNumber}. "
            . "Pay {$tenant['rentAmount']} via Vodacom, Airtel, Tigo, or Halotel.";

        $this->at->sendSms($phoneNumber, $smsMessage);

        return "END Your GePG control number is {$controlNumber}.\n"
            . "Pay via Vodacom, Airtel, Tigo, Halotel, or Bank.\n"
            . "Details sent to your phone via SMS.";
    }

    private function viewReceipt(array $tenant): string
    {
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
    private function findTenant(string $phoneNumber): ?array
    {
        // Demo: match any caller to the single demo tenant
        // (Africa's Talking sandbox always sends the registered test number)
        if ($phoneNumber === $this->demoTenant['phone'] || app()->environment('local', 'staging')) {
            return $this->demoTenant;
        }

        // Production lookup (uncomment when you have a tenants table):
        // $tenant = Tenant::where('phone', $phoneNumber)->first();
        // return $tenant?->toArray();

        return null;
    }
}
