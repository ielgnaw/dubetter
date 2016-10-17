<?php
# 以下代码请每个文件保留
require(dirname(__FILE__) . '/config.php');
$smarty = new Smarty();
$smarty->left_delimiter = '{%';
$smarty->right_delimiter = '%}';
$smarty->setTemplateDir(SMARTY_TEMP_DIR);

$data = array(
    "userid" => "55686",
    "end" => 0,
    "plan_list" => array(
        array(
            "id" => 1,
            "name" => "哑铃进阶循环训练1",
            "total_users" => 5678821,
            "banner_path" => "http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1111.png",
            "join" => 1,
            "detail"=> 0
        )
    )
);

$smarty->assign('data', $data);
$smarty->display('example.tpl');
?>
