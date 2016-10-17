<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="referrer" content="never" />
        <title> dir-example sub </title>
    </head>
    <body>
        <div class="aaa"></div>
        <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" />
        <div id="root"></div>
        <script>
            var data = {%json_encode($data)%};
            console.warn(data, 'tpl');
        </script>
        <script src="/sub.js" replace="1"></script>
    </body>
</html>

