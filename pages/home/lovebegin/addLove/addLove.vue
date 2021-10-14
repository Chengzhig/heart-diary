<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
				<image class="avatar" mode="aspectFill" :src="userInfo.headPicUrl"></image>
				<view class="nickname" style="color: #000000;">{{userInfo.nickName}}</view>
			</view>
		</view>
		<view class="lovetext">
			<view style="font-size: large;  text-align: center;" >
				如果可以的话
			</view>
			<view style="font-size: large;  text-align: center;" >
				可以和我一起吹吹晚风嘛
			</view>
				<button class="but1" open-type="getUserInfo"  @click="newWxLogin">接受</button>
				<button class="but2" open-type="getUserInfo">拒绝</button>
		</view>
	</view>
</template>

<script>
	var app = getApp()
	export default {

		data() {
			return {
				userInfo: { 
					headPicUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/25fef770-4695-11eb-bc56-c9cea619f663.png',
					nickName: '未知',
				},
				_mid:'',
				_hid:'',
			}
		},
		mounted(){
			this.getALL()
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.info("上个页面传递的参数mid=",option.mid); //打印出上个页面传递的参数。
			this._hid = option.mid;
			/**/
		},
		
		methods: {
			getALL(){
				if(this._hid!=''){
					wx.cloud.callFunction({
						name: 'getUser',
						data: {
							_mid:this._hid,
						},success: res => {
							console.info('success get user', res);
							this.userInfo.headPicUrl=res.result.msg.avatarUrl;
							this.userInfo.nickName=res.result.msg.nickName;
							if(res.result.msg.gender==1){
								this._mid=this._hid
							}
						},fail: res => {
							 console.info('fail get user', res);
						}
					});
				}
			},
			addLove(){
				if(this._mid!=''&&this._hid!=''){
					wx.cloud.callFunction({
						name: 'getLove',
						data: {
							_mid:this._mid,
						},success: res => {
							console.info('success get mlove', res);
							if(res.result.status==-1){
								wx.cloud.callFunction({
									name: 'getLove',
									data: {
										_mid:this._hid,
									},success: res => {
										console.info('success get hlove', res);
										if(res.result.status==-1){
											wx.cloud.callFunction({
												name: 'addLove',
												data: {
													_mid:this._mid,
													_hid:this._hid
												},success: res => {
													console.info('success add love', res);
													uni.hideLoading()
													uni.showModal({
														title: res.result.msg,
														icon: 'success',
														duration: 2000
													})
													if(res.result.status==0){
														uni.navigateTo({
															url:"/pages/home/index/index",
															// url:"../component/classdetails/classdetails?newsid="+ newsid,
															success:res =>{},
															fail:() =>{
																console.log("打开主页失败")
															},
															complete:() => {}
														});
													}
												},fail: res => {
													console.info('fail add love', res);
												}
											});
										}
										else{
											uni.hideLoading()
											uni.showModal({
												title: "ta已存在情侣关系",
												icon: 'fail',
												duration: 2000
											})
										}
									},fail: res => {
										console.info('fail get hlove', res);
									}
								});
							}
							else{
								uni.hideLoading()
								uni.showModal({
									title: "您已存在情侣关系",
									icon: 'fail',
									duration: 2000
								})
							}
						},fail: res => {
							console.info('fail get mlove', res);
						}
					});
				}else{
					console.info('id为空');
				}
			},
			
			newWxLogin(){
			    uni.getUserProfile({
			        desc:'登录需要授权',
			        success: res=>{
						console.info("userinfo:",res.userInfo)
						app.globalData.userInfo = res.userInfo,
						app.globalData.hasUserInfo= true,
						app.globalData.canIUseGetUserProfile= true
						/*登录信息*/
						wx.cloud.callFunction({
							name: 'login',
							data: {
							},success: res => {
								console.info('success login', res.result);
								app.globalData.useropenid= res.result.openid
								if(app.globalData.userInfo.gender==1){
									this._mid=res.result.openid
								}
								else{
									this._hid=res.result.openid
								}
								uni.setStorageSync("useropenid",app.globalData.useropenid)
								uni.setStorageSync("userInfo",app.globalData.userInfo)
								wx.cloud.callFunction({
									name:'getUser',
									data:{
										_mid:app.globalData.useropenid,
									},success: res => {
										console.info('success get user', res);
										if(res.result.status==-1){
											console.info('数据库中不存在用户');
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
													if(res.result.status==0){
														console.info('success add user', res);
													}
													else{
														console.info('fail add user', res);
													}
													this.addLove();
												},fail: res => {
													 console.info('调用addUser云函数失败', res);
												}
											});
										}
										else{
											console.info('数据库中存在用户，正在更新信息');
											wx.cloud.callFunction({
												name: 'updateUser',
												data: {
													_id:res.result.msg._id,
													nickName:app.globalData.userInfo.nickName,
													avatarUrl:app.globalData.userInfo.avatarUrl,
													gender:app.globalData.userInfo.gender,
													language:app.globalData.userInfo.language,
													city:app.globalData.userInfo.city,
													province:app.globalData.userInfo.province,
													country:app.globalData.userInfo.country,
												},success: res => {
													if(res.result.status==0){
														console.info('success update user', res);
													}
													else{
														console.info('fail update user', res);
													}
													this.addLove();
												},fail: res => {
													 console.info('调用updateUser云函数失败', res);
												}
											});
										}
									},fail: res => {
										 console.info('fail get user', res);
									}
								})
							},fail: res => {
								 console.info('fail login', res);
							}
						})
					},
					fail:err=>{
						uni.hideLoading()
						uni.showModal({
						 	title: "登录失败",
						 	icon: 'fail',
						 	duration: 2000
						})
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100vh;
		background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181018%2F12%2F1539838765-WUAztlsJoP.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630655647&t=7669a9985e3424a8ed4700961fd4c083') no-repeat;
		background-size: cover;
	}
	.but1{
		position: absolute;
		top: 46%;
		width: 20%;
		margin-left: 20%;
		margin-right: 40%;
		border-style:none;
		font-size: small;
		border:none;
		background-color:transparent;
	}
	.but2{
		position: absolute;
		top: 46%;
		width: 20%;
		margin-left: 60%;
		margin-right: 80%;
		border-style:none;
		font-size: small;
		border:none;
		background-color:transparent;
	}
	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 20% 20%;

			.setting {
				color: #fff;
				position: absolute;
				top: 60rpx;
				left: 60rpx;
				font-size: 50rpx;
			}

			.info {
				position: absolute;
				text-align: center;

				.avatar {
					margin-top: 10vh;
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
		
		.lovetext{
			border-radius: 20rpx;
			margin: 0 20rpx;
		}

		.order-status {
			padding: 0 20rpx;
			margin-top: -10vw;

			.status-wrap {
				border-radius: 25rpx;
				overflow: hidden;

				.status-list {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					background: #fff;
					padding-top: 30rpx;
					padding-bottom: 30rpx;

					.status-item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-icon {
							line-height: 1;
							font-size: 65rpx;
							color: #bbb;
						}

						.item-text {
							font-size: 28rpx;
							color: #666;
							margin-top: 5rpx;
						}
					}
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}
</style>

