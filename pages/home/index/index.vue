<template>
	<view>
		<view class="wrap">
			<!-- <u-swiper :list="image_list" :effect3d="true" :border-radius="12"></u-swiper> -->
			<image class="index_banner_img" :src="src"></image>
		</view>
		<view class="banner_banner_box">
			<u-card :title="title" :thumb="thumb" :title-size="25" :show-foot="false">
				<view class="" slot="body">
					<u-grid :col="4" :border="false">
						<u-grid-item>
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/jinianri.png?sign=b079f6d97f0da3bf222fe753c6c4affd&t=1634543408" :size="46"></u-icon>
							<view class="grid-text">纪念日</view>
						</u-grid-item>
						<u-grid-item @click="jumpTosetPsy()">
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/lijia.png?sign=f68a5e2c2c8f5ea2dba6bba4c206951f&t=1634543320" :size="46"></u-icon>
							<view class="grid-text">例假</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/xiangce.png?sign=16dd0dddbcfa95c2a95cbfda0954891a&t=1634543309" :size="46"></u-icon>
							<view class="grid-text">相册</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/zhangben.png?sign=051d05a3ffc8ede77de50a9fbce2f356&t=1634543290" :size="46"></u-icon>
							<view class="grid-text">账本</view>
						</u-grid-item>
					</u-grid>
					<u-grid :col="4" :border="false">
						<u-grid-item @tap="jumpToCalendar">
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/daka.jfif?sign=7dcdbf9e9b8f2bf561657f60593d1d10&t=1634543258" :size="46" ></u-icon>
							<view class="grid-text">打卡日历</view>
						</u-grid-item>
						<u-grid-item @tap="jumpToLottery">
							<u-icon name="https://6d79-mywindows10-v5wzr-1301410593.tcb.qcloud.la/image/choujiang.jpeg?sign=7ce46aae09d814bb53495a8260410b22&t=1634543226" :size="46"></u-icon>
							<view class="grid-text">积分抽奖</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="hourglass" :size="46"></u-icon>
							<view class="grid-text">敬请期待</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="hourglass" :size="46"></u-icon>
							<view class="grid-text">敬请期待</view>
						</u-grid-item>
					</u-grid>
				</view>
			</u-card>
		</view>

		<view>
			<u-card title="纪念日" :sub-title="dateTime" :thumb="anniversaryThumb" :title-size="25" :sub-title-size="25" :show-foot="false"
			 :box-shadow="30">
				<view class="" slot="body">
					<u-grid :col="4" :border="false">
						<u-grid-item>
							<u-row  class="row-anniversary-grid" gutter="5">
								<view v-if="TogetherDay==-1">
									<u-col span="27">
									<text font-size="25" style="text-align: center;" @click="jumpTosetting()">去设置</text>
									</u-col>
								</view>
								<view v-else>
									<u-col span="9">
										<u-count-to :start-val="0" :end-val="TogetherDay" :font-size="34"></u-count-to>
									</u-col>
									<u-col span="3" class="anniversary-grid-day">天</u-col>
								</view>
							</u-row>
							<view class="anniversary-grid-text">在一起已经</view>
						</u-grid-item>

						<u-grid-item>
							<u-row class="row-anniversary-grid" gutter="5">
								<view v-if="UntilHisBirthDay==-1">
									<u-col span="27">
									<text font-size="25" style="text-align: center;" @click="jumpTosetting()">去设置</text>
									</u-col>
								</view>
								<view v-else>
									<u-col span="9">
										<u-count-to :start-val="0" :end-val="UntilHisBirthDay" :font-size="34"></u-count-to>
									</u-col>
									<u-col span="3" class="anniversary-grid-day">天</u-col>
								</view>
							</u-row>
							<view class="anniversary-grid-text">离您的生日还有</view>
						</u-grid-item>
						<u-grid-item>
							<u-row class="row-anniversary-grid" gutter="5">
								<view v-if="UntilHerBirthDay==-1">
									<u-col span="27">
									<text font-size="25" style="text-align: center;">Ta未设置</text>
									</u-col>
								</view>
								<view v-else>
									<u-col span="9">
										<u-count-to :start-val="0" :end-val="UntilHerBirthDay" :font-size="34"></u-count-to>
									</u-col>
									<u-col span="3" class="anniversary-grid-day">天</u-col>
								</view>
							</u-row>
							<view class="anniversary-grid-text">离Ta的生日还有</view>
						</u-grid-item>
						<u-grid-item>
							<u-row class="row-anniversary-grid" gutter="5" @click="jumpTosetPsy()">
								<view v-if="UntilPhysiologicalDay==-1">
									<u-col span="27">
									<text font-size="25" style="text-align: center;">姨妈进行中</text>
									</u-col>
								</view>
								<view v-else>
									<u-col span="9">
										<u-count-to :start-val="0" :end-val="UntilPhysiologicalDay":font-size="34"></u-count-to>
									</u-col>
									<u-col span="3" class="anniversary-grid-day">天</u-col>
								</view>
							</u-row>

							<view class="anniversary-grid-text">姨妈来临还有</view>
						</u-grid-item>
					</u-grid>
				</view>
			</u-card>
		</view>

		<view>
			<u-card title="最近消息" :sub-title="subTitle" :thumb="thumb" :title-size="25">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">XXXX上传9张图片，点击查看</view>
						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
						 mode="aspectFill"></image>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">XXXX上传6张图片，点击查看</view>
						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
						 mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="查看更多" style="float: right;padding-bottom: 3px;"></u-icon>
				</view>
			</u-card>
		</view>
		<!-- wx用户调用权限 -->
		<u-toast ref="uToast" />
		<u-modal v-model="showUserLoginBox" :show-cancel-button="false" :show-confirm-button="false">
			<view class="slot-content">
				<rich-text :nodes="userLoginBoxContent">
				</rich-text>
				<view class="slot-content-buttonBox">
					<u-row gutter="16" class="userLoginBoxButton">
						<u-col span="6">
							<u-button shape="circle" @click="cancelLogin()">取消</u-button>
						</u-col>
						<u-col span="6">
							<u-button shape="circle" open-type='getUserInfo' @getuserinfo="bindgetuserinfo" type='success' @click="confirmLogin()">确定</u-button>
						</u-col>
					</u-row>
				</view>
			</view>
		</u-modal>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="tabBerList" :mid-button="true"></u-tabbar>
		
		
		
	</view>
