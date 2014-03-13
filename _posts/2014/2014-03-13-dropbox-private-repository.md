---
layout: post
title: 使用Dropbox搭建自己的私人代码仓库
categories: [开发工具]
# cover : ''
# excerpt: ''
tags: [git, repository, dropbox]
---

其实超级简单：使用一个有本地映像的网盘（我使用的是Dropbox），新建一个文件夹，以此文件夹作为Git仓库的存储目录。你的每一次commit都会保存在.git目录中，而网盘会自动同步。在公司没干完的活，回家接着来吧！

注意，选取的网盘必须能够自动同步.git目录，测试金山快盘就不可以。

Enjoy it!