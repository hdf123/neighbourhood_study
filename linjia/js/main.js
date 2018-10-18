//引入主页面，快速点击两次退出app
document.addEventListener('plusready', function(a) {
    var first = null;
    plus.key.addEventListener('backbutton', function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
            first = new Date().getTime();
            $("body").append('<div class="tishi">双击退出</div>');
            $(".tishi").css({
            	"width":"40%",
            	"display":"flex",
            	"justify-content":"center",
            	"align-items":"center",
            	"padding":"0.3rem 1rem",
				"color":"white",
				"font-size":"0.768rem",
				"background-color":"rgba(63,63,63,0.8)",
				"border-radius":"0.6rem",
				"position": "fixed",
				"bottom":"3.5rem",
				"left":"27%",
            });
            setTimeout(function(){
                first = null;
	            $(".tishi").fadeOut(2000,function(){
	            	$(".tishi").remove();
	            });
            }, 1000);
        } else {
            if (new Date().getTime()-first<1000){
                plus.runtime.quit();
            }
        }
    }, false);
});