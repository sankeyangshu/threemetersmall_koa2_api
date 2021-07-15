/*
 * @Description: 购物车 controller层
 * @Author: 王振
 * @Date: 2021-07-15 09:44:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-15 10:02:39
 */

const {
  getShoppingList,
  createShopping,
  deleteShopping,
  updateShopping
} = require('../services/shoppingcart');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { SECRET } = require('../conf/constant');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * @description: 新增购物车数据
 * @param {*} ctx 上下文
 * @param {number} goodsId 商品id
 * @param {number} goodsNumber 商品数量
 * @param {number} spec 商品规格
 * @param {number} isDelete 是否删除
 * @return {*}
 */
async function addShopping(ctx, { goodsId, goodsNumber, spec, isDelete }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { id } = payload;
  try {
    // 添加收货地址
    await createShopping({
      userId: id,
      goodsId,
      goodsNumber,
      spec,
      isDelete
    });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加购物车失败'
    });
  }
}

/**
 * @description: 获取购物车列表数据
 * @param {*} ctx 上下文
 * @param {*} pageIndex 页数
 * @param {*} pageSize 每页多少条
 * @return {*}
 */
async function getShopping(ctx, { pageIndex = 0, pageSize = 10 }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  // 获取用户收货地址
  const result = await getShoppingList({ userId, pageIndex, pageSize });
  const shoppingList = result.shoppingList;
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: shoppingList.length === 0,
    shoppingList,
    pageSize,
    pageIndex,
    count: result.count
  });
}

/**
 * @description: 修改购物车
 * @param {*} ctx 上下文
 * @param {*} goodsNumber 商品数量
 * @param {*} id 商品id
 * @return {*}
 */
async function changeShopping(ctx, { goodsNumber, id }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await updateShopping(
    {
      goodsNumber
    },
    { userId, id }
  );
  if (result) {
    // 执行成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10010,
    message: '修改购物车失败'
  });
}

/**
 * @description: 删除购物车数据
 * @param {*} ctx 上下文
 * @param {*} id 用户id
 * @return {*}
 */
async function destoryShopping(ctx, id) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await deleteShopping({ userId, id });
  if (result) {
    // 删除成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10011,
    message: '删除购物车失败'
  });
}

module.exports = {
  addShopping,
  getShopping,
  changeShopping,
  destoryShopping
};
