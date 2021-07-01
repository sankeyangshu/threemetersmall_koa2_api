/*
 * @Description: 商品规格值数据模型
 * @Author: 王振
 * @Date: 2021-07-01 13:24:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 13:59:06
 */

const seq = require('../seq');
const { STRING, INTEGER } = require('../types');

// sepcValues数据表
const SpecValue = seq.define('specvalue', {
  specValueName: {
    type: STRING,
    allowNull: false,
    comment: '规格值名称'
  },
  specId: {
    type: INTEGER,
    allowNull: false,
    comment: '规格组id'
  }
});

module.exports = SpecValue;
