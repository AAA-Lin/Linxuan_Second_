let article_input = document.querySelector(".article-input")
let article_box_data_content = document.querySelector(".article-box-data-content")
let article_comment_comment = document.querySelector(".article-comment-comment")
let article_comment_iconbox = document.querySelector(".article-comment")
let article_foot_data_bigbox = document.querySelector(".article-foot-data-bigbox")
let article_tag_mask = document.querySelector(".article-tag-mask")
let article_input2 = document.querySelector(".article-input2")
let post_btn = document.querySelector(".post-btn")
let article_comment_like = document.querySelector(".article-comment-like")
let article_like = document.querySelector(".article-like")
let artical_top_back = document.querySelector(".artical-top-back")
//给黑罩子绑定点击事件
function mask_click(e){
article_tag_mask.addEventListener('click',function(){
    document.querySelector(".artical-main").style.display = 'block'
    document.querySelector(".artical-comment").style.display = 'block'
    document.querySelector(".article-comment-main").style.display = 'block'
    article_tag_mask.style.display = 'none'
    article_foot_data_bigbox.style.display = 'none'
    article_comment(e.getAttribute('articleId'))
})
}
//获取喜欢的文章列表并且判断是否渲染红色
function getLikeArticle_detial(likPparamsObj){

        token = window.sessionStorage.getItem('token')
        let xhr = new XMLHttpRequest()
        const qs = resolveData(likPparamsObj.data)
        const formData = new FormData()
        for (let k in likPparamsObj.data) {
            formData.append(k, likPparamsObj.data[k]);
        }
    
        if (likPparamsObj.method.toUpperCase() === 'GET') {
            xhr.open(likPparamsObj.method, likPparamsObj.url + '?' + qs)
            xhr.setRequestHeader('Authorization', token)
            xhr.send()
        } else if (likPparamsObj.method.toUpperCase() === 'POST') {
            xhr.open(likPparamsObj.method, likPparamsObj.url)
            xhr.setRequestHeader('Authorization', token)
            xhr.send(formData)
        }
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText)
                if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                    likPparamsObj.success(result)
                    console.log("查询成功~")
                }
                if (result.status === 400) {
                    let icon1 = document.querySelector(".article-comment-like")
                    let icon2 = document.querySelector(".article-like")
                        icon1.style.color = 'rgb(128,124,124)'
                        icon2.style.color = 'rgb(128,124,124)'
                    console.log(xhr.responseText)
                    console.log("查询失败~")
                }
            } else {
                console.log("请求失败")
            }
        }

}
//给文章详情页底部输入框绑定点击事件
article_input.addEventListener('click',function(e){
    document.querySelector(".artical-main").style.display = 'none'
    document.querySelector(".artical-comment").style.display = 'none'
    document.querySelector(".article-comment-main").style.display = 'none'
    article_tag_mask.style.display = 'block'
    article_foot_data_bigbox.style.display = 'block'
    post_btn.setAttribute('articleId',e.target.getAttribute('articleId'))
    console.log(post_btn.getAttribute('articleId'))
    article_comment2(e.target.getAttribute('articleId'),e.target.getAttribute('authorId'))
    mask_click(e.target)

    })
