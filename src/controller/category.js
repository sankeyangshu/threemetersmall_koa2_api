/*
 * @Description: 分类 控制层
 * @Author: 王振
 * @Date: 2021-06-30 10:06:16
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 15:46:34
 */

const { createCategory, getCategory } = require('../services/category');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { SECRET } = require('../conf/constant');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * @description: 新增分类
 * @param {*} ctx 上下文
 * @param {string} categoryLevel 分类级别(1-一级分类 2-二级分类 3-三级分类)
 * @param {string} parentId 父分类id
 * @param {string} categoryName 分类名称
 * @param {string} categoryImg 分类图片
 * @param {number} categoryRank 排序值(字段越大越靠前)
 * @param {number} isDeleted 删除标识字段(0-未删除 1-已删除)
 */
async function addCategory(
  ctx,
  { categoryLevel, parentId, categoryName, categoryImg, categoryRank, isDeleted }
) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { id } = payload;

  try {
    // 添加分类
    await createCategory({
      categoryLevel,
      parentId,
      categoryName,
      categoryImg,
      categoryRank,
      isDeleted,
      createUser: id
    });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加分类失败'
    });
  }
}

/**
 * @description: 获取分类列表
 */
async function getCategoryList() {
  // 获取分类列表
  const category = await getCategory();
  return new SuccessModel(category);
}

module.exports = {
  addCategory,
  getCategoryList
};
