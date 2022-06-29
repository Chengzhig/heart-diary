'use strict';
const cloud = require('wx-server-sdk')
cloud.init({
				env:'mywindows10-v5wzr'
			})
const db = cloud.database()

/*const db = uniCloud.database()*/
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const log = cloud.logger()
	log.info(event)
	console.info("收到的数据为：",event);
	const collection = db.collection('Psy')
	let res =await collection.where({
		_mid:event._mid,
	}).get()
	if (!res.data || res.data.length == 0) {
		return {
			status:-1,
			msg:"不存在生理记录"
		}
	}
	else{
		return {
			status:0,
			msg:res.data
		}
	}
};
