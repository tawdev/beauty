<?php
 
namespace App\Http\Controllers\Api;
 
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
 
class AdminController extends Controller
{
    public function stats()
    {
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $totalOrders = Order::count();
        $totalBookings = Booking::count();
        $totalProducts = Product::count();
 
        // Recent Bookings & Orders for Overview feeds
        $recentBookings = Booking::with(['user', 'service'])
            ->latest()
            ->limit(5)
            ->get();
 
        $recentOrders = Order::with(['user', 'items.product'])
            ->latest()
            ->limit(5)
            ->get();
 
        return response()->json([
            'metrics' => [
                'total_revenue' => (float) $totalRevenue,
                'total_orders' => $totalOrders,
                'total_bookings' => $totalBookings,
                'total_products' => $totalProducts,
            ],
            'recent_bookings' => $recentBookings,
            'recent_orders' => $recentOrders,
        ]);
    }
 
    public function bookings()
    {
        $bookings = Booking::with(['user', 'service'])
            ->latest()
            ->get();
 
        return response()->json($bookings);
    }
 
    public function updateBooking(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,completed,cancelled',
        ]);
 
        $booking = Booking::with(['user', 'service'])->find($id);
 
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }
 
        $booking->update([
            'status' => $validated['status'],
        ]);
 
        return response()->json($booking);
    }
 
    public function orders()
    {
        $orders = Order::with(['user', 'items.product'])
            ->latest()
            ->get();
 
        return response()->json($orders);
    }
 
    public function updateOrder(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
        ]);
 
        $order = Order::with(['user', 'items.product'])->find($id);
 
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
 
        $order->update([
            'status' => $validated['status'],
        ]);
 
        return response()->json($order);
    }
}
