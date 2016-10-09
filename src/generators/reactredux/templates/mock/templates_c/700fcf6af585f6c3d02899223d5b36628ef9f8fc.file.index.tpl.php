<?php /* Smarty version Smarty-3.1.19, created on 2016-08-30 07:35:11
         compiled from "/Users/ielgnaw/Workspace/baidu/git/duer-star/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:97564942357c51a79345523-61818254%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '700fcf6af585f6c3d02899223d5b36628ef9f8fc' => 
    array (
      0 => '/Users/ielgnaw/Workspace/baidu/git/duer-star/index.tpl',
      1 => 1472535311,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '97564942357c51a79345523-61818254',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_57c51a79370ba9_02525283',
  'variables' => 
  array (
    'data' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_57c51a79370ba9_02525283')) {function content_57c51a79370ba9_02525283($_smarty_tpl) {?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no, email=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="referrer" content="never" />
        <title>度秘聊明星</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
            var data = <?php echo json_encode($_smarty_tpl->tpl_vars['data']->value);?>
;
            console.warn('tplData', data);
        </script>
        <script src="/main.js" replace="1"></script>
    </body>
</html>
<?php }} ?>
