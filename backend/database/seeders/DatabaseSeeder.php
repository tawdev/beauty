<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::firstOrCreate(
            ['email' => 'admin@maison.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('marocmaroc'),
                'role' => 'admin',
            ]
        );

        $this->call([
            BeautySeeder::class,
        ]);
    }
}
