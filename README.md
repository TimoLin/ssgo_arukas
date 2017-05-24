# ssgo.sh
自用.  
基于秋水逸冰shadowsocks_go一键脚本，仅仅修改了默认密码，删除了一些等待用户确认的命令  
在网页端新建centos app后，运行以下命令配置自动配置shadowsocks server
<pre>yum install wget -y && wget --no-check-certificate https://raw.githubusercontent.com/timolin/ssgo_arukas/master/ssgo.sh && bash ssgo.sh</pre>
# Arukas SSH & SSconfig
Arukas docker shadowsocks油猴脚本  
<b>功能：一键生成以下内容</b>  
[1]ssh登录命令  
[2]终端生成二维码命令  
[3]shadowsocks配置文件  
<b>适用：使用两个端口的容器，其中22端口作为ssh登录，8989端口作为shadowsocks server</b>  
      http://example.jp-tokyo-07.arukascloud.io (22/tcp)  
      http://example.jp-tokyo-07.arukascloud.io (8989/tcp)  
在页面左上角会有一个按钮“<b>点我生成二维码</b>”，点击即可一键生成命令与二维码  
注意：该脚本匹配的是app.arukas.io/apps/*，因此在下面的页面进入app后，需要手动刷新一下才会显示该按钮  
![](https://github.com/TimoLin/ssgo_arukas/raw/master/pictures/io.png)  
刷新以显示该按钮    
![原始页面](https://github.com/TimoLin/ssgo_arukas/raw/master/pictures/origin.png)
点击按钮后的页面  
![点击后的页面](https://github.com/TimoLin/ssgo_arukas/raw/master/pictures/config.png)  
## ssh login command:
<pre>ssh root@example.jp-tokyo-07.arukascloud.io -p 31708  </pre>
## Linux终端命令生成shadowsocks配置文件二维码
<pre>echo -n "ss://"`echo -n aes-256-cfb:your_password@example.jp-tokyo-07.arukascloud.io:31555 | base64` | qr  </pre>
<b>注意：需要先安装qrcode</b>  
<pre> pip install qrcode</pre>
## shadowsocks config file:
<pre>{"server":"example.arukascloud.io", "server_port":31314, "local port":1080, "password":"your_password", "timeout":600, "method":"aes-256-cfb" }</pre>  

# Todo:
1.加入按钮后可能会导致页面在刷新时加载变慢，待优化  

# Reference
[1]ss配置文件格式，URI与base64加密，官方在线生成二维码工具  
http://shadowsocks.org/en/config/quick-guide.html  
[2]linux终端生成二维码，需要先运行 pip install qrcode  
https://github.com/shadowsocks/shadowsocks/wiki/Generate-QR-Code-for-Android-or-iOS-Clients  
[3]调用Google Chart API生成二维码图片，参考了下面的二维码在线生成网站的createCode函数，可在该网页elements中找到 
http://qr.lingbaoboy.com/  

