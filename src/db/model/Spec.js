/*
 * @Description: 规格值数据模型
 * @Author: 王振
 * @Date: 2021-07-05 19:31:32
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-05 19:40:38
 */

const seq = require('../seq');
const { STRING, DECIMAL, INTEGER } = require('../types');

// specs数据库表
const Spec = seq.define('spec', {
  goodsId: {
    type: INTEGER,
    allowNull: false,
    comment: '所属商品id'
  },
  specName: {
    type: STRING,
    allowNull: false,
    comment: '规格名称'
  },
  specValue: {
    type: STRING,
    allowNull: false,
    comment: '规格值'
  },
  specImg: {
    type: STRING,
    allowNull: false,
    comment: '规格值图片'
  },
  specPrice: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
    comment: '规格值价格'
  },
  specStock: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
    comment: '库存'
  }
});

module.exports = Spec;
