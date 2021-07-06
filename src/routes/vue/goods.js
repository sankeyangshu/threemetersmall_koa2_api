/*
 * @Description: 商品 goods API 路由
 * @Author: 王振
 * @Date: 2021-07-01 14:43:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-06 09:48:56
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { addGoods, getGoodsInfo, getGoodsData, addSpec } = require('../../controller/goods');
const { genValidator } = require('../../middlewares/validator');
const goodsValidate = require('../../validator/goods');
const specValidate = require('../../validator/spec');

// 路由前缀
router.prefix('/api/goods');

// 用户获取商品列表
router.get('/goodslist', async (ctx, next) => {
  let { categoryId, pageIndex, pageSize } = ctx.request.query;
  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);
  ctx.body = await getGoodsInfo({ categoryId, pageIndex, pageSize });
});

// 用户获取商品详情
router.get('/goodsdetail', async (ctx, next) => {
  const { id } = ctx.request.query;
  ctx.body = await getGoodsData(id);
});

// 新增商品
router.post('/addgoods', genValidator(goodsValidate), async (ctx, next) => {
  const {
    categoryId,
    goodsName,
    goodsInfo,
    goodsImg,
    goodsPrice,
    linePrice,
    goodsDetail,
    goodsSales,
    isShelves
  } = ctx.request.body;
  ctx.body = await addGoods({
    categoryId,
    goodsName,
    goodsInfo,
    goodsImg,
    goodsPrice,
    linePrice,
    goodsDetail,
    goodsSales,
    isShelves
  });
});

// 新增商品规格
router.post('/addspec', genValidator(specValidate), async (ctx, next) => {
  const { goodsId, specName, specValue, specImg, specPrice, specStock } = ctx.request.body;
  ctx.body = await addSpec({ goodsId, specName, specValue, specImg, specPrice, specStock });
});

// 修改商品详情
router.patch('/updategoods', async (ctx, next) => {});

// 删除商品
router.delete('/deletegoods', async (ctx, next) => {});

// 导出路由
module.exports = router;
