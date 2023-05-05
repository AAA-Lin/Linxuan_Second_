let msg_foot_page = document.querySelector('.msg-foot-page')
let msg_foot_center = document.querySelector('.msg-foot-center')
let msg_foot_shop = document.querySelector('.msg-foot-shop')
let msg_foot_publish = document.querySelector('.msg-foot-publish')
let msg_foot_msg = document.querySelector('.msg-foot-msg')
let message_Top_Back = document.querySelector('.message-top-back')
// 点击底部首页按钮从我的消息页面进入首页

// 从消息跳到首页
msg_foot_page.addEventListener('click', function () {
    message.style.display = 'none'
    center.style.display = 'none'
    homepage.style.display = 'block'

    home_foot_page.classList.add('active')
})
// 从消息跳到个人中心
msg_foot_center.addEventListener('click', function () {
    homepage.style.display = 'none'
    message.style.display = 'none'
    center.style.display = 'block'
    showcenter()

})
// 从消息跳到周边
msg_foot_shop.addEventListener('click', function () {
    homepage.style.display = 'none'
    message.style.display = 'none'
    shop.style.display = 'block'
})
// 从个人中心跳到发布页
msg_foot_publish.addEventListener('click', function () {
    homepage.style.display = 'none'
    center.style.display = 'none'
    message.style.display = 'none'
    publish.style.display = 'block'

})

// 点击返回键 返回到主页
message_Top_Back.addEventListener('click', function () {
    message.style.display = 'none'
    homepage.style.display = 'block'
    // document.querySelector('.msg .active').classList.remove('active')
    home_foot_page.classList.add('active')
})


// 获取聊天列表（写一半）
let messageparamsObj = {
    method: 'get',
    url: 'http://175.178.4.54:3007/chat/getMsg',
    data: {
        // targetId : authorId,
        page: 1,
        size: 10
    },
    // res_data: {},
    success: function (response) {
        let res_data = {}
        let recommend_box1 = document.querySelectorAll('.recommend-box1')
        let box1 = recommend_box1.length
        console.log(box1);
        let boxnum1 = response.data.articleList.length
        res_data = response.data.articleList
        console.log(response.data);
        for (let i = box1, j = 0; j < boxnum1; i++, j ++) {
            let cnode = document.createElement("div");
            cnode.setAttribute("class", "recommend-box1");
            cnode.innerHTML = `
                    <div class="recommend-box-pic" data-id="${
                res_data[j].authorId
            }">
                        <img src="${
                res_data[j].avatar
            }" alt="" class="recommend-box-pics" num="${i}" articleId="${
                res_data[j].articleId
            }">
                    </div>
                    <div class="recommend-box-title">${
                res_data[j].title
            }</div>
                    <div class="recommend-box-foot">
                        <div class="recommend-foot-pic">
                            <img src="${
                res_data[j].avatar
            }" alt="" class="recommend-foot-pics" articleId="${
                res_data[j].articleId
            }" usernameId="${
                res_data[j].username
            }">
                        </div>
                        <div class="recommend-foot-author">${
                res_data[j].username
            }</div>
                        <div class="recommend-foot-icon" style="color:black"> </div>
                        <div class="recommend-foot-like">${
                res_data[j].fanNum
            }</div>
                    </div>
                `
            home_main1_recommend.appendChild(cnode);
            // 重新获取
            recommend_box1 = document.querySelectorAll('.recommend-box1')
            recommend_box_pic = document.querySelectorAll('.recommend-box-pic img')
            recommend_box_title = document.querySelectorAll('.recommend-box-title')
            recommend_foot_pic = document.querySelectorAll('.recommend-foot-pics')
            recommend_foot_author = document.querySelectorAll('.recommend-foot-author')
            recommend_foot_icon = document.querySelectorAll('.recommend-foot-icon')
            recommend_foot_like = document.querySelectorAll('.recommend-foot-like')
            // 判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
            // 添加自定义属性为了点击喜欢和取消喜欢
            for (let k = 0; k <= like_num; k++) {
                if (likeArticleList[k] === res_data[j].articleId) {
                    recommend_foot_icon[i].style.color = 'red'
                }
            }
        }
    }
}
msg_foot_msg.addEventListener('click', message_tag.bind(this, messageparamsObj))
function message_tag(messageparamsObj) {
    yourId = window.sessionStorage.getItem('id')
    // getLikeArticle(yourId)
    // getfollows(yourId)
    // getstar(yourId)
    // 发起请求
    console.log("请求");
    console.log(messageparamsObj.data.type);
    messageData(messageparamsObj)
    function messageData(message) {
        console.log('111')
        let xhr = new XMLHttpRequest()
        const qs = resolveData(message.data)
        const formData = new FormData();
        for (let k in message.data) {
            formData.append(k, message.data[k]);
        }

        if (message.method.toUpperCase() === 'GET') {
            xhr.open(message.method, message.url + '?' + qs)
            xhr.send()
        } else if (message.method.toUpperCase() === 'POST') {
            xhr.open(message.method, message.url)
            xhr.send(formData)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText)
                if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                    message.success(result)
                    console.log("获取聊天列表成功~")
                }
                if (result.status === 400) {
                    console.log(xhr.responseText)
                    console.log("获取聊天列表失败")
                }
            }
        }
    };
}



//给上部分的图标绑定点击事件
document.querySelector(".message-main-collect").addEventListener('click',function(){
    message.style.display='none'
    document.querySelector(".collect").style.display='block'
    document.querySelector(".collect .active").classList.remove("active")
    document.querySelector(".collect-class-like").classList.add("active")
    get_like_collect(yourId)
})