//给两个评论的图标绑定点击事件
article_comment_iconbox.addEventListener('click',function(e){
    document.querySelector(".artical-main").style.display = 'none'
    document.querySelector(".artical-comment").style.display = 'none'
    document.querySelector(".article-comment-main").style.display = 'none'
    article_tag_mask.style.display = 'block'
    article_foot_data_bigbox.style.display = 'block'
    post_btn.setAttribute('articleId',e.target.getAttribute('articleId'))
    console.log(post_btn.getAttribute('articleId'))
    article_comment2(e.target.getAttribute('articleId'),e.target.getAttribute('authorId'))

// // 给黑罩子绑定点击事件
// article_tag_mask.addEventListener('click',function(){
//     document.querySelector(".artical-main").style.display = 'block'
//     document.querySelector(".artical-comment").style.display = 'block'
//     document.querySelector(".article-comment-main").style.display = 'block'
//     article_tag_mask.style.display = 'none'
//     article_foot_data_bigbox.style.display = 'none'
//     article_comment(e.target.getAttribute('articleId'))
// })
    mask_click(e.target)

})
article_comment_comment.addEventListener('click',function(e){
    document.querySelector(".artical-main").style.display = 'none'
    document.querySelector(".artical-comment").style.display = 'none'
    document.querySelector(".article-comment-main").style.display = 'none'
    article_tag_mask.style.display = 'block'
    article_foot_data_bigbox.style.display = 'block'
    post_btn.setAttribute('articleId',e.target.getAttribute('articleId'))
    // console.log(post_btn.getAttribute('articleId'))
    article_comment2(e.target.getAttribute('articleId'),e.target.getAttribute('authorId'))

// // 给黑罩子绑定点击事件
// article_tag_mask.addEventListener('click',function(){
//     document.querySelector(".artical-main").style.display = 'block'
//     document.querySelector(".artical-comment").style.display = 'block'
//     document.querySelector(".article-comment-main").style.display = 'block'
//     article_tag_mask.style.display = 'none'
//     article_foot_data_bigbox.style.display = 'none'
//     article_comment(e.target.getAttribute('articleId'))
// })
    mask_click(e.target)

})


