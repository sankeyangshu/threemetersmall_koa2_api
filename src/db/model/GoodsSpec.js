/*
 * @Description: 商品与规格值关系数据模型-暂不使用
 * @Author: 王振
 * @Date: 2021-07-01 13:33:16
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 13:56:11
 */

const seq = require('../seq');
const { INTEGER } = require('../types');

// goodsSpecs数据库表
const GoodsSpec = seq.define('goodsSpec', {
  goodsId: {
    type: INTEGER,
    allowNull: false,
    comment: '商品id'
  },
  specId: {
    type: INTEGER,
    allowNull: false,
    comment: '规格组id'
  },
  specValueId: {
    type: INTEGER,
    allowNull: false,
    comment: '规格值id'
  }
});

module.exports = GoodsSpec;