document.querySelector(".message-main-fans").addEventListener('click',function(){
    message.style.display='none'
    document.querySelector(".collect").style.display='block'
    
})

document.querySelector(".message-main-comment").addEventListener('click',function(){
    message.style.display='none'
    document.querySelector(".comment").style.display='block'
    get_comment_collect(yourId)
    // let comment_box = document.querySelectorAll(".comment .comment-box1")
    //                 for(let i = 0;i<comment_box.length;i++){
    //                     comment_box[i].addEventListener('click',function(e){
    //                         e.stopPropagation()
    //                         comment_box[i].setAttribute("articleId","78")
    //                         document.querySelector(".comment").style.display='none'
    //                         article.style.display='block'
    //                         console.log(this.getAttribute("articleId"))
    //                         showarticle(this.getAttribute("articleId"))
    //                     })
    //                 }
    //                 let comment_imgbox = document.querySelectorAll(".comment .comment-box1-imgs")
    //                 for(let i = 0;i<comment_imgbox.length;i++){
    //                     comment_imgbox[i].addEventListener('click',function(e){
    //                         comment_imgbox[i].setAttribute("authorId","6")
    //                         e.stopPropagation()
    //                         document.querySelector(".comment").style.display='none'
    //                         other.style.display='block'
    //                         showother(this.getAttribute("authorId"))
    //                     })
    //                 }
})

//收到的赞与收藏页面
document.querySelector(".collect-class-like").addEventListener('click',function(){
    document.querySelector(".collect .active").classList.remove("active")
    document.querySelector(".collect-class-like").classList.add("active")
    get_like_collect(yourId)
})
function get_like_collect(yourId){
    let like_collect_paramsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/like/getReceiveLike',
        data: {
            id: yourId
        },
        success: function (response) {
            console.log(response)
            let string_message =''
            for(let i =0;i<response.data.pages.length;i++){
                string_message+=`          
                <div class="box1">
                <div class="box1-left">
                    <div class="box1-img"><img src="${response.data.pages[i].avatar}" alt="" class="box1-imgs"></div>
                    <div class="box1-word">
                        <div class="box1-name">${response.data.pages[i].username}</div>
                        `
                    if(response.data.pages[i].isReview===true){
                        string_message+=`<div class="box1-text">赞了你的评论 : ${response.data.pages[i].content}</div>
                        </div>
                        </div>
                        </div>`
                    }else if(response.data.pages[i].isReview===false){
                        string_message+=`<div class="box1-text">赞了你的文章 : ${response.data.pages[i].content}</div>
                        </div>
                        </div>
                        <div class="box1-right">
                    <div class="box1-pic">
                        <img src="${response.data.pages[i].img}" alt="" class="box1-pics">
                    </div>
                </div>
                </div>`
                    }
            }
            document.querySelector(".collect-main-like").innerHTML= string_message

        }
    }
    // 发起请求
    GetAndPost(like_collect_paramsObj)

}
//给收藏绑定点击事件
document.querySelector(".collect-class-collect").addEventListener('click',function(){
    document.querySelector(".collect .active").classList.remove("active")
    document.querySelector(".collect-class-collect").classList.add("active")
    document.querySelector(".collect-main-like").innerHTML=''
})
//绑定点击返回
document.querySelector(".collect-top-back").addEventListener('click',function(){
    document.querySelector(".collect").style.display='none'
    message.style.display='block'
})
//收到的评论页面

function get_comment_collect(yourId){
    let like_collect_paramsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/review/getReviewsReply',
        data: {
            page:1,
            size:10
        },
        success: function (response) {
            console.log(response)
            let string_message =''
            for(let i =0;i<response.list.length;i++){
                string_message+=`          
                <div class="comment-box1" articleId="${response.list[i].articleId}">
                <div class="comment-box1-left">
                    <div class="comment-box1-img"><img src="${response.list[i].userInfo.avatar}" alt="" class="comment-box1-imgs" authorId="${response.list[i].authorId}"></div>
                    <div class="comment-box1-word" articleId="${response.list[i].articleId}">
                        <div class="comment-box1-name">${response.list[i].userInfo.userName}</div>
                        <div class="comment-box1-text">回复了你的评论: ${response.list[i].content}</div>
                    </div>
                </div>
                <div class="comment-box1-right" articleId="${response.list[i].articleId}">
                    <div class="comment-box1-pic"><img src="" alt="" class="comment-box1-pics"></div>

                </div>
            </div>`
                    }
                    document.querySelector(".comment .comment-main").innerHTML= string_message

                    let comment_box = document.querySelectorAll(".comment .comment-box1")
                    for(let i = 0;i<comment_box.length;i++){
                        comment_box[i].addEventListener('click',function(e){
                            e.stopPropagation()
                            document.querySelector(".comment").style.display='none'
                            article.style.display='block'
                            showarticle(this.getAttribute("articleId"))
                        })
                    }
                    let comment_imgbox = document.querySelectorAll(".comment .comment-box1-imgs")
                    for(let i = 0;i<comment_imgbox.length;i++){
                        comment_imgbox[i].addEventListener('click',function(e){
                            e.stopPropagation()
                            document.querySelector(".comment").style.display='none'
                            other.style.display='block'
                            showother(this.getAttribute("authorId"))
                        })
                    }

            }
        }
    
    // 发起请求
    GetAndPost(like_collect_paramsObj)

}
//绑定点击返回
document.querySelector(".comment-top-back").addEventListener('click',function(){
    document.querySelector(".comment").style.display='none'
    message.style.display='block'
})


