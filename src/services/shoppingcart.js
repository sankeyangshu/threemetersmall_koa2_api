/*
 * @Description: 购物车 services层
 * @Author: 王振
 * @Date: 2021-07-15 09:26:16
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 13:40:22
 */

const { ShoppingCart } = require('../db/model/index');

/**
 * @description: 获取购物车列表数据
 * @param {*} userId 用户id
 * @param {*} pageIndex 页数
 * @param {*} pageSize 每页多少条
 */
async function getShoppingList({ userId, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const WhereOpts = {};
  if (userId) {
    WhereOpts.userId = userId;
  }

  // 执行查询
  const result = await ShoppingCart.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'asc']],
    where: WhereOpts
  });
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  const shoppingList = result.rows.map((row) => row.dataValues);

  return {
    count: result.count,
    shoppingList
  };
}

/**
 * @description: 创造购物车
 * @param {number} userId 用户id
 * @param {number} goodsId 商品id
 * @param {string} goodsName 商品名称
 * @param {string} goodsImg 商品头图
 * @param {number} goodsNumber 商品数量
 * @param {number} goodsPrice 商品价格
 * @param {string} spec 商品规格
 * @param {boolean} isChecked 是否选中商品
 * @param {number} isDelete 是否删除
 */
async function createShopping({
  userId,
  goodsId,
  goodsName,
  goodsImg,
  goodsNumber,
  goodsPrice,
  spec,
  isChecked,
  isDelete
}) {
  const result = await ShoppingCart.create({
    userId,
    goodsId,
    goodsName,
    goodsImg,
    goodsNumber,
    goodsPrice,
    spec,
    isChecked,
    isDelete
  });
  return result.dataValues;
}

/**
 * @description: 更新购物车数据
 * @param {number} goodsNumber 商品数量
 * @param {boolean} isChecked 是否选中该商品
 * @param {number} userId 用户id
 * @param {number} id 购物车id
 */
async function updateShopping({ goodsNumber, isChecked }, { userId, id }) {
  // 拼接修改内容
  const updateData = {};
  if (goodsNumber) {
    updateData.goodsNumber = goodsNumber;
  }
  if (isChecked) {
    updateData.isChecked = isChecked;
  }

  // 查询条件
  const whereData = { userId, id };

  // 执行修改
  const result = await ShoppingCart.update(updateData, {
    where: whereData
  });
  console.log(result);

  return result[0] > 0; // 修改的行数
}

/**
 * @description: 删除购物车数据
 * @param {number} userId 用户id
 * @param {number} id 购物车id
 */
async function deleteShopping({ userId, id }) {
  const result = await ShoppingCart.destroy({
    where: {
      userId,
      id
    }
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  getShoppingList,
  createShopping,
  deleteShopping,
  updateShopping
};
