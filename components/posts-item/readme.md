<template lang="pug">
    publishItem(@onConfirmClick='onConfirmClick' :itemData='itemData' @onItemClick='onItemClick' @onRemoveMenuData='onRemoveMenuData')
</template>
<script>
    import publishItem from '@/components/posts-item/publish.vue';
    export default {
        components: {
            publishItem
        },
        data() {
            return {
                itemData: [{
                        type: 'MENU',
                        action: 'UPLOAD_IMAGE',
                        ico: '/static/assets/ico/task/icon_picture.png',
                        title: '上传图片'
                    },
                    {
                        type: 'MENU',
                        action: 'UPLOAD_VIDEO',
                        ico: '/static/assets/ico/task/icon_video.png',
                        title: '上传视频'
                    }
                ]
            }
        },
        methods: {
            //菜单点击事件
            onItemClick(options) {
                console.log(options);
            },
            //删除事件
            onRemoveMenuData(options) {
                console.log(options);
            },
            onConfirmClick(event) {
                console.log(event);
            }
        },
    }
</script>
<style lang="scss" scoped>

</style>
