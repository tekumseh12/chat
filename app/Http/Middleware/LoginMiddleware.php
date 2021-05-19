<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LoginMiddleware
{

    public function handle(Request $request, Closure $next)
    {
      if ($request->input("lama") != "lama"){
        return redirect("/portal");
      }
      return $next($request);
    }
}
