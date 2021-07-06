/*
 * @Description:数据格式化
 * @Author: 王振
 * @Date: 2021-06-13 14:10:33
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-06 09:26:00
 */

// 获取默认头像
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
    // 数组
    return list.map(_formatUserPicture);
  }

  // 单个对象
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

/**
 * @description: 格式化地址
 * @param {Object} obj 数据
 */
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
  // 判断是否存在数据
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBAddress);
  }

  // 单个对象
  return _formatDBTime(list);
}

/**
 * @description: 格式化一级分类对象
 * @param {Array} list 分类总数组
 * @param {Array} arr 二级分类数组
 */
function _formatONECategory(list, arr) {
  const array = []; // 分类列表
  for (let i = 0; i < list.length; i++) {
    const data = {}; // 一级分类数据
    if (list[i].categoryLevel === '1') {
      data.categoryName = list[i].categoryName; // 分类名称
      data.categoryLevel = list[i].categoryLevel; // 分类级别
      data.id = list[i].id; // 一级分类id
      // 筛选父级id和二级分类id相同的数据
      data.content = arr.filter((val) => {
        // eslint-disable-next-line eqeqeq
        return val.parentId == data.id;
      });
      array.push(data);
    }

    // console.log(array);
  }
  return array;
}

/**
 * @description: 格式化二级分类对象
 * @param {*} obj 二级分类数据
 */
function _formatTWOCategory(obj) {
  const arr = {};
  if (obj.categoryLevel === '2') {
    arr.categoryName = obj.categoryName; // 分类名称
    arr.categoryImg = obj.categoryImg; // 分类图片
    arr.parentId = obj.parentId; // 父级id
    arr.categoryId = obj.id; // 分类id
    arr.categoryLevel = obj.categoryLevel; // 分类级别
    return arr;
  }
}

/**
 * @description: 格式化分类列表
 * @param {*} list 分类列表
 */
function formatCategory(list) {
  // 判断是否存在数据
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    const arr = list.filter(_formatTWOCategory);
    return _formatONECategory(list, arr);
  }

  // 单个对象
  return _formatDBTime(list);
}

/**
 * @description: 格式化商品详情
 * @param {*} obj 商品数据
 */
function formatGoods(obj) {
  const newObj = {};
  // 格式化商品详情时间
  newObj.createdAt = timeFormat(obj.createdAt);
  newObj.updatedAt = timeFormat(obj.updatedAt);
  // 格式化其他信息
  newObj.goodsName = obj.goodsName;
  newObj.goodsInfo = obj.goodsInfo;
  newObj.goodsImg = obj.goodsImg;
  newObj.goodsPrice = obj.goodsPrice;
  newObj.linePrice = obj.linePrice;
  newObj.goodsDetail = obj.goodsDetail;
  newObj.goodsSales = obj.goodsSales;

  return newObj;
}

/**
 * @description: 格式化商品的规格
 * @param {*} obj 商品规格数据
 */
function _formatSku(obj) {
  const sku = {};
  sku.skuTitle = obj.specName; // 获取规格标题
  sku.skuValue = obj.specValue.split(','); // 获取规格数据
  sku.skuPrice = obj.specPrice.split(','); // 获取规格价格
  sku.skuImg = obj.specImg.split(','); // 获取规格图片
  sku.skuStock = obj.specStock.split(','); // 获取规格库存
  return sku;
}

/**
 * @description: 格式化商品规格sku
 * @param {Array|Object} list 商品规格列表
 */
function formatSpec(list) {
  // 判断是否存在数据
  if (!list) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatSku);
  }

  // 单个对象
  return _formatSku(list);
}

module.exports = {
  formatUser,
  formatAddress,
  formatCategory,
  formatGoods,
  formatSpec
};
