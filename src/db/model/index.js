/*
 * @Description:数据模型入口文件
 * @Author: 王振
 * @Date: 2021-06-12 16:22:23
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 14:39:23
 */

const User = require('./User');
const Address = require('./Address');
const Category = require('./Category');
const GoodsSpec = require('./GoodsSpec');
const GoodsSku = require('./GoodsSku');
const Spec = require('./Spec');
const SpecValue = require('./SpecValue');

// 创建外键关联,地址数据表和个人信息数据表
Address.belongsTo(User, {
  foreignKey: 'userId'
});

// 分类数据表和商品详情数据表外键关联
Category.hasMany(GoodsSku, {
  foreignKey: 'categoryId'
});

// 商品详情数据表和规格组数据表外键关联
GoodsSku.hasMany(Spec, {
  foreignKey: 'goodsId'
});

// 规格组数据表和规格值数据表外键关联
Spec.hasMany(SpecValue, {
  foreignKey: 'specId'
});

module.exports = {
  User,
  Address,
  Category,
  GoodsSpec,
  GoodsSku,
  Spec,
  SpecValue
};
