var url = "API/web/POS/";
var cate = [];
var product = [];
var ingredients = [];
var cateTmpl = $.templates("#cateTmpl");
var prdTmpl = $.templates("#prdTmpl");
var ingTmpl = $.templates("#ingTmpl");
var hisTmpl = $.templates("#hisTmpl");
/**
 * 取得遠端資料，如果要使用server版可以直接修改這裡
 * @param {*} act 
 * @param {*} param 
 */
function getData(act, param) {
    let $d = $.Deferred();

    if (act === "Cate") {
        $d.resolve(jQuery.parseJSON('{"success":true,"total":3,"msg":"","rows":[{"cate_id":"1","cate_name":"甜的"},{"cate_id":"2","cate_name":"鹹的"},{"cate_id":"3","cate_name":"其它"}]}'));

    }
    if (act === "Prd") {
        $d.resolve(jQuery.parseJSON('{"success":true,"total":35,"msg":"","rows":[{"item_id":"1","cname":"天然蜂蜜","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"27","cname":"玉米鮪魚","sa_price":60,"cate_id":"2","css_style":"","css_class":""},{"item_id":"28","cname":"鮪魚沙拉","sa_price":60,"cate_id":"2","css_style":"","css_class":""},{"item_id":"29","cname":"煙煄雞肉","sa_price":60,"cate_id":"2","css_style":"","css_class":""},{"item_id":"3","cname":"鮮奶油","sa_price":35,"cate_id":"1","css_style":"","css_class":""},{"item_id":"30","cname":"田園蔬菜","sa_price":60,"cate_id":"2","css_style":"","css_class":""},{"item_id":"31","cname":"原味鮮奶酪","sa_price":35,"cate_id":"3","css_style":"","css_class":""},{"item_id":"32","cname":"紅茶","sa_price":35,"cate_id":"3","css_style":"","css_class":""},{"item_id":"33","cname":"鮮奶","sa_price":100,"cate_id":"3","css_style":"","css_class":""},{"item_id":"34","cname":"優惠1","sa_price":-1,"cate_id":"3","css_style":"","css_class":""},{"item_id":"35","cname":"進貨付款","sa_price":-1,"cate_id":"3"},{"item_id":"4","cname":"好吃花生","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"5","cname":"草莓醬","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"6","cname":"經典奶酥","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"7","cname":"日式抹茶","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"8","cname":"巧克力","sa_price":40,"cate_id":"1","css_style":"","css_class":""},{"item_id":"26","cname":"玉米沙拉","sa_price":50,"cate_id":"2","css_style":"","css_class":""},{"item_id":"25","cname":"玉米起司","sa_price":50,"cate_id":"2","css_style":"","css_class":""},{"item_id":"24","cname":"玉米培根","sa_price":50,"cate_id":"2","css_style":"","css_class":""},{"item_id":"10","cname":"巧克力鮮奶油","sa_price":50,"cate_id":"1","css_style":"","css_class":""},{"item_id":"11","cname":"蜂蜜鮮奶油","sa_price":50,"cate_id":"1","css_style":"","css_class":""},{"item_id":"12","cname":"抹茶鮮奶油","sa_price":50,"cate_id":"1","css_style":"","css_class":""},{"item_id":"13","cname":"紅豆鮮奶油","sa_price":50,"cate_id":"1","css_style":"","css_class":""},{"item_id":"14","cname":"紅豆煉乳","sa_price":50,"cate_id":"1","css_style":"","css_class":""},{"item_id":"15","cname":"抹茶紅豆","sa_price":55,"cate_id":"1","css_style":"","css_class":""},{"item_id":"16","cname":"香蒜","sa_price":40,"cate_id":"2","css_style":"","css_class":""},{"item_id":"17","cname":"香蒜培根","sa_price":40,"cate_id":"2","css_style":"","css_class":""},{"item_id":"18","cname":"CHEESE蛋","sa_price":55,"cate_id":"2","css_style":"","css_class":""},{"item_id":"19","cname":"CHEESE火腿","sa_price":55,"cate_id":"2","css_style":"","css_class":""},{"item_id":"2","cname":"煉乳","sa_price":35,"cate_id":"1","css_style":"","css_class":""},{"item_id":"20","cname":"CHEESE培根","sa_price":55,"cate_id":"2","css_style":"","css_class":""},{"item_id":"21","cname":"花生培根","sa_price":55,"cate_id":"2","css_style":"","css_class":""},{"item_id":"22","cname":"火腿培根","sa_price":55,"cate_id":"2","css_style":"","css_class":""},{"item_id":"23","cname":"玉米火腿","sa_price":50,"cate_id":"2","css_style":"","css_class":""},{"item_id":"9","cname":"巧克力煉乳","sa_price":45,"cate_id":"1","css_style":"","css_class":""}]}'));

    }
    if (act === "Ing") {
        $d.resolve(jQuery.parseJSON('{"success":true,"total":6,"msg":"","rows":[{"ing_id":"1","cname":"鮮奶油","sa_price":10},{"ing_id":"2","cname":"生菜","sa_price":10},{"ing_id":"3","cname":"起司","sa_price":10},{"ing_id":"4","cname":"蛋","sa_price":10},{"ing_id":"5","cname":"巧克力豆","sa_price":10},{"ing_id":"6","cname":"玉米","sa_price":5}]}'));

    }
    if (act === "Save") {
        $d.resolve(jQuery.parseJSON('{"success":true,"msg":"","rows":[]}'));
        console.log(param);
    }


    return $d.promise();
}

