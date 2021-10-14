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
							<view @tap="dateVisible1=true" font-size="32">相恋日期：{{togeterdate.result}}</view>
						</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<view class="cell-text">
							<view font-size="32" v-if="gender==1">对她的称呼：<input class="uni-input" name="input" placeholder='请输入'  :value="loveDate.hname"/></view>
							<view font-size="32" v-else>对他的称呼：<input  class="uni-input" name="input" placeholder='请输入' :value="loveDate.mname"/></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="userInfo.nickName=='请先邀请'">
			<button open-type="share" class="u-position-center" style="font-size: x-small;margin-top: 30%;margin-left: 40%;margin-right: 40%;">邀请</button>
		</view>
		<view v-else>
			<button formType="submit" class="u-position-center" style="font-size: x-small;margin-top: 30%;margin-left: 40%;margin-right: 40%;">确定</button>
		</view>
		</form>
		<w-picker
		    :visible.sync="dateVisible1"
		    mode="date" 
		    startYear="2000" 
		    endYear="2022"
		    value="2020-03-07"
		    :current="true"
		    fields="day"
		    @confirm="onConfirm($event,'togeterdate')"
		    @cancel="onCancel"
		    :disabled-after="false"
		    ref="togeterdate" 
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	var app = getApp();
	export default {
		onLoad(){
			wx.showShareMenu({
				withShareTicket:true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus:["shareAppMessage"] 
			})
			/*测试添加恋人*/
			/*uni.navigateTo({
				url:"/pages/home/lovebegin/addLove/addLove?mid="+uni.getStorageSync('useropenid'),
				// url:"../component/classdetails/classdetails?newsid="+ newsid,
				success:res =>{},
				fail:() =>{
					console.log("打开失败")
				}
			});*/
		},
		onShareAppMessage(res){
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let useropenid = uni.getStorageSync('useropenid');
			if (useropenid){
				return
				{
					title:"邀请"
					path:"/pages/home/lovebegin/addLove/addLove?mid="+useropenid
					imageUrl:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/574e1050-4694-11eb-bf0a-894cbc80c40a.png'
				}
			}
		},
		components:{
			wPicker
		},
		data() {
			return {
				loveDate:{
					_id:'',
					_mid:'',
					_hid:'',
					mname:'',
					hname:'',
					togethertime:'',
					loverPscDay:[],
					isdelete:'',
				},
				userInfo: {
					headPicUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/25fef770-4695-11eb-bc56-c9cea619f663.png',
					nickName: '请先邀请',
				},
				dateVisible1:false,
				togeterdate:{
					result:"未设置"
				},
				gender:1,
			}
		},
		mounted(){
			this.getUser()
		},
		methods: {
			onConfirm(res,type){
				console.log(res.result)
				if( type=='togeterdate'){
					this.togeterdate=res;
				}
			},
			onCancel(){ 
				
			},
			
			getUser() {
				this.gender=app.globalData.userInfo.gender;
				wx.cloud.callFunction({
					name: 'getLove',
					data: {
						_mid:app.globalData.useropenid,
					},success: res => {
						if(res.result.status==0)
						{
							this.loveDate=res.result.msg;
							this.togeterdate.result=res.result.msg.togethertime
							wx.cloud.callFunction({
								name: 'getUser',
								data: {
									_mid:app.globalData._hid,
								},success: res => { 
									if(res.result.status==0){
										this.userInfo.headPicUrl=res.result.msg.avatarUrl;
										this.userInfo.nickName=res.result.msg.nickName;
									}
									console.info('success get his info', res);
								},fail: res => {
									 console.info('fail  get his info', res);
								}
							})
						}
						console.info('success get love ', res);
					},fail: res => {
						console.info('fail get love', res);
					}
				})
			},
			formSubmit:function(e){
				var flag=app.globalData.userInfo.gender==1?true:false;
				var formdata=e.detail.value;
				console.info('form发生了submit事件，携带数据为：', formdata)
				var tmpMname=this.loveDate.mname;
				var tmpHname=this.loveDate.hname;
				if(flag){
					tmpHname=formdata.input;
				}
				else{
					tmpMname=formdata.input;
				}
				wx.cloud.callFunction({
					name: 'updateLove',
					data: {
						_id:this.loveDate._id,
						_mid:this.loveDate._mid,
						_hid:this.loveDate._hid,
						mname:tmpMname,
						hname:tmpHname,
						togethertime:this.togeterdate.result,
						loverPscDay: this.loveDate.loverPscDay,
						isdelete: this.loveDate.isdelete,
					},success: res => {
						uni.hideLoading()
						uni.showModal({
							title: res.result.msg,
							icon: 'success',
							duration: 2000
						})
						console.info('success update together Day', res);
					},fail: res => {
						uni.hideLoading()
						uni.showModal({
							title: "发生错误，请联系管理员",
							icon: 'fail',
							duration: 2000
						})
						 console.info('fail update together Day', res);
						 
					}
				})
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
			}

			.iconfont {
				font-size: 40rpx;
				color: #999;
			}
		}
	}
</style>

