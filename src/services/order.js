/*
 * @Description: 订单 orders services层
 * @Author: 王振
 * @Date: 2021-07-27 10:24:36
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 17:37:33
 */

const { Order } = require('../db/model/index');

/**
 * @description: 获取订单列表数据
 * @param {*} userId 用户id
 * @param {*} pageIndex 页数
 * @param {*} pageSize 每页多少条
 */
async function getOrderList({ userId, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const WhereOpts = {};
  if (userId) {
    WhereOpts.userId = userId;
  }

  // 执行查询
  const result = await Order.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'asc']],
    where: WhereOpts
  });
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  const orderList = result.rows.map((row) => row.dataValues);

  return {
    count: result.count,
    orderList
  };
}

/**
 * @description: 创建订单
 * @param {number} userId 用户id
 * @param {string} orderNum 订单号
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
async function createOrder({
  userId,
  orderNum,
  addressId,
  goodsId,
  amountPayable,
  totalPrice,
  freightPrice,
  payStatus,
  orderStatus,
  isInvoice,
  isDelete
}) {
  const result = await Order.create({
    userId,
    orderNum,
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
  return result.dataValues;
}

/**
 * @description: 更新购物车数据
 * @param {number} payStatus 支付状态
 * @param {number} orderStatus 订单状态
 * @param {number} userId 用户id
 * @param {number} id 订单id
 */
async function updateOrder({ payStatus, orderStatus }, { userId, id }) {
  // 拼接修改内容
  const updateData = {};
  if (payStatus) {
    updateData.payStatus = payStatus;
  }
  if (orderStatus) {
    updateData.orderStatus = orderStatus;
  }

  // 查询条件
  const whereData = { userId, id };

  // 执行修改
  const result = await Order.update(updateData, {
    where: whereData
  });

  return result[0] > 0; // 修改的行数
}

/**
 * @description: 删除订单数据
 * @param {number} userId 用户id
 * @param {number} id 订单id
 */
async function deleteOrder({ userId, id }) {
  const result = await Order.destroy({
    where: {
      userId,
      id
    }
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  getOrderList,
  createOrder,
  updateOrder,
  deleteOrder
};
