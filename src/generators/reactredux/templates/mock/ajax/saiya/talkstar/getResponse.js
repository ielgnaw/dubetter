export function response(getArgs, postArgs) {
    return {
        "status": 0,
        "msg": "ok",
        "version": 2,
        "data": {
            "msg": {
                "id": String(+new Date).substr(0, 10) + "_4991rqf55" + parseInt(Math.random() * 1000, 10),
                "type": "server",
                "result_list": [
                    {
                        // "result_content": {
                        //     "answer": "11111"
                        // },
                        // "voice": "11111",
                        "result_content": null,
                        "voice": "",
                        "result_type": "txt",
                        "card_id": "1472658218_1"
                    },
                    {
                        "result_content": {
                            "answer": "22222"
                        },
                        "voice": "22222",
                        "result_type": "txt",
                        "card_id": "1472658218_1"
                    },
                    {
                        "result_content": {
                            "answer": "33333"
                        },
                        "voice": "33333",
                        "result_type": "txt",
                        "card_id": "1472658218_1"
                    },
                    {
                        "result_content": {
                            "answer": "44444"
                        },
                        "voice": "44444",
                        "result_type": "txt",
                        "card_id": "1472658218_1"
                    },
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://localhost:8002/img/banner.png"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "1baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "img": "http://localhost:8002/img/banner.png",
                    //         "subtitle": "111【直播ing】杨毅VS度秘！解说界真老司机@杨毅手把手调教度秘！新咖出道，求围观！",
                    //         "title": "杨毅约战机器人",
                    //         "url": "http://senti.baidu.com:8080/meishi/?id=616715",
                    //         "link_text": "立刻观看"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt_card_filmpet",
                    //     "card_id": '1472548481_1'
                    // },
                    // {
                    //     "result_content": {
                    //         "answer": "11111"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt",
                    //     "card_id": "1472658218_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "answer": "111离婚案，对王宝强的个人明星形象和他今后的戏路会有什么影响？",
                    //         "sugg_title": "查看更多",
                    //         "title": "知乎每日精选",
                    //         "sugg": "http://www.baidu.com",
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/banner.png",
                    //             "text": "baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt_sugg",
                    //     "card_id": "1472460761_1"
                    // },

                    // {
                    //     "result_content": {
                    //         "answer": "22222"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt",
                    //     "card_id": "1472658218_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "answer": "3333"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt",
                    //     "card_id": "1472658218_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "1baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "2baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "3baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // }
                    // ,
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "4baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // }
                    // ,
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "source": {
                    //             "icon": "http://localhost:8002/img/dumi_head.png",
                    //             "text": "5baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // }
                    // {
                    //     "result_content": {
                    //         "imgs": [
                    //             "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg"
                    //         ],
                    //         "link": "http://www.baidu.com",
                    //         "source": {
                    //             "icon": "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg",
                    //             "text": "baidu",
                    //             "link": "http://www.baidu.com"
                    //         }
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "img_comm",
                    //     "card_id": "1472469539_1"
                    // },
                    // {
                    //     "result_content": {
                    //         "img": "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg",
                    //         "subtitle": "111【直播ing】杨毅VS度秘！解说界真老司机@杨毅手把手调教度秘！新咖出道，求围观！",
                    //         "title": "杨毅约战机器人",
                    //         "url": "http://senti.baidu.com:8080/meishi/?id=616715",
                    //         "link_text": "立刻观看"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt_card_filmpet",
                    //     "card_id": '1472548481_1'
                    // },
                    // {
                    //     "result_content": {
                    //         "img": "http://i1.dpfile.com/pc/2efb493767a2c143db823b32d97285de(700c700)/thumb.jpg",
                    //         "subtitle": "【直播ing】杨毅VS度秘！解说界真老司机@杨毅手把手调教度秘！新咖出道，求围观！",
                    //         "title": "杨毅约战机器人",
                    //         "url": "http://senti.baidu.com:8080/meishi/?id=616715",
                    //         "link_text": "立刻观看"
                    //     },
                    //     "voice": "语音播报",
                    //     "result_type": "txt_card_filmpet",
                    //     "card_id": '1472548481_1'
                    // }
                ],
                "hint_mult": {
                    "data": [
                        {
                            "id": "id1",
                            "value": "hint选项文字1"
                        },
                        {
                            "id": "id2",
                            "value": "hint选项文字2"
                        },
                        {
                            "id": "id3",
                            "value": "hint选项文字3"
                        },
                        {
                            "id": "id4",
                            "value": "hint选项文字4"
                        },
                        {
                            "id": "id5",
                            "value": "hint选项文字5"
                        }
                    ]
                }
            }
        }
    };
};

