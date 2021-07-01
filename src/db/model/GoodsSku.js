/*
 * @Description: 商品详情数据模型
 * @Author: 王振
 * @Date: 2021-07-01 13:03:31
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 15:55:41
 */

const seq = require('../seq');
const { STRING, DECIMAL, INTEGER, BOOLEAN } = require('../types');

// goodsSkus数据库表
const GoodsSku = seq.define('goodssku', {
  categoryId: {
    type: INTEGER,
    allowNull: false,
    comment: '所属分类id'
  },
  goodsName: {
    type: STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goodsInfo: {
    type: STRING,
    allowNull: false,
    comment: '商品简介'
  },
  goodsImg: {
    type: STRING,
    allowNull: false,
    comment: '商品图片'
  },
  goodsPrice: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
    comment: '商品价格'
  },
  linePrice: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
    comment: '商品原价'
  },
  goodsDetail: {
    type: STRING,
    allowNull: false,
    comment: '商品详情'
  },
  goodsSales: {
    type: INTEGER,
    comment: '商品销量'
  },
  mainSpec: {
    type: STRING,
    allowNull: false,
    comment: '主规格名称'
  },
  mainSpecValue: {
    type: STRING,
    allowNull: false,
    comment: '主规格值'
  },
  auxiSpec: {
    type: STRING,
    allowNull: false,
    comment: '辅规格名称'
  },
  auxiSpecValue: {
    type: STRING,
    allowNull: false,
    comment: '辅规格值'
  },
  isShelves: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否上架'
  }
});

module.exports = GoodsSku;
