<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencies = [
            [
                "name" => "Dollar Américain",
                "code" => "USD",
            ],
            [
                "name" => "Euro",
                "code" => "EUR",
            ],
            [
                "name" => "Dinar Algérien",
                "code" => "DZD",
            ],
            [
                "name" => "Bitcoin",
                "code" => "BTC",
            ]
        ];
        
        foreach ($currencies as $currency) {
            Currency::factory()->create([
                'name' => $currency["name"],
                "code" => $currency["code"]
            ]);
        }

    }
}
