/*
 * @Description: order 数据校验
 * @Author: 王振
 * @Date: 2021-07-27 10:56:25
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 17:35:57
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userId: {
      type: 'number'
    },
    orderNum: {
      type: 'string',
      maxLength: 255
    },
    addressId: {
      type: 'number'
    },
    goodsId: {
      type: 'string'
    },
    amountPayable: {
      type: 'number',
      minimum: 0
    },
    totalPrice: {
      type: 'number',
      minimum: 0
    },
    freightPrice: {
      type: 'number',
      minimum: 0
    },
    payStatus: {
      type: 'number'
    },
    orderStatus: {
      type: 'number'
    },
    isInvoice: {
      type: 'boolean'
    },
    isDelete: {
      type: 'boolean'
    }
  }
};

/**
 * 校验订单数据格式
 * @param {Object} data 订单数据
 */
function orderValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = orderValidate;
