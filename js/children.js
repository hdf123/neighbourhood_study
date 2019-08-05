//引入子页面，点击返回上一页
document.addEventListener('plusready', function() {
	var webview = plus.webview.currentWebview();
	plus.key.addEventListener('backbutton', function() {
		webview.canBack(function(e) {
			if(e.canBack) {
				webview.back();
			} else {
				webview.close(); //hide,quit按手机返回键直接退出APP
				//plus.runtime.quit();
			}
		})
	});
});