/**
 * Created by WEB_1 on 2018/5/7.
 */


function getCookie(cname){
    var name = cname + "=";

    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++) {

        var c = ca[i].trim();

        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }

    return "";
}


$(function () {
    var data_path = "http://vbcexplorer.net";
    // var data_path = "http://119.23.61.53:8186";
    "use static";
    var pars = localStorage.getItem("pars");

    if(pars==null || pars=="undefined"){
        $(".data-main-text-wrapp ul li").eq(0).children().addClass("active")
    }else if(pars=="1D"){
        $(".data-main-text-wrapp ul li").eq(0).children().addClass("active")
    }else if(pars=="1W"){
        $(".data-main-text-wrapp ul li").eq(1).children().addClass("active")
    }



    //获取最新的数据参数 http://vbcexplorer.net/vbcExplorer/block/getNewBlock

    $.ajax({
        url: data_path+"/vbcExplorer/block/getNewBlock",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {
            if(result!=null&&result!="undefined"){

                document.cookie="parameter="+result.result;

                console.log(result)
            }

        },
        error: function (jqXHR, status) {

        }
    });



    var do_func2 = function (){
        $.ajax({
            url: data_path+"/vbcExplorer/block/getBCh",
            type: "post",
            dataType: 'json',
            setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
            success: function (result) {
                $(".Tot").html("<div class=\"data-main-top res\">Block Total</div><div class=\"data-main-text req\">"+result.result.Totals+"</div>")

                console.log("getBCh=",result)
            },
            error: function (jqXHR, status) {

            }
        });
    };

    $.ajax({
        url: data_path+"/vbcExplorer/currency/getBalance",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {
            console.log("getBlockTime=",result)
            var num =(result.result.balance)/100000000;
            var num1 = num.toString().match(/^\d+(?:\.\d{0,4})?/)[0]*100+"%";
            console.log(num1);

            var a = result.result.balance;
            var aNew;
            var re = /([0-9]+\.[0-9]{2})[0-9]*/;
            aNew = a.replace(re,"$1");


            $(".Blocks").html('<div class="data-main-top">Current VBC PCT</div><div class="data-main-text">'+num1+'</div>');

            $(".Total").html("<div class=\"data-main-top res\">Current VBC</div><div class=\"data-main-text req\">"+aNew+"</div>")

            $(".data-Difficulty").html("<div class=\"data-main-top1 res1\">Difficulty</div><div class=\"data-main-text1\"> <span class=\"span1\">"+result.result.difficulty+" T</span></div>")
        },
        error: function (jqXHR, status) {

        }
    });

    $.ajax({
        url: data_path+"/vbcExplorer/currency/getBlockTime",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {

            console.log("getBlockTime=",result)

            $(".data-Time").html("<div class=\"data-main-top1 res1\"> Block Time</div><div class=\"data-main-text1\"><span class=\"span1\">"+result.result.BlocksTime+" s</span></div>")

        },
        error: function (jqXHR, status) {

        }
    });



    $.ajax({
        url: data_path+"/vbcExplorer/currency/getBlocksize",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {

            console.log("getBlocksize=",result)

            $(".data-Blocksize").html("<div class=\"data-main-top1 res1\"> Average Blocksize</div><div class=\"data-main-text1\"><span class=\"span1\">"+result.result.AveragerBlocksize+"</span></div>")

            $(".data-Hashrate").html("<div class=\"data-main-top1 res1\"> Hashrate</div><div class=\"data-main-text1\"><span class=\"span1\">"+result.result.networkhashps+" TH/s</span></div>")

        },
        error: function (jqXHR, status) {

        }
    });

    var do_func3 = function (){

        var parameter = getCookie("parameter");

        console.log("parameter====",parameter)

        var data = "height="+parameter;

        $.ajax({
            url: data_path+"/vbcExplorer/block/searchBList",
            type: "get",
            dataType: 'json',
            data:data,
            setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
            success: function (result) {
                console.log("searchBList",result);

                $(".data-hash-left").html('<div class="data-hash-top"></div>');

                $(".data-hash-left .data-hash-top").append('<img src="images/blocks.png"><span>blocks</span><a href="block.html"> <label>view more</label></a>');

                if(result.result!=null&&result.result!="undefined"){

                    for(var i in result.result){

                        var format = function(time, format){
                            var t = new Date(time);
                            var tf = function(i){return (i < 10 ? '0' : '') + i};
                            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                                switch(a){
                                    case 'yyyy':
                                        return tf(t.getFullYear());
                                        break;
                                    case 'MM':
                                        return tf(t.getMonth() + 1);
                                        break;
                                    case 'mm':
                                        return tf(t.getMinutes());
                                        break;
                                    case 'dd':
                                        return tf(t.getDate());
                                        break;
                                    case 'HH':
                                        return tf(t.getHours());
                                        break;
                                    case 'ss':
                                        return tf(t.getSeconds());
                                        break;
                                }
                            })
                        }

                        var a = format(result.result[i].time*1000,'yyyy-MM-dd HH:mm:ss');

                        $(".data-hash-left").append('<div class="data-hash-main"><div class="data-hash-main-top">B#'+result.result[i].bits+'</div>' +
                            '<div class="data-hash-main-text">Hash: '+result.result[i].hash+'</div>' +
                            '<div class="data-hash-main-footer">' +
                            '<div class="current">Difficulty: '+result.result[i].difficulty+'</div>' +
                            '<div class="current">Confirmations: '+result.result[i].confirmations+'</div>' +
                            '<div class="current">Time: '+a+'</div></div></div>')


                    }
                }

            },
            error: function (jqXHR, status) {
                console.log(jqXHR)
                alert(status)
            }
        });
    }


    $(".data-section-span").click(function () {

        var parameter = getCookie("parameter");

        console.log(parameter)

        var input = $(".data-section-input").val();

        if(input!=""&&input!="undefined"&&input!=null){
            $.ajax({
                url: data_path+"/vbcExplorer/block/getBlockByCon",
                type: "post",
                dataType: 'json',
                data:"searchStr="+input,
                setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
                success: function (result) {

                    console.log(result)

                    if(result.result!=null&&result.result!="undefined"){

                        var format = function(time, format){
                            var t = new Date(time);
                            var tf = function(i){return (i < 10 ? '0' : '') + i};
                            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                                switch(a){
                                    case 'yyyy':
                                        return tf(t.getFullYear());
                                        break;
                                    case 'MM':
                                        return tf(t.getMonth() + 1);
                                        break;
                                    case 'mm':
                                        return tf(t.getMinutes());
                                        break;
                                    case 'dd':
                                        return tf(t.getDate());
                                        break;
                                    case 'HH':
                                        return tf(t.getHours());
                                        break;
                                    case 'ss':
                                        return tf(t.getSeconds());
                                        break;
                                }
                            })
                        }

                        var a = format(result.result.data.time*1000,'yyyy-MM-dd HH:mm:ss');


                        $(".transaction").html("<ul>" +
                            "<li>bits: "+result.result.data.bits+"</li>" +
                            "<li>confirmations: "+result.result.data.confirmations+"</li>" +
                            "<li>entropybit: "+result.result.data.entropybit+"</li>" +
                            "<li>flags: "+result.result.data.flags+"</li>" +
                            "<li>hash: "+result.result.data.hash+"</li>" +
                            "<li>height: "+result.result.data.height+"</li>" +
                            "<li>merkleroot: "+result.result.data.merkleroot+"</li>" +
                            "<li>mint: "+result.result.data.mint+"</li>" +
                            "<li>modifier: "+result.result.data.modifier+"</li>" +
                            "<li>modifierchecksum: "+result.result.data.modifierchecksum+"</li>" +
                            "<li>nextblockhash: "+result.result.data.nextblockhash+"</li>" +
                            "<li>nonce: "+result.result.data.nonce+"</li>" +
                            "<li>previousblockhash: "+result.result.data.previousblockhash+"</li>" +
                            "<li>proofhash: "+result.result.data.proofhash+"</li>" +
                            "<li>signature: "+result.result.data.signature+"</li>" +
                            "<li>time: "+a+"</li>" +
                            "<li>size: "+result.result.data.size+"</li>" +
                            "</ul>")
                        // for(var j in result.result.vout){
                        //     console.log(result.result.vout[j].address)
                        //     for(var t in result.result.vout[j].address){
                        //
                        //         console.log(result.result.vout[j].address[t])
                        //     }
                        // }
                    }
                },
                error: function (jqXHR, status) {

                }
            });
        }
    });

    $(".data-section-input").blur(function () {
        if($(".data-section-input").val()==""){
            $(".transaction").html("")
        }
    })

    var do_func5 = function (){
        var data = "pageIndex=1&pageSize=10";
        $.ajax({
            url:data_path+ "/vbcExplorer/tx/getTxList",
            type: "post",
            dataType: 'json',
            data:data,
            setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
            success: function (result) {

                 console.log("getTxLineChart=",result);

                $(".data-hash-right").html('<div class="data-hash-top"></div>');

                $(".data-hash-right .data-hash-top").append('<img src="images/blocks.png"><span>Transactions</span><a href="Transaction.html"> <label>view more</label></a>');

                if(result.result!=null&&result.result!="undefined"){

                    for(var i in result.result.data){

                        var format = function(time, format){
                            var t = new Date(time);
                            var tf = function(i){return (i < 10 ? '0' : '') + i};
                            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                                switch(a){
                                    case 'yyyy':
                                        return tf(t.getFullYear());
                                        break;
                                    case 'MM':
                                        return tf(t.getMonth() + 1);
                                        break;
                                    case 'mm':
                                        return tf(t.getMinutes());
                                        break;
                                    case 'dd':
                                        return tf(t.getDate());
                                        break;
                                    case 'HH':
                                        return tf(t.getHours());
                                        break;
                                    case 'ss':
                                        return tf(t.getSeconds());
                                        break;
                                }
                            })
                        }

                        var a = format(result.result.data[i].time*1000,'yyyy-MM-dd HH:mm:ss');

                        var new_hash = (result.result.data[i].txid.length>11)?(result.result.data[i].txid.substr(0,10)):result.result.data[i].txid;

                        var l_form = (result.result.data[i].from.length>10) ?(result.result.data[i].from).substr(0,10)+"..." : result.result.data[i].from;

                        var l_to = (result.result.data[i].to.length>10) ?(result.result.data[i].to).substr(0,10)+"..." : result.result.data[i].to;


                        $(".data-hash-right").append('<div class="data-hash-main"><div class="data-hash-main-top">T#'+new_hash+'</div>' +
                            '<div class="data-hash-main-footer">' +
                            '<div class="current current-form">From: '+l_form+'</div>' +
                            '<div class="current current-to">To: '+l_to+'</div>' +
                            '<div class="current">Amount: '+result.result.data[i].amount+'</div>' +
                            '<div class="current">Time: '+a+'</div></div></div>')
                    }

                }

            },
            error: function (jqXHR, status) {

            }
        });
    };


    do_func2();
    do_func3();
    do_func5();




    $(document).bind('click',function(e){
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id=='navbar-collapse'||elem.id =='btm') {

                return;
            }
            elem = elem.parentNode;

        }

        //点击的不是div或其子元素
        // $('.collapse').css('display','none'); //点击的不是div或其子元素
        $("#navbar-collapse").removeClass("in");

    });
    $("#dataX").click(function () {
        $("#navbar-collapse").removeClass("in");
    })


    $(".data-main-text-wrapp ul li a").click(function () {
        $(this).addClass("active").parent().siblings().children().removeClass("active");

        // var H = ($(this).text()=="24H") ? "1H" :"";

        var D = ($(this).text()=="Daily") ? "1D" : "";

        var W = ($(this).text()=="Weekly") ? "1W" : "";


        var pars = D ? D : W ;

        localStorage.setItem("pars",pars)

        window.location.reload()



    })

    var pars = localStorage.getItem("pars");
    console.log(pars)



});