function saveOrder(callback) {
    let data = $("#cars").datagrid("getData");
    let $d = $.Deferred();
    //console.log(data);
    //if(data.total>0){
    getData("Save", {
        id: $("#order_id").html(),
        data: data.rows
    }).done(function (json) {
        //console.log(data);

        $d.resolve(json);

    }).fail(function (error) {
        console.log(error);
        $d.reject(error.response);
    });
    //}else {
    //    $d.reject("無資料可存檔");
    //}

    return $d.promise();
}
var act = "I";

function newOne(reload) {
    if (reload === undefined)
        reload = true;
    if (reload) {
        let dg = $("#cars");
        dg.datagrid("loadData", []);
    }
    /*getData("ID").done(function(json){
        //console.log(data);
        if (json.success){
            
            $("#order_id").html(json.outfile);
            
        }
        else
            alert(data.msg);
    }).fail(function(error){
        console.log(error);
    });*/
    sumMoney('new');
    $act = "I";
    $("#order_id").html("");
}

/**
 * 總計金額計算
 */
function sumMoney(state) {
    let data = $("#cars").datagrid("getData");
    let sum = 0;
    for (var i = 0; i < data.total; i++) {
        sum += data.rows[i].sum;
    };

    $("div.sum").html(sum);
    if (state === "new")
        $("#modify").html("新單");
    else if (state === "upd") {
        $("#modify").html("歷史單");

    } else {
        if (act === "I")
            $("#modify").html("未存檔");
        else
            $("#modify").html("修改中，未存檔");
    }
}

/**
 * 載入歷史訂單
 */
function loadHistory() {
    $("#historyWin").window("open");
    getData("His").done(function (json) {
        //console.log(data);
        if (json.success) {

            $("#historysPanel").html(hisTmpl.render(json.rows));
            $.parser.parse('#historysPanel');
        } else
            alert(data.msg);

    }).fail(function (error) {
        console.log(error);

    });
}
/**
 * 按下歷史訂單按鈕
 * @param {*} _this 
 */
function fireHistory(_this) {
    let id = $(_this).data("id");
    getData("Form", {
        id: id
    }).done(function (json) {
        //console.log(data);
        if (json.success) {
            $("#order_id").html(json.rows[0].ord_id);
            //console.log(json.rows[0]);
            $("#cars").datagrid("loadData", json.rows[0].ods);

            act = "upd";
            sumMoney("upd");
            closeWin("historyWin");
        } else
            alert(data.msg);

    }).fail(function (error) {
        console.log(error);

    });

}

/**
 * 暫存已filter的產品
 */
var fp = [];
/**
 * 過濾分類產品
 * @param {*} id 
 */
function filterProducts(id) {

    return $.grep(product, function (n, i) {

        return n.cate_id === id;
    });

}
/**
 * 找到產品本身，不考慮找不到問題
 * @param {*} _this 
 */
function findProduct(id) {

    return $.grep(product, function (n, i) {

        return n.item_id === id;
    });

}

/**
 * 分類點擊事件
 * @param {本身} _this 
 */
function fireCate(_this) {
    let id = $(_this).data("id");
    //console.log(id);

    $("div.products").hide(); //.each(function(idx,val){
    //console.log(idx,val);
    //$(val).hide();
    //});
    //console.log(data);
    if (fp[id] == undefined) {
        let data = filterProducts(id.toString());
        if (data.length > 0) {
            let div = $("<div class='easyui-panel products' id='p" + id + "' data-options='fit:true'></div>");

            div.html(prdTmpl.render(data));
            //console.log(div);
            $("#products").append(div);
            $.parser.parse("#p" + id);
            fp[id] = "p" + id;
        }
    } else {

        //console.log($("#"+fp[id]));
        $("#" + fp[id]).show();

    }



}
/**
 * 加料按鈕
 * @param {*} _this 
 */
function fireIng(_this) {
    let id = $(_this).data("id");
    let dg = $("#cars");

    if (id) {
        let selrow = dg.datagrid("getSelected");
        if (selrow != null) {
            let idx = dg.datagrid("getRowIndex", selrow);
            let price = $(_this).data("price");
            let name = $(_this).data("name");
            let sa_price = parseInt(price, 10) + parseInt(selrow.sa_price, 10);
            let sum = sa_price * parseInt(selrow.qty, 10);
            dg.datagrid('updateRow', {
                index: idx,
                row: {
                    item_id: selrow.item_id + "," + id,
                    cname: selrow.cname + "," + name,
                    sa_price: sa_price,
                    sum: sum,

                }
            });
            sumMoney();
        }
    }
    $("#ingredientsWin").window("close");
}
/**
 * 關閉視窗
 * @param {*} id 
 */
