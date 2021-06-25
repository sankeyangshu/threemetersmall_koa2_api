/*
 * @Description: address 数据格式校验
 * @Author: 王振
 * @Date: 2021-06-15 20:30:13
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-15 20:34:05
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    tel: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    province: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    county: {
      type: 'string',
      maxLength: 255
    },
    addressDetail: {
      type: 'string',
      maxLength: 255
    },
    areaCode: {
      type: 'string',
      maxLength: 255
    },
    isDefault: {
      type: 'boolean'
    }
  }
};

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function addressValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = addressValidate;