</template>

<script>
	var app=getApp()
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				sublist:[],
				TogetherDay: -1,
				UntilHisBirthDay: -1,
				UntilHerBirthDay: -1,
				UntilPhysiologicalDay: -1,
				title: '实用工具',
				thumb: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/255793e0-4695-11eb-bc56-c9cea619f663.png',
				anniversaryThumb: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/2210a640-4695-11eb-8ff1-d5dcf8779628.png',
				dateTime: undefined,
				src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/569ac5e0-4694-11eb-bf0a-894cbc80c40a.jpg",
				current: 0,
				vuex_tabbar: undefined,
				showUserLoginBox: false,
				userLoginBoxContent: "检测到您还未授权登录，需要您的授权获取基本用户信息（不含手机号码、定位等隐私信息）,我们将严格保守您的用户隐私。",
			}
		},
		
		computed: {
			...mapGetters([
				'tabBerList'
			])
		}, //
		mounted() {
			// #ifdef MP-WEIXIN
			var that = this
			uni.getSetting({
				success(res) {
					console.log("index页面验证授权：", res);
					if (!res.authSetting['scope.userInfo']) {
						//这里调用授权
						console.log("当前未授权");
						that.showUserLoginBox = true
						// that.appLoginWx()
					} else {
						//用户已经授权过了
						console.log("当前已授权");
						/*订阅消息*/
						
					}
				}
			})
			
			// #endif
			this.dateTime = this.getTime()
			this.GETALLTIME();
			this.getsublist()
		},
		methods: {
			getsublist(){
				wx.cloud.callFunction({
					name:'getDiary',
					data: {
						_mid:app.globalData.useropenid,
						_hid:app.globalData._hid
					},
					success:res=>{
						console.info("get diary 云函数调用成功 ",res)
					},
					fail:err=>{
						console.info("get diary 云函数调用失败 ",err)
					}
				})
			},
			confirmLogin() {
				this.showUserLoginBox = false
				this.$refs.uToast.show({
					title: '取消授权',
					type: 'info'
				})
			},
			cancelLogin() {
				this.showUserLoginBox = false
			},
			// 授权登录后的回调
			bindgetuserinfo: function(res) {
				console.log(res) // "getUserInfo:fail auth deny"
				if (res.mp.detail.errMsg == "getUserInfo:ok") {
					this.$refs.uToast.show({
						title: '授权成功',
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						title: '拒绝授权',
						type: 'info'
					})
				}
			},
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate();
					// hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					// minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					// second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '年' + month + '月' + day + '日';
				return timer;
			},
			jumpToCalendar(){
				console.log("正在请求打开日历")
				// var newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:"/pages/home/index/signin/signin",
					// url:"../component/classdetails/classdetails?newsid="+ newsid,
					success:res =>{},
					fail:() =>{
						console.log("打开日历失败")
					},
					complete:() => {}
				});
			},
			jumpToLottery(){
				console.log("正在请求打开抽奖页面")
				// var newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:"/pages/home/index/Lottery/Lottery",
					// url:"../component/classdetails/classdetails?newsid="+ newsid,
					success:res =>{},
					fail:() =>{
						console.log("打开抽奖页面失败")
					},
					complete:() => {}
				});
			},
			jumpTosetting(){
				console.log("正在请求打开另一半页面")
				// var newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:"/pages/home/my/lovers/lovers",
					// url:"../component/classdetails/classdetails?newsid="+ newsid,
					success:res =>{},
					fail:() =>{
						console.log("打开另一半页面失败")
					},
					complete:() => {}
				});
			},
			jumpTosetPsy(){
				console.log("正在请求打开生理记录页面")
				// var newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:"/pages/home/index/Psy/Psy",
					// url:"../component/classdetails/classdetails?newsid="+ newsid,
					success:res =>{},
					fail:() =>{
						console.log("打开生理记录页面失败")
					},
					complete:() => {}
				});
			},
			GETALLTIME(){
				wx.cloud.callFunction({
					name: 'getLove',
					data: {
						_mid:app.globalData.useropenid,
					},success: res => {
						if(res.result.status==0){
							//计算在一起的时间
							var year=parseInt(res.result.msg.togethertime.substr(0,4));
							var month=parseInt(res.result.msg.togethertime.substr(5,2));
							var day=parseInt(res.result.msg.togethertime.substr(8,2));
							this.TogetherDay=this.getUntilNowDays(year,month,day);
							var mid,hid;//mid是男，hid是女
							if(app.globalData.userInfo.gender==1){
								mid=res.result.msg._mid;
								hid=res.result.msg._hid;
							}
							else{
								mid=res.result.msg._hid;
								hid=res.result.msg._mid;
							}
							//获取本人生日
							wx.cloud.callFunction({
								name: 'getUser',
								data: {
									_mid:mid,
								},success: res => {
									if(res.result.status==0){
										//计算您今年生日还有多久
										if(res.result.msg.birthday){
											var month=parseInt(res.result.msg.birthday.substr(5,2)); 
											var day=parseInt(res.result.msg.birthday.substr(8,2));
											this.UntilHisBirthDay=this.getDaysToBirthday(month,day)
										}
									}
								},fail: res => {
									uni.hideLoading()
									uni.showModal({
										title: "发生错误，请联系管理员",
										icon: 'fail',
										duration: 2000
									})
									 console.info('fail get user info', res);
								}
							});
							//获取Ta生日
							wx.cloud.callFunction({
								name: 'getUser',
								data: {
									_mid:hid,
								},success: res => {
									if(res.result.status==0){
										//计算ta今年生日还有多久
										if(res.result.msg.birthday){
											var month=parseInt(res.result.msg.birthday.substr(5,2));
											var day=parseInt(res.result.msg.birthday.substr(8,2));
											this.UntilHerBirthDay=this.getDaysToBirthday(month,day)
										}
									}
								},fail: res => {
									uni.hideLoading()
									uni.showModal({
										title: "发生错误，请联系管理员",
										icon: 'fail',
										duration: 2000
									})
									 console.info('fail get user info', res);
								}
							})
							wx.cloud.callFunction({
								name: 'getPsy',
								data: {
									_mid:hid,
								},success: res => {
									console.info('success get Psy info', res);
									if(res.result.status==0){
										var days=[];
										for(var i=0;i<res.result.msg.length;i++){
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
										if(days[0].endTime=="未结束"){
											this.UntilPhysiologicalDay=-1;
										}
										else{
											var nowday=new Date().getDate();
											var lastday=parseInt(days[0].startTime.substr(8,2));
											if(lastday-nowday<0){
												this.UntilPhysiologicalDay=30+lastday-nowday;
											}
											else{
												this.UntilPhysiologicalDay=lastday-nowday;
											}
										}
									}
								},fail: res => {
									uni.hideLoading()
									uni.showModal({
										title: "发生错误，请联系管理员",
										icon: 'fail',
										duration: 2000
									})
									 console.info('fail get Psy info', res);
								}
							})
							
						}
					},fail: res => {
						uni.hideLoading()
						uni.showModal({
							title: "发生错误，请联系管理员",
							icon: 'fail',
							duration: 2000
						})
						 console.info('fail get love info', res);
					}
				})
			},
			getDaysToBirthday(month,day){
				var now = new Date();
				var thisYear = now.getFullYear();
				//今年的生日
				var birthday = new Date(thisYear,month - 1,day);
				if(birthday < now){
					birthday.setFullYear(now.getFullYear()+1);
				}
				var timeDec = birthday - now;
				var days = timeDec / (24 * 60 * 60 * 1000);
				return Math.ceil(days);
			},
			getUntilNowDays(year,month,day){
				var now=new Date();
				var date1=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
				var date2=new Date(year,month-1,day);
				console.info(date2,date1);
				var date= (date1.getTime()-date2.getTime())/(1000*60*60*24);/*不用考虑闰年否*/
				return date;
			}

			
		}
	}
</script>

<style>
	.index_banner_img {
		left: 0px;
		top: 0px;
		z-index: -1;
		position: absolute;
		width: 100%;
		height: 40vh;
	}

	.banner_banner_box {
		margin-top: 5rem;

	}
</style>

<style lang="less" scoped>
	::v-deep .u-count-num {
		font-size: 22rpx;
	}
</style>

<style lang="scss">
	page {
		background: #f2f2f2;
	}
</style>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.row-anniversary-grid {
		height: 50rpx;
	}

	.anniversary-grid-day {
		font-size: 30rpx;
		font-weight: normal;
		color: #303133;
		text-align: center;
		margin: 0 auto;
		line-height: 50rpx;
	}

	.anniversary-grid-text {
		font-size: 22rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.u-count-num {
		font-size: 22rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 20rpx;
		padding-bottom: 40rpx;

		.slot-content-buttonBox {
			padding-top: 50rpx;
			margin-bottom: 30rpx;
		}
	}


</style>
