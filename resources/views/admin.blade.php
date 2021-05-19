<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <table>
      @foreach($users as $user)
      <tr><td> {{$user->username}}</td><td>{{$user->password}}</td></tr>
      @endforeach
    </table>
  </body>
</html>
