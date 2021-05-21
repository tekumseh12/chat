<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class TestController extends Controller
{
    public function test(){
      $array = collect([1,2,3])->map(function($data){return $data**2;})->reject(function($data){return $data==1;});
      print_r($array);
      return view("quiz");
    }
}
