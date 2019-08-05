//rem适配换算
(function(win,doc){
	//浏览器缩放时触发的事件
	win.onresize=function(){
		changeFontSize()
	};
	changeFontSize();
	function changeFontSize(){
		var oFontSize=doc.documentElement.clientWidth/(320/20);
		doc.documentElement.style.fontSize=oFontSize+'px';
	}
})(window,document);