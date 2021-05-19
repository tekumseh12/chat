<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index(Request $request){

      return view("login");
    }
    public function store(Request $request){

      $username = $request->input('username');
      $password = $request->input('password');
      $email = $request->input('email');
      // $user_val=DB::select("select * from users where username = ?", [$username]);
      // $email_val=DB::select("select * from users where email = ?", [$email]);
      $user_val = User::where('username', $username)->count();
      $email_val = User::where("email", $email)->count();
      $errors = "";
      if ($user_val>0){
        $errors=$errors."<p> Username is already used </p>";
      }
      if ($email_val>0){
        $errors=$errors."<p> email is already used </p>";
      }
      if ($email_val==0 and $user_val==0){
        // $seeder = new \Database\Seeders\DatabaseSeeder();
        $user = User::create(['username'=>$username, 'password'=> $password, 'email'=> $email]);
        // $user = $seeder->run();

        Auth::login($user);
        session(['username'=>$username]);
        return response()->json(['correct'=>true], 200);
      }else{
        return response()->json(['correct'=>false, 'errors'=>$errors], 200);
      }

    }

}
