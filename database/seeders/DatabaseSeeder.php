<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($index=0;$index<3;$index++){
          \App\Models\Message::factory(1)->from_user()->to_user()->create();
       }
    }
}
