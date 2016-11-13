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
            "id" => 1, //计划id
            "name" => "哑铃进阶循环训练1",   //计划名称
            "total_users" => 5678821,  //多少人已加入
            "banner_path" => "http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1111.png",   //banner图片的url地址
            "join" => 1,     //0:未加入，1：已加入
            "detail"=> 0 ,// 是否有计划详情页，1有，0无
        )
    )
);

$smarty->assign('data', $data);
$smarty->display('example.tpl');
?>
