/*
 * @Description: 规格 spec services层
 * @Author: 王振
 * @Date: 2021-07-06 08:51:35
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-06 09:14:59
 */

const { Spec } = require('../db/model/index');
const { formatSpec } = require('./_format');

/**
 * @description: 创造规格
 * @param {number} goodsId 所属商品id
 * @param {string} specName 规格名称
 * @param {string} specValue 规格值
 * @param {string} specImg 规格值图片
 * @param {string} specPrice 规格值价格
 * @param {string} specStock 库存
 */
async function createSpec({ goodsId, specName, specValue, specImg, specPrice, specStock }) {
  // 插入数据
  const result = await Spec.create({ goodsId, specName, specValue, specImg, specPrice, specStock });
  return result.dataValues;
}

/**
 * @description: 获取规格数据
 * @param {*} goodsId 所属商品id
 */
async function getSpecInfo({ goodsId }) {
  // 查询条件
  const whereOpt = { goodsId };

  // 查询数据库
  const result = await Spec.findAll({
    where: whereOpt
  });

  // 判断是否查询到数据
  if (result == null) {
    return result;
  }

  // 格式化数据
  let specList = result.map((res) => res.dataValues);
  specList = formatSpec(specList);
  return specList;
}

module.exports = {
  createSpec,
  getSpecInfo
};
