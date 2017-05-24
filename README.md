# ssgo.sh
自用.  
基于秋水逸冰shadowsocks_go一键脚本，仅仅修改了默认密码，删除了一些等待用户确认的命令
# Arukas SSH & SSconfig
Arukas docker shadowsocks油猴脚本  
功能：一键生成以下内容  
      [1]ssh登录命令  
      [2]终端生成二维码命令  
      [3]shadowsocks配置文件  
适用：使用两个端口的容器，其中22端口作为ssh登录，8989端口作为shadowsocks server  
      http://example.jp-tokyo-07.arukascloud.io (22/tcp)  
      http://example.jp-tokyo-07.arukascloud.io (8989/tcp)  
在页面左上角会有一个按钮“点我生成二维码”，点击即可  
注意：该脚本匹配的是app.arukas.io/apps/*，因此在下面的页面进入app后，需要手动刷新以下才会显示该按钮  
![](https://raw.githubusercontent.com/timolin/ssgo_arukas/io.jpg)
刷新以显示该按钮  
![](https://raw.githubusercontent.com/timolin/ssgo_arukas/origin.jpg)  
## ssh login command:
<pre>ssh root@example.jp-tokyo-07.arukascloud.io -p 31708 </pre>
## Linux终端命令生成shadowsocks配置文件二维码
echo -n "ss://"`echo -n aes-256-cfb:your_password@example.jp-tokyo-07.arukascloud.io:31555 | base64` | qr  
注意：需要先安装qrcode
$ pip install qrcode
## shadowsocks config file:
{"server":"example.arukascloud.io", "server_port":31314, "local port":1080, "password":"your_password", "timeout":600, "method":"aes-256-cfb" }
![](https://raw.githubusercontent.com/timolin/ssgo_arukas/config.jpg)  

# Todo:
1.加入按钮后可能会导致页面在刷新时加载变慢，待优化  

# Reference
[1]ss配置文件格式，URI与base64加密，官方在线生成二维码工具  
http://shadowsocks.org/en/config/quick-guide.html  
[2]linux终端生成二维码，需要先运行 pip install qrcode  
https://github.com/shadowsocks/shadowsocks/wiki/Generate-QR-Code-for-Android-or-iOS-Clients  
[3]调用Google Chart API生成二维码图片，参考了下面的二维码在线生成网站的createCode函数，可在该网页elements中找到  
http://qr.lingbaoboy.com/  
# 
