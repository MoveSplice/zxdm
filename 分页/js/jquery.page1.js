//分页插件
/**
 * 2015-11-09
 * @author by futural
 */
(function($){
	var ms = {
		init:function (o, a) {
			return(function () {
				ms.f(o,a);
				ms.b(o,a);
            })()
        },
		f:function (o, a) {
			return(function () {
                o.empty();
                //上一页
                if(a.current>1){
                    o.append("<a href='javascript:'  class=\"prevPage\">&laquo;</a>")
                }else{
                    o.remove(".Previous");
                    o.append("<span  class=\"disabled\">&laquo;</span>")
                }
                //中间页
                if(a.current !=1 && a.current >=4 && a.pageCount !=4){
                    o.append("<a class='tcdNumber' href='javascript:'>"+1+"</a>")
                }
                if(a.current-2>2&&a.current<=a.pageCount&&a.pageCount>5){
                    o.append("<span>...</span>")
                }
                var start = a.current - 2, end = a.current + 2;
                if((start>1 && a.current<4)||a.current==1){
                    end++;
                }
                if(a.current>a.pageCount && a.current>=a.pageCount){
                    start--;
                }
                for(;start<=end;start++){
                    if(start<=a.pageCount&&start>=1){
                        if(start != a.current){
                            o.append("<a class=\"tcdNumber\" href='javascript:'>"+start+"</a>")
                        }else {
                            o.append("<span class=\"current\">"+start+"</span>")
                        }
                    }
                }
                if(a.current+2<a.pageCount-1&&a.current>=1&&a.pageCount>5){
                    o.append("<span>...</span>")
                }
                if(a.current !=a.pageCount && a.current < a.pageCount-2 && a.pageCount !=4){
                    o.append("<a class=\"tcdNumber\" href='javascript:'>"+a.pageCount+"</a>")
                }
                //下一页
                if(a.current <a.pageCount){
                    o.append("<a href=\"javascript:;\" class=\"nextPage\">&raquo;</a>")
                }else {
                    o.remove(".nextPage");
                    o.append("<span class=\"disabled\">&raquo;</span>")
                }
                // o.append("<span class='pagecount'>共"+a.pageCount+"页</span>");
                // if(a.turndown == "true"){
                //     o.append("<span class='countYe'>到第<input type='text' maxlength="+a.pageCount.toString().length+">页<a href='javascript:;' class='turndown'>确定</a><span>")
                // }
            })();

        },
		b:function (o, a) {
			return(function () {
				o.on("click","a.tcdNumber",function () {
					var current = parseInt($(this).text());
					ms.f(o,{"current":current,"pageCount":a.pageCount,"turndown":a.turndown});
					if(typeof (a.bF)=="function"){
						a.bF(current);
					}
                });
				o.on("click","a.prevPage",function () {
					var current = parseInt(o.children("span.current").text());
					ms.f(o,{"current":current-1,"pageCount":a.pageCount,"turndown":a.turndown});
					if(typeof (a.bF)=="function"){
						a.bF(current-1)
                    }
                });
				o.on("click","a.nextPage",function () {
                    var current = parseInt(o.children("span.current").text());
                    ms.f(o,{"current":current+1,"pageCount":a.pageCount,"turndown":a.turndown});
                    if(typeof(a.bF)=="function"){
                        a.bF(current+1);
                    }
                });
                // o.on("click","a.turndown",function () {
                //     var page = $("span.countYe input").val();
                //     if(page>a.pageCount){
                //         alert("没有这个页面，跳转不了");
                //     }
                //     ms.f(o,{"current":page,"pageCount":a.pageCount,"turndown":a.turndown});
                // })

            })()
        }
	};
	$.fn.cP = function (o) {
		var a = $.extend({
			pageCount:10,
			current:1,
			turndown:false,
			bF : function () {

            }
		},o);
		ms.init(this,a)
    }
})(jQuery);
