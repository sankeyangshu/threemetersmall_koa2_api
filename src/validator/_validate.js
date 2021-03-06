/*
 * @Description: json schema 校验
 * @Author: 王振
 * @Date: 2021-06-13 15:56:45
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 14:16:20
 */

const Ajv = require('ajv');
const ajv = new Ajv({
  allErrors: true // 输出所有的错误（比较慢）
});

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
}

module.exports = validate;
