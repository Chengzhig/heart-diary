'use strict';
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mywindows10-v5wzr'
})
const db = cloud.database()
exports.main = async (event, context) => {
	const log = cloud.logger()
	log.info(event)
	console.info("收到的数据为：",event);
	const collection = db.collection('User')
	var res =await collection.where({
		_mid:event._mid,
	}).get()
	if (!res.data || res.data.length == 0) {
		return {
			status:-1,
			msg:"不存在"
		}
	}
	else{
		return {
			status:0,
			msg:res.data[0]
		}
	}
};
