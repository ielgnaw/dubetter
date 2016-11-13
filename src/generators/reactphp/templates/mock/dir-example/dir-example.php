<?php
# 以下代码请每个文件保留
require(dirname(__FILE__) . '/../config.php');
$smarty = new Smarty();
$smarty->left_delimiter = '{%';
$smarty->right_delimiter = '%}';
$smarty->setTemplateDir(SMARTY_TEMP_DIR);

$jsonData = '{
    "status": 0,
    "msg": "ok",
    "version": 2,
    "data": {
        "msg": {
            "id": "1472455721_4771rqf55",
            "type": "server",
            "result_list": [
                {
                    "result_content": {
                        "answer": "1111111111"
                    },
                    "voice": "语音播报",
                    "result_type": "txt",
                    "card_id": "1472455721_1"
                }
            ]
        }
    }
}';


$data = json_decode($jsonData);

$smarty->assign('data', $data);
$smarty->display('dir-example/dir-example.tpl');
?>
