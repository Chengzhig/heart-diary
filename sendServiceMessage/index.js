'use strict';
const cloud = require('wx-server-sdk')
cloud.init({
				env:'mywindows10-v5wzr'
			})
exports.main = async (event, context) => {
	const log = cloud.logger()
	log.info(event)
	console.info("收到的数据为：",event);
	log.info(event.userInfo)
	try {
	    const result = await cloud.openapi.subscribeMessage.send({
	        "touser": event.id,
	        "page": '/home/index/signin/signin',
	        "lang": 'zh_CN',
	        "data": {
	          "thing1": {
	            "value": '签到提醒'
	          },
	          "thing9": {
	            "value": '您的伴侣今天已经成功签到啦'
	          }
	        },
	        "templateId": 'Kh22i0NiY9UULTOwPZV2uH5-qWDjdtRmjgC_A3Y9xoU',
	        "miniprogramState": 'trial'
	      })
	    return result
	  } catch (err) {
	    return err
	  }
	}