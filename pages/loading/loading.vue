<template>
	<view>
		<u-image width="100%" height="100vh" :src="src"></u-image>
		<view v-if="flag==1">
			<button class="but" open-type="getUserInfo"  @click="newWxLogin()">登陆</button>
		</view>
		<view v-else-if="flag==2">
			<button class="but" open-type="getUserInfo"  @click="subscribe()">授权</button>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {   
			return { 
				flag:1,
				timer:null,
				userInfo:{},
				hasUserInfo:false,
				src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/574e1050-4694-11eb-bf0a-894cbc80c40a.png",
				count: "",
				userLoginBoxContent: "检测到您还未授权登录，需要您的授权获取基本用户信息（不含手机号码、定位等隐私信息）,我们将严格保守您的用户隐私。请点击下面登录按钮",
			}
		}, 
		mounted() {
			var that=this
			uni.getSetting({
				withSubscriptions: true,
				success:res=>{
					console.log("授权：", res);
					var user=uni.getStorageSync("useropenid");
					if (!user) {
						//这里调用授权
						console.log("当前未授权");
						that.showUserLoginBox = true
						// that.appLoginWx()
					} else {
						//用户已经授权过了
						console.info("当前已授权",res);
						app.globalData.useropenid=uni.getStorageSync("useropenid");
						app.globalData.userInfo=uni.getStorageSync("userInfo");
						
						console.info(app.globalData.useropenid)
						wx.cloud.callFunction({
						  	name: 'getUser',
						  	data: {
						  		_mid:app.globalData.useropenid,
						  	},success: res => {
						  		console.info('云函数getUser调用成功', res);
								console.info(res.result.msg);
								wx.cloud.callFunction({
								  	name: 'updateUser',
								  	data: { 
										_id:res.result.msg._id,
								  		_mid:res.result.msg.useropenid,
								  		nickName:app.globalData.userInfo.nickName,
								  		avatarUrl:app.globalData.userInfo.avatarUrl,
								  		gender:app.globalData.userInfo.gender,
								  		language:app.globalData.userInfo.language,
								  		city:app.globalData.userInfo.city,
								  		province:app.globalData.userInfo.province,
								  		country:app.globalData.userInfo.country, 
										birthday:res.result.msg.birthday
								  	},success: res => {
										that.flag=2;
								  		console.info('云函数updateUser调用成功', res);
								  	},fail: err => {
								  		 console.info('云函数updateUser调用失败', err);
								  	}
								  });
						  	},fail: err => {
						  		 console.info('云函数getUser调用失败', err);
						  	}
						});
						wx.cloud.callFunction({
							name: 'getLove',
							data: {
								_mid:app.globalData.useropenid,
							},success: res => {
								if(res.result.status==0)
								{
									if(app.globalData.userInfo.gender==1){
										app.globalData._hid=res.result.msg._hid
									}
									else{
										app.globalData._hid=res.result.msg._mid
									}
								}
								console.info('success get love', res);
							},fail: res => {
								console.info('fail get love', res);
							}
						})
						
						const timejump = 1;
						if (!this.timer) {
							this.count = timejump;
							this.show = false;
							this.timer = setInterval(() => {
								if (this.count > 0 && this.count <= timejump) {
									this.count--;//
								} else {
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
									// 跳转的页面写在此处
									wx.reLaunch({
										url: '/pages/home/index/index',
									});
									uni.hideHomeButton()
								}
							}, 500)
						}
					}
				}
			})
			// 三秒后进行跳转
			
		},
		methods: {
			subscribe(){
				wx.requestSubscribeMessage({
				  tmplIds: ['Kh22i0NiY9UULTOwPZV2uH5-qWDjdtRmjgC_A3Y9xoU'],
				  success :res=>{ 
					  const timejump = 1;
					  if (!this.timer) {
					  	this.count = timejump;
					  	this.show = false;
					  	this.timer = setInterval(() => {
					  		if (this.count > 0 && this.count <= timejump) {
					  			this.count--;//
					  		} else {
					  			this.show = true;
					  			clearInterval(this.timer);
					  			this.timer = null;
					  			// 跳转的页面写在此处
					  			wx.reLaunch({
					  				url: '/pages/home/index/index',
					  			});
					  			uni.hideHomeButton()
					  		}
					  	}, 500)
					  }
					}
				})
			},
			newWxLogin(){
			    uni.getUserProfile({
			        desc:'登录需要授权',
			        success: res=>{
						console.info("userinfo:",res.userInfo)
						app.globalData.userInfo = res.userInfo,
						app.globalData.hasUserInfo= true,
						app.globalData.canIUseGetUserProfile= true
						wx.cloud.callFunction({
							name: 'login',
							data: {
							},success: res => {
								console.info('success login', res.result);
								app.globalData.useropenid= res.result.openid
								uni.setStorageSync("useropenid",app.globalData.useropenid)
								uni.setStorageSync("userInfo",app.globalData.userInfo)
								wx.cloud.callFunction({
									name: 'getUser',
									data: {
										_mid:app.globalData.useropenid,
									},success: res => {
										console.info('云函数getUser调用成功', res);
										if(res.result.status==0){
											console.info('已找到用户', res);
											wx.cloud.callFunction({
												name: 'updateUser',
												data: {
													_id:res.result.msg._id,
													_mid:app.globalData.useropenid,
													nickName:app.globalData.userInfo.nickName,
													avatarUrl:app.globalData.userInfo.avatarUrl,
													gender:app.globalData.userInfo.gender,
													language:app.globalData.userInfo.language,
													city:app.globalData.userInfo.city,
													province:app.globalData.userInfo.province,
													country:app.globalData.userInfo.country,
													birthday:res.result.msg.birthday
												},success: res => {
													this.flag=2;
													 console.info('success update User', res);
												},fail: err => {
													 console.info('fail update user', err);
												} 
											});
											wx.cloud.callFunction({
												name: 'getLove',
												data: {
													_mid:app.globalData.useropenid,
												},success: res => {
													if(res.result.status==0)
													{
														if(app.globalData.userInfo.gender==1){
															app.globalData._hid=res.result.msg._hid
														}
														else{
															app.globalData._hid=res.result.msg._mid
														}
													}
													console.info('success get love', res);
												},fail: res => {
													console.info('fail get love', res);
												}
											})
										}
										else{
											console.info('未找到用户', res);
											wx.cloud.callFunction({
												name: 'addUser',
												data: {
													_mid:app.globalData.useropenid,
													nickName:app.globalData.userInfo.nickName,
													avatarUrl:app.globalData.userInfo.avatarUrl,
													gender:app.globalData.userInfo.gender,
													language:app.globalData.userInfo.language,
													city:app.globalData.userInfo.city,
													province:app.globalData.userInfo.province,
													country:app.globalData.userInfo.country,
												},success: res => {
													this.flag=2;
													 console.info('success add user', res);
												},fail: err => {
													 console.info('fail add user', err);
												}
											});
											
										}
										 
									},fail: res => {
										 console.info('云函数getUser调用失败', res);
									}
								})
								
							},fail: res => {
								 console.info('fail login', res);
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.but{
		position: absolute;
		top: 90%;
		margin-left: 40%;
		margin-right: 40%;
		background-color: unset;
		border-style:none;
		border:none;
		background-color:transparent;
	}

</style>
