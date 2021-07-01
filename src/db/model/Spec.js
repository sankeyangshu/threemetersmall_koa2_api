/*
 * @Description: 商品规格组数据模型
 * @Author: 王振
 * @Date: 2021-07-01 13:18:59
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 13:26:35
 */

const seq = require('../seq');
const { STRING, INTEGER } = require('../types');

// specs数据库表
const Spec = seq.define('spec', {
  specName: {
    type: STRING,
    allowNull: false,
    comment: '规格组名称'
  },
  goodsId: {
    type: INTEGER,
    allowNull: false,
    comment: '商品id'
  }
});

module.exports = Spec;
