<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WebsiteSettingController extends Controller
{
    public function show()
    {
        return response()->json(WebsiteSetting::current());
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'logo_url' => 'nullable|string|max:2048',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:1000',
            'facebook_url' => 'nullable|string|max:2048',
            'instagram_url' => 'nullable|string|max:2048',
            'twitter_url' => 'nullable|string|max:2048',
        ]);

        $settings = WebsiteSetting::current();
        $settings->update($validated);

        return response()->json($settings->fresh());
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $path = $request->file('logo')->store('logos', 'public');

        $url = Storage::disk('public')->url($path);

        $settings = WebsiteSetting::current();
        $settings->update(['logo_url' => $url]);

        return response()->json(['logo_url' => $url]);
    }
}
