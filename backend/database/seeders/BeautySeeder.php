<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Database\Seeder;

class BeautySeeder extends Seeder
{
    public function run(): void
    {
        $skincare = Category::firstOrCreate(
            ['slug' => 'skincare'],
            ['name' => 'Skincare']
        );

        $makeup = Category::firstOrCreate(
            ['slug' => 'makeup'],
            ['name' => 'Makeup']
        );

        $haircare = Category::firstOrCreate(
            ['slug' => 'haircare'],
            ['name' => 'Haircare']
        );

        $this->seedProducts($skincare->id, [
            [
                'name' => 'Glow Serum',
                'slug' => 'glow-serum',
                'price' => 45.00,
                'description' => 'Radiance-boosting serum with Vitamin C for a bright, healthy complexion.',
                'stock' => 15,
                'image_url' => 'https://i.pinimg.com/736x/6d/22/88/6d228876ceedf85c2d12b43771e524ec.jpg'
            ],
            [
                'name' => 'Hydrating Cream',
                'slug' => 'hydrating-cream',
                'price' => 52.00,
                'description' => '24-hour moisture lock for all skin types, leaving skin soft and supple.',
                'stock' => 8,
                'image_url' => 'https://i.pinimg.com/736x/5f/e3/52/5fe3522fe48ed25387c562231641cdb2.jpg'
            ],
            [
                'name' => 'Purifying Clay Mask',
                'slug' => 'purifying-clay-mask',
                'price' => 30.00,
                'description' => 'Deeply cleanses pores and removes impurities for a refined skin texture.',
                'stock' => 20,
                'image_url' => 'https://i.pinimg.com/736x/6f/53/04/6f53041fc531c28943ac6b3fe179bd48.jpg'
            ],
            [
                'name' => 'Rosewater Toner',
                'slug' => 'rosewater-toner',
                'price' => 25.00,
                'description' => 'Refreshing and soothing facial mist to balance and hydrate the skin',
                'stock' => 25,
                'image_url' => 'https://i.pinimg.com/736x/ce/e0/53/cee053b484ebad3e3594d34dc77c516a.jpg'
            ],
            [
                'name' => 'Vitamin C Eye Cream',
                'slug' => 'vitamin-c-eye-cream',
                'price' => 48.00,
                'description' => 'Brightens dark circles and reduces puffiness for a well-rested look.',
                'stock' => 12,
                'image_url' => 'https://i.pinimg.com/736x/c4/08/a0/c408a00fafe5d71989048face22f9b7c.jpg'
            ],
            [
                'name' => 'Exfoliating Scrub',
                'slug' => 'exfoliating-scrub',
                'price' => 22.00,
                'description' => 'Gentle scrub to remove dead skin cells and reveal a smoother surface.',
                'stock' => 18,
                'image_url' => 'https://i.pinimg.com/1200x/29/1d/cb/291dcbff905eec2dec3296bdd5b94225.jpg'
            ],
           
        ]);

        $this->seedProducts($makeup->id, [
            [
                'name' => 'Velvet Lipstick',
                'slug' => 'velvet-lipstick',
                'price' => 28.00,
                'description' => 'Long-lasting matte finish in classic red with a comfortable, velvety feel.',
                'stock' => 25,
                'image_url' => 'https://i.pinimg.com/1200x/b4/9b/2e/b49b2efebfb190c957d7628997708b4b.jpg'
            ],
            [
                'name' => 'Luminous Foundation',
                'slug' => 'luminous-foundation',
                'price' => 42.00,
                'description' => 'Medium-to-full coverage foundation for a flawless, natural glow.',
                'stock' => 10,
                'image_url' => 'https://i.pinimg.com/736x/56/a3/01/56a3013699b2ae5887e48f36db6d6388.jpg'
            ],
            [
                'name' => 'Volumizing Mascara',
                'slug' => 'volumizing-mascara',
                'price' => 24.00,
                'description' => 'Intensely black formula that lifts, lengthens, and volumizes lashes.',
                'stock' => 30,
                'image_url' => 'https://i.pinimg.com/1200x/5c/bc/d5/5cbcd5e079944d08a7e52c83ee86b2eb.jpg'
            ],
            [
                'name' => 'Champagne Highlighter',
                'slug' => 'champagne-highlighter',
                'price' => 32.00,
                'description' => 'Silky powder highlighter for a stunning, pearlescent glow.',
                'stock' => 15,
                'image_url' => 'https://i.pinimg.com/1200x/08/73/57/0873573b2c7d99ea77cd8a546401b5f0.jpg'
            ],
            [
                'name' => 'Matte Eyeshadow Palette',
                'slug' => 'matte-eyeshadow-palette',
                'price' => 55.00,
                'description' => '12 highly pigmented warm matte shades for everyday looks.',
                'stock' => 5,
                'image_url' => 'https://i.pinimg.com/736x/bf/dc/0d/bfdc0dbe93b10f1ee47ba02fe791884c.jpg'
            ],
            [
                'name' => 'Precision Eyeliner',
                'slug' => 'precision-eyeliner',
                'price' => 20.00,
                'description' => 'Waterproof liquid eyeliner with an ultra-fine tip for precise application.',
                'stock' => 40,
                'image_url' => 'https://i.pinimg.com/1200x/ba/94/5a/ba945abde109f49615da1f6436aed996.jpg'
            ],
        ]);

        $this->seedProducts($haircare->id, [
            [
                'name' => 'Argan Oil Mask',
                'slug' => 'argan-oil-mask',
                'price' => 35.00,
                'description' => 'Deep conditioning treatment for dry and damaged hair, enriched with pure Argan oil.',
                'stock' => 10,
                'image_url' => 'https://i.pinimg.com/736x/ef/bc/32/efbc3287f76b235ade86cb3adacbdbd2.jpg'
            ],
            [
                'name' => 'Restorative Shampoo',
                'slug' => 'restorative-shampoo',
                'price' => 26.00,
                'description' => 'Gentle cleansing formula that strengthens and repairs broken hair bonds.',
                'stock' => 22,
                'image_url' => 'https://i.pinimg.com/1200x/3b/0e/b0/3b0eb0ec3f44110341f56ece42a7980b.jpg',
            ],
            [
                'name' => 'Nourishing Conditioner',
                'slug' => 'nourishing-conditioner',
                'price' => 26.00,
                'description' => 'Detangles and softens hair while locking in essential moisture.',
                'stock' => 20,
                'image_url' => 'https://i.pinimg.com/1200x/6b/86/bb/6b86bbbef47e8f1af066402f0da436d9.jpg',
            ],
            [
                'name' => 'Heat Protectant Spray',
                'slug' => 'heat-protectant-spray',
                'price' => 22.00,
                'description' => 'Shields hair from thermal styling tools up to 450 degrees.',
                'stock' => 18,
                'image_url' => 'https://i.pinimg.com/736x/64/38/d4/6438d4d7c9c9f2eea8507605db90c373.jpg',
            ],
            [
                'name' => 'Curl Defining Cream',
                'slug' => 'curl-defining-cream',
                'price' => 29.00,
                'description' => 'Enhances natural curls and waves, reducing frizz and adding bounce.',
                'stock' => 14,
                'image_url' => 'https://i.pinimg.com/736x/e0/3b/d3/e03bd355fc5654ca4734a32c5a77ef81.jpg',
            ],
            [
                'name' => 'Volumizing Mousse',
                'slug' => 'volumizing-mousse',
                'price' => 24.00,
                'description' => 'Weightless formula that adds incredible body, lift, and shine to fine hair.',
                'stock' => 11,
                'image_url' => 'https://i.pinimg.com/control1/1200x/1e/7e/1c/1e7e1ca25ff7c6d47798256e20a2ae11.jpg',
            ],
        ]);

        $this->seedServices();
    }

    private function seedProducts(int $categoryId, array $products): void
    {
        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                [
                    'name' => $product['name'],
                    'description' => $product['description'],
                    'price' => $product['price'],
                    'stock' => $product['stock'],
                    'category_id' => $categoryId,
                    'image_url' => $product['image_url'],
                ]
            );
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
            'name' => 'Signature Facial',
            'description' => 'A personalized treatment including deep cleansing, exfoliation, and hydration.',
            'duration_minutes' => 60,
                'price' => 85.00,
            ],
            [
            'name' => 'Bridal Makeup',
            'description' => 'Complete makeup service for your special day, including a trial session.',
            'duration_minutes' => 90,
                'price' => 150.00,
            ],
            [
            'name' => 'Balayage Hair Color',
            'description' => 'Hand-painted highlights for a natural, sun-kissed look.',
            'duration_minutes' => 120,
                'price' => 180.00,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['name' => $service['name']],
                [
                    'description' => $service['description'],
                    'duration_minutes' => $service['duration_minutes'],
                    'price' => $service['price'],
                ]
            );
        }
    }
}
