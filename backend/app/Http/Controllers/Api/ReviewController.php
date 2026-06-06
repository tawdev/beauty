<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'product_id' => 'sometimes|integer|exists:products,id',
            'service_id' => 'sometimes|integer|exists:services,id',
        ]);

        $query = Review::with('user');

        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        if ($request->has('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required_without:service_id|prohibited_with:service_id|exists:products,id',
            'service_id' => 'required_without:product_id|exists:services,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:2000',
        ]);

        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'] ?? null,
            'service_id' => $validated['service_id'] ?? null,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json($review, 201);
    }
}
