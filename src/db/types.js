/*
 * @Description:封装sequelize数据类型
 * @Author: 王振
 * @Date: 2021-06-09 09:40:44
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-09 09:41:08
 */

const Sequelize = require('sequelize');

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
};
