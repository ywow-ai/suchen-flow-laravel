<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Test User',
                'password' => Hash::make('kudus123'),
                'remember_token' => Str::random(10),
            ]
        );

        $user_id = $user->getAttribute('id');

        DB::table('tbx_products')->insert([
            [
                'name' => 'Nasi Goreng Spesial',
                'category' => 'Makanan',
                'description' => 'Nasi goreng dengan ayam, udang, telur, dan sayuran segar',
                'image' => 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Nasi+Goreng',
            ],
            [
                'name' => 'Mie Goreng Jawa',
                'category' => 'Makanan',
                'description' => 'Mie goreng dengan bumbu khas Jawa dan telur ceplok',
                'image' => 'https://placehold.co/600x400/4ECDC4/FFFFFF?text=Mie+Goreng',
            ],
            [
                'name' => 'Ayam Bakar Madu',
                'category' => 'Makanan',
                'description' => 'Ayam bakar dengan bumbu madu yang manis dan gurih',
                'image' => 'https://placehold.co/600x400/FFE66D/000000?text=Ayam+Bakar',
            ],
            [
                'name' => 'Sate Ayam',
                'category' => 'Makanan',
                'description' => 'Sate ayam dengan bumbu kacang dan lontong',
                'image' => 'https://placehold.co/600x400/1A535C/FFFFFF?text=Sate+Ayam',
            ],
            [
                'name' => 'Rendang Daging',
                'category' => 'Makanan',
                'description' => 'Daging sapi dimasak dengan bumbu rempah khas Padang',
                'image' => 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Rendang',
            ],
            [
                'name' => 'Gado-gado',
                'category' => 'Makanan',
                'description' => 'Salad sayuran dengan bumbu kacang dan kerupuk',
                'image' => 'https://placehold.co/600x400/4ECDC4/FFFFFF?text=Gado-gado',
            ],
            [
                'name' => 'Soto Ayam',
                'category' => 'Makanan',
                'description' => 'Sup ayam dengan bumbu kuning dan bihun',
                'image' => 'https://placehold.co/600x400/FFE66D/000000?text=Soto+Ayam',
            ],
            [
                'name' => 'Bakso Sapi',
                'category' => 'Makanan',
                'description' => 'Bakso sapi dengan mie dan kuah kaldu sapi',
                'image' => 'https://placehold.co/600x400/1A535C/FFFFFF?text=Bakso',
            ],
            [
                'name' => 'Es Teh Manis',
                'category' => 'Minuman',
                'description' => 'Teh manis dingin dengan es batu',
                'image' => 'https://placehold.co/600x400/06D6A0/FFFFFF?text=Es+Teh',
            ],
            [
                'name' => 'Kopi Hitam',
                'category' => 'Minuman',
                'description' => 'Kopi hitam murni tanpa gula',
                'image' => 'https://placehold.co/600x400/6A0572/FFFFFF?text=Kopi+Hitam',
            ],
            [
                'name' => 'Jus Alpukat',
                'category' => 'Minuman',
                'description' => 'Jus alpukat dengan susu kental manis',
                'image' => 'https://placehold.co/600x400/FF9F1C/FFFFFF?text=Jus+Alpukat',
            ],
            [
                'name' => 'Es Jeruk',
                'category' => 'Minuman',
                'description' => 'Jeruk peras segar dengan es',
                'image' => 'https://placehold.co/600x400/118AB2/FFFFFF?text=Es+Jeruk',
            ],
            [
                'name' => 'Cappuccino',
                'category' => 'Minuman',
                'description' => 'Kopi dengan busa susu dan taburan kayu manis',
                'image' => 'https://placehold.co/600x400/6A0572/FFFFFF?text=Cappuccino',
            ],
            [
                'name' => 'Milkshake Coklat',
                'category' => 'Minuman',
                'description' => 'Milkshake coklat dengan whipped cream',
                'image' => 'https://placehold.co/600x400/8B4513/FFFFFF?text=Milkshake',
            ],
            [
                'name' => 'Air Mineral',
                'category' => 'Minuman',
                'description' => null,
                'image' => 'https://placehold.co/600x400/118AB2/FFFFFF?text=Air+Mineral',
            ],
            [
                'name' => 'Es Campur',
                'category' => 'Minuman',
                'description' => 'Campuran buah, jelly, dan sirup dengan es serut',
                'image' => 'https://placehold.co/600x400/FF9F1C/FFFFFF?text=Es+Campur',
            ],
            [
                'name' => 'Martabak Manis',
                'category' => 'Makanan',
                'description' => 'Martabak manis dengan topping keju dan coklat',
                'image' => 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Martabak',
            ],
            [
                'name' => 'Pisang Goreng',
                'category' => 'Makanan',
                'description' => 'Pisang goreng dengan taburan gula halus',
                'image' => 'https://placehold.co/600x400/FFE66D/000000?text=Pisang+Goreng',
            ],
            [
                'name' => 'Dimsum Ayam',
                'category' => 'Makanan',
                'description' => 'Dimsum ayam dengan saus spesial',
                'image' => 'https://placehold.co/600x400/4ECDC4/FFFFFF?text=Dimsum',
            ],
            [
                'name' => 'Green Tea Latte',
                'category' => 'Minuman',
                'description' => 'Teh hijau dengan susu dan sedikit gula',
                'image' => 'https://placehold.co/600x400/06D6A0/FFFFFF?text=Green+Tea',
            ],
        ]);
    }
}