// 给发送按钮绑定点击事件
post_btn.addEventListener('click',function(e){
    if(key==0){
        postComment(e.target,1,0)
    }
    if(key==2){
        postComment(e.target,2,commentId_key)
    }
    
})
//发表评论
function postComment(target,n,m){
    let input_father = target.previousElementSibling
    let input_box = input_father.firstElementChild
    let articleId = +target.getAttribute('articleId')
    // console.log(articleId)
    // console.log(input_box.value)
    let commentId = null
    let postCommentPparamsObj={}
    if(n==1){
        postCommentPparamsObj = {
            method: 'post',
            url: 'http://175.178.4.54:3007/review/submitReview',
            data: {
                content: input_box.value,
                articleId: articleId,
            },
            success: function (response) {
                console.log (response)
                console.log("发布评论成功")
                document.querySelector(".article-input2").placeholder="评论支持太太"
                key=0
                commentId_key = 0
                input_box.value = ''
                article_comment2(postCommentPparamsObj.data.articleId)
    
                // article_comment_commentnumbox.innerHTML = article_comment_commentnumbox.getAttribute('reviewNum')+1
                // article_commentbox_num.innerHTML = article_commentbox_num.getAttribute('reviewNum')+1
            }
        }
    }
    if(n==2){
        commentId = m
        postCommentPparamsObj = {
            method: 'post',
            url: 'http://175.178.4.54:3007/review/submitReview',
            data: {
                content: input_box.value,
                articleId: articleId,
                replyId: commentId
            },
            success: function (response) {
                console.log (response)
                console.log("发布评论成功")
                document.querySelector(".article-input2").placeholder="评论支持太太"
                key=0
                commentId_key = 0
                input_box.value = ''
                article_comment2(postCommentPparamsObj.data.articleId)
    
                // article_comment_commentnumbox.innerHTML = article_comment_commentnumbox.getAttribute('reviewNum')+1
                // article_commentbox_num.innerHTML = article_commentbox_num.getAttribute('reviewNum')+1
            }
        }
    }
    console.log(m)
    console.log(commentId)
    
    GetAndPost(postCommentPparamsObj)

}
// 获取文章评论
function article_comment2(articleId,authorId) {

    let otherFansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/review/getReviewsByArt',
        data: {
            articleId: +articleId,
            page: 1,
            size: 20
        },
        success: function (response) {
            document.querySelector('.article-commentbox-num').innerHTML=response.list.length
            document.querySelector('.article-comment-commentnumbox').innerHTML=response.list.length
            // console.log('====================')
            let strings = ''
            for (let k = 0; k < response.list.length; k++) {
                // console.log(response.list[k])
                strings += `
                <div class="article-comment-main-bigbox2" id = "${
                    response.list[k].id
                }">
                <div class="article-comment-box2">
                <div class="commentbox-pic">
                <img src="${
                    response.list[k].userInfo.avatar
                }" alt="" class="commentbox2-pics" userId="${
                    response.list[k].userInfo.uid
                }"></div>
                <div class="commentbox2-main" commentId="${response.list[k].id}" articleId="${articleId}">
                    <div class="commentbox2-nickname">${
                    response.list[k].userInfo.userName
                }</div>
                    <div class="commentbox2-content" commentId="${response.list[k].id}">${
                    response.list[k].content
                }</div>
                    <div class="commentbox2-time">${
                    response.list[k].time
                }</div>
                </div>
                <div class="commentbox2-main-icon">
                <div class="commentbox2-icon" review_id="${response.list[k].id}" style="color:rgb(128, 124, 124)"></div>
                <div class="commentbox2-likenum" goodNum="${response.list[k].goodNum}">${response.list[k].goodNum}</div>
            </div>
            <div class="commentbox-delect" userId="${response.list[k].userInfo.uid}" commentId="${response.list[k].id}" articleId="${articleId}"></div>
        </div>
            `
                if (response.list[k].childrenReviews!=[]) {
                    
                    console.log(response.list[k].childrenReviews)
                    for(let r=0;r<response.list[k].childrenReviews.length;r++){
                        
                                strings += `      
                                <div class="article-commentSecond-bigbox" style="display:block">
                                <div class="article-commentSecond-box">
                                    <div class="commentSecondbox-pic"><img src="${avatar_second}" alt="" class="commentSecondbox-pics" authorId="${response.list[k].childrenReviews[r].authorId}"></div>
                                    <div class="commentSecondbox-main">
                                        <div class="commentSecondbox-nickname">${name_second}</div>
                                        <div class="commentSecondbox-content">${response.list[k].childrenReviews[r].content}</div>
                                        <div class="commentSecondbox-time">${response.list[k].childrenReviews[r].time}</div>
                                    </div>
                                    <div class="commentSecondbox-main-icon">
                                    <div class="commentSecondbox-icon"></div>
                                    <div class="commentSecondbox-likenum">${response.list[k].childrenReviews[r].goodNum}</div>
                                </div>
                            </div>
                            </div>`
                            
                            }
                        }

            }
            article_box_data_content.innerHTML = strings


            let second=document.querySelectorAll(".commentSecondbox-pics")
            for(let w =0;w<second.length;w++){
                getuser(second[w].getAttribute("authorId"),second[w])
            }




            let delect = document.querySelectorAll(".commentbox-delect")
            if(authorId == yourId){
            for(let v = 0; v < delect.length; v++){
                delect[v].style.display ='block'
        }
            }else{
            
            for(let v = 0; v < delect.length; v++){
            if(delect[v].getAttribute('userId') == yourId){
                delect[v].style.display ='block'
            }else{
                delect[v].style.display ='none'
            }
        }
    }
            comment_likeIcon_click2()
            commentbox_delect_click()
            comment_user_pic_click2()
            
            // article_other_click()

        }
    }
    // 发起请求
    GetAndPost(otherFansparamsObj)
}
//给文章详情页的爱心图标渲染红色
function like_icon_red(){
    getLikeArticle_detial(likPparamsObj)
    // 遍历所有盒子并一一判断盒子所对应的文章id是否在已经喜欢的文章列表里
        // console.log(likeArticleList)
        let articleId = article_comment_like.getAttribute('articleId')
        for (let k = 0; k < like_num; k++) {
            if (likeArticleList[k] == articleId) {
                article_comment_like.style.color = 'rgb(253,55,72)'
                article_like.style.color = 'rgb(253,55,72)'
            }else{
                article_comment_like.style.color = 'rgb(128, 124, 124)'
                article_like.style.color = 'rgb(128, 124, 124)'
            }
        
    }
}
//给文章详情页的爱心图标渲染红色绑定点击事件
article_comment_like.addEventListener('click',function(e){
    // console.log(article_comment_like.style.color)
            if (article_comment_like.style.color === 'rgb(128, 124, 124)') {
                postLike(article_comment_like.getAttribute('articleId'), e.target)
                
                article_like.style.color = 'rgb(253, 55, 72)'
            } else if (article_comment_like.style.color === 'rgb(253, 55, 72)') {
                cancleLike(article_comment_like.getAttribute('articleId'), e.target)
                
                document.querySelector('.likebox-icon .article-likebox-num').innerHTML= second_foot_likeNum 
                article_like.style.color = 'rgb(128, 124, 124)'
            } else {
                console.log("查询错误11111")
            }
        })
