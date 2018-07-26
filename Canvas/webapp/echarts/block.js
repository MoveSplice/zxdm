$(function () {
    var data_path = "http://vbcexplorer.net";
    // var data_path = "http://119.23.61.53:8186";

    function getCookie(cname){
        var name = cname + "=";

        var ca = document.cookie.split(';');

        for(var i=0; i<ca.length; i++) {

            var c = ca[i].trim();

            if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
        }

        return "";
    }



    $.ajax({
        url: data_path+"/vbcExplorer/currency/getBalance",
        type: "post",
        dataType: 'json',
        setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
        success: function (result) {

            console.log("getBlockTime=",result)

            var num =(result.result.balance)/100000000;

            var num1 = num.toString().match(/^\d+(?:\.\d{0,4})?/)[0]*100+"%";


            var a = result.result.balance;

            var aNew;

            var re = /([0-9]+\.[0-9]{2})[0-9]*/;

            aNew = a.replace(re,"$1");

            console.log(num1);

            $(".Blocks").html('<div class="data-main-top">Current VBC PCT</div><div class="data-main-text">'+num1+'</div>');

            $(".Total").html("<div class=\"data-main-top res\">Current VBC</div><div class=\"data-main-text req\">"+aNew+"</div>")

        },
        error: function (jqXHR, status) {

        }
    });




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
    var do_func3 = function (){

        var parameter = getCookie("parameter");

        var data = "height="+parameter;

        $.ajax({
            url: data_path+"/vbcExplorer/block/searchBList",
            type: "get",
            dataType: 'json',
            data:data,
            setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
            success: function (result) {

                console.log("searchBList",result);

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

                        $("#block-main").append("<div class=\"block-main\"><div class=\"col-lg-12 title\">BLOCK#"+result.result[i].bits+"</div><div class=\"col-lg-12\"><ul>" +
                            "<li>Hash:"+result.result[i].hash+"</li>" +
                            "<li>ProofHash: "+result.result[i].proofhash+"</li>" +
                            "<li>Difficulty: "+result.result[i].difficulty+"</li>" +
                            "<li>PreviousBlockHash: "+result.result[i].previousblockhash+"</li>" +
                            "<li>MerkleRoot: "+result.result[i].merkleroot+"</li>" +
                            "<li>Mint: "+result.result[i].mint+"</li>" +
                            "<li>Modifier: "+result.result[i].modifier+"</li>" +
                            "<li>ModifierCheckSum: "+result.result[i].modifierchecksum+"</li>" +
                            "<li>Height: "+result.result[i].height+"</li>" +
                            "<li>Size: "+result.result[i].size+"</li>" +
                            "<li>Time: "+a+"</li>" +
                            "<li>Nonce: "+result.result[i].nonce+"</li>" +
                            "<li>Flags: "+result.result[i].flags+"</li>" +
                            "<li>Signature: "+result.result[i].signature+"</li>" +
                            "<li>Entropybit: "+result.result[i].entropybit+"</li>" +
                            "<li>Confirmations: "+result.result[i].confirmations+"</li>" +
                            "</ul>" +
                            "</div></div>")


                    }
                }

            },
            error: function (jqXHR, status) {

                console.log(jqXHR)

                alert(status)

            }

        });

        var ii = 300;

        setInterval(function () {
            ii--;
            console.log(ii);
           
            if(ii==0){
                console.log("发起请求");

                var data = "height="+parameter;
                $.ajax({
                    url: data_path+"/vbcExplorer/block/searchBList",
                    type: "get",
                    dataType: 'json',
                    data:data,
                    setRequestHeader: {"Content-type": "application/x-www-form-urlencoded"},
                    success: function (result) {

                        console.log("searchBList",result);

                        $("#block-main").html("");

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

                                $("#block-main").append("<div class=\"block-main\"><div class=\"col-lg-12 title\">BLOCK#"+result.result[i].bits+"</div><div class=\"col-lg-12\"><ul>" +
                                    "<li>Hash:"+result.result[i].hash+"</li>" +
                                    "<li>ProofHash: "+result.result[i].proofhash+"</li>" +
                                    "<li>Difficulty: "+result.result[i].difficulty+"</li>" +
                                    "<li>PreviousBlockHash: "+result.result[i].previousblockhash+"</li>" +
                                    "<li>MerkleRoot: "+result.result[i].merkleroot+"</li>" +
                                    "<li>Mint: "+result.result[i].mint+"</li>" +
                                    "<li>Modifier: "+result.result[i].modifier+"</li>" +
                                    "<li>ModifierCheckSum: "+result.result[i].modifierchecksum+"</li>" +
                                    "<li>Height: "+result.result[i].height+"</li>" +
                                    "<li>Size: "+result.result[i].size+"</li>" +
                                    "<li>Time: "+a+"</li>" +
                                    "<li>Nonce: "+result.result[i].nonce+"</li>" +
                                    "<li>Flags: "+result.result[i].flags+"</li>" +
                                    "<li>Signature: "+result.result[i].signature+"</li>" +
                                    "<li>Entropybit: "+result.result[i].entropybit+"</li>" +
                                    "<li>Confirmations: "+result.result[i].confirmations+"</li>" +
                                    "</ul>" +
                                    "</div></div>")


                            }
                        }

                    },
                    error: function (jqXHR, status) {

                        console.log(jqXHR)

                        alert(status)

                    }

                });

                console.log("请求结束");

                ii=300;
            }

        },1000)

    }

    do_func2();

    do_func3();

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