<?php

namespace Database\Seeders;

use App\Models\Converter;
use App\Models\Pair;
use Illuminate\Database\Seeder;

class ConverterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pairs = Pair::all()->toArray();

        foreach ($pairs as $pair) {
            Converter::factory()->create([
                'pair_id' => $pair["id"],
                "count" => 0
            ]);
        }
    }
}
