$(function () {
    var data_path = "http://vbcexplorer.net";
    // var data_path = "http://119.23.61.53:8186";
    "use static";

    function getCookie(cname){
        var name = cname + "=";

        var ca = document.cookie.split(';');

        for(var i=0; i<ca.length; i++) {

            var c = ca[i].trim();

            if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
        }

        return "";
    }



    var do_func1 = function () {

        var data = "pageIndex=1&pageSize=10";

        $.ajax({
            url: data_path+"/vbcExplorer/tx/getTxList",
            type: "post",
            dataType: 'json',
            data:data,
            setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
            success: function (result) {
                console.log(result)
                if(result!=null&&result!="undefined"){
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
                        var b = format(result.result.data[i].timereceived*1000,'yyyy-MM-dd HH:mm:ss');
                        var textid = result.result.data[i].txid;
                        var xextid = textid.substr(0,10);
                        $(".Transaction-main-parent").append(" <div class=\"Transaction-main\">" +
                            "<div class=\"col-lg-12 title\">Transaction#"+xextid+"</div> " +
                            "<div >" +
                            "<ul>" +
                            "<li>Confirmations:"+result.result.data[i].confirmations+"</li>" +
                            "<li>Hash:"+result.result.data[i].blockhash+"</li>" +
                            "<li>Amount:"+result.result.data[i].amount+"</li>" +
                            "<li>Category:"+result.result.data[i].category+"</li>" +
                            "<li>Generated:"+result.result.data[i].generated+"</li>" +
                            "<li>From: "+result.result.data[i].from+"</li>" +
                            "<li>To:"+result.result.data[i].to+"</li>" +
                            "<li>Time:"+a+"</li>" +
                            "<li>Timereceived:"+b+"</li>" +
                            "</ul>" +
                            "</div>" +
                            "</div>")

                    }
                    console.log("getTxList=",result)
                }

            },
            error: function (jqXHR, status) {

            }
        });

        var ii = 60;

        setInterval(function () {
            ii--;

            console.log(ii);

            if(ii==0){

                console.log("发起请求")

                var data = "pageIndex=1&pageSize=10";

                $.ajax({
                    url: data_path+"/vbcExplorer/tx/getTxList",
                    type: "post",
                    dataType: 'json',
                    data:data,
                    setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
                    success: function (result) {
                        if(result!=null&&result!="undefined"){
                            $(".Transaction-main-parent").html("")
                            for(var i in result.result.data){
                                // function formatDuring(mss) {
                                //     var days = parseInt(mss / (1000 * 60 * 60 * 24));
                                //     var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                //     var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                                //     var seconds = parseInt((mss % (1000 * 60)) / 1000);
                                //     return days + " day " + hours + " hour " + minutes + " minute " + seconds + " second ";
                                // }
                                // var a = formatDuring(result.result.data[i].time);
                                // var b = formatDuring(result.result.data[i].timereceived);
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
                                var b = format(result.result[i].timereceived*1000,'yyyy-MM-dd HH:mm:ss');
                                var textid = result.result.data[i].txid;
                                var xextid = textid.substr(0,10);
                                $(".Transaction-main-parent").append(" <div class=\"Transaction-main\">" +
                                    "<div class=\"col-lg-12 title\">Transaction#"+xextid+"</div> " +
                                    "<div>" +
                                    "<ul>" +
                                    "<li>confirmations:"+result.result.data[i].confirmations+"</li>" +
                                    "<li>Hash:"+result.result.data[i].blockhash+"</li>" +
                                    "<li>amount:"+result.result.data[i].amount+"</li>" +
                                    "<li>category:"+result.result.data[i].category+"</li>" +
                                    "<li>generated:"+result.result.data[i].generated+"</li>" +
                                    "<li>timereceived:"+b+"</li>" +
                                    "</ul>" +
                                    "</div>" +
                                    "</div>")

                            }
                            console.log("getTxList=",result)
                        }

                    },
                    error: function (jqXHR, status) {

                    }
                });

                console.log("请求结束")

                window.location.reload()

                ii=60;
            }

        },1000)


    };
    do_func1()
    $(".data-section-span").click(function () {

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

    })

    $(".data-section-input").blur(function () {
        if($(".data-section-input").val()==""){
            $(".transaction").html("")
        }
    })

    $(".clear-padding-left").click(function () {

        $(".Transaction-main-parent1").show()

        $(".Transaction-main-parent1").html("<div style=\"width: 100%;height: 800px;\">暂无数据</div>")

        $(".Transaction-main-parent").hide()

    })
    $(".clear-padding-right").click(function () {

        $(".Transaction-main-parent").show()

        $(".Transaction-main-parent1").hide()

    })
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
    do_func2();
    $.ajax({
        url: data_path+"/vbcExplorer/currency/getBalance",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {

            var num =(result.result.balance)/100000000;

            var num1 = num.toString().match(/^\d+(?:\.\d{0,4})?/)[0]*100+"%";

            var a = result.result.balance;

            var aNew;

            var re = /([0-9]+\.[0-9]{2})[0-9]*/;

            aNew = a.replace(re,"$1");

            console.log(num1);

            $(".Blocks").html('<div class="data-main-top">Current VBC PCT</div><div class="data-main-text">'+num1+'</div>');

            console.log("getBlockTime=",result)

            $(".Total").html("<div class=\"data-main-top res\">Current VBC</div><div class=\"data-main-text req\">"+aNew+"</div>")

        },
        error: function (jqXHR, status) {

        }
    });

    $(document).bind('click',function(e){

        var e = e || window.event; //浏览器兼容性

        var elem = e.target || e.srcElement;

        while (elem) { //循环判断至跟节点，防止点击的是div子元素

            if (elem.id && elem.id=='navbar-collapse'||elem.id =='btm') {

                return;
            }

            elem = elem.parentNode;

        }

        $("#navbar-collapse").removeClass("in");

    });

    $("#dataX").click(function () {

        $("#navbar-collapse").removeClass("in");
    })


})