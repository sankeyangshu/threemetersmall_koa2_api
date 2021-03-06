/*
 * @Description: shoppingcart 数据校验
 * @Author: 王振
 * @Date: 2021-07-15 09:17:53
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 13:05:54
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userId: {
      type: 'number'
    },
    goodsId: {
      type: 'number'
    },
    goodsName: {
      type: 'string',
      maxLength: 255
    },
    goodsImg: {
      type: 'string',
      maxLength: 255
    },
    goodsNumber: {
      type: 'number'
    },
    goodsPrice: {
      type: 'number'
    },
    spec: {
      type: 'string',
      maxLength: 255
    },
    isChecked: {
      type: 'boolean'
    },
    isDelete: {
      type: 'number',
      minimum: 0,
      maximum: 1
    }
  }
};

/**
 * 校验购物车数据格式
 * @param {Object} data 购物车数据
 */
function shopcartValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = shopcartValidate;
