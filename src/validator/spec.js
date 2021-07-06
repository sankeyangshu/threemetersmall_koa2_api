/*
 * @Description: spec 数据格式校验
 * @Author: 王振
 * @Date: 2021-07-06 09:46:02
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-06 09:48:07
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    goodsId: {
      type: 'number'
    },
    specName: {
      type: 'string',
      maxLength: 255
    },
    specValue: {
      type: 'string',
      maxLength: 255
    },
    specImg: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    specPrice: {
      type: 'string',
      maxLength: 255
    },
    specStock: {
      type: 'string',
      maxLength: 255
    }
  }
};

/**
 * 校验商品数据格式
 * @param {Object} data 商品数据
 */
function specValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = specValidate;
