<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="setting iconfont icon31shezhi"></view>
			<view class="info">
				<open-data class="avatar"  mode="a	pectFill" type="userAvatarUrl"></open-data>
				<image class="avatar" mode="a	pectFill" :src="userInfo.headPicUrl"></image>
				<view class="nickname" style="color: #000000;">{{userInfo.nickName}}</view>
			</view>
		</view>


		<!-- 滑动导航 -->
		<view style="border-radius: 20rpx; overflow: hidden; margin: 0 20rpx;">
			<com-nav :list="list" :col="4" @click="clickMenuButton(list)"></com-nav>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in serverList" :key="index">
						<view class="cell-left"  @click="gotopage(item.path)">
							<image class="cell-icon" :src="item.icon" mode="aspectFill" ></image>
							<view class="cell-text">{{ item.title }}</view>
						</view>
						<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<u-tabbar :list="tabBerList" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import comNav from './components/com-nav.vue'
	import {
		mapGetters 
	} from 'vuex'
	export default {
		components: {
			comNav
		},
		data() {
			return {
				userInfo: {
					headPicUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/25fef770-4695-11eb-bc56-c9cea619f663.png',
					nickName: '请先登录',
				},
				currentIndex: 0,
				list: [{
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/2406d0f0-4695-11eb-8ff1-d5dcf8779628.png',
						text: '另一半',
						url: '/pages/home/my/lovers/lovers'
					},
					{
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/24ac11a0-4695-11eb-8ff1-d5dcf8779628.png',
						text: '个性主题',
						url: ''
					},
					{
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/86387350-4695-11eb-b680-7980c8a877b8.png',
						text: '情侣VIP',
						url: ''
					},
					{
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/2074a980-4695-11eb-8ff1-d5dcf8779628.png',
						text: '免广告',
						url: '/pages/home/my/ad/ad'
					}
				],
				serverList: [
					{
							title: '我  的',
							icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/a913f160-4695-11eb-b997-9918a5dda011.png',
							path: '/pages/home/my/myinfo/myinfo'
					},
					{
						title: '客服中心',
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/a913f160-4695-11eb-b997-9918a5dda011.png',
						path: 'kefu'
					},
					{
						title: '帮助中心',
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/a7a0d960-4695-11eb-b997-9918a5dda011.png',
						path: 'help'
					},
					{
						title: '版  本',
						icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-jiasichen/a7a0d960-4695-11eb-b997-9918a5dda011.png',
						text: '1.0.0'
					}
				]
			};
		},
		computed: {
			...mapGetters([
				'tabBerList'
			])
		},
		mounted() {
			this.getUser()
		},
		methods: {
			getUser() {
				let that = this
				uni.getSetting({
					success(res) {
						console.log("授权：", res);
						var app = getApp()
						if (!app.globalData.userInfo) {
							//这里调用授权
							console.log("当前未授权");
						} else {
							//用户已经授权过了
							console.log("当前已授权"); 
							console.log(app.globalData.userInfo)
							that.userInfo.headPicUrl =app.globalData.userInfo.avatarUrl;
							that.userInfo.nickName = app.globalData.userInfo.nickName;
							
						}
					}
				})
			},
			gotopage(path){
				console.info(path);
				uni.navigateTo({
					url:path,
					// url:"../component/classdetails/classdetails?newsid="+ newsid,
					success:res =>{},
					fail:() =>{
						console.log("打开path失败"+path)
					},
					complete:() => {}
				});
			}
		}
	};
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
