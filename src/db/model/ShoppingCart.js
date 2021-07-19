/*
 * @Description: 购物车数据模型
 * @Author: 王振
 * @Date: 2021-07-15 09:07:05
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 16:23:18
 */

const seq = require('../seq');
const { STRING, INTEGER, DECIMAL } = require('../types');

// users数据库表
const ShoppingCart = seq.define('shoppingcart', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  goodsId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联商品id'
  },
  goodsName: {
    type: STRING,
    allowNull: false,
    comment: '所选商品名称'
  },
  goodsImg: {
    type: STRING,
    allowNull: false,
    comment: '所选商品头图'
  },
  goodsNumber: {
    type: INTEGER,
    allowNull: false,
    comment: '数量'
  },
  goodsPrice: {
    type: INTEGER,
    allowNull: false,
    comment: '商品价格'
  },
  spec: {
    type: STRING,
    allowNull: false,
    comment: '所选商品规格'
  },
  isDelete: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: '删除标识字段(0-未删除 1-已删除)'
  }
});

module.exports = ShoppingCart;
