<?php

namespace Database\Seeders;

use App\Models\Currency;
use App\Models\Pair;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PairSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencies = Currency::all()->toArray();

        foreach ($currencies as $key => $currency) {
            foreach ($currencies as $index => $crcy) {
                if ($key !== $index) {
                    Pair::factory()->create([
                        "from_id" => $currency["id"],
                        "to_id" => $crcy["id"],
                        "currency_rate" => floatval(rand(0, 99) / 10)
                    ]);
                }
            }

        }
    }
}
