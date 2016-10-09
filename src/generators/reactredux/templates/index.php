<?php
# 以下代码请每个文件保留
require(dirname(__FILE__) . "/mock/config.php");
$smarty = new Smarty();
$smarty->left_delimiter = "{%";
$smarty->right_delimiter = "%}";
$smarty->setTemplateDir(SMARTY_TEMP_DIR);

$jsonData = '{
    "status": 0,
    "msg": "ok",
    "data": {
        "msg": {
            "id": "123",
            "list": [
                {
                    "id": 1,
                    "item": "aaa"
                }
            ]
        }
    }
}';


$data = json_decode($jsonData);

$smarty->assign("data", $data);
$smarty->display("main.tpl");
?>
