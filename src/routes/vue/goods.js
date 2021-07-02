/*
 * @Description: 商品 goods API 路由
 * @Author: 王振
 * @Date: 2021-07-01 14:43:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-02 09:26:59
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { addGoods, getGoodsInfo, getGoodsData } = require('../../controller/goods');
const { genValidator } = require('../../middlewares/validator');
const goodsValidate = require('../../validator/goods');

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
    mainSpec,
    mainSpecValue,
    auxiSpec,
    auxiSpecValue,
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
    mainSpec,
    mainSpecValue,
    auxiSpec,
    auxiSpecValue,
    isShelves
  });
});

// 修改商品详情
router.patch('/updategoods', async (ctx, next) => {});

// 删除商品
router.delete('/deletegoods', async (ctx, next) => {});

// 导出路由
module.exports = router;
