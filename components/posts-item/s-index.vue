//通用按钮
<template lang="pug">
  view(:class="['item-view',{'item-view__bottom':isBottom,}]" @tap.stop='onClick')
    image.logo(v-if="logo" :src='logo')
    button(:disabled='isDisable' :class="['btn',{'btn__disable':isDisable}]")  {{desc}}
    
</template>
<script>
    export default {
        props: {
            //按钮描述
            desc: {
                type: String,
                default: '确定'
            },
            //是否放到底部
            isBottom: {
                type: Boolean,
                default: false
            },
            //是否禁用
            isDisable: {
                type: Boolean,
                default: false
            },
            //区分按钮类型
            name: {
                type: String,
                default: ''
            },
            //按钮logo
            logo: {
                type: String,
                default: ''
            },
        },
        methods: {
            onClick() {
                this.$emit('onClick', this.name)
            }
        },
    }
</script>
<style lang="scss" scoped>
    .item-view {
        width: auto;
        flex-direction: row;
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
        background: linear-gradient(133deg, rgba(255, 170, 0, 1) 0%, rgba(241, 0, 21, 1) 100%);
        border-radius: 26px;
        .logo {
            margin-right: 16rpx;
            width: 44rpx;
            height: 44rpx;
        }
        .btn {
            background: 0;
            line-height: 96rpx;
            text-align: center;
            font-size: 28rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            height: 96rpx;
            &__disable {
                opacity: 0.5;
            }
        }
        &__bottom {
            bottom: 180rpx;
            left: 32rpx;
            right: 32rpx;
            position: fixed;
            /*设置为绝对定位*/
            z-index: 1;
        }
    }
    button {
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
    }
    button::after {
        border: 0;
    }
</style>
