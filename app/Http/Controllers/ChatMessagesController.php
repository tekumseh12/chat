<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Message;
use App\Jobs\skuska;
use App\Events\messageSend;
use Illuminate\Support\Facades\DB;
class ChatMessagesController extends Controller
{


    public function sendMessage(Request $request){
      $message = $request->message;
      $from = $request->from;
      $to = $request->to;
      $mes = Message::create(["from_user"=>$from, "to_user"=>$to, "message"=>$message]);
      event(new messageSend($mes));

    // messageSend::dispatch();

    }
    public function logOut(){

      return response()->json([
        'user' => "llala"
      ],200);
      // return response()->json(['message'=> 'Everything went alright!!'], 200);



    }
    public function getUsers(Request $request){
      $user = $request->current_user;
      try {
        $users = User::where("username", "<>",  $user)->get();
        return  response()->json([
          'user' => $users
        ],200);
      }catch(\Exception $e){
        return  response()->json([
          'user' => $e->getMessage()
        ],500);
      }

    }
}


// https://getstream.io/blog/support-chat-laravel-react-hooks/