function closeWin(id) {
    $('#' + id).window("close")
}
/**
 * 按鈕事件
 * @param {*}} _this 
 */
function fireButton(_this) {
    let d = $(_this).data("v");
    let dg = $("#cars");


    if (d === "sure") {
        let print = $(_this).data("print");

        //console.log("print");
        saveOrder().done(function (json) {
            if (json.success) {
                $("#modify").html("已存檔");
                $act = "U";
                $("#order_id").html(json.codeMsg);
                if (print == true) {
                    $('#printWin').window("open");
                    $("#printPanel").attr("src", 'print.html?id=' + json.codeMsg);
                } else
                    alert("存檔成功!");

            } else
                alert(json.msg);

        });
        return;
    }
    if (d === "his") {
        loadHistory();
        //console.log("his");
        return;
    }
    if (d === "delAll") {
        if ($("#order_id").html() != "") {
            getData("Delete", {
                id: $("#order_id").html()
            }).done(function (json) {
                //console.log(data);
                if (json.success) {
                    $("#order_id").html("");
                    act = "ins";
                    $("#cars").datagrid("loadData", []);
                    sumMoney("new");
                } else
                    alert(data.msg);

            }).fail(function (error) {
                console.log(error);

            });
        } else {
            $("#order_id").html("");
            act = "ins";
            $("#cars").datagrid("loadData", []);
            sumMoney("new");
        }
        return;
    }

    let selrow = dg.datagrid("getSelected");
    if (selrow == null)
        return;

    let idx = dg.datagrid("getRowIndex", selrow);

    let newval = selrow.new;
    //let sa_price = selrow.sa_price;
    let sum = selrow.sum;
    let qty = selrow.qty;
    if (d === 'new') {
        newOne();
        return;
    }
    if (d === "del") {
        dg.datagrid("deleteRow", idx);
        sumMoney();
        return;
    }
    if (d === "ing") {
        $("#ingredientsWin").window("open");
        return;
    }
    if (d === 'rmk') {
        $("#rmkWin").window("open");
        $("#rmk").val("");
        return;
    }


    if (d.indexOf("num") == 0) {

        let num = d.replace("num", "");

        qty = parseInt(num, 10);
        if (selrow.new === false)
            qty = parseInt(selrow.qty + "" + num, 10);
        sum = parseInt(selrow.sa_price, 10) * qty;
        newval = false;
    }
    if (d === "back") {


        qty = selrow.qty.toString().substr(0, selrow.qty.toString().length - 1);

        if (qty === "") {
            qty = 1;
            newval = true;
        }
        sum = parseInt(selrow.sa_price, 10) * qty;
    }
    dg.datagrid('updateRow', {
        index: idx,
        row: {
            qty: qty,
            sum: sum,
            new: newval
        }
    });
    sumMoney();
}
/**
 * 增加備註
 */
function rmkSure() {
    $('#cars').datagrid('appendRow', {

        item_id: '0',
        cname: $("#rmk").val(),
        qty: 1,
        sa_price: 0,
        sum: 0,
        new: true

    });
    closeWin("rmkWin");
    sumMoney();
}
/**
 * 點擊產品
 * @param {*} _this 
 */
function fireProduct(_this) {
    let id = $(_this).data("id");
    let pro = findProduct(id.toString())[0];

    $('#cars').datagrid('insertRow', {
        index: 0, // index start with 0
        row: {
            item_id: pro.item_id,
            cname: pro.cname,
            qty: 1,
            sa_price: pro.sa_price,
            sum: pro.sa_price,
            new: true
        }
    });
    $("#cars").datagrid("selectRow", 0);
    sumMoney();
}
/**
 * init
 */
$(function () {
    getData("Cate").done(function (data) {
        //console.log(data);
        if (data.success) {
            cate = data.rows
            $("div.categories").html(cateTmpl.render(data.rows));
            $.parser.parse('div.categories');
        } else
            alert(data.msg);
    }).fail(function (error) {
        console.log(error);
    });
    getData("Prd").done(function (data) {
        //console.log(data);
        if (data.success)
            product = data.rows;
        else
            alert(data.msg);
    }).fail(function (error) {
        console.log(error);
    });
    getData("Ing").done(function (data) {
        //console.log(data);
        if (data.success) {
            ingredients = data.rows;
            $("#ingredientsPanel").html(ingTmpl.render(data.rows));
            $.parser.parse('#ingredientsPanel');
        } else
            alert(data.msg);
    }).fail(function (error) {
        console.log(error);
    });
    //newOne(false);
});