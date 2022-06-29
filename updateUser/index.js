'use strict';
const cloud = require('wx-server-sdk')
cloud.init({
				env:'mywindows10-v5wzr'
			})
const db = cloud.database()
exports.main = async (event, context) => {
	console.log("收到的数据为：",event);
	const collection = db.collection('User')
	/*获取时间*/
	var n = Date.now()+8*3600000;
	var date = new Date(n);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	var time=Y + M + D + " " + h + m + s;
	const res = await collection.doc(event._id).update({
			data:{
				nickName:event.nickName, 
				avatarUrl:event.avatarUrl,
				gender:event.gender,
				language:event.language,
				city:event.city,
				province:event.province,
				country:event.country,
				birthday:event.birthday,
				lastsigntime:time
			}
		}).then(res=>{
			return {
				status: 0,
				msg: `更新用户成功`
			}
		}).catch(err=>{
			return {
				status: -1,
				msg: `更新用户失败`
			}
		})
	console.log(res);
	return res
};