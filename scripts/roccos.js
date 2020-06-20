
var initHtml = function(){
    var body =  $("body");
    // body.append("<canvas id='c'></canvas>");
    body.append("<div id='goto'></div>");
	body.find("#main").append("<canvas id='canvas'>你的浏览器不支持canvasr</canvas>")
    var subTitle = $("#blogTitle h2").text().trim();
    body.find("#header").after(`<div id='banner'>    <div class="banner-panel">
    <div class="container-fluid">
        <p style="font-size:35px;letter-spacing:8px;" id='banner_title'>${subTitle}</p>
        <p>欢迎光临</p>
        <p class="banner-btn">
            <a class='layui-anim layui-anim-up
            ' href="javascript:void(0)" id='banner_href'>关注我</a>
        </p>
    </div>
</div></div>`);
    body.find("#navList li").eq(0).remove();
	setTimeout(func=>{
		$(".esa-has-subnavs").append("<span class='badge-dot'></span>")
	},200);
}

var showMessage = function(content) {
    $('body').prepend(`<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`);
    let $layer = $('.esa-layer');
    $layer.fadeIn(200);
    setTimeout(() => {
        $layer.remove();
    }, 2000);
}
$(function(){

    const n = "a21b5e98-d2cb-4b2f-0fc8-08d8044eb437";

    if (window.location.href == "https://www.cnblogs.com/roccoshi/") {
        loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", () => {
            loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", () => {
                if (!isLogined) {
                    return;
                }

                $.ajax({
                    url: `${getAjaxBaseUrl()}Follow/FollowBlogger.aspx`,
                    data: '{"blogUserGuid":"' + n + '"}',
                    dataType: "text",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: (msg) => {
                    }
                })
            })
        })
    }


    initHtml();
	
    if (window.location.href.indexOf("/p/") > 0 && window.location.href.indexOf(".html") > 0) {
        $(".container-fluid #banner_title").text($(".postTitle a.postTitle2").text());
    }else if (window.location.href.indexOf("/category/") > 0 && window.location.href.indexOf(".html") > 0) {
        var str =  document.title.split('-')[0].replace(/\s/g,"");
        $(".container-fluid #banner_title").text(str);
    }

    if (window.location.href.indexOf(".html") > 0) {
        $("#banner_href").text("返回");
        $("#banner_href").attr("href","javascript:void(0)");
        $("#banner_href").on("click",function(){
            window.history.go(-1)
        });
    }else{
        $("#banner_href").on("click",function(){
            loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", () => {
                loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", () => {
                    if (!isLogined) {
                        return login();
                    }
                    if (c_has_follwed) {
                        return showMessage('您已经关注过该博主啦');
                    }

                    $.ajax({
                        url: `${getAjaxBaseUrl()}Follow/FollowBlogger.aspx`,
                        data: '{"blogUserGuid":"' + n + '"}',
                        dataType: "text",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: (msg) => {
                            msg == "未登录" ? login() : (msg == "关注成功，请选择分组" && followByGroup(n, !0));
                            showMessage(msg);
                        }
                    })
                })
            })
        });
    }
    
})