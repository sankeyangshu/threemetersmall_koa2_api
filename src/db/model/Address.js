/*
 * @Description: 收货地址数据模型
 * @Author: 王振
 * @Date: 2021-06-14 15:43:35
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-22 13:37:05
 */

const seq = require('../seq');
const { STRING, BOOLEAN, INTEGER } = require('../types');

//address数据库表
const Address = seq.define('address', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  tel: {
    type: STRING,
    allowNull: false,
    comment: '收货人手机号'
  },
  province: {
    type: STRING,
    allowNull: false,
    comment: '省份'
  },
  city: {
    type: STRING,
    allowNull: false,
    comment: '城市'
  },
  county: {
    type: STRING,
    allowNull: false,
    comment: '区县'
  },
  addressDetail: {
    type: STRING,
    allowNull: false,
    comment: '详细地址'
  },
  areaCode: {
    type: STRING,
    allowNull: false,
    comment: '地区编码，'
  },
  isDefault: {
    type: BOOLEAN,
    allowNull: false,
    comment: '	是否为默认地址'
  }
});

module.exports = Address;
