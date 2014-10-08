// ==UserScript==
// @name		Ad remover
// @namespace	http://www.soulran.com/
// @version		0.1
// @updateURL	https://raw.githubusercontent.com/masquevil/chrome-extension/master/foreign/ran_adremover.js
// @downloadURL	https://raw.githubusercontent.com/masquevil/chrome-extension/master/foreign/ran_adremover.js
// @description	enter something useful
// @match		*://*/*
// @copyright	2014+, Soulran
// @run-at		document-body
// ==/UserScript==

(function(){
	var rDiv = document.createElement("div"), EXPIRE = 90;
	
	new function(){
		var rState = false, queue = [], safeQueue = [];
		
		function cState(){if(!(rState = !rState))saveRemove();}
		function cExpire(n){EXPIRE = n;}
		function hideEle(e){
			e = e || window.event;
			var eTar = e.srcElement || e.target;
			if(!rState || eTar == rDiv)return;
			e.preventDefault();
			eTar.style.display = "none";
			var XPath = getXPath(eTar);
			for(var i=0; i<queue.length; i++){
				if(queue[i].indexOf(XPath) != -1){
					queue.splice(i--,1);
					break;
				}
			}
			queue.push(XPath);
			safeQueue.push(queue.concat());
		}
		function saveRemove(){
			var cooQueue = queue.concat();
			var adck = coo.get('_^adck').split("_^");
			moveQueue(queue);
			for(var i=1; i<adck.length; i++){
				var adXPath = adck[i].split("^_")[0];
				for(var j=0; j<queue.length; j++){
					if(adXPath.indexOf(queue[j]) != -1){
						adXPath = false;
						break;
					}
				}
				if(adXPath)cooQueue.push(adXPath);
			}
			cooQueue.splice(0,0,adck[0]);
			coo.set('_^adck', cooQueue.join("_^"), EXPIRE);
			queue = [], safeQueue = [];
		}
		function moveQueue(queue){
			for(var i=0; i<queue.length; i++){
				var ele = selectXPath(queue[i])[0];
				if(ele)ele.parentNode.removeChild(ele);
			}
		}
		function hideQueue(queue){
			for(var i=0; i<queue.length; i++){
				var ele = selectXPath(queue[i])[0];
				if(ele)ele.style.display = "none";
			}
		}
		function getXPath(ele){
			if(ele.id)return '//*[@id="' + ele.id + '"]';
			if(ele == document.body)return '/html/body';
			var paArr = ele.parentNode.children, pos = 1;
			for(var i=0; i<paArr.length; i++){
				if(paArr[i].tagName == ele.tagName){if(paArr[i]==ele)break; pos++;}
			}
			return getXPath(ele.parentNode) + '/' + ele.tagName.toLowerCase() + (pos == 1 ? "" : '[' + pos + ']');
		}
		function selectXPath(sXPath) {
			var oXPathExpress = document.createExpression(sXPath, null);
			var oResult = oXPathExpress.evaluate(document, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var aNodes = new Array();
			if (oResult) {
				var oElement;
				while (oElement = oResult.iterateNext()) {
					aNodes.push(oElement);
				}
			}
			return aNodes;
		};
		
		var coo = {
			get: function(name) {
				if(document.cookie.length > 0){
					var c_start = document.cookie.indexOf(name + "=");
					if(c_start != -1){
						var c_end = document.cookie.indexOf(";", c_start += name.length + 1);
						if(c_end == -1)c_end = document.cookie.length;
						return unescape(document.cookie.substring(c_start, c_end));
					}
				}
				return "";
			},
			set: function(name, value, expiredays){
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + expiredays);
				document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
			},
			del: function(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
				var date = new Date();
				date.setTime(date.getTime() - 10000);
				document.cookie = name + "=ran; expires=" + date.toGMTString();
			}
		};
		
		function regret(){
			coo.del('_^adck');
		}
		
		(function init(){
			//初始化，页面加载时设置cookie或者移除曾经的广告
			(function() {
				var adck = coo.get('_^adck');
				if(adck) {
					//执行移除div操作
					var itttv = setInterval(function(){
						hideQueue(unescape(adck).split("_^").slice(1));
						if(document.readyState == "complete"){clearInterval(itttv);moveQueue(unescape(adck).split("_^").slice(1));}
					},500);
				}else {coo.set('_^adck', "ran", EXPIRE);}//cookie的初始化
			})();
			rDiv.style.cssText ="position:fixed;top:100px;left:auto;right:30px;width:30px;height:30px;background:#abc;z-index:1000;cursor:pointer";
   			setInterval(function(){if(!document.body.contains(rDiv))document.body.insertBefore(rDiv,document.body.children[0]);},2000)
      		rDiv.addEventListener("click",cState);
			document.body.addEventListener("click",hideEle);
		}();
	}
})();
