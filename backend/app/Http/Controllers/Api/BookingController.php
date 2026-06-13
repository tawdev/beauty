<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'booking_time' => 'required|date|after:now',
        ]);

        $validatedUser = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $user = \App\Models\User::firstOrCreate(
            ['email' => $validatedUser['email']],
            [
                'name' => $validatedUser['name'],
                'password' => bcrypt(\Illuminate\Support\Str::random(16)),
                'role' => 'customer',
            ]
        );
        $userId = $user->id;

        $alreadyBooked = Booking::where('service_id', $validated['service_id'])
            ->where('booking_time', $validated['booking_time'])
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($alreadyBooked) {
            return response()->json([
                'message' => 'This booking slot is already reserved.',
            ], 422);
        }

        $booking = Booking::create([
            'user_id' => $userId,
            'service_id' => $validated['service_id'],
            'booking_time' => $validated['booking_time'],
            'status' => 'pending',
        ]);

        return response()->json($booking, 201);
    }
}
