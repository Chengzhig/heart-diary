//文章发布
<template lang="pug">
    view.item-out-view
      view.topic-view(v-if="topic")
        text {{topic}}
      textarea.remark-view(
          v-if="isComment" 
          :show-confirm-bar='false' 
          :adjust-position='true' 
          :disable-default-padding='true' 
          :placeholder="'请输入描述内容吧……'" 
          v-model='commentVaule' 
          @focus='onFocus'
          @blur='onBlur'
          :placeholder-class='placeholderStyle')
      view.item-inner-view
        view.list-item(v-for="(item,index) in itemData" :key="index" @tap.stop='onItemClick({item,index})')
          view.image-view(v-if="item.type=='IMAGE'" )
            image.ico(:src='getThumb(item.ico)')
            image.remove(v-if="!item.isHideRemove" :src="removeIco"  @tap.stop='onRemoveMenuData({item,index,itemIndex})')
          view.text-view(v-if="item.type=='TEXT'" )
           image.ico
           text.desc {{item.desc}}
           text.title {{item.title}}
           image.remove(:src="removeIco"  @tap.stop='onRemoveMenuData({item,index})')
          view.menu-view(v-if="item.type=='MENU'")
            image.ico(:src='item.ico')
            text.title {{item.title}}
      sButton(:isBottom='true' :desc="'发布'" @onClick='onConfirmClick') 
</template>
<script>
	import sButton from '@/components/posts-item/s-index.vue';
    export default {
		components: {
			sButton
		},
        props: {
            itemData: {
                type: Array,
                default: function() {
                    return []
                }
            },
            itemIndex: {
                type: Number,
                default: -1
            },
            isComment: {
                type: Boolean,
                default: true
            },
            removeIco: {
                type: String,
                default: '/static/icon_close.png'
            },
            palyIco: {
                type: String,
                default: '/static/icon_play.png'
            },
            topic: {
                type: String,
                default: null
            },
        },
        data() {
            return {
                bottomHeight: 0,
                commentVaule: ''
            }
        },
        methods: {
            getThumb(url) {
                // if (!url) {
                return url;
                // }
                // return this.$options.that.getThumb(url);
            },
            //底部按钮点击事件
            onConfirmClick(event) {
                this.$emit('onConfirmClick', this.commentVaule)
				this.commentVaule=""
            },
            //输入框聚焦
            onFocus(e) {
                this.bottomHeight = e.detail.height;
            },
            //输入框失聚焦
            onBlur(e) {
                this.bottomHeight = 0;
            },
            //列表点击事件
            onItemClick(option) {
                this.$emit('onItemClick', option)
            },
            //删除事件
            onRemoveMenuData(option) {
                this.$emit('onRemoveMenuData', option)
            },
        },
    }
</script>
<style lang="less" scoped>
    .item-out-view {
        padding: 32rpx;
        background: white;
        display: flex;
        flex-direction: column;
        .topic-view {
            margin-bottom: 40rpx;
            text {
                font-size: 28rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                border-radius: 13px;
                padding: 12rpx 24rpx;
                background: rgba(251, 250, 250, 1);
                color: rgba(247, 70, 12, 1);
            }
        }
        .remark-view {
            background: white;
            padding: 24rpx;
            width: auto;
            height: 300rpx;
            border: 1px solid rgba(242, 242, 242, 1);
            border-radius: 4px;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
        }
        .placeholderStyle {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(216, 216, 216, 1);
        }
        .item-inner-view {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background: white;
            flex-flow: row wrap;
            flex-direction: row;
            .list-item {
                display: flex;
                margin-top: 30rpx;
                .not(4);
                view {
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    width: 152rpx;
                    height: 152rpx;
                }
                .menu-view {
                    background: rgba(251, 249, 249, 1);
                    border-radius: 4px;
                    .ico {
                        width: 60rpx;
                        height: 60rpx;
                    }
                    .title {
                        margin: 8rpx 0 0;
                        font-size: 28rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                    }
                }
                .image-view {
                    .ico {
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 0;
                        /*设置重叠的上下次序，值越大月在上方*/
                        width: 152rpx;
                        height: 152rpx;
                        border-radius: 6px;
                    }
                    .remove {
                        margin: -72rpx 0 0 70rpx;
                        width: 32rpx;
                        height: 32rpx;
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 1;
                    }
                }
                .video-view {
                    .ico {
                        border-radius: 6px;
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 0;
                        /*设置重叠的上下次序，值越大月在上方*/
                        width: 152rpx;
                        height: 152rpx;
                    }
                    .remove {
                        margin: -72rpx 0 0 70rpx;
                        width: 32rpx;
                        height: 32rpx;
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 1;
                    }
                    .paly-ico {
                        // margin: 54rpx 0 0 0;
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 1;
                        /*设置重叠的上下次序，值越大月在上方*/
                        width: 44rpx;
                        height: 44rpx;
                    }
                }
                .text-view {
                    background: rgba(251, 249, 249, 1);
                    border-radius: 4px;
                    .ico {
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 0;
                        /*设置重叠的上下次序，值越大月在上方*/
                        width: 152rpx;
                        height: 152rpx;
                    }
                    .desc {
                        font-size: 32rpx;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: rgba(94, 95, 235, 1);
                    }
                    .title {
                        margin: 22rpx 0 0;
                        font-size: 28rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                    }
                    .remove {
                        margin: -72rpx 0 0 70rpx;
                        width: 32rpx;
                        height: 32rpx;
                        position: absolute;
                        /*设置为绝对定位*/
                        z-index: 1;
                    }
                }
            }
        }
        .not(@n) {
            margin-right: calc(32rpx / @n);
        }
    }
</style>
