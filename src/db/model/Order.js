/*
 * @Description: 订单数据模型
 * @Author: 王振
 * @Date: 2021-07-27 10:02:08
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 17:34:56
 */

const seq = require('../seq');
const { STRING, DECIMAL, INTEGER, BOOLEAN, TEXT } = require('../types');

// orders数据库表
const Order = seq.define('order', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  orderNum: {
    type: STRING,
    allowNull: false,
    comment: '订单号'
  },
  addressId: {
    type: INTEGER,
    allowNull: false,
    comment: '所填地址id'
  },
  goodsId: {
    type: TEXT,
    allowNull: false,
    comment: '所选商品信息'
  },
  amountPayable: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0.0,
    comment: '应付金额'
  },
  totalPrice: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0.0,
    comment: '商品总价'
  },
  freightPrice: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
    comment: '运费'
  },
  payStatus: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: '支付状态:0.未支付,1.支付成功,-1:支付失败'
  },
  orderStatus: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment:
      '订单状态:0.待支付 1.已支付 2.配货完成 3:出库成功 4.交易成功 -1.手动关闭 -2.超时关闭 -3.商家关闭'
  },
  isInvoice: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否需要发票'
  },
  isDelete: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否删除订单'
  }
});

module.exports = Order;
