<template lang="pug">
	view
		publishItem(@onConfirmClick='onConfirmClick' :itemData='itemData' @onItemClick='onItemClick' @onRemoveMenuData='onRemoveMenuData')
		u-tabbar(:list="tabBerList" :mid-button="true")
</template>


<script>
	var app=getApp()
	import {
		mapGetters
	} from 'vuex'
	import publishItem from '@/components/posts-item/publish.vue';
	export default {
		components: {
			publishItem
		},
		computed: {
			...mapGetters([
				'tabBerList'
			])
		}, //
		data() {
			return {
				itemData: [{
						type: 'MENU',
						action: 'UPLOAD_IMAGE',
						ico: '/static/icon_picture.png',
						title: '上传图片'
					}
				]
			}
		},
		methods: {
			//菜单点击事件
			onItemClick(options) {
				var that = this;
				if(options.index==0){
					uni.chooseImage({
						//count: 1, //上传图片的数量，默认是9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: function (res) {
							const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
										// console.log(tempFilePaths + '----');
							for (var i = 0; i < tempFilePaths.length; i++) {
								var obj={
									type:'IMAGE',
									ico:tempFilePaths[i],
									isHideRemove:false
								}
								that.itemData.push(obj);
							}
						},
					});
				}
				console.log(options);
			}, 
			//删除事件
			onRemoveMenuData(options) {
				this.itemData.splice(options.index,1)
			},
			onConfirmClick(event) {
				var that = this
				var pics=[];
				var flag=0;
				for(var i=1;i<this.itemData.length;i++){
					pics.push(this.itemData[i].ico)
					flag=1;
				}
				var n = Date.now();
				var date = new Date(n);
				var Y = date.getFullYear() ;
				var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var H = date.getHours()<10? '0' + date.getHours(): date.getHours();
				var M = date.getMinutes()<10? '0' + date.getMinutes(): date.getMinutes();
				var S = date.getSeconds()<10? '0' + date.getSeconds(): date.getSeconds();
				var time=Y +'_'+ M + '_' + D+'_'+H+'_'+M+'_'+S;
				if(flag){
					var obj={
						pics:pics,
						time:time
					}
					this.uploadimg(obj)
				}
				var first = this.itemData.shift();
				this.itemData=[first];
				console.info(event);
				wx.cloud.callFunction({
					name: 'addDiary',
					data: {
						_mid:app.globalData.useropenid,
						text:event,
						picsurl:time,
						createtime:time
					},success: res => {
						console.info("add Diary成功",res)
						uni.showModal({
						  title:  '发布成功', 
						  icon: 'success', 
						  duration: 2000 ,
						});
					},fail:err=>{
						console.info("add Diary失败",err)
						uni.showModal({
						  title:  '发布失败', 
						  icon: 'success', 
						  duration: 2000 ,
						});
					}
				})
			},
			
			uploadimg: function(data) {
				console.info(data)
			    wx.showLoading({
			        title: '上传中...',
			        mask: true,
			    })
				var that = this,
			        i = data.i ? data.i : 0,
			        success = data.success ? data.success : 0,
			        fail = data.fail ? data.fail : 0;
			    wx.cloud.uploadFile({
			       cloudPath: app.globalData.useropenid+'/'+data.time+'/'+i+'.jpg',
			       filePath: data.pics[i],
			        success: (resp) => {
			          wx.hideLoading();
			          success++;
					  console.info(resp)
			        },
			        fail: (res) => {
			          fail++;
			          console.log('fail:' + i + "fail:" + fail);
			        },
			        complete: () => {
			          i++;
			          if (i == data.pics.length) { //当图片传完时，停止调用     
			            console.log('执行完毕');
			            console.log('成功：' + success + " 失败：" + fail);
						if(success==i){
							
						}
						else{
							uni.showModal({
							  title:  '图片未完全上传，成功：' + success + "个，失败：" + fail+"个", 
							  icon: 'fail', 
							  duration: 2000 ,
							});
						}
			          } else { //若图片还没有传完，则继续调用函数
			            data.i = i;
			            data.success = success;
			            data.fail = fail;
			            that.uploadimg(data);//递归，回调自己
			          }
			        }
			    });
			},
		},
	}
</script> 

<style lang="scss">
	
</style>