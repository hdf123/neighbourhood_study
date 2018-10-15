function ajaxGet(url,type,data,suFn,erFn){
	$.ajax({
		url:"http://39.104.127.252:8081/"+url,
 		xhrFields:{
           withCredentials:true
       	},
//     	async:false,
		type: type,
        dataType : "json",
        data:data,
		success: function(data) {
			suFn(data);
		},
        error: function(error) {
            erFn(error);         
        }
	});
}

//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
var _loadIndex =1,
    _loadState = 0;
function loadmore(element,url,type,dataObj,successFn,errorFn) {
    $(element).on("scroll",function(){
        //当前可视容器高度
        var _elementHeight = $(element).outerHeight(),
            //当前滚动区域高度
            _elementChildHeight = $(element).children().outerHeight(),
            //滚动条高度
            _elementScroll = $(element).scrollTop();
        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){            
            //console.log('没到底') 
        }else {
            //console.log('到底了')           
            //当状态为0 的时候进行加载，防止重复加载
            if(_loadState == 0){       
                //状态更新为1
                _loadState = 1;
                //增加页数
                _loadIndex += 1;
                //添加正在加载loadding
                $(element).append('<p class="nowLoad">正在加载...</p>');
                //请求当前页数ajax
                ajaxLoad(_loadIndex);
            }
        }
    });    
    //ajax请求
    function ajaxLoad(page) {        
        //更新发向服务器的数据，添加页数key值
        dataObj.page = page;
        $.ajax({
            url:url,
            type:type,
            dataType:'json',
            data:dataObj,
            success:function (data) {
                //数据渲染  ajajx回调
                successFn(data);
               //当数据不为空的时候，更新状态
                if(data.length > 0){
                    //更新状态 为 0
                    _loadState = 0;
                    //删除正在加载loadding
//                  $('.nowLoad').remove();
                    function hg(){
                    	$(".nowLoad").remove();
                    }
                    setTimeout(hg,1200);
                }else {                    
                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
                    _loadState = 2;                    
                    //删除正在加载loadding
                    $('.nowLoad').remove();                    
                    //更换loadding为没有数据
                    $(element).append('<p class="endLoad">没有数据了...</p>');
                    function fg(){
                    	$(".endLoad").remove();
                    }
                    setTimeout(fg,1200);
                }                
            },
            error:function (err) {                
                //请求失败loadding
                errorFn(err);                
            }
        })
    }
};


//调用js
/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
    $.each(data.data.list,function (key,val) {
        $('#wrapper ul').append();
    });
},function () {   
});*/
