/*
 * @Description:测试服务 jest server
 * @Author: 王振
 * @Date: 2021-06-08 20:44:00
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-08 20:44:12
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);