article_like.addEventListener('click',function(e){
    if (article_like.style.color === 'rgb(128, 124, 124)') {
        postLike(article_like.getAttribute('articleId'), e.target)
        // article_comment_like.nextElementSibling.innerHTML = second_foot_likeNum
        article_comment_like.style.color = 'rgb(253, 55, 72)'
    } else if (article_like.style.color === 'rgb(253, 55, 72)') {
        cancleLike(article_like.getAttribute('articleId'), e.target)
        // article_comment_like.nextElementSibling.innerHTML = second_foot_likeNum
        article_comment_like.style.color = 'rgb(128, 124, 124)' 
    } else {
        console.log("查询错误11111")
    }
})
//喜欢评论
//给评论的爱心小图标绑定点击事件
function comment_likeIcon_click(){
let numIconBox = document.querySelectorAll('.commentbox-icon').length
for(let i = 0; i<numIconBox;i++){
document.querySelectorAll('.commentbox-icon')[i].addEventListener('click',function(e){

            if(e.target.style.color === 'rgb(128, 124, 124)'){
                // console.log(i)
                postLikeComment(e.target.getAttribute('review_id'), e.target)
            }else if(e.target.style.color === 'rgb(253, 55, 72)'){
                // console.log(i)
                cancleLikeComment(e.target.getAttribute('review_id'), e.target)
            }else{
                console.log("查询爱心图标错误11111")
            }
        })
    }
}
//给隐藏的全部评论大盒子的爱心小图标绑定点击事件
function comment_likeIcon_click2(){
    let numIconBox = document.querySelectorAll('.commentbox2-icon').length
    for(let i = 0; i<numIconBox;i++){
    document.querySelectorAll('.commentbox2-icon')[i].addEventListener('click',function(e){
    
                if(e.target.style.color === 'rgb(128, 124, 124)'){
                    postLikeComment(e.target.getAttribute('review_id'), e.target)
                }else if(e.target.style.color === 'rgb(253, 55, 72)'){
                    // console.log(i)
                    cancleLikeComment(e.target.getAttribute('review_id'), e.target)
                }else{
                    console.log("查询爱心小图标错误11111")
                }
            })
        }
    }
//点赞评论
function postLikeComment(review_id, target){
    let likeCommentparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/like/likeReview",
        data: {
            review_id: review_id
        },

        success: function (response) {
            console.log("点赞成功")
            let nextbother = target.nextElementSibling
            nextbother.setAttribute('goodNum',`${ +nextbother.getAttribute('goodNum') + 1}`)
            nextbother.innerHTML = + nextbother.getAttribute('goodNum') 
            target.style.color = 'rgb(253,55,72)'
        }
    }
    // 发起请求
    GetAndPost(likeCommentparamsObj)
}
//取消点赞评论
function cancleLikeComment(review_id, target){
    let likeCommentparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/like/cancelLikeReview",
        data: {
            review_id: review_id
        },

        success: function (response) {
            console.log("取消评论点赞成功")
            let nextbother = target.nextElementSibling
            nextbother.setAttribute('goodNum',`${ +nextbother.getAttribute('goodNum') - 1}`)
            nextbother.innerHTML = + nextbother.getAttribute('goodNum')
            target.style.color = 'rgb(128, 124, 124)'
        }
    }
    // 发起请求
    GetAndPost(likeCommentparamsObj)
}

