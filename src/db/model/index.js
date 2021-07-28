/*
 * @Description:数据模型入口文件
 * @Author: 王振
 * @Date: 2021-06-12 16:22:23
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 10:27:46
 */

const User = require('./User');
const Address = require('./Address');
const Category = require('./Category');
const GoodsSku = require('./GoodsSku');
const Spec = require('./Spec');
const ShoppingCart = require('./ShoppingCart');
const Order = require('./Order');

// 创建外键关联,地址数据表和个人信息数据表
Address.belongsTo(User, {
  foreignKey: 'userId'
});

// 分类数据表和商品详情数据表外键关联
Category.hasMany(GoodsSku, {
  foreignKey: 'categoryId'
});

// 商品数据表和规格数据表外键关联
GoodsSku.hasMany(Spec, {
  foreignKey: 'goodsId'
});

// 购物车和用户数据表外键关联
ShoppingCart.belongsTo(User, {
  foreignKey: 'userId'
});

// 创建外键关联,订单数据表和个人信息数据表
Order.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Address,
  Category,
  GoodsSku,
  Spec,
  ShoppingCart,
  Order
};
