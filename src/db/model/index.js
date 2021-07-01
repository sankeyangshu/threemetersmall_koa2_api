/*
 * @Description:数据模型入口文件
 * @Author: 王振
 * @Date: 2021-06-12 16:22:23
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 15:44:08
 */

const User = require('./User');
const Address = require('./Address');
const Category = require('./Category');
const GoodsSku = require('./GoodsSku');

// 创建外键关联,地址数据表和个人信息数据表
Address.belongsTo(User, {
  foreignKey: 'userId'
});

// 分类数据表和商品详情数据表外键关联
Category.hasMany(GoodsSku, {
  foreignKey: 'categoryId'
});

module.exports = {
  User,
  Address,
  Category,
  GoodsSku
};
