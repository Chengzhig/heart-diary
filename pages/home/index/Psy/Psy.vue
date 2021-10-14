<template>
	<view class="user">
		<view v-if="isEnd==true">
			<button class="but" @click="psystart()">大姨妈来了</button>
		</view>
		<view v-else>
			<button class="but" @click="psyend()">大姨妈走了</button>
		</view>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in PsyList" :key="index" @tap="chooseDate(item,index)">
						<view class="cell-left" >
							<view class="cell-text">{{ item.startTime }}---{{ item.endTime }} </view>
						</view>
						<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<w-picker
			:visible.sync="rangeVisible"
			mode="range" 
			startYear="2017" 
			endYear="2030"
			:value="rangeVal"
			:current="true"
			@confirm="onConfirm($event,'psydate')"
			@cancel="onCancel"
			ref="psydate" 
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	var app = getApp();
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				isEnd:true,
				chooseIndex:0,
				rangeVisible:false,
				PsyList: [],
				psydate:{
					result:"未设置"
				},
				rangeVal:['2018-12-12','2020-04-02']
			}
		},
		mounted(){
			this.getPsy();
		},
		methods: {
			psystart(){
				uni.showLoading({
					title: '处理中...'
				})
				var id;
				if(app.globalData.userInfo.gender==1){
					id=app.globalData._hid;
				}
				else{
					id=app.globalData.useropenid;
				}
				wx.cloud.callFunction({
					name: 'addPsy',
					data: {
						_mid:id,
					},success:res=> {
						console.info("调用 add psy 成功",res)
						uni.hideLoading()
						if(res.result.status==1){
							uni.showModal({
								title: "添加失败",
								icon: 'fail',
								duration: 2000
							})
						}
						else if(res.result.status==0){
							uni.showModal({
								title: "姨妈来啦，注意饮食休息",
								icon: 'success',
								duration: 2000
							})
							this.isEnd=false;
							this.getPsy();
						}
					},fail:err=> {
						console.info("调用 add psy 失败",err)
					}
				})
			},
			psyend(){
				uni.showLoading({
					title: '处理中...'
				})
				var n = Date.now()+8*3600000;
				var date = new Date(n);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var todaytime=Y + M + D;
				var id;
				if(app.globalData.userInfo.gender==-1){
					id=app.globalData._hid;
				}
				else{
					id=app.globalData.useropenid;
				} 
				wx.cloud.callFunction({
					name: 'updatePsy',
					data: {
						_id:this.PsyList[this.chooseIndex].id,
						startTime:this.PsyList[this.chooseIndex].startTime,
						endTime:todaytime
					},success: res=> {
						console.info("调用 update psy 成功",res)
						if(res.result.status==0){
							uni.hideLoading()
							uni.showModal({
								title: "姨妈期结束啦",
								icon: 'fail',
								duration: 2000
							})
							this.isEnd=true;
							this.getPsy();
						}
						
					},fail:err=> {
						console.info("调用 update psy 失败",err)
					}
				})
			},
			onConfirm(res,type){
				uni.showLoading({
					title: '处理中...'
				})
				console.info(res)
				console.info(type)
				this.psydate=res;
				wx.cloud.callFunction({
					name: 'updatePsy',
					data: {
						_id:this.PsyList[this.chooseIndex].id,
						startTime:res.value[0],
						endTime:res.value[1]
					},success: res => {
						console.info("调用 update psy 成功",res)
						if(res.result.status==0){
							uni.hideLoading()
							uni.showModal({
								title: "修改成功",
								icon: 'success',
								duration: 2000
							})
						}
					},fail:err=>{
						console.info("调用 update psy 失败",err)
					}
				})
				this.chooseIndex=0
				this.getPsy();
			},
			onCancel(){
				
			},
			getPsy(){
				var hid=app.globalData._hid;
				wx.cloud.callFunction({
					name: 'getPsy',
					data: {
						_mid:hid,
					},success: res => {
						 console.info('success get psy info', res);
						if(res.result.status==0){
							var days=[];
							for(var i=0;i<res.result.msg.length;i++){
								if(res.result.msg[i].endTime=="未结束"){
									this.isEnd=false;
								}
								var obj = {
									id:res.result.msg[i]._id,
									startTime: res.result.msg[i].startTime,
									endTime: res.result.msg[i].endTime,
								}
								days.push(obj);
							}
							days.sort(function(a,b){
								 return b.startTime.localeCompare(a.startTime)
							})
							this.PsyList=days
						}
					},fail: res => {
						uni.hideLoading()
						uni.showModal({
							title: "发生错误，请联系管理员",
							icon: 'fail',
							duration: 2000
						})
						 console.info('fail get psy info', res);
					}
				})
			},
			chooseDate(item,index){
				console.info(item)
				console.info(index)
				this.chooseIndex=index;
				this.rangeVal[0]=item.startTime;
				this.rangeVal[1]=item.endTime;
				this.rangeVisible=true;
			}
		}, 
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.btn-hover {
		background: #f2f2f2 !important;
	}
	
	.but{
		width: 90%;
		font-size: small;
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 10rpx;
		text-align: center;
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
				width: 80%;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 30rpx;
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
