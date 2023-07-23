<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Configuration::create([
            'key' => 'api',
            "value" => json_encode([
                "enabled"=> true,
                "maintenance_message"=> "L'API est actuellement en maintenance. Veuillez réessayer plus tard."
            ]),
        ]);
    }
}
