<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>

<script>
	export default {
		
		onLaunch: function() {
			wx.cloud.init({
				env:'mywindows10-v5wzr'
			})
			// 获取用户信息
			wx.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
					  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						wx.getUserProfile({
							success: res => {
							  // 可以将 res 发送给后台解码出 unionId
								console.log("app onlaunch 用户已授权")
								this.globalData.userInfo = res.userInfo
								hasUserInfo: true
								// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
								// 所以此处加入 callback 以防止这种情况
								if (this.userInfoReadyCallback) {
									this.userInfoReadyCallback(res)
								}
								
							}
						})
					}
				}
			})
		},
		globalData: {
			userInfo: null,
			hasUserInfo: false,
			canIUseGetUserProfile: false,
			useropenid:null,
			_hid:null,//专指另一半，不分男女，数据库中_hid专指女性
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		getUserProfile(e) {
		    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		    wx.getUserProfile({
		      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		      success: (res) => {
		        this.setData({
		          userInfo: res.userInfo,
		          hasUserInfo: true
		        })
		      }
		    })
		  },
		getUserInfo(e) {
			// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
			this.setData({
			  userInfo: e.detail.userInfo,
			  hasUserInfo: true
			})
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
