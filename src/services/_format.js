/*
 * @Description:数据格式化
 * @Author: 王振
 * @Date: 2021-06-13 14:10:33
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-22 14:43:42
 */

//获取默认头像
const { DEFAULT_PICTURE } = require('../conf/constant');
const { timeFormat } = require('../utils/date');

/**
 * @description: 用户默认头像
 * @param {Object} obj 用户头像
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * @description: 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户头像
 */
function formatUser(list) {
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    //数组
    return list.map(_formatUserPicture);
  }

  //单个对象
  return _formatUserPicture(list);
}

/**
 * @description: 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAt = timeFormat(obj.createdAt);
  obj.updatedAt = timeFormat(obj.updatedAt);
  return obj;
}

function _formatDBAddress(obj) {
  const arr = {};
  arr.id = obj.id;
  arr.address = `${obj.province}${obj.city}${obj.county}${obj.addressDetail}`;
  arr.name = obj.name;
  arr.tel = obj.tel;
  arr.isDefault = obj.isDefault;
  return arr;
}

/**
 * @description: 格式化用户收货地址列表
 * @param {Array|Object} list 用户收货地址列表
 */
function formatAddress(list) {
  //判断是否存在数据
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    //数组
    return list.map(_formatDBAddress);
  }

  //单个对象
  return _formatDBTime(list);
}

module.exports = {
  formatUser,
  formatAddress
};
