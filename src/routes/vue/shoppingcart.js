/*
 * @Description: 购物车 shoppingcart API 路由
 * @Author: 王振
 * @Date: 2021-07-15 09:15:44
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 16:57:04
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  addShopping,
  getShopping,
  changeShopping,
  destoryShopping
} = require('../../controller/shoppingcart');
const { genValidator } = require('../../middlewares/validator');
const shopcartValidate = require('../../validator/shoppingcart');

// 路由前缀
router.prefix('/api/shoppingcart');

// 获取购物车数据
router.get('/getshopping', async (ctx, next) => {
  let { pageIndex, pageSize } = ctx.request.query;
  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);
  ctx.body = await getShopping(ctx, { pageIndex, pageSize });
});

// 添加购物车
router.post('/addshopping', genValidator(shopcartValidate), async (ctx, next) => {
  const { goodsId, goodsName, goodsImg, goodsNumber, goodsPrice, spec, isDelete } =
    ctx.request.body;
  ctx.body = await addShopping(ctx, {
    goodsId,
    goodsName,
    goodsImg,
    goodsNumber,
    goodsPrice,
    spec,
    isDelete
  });
});

// 更新购物车数据
router.patch('/updateshopping', genValidator(shopcartValidate), async (ctx, next) => {
  const { goodsNumber, id } = ctx.request.body;
  ctx.body = await changeShopping(ctx, { goodsNumber, id });
});

// 删除购物车数据
router.delete('/deleteshopping', genValidator(shopcartValidate), async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await destoryShopping(ctx, id);
});

// 导出路由
module.exports = router;
