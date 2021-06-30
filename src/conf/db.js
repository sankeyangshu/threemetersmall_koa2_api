/*
 * @Description:存储配置
 * @Author: 王振
 * @Date: 2021-06-08 20:23:04
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-12 19:20:40
 */

const { isProd } = require('../utils/env');

// 本地Redis配置
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
};

// 本地MySQL配置
let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'noderoot',
  port: '3306',
  database: 'mall_db'
};

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  };

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    user: 'root',
    password: 'noderoot',
    port: '3306',
    database: 'mall_db'
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
};
