<!DOCTYPE html>
<html >
    <head>
        <meta charset="utf-8">

        <title>Stream Laravel React Live Chat</title>

        

    </head>
    <body>

        <div id="login" data-tsid='{{$errors}}' ></div>
        <script src="{{ asset('js/app.js') }}"></script>
        <script>
          const center = document.getElementsByTagName("center");
          if (center.length == 1){

            const input = document.createElement("input")
            input.type = "hidden";
            input.name = "_token"

            input.value = "<?php echo csrf_token(); ?>";
            center[0].insertBefore(input, center[0].childNodes[0])


          }


        </script>
    </body>
</html>
