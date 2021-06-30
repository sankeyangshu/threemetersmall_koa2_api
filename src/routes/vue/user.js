/*
 * @Description: 用户 user API 路由
 * @Author: 王振
 * @Date: 2021-06-12 19:25:10
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-13 19:52:58
 */

// 引入koa路由  该写法等同于 const Router = require('koa-router'); const router = new Router()
const router = require('koa-router')();
const { isExist, register, login, changeInfo, changePassword } = require('../../controller/user');
const { genValidator } = require('../../middlewares/validator');
const userValidate = require('../../validator/user');

// 路由前缀
router.prefix('/api/user');

// 用户注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await register({ userName, password });
});

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

// 用户登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});

// 修改个人信息
router.patch('/changeInfo', async (ctx, next) => {
  const { nickName, picture } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, picture });
});

// 修改个人密码
router.patch('/changePassword', genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body;
  ctx.body = await changePassword(ctx, { password, newPassword });
});

// 导出路由
module.exports = router;
