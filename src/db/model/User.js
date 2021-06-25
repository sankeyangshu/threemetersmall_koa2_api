/*
 * @Description: 用户数据模型
 * @Author: 王振
 * @Date: 2021-06-12 15:27:02
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-12 16:23:27
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

//users数据库表
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男性，2 女性，3 保密）'
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址'
  }
});

module.exports = User;
