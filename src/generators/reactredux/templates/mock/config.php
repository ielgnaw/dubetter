<?php
error_reporting(E_ALL^E_NOTICE^E_WARNING);
ini_set("expose_php","Off");
require("Smarty/Smarty.class.php");
$server = array_key_exists("PWD",$_SERVER) ? $_SERVER["PWD"] : (array_key_exists("SERVER_ROOT",$_SERVER) ? $_SERVER["SERVER_ROOT"] :"D:\\WorkSpace\\defensor\\vstar\\application\\views\\fe-dev") ;
defined("SERVER_ROOT") or define("SERVER_ROOT", $server);
define('SMARTY_TEMP_DIR', SERVER_ROOT . DIRECTORY_SEPARATOR . "./");
