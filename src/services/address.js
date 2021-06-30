/*
 * @Description: address 数据层
 * @Author: 王振
 * @Date: 2021-06-15 20:06:58
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 17:07:30
 */

const { Address } = require('../db/model/index');
const { formatAddress } = require('./_format');

/**
 * @description: 获取用户收货地址列表
 * @param {*} userId 用户id
 */
async function getAddressList(userId) {
  // 查询条件
  const whereOpt = { userId };

  // 查询数据库
  const result = await Address.findAll({
    where: whereOpt
  });

  // 判断是否查询到数据
  if (result == null) {
    return result;
  }

  // 格式化数据
  let addressList = result.map((res) => res.dataValues);
  addressList = formatAddress(addressList);
  return addressList;
}

/**
 * @description: 获取用户收货地址详情数据
 * @param {*} userId 用户id
 * @param {*} id 地址id
 */
async function getAddressDetail({ userId, id }) {
  // 查询条件
  const whereOpt = { userId, id };

  // 查询数据库
  const result = await Address.findOne({
    where: whereOpt
  });

  // 判断是否查询到数据
  if (result == null) {
    return result;
  }

  // 格式化数据
  const addressDetail = formatAddress(result.dataValues);
  return addressDetail;
}

/**
 * @description: 创建收货地址
 * @param {string} userId 用户id
 * @param {string} name 收货人姓名
 * @param {string} tel 收货人电话
 * @param {string} province 省份
 * @param {string} city 城市
 * @param {string} county 县区
 * @param {string} addressDetail 详细地址
 * @param {string} areaCode 地区编码
 * @param {boolean} isDefault 是否为默认地址
 */
async function createAddress({
  userId,
  name,
  tel,
  province,
  city,
  county,
  addressDetail,
  areaCode,
  isDefault
}) {
  // 插入数据
  const result = await Address.create({
    userId,
    name,
    tel,
    province,
    city,
    county,
    addressDetail,
    areaCode,
    isDefault
  });
  return result.dataValues;
}

/**
 * @description: 更新收货地址
 * @param {Object} param0 要修改的内容 {name,tel,province,city,county,addressDetail,areaCode,isDefault,}
 * @param {Object} param1 查询条件 {userid,id}
 */
async function updateAddress(
  { name, tel, province, city, county, addressDetail, areaCode, isDefault },
  { userId, id }
) {
  // 拼接修改内容
  const updateData = {};
  if (name) {
    updateData.name = name;
  }
  if (tel) {
    updateData.tel = tel;
  }
  if (province) {
    updateData.province = province;
  }
  if (city) {
    updateData.city = city;
  }
  if (county) {
    updateData.county = county;
  }
  if (addressDetail) {
    updateData.addressDetail = addressDetail;
  }
  if (areaCode) {
    updateData.areaCode = areaCode;
  }
  if (isDefault) {
    updateData.isDefault = isDefault;
  }

  // 查询条件
  const whereData = { userId, id };

  // 执行修改
  const result = await Address.update(updateData, {
    where: whereData
  });

  return result[0] > 0; // 修改的行数
}

/**
 * @description: 删除收货地址
 * @param {number} userId 用户id
 * @param {number} id 地址id
 */
async function deleteAddress({ userId, id }) {
  const result = await Address.destroy({
    where: {
      userId,
      id
    }
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  getAddressList,
  getAddressDetail,
  createAddress,
  updateAddress,
  deleteAddress
};
