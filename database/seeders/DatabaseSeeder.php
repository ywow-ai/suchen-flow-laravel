<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

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
                "user_id" => $user_id,
                "name" => "Nasi Goreng Spesial",
                "category" => "Makanan",
                "description" => "Nasi goreng dengan ayam, udang, telur, dan sayuran segar",
                "image" => "https://placehold.co/600x400/FF6B6B/FFFFFF?text=Nasi+Goreng"
            ],
            [
                "user_id" => $user_id,
                "name" => "Mie Goreng Jawa",
                "category" => "Makanan",
                "description" => "Mie goreng dengan bumbu khas Jawa dan telur ceplok",
                "image" => "https://placehold.co/600x400/4ECDC4/FFFFFF?text=Mie+Goreng"
            ],
            [
                "user_id" => $user_id,
                "name" => "Ayam Bakar Madu",
                "category" => "Makanan",
                "description" => "Ayam bakar dengan bumbu madu yang manis dan gurih",
                "image" => "https://placehold.co/600x400/FFE66D/000000?text=Ayam+Bakar"
            ],
            [
                "user_id" => $user_id,
                "name" => "Sate Ayam",
                "category" => "Makanan",
                "description" => "Sate ayam dengan bumbu kacang dan lontong",
                "image" => "https://placehold.co/600x400/1A535C/FFFFFF?text=Sate+Ayam"
            ],
            [
                "user_id" => $user_id,
                "name" => "Rendang Daging",
                "category" => "Makanan",
                "description" => "Daging sapi dimasak dengan bumbu rempah khas Padang",
                "image" => "https://placehold.co/600x400/FF6B6B/FFFFFF?text=Rendang"
            ],
            [
                "user_id" => $user_id,
                "name" => "Gado-gado",
                "category" => "Makanan",
                "description" => "Salad sayuran dengan bumbu kacang dan kerupuk",
                "image" => "https://placehold.co/600x400/4ECDC4/FFFFFF?text=Gado-gado"
            ],
            [
                "user_id" => $user_id,
                "name" => "Soto Ayam",
                "category" => "Makanan",
                "description" => "Sup ayam dengan bumbu kuning dan bihun",
                "image" => "https://placehold.co/600x400/FFE66D/000000?text=Soto+Ayam"
            ],
            [
                "user_id" => $user_id,
                "name" => "Bakso Sapi",
                "category" => "Makanan",
                "description" => "Bakso sapi dengan mie dan kuah kaldu sapi",
                "image" => "https://placehold.co/600x400/1A535C/FFFFFF?text=Bakso"
            ],
            [
                "user_id" => $user_id,
                "name" => "Es Teh Manis",
                "category" => "Minuman",
                "description" => "Teh manis dingin dengan es batu",
                "image" => "https://placehold.co/600x400/06D6A0/FFFFFF?text=Es+Teh"
            ],
            [
                "user_id" => $user_id,
                "name" => "Kopi Hitam",
                "category" => "Minuman",
                "description" => "Kopi hitam murni tanpa gula",
                "image" => "https://placehold.co/600x400/6A0572/FFFFFF?text=Kopi+Hitam"
            ],
            [
                "user_id" => $user_id,
                "name" => "Jus Alpukat",
                "category" => "Minuman",
                "description" => "Jus alpukat dengan susu kental manis",
                "image" => "https://placehold.co/600x400/FF9F1C/FFFFFF?text=Jus+Alpukat"
            ],
            [
                "user_id" => $user_id,
                "name" => "Es Jeruk",
                "category" => "Minuman",
                "description" => "Jeruk peras segar dengan es",
                "image" => "https://placehold.co/600x400/118AB2/FFFFFF?text=Es+Jeruk"
            ],
            [
                "user_id" => $user_id,
                "name" => "Cappuccino",
                "category" => "Minuman",
                "description" => "Kopi dengan busa susu dan taburan kayu manis",
                "image" => "https://placehold.co/600x400/6A0572/FFFFFF?text=Cappuccino"
            ],
            [
                "user_id" => $user_id,
                "name" => "Milkshake Coklat",
                "category" => "Minuman",
                "description" => "Milkshake coklat dengan whipped cream",
                "image" => "https://placehold.co/600x400/8B4513/FFFFFF?text=Milkshake"
            ],
            [
                "user_id" => $user_id,
                "name" => "Air Mineral",
                "category" => "Minuman",
                "description" => null,
                "image" => "https://placehold.co/600x400/118AB2/FFFFFF?text=Air+Mineral"
            ],
            [
                "user_id" => $user_id,
                "name" => "Es Campur",
                "category" => "Minuman",
                "description" => "Campuran buah, jelly, dan sirup dengan es serut",
                "image" => "https://placehold.co/600x400/FF9F1C/FFFFFF?text=Es+Campur"
            ],
            [
                "user_id" => $user_id,
                "name" => "Martabak Manis",
                "category" => "Makanan",
                "description" => "Martabak manis dengan topping keju dan coklat",
                "image" => "https://placehold.co/600x400/FF6B6B/FFFFFF?text=Martabak"
            ],
            [
                "user_id" => $user_id,
                "name" => "Pisang Goreng",
                "category" => "Makanan",
                "description" => "Pisang goreng dengan taburan gula halus",
                "image" => "https://placehold.co/600x400/FFE66D/000000?text=Pisang+Goreng"
            ],
            [
                "user_id" => $user_id,
                "name" => "Dimsum Ayam",
                "category" => "Makanan",
                "description" => "Dimsum ayam dengan saus spesial",
                "image" => "https://placehold.co/600x400/4ECDC4/FFFFFF?text=Dimsum"
            ],
            [
                "user_id" => $user_id,
                "name" => "Green Tea Latte",
                "category" => "Minuman",
                "description" => "Teh hijau dengan susu dan sedikit gula",
                "image" => "https://placehold.co/600x400/06D6A0/FFFFFF?text=Green+Tea"
            ]
        ]);
    }
}