//删除评论
function commentbox_delect_click(){
    let commentbox_delect = document.querySelectorAll(".commentbox-delect")
for(let i = 0;i<commentbox_delect.length;i++){

commentbox_delect[i].addEventListener('click',function(e){

    let delectCommentPostparamsObj = {
        method: 'delete',
        url: "http://175.178.4.54:3007/review/deleteReview",
        data: {
            reviewId: e.target.getAttribute('commentId'),
            articleId:e.target.getAttribute('articleId')
        },
        success: function (response) {
            showarticle(delectCommentPostparamsObj.data.articleId)
            article_comment2(delectCommentPostparamsObj.data.articleId)
        }
    }
    // console.log("+++++++++++++++++++++++++++++++++++++++")
    // 发起请求
    token = window.sessionStorage.getItem('token')
    let xhr = new XMLHttpRequest()
    const qs = resolveData(delectCommentPostparamsObj.data)
    const formData = new FormData()
    for (let k in delectCommentPostparamsObj.data) {
        formData.append(k, delectCommentPostparamsObj.data[k]);
    }

    if (delectCommentPostparamsObj.method.toUpperCase() === 'DELETE') {
        xhr.open(delectCommentPostparamsObj.method, delectCommentPostparamsObj.url + '?' + qs)
        xhr.setRequestHeader('Authorization', token)
        xhr.send()
    } 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                delectCommentPostparamsObj.success(result)
                console.log("删除评论成功成功~")
            }
            if (result.status === 400) {

                console.log(xhr.responseText)
                console.log("删除评论失败~")
            }
        } else {
            console.log("删除评论请求失败")
        }
    }
})
}
}

//点击左上角返回首页
artical_top_back.addEventListener('click',function(){
    article.style.display='none'
    remove_recommend()
    paramsObj.data.page = 1
    recommend_tag(paramsObj)
    homepage.style.display='block'
})
//点击收藏图标收藏文章
document.querySelector(".article-comment-collect").addEventListener('click',function(){
    if(this.style.color=='rgb(128, 124, 124)'){
        post_collect(this.getAttribute("articleId"))
    }else if(this.style.color=='rgb(245, 189, 96)'){
        cancle_collect(this.getAttribute("articleId"))
    }else{
        console.log("颜色错误")
    }
})
//收藏文章
function post_collect(articleId){
    let postCollect ={
        method: 'post',
        url: 'http://175.178.4.54:3007/star/starArticles',
        data: {
            article_id: articleId
        },
        success: function (response) {
            console.log("收藏成功")
            document.querySelector(".article-comment-collect").style.color='rgb(245, 189, 96)'
    }
        }
        
        // 发起请求
        GetAndPost(postCollect)
}
//取消收藏文章
function cancle_collect(articleId){
    let cancelCollect ={
        method: 'post',
        url: 'http://175.178.4.54:3007/star/cancelStarArticles',
        data: {
            article_id: articleId
        },
        success: function (response) {
            console.log("取消收藏成功")
            document.querySelector(".article-comment-collect").style.color='rgb(128, 124, 124)'
    }
        }
        
        // 发起请求
        GetAndPost(cancelCollect)
}
//获取收藏的文章列表
function get_collectArticle(){
    let collectPparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/star/getStarArticles',
        data: {
            id: yourId
        },
        success: function (response) {
            // console.log(response)
            starArticleList = []
            for (let i = 0; i < response.data.pages.length; i++) {
                starArticleList[i] = response.data.pages[i].id
            }
            // 记录已经喜欢的文章的数量
            star_num = starArticleList.length
            // 文章盒子底部点赞旁边的点赞数量
            // center_star_num.innerHTML = star_num
            // console.log(like_num)
            // console.log(starArticleList)
        }
    }
    GetAndPost(collectPparamsObj)
    
}


