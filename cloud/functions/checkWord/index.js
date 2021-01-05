// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

const rp = require('request-promise');
// 云函数入口函数

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  try{
    const res = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    return res.errCode;
  } catch(err) {
    return err.errCode;
  }
}

