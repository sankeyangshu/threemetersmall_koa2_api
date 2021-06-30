/*
 * @Description: address 控制层
 * @Author: 王振
 * @Date: 2021-06-15 19:59:41
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 17:06:35
 */

const {
  getAddressList,
  getAddressDetail,
  createAddress,
  updateAddress,
  deleteAddress
} = require('../services/address');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { SECRET } = require('../conf/constant');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * @description: 新增收货地址
 * @param {*} ctx 上下文
 * @param {string} name 收货人姓名
 * @param {string} tel 收货人电话
 * @param {string} province 省份
 * @param {string} city 城市
 * @param {string} county 县区
 * @param {string} addressDetail 详细地址
 * @param {string} areaCode 地区编码
 * @param {boolean} isDefault 是否为默认地址
 */
async function addAddress(
  ctx,
  { name, tel, province, city, county, addressDetail, areaCode, isDefault }
) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { id } = payload;

  try {
    // 添加收货地址
    await createAddress({
      userId: id,
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault
    });
    return new SuccessModel();
  } catch (ex) {
    // 添加失败
    console.error(ex.message, ex.stack);
    return new ErrorModel({
      code: 10010,
      message: '添加地址失败'
    });
  }
}

/**
 * @description: 获取收货地址
 * @param {*} ctx 上下文
 */
async function getAddress(ctx) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  // 获取用户收货地址
  const address = await getAddressList(userId);
  return new SuccessModel(address);
}

/**
 * @description: 获取收货地址详情数据
 * @param {*} ctx 上下文
 * @param {*} id 地址id
 */
async function getAddressDetails(ctx, id) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  // 获取用户收货地址详情数据
  const details = await getAddressDetail({ userId, id });
  return new SuccessModel(details);
}

/**
 * @description: 修改收货地址
 * @param {*} ctx 上下文
 * @param {number} id 收货地址id
 * @param {string} name 收货人姓名
 * @param {string} tel 收货人电话
 * @param {string} province 省份
 * @param {string} city 城市
 * @param {string} county 县区
 * @param {string} addressDetail 详细地址
 * @param {string} areaCode 地区编码
 * @param {boolean} isDefault 是否为默认地址
 */
async function changeAddress(
  ctx,
  { id, name, tel, province, city, county, addressDetail, areaCode, isDefault }
) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await updateAddress(
    {
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault
    },
    { userId, id }
  );
  if (result) {
    // 执行成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10010,
    message: '修改地址失败'
  });
}

/**
 * @description: 删除收货地址
 * @param {*} ctx 上下文
 * @param {*} id 收货地址id
 */
async function destroyAddress(ctx, id) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const userId = payload.id;

  const result = await deleteAddress({ userId, id });
  if (result) {
    // 删除成功
    return new SuccessModel();
  }
  return new ErrorModel({
    code: 10011,
    message: '删除地址失败'
  });
}

module.exports = {
  addAddress,
  getAddress,
  getAddressDetails,
  changeAddress,
  destroyAddress
};
