<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index(){
      return view("login", ['errors'=> ""]);
    }
    public function store(Request $request){
      $username = $request->username;
      $password = $request->password;
      if ($username == "admin"){
          $users = User::all();
          return view("admin", ['users'=> $users]);
      }
      $username_val = User::where("username", $username)->get();



      if ($username_val){

        if ($username_val[0]->password == $password){
          Auth::login($username_val[0]);
          session(["username"=> $username_val[0]->username]);
          return redirect("/portal");
        }else{
          return view("login", ['errors'=> "wrong password"]);
        }


      }else{
        return view("login", ['errors'=> "unknown user"]);
      }

    }
}
