# ssgo.sh
Only modified default password and removed some user confirm operations.

# Arukas SSH & SSconfig
This is a javascript used for arukas dockers.
In the port section of an application, there are some IPs and its ports numbers and types like below.
For me it has 22 port (for ssh login) and 8989 port (for shadowsocks).
This js script is used to transvert 22 port to ssh login command and 8989 port to shadowsocks config file.
http://seaof-153-125-239-236.jp-tokyo-28.arukascloud.io:31951 (22/tcp)  
http://seaof-153-125-239-236.jp-tokyo-28.arukascloud.io:31314 (8989/tcp)
## ssh login command:
ssh root@seaof-153-125-239-236.jp-tokyo-28.arukascloud.io -p 31951
## shadowsocks config file:
{"server":"seaof-153-125-239-236.jp-tokyo-28.arukascloud.io", "server_port":31314, "local port":1080, "password":"021120215", "timeout":600, "method":"aes-256-cfb" }
# Todo:
1.Script optimization.  
2.May add a function that generates QRcode image of the shadowsocks config file.  
