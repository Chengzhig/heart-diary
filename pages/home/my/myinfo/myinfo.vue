<template>
	<view class="user">
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
					<image class="avatar" mode="aspectFill" :src="userInfo.headPicUrl"></image>
					<view class="nickname" style="color: #000000;" @tap>{{ userInfo.nickName }}</view>
					
			</view>
		</view>
		<form @submit="formSubmit">
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">
						<view class="cell-text">
							<view @tap="dateVisible1=true" font-size="32">您的生日：{{mybirthday.result}}</view>
						</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<view class="cell-text">
							<view font-size="32">消息通知
								<button class="but"  @click="subscribe()">点击订阅</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view >
			<button formType="submit" class="u-position-center" style="font-size: x-small;margin-top: 30%;margin-left: 40%;margin-right: 40%;">确定</button>
		</view>
		</form>
		<w-picker
		    :visible.sync="dateVisible1"
		    mode="date" 
		    startYear="1990" 
		    endYear="2020"
		    value="2020-03-07"
		    :current="true"
		    fields="day"
		    @confirm="onConfirm($event,'mybirthday')"
		    @cancel="onCancel"
		    :disabled-after="false"
		    ref="mybirthday" 
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	var app=getApp();
	export default {
		data() {
			return {
				user:{
					_id:'',
					_mid:'',
					nickName:'',
					avatarUrl:'',
					gender:0,
					language:'',
					city:'',
					province:'',
					country:'',
					birthday:'',
				},
				userInfo: {
					headPicUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/25fef770-4695-11eb-bc56-c9cea619f663.png',
					nickName: '请先登录',
				},
				dateVisible1:false,
				mybirthday:{
					result:'未设置',
				},
				
			}
		},
		components:{
			wPicker
		},
		mounted(){
			this.getUser()
		},
		methods: {
			subscribe(){
				wx.requestSubscribeMessage({
				  tmplIds: ['Kh22i0NiY9UULTOwPZV2uH5-qWDjdtRmjgC_A3Y9xoU'],
				  success :res=>{ }
				})
			},
			onConfirm(res,type){
				console.log(res.result)
				if( type=='mybirthday'){
					this.mybirthday=res;
				}
			},
			onCancel(){
				
			},
			getUser(){
				this.userInfo.headPicUrl=app.globalData.userInfo.avatarUrl;
				this.userInfo.nickName=app.globalData.userInfo.nickName;
				wx.cloud.callFunction({
					name: 'getUser',
					data: {
						_mid:app.globalData.useropenid,
					},success: res => {
						console.info("success get user",res)
						if(res.result.status==0){
							if(res.result.msg.birthday){
								this.mybirthday.result=res.result.msg.birthday
							}
							this.user=res.result.msg;
							console.info(this.user);
						}
						else{
							console.info("未找到用户")
						}
					},fail:err=>{
						console.info("fail get user",err)
					}
				})
			},
			formSubmit:function(e){
				console.info(this.mybirthday.result)
				if(this.userInfo.nickName!='请先登录'){
					wx.cloud.callFunction({
						name: 'updateUser',
						data: {
							_id:this.user._id,
							_mid:this.user._mid,
							nickName:this.user.nickName,
							avatarUrl:this.user.avatarUrl,
							gender:this.user.gender,
							language:this.user.language,
							city:this.user.city,
							province:this.user.province,
							country:this.user.country, 
							birthday:this.mybirthday.result
						},success: res => {
							uni.hideLoading()
							uni.showModal({
								title: res.result.msg,
								icon: 'success',
								duration: 2000
							})
							console.info('success update user info', res);
						},fail: res => {
							uni.hideLoading()
							uni.showModal({
								title: "发生错误，请联系管理员",
								icon: 'fail',
								duration: 2000
							})
							 console.info('fail update user info', res);
						}
					})
				}
				else{
					uni.hideLoading()
					uni.showModal({
						title: "请返回上一页面登录",
						icon: 'fail',
						duration: 2000
					})
				}
			},
		}
	}
</script>


<style lang="scss">
	page {
		background: #f2f2f2;
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
			background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/597b89a0-45ce-11eb-bd01-97bc1429a9ff.jpg') no-repeat;
			background-size: cover;

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
			height: 150rpx;
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
				width: 80%;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
				
				.but{
					font-size: 28rpx;
					margin-right: 20rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}
	
</style>


