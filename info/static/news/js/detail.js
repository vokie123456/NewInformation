function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}


$(function(){

    // 打开登录框
    $('.comment_form_logout').click(function () {
        $('.login_form_con').show();
    });

    // 收藏
    $(".collection").click(function () {
        $.ajax({
            url: '/news/collected',
            type: 'post',
            data: JSON.stringify({'news_id': $(this).attr('data-newid')}),
            contentType: 'application/json',
            headers: {'X-CSRFToken': getCookie('csrf_token')}
        })
            .done(function (response) {
                if (response.errno == '0'){
                    alert(response.errmsg)
                    $('.collection').hide();
                    $('.collected').show();
                }
                else if (response.errno == '4101'){
                    $('.login_form_con').show();
                }else {
                    alert(response.errmsg)
                }
            })
            .fail(function () {
                alert('服务器超时，请重试！')
            })
    });
    // 取消收藏
    $(".collected").click(function () {
        $.ajax({
            url: '/news/cancel_collected',
            type: 'post',
            data: JSON.stringify({'news_id': $(this).attr('data-newid')}),
            contentType: 'application/json',
            headers: {'X-CSRFToken': getCookie('csrf_token')}
        })
            .done(function (response) {
                if (response.errno == '0'){
                    alert(response.errmsg);
                    // 隐藏已收藏按钮
                    $('.collected').hide();
                    // 显示收藏按钮
                    $('.collection').show();
                }
            })
            .fail(function () {
                alert('服务器超时，请重试!')
            })

     
    })

        // 评论提交
    $(".comment_form").submit(function (e) {
        e.preventDefault();

    })

    $('.comment_list_con').delegate('a,input','click',function(){

        var sHandler = $(this).prop('class');

        if(sHandler.indexOf('comment_reply')>=0)
        {
            $(this).next().toggle();
        }

        if(sHandler.indexOf('reply_cancel')>=0)
        {
            $(this).parent().toggle();
        }

        if(sHandler.indexOf('comment_up')>=0)
        {
            var $this = $(this);
            if(sHandler.indexOf('has_comment_up')>=0)
            {
                // 如果当前该评论已经是点赞状态，再次点击会进行到此代码块内，代表要取消点赞
                $this.removeClass('has_comment_up')
            }else {
                $this.addClass('has_comment_up')
            }
        }

        if(sHandler.indexOf('reply_sub')>=0)
        {
            alert('回复评论')
        }
    })

        // 关注当前新闻作者
    $(".focus").click(function () {

    })

    // 取消关注当前新闻作者
    $(".focused").click(function () {

    })
})