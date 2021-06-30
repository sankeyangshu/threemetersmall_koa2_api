/*
 * @Description: 商品分类数据模型
 * @Author: 王振
 * @Date: 2021-06-29 10:11:12
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 13:55:08
 */

const seq = require('../seq');
const { STRING, DECIMAL, INTEGER } = require('../types');

// categorys数据库表
const Category = seq.define('category', {
  categoryLevel: {
    type: STRING,
    allowNull: false,
    comment: '分类级别(1-一级分类 2-二级分类 3-三级分类)'
  },
  parentId: {
    type: STRING,
    allowNull: false,
    defaultValue: 0,
    comment: '父分类id'
  },
  categoryName: {
    type: STRING,
    allowNull: false,
    comment: '分类名称'
  },
  categoryImg: {
    type: STRING,
    comment: '分类图片'
  },
  categoryRank: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '排序值(字段越大越靠前)'
  },
  isDeleted: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: '删除标识字段(0-未删除 1-已删除)'
  },
  createUser: {
    type: STRING,
    allowNull: false,
    comment: '创建者id'
  },
  updateUser: {
    type: STRING,
    comment: '修改者id'
  }
});

module.exports = Category;
