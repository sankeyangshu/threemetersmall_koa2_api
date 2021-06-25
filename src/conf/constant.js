/*
 * @Description:常量集合
 * @Author: 王振
 * @Date: 2021-06-08 20:59:42
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-08 20:59:58
 */

module.exports = {
  SECRET: 'Tara$0729_Queens', //jwt密匙
  DEFAULT_PICTURE: 'https://dwz.cn/rnTnftZs', //默认头像
  CRYPTO_SECRET_KEY: 'Hyominn00$Tara', //md5加密密钥
  No_Verification: ['/api/user/isExist', '/api/user/register', '/api/user/login'] //不用验证jwt的路由
};
