/*
 * @Description: 商品 goods services层
 * @Author: 王振
 * @Date: 2021-07-01 14:53:06
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-01 16:49:08
 */

const { GoodsSku } = require('../db/model/index');
const { formatGoods } = require('./_format');

/**
 * @description: 获取商品列表
 * @param {number} categoryId 分类id
 * @param {number} pageIndex  页数
 * @param {number} pageSize 每页多少条
 */
async function getGoodsList({ categoryId, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const WhereOpts = {};
  if (categoryId) {
    WhereOpts.categoryId = categoryId;
  }

  // 执行查询
  const result = await GoodsSku.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'asc']],
    where: WhereOpts,
    attributes: ['id', 'categoryId', 'goodsName', 'goodsInfo', 'goodsImg', 'goodsPrice']
  });
  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组

  // 获取 dataValues
  const goodsList = result.rows.map((row) => row.dataValues);

  return {
    count: result.count,
    goodsList
  };
}

/**
 * @description: 获取商品详情数据
 * @param {*} id 商品id
 */
async function getGoodsDetail(id) {
  // 查询条件
  const whereOpt = { id };

  // 查询数据库
  const result = await GoodsSku.findOne({
    where: whereOpt
  });

  // 判断是否查询到数据
  if (result == null) {
    return result;
  }

  // 格式化数据
  const goodsDetail = formatGoods(result.dataValues);
  return goodsDetail;
}

/**
 * @description: 创造商品
 * @param {number} categoryId 所属分类id
 * @param {string} goodsName 商品名称
 * @param {string} goodsInfo 商品简介
 * @param {string} goodsImg 商品图片
 * @param {number} goodsPrice 商品价格
 * @param {number} linePrice 商品原价
 * @param {string} goodsDetail 商品详情
 * @param {number} goodsSales 商品销量
 * @param {string} mainSpec 主规格名称
 * @param {string} mainSpecValue 主规格值
 * @param {string} auxiSpec 辅规格名称
 * @param {string} auxiSpecValue 辅规格值
 * @param {boolean} isShelves 是否上架
 */
async function createGoods({
  categoryId,
  goodsName,
  goodsInfo,
  goodsImg,
  goodsPrice,
  linePrice,
  goodsDetail,
  goodsSales,
  mainSpec,
  mainSpecValue,
  auxiSpec,
  auxiSpecValue,
  isShelves
}) {
  // 插入数据
  const result = await GoodsSku.create({
    categoryId,
    goodsName,
    goodsInfo,
    goodsImg,
    goodsPrice,
    linePrice,
    goodsDetail,
    goodsSales,
    mainSpec,
    mainSpecValue,
    auxiSpec,
    auxiSpecValue,
    isShelves
  });
  return result.dataValues;
}

module.exports = {
  getGoodsList,
  getGoodsDetail,
  createGoods
};
