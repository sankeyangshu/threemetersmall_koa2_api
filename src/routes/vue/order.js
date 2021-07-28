/*
 * @Description: 订单 order API 路由
 * @Author: 王振
 * @Date: 2021-07-27 10:20:06
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 16:51:13
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { addOrder, getOrder, changeOrder, destoryOrder } = require('../../controller/order');
const { genValidator } = require('../../middlewares/validator');
const orderValidate = require('../../validator/order');

// 路由前缀
router.prefix('/api/order');

// 用户获取订单列表
router.get('/getOrder', async (ctx, next) => {
  let { pageIndex, pageSize } = ctx.request.query;
  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);
  ctx.body = await getOrder(ctx, { pageIndex, pageSize });
});

// 用户提交订单
router.post('/addOrder', genValidator(orderValidate), async (ctx, next) => {
  const {
    addressId,
    goodsId,
    amountPayable,
    totalPrice,
    freightPrice,
    payStatus,
    orderStatus,
    isInvoice,
    isDelete
  } = ctx.request.body;
  ctx.body = await addOrder(ctx, {
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
});

// 用户修改订单
router.patch('/changeOrder', genValidator(orderValidate), async (ctx, next) => {
  const { payStatus, id, orderStatus } = ctx.request.body;
  ctx.body = await changeOrder(ctx, { payStatus, id, orderStatus });
});

// 用户删除订单
router.delete('/deleteOrder', async (ctx, next) => {
  const { id } = ctx.request.query;
  ctx.body = await destoryOrder(ctx, id);
});

// 导出路由
module.exports = router;
