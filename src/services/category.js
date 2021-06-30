/*
 * @Description: 分类 category services层
 * @Author: 王振
 * @Date: 2021-06-30 09:46:21
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 15:46:16
 */

const { Category } = require('../db/model/index');
const { formatCategory } = require('./_format');

/**
 * @description: 创建分类
 * @param {string} categoryLevel 分类级别(1-一级分类 2-二级分类 3-三级分类)
 * @param {string} parentId 父分类id
 * @param {string} categoryName 分类名称
 * @param {string} categoryImg 分类图片
 * @param {number} categoryRank 排序值(字段越大越靠前)
 * @param {number} isDeleted 删除标识字段(0-未删除 1-已删除)
 * @param {string} createUser 创建者id
 * @param {string} updateUser 修改者id
 */
async function createCategory({
  categoryLevel,
  parentId = 0,
  categoryName,
  categoryImg,
  categoryRank = 0,
  isDeleted = 0,
  createUser,
  updateUser
}) {
  // 插入数据
  const result = await Category.create({
    categoryLevel,
    parentId,
    categoryName,
    categoryImg,
    categoryRank,
    isDeleted,
    createUser,
    updateUser: updateUser || createUser
  });
  return result.dataValues;
}

/**
 * @description: 查询分类
 */
async function getCategory() {
  // 查询数据库
  const result = await Category.findAll({});

  // 判断是否查询到数据
  if (result == null) {
    return result;
  }

  // 格式化数据
  let categoryList = result.map((res) => res.dataValues);
  categoryList = formatCategory(categoryList);
  return categoryList;
}

module.exports = {
  createCategory,
  getCategory
};
