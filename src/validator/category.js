/*
 * @Description: category 数据格式校验
 * @Author: 王振
 * @Date: 2021-06-30 10:28:05
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 14:19:28
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    categoryLevel: {
      type: 'string',
      maxLength: 255
    },
    parentId: {
      type: 'string'
    },
    categoryName: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    categoryImg: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    categoryRank: {
      type: 'number',
      minimum: 0
    },
    isDeleted: {
      type: 'number',
      minimum: 0,
      maximum: 1
    },
    createUser: {
      type: 'string',
      maxLength: 255
    },
    updateUser: {
      type: 'string',
      maxLength: 255
    }
  }
};

/**
 * 校验分类数据格式
 * @param {Object} data 分类数据
 */
function categoryValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = categoryValidate;
