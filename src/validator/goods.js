/*
 * @Description: goods 数据格式校验
 * @Author: 王振
 * @Date: 2021-07-01 16:09:34
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 16:15:35
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'number'
    },
    goodsName: {
      type: 'string',
      maxLength: 255
    },
    goodsInfo: {
      type: 'string',
      maxLength: 255
    },
    goodsImg: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    goodsPrice: {
      type: 'number',
      minimum: 0
    },
    linePrice: {
      type: 'number',
      minimum: 0
    },
    goodsDetail: {
      type: 'string'
    },
    goodsSales: {
      type: 'number',
      minimum: 0
    },
    mainSpec: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    mainSpecValue: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    auxiSpec: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    auxiSpecValue: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    isShelves: {
      type: 'boolean'
    }
  }
};

/**
 * 校验商品数据格式
 * @param {Object} data 商品数据
 */
function goodsValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = goodsValidate;
