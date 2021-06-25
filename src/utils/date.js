/*
 * @Description: 时间相关的工具函数
 * @Author: 王振
 * @Date: 2021-06-21 09:58:17
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-21 10:19:47
 */
const { format } = require('date-fns');

/**
 * @description: 格式化时间
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), 'yyyy-MM-dd HH:mm:ss');
}

module.exports = {
  timeFormat
};
