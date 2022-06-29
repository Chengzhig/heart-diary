'use strict';
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mywindows10-v5wzr'
})

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const log = cloud.logger()
  log.info(event)
  console.info("收到的数据为：",event);
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
