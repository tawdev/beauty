<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'logo_url',
        'email',
        'phone',
        'address',
        'facebook_url',
        'instagram_url',
        'twitter_url',
    ];

    public static function current(): self
    {
        return static::first() ?: static::create([
            'site_name' => "Maison d'Eclat",
            'email' => 'hello@maison.com',
            'phone' => '+212 600-000000',
            'address' => '123 Beauty Avenue, Casablanca',
            'facebook_url' => '#',
            'instagram_url' => '#',
            'twitter_url' => '#',
        ]);
    }
}