//点击评论里的头像跳到个人资料页
function comment_user_pic_click(){
let commentbox_pics = document.querySelectorAll('.commentbox-pics')
for(let i = 0;i < commentbox_pics.length; i++){
    commentbox_pics[i].addEventListener('click',function(e){
        if(e.target.getAttribute('userId')==yourId){
            article.style.display='none'
            showcenter()
            center.style.display='block'
            
        }else{
            article.style.display='none'
            showother(e.target.getAttribute('userId'))
            other.style.display='block'
        }
    })
}
}
//全部评论的大盒子里的头像绑定点击事件
function comment_user_pic_click2(){
    let commentbox2_pics = document.querySelectorAll('.commentbox2-pics')
    for(let i = 0;i < commentbox2_pics.length; i++){
        commentbox2_pics[i].addEventListener('click',function(e){
            if(e.target.getAttribute('userId')==yourId){
                article.style.display='none'
                showcenter()
                center.style.display='block'
                
            }else{
                article.style.display='none'
                showother(e.target.getAttribute('userId'))
                other.style.display='block'
            }
        })
    }
    }


// 点击关注
function postFollows(authorId) {
    console.log(authorId)
    let followPostparamsObj = {
        method: 'post',
        url: 'http://175.178.4.54:3007/follow/followUser',
        data: {
            userId: +authorId
        },
        success: function (response) {
            console.log("关注成功")
            document.querySelector(".artical-top-attent").style.display = 'none'
        }
    }
    // 发起请求
    GetAndPost(followPostparamsObj)
}
// 取消关注（有bug）
function cancleFollow(authorId) {
    let cancleFollowPostparamsObj = {
        method: 'post',
        url: "http://175.178.4.54:3007/follow/unfollow",
        data: {
            userId: +authorId
        },
        success: function (response) {
            console.log("取消成功")
            document.querySelector(".artical-top-attent").style.display = 'block'
            document.querySelector(".artical-top-attent").innerHTML = '未关注'
        }
    }
    // 发起请求
    GetAndPost(cancleFollowPostparamsObj)
}
//点击小图标删除文章
if(document.querySelector(".articleDelect-icon-box")){
    document.querySelector(".articleDelect-icon-box").addEventListener('click',function(){
        deleteArticle_click(this.getAttribute("articleId"))
    })
}
function deleteArticle_click(articleId){
    let cancleLikePostparamsObj = {
        method: 'get',
        url: "http://175.178.4.54:3007/article/delete",
        data: {
            articleId: +articleId
        },
        success: function (response) {
            article.style.display='none'
            remove_recommend()
            paramsObj.data.page = 1
            recommend_tag(paramsObj)
            homepage.style.display='block'
            console.log('删除文章成功')
        }
    }
    // 发起请求
    GetAndPost(cancleLikePostparamsObj)
}
//二级回复
let key=0
let commentId_key = 0
function commentbox_Second(){
    let comment_first=document.querySelectorAll(".commentbox-main")
    for(let i =0;i<comment_first.length;i++){
        comment_first[i].onclick=function(e){
            console.log("++++++++++++++++++++++++++++++++")
            key=2
            document.querySelector(".artical-main").style.display = 'none'
            document.querySelector(".artical-comment").style.display = 'none'
            document.querySelector(".article-comment-main").style.display = 'none'
            article_tag_mask.style.display = 'block'
            article_foot_data_bigbox.style.display = 'block'
            post_btn.setAttribute('articleId',this.getAttribute('articleId'))
            article_comment2(this.getAttribute('articleId'),this.getAttribute('authorId'))

            let articleId = this.getAttribute('articleId')
            commentId_key = this.getAttribute('commentId')
            console.log(commentId_key)
            let input_box=document.querySelector(".article-input2")
            input_box.placeholder="二级回复"
            mask_click(this)
            
        }
    }

}
