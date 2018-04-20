(function ($,window,document) {
    function Paing(el,options) {
        this.el = el;
        this.options = {
            pageNo:options.initPageNo || 1, //初始页码
            totalPages:options.totalPages || 1, //总页码
            totalCount:options.totalCount || '', //条目总数
            slideSpeed:options.slideSpeed || 0, //缓冲速度
            jump: options.jump || false , //支持跳转
            callback:options.callback || function () {} //回调函数
        };

        this.init();
    }

    Paing.prototype = {
        constructor:Paing,
        init:function () {
            this.createDom();
            this.bindEvents();
        },
        createDom:function () {

        },
        bindEvents:function () {
          alert("222")
        }
    };
    $.fn.paing = function (options) {
        return new Paing($(this),options);
    }


})(jQuery,window,document);