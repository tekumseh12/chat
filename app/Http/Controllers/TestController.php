<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class TestController extends Controller
{
    public function test(){
      User::factory()->count(5)->create();
    }
}
