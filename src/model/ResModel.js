/*
 * @Description:res返回值的数据模型
 * @Author: 王振
 * @Date: 2021-06-13 13:56:50
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-13 13:57:32
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ code, data, message }) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 0,
      data,
      message: 'success'
    });
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ code, message }) {
    super({
      code,
      message
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
