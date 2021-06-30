/*
 * @Description: 类别 category API 路由
 * @Author: 王振
 * @Date: 2021-06-23 11:24:19
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 15:39:18
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { addCategory, getCategoryList } = require('../../controller/category');
const { genValidator } = require('../../middlewares/validator');
const categoryValidate = require('../../validator/category');

// 路由前缀
router.prefix('/api/category');

// 查询所有类别
router.get('/getcategory', async (ctx, next) => {
  ctx.body = await getCategoryList();
});

// 新增一级类别
router.post('/addonelevel', genValidator(categoryValidate), async (ctx, next) => {
  const { categoryLevel, parentId, categoryName, categoryImg, categoryRank, isDeleted } =
    ctx.request.body;
  ctx.body = await addCategory(ctx, {
    categoryLevel,
    parentId,
    categoryName,
    categoryImg,
    categoryRank,
    isDeleted
  });
});

// 修改一级类别
router.patch('/updateonelevel', async (ctx, next) => {});

// 删除一级类别
router.delete('/deleteonelevel', async (ctx, next) => {});

// 新增二级类别
router.post('/addtwolevel', genValidator(categoryValidate), async (ctx, next) => {});

// 查询二级类别
router.get('/gettwolevel', async (ctx, next) => {});

// 修改二级类别
router.patch('/updatetwolevel', async (ctx, next) => {});

// 删除二级类别
router.delete('/deletetwolevel', async (ctx, next) => {});

// 导出路由
module.exports = router;
