<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {
        $validated = $request->validate([
            'user' => 'required|string',
            'amount' => 'required|numeric|min:1',
        ]);

        // Simulate payment processing (replace with real payment logic)
        $success = rand(0, 1); // Random success/failure for testing

        return response()->json(['success' => $success]);
    }
}
