/*
 * @Description: 收货地址 address API 路由
 * @Author: 王振
 * @Date: 2021-06-15 19:26:01
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 17:07:21
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const {
  getAddress,
  getAddressDetails,
  addAddress,
  changeAddress,
  destroyAddress
} = require('../../controller/address');
const { genValidator } = require('../../middlewares/validator');
const addressValidate = require('../../validator/address');

// 路由前缀
router.prefix('/api/address');

// 用户获取收货地址
router.get('/getaddress', async (ctx, next) => {
  ctx.body = await getAddress(ctx);
});

// 用户获取收货地址详情数据
router.get('/getaddressdetail', async (ctx, next) => {
  const { id } = ctx.request.query;
  ctx.body = await getAddressDetails(ctx, id);
});

// 用户新增收货地址
router.post('/addaddress', genValidator(addressValidate), async (ctx, next) => {
  const { name, tel, province, city, county, addressDetail, areaCode, isDefault } =
    ctx.request.body;
  ctx.body = await addAddress(ctx, {
    name,
    tel,
    province,
    city,
    county,
    addressDetail,
    areaCode,
    isDefault
  });
});

// 用户修改收货地址
router.patch('/modifyaddress', genValidator(addressValidate), async (ctx, next) => {
  const { id, name, tel, province, city, county, addressDetail, areaCode, isDefault } =
    ctx.request.body;
  ctx.body = await changeAddress(ctx, {
    id,
    name,
    tel,
    province,
    city,
    county,
    addressDetail,
    areaCode,
    isDefault
  });
});

// 用户删除收货地址
router.delete('/deladdress', async (ctx, next) => {
  const { id } = ctx.request.body;
  ctx.body = await destroyAddress(ctx, id);
});

// 导出路由
module.exports = router;
