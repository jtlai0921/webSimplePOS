

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
            return pair[1];
            }
        } 
        alert('Query Variable ' + variable + ' not found');
        }
        var id = getQueryVariable("id");
        fetch("API/web/POS/"+"Form"+".do", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify({id:id})
        }).then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                var error = new Error(response.statusText)
                error.response = response;
                throw error;
            }
        })
            .then(function (json) {
                if(json.success)
                {
                    $("#ord_id").html(json.rows[0].ord_id);
                    $("#ord_date").html(json.rows[0].ord_date);
                    $("#create_date").html(json.rows[0].create_date);
                    $.each(json.rows[0].ods,function(idx,val){
                        $("#res").append("<tr><td>"+val.cname+"</td><td>"+val.qty+"</td><td>"+val.sa_price+"</td><td>"+val.sum+"</td></tr>");
                    });
                    window.print();
                }else{
                    alert(json.msg);
                }
                
            }).catch(function (error) {
                
            }).then(function (errorData) {
                //失敗
            });