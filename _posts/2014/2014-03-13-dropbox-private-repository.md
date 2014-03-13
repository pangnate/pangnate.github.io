---
layout: post
title: 使用Dropbox搭建自己的私人代码仓库
categories: [开发工具]
# cover : ''
# excerpt: ''
tags: [git, repository, dropbox]
---

我们都知道Github有代码仓库功能，可以使用svn或者git客户端推送代码，我们可以把自己的项目托管在Github上，便于随时随地编辑。但是有一些项目是不能开源的，而Github的私人仓库功能是收费的，最低为$7/month，这还是一笔不小的开销。

其实超级简单：使用一个有本地映像的网盘（我使用的是Dropbox），新建一个文件夹，以此文件夹作为Git仓库的存储目录。你的每一次commit都会保存在.git目录中，而网盘会自动同步，而且仓库个数是没有限制的。灵感来了，可以随时随地敲代码了！

注意，选取的网盘必须能够自动同步.git目录，测试金山快盘就不可以。

Enjoy it!