/*
 * @Description: 工具公共函数
 * @Author: 王振
 * @Date: 2021-07-09 13:47:54
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 16:54:32
 */

/**
 * @description: js中生成唯一id的，动态id，随机生成
 * @param {number} length 生成的id长度
 * @return {number} 生成的随机id
 */
function randomNumber(length) {
  // 随机数长度控制,传入长度变量（length），生成可控长度的随机数
  const num = Math.random().toString().substr(3, length);
  // 返回生成的随机id
  return Number(num + Date.now()).toString();
}

/**
 * @description: 多维数组组合排列算法
 * @param {Array} arr 数组
 * @return {Array}
 */
function formatSkuList(arr) {
  const len = arr.length;
  // 当数组大于等于2个的时候
  if (len >= 2) {
    // 第一个数组的长度
    const len1 = arr[0].length;
    // 第二个数组的长度
    const len2 = arr[1].length;
    // 2个数组产生的组合数
    const lenBoth = len1 * len2;
    //  申明一个新数组
    const items = new Array(lenBoth);
    // 申明新数组的索引
    let index = 0;
    for (let i = 0; i < len1; i++) {
      for (let j = 0; j < len2; j++) {
        if (arr[0][i] instanceof Array) {
          items[index] = arr[0][i].concat(arr[1][j]);
        } else {
          items[index] = [arr[0][i]].concat(arr[1][j]);
        }
        index++;
      }
    }
    const newArr = new Array(len - 1);
    for (let i = 2; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    newArr[0] = items;
    return formatSkuList(newArr);
  } else {
    return arr[0];
  }
}

module.exports = {
  randomNumber,
  formatSkuList
};
