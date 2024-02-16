<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Research;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
      //  Research::factory()->count(200000)->create();

         \App\Models\User::factory()->create([
             'name' => 'Irfan Hossain',
             'email' => 'i@gmail.com.com',
         ]);
    }
}
