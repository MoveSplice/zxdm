define("zebra-pages/fp5/pc/js/mods/new-hot-brand", ["zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render", "zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render", "mui/jquery/jquery", "zebra-pages/fp5/pc/js/mods/util", "zebra-pages/fp5/pc/js/mods/model", "zebra-pages/fp5/pc/js/mods/exposure", "mui/crossimage/index"], function (e, a, t) {
    var n = e("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render"),
        r = e("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render"), i = e("mui/jquery/jquery"),
        s = e("zebra-pages/fp5/pc/js/mods/util"), o = e("zebra-pages/fp5/pc/js/mods/model"),
        l = (e("zebra-pages/fp5/pc/js/mods/exposure"), e("mui/crossimage/index")), d = ".j_newHotBrandBody",
        p = ".j_newHotBrandItemBody", c = "&#xe61f;", m = !0, f = 0, u = 29, v = 4, g = [], x = {
            "conSelector": ".j_newHotBrand", "RES_ID_ARR": ["09042"], "init": function (e) {
                var a = this, t = !1;
                try {
                    location.href.indexOf("forceBrandError=true") > 0 ? t = !0 : (g = e[a.RES_ID_ARR[0]].data, v = Math.floor(g.length / u), g.length < 96 && codeTrack("error:newHotBrandItemNumber.error", "app.init", {"msg": "\u54c1\u724c\u5899\u8fd4\u56de\u4e2a\u6570\u5c11\u4e8e96\uff0c\u4e3a" + g.length}))
                } catch (r) {
                    t = !0, codeTrack("error:newHotBrandItem.error", "app.init", {"msg": "\u54c1\u724c\u5899\u63a5\u53e3\u8c03\u7528\u5931\u8d25"})
                }
                var n = {};
                try {
                    a.render({"icon": c, "data": n})
                } catch (r) {
                }
                s.mmstat("/tmallfp.5105.1"), t && i(".refresh-btn", a.conSelector).hide(), a.bindEvent(), a._initCollectBrand(), i(d).css({"opacity": 0}).animate({"opacity": 1}, 200)
            }, "render": function (e) {
                var a = this;
                i(d).html(n(e)).removeClass("fp-content-loading"), a.updateBrandItems()
            }, "bindEvent": function () {
                var e = this;
                i(e.conSelector).on("click", ".refresh-btn", function (a) {
                    a.preventDefault(), a.stopPropagation(), s.mmstat("/tmallfp.5006.1"), e.updateBrandItems()
                })
            }, "updateBrandItems": function () {
                var e = {}, a = f * u;
                if (e.brands = g.slice(a, a + u), f = f < v - 1 ? f + 1 : 0, e.brands.forEach(function (e, a) {
                        e.imgUrl = l.getFitUrl(s.trimPic(e.imgUrl), 100, 50, {
                            "quality": g_config.imgQuality,
                            "sharpen": ""
                        })
                    }), i(".rotate-icon", d).addClass("active"), setTimeout(function () {
                        i(".rotate-icon", d).removeClass("active")
                    }, 500), m) m = !1, e.needCon = !0, i(p).html(r(e)); else {
                    var t = 0;
                    i(p).find(".brand-item").each(function (a, n) {
                        var s = Math.floor(a % 6), o = Math.floor(a / 6), l = {"brands": [e.brands[a]]};
                        t = s + o, setTimeout(function () {
                            i(".brand-img", n).animate({"width": 0}, 150, "linear", function () {
                                i(n).html(r(l)), i(".brand-img", n).css({"width": 0}).animate({"width": 122}, 100, "linear")
                            })
                        }, 30 + 100 * t)
                    })
                }
                e.brands.forEach(function (e) {
                    e.exposureParam && s.send(e.exposureParam)
                })
            }, "_initCollectBrand": function () {
                var e = this;
                0 !== i(d).length && i(d).on("click", function (a) {
                    if (i(a.target).hasClass("j_BrandStatus")) {
                        var t = a.target;
                        a.preventDefault(), a.stopPropagation();
                        var n = i(t).attr("data-id"), r = i(t).attr("data-collected");
                        r && "true" == r ? o.delBrand(n, function () {
                            i(t).attr("data-collected", "false"), i(t).removeClass("collected"), i(t).html("&#xe604;"), s.mmstat("/tmallfp.5106.2")
                        }, function () {
                        }) : o.addBrand(n, function (a) {
                            "T" == a.is_success ? (i(t).attr("data-collected", "true"), i(t).addClass("collected"), i(t).html("&#xe603;"), s.mmstat("/tmallfp.5106.1")) : "O" == a.is_success ? document.location.href = "//login.tmall.com?spm=875.7931836.fpBrandCollectedLogin.1&redirect_url=" + encodeURIComponent(document.location.href) : e._showBrandStatusTip(brandStatusTip, "\u5173\u6ce8\u5931\u8d25")
                        }, function () {
                        })
                    }
                })
            }
        };
    t.exports = x
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render", ["./new-hot-brand", "zebra-pages/fp5/pc/js/mods/x-runtime"], function (e, a, t) {
    var r = e("./new-hot-brand"), n = e("zebra-pages/fp5/pc/js/mods/x-runtime"), s = new n(r);
    t.exports = function () {
        return s.render.apply(s, arguments)
    }
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand", function (e, a, t) {
    (t.exports = function (e) {
        var a = this, t = a.root, r = a.buffer, n = a.scope,
            s = (a.runtime, a.name, a.pos, n.data, n.affix, t.nativeCommands), i = t.utils;
        i.callFn, i.callCommand, s.range, s.foreach, s.forin, s.each, s["with"], s["if"], s.set, s.include, s.parse, s.extend, s.block, s.macro, s["debugger"];
        return r.data += " ", r.data += "\n  ", r.data += "\n ", r.data += "\n", r.data += '\n<div class="brand-list">\n  <ul class="init j_newHotBrandItemBody brand-item-body" data-spm="2016073"></ul>\n  <div data-spm="fpBrandFresh">\n    <a href="#" class="refresh-btn" data-spm-click="gostr=/tmallfp;locaid=d99;">\n      <i class="rotate-icon fp-iconfont">&#xe637;</i>\n      <span class="btn-text">\u6362\u4e00\u6279</span>\n    </a>\n  </div>\n</div>\n', r
    }).TPL_NAME = t.id || t.name
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render", ["./new-hot-brand-item", "zebra-pages/fp5/pc/js/mods/x-runtime"], function (e, a, t) {
    var r = e("./new-hot-brand-item"), n = e("zebra-pages/fp5/pc/js/mods/x-runtime"), i = new n(r);
    t.exports = function () {
        return i.render.apply(i, arguments)
    }
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item", function (e, a, t) {
    (t.exports = function (e) {
        function a(e, a, t) {
            e.data, e.affix;
            return a.data += '\n  <li class="brand-default">\n    <a href="//ju.taobao.com/tg/brand.htm">\n      <img width="100%" src="https://img.alicdn.com/tfs/TB13R0daSFRMKJjy0FhXXX.xpXa-1230-326.jpg">\n    </a>\n  </li>\n', a
        }

        function t(e, a, t) {
            e.data, e.affix;
            return a.data += '\n  <li class="brand-item">\n  ', a
        }

        function r(e, a, t) {
            var r = e.data, n = e.affix;
            a.data += "\n            <span>\u4f18\u60e0\u5238 \uffe5", m.line = 18;
            var i = (o = n.couponValue) !== t ? o : (o = r.couponValue) !== t ? o : e.resolveLooseUp(["couponValue"]);
            return a = a.writeEscaped(i), a.data += "</span>\n          ", a
        }

        function n(e, a, t) {
            var r = e.data, n = e.affix;
            a.data += "\n            <span>", m.line = 20;
            var i = (o = n.brandName) !== t ? o : (o = r.brandName) !== t ? o : e.resolveLooseUp(["brandName"]);
            return a = a.writeEscaped(i), a.data += "</span>\n          ", a
        }

        function i(e, a, t) {
            e.data, e.affix;
            return a.data += "\n  </li>\n  ", a
        }

        function s(e, a, s) {
            var d = e.data, p = e.affix;
            a.data += "\n  ", m.line = 9;
            var c = (o = e.root.affix.needCon) !== s ? o : e.root.data.needCon;
            a = b.call(l, e, {
                "params": [c],
                "fn": t
            }, a), a.data += '\n      <div class="brand-img">\n        <img src="', m.line = 13;
            var u = (o = p.imgUrl) !== s ? o : (o = d.imgUrl) !== s ? o : e.resolveLooseUp(["imgUrl"]);
            a = a.writeEscaped(u), a.data += '">\n      </div>\n      <a class="brand-mask" href="', m.line = 15;
            var f = (o = p.action) !== s ? o : (o = d.action) !== s ? o : e.resolveLooseUp(["action"]);
            a = a.writeEscaped(f), a.data += '">\n        <div class="coupon">\n          ', m.line = 17, m.line = 17;
            var v = (o = p.couponValue) !== s ? o : (o = d.couponValue) !== s ? o : e.resolveLooseUp(["couponValue"]),
                g = v;
            if (g) {
                var x = (o = p.couponValue) !== s ? o : (o = d.couponValue) !== s ? o : e.resolveLooseUp(["couponValue"]),
                    L = x;
                L = x > 0, g = L
            }
            a = b.call(l, e, {
                "params": [g],
                "fn": r,
                "inverse": n
            }, a), a.data += '\n        </div>\n        <div class="enter">\n          <span>\u70b9\u51fb\u8fdb\u5165</span>\n        </div>\n      </a>\n  ', m.line = 27;
            var h = (o = e.root.affix.needCon) !== s ? o : e.root.data.needCon;
            return a = b.call(l, e, {"params": [h], "fn": i}, a), a.data += "\n", a
        }

        var o, l = this, d = l.root, p = l.buffer, c = l.scope, m = (l.runtime, l.name, l.pos), u = c.data, f = c.affix,
            v = d.nativeCommands, g = d.utils, x = (g.callFn, g.callCommand, v.range, v.foreach, v.forin, v.each),
            b = (v["with"], v["if"]);
        v.set, v.include, v.parse, v.extend, v.block, v.macro, v["debugger"];
        p.data += "", m.line = 1;
        var L = (o = f.brands) !== e ? f.brands.length : (o = u.brands) !== e ? o.length : c.resolveLooseUp(["brands", "length"]),
            h = L;
        h = 0 === L, p = b.call(l, c, {"params": [h], "fn": a}, p), p.data += "\n", m.line = 8, m.line = 8;
        var U = (o = f.brands) !== e ? o : (o = u.brands) !== e ? o : c.resolveLooseUp(["brands"]);
        return p = x.call(l, c, {"params": [U], "fn": s}, p), p.data += "\n", p
    }).TPL_NAME = t.id || t.name
});
define("zebra-pages/fp5/pc/js/mods/fix-search", ["mui/jquery/jquery", "zebra-pages/fp5/pc/js/mods/util"], function (e, a, t) {
    var n = e("mui/jquery/jquery"), r = e("zebra-pages/fp5/pc/js/mods/util");
    t.exports = {
        "init": function (e) {
            var a, t, i, s, o = n("body"), l = n(window), d = !1, p = n("#mallSearch"), c = n("#mq");
            if (p && c) {
                var m = (n(".j_channel"), 788);
                o.append('<div class="as-shelter"></div><div id="J_ASTotalContainer" class="as-total-container"><div id="J_AttachedSearchContainer" class="attached-search-container"><div class="fp-iconfont-new"><span class="logo-en">&#xe610;</span><span class="logo-zh">&#xe611;</span></div></div></div>');
                var f = n("#J_AttachedSearchContainer"), u = n("#J_ASTotalContainer"), v = n(".as-shelter");
                n(window).on("scroll", r.buffer(function (e) {
                    l.scrollTop() > m ? !1 !== d && "block" === u.css("display") || (c[0].blur(), setTimeout(function () {
                        p.appendTo(f)
                    }, 100), u.addClass("show"), v.addClass("show"), d = !0, TB && TB.instance && TB.instance.searchbar && (a = TB.instance.searchbar, t = a.get("log"), t.clickId = "attachedsearch", a.set("log", t)), i === undefined && (s = setInterval(function () {
                        var e = n(".s-menu");
                        e && (e.css({"position": "fixed"}), e.css({"top": "40px"}), clearInterval(s))
                    }, 500)), i === undefined && n(".s-menu") && (i = n(".s-menu")), i && (i.css({"opacity": 1}), i.css({"position": "fixed"}))) : l.scrollTop() <= m && !0 === d && (c[0].blur(), p.appendTo(".header-extra"), u.removeClass("show"), v.removeClass("show"), d = !1, clearInterval(s), TB && TB.instance && TB.instance.searchbar && (a = TB.instance.searchbar, t = a.get("log"), t.clickId = "topsearch", a.set("log", t)), i === undefined && n(".s-menu") && (i = n(".s-menu")), i && i.css({"position": "absolute"}))
                }, 30))
            }
        }
    }
});
define("zebra-pages/fp5/pc/js/mods/header", ["zebra-pages/fp5/pc/js/mods/util", "zebra-pages/fp5/pc/js/mods/model"], function (e, a, t) {
    var n = e("zebra-pages/fp5/pc/js/mods/util"), r = e("zebra-pages/fp5/pc/js/mods/model");
    t.exports = {
        "RES_ID_ARR": ["201603169", "lb-zebra-17931-286930", "2015110211"],
        "RES_NAME_ARR": ["doodle", "event"],
        "init": function (e) {
            var a = this;
            a._initMemberExp(), a._joinus(), e && (a._initDoodle(e), a._initEventBanner(e))
        },
        "_initEventBanner": function (e) {
            var a = this, t = e[a.RES_ID_ARR[1]];
            if (window.location.search.indexOf("wh_daily=daily") > 0 && (t = {
                    "data": [{
                        "imgUrl": "//gtms04.alicdn.com/tps/i4/TB17HQ1MpXXXXbsXXXXD1MBIXXX-190-80.png",
                        "action": "//pages.tmall.com/wow/act/15852/dqr",
                        "switch": !0
                    }]
                }), (t = t && t.data && t.data.length > 0 ? t.data[0] : undefined) && "" + t["switch"] == "true") {
                var r = $(".header-banner");
                if (0 !== r.length) {
                    t.exposureParam && n.send(t.exposureParam), t.action = t.action + (t.action && t.action.indexOf("?") > 0 ? "" : "?") + "spm=875.7931836.2015003.1", $(r).append('<a data-spm="2015003" style="display:none;" class="event-banner j_eventBanner" href="' + (t.action || "#") + '"><img class="event-pic j_eventPic" width="100%" height="100%" src="//img.alicdn.com/tps/i1/TB1ZkQYHpXXXXcPXXXX_RF9JFXX-1-1.gif" data-src="' + t.imgUrl + '" /></a>');
                    var i = $(".j_eventBanner", r), s = $(".j_eventPic", r), o = t.imgUrl;
                    s.length > 0 && o && ($(s).attr("onload", function () {
                        $(i).hide().fadeIn(300)
                    }), $(s).attr({"src": o}))
                }
            }
        },
        "_initDoodle": function (e) {
            var a = this, t = e[a.RES_ID_ARR[0]];
            if ((t = t && t.data && t.data.length > 0 ? t.data[0] : undefined) && "" + t["switch"] != "false") {
                var r = $(".j_logo"), i = $(".tmall-logo-img");
                if (0 !== r.length) {
                    t.exposureParam && n.send(t.exposureParam), $(i).after('<div style="display:none;" class="doodle-con j_doodleCon">' + (t && t.action && t.action.length > 0 ? '<a class="j_doodleLink" style="display:block;height:100%;width:100%;" href="' + t.action + '">' : "") + a._getCountdownCon() + '<img class="doodle hide j_doodle" src="//img.alicdn.com/tps/i1/TB1ZkQYHpXXXXcPXXXX_RF9JFXX-1-1.gif" data-src="' + t.imgUrl + '" />' + (t && t.action && t.action.length > 0 ? "</a>" : "") + "</div>");
                    var s = $(".j_doodleCon", r), o = $(".j_doodle", r), l = o.length > 0 && o.attr("data-src");
                    o.length > 0 && l && (window.g_defaultData.cycloneEntry.isUse || ($(i).hide(), $(o).attr("onload", function () {
                        $(s).hide().fadeIn(300)
                    })), $(o).attr({"src": l}))
                }
            }
        },
        "_getCountdownCon": function () {
            return window.isAdd ? '<div id="J_doodleCountdownCon" style="display:none;" class="doodle-countdown-con"></div>' : ""
        },
        "_initMemberExp": function () {
            r.addMemberExp()
        },
        "_joinus": function () {
            var e = {
                "info": "\u55b5~ \u52a0\u5165\u6211\u4eec\u5427 http://tb.cn/iS8NBOy",
                "logo": "   :::                                :::  \n :::::::                             ::::: \n:::::::::                          ::::::::\n:::::::::::::::::::::::::::::::::::::::::::\n::::    :::    ::::::::::::::::   :::  ::::\n:::    Smart    :::::cool::::    Crazy  :::\n:::::   :::    :::::::::::::::    :::   :::\n:::::::::::::::::::::::::::::::::::::::::::"
            };
            window.console && console.info && console.info(e.logo + "\n\n" + e.info)
        }
    }
});