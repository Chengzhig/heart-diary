'use strict';
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mywindows10-v5wzr'
})
const db = cloud.database()
//const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	var date=event.date;
	var year=parseInt(date.substr(0,4));
	var month=parseInt(date.substr(5,2));
	var day=parseInt(date.substr(8,2));
	
	const collection = db.collection('Signin')
	const signres =await collection.where({
		_mid:event._mid,
		signYear:year,
		signMonth:month,
	}).get()
	console.log("signres")
	console.log(signres)
	var lastmonthres;
	if(month==1){
		lastmonthres=await collection.where({
			_mid:event._mid,
			signYear:year-1,
			signMonth:12,
		}).get()
	}
	else{
		lastmonthres=await collection.where({
			_mid:event._mid,
			signYear:year,
			signMonth:month-1,
		}).get()
	}
	console.log("lastmonthres")
	console.log(lastmonthres)
	var sus;
	if(!lastmonthres.data == null) {
		sus=0;
	}
	else{
		sus=parseInt(lastmonthres.data[0].sussionDay);
	}
	console.log("last sus")
	console.log(sus)
	if (!signres.data || signres.data.length == 0) {
		if(day==1){
			sus+=1;
		}
		else{
			sus=1;
		}
		console.log("now sus")
		console.log(sus)
		const addres=await collection.add({
			data:{
				_mid:event._mid,
				signYear:year,
				signMonth:month,
				signinDay:[date],
				sussionDay:sus
			}
		}).then(res=>{
			return {
				status:0,
				msg:"签到成功"
			}
		}).catch(err=>{
			return {
				status:-1,
				msg:"签到失败"
			}
		})
		return addres;
	}
	else{
		var list = signres.data[0].signinDay;
		list.push(date);
		list.sort();
		var lastday=list[list.length-1];
		if(parseInt(lastday.substr(8,2))==list.length){
			sus+=list.length;
		}
		else{
			sus=1;
			for(var i=list.length-1;i>0;i--){
				if(parseInt(list[i].substr(8,2))-parseInt(list[i-1].substr(8,2))==1){
					sus++;
				}
				else{
					break;
				}
			}
		}
		console.log("now sus")
		console.log(sus)
		const updateres = await collection.doc(signres.data[0]._id).update({
			data:{
				_mid:event._mid,
				signYear:year,
				signMonth:month,
				signinDay:list,
				sussionDay:sus
			}
		}).then(res=>{
			return {
				status: 0,
				msg: `签到成功`
			}
		}).catch(err=>{
			return {
				status: -1,
				msg: `签到失败`+err
			}
		})
		return updateres;
	}
};
