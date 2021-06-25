/*
 * @Description:环境变量
 * @Author: 王振
 * @Date: 2021-06-08 20:25:25
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-08 20:25:37
 */

const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
};
