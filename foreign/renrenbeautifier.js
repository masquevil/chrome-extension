// ==UserScript==
// @name       RenRen Beautifier | For V7
// @namespace  http://www.soulran.com/
// @version    0.12
// @description  Remove ad and something I dislike.
// @match      http://*.renren.com/*
// @run-at      document-end
// @copyright  2013+, Masquevil
// ==/UserScript==

var removeAdApp = function(){
	var rrSlidebar = document.getElementById("nxSlidebar");
    if(rrSlidebar)var rrAdAppList = rrSlidebar.getElementsByTagName("div");
    if(rrAdAppList)for (var num in rrAdAppList){
        if((/recent/).test(rrAdAppList[num].className)){
            rrAdAppList[num].parentNode.removeChild(rrAdAppList[num]);
        }
    }
}
function itttfun(times){
	try{
		var itttfunOKK = window.unsafeWindow.itttfunOK || false;
		if(itttfunOKK)return;
		window.unsafeWindow.itttfunOK = true;
		window.unsafeWindow.webpager.setFold(true);
	} catch(e) {
		window.unsafeWindow.itttfunOK = false;
		if(times++ < 10)setTimeout(function(){itttfun(times);},600);
	} finally{
        if(window.unsafeWindow.itttfunOK){
            window.unsafeWindow.document.getElementById("buddy").style.display="none";
        }
	}
}
removeAdApp();
itttfun(0);