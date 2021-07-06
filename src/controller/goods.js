/*
 * @Description: 商品 控制层
 * @Author: 王振
 * @Date: 2021-07-01 15:50:34
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-06 09:56:23
 */

const { createGoods, getGoodsList, getGoodsDetail } = require('../services/goods');
const { createSpec, getSpecInfo } = require('../services/spec');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/**
 * @description: 新增商品
 * @param {number} categoryId 所属分类id
 * @param {string} goodsName 商品名称
 * @param {string} goodsInfo 商品简介
 * @param {string} goodsImg 商品图片
 * @param {number} goodsPrice 商品价格
 * @param {number} linePrice 商品原价
 * @param {string} goodsDetail 商品详情
 * @param {number} goodsSales 商品销量
 * @param {boolean} isShelves 是否上架
 */
async function addGoods({
  categoryId,
  goodsName,
  goodsInfo,
  goodsImg,
  goodsPrice,
  linePrice,
  goodsDetail,
  goodsSales,
  isShelves
}) {
  try {
    // 添加商品
    await createGoods({
      categoryId,
      goodsName,
      goodsInfo,
      goodsImg,
      goodsPrice,
      linePrice,
      goodsDetail,
      goodsSales,
      isShelves
    });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加商品失败'
    });
  }
}

/**
 * @description: 获取商品列表数据
 * @param {number} categoryId 分类id
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页多少条
 */
async function getGoodsInfo({ categoryId, pageIndex = 0, pageSize = 10 }) {
  // 获取商品列表数据
  const result = await getGoodsList({ categoryId, pageIndex, pageSize });
  const goodsList = result.goodsList;
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: goodsList.length === 0,
    goodsList,
    pageSize,
    pageIndex,
    count: result.count
  });
}

/**
 * @description: 获取商品详情数据
 * @param {*} id 商品id
 * @return {*}
 */
async function getGoodsData(id) {
  // 获取商品详情数据
  const data = await getGoodsDetail(id);
  // 获取商品sku数据
  data.sku = await getSpecInfo({ goodsId: id });
  return new SuccessModel(data);
}

/**
 * @description: 新增商品规格
 * @param {*} goodsId 所属商品id
 * @param {*} specName 规格名称
 * @param {*} specValue 规格值
 * @param {*} specImg 规格图片
 * @param {*} specPrice 规格价格
 * @param {*} specStock 规格库存
 */
async function addSpec({ goodsId, specName, specValue, specImg, specPrice, specStock }) {
  try {
    await createSpec({ goodsId, specName, specValue, specImg, specPrice, specStock });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加规格失败'
    });
  }
}

module.exports = {
  addGoods,
  getGoodsInfo,
  getGoodsData,
  addSpec
};
