// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

const rp = require('request-promise');
// 云函数入口函数

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'pk-word-env',
  traceUser: true,
})
exports.main = async (event, context) => {

  const appid = 'wx47cd61a3bbe9d4c6',
  secret = '12f0f00c45e0a89c33e11d59c7ac8f8e';
  const AccessToken_options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      appid,
      secret,
      grant_type:'client_credential'
    },
    json: true
  };
  //获取AccessToken
  const resultValue = await rp(AccessToken_options);
  const token = resultValue.access_token;
  return token ;
}

