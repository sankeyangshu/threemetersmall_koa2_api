# threemetersmall_koa2_api

#### 介绍

使用 koa2 开发三米商城 API，该项目是三米商城的服务端项目，是基于[koa-template](https://github.com/1260323835/koa2-template)这个模版搭建的后端项目，该模版也是我的作品，大家也可以去看看这个项目。

**注1：此项目属于个人学习项目，仅供学习和技术研究使用，不建议商用。**

**注2：如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！**

#### 软件架构

nodejs + koa2 + mysql + sequelize + es6/7 + require-directory

#### 安装教程

##### 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和mysql，Koa 依赖 **node v7.6.0** 或 ES2015及更高版本和 async 方法支持。

```bash
项目运行之前，请确保系统已安装了node和MySQL环境

1.因为项目使用sequelize来创建数据库模型，所以我们首先需要在自己的MySQL中创建一个新的数据库，名为mall_db

2.在控制台输入 node src/db/sync.js 来将数据模型写入到数据库表中
```

```bash
git clone https://gitee.com/sankeyangshu/threemetersmall_koa2_api.git

npm install

npm run dev
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 许可证  

[MIT License](https://gitee.com/sankeyangshu/threemetersmall_koa2_api/blob/master/LICENSE)

