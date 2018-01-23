// ==UserScript==
// @name         DO
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Gnerate shadowsocks QRcode in arukas docker
// @author       ztnuaa
// @match        https://cloud.digitalocean.com/droplets*
// @grant        GM_xmlhttpRequest
// @homepage     https://github.com/TimoLin/ssgo_arukas
// ==/UserScript==

//Refrence
//【1】ss配置文件格式，URI与base64加密，官方在线生成二维码工具
//http://shadowsocks.org/en/config/quick-guide.html
//【2】linux终端生成二维码，需要先运行 pip install qrcode
//https://github.com/shadowsocks/shadowsocks/wiki/Generate-QR-Code-for-Android-or-iOS-Clients
//【3】调用Google Chart API生成二维码图片，参考了下面的二维码在线生成网站的createCode函数，可在该网页elements中找到
//http://qr.lingbaoboy.com/

function init(){

    //以下三个参数请根据自己情况修改
      //--------[1]加密方式-------
    //var method="aes-256-cfb";
    var method=“rc4-md5”；
    //var method="m2crypto"；
    //var method="salsa20";
    //var method="chacha20";
      //---[2]shadowsocks密码----
    var password="password";
      //---[3]本地端口默认是1080---   
    var local_port="1080";
      //---[4]服务器端口---------
    var server_port="8980";

      //---[5]协议---
    var protocol="origin";
      //---[6]协议参数---
    var protocol_param="";
      //---[7]混淆方式---
    var obfs = "http_simple";
      //---[8]混淆参数---
    var obfs_param = "";
    
    
    var tab = document.getElementsByTagName("table")[0];
    var rowLen=tab.rows.length;
    var drop_num=tab.rows.length; //你创建的droplets的个数
    
    for(var n=1;n<=drop_num-1;n++){
    //var n=1;
    var ip_column=tab.rows[n].cells[1]; //ip所在列的数据
    var ip=ip_column.getElementsByClassName('click-to-copy-text')[0].innerHTML; //获取ip地址
    
    var ssh='ssh root@'+ip+' -p 22';

    //var app_name=document.getElementsByClassName("c-info__data")[1].innerHTML;
    var app=tab.rows[n].cells[0];
    var app_name=app.getElementsByClassName('Resource-title  ')[0].innerText;
        //shadowsocks为shadowsocks配置文件（json文件）
    var ss_config="\"server\":\""+ip+"\","+"\"server_port\":"+server_port+ ",\"local port\":"+local_port+", \"password\":\""+password+"\", \"timeout\":600, \"method\":\""+method+"\"， \"remarks\" :\""+app_name+ "\"}";

    var ssr_config="\"server\":\""+ip+"\","+"\"server_port\":"+server_port+"\"local_address\":\"127.0.0.1\""+ ",\"local port\":"+local_port+", \"password\":\""+password+"\", \"timeout\":300, \"method\":\""+method+"\",protocol\":\""+protocol+"\",\"protocol_param\":\""+protocol_param+"\",\"obfs\":\""+obfs+"\",\"obfs_param\":\""+obfs_param+",\"remarks\" :\""+app_name+ "\"}";

    //ss字符串格式为  加密方式:密码@ip地址:远程端口
    var ss_str=method+":"+password+"@"+ip+":"+server_port; //+"#"+btoa(app_name);
    
    var ssr=ip+":"+port+":"+protol+":"+method+":"+":"+obfs+":"+btoa(password)+"/?obfsparam="+btoa(obfsparm);
    var ssr=btoa(config_ssr)
    var ssr=config_ssr.replace(/+/,/-/);
    var ssr=config_ssr.replace(/\//,/_/);
    var ssr_urlsafebase64="ss:\/\/"+config_ssr

    //btoa()为base64加密函数，js内置.
    //加密后的ss字符串: ss://base64加密处理
    var ss_base64="ss:\/\/"+btoa(config_str);

    //用linux的同学可以通过这个命令在终端生成二维码，详见Refrence【2】
    var command_line_config="echo -n \"ss:\/\/\"\`echo -n "+ss_str+" | base64` | qr";

      //图片大小
    var imagesize=250;
    //var QR_code=document.createElement("img");
      //调用google chart api，生成二维码，详见Refrence【3】
    var QR_code="https://chart.googleapis.com/chart?cht=qr&chs="+imagesize+"x"+imagesize+"&choe=UTF-8&chld=M|1&chl="+ssr_urlsafebase64+"";
    var img_src="<img src = \""+QR_code+"\" />";
   // var content_qr=document.createElement("div");
    //var title2="二维码菌";
    //content_qr.className="c-info__row";
    //content_qr.innerHTML="<div class=\"c-info__title\">"+title2+"</div>";
   // content_qr.appendChild(QR_code);
   // document.getElementsByClassName("c-info u-mgt34 u-mgb34")[0].appendChild(content_qr);
    
    //添加一行表格元素，标题为“命令”，内容有三行，第一行为ssh登录命令，第二行为通过Linux终端生成二维码的命令，第三行为shadowsocks配置文件的内容
    var newTabrow=tab.insertRow(rowLen+n-1);
        newTabrow.id=app_name;
    //var content=document.createElement("div");
    var title1="命令";
    //content.className="c-info__row";
    //content.innerHTML="<div class=\"c-info__title\">"+title1+"</div><div class=\"c-info__data\"><div id=\"ember723\" class=\"u-mgt13 u-mgb13 ember-view\"><ul class=\"list list-unstyled\"> <li>"+ssh+"</li> <li>"+command_line_config+ "</li> <li>"+shadowsocks+"<li></ul></div></div> </div>";
    var newCol_2=newTabrow.insertCell(0);//添加命令内容
        newCol_2.innerHTML="</div><div class=\"c-info__data\"><div id=\"ember723\" class=\"u-mgt13 u-mgb13 ember-view\"><ul class=\"list list-unstyled\"> <li>"+ssh+"</li> <li>"+command_line_config+ "</li> <li>"+ss+"<li></ul></div>";
    var newCol_1=newTabrow.insertCell(1);//添加列名称
        newCol_1.innerHTML=app_name;
    var newCol_3=newTabrow.insertCell(2);
        newCol_3.innerHTML="";
    var newCol_4=newTabrow.insertCell(3);
        newCol_4.innerHTML=img_src;

    }
}

//加载完页面后显示按钮，由于某些我也不知道为什么的原因，window.onload命令（即加载完页面命令）在arukas这个网页的判定很奇怪，会在显示网页内容之前执行window.onload命令。所以我只能把这个按钮放在左上角，就是已经加载的网页元素开头
window.onload=button();

//添加按钮，用来触发调用函数
function button(){
   $("#container").append('<a id="I_am_a_button"> 点我生成二维码</a>');
    $("#I_am_a_button").click(function(){
        init();
    });
}

