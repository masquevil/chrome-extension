// ==UserScript==
// @name       Pixiv Saver
// @namespace  http://www.soulran.com/
// @version    1.0
// @updateURL	https://raw.githubusercontent.com/masquevil/chrome-extension/master/foreign/pixivsaver.js
// @downloadURL	https://raw.githubusercontent.com/masquevil/chrome-extension/master/foreign/pixivsaver.js
// @description  Download the image with "mode=medium" in pixiv in the complete size.
// @match      http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @run-at      document-end
// @copyright  2014+, Masquevil
// ==/UserScript==

(function(){
	var itttval = setInterval(chClick,500);
	function chClick(){
		var matt = document.body.innerHTML.match(/src="(http:\/\/i\d+\.pixiv\.net\/)c\/\d+x\d+\/img-master\/img([\/\d]+_p\d+)_master\d+\.(jpg|png|jpeg|gif)"/i);
		var memm = document.body.innerHTML.match(/href="member_illust\.php\?mode=big.+illust_id=(\d+)"/i);
		if((matt == null || memm == null))return false;
		var ori = matt[1] + "img-original/img" + matt[2], orisrc = ori + ".jpg", srctry = 0;
		document.body.innerHTML = document.body.innerHTML.replace(memm[0], "href=\"" + orisrc + "\" download=" + memm[1]);
		var img = new Image();
		img.src = orisrc;
		img.onerror = function(){setTimeout(function(){
			var tail = (function(){switch(srctry++){case 0:return ".png";case 1:return "gif";default:return false;}})();
			if(tail){
				img.src = ori + tail;
				document.body.innerHTML = document.body.innerHTML.replace("href=\"" + orisrc + "\"", "href=\"" + (orisrc = img.src) + "\"");
			}
			else {
				document.body.innerHTML = document.body.innerHTML.replace("href=\"" + orisrc + "\" download=" + memm[1], "href=\"" + (orisrc = memm[0]) + "\"");
			}
		},300);};
		clearInterval(itttval);
	}
	setTimeout(function(){clearInterval(itttval)},10000);
})();