// ==UserScript==
// @name         Arukas SSH & SSconfig
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.arukas.io/apps/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function init(){

    
    var ip22=document.getElementsByClassName('list-unstyled c-list-compact')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].href;
    var ip89=document.getElementsByClassName('list-unstyled c-list-compact')[0].getElementsByTagName('li')[1].getElementsByTagName('a')[0].href;
    
    var str0=ip22.replace(/http\:\/\//,"ssh root@");
    var str1=str0.replace(/\//,"");
    //string ssh is the ssh login command
    var ssh=str1.replace(/\:/," -p ");
    
    var str2=ip89.replace(/http\:\/\//,"{\"server\":\"");
    var str3=str2.replace(/io\:/,"io\", \"server_port\":");
        str3=str3.replace(/\//,""); 
    var str4=", \"local port\":1080, \"password\":\"021120215\", \"timeout\":600, \"method\":\"aes-256-cfb\" }";
    //shadowsocks is the ss config file
    var shadowsocks=str3.concat(str4);
    alert(ssh);
    alert(shadowsocks);
    
} 


//window.onload=init();


var $$ = function(func){  
            if (document.addEventListener) {  
                window.addEventListener("load", func, false);  
            }  
            else if (document.attachEvent) {  
                window.attachEvent("onload", func);  
            }  
        };
          
        $$(function(){  
            button();  
        });

function button(){
    
$("#ember-bootstrap-modal-container").append('<a id="YT_auto"> ssh&shadowsocks </a>');
    $("#YT_auto").click(function(){
        init();
    });
    
}

