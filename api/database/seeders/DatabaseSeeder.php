<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CurrencySeeder::class, 
            PairSeeder::class, 
            ConverterSeeder::class,
            ConfigurationSeeder::class
        ]);
    }
}
