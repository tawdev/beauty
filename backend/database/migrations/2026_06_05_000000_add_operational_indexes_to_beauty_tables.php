<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index(['category_id', 'created_at']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->index(['status', 'created_at']);
            $table->index(['service_id', 'booking_time']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->index(['status', 'created_at']);
            $table->index(['user_id', 'created_at']);
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->index(['product_id', 'created_at']);
            $table->index(['service_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex(['product_id', 'created_at']);
            $table->dropIndex(['service_id', 'created_at']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['status', 'created_at']);
            $table->dropIndex(['user_id', 'created_at']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex(['status', 'created_at']);
            $table->dropIndex(['service_id', 'booking_time']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['category_id', 'created_at']);
        });
    }
};
