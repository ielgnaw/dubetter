<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="referrer" content="never" />
        <title> title </title>
    </head>
    <body>
        <div id="root"></div>
        <script>
            var tplData = {%json_encode($data)%};
            console.warn('tplData', tplData);
        </script>
        <script src="/main.js" replace="1"></script>
    </body>
</html>
