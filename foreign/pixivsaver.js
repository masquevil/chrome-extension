// ==UserScript==
// @name       Pixiv Saver
// @namespace  http://www.soulran.com/
// @version    0.22.1
// @description  Download the image with "mode=medium" in pixiv in the complete size.
// @match      http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @run-at      document-end
// @copyright  2014+, Masquevil
// ==/UserScript==

(function(){
	var itttval = setInterval(chClick,500);
	function chClick(){
		var matt = document.body.innerHTML.match(/(http:\/\/i\d+\.pixiv\.net\/img\d+\/img\/.+?\/\d+)_m\.(jpg|png|jpeg|gif)/i);
		var memm = document.body.innerHTML.match(/member_illust\.php\?mode=big&amp;illust_id=\d+\"/i);
		if((matt == null || memm == null))return false;
		document.body.innerHTML = document.body.innerHTML.replace(memm[0], matt[1] + matt[2] + matt[3] + "\" download");
		clearInterval(itttval);
	}
	setTimeout(function(){clearInterval(itttval)},10000);
})();