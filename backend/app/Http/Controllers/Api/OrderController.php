<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1|max:50',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string|max:2000',
        ]);

        return DB::transaction(function () use ($validated) {
            $quantitiesByProduct = collect($validated['items'])
                ->groupBy('product_id')
                ->map(fn ($items) => $items->sum('quantity'));

            $productIds = $quantitiesByProduct->keys();
            $products = Product::whereIn('id', $productIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $totalAmount = 0;
            $items = [];

            foreach ($quantitiesByProduct as $productId => $quantity) {
                $product = $products->get($productId);

                if (!$product || $product->stock < $quantity) {
                    abort(422, 'Insufficient stock for one or more products.');
                }

                $lineTotal = (float) $product->price * $quantity;
                $totalAmount += $lineTotal;
                $items[] = [$product, $quantity];
            }

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'shipping_address' => $validated['shipping_address'],
            ]);

            foreach ($items as [$product, $quantity]) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                ]);

                $product->decrement('stock', $quantity);
            }

            return response()->json($order->load('items.product'), 201);
        });
    }
}
