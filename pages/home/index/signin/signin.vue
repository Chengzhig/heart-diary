<template>
	<view class="sign" style="width: 100%; padding-bottom: 40;">
		<view style="padding:120rpx 0 40rpx; width: 100%;height: 250rpx; background: center ;background-size: contain;">
			<view style="text-align: center;">已连续签到</view>
			<view style="text-align: center; margin-top: 30;"><text style="font-size: 50rpx;margin-right: 10rpx; color: #FF9900; font-weight: bold;" >{{sumCount}}</text>
				天</view>
		</view>
		<view style=" border-radius: 20rpx; margin-left: 20; margin-right: 20;padding-top: 20;padding-bottom: 20;">
			<modelCalendar style="" :sendYear="toYear" :sendMonth="toMonth" :dataSourceId="mysignid" :dataSource="signData" :dataSource2="signData2" :totalNum="sumCount" @dateChange="getRecord">
			</modelCalendar> 
			
			<view style="padding-left: 40;padding-right: 40;">
				<u-button type="warning" @click="clickSign" :disabled="status" style="width: 100%;" >{{!status?'立即签到':'今日已签到'}}</u-button>
			</view>
		</view>
		<view class='count'>
			<view style="font-weight: bold;" >连续签到有机会领取以下奖励：</view>
			<view  style="margin-top: 20;margin-bottom: 6;">连续 <text style="color:#FF9900;">7</text>天，奖励积分<text style="color:#FF9900;">{{set.signin_day_seven}}</text>分；</view>
			<view>连续<text  style="color:#FF9900;">15</text>天，奖励积分<text style="color:#FF9900;">{{set.signin_day_fifteen}}</text>
				分</view>
		</view>
	</view>
</template>

<script>
	import modelCalendar from 'pages/home/index/newcalendar/newcalendar.vue';
	var app=getApp();

	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: [], //自己的数据
				signData2: [],//他/她的数据
				status: true,//true表示签到过了，不能签到
				set: {signin_day_seven:'20',signin_day_fifteen:'50'},
				month: '',
				mysignid:'',
			};
		},
		components: {
			modelCalendar
		},
		onLoad() {
			this.init();
			this.setSign();
		},
		methods: {
			subscribe(){
				wx.requestSubscribeMessage({
				  tmplIds: ['Kh22i0NiY9UULTOwPZV2uH5-qWDjdtRmjgC_A3Y9xoU'],
				  success :res=>{ }
				})
			},
			async getData(){
				var year=new Date().getFullYear(),
					month=new Date().getMonth()+1
				this.signData=uni.getStorageSync("signData");
				//this.signData2=uni.getStorageSync("signData2");
				//当前日历上的年和月
				var nowyear=new Date().getFullYear(),
					nowmonth=new Date().getMonth()+1

				//当前时间与日期时间不同，不可签到
				
				if(this.month!=''){
					year=parseInt(this.month.substr(0,4));
					month=parseInt(this.month.substr(5));
				}
				if(nowmonth==month&&nowyear==year){
					if(this.signData.includes(this.getToday())){
						this.status=true;
					}
					else{
						this.status=false;
					}
				}
				else{
					this.status=false;
				}
				
				wx.cloud.callFunction({
					name: 'getsign',
					data: {
						_mid: app.globalData._hid,
						signYear:year, 
						signMonth:month
					}  
					,success:res=>{
						 console.info('success get hsign', res);
						 if(res.result.status==0){
							 uni.setStorageSync("signData2",res.result.msg.signinDay)
							 this.signData2 = res.result.msg.signinDay
							 console.log("siginday2="+res.result.msg.signinDay)
						 } 
						 else{
							 this.signData2=[]
						 }
					},fail: function(res) {
						uni.hideLoading()
						uni.showModal({ 
							title: "对方签到数据加载失败"+res,
							icon: 'fail',
							duration: 2000
						})
						console.info('fail get sign', res);
					}
				}) 
				wx.cloud.callFunction({
					name: 'getsign',
					data: {
						_mid: app.globalData.useropenid,
						signYear:year,
						signMonth:month
					}
					,success:res=>{
						 console.info('success get sign', res);
						 if(res.result.status==0){//找到自己的签到数据
							 uni.setStorageSync("signData",res.result.msg.signinDay)
							 this.mysignid = res.result.msg._id
							 this.signData = res.result.msg.signinDay
							 this.sumCount = res.result.msg.sussionDay 
							 console.log("siginday="+res.result.msg.signinDay)
							 if(res.result.msg.signinDay!=null){
								if(res.result.msg.signYear!=nowyear||res.result.msg.signMonth!=nowmonth){
									 this.status=true;
									 console.log("this.status:"+this.status)
								}
								else if(res.result.msg.signinDay.length!=0&&res.result.msg.signinDay.includes(this.getToday())){
									this.status=true;
								}
								else{
									this.status=false;
								}
							}
							else{
								this.status=false;
							}
						 }
						 else{//找不到签到数据
							 this.signData=[],
							 this.sumCount=0,
							 this.status=false;
							 
						 }
					},fail: function(res) {
						uni.hideLoading() 
						uni.showModal({
							title: "签到数据加载失败"+res,
							icon: 'fail',
							duration: 2000
						})
						console.info('fail get sign', res);
					}
				})
			}
			,
			init(){
				this.getData()
			},
			async setSign() {
				await this.getData();
			},
			getRecord(data) {
				this.month = data
				console.log(data)
				this.init()
			},
			clickSign (){
				this.subscribe();
				var id=app.globalData._hid
				wx.cloud.callFunction({
					name: 'sendServiceMessage',
					data: {
						id:id 
					}
					,success:res=>{
						 console.log(res)
					},fail:err=>{
						console.info("调用云函数sendServiceMessage失败",err)
					}
				}) 
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate();
				uni.showLoading({
					title: '处理中...'
				})
				
				var today = this.getToday();
					wx.cloud.callFunction({
					  name: 'signup', 
					  data: { 
						_mid: app.globalData.useropenid, 
						date: today,
						}, 
					  success: res=> { 
						uni.hideLoading(); 
						uni.showModal({ 
						  title: res.result.msg, 
						  icon: 'success', 
						  duration: 2000 ,
						});
						this.getData(); 
						this.init();
						console.log(res); 
					  }, fail: err=> { 
						uni.hideLoading(); 
						uni.showModal({ 
						  title: "签到失败", 
						  icon: 'fail', 
						  duration: 2000 ,
						  }); 
						this.getData(); 
						console.info("调用云函数signup失败", err); 
					  } 
					}); 
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getToday(){
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate();
				var tmp;
				if(month<=9){
					month="0"+month;
				}
				if(day<=9){
					day="0" + day;
				}
				tmp=year+"-"+month+"-"+day
				return tmp
			},
			
		}
	}
</script>

<style lang='scss'>
	page{
		height: 100%;
		background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_origin_min_pic%2F19%2F09%2F11%2Fa06bb68c44a5191302af8aebabc00bc5.jpg%21%2Ffw%2F750%2Fquality%2F99%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630826730&t=cc1ad4af169832d9cb698d1d9f2fbbe3") no-repeat;
		background-size: cover;
	}
	.sign {
		
		background-size: cover;
	}

	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		/* text-align: center; */
		border-radius: 10px;
		flex-direction: column;
		/* justify-content: center; */
		background-color: #fff;
		/* align-items: center; */
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
