/*
 * @Description:数据模型入口文件
 * @Author: 王振
 * @Date: 2021-06-12 16:22:23
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-14 20:56:34
 */

const User = require('./User');
const Address = require('./Address');

//创建外键关联,地址数据表和个人信息数据表
Address.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Address
};
