---
layout: post
title: Linux服务器系列：系统的安装与基本环境配置
categories: [服务器]
# cover : ''
# excerpt: ''
tags: [linux, centos, nginx]
---

### 安装过程略，本例选取 Centos 6.5 并采用最小化安装。    

为了达到定制的要求，我们一般采用最小化方式安装。最小化没有桌面环境，系统大概占用 900M 磁盘空间。


### 1. 修改IP地址
	vi /etc/sysconfig/network-scripts/ifcfg-eth0

这里面我们只需要修改关键的几行，最后完整的配置如下：
    
	DEVICE=eth0 #网卡设备名称    
	ONBOOT=yes #启动时是否激活 yes|no    
	BOOTPROTO=static #协议类型 static|dhcp|bootp      
	IPADDR=192.168.1.10 #ip地址    
	NETMASK=255.255.255.0 #网络子网地址    
	GATEWAY=192.168.1.1 #网关地址    
	BROADCAST=192.168.1.255 #对应的子网广播地址    
	HWADDR=00:00:27:7A:26:2D #网卡MAC地址    
	TYPE=Ethernet #网卡类型为以太网

保存后重启网卡       

	service network restart


检查是否修改成功    

	ifconfig
 
可以看见ip地址已经改变为刚才设置的地址。  

<!--more-->

### 2. 关闭SELinux    

SELinux 是linux的访问控制体系，有些时候安装软件会被阻止，所以我们一般直接把他关闭掉。

* 临时关闭（不用重启） 
   
		setenforce 0
 
* 永久关闭（需要重启）
		
		vi /etc/selinux/config

	将 SELINUX=enforcing 改为 SELINUX=disabled ，重启机器即可。


### 3. 关闭防火墙    

防火墙对服务器来说非常重要，我们不建议直接关闭防火墙。但是在服务器安装调试阶段可能会有所不便，有时候需要关闭防火墙，让所有端口都对外开放。

* 临时关闭（不用重启） 
   
		service iptables stop
 
* 永久关闭（需要重启）
		
		chkconfig iptables off


### 4. 使用 163 的 yum 源

备份

	cp /etc/yum.repos.d/CentOS-Base.repo  /etc/yum.repos.d/CentOS-Base.repo.bak

修改

	vi /etc/yum.repos.d/CentOS-Base.repo

以下只列出修改的关键行    

	[updates]
	baseurl=http://mirrors.163.com/centos/$releasever/updates/$basearch/

	[extras]
	baseurl=http://mirrors.163.com/centos/$releasever/extras/$basearch/

	[extras]
	baseurl=http://mirrors.163.com/centos/$releasever/extras/$basearch/

	[centosplus]
	baseurl=http://mirrors.163.com/centos/$releasever/centosplus/$basearch/

	[centosplus]
	baseurl=http://mirrors.163.com/centos/$releasever/centosplus/$basearch/

	[contrib]
	baseurl=http://mirrors.163.com/centos/$releasever/contrib/$basearch/


然后执行以下命令

	yum clean all
	yum makecache     #将服务器上的软件包信息缓存到本地,以提高搜索安装软件的速度
	yum install vim*    #测试域名是否可用
	yum update


### 5. 创建基础目录

为了便于统一管理，我们将新建 app 及 data 两个目录，分别用于安装软件及放置网站代码文件等。

	mkdir /app
	mkdir /data


### 6. 安装编译所需的基本环境    

**wget**    
	
	yum -y install wget
 
**gcc** 

	yum -y install gcc
	yum -y install gcc-c++

**pcre**   
  
pcre 正则表达式的基础，如果缺少此库，nginx无法支持HTTP中的URL重写功能。只需要解压备用，无需安装。

	cd /opt
	wget http://jaist.dl.sourceforge.net/project/pcre/pcre/8.34/pcre-8.34.tar.gz
	tar zxvf pcre-8.34.tar.gz

**zlib**

zlib 提供 gzip 功能。只需要解压备用，无需安装。

	cd /opt
	wget http://fossies.org/linux/misc/zlib-1.2.8.tar.gz
	tar zxvf zlib-1.2.8.tar.gz


### 7、修改登录欢迎语

有时不太喜欢linux默认的欢迎语，比如我们需要在登录时发送通知，告诉不要进行哪些危险操作，那就修改下吧。 
 
	vi /etc/motd

修改后保存，下次登录就能看到了。    

### 8、 添加环境变量

有些时候我们自定义安装了一些模块，但是系统环境变量中没有它们，我们每次执行时都要输一长串的地址来调用这些命令。这时我们可以在环境变量中增加它们，方便使用。

以 node 的守护进程模块 forever 为例：

	vi /etc/profile

在最后添加以下几行并保存

	PATH=$PATH:/usr/local/lib/node_modules/forever/bin
	export PATH

同理，你可以添加需要的其它环境变量，要记得赋给可执行权限。然后刷新环境变量，使之立刻生效：
	
	chmod  u+rwxX /usr/local/lib/node_modules/forever/bin
	source /etc/profile