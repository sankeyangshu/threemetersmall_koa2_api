/*
 * @Description: 订单 控制层
 * @Author: 王振
 * @Date: 2021-07-27 10:47:07
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 17:40:06
 */

const { getOrderList, createOrder, updateOrder, deleteOrder } = require('../services/order');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { randomNumber } = require('../utils/utils');
const { SECRET } = require('../conf/constant');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * @description: 新增订单
 * @param {*} ctx 上下文
 * @param {number} addressId 所填地址id
 * @param {string} goodsId 所选商品信息
 * @param {number} amountPayable 应付金额
 * @param {number} totalPrice 商品总价
 * @param {number} freightPrice 运费
 * @param {number} payStatus 支付状态
 * @param {number} orderStatus 订单状态
 * @param {boolean} isInvoice 是否需要发票
 * @param {boolean} isDelete 是否删除
 */
async function addOrder(
  ctx,
  {
    addressId,
    goodsId,
    amountPayable,
    totalPrice,
    freightPrice,
    payStatus,
    orderStatus,
    isInvoice,
    isDelete
  }
) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { id } = payload;
  try {
    // 添加订单
    await createOrder({
      userId: id,
      orderNum: randomNumber(6),
      addressId,
      goodsId,
      amountPayable,
      totalPrice,
      freightPrice,
      payStatus,
      orderStatus,
      isInvoice,
      isDelete
    });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加订单失败'
    });
  }
}

/**
 * @description: 获取订单列表数据
 * @param {*} ctx 上下文
 * @param {*} pageIndex 页数
 * @param {*} pageSize 每页多少条
 * @return {*}
 */
async function getOrder(ctx, { pageIndex = 0, pageSize = 10 }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  // 获取用户收货地址
  const result = await getOrderList({ userId, pageIndex, pageSize });
  const orderList = result.orderList;
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: orderList.length === 0,
    orderList,
    pageSize,
    pageIndex,
    count: result.count
  });
}

/**
 * @description: 修改订单
 * @param {*} ctx 上下文
 * @param {number} payStatus 支付状态
 * @param {number} orderStatus 订单状态
 * @param {number} id 订单id
 */
async function changeOrder(ctx, { payStatus, id, orderStatus }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await updateOrder({ payStatus, orderStatus }, { userId, id });
  if (result) {
    // 执行成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10010,
    message: '修改订单失败'
  });
}

/**
 * @description: 删除购物车数据
 * @param {*} ctx 上下文
 * @param {*} id 用户id
 * @return {*}
 */
async function destoryOrder(ctx, id) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await deleteOrder({ userId, id });
  if (result) {
    // 删除成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10011,
    message: '删除订单失败'
  });
}

module.exports = {
  addOrder,
  getOrder,
  changeOrder,
  destoryOrder
};
