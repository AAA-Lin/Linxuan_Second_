
// 右上角点击发送信息
let other_data_btn = document.querySelector('.other-data-btn')
// 返回的按钮
let other_top_icon1 = document.querySelector('.other-top-icon1')
// 下面的三个大盒子
let lis_otherClass = document.getElementsByClassName('otherbox')
// let other_main1_recommend = document.querySelector('.other-main1-recommend')
let other_box1 = document.querySelector('.other-box1')
let other_box_pic = document.getElementsByClassName('other-box-pics')
let other_box_title = document.getElementsByClassName('other-box-title')
let other_foot_pic = document.getElementsByClassName('other-foot-pics')
let other_foot_author = document.getElementsByClassName('other-foot-author')
let other_foot_icon = document.getElementsByClassName('other-foot-icon')
let other_foot_like = document.getElementsByClassName('other-foot-like')
// 从他人主页返回
other_top_icon1.addEventListener('click', function () {
    other.style.display = 'none'
    remove_other()
    homepage.style.display = 'block'
})

//给小盒子绑定点击事件使添加样式
document.querySelector('.other-text-box3').addEventListener('click',function(e){
    document.querySelector('.otherbox-change').classList.remove('otherbox-change')
    e.target.classList.add('otherbox-change')
})

//点击渲染不同的内容
function click_other_box(){
    document.querySelector(".other-box3-notes").onclick = function(e){
        remove_other()
        other_publish(e.target.getAttribute("othersId"))
    }
    document.querySelector(".other-box3-collect").onclick = function(e){
        remove_other()
        other_collectArticleGet(e.target.getAttribute("othersId"))
    }
    document.querySelector(".other-box3-like").onclick = function(e){
        remove_other()
        other_likeArticleGet(e.target.getAttribute("othersId"))
    }
}
// Ta收藏过的文章
function other_collectArticleGet(yourId) {
    getLikeArticle(likPparamsObj)
    let otherPulishparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/star/getStarArticles',
        data: {
            id: yourId
        },
        success: function (response) {
            remove_other()
            let pages = response.data.pages.sort(function(a, b) {
                a.time - b.time;
            })
            for (let i = 0; i < response.data.pages.length; i++) {
                string_center_collect_comment2=''
                getCollectArticle_comment2(pages[i].id)
                console.log(string_center_collect_comment2)
            // getCollectArticle_comment(response.data.pages[i].id)
                getCollectArticle_detial2(pages[i].id)
            }
            document.querySelector(".other-box1").innerHTML = `${
                response.data.pages.length
            } 篇文章`
        }
    }
    GetAndPost(otherPulishparamsObj)

}
let string_center_collect_comment2=''
//获取文章细节
function getCollectArticle_detial2(articleId){
    string_center_collect_comment2=''
    getCollectArticle_comment2(articleId)
    let getCollectArticle_detial ={
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getDetails',
        data: {
            articleId: +articleId
        },
        success: function (response) {
            let strings=''
                let cnode = document.createElement("div")
                cnode.setAttribute("class", "other-main-bigbox1")
                let res_data = response.data
                for (let k = 0; k < res_data.label.length; k++) {
                    strings += `
                <div class="other-foot-tag">#${
                        res_data.label[k]
                    }</div>
            `
                }
                console.log(string_center_collect_comment2)
            cnode.innerHTML = `
            <div class="otherArticlesbox" articleId="${articleId}">
            <div class="other-box-time">
                <div class="time1">${
                    res_data.time.slice(5, 7)
                }</div>
                <div>/</div>
                <div class="time2">${
                    res_data.time.slice(8, 10)
                }</div>
            </div>
            <div class="other-box-title">${
                    res_data.title
                }</div>
            <div class="other-box-content">${
                    res_data.content
                }</div>
            <div class="other-tagAndview">
            <div class="other-taglittlebox">` + `${strings}` + `   
            </div>    
            <div class="other-foot-view">${
                    res_data.reviewNum
                }人阅读</div>
            </div>
            <div class="other-iconBox">
                <div class="other-foot-iconshare1"></div>
                <div class="other-foot-iconlike1" style="color:rgb(128, 124, 124);" articleId="${articleId}"></div>
                <div class="other-foot-iconlikenum" fanNum="${res_data.fanNum}">${
                    res_data.fanNum
                }</div>

                <div class="other-foot-iconcomment2"></div>
                <div class="other-foot-iconcommentnum">${
                    res_data.reviewNum
                }</div>
            </div>
            <div class="other-main-commentsbox">
                <div class="word">` + `${string_center_collect_comment2}`

                document.querySelector('.other-main1-recommend').appendChild(cnode)
                click_other_article()
            }
            
        }
    
        // 发起请求
        GetAndPost(getCollectArticle_detial)
}
//获取收藏的文章的评论(bug)
function getCollectArticle_comment2(articleId){
    
    let otherFansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/review/getReviewsByArt',
        data: {
            articleId: +articleId,
            page: 1,
            size: 10
        },
        success: function (response) {
            string_center_collect_comment2=''
                if (response.list.length>0){ 
                    // for(let k = 0; k < response.list.pages[i].firstReview.length; k++){
                        string_center_collect_comment2 += `
                <div class="username">${
                        response.list[0].userInfo.userName
                    }: </div>
                <div class="content"> ${
                        response.list[0].content
                    }</div>
                    </div>
            `
                    if (response.list.length > 1) {
                        string_center_collect_comment2 += `
                <div class="more">查看更多评论</div>
            </div>
            </div>
`
                    } else {
                        string_center_collect_comment2 += `</div>
                        </div>
                `
                    }
                    // }
                } else if(response.list.length==0){
                    string_center_collect_comment2 += `</div>
            <div class="more">暂无评论</div>
        </div>
        
`
                }
                console.log(string_center_collect_comment2)
        }
    }
    // 发起请求
    token = window.sessionStorage.getItem('token')
    let xhr = new XMLHttpRequest()
    const qs = resolveData(otherFansparamsObj.data)
    const formData = new FormData()
    for (let k in otherFansparamsObj.data) {
        formData.append(k, otherFansparamsObj.data[k]);
    }

    if (otherFansparamsObj.method.toUpperCase() === 'GET') {
        xhr.open(otherFansparamsObj.method, otherFansparamsObj.url + '?' + qs)
        xhr.setRequestHeader('Authorization', token)
        xhr.send()
    } else if (otherFansparamsObj.method.toUpperCase() === 'POST') {
        xhr.open(otherFansparamsObj.method, otherFansparamsObj.url)
        xhr.setRequestHeader('Authorization', token)
        xhr.send(formData)
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                otherFansparamsObj.success(result)
                console.log("查询成功~")
            }
            if (result.status === 400) {

                console.log(xhr.responseText)
                console.log("查询失败~")
    //             string_center_collect_comment=`</div>
    //             <div class="more">暂无评论</div>
    //         </div>
    // </div>`
            }
        } else {
            console.log("请求失败")
        }
    }
}

// Ta喜欢过的文章
function other_likeArticleGet(yourId) {
    getLikeArticle(likPparamsObj)
    let center_likeArticleGet = {
        method: 'get',
        url: 'http://175.178.4.54:3007/like/getLikeArticles',
        data: {
            id: yourId
        },
        success: function (response) {
            remove_other()
            for (let i = 0; i < response.data.pages.length; i++) {
                // console.log(response)
            // getCollectArticle_comment(response.data.pages[i].id)
            getCollectArticle_detial2(response.data.pages[i].id)
            }
            document.querySelector(".other-box1").innerHTML = `${
                response.data.pages.length
            } 篇文章`
        }
    }
    GetAndPost(center_likeArticleGet)
}
//给文章盒子绑定点击事件（点击跳转到文章详情页）
function click_other_article(){
    let boxAll = document.querySelectorAll(".otherArticlesbox")
    for(let i = 0;i < boxAll.length; i++){
        boxAll[i].addEventListener('click',function(){
        other.style.display='none'
        showarticle(this.getAttribute("articleId"))
        article.style.display='block'
    })
    //绑定点赞跟取消事件（有bug)
    let iconBox = document.querySelectorAll(".other-foot-iconlike1")
    for(let j = 0;j < boxAll.length; j++){
        iconBox[j].addEventListener('click',function(e){
            e.stopPropagation()
            if (e.target.style.color === 'rgb(128, 124, 124)') {
                postLike(e.target.getAttribute('articleId'), e.target)
            } else if (e.target.style.color === 'rgb(253, 55, 72)') {
                cancleLike(e.target.getAttribute('articleId'), e.target)
            } else {
                console.log("查询错误11111")
            }
    })
}
}
}
//点击聊天按钮弹出聊天页面
document.querySelector(".other .chatbox").addEventListener('click',function(e){
    e.stopPropagation()
    let otherId_now = this.getAttribute("otherId")
    other.style.display='none'
    console.log("---------------------------------------------------")
    console.log(otherId_now)
    //获取聊天记录
    get_chat_history(this.getAttribute("otherId"))
    document.querySelector(".chat").style.display='block'
    //点击发送聊天信息
    document.querySelector(".input_sub").onclick=function(e){
        e.stopPropagation()
        console.log(otherId_now)
        if(document.querySelector(".chat-input").value==''){
            alert('发送信息不能为空')
        }else{
        console.log("++++++++++++++++++++++++++++++++++")
            let postChatPparamsObj = {
                method: 'post',
                url: 'http://175.178.4.54:3007/chat/submitMsg',
                data: {
                    content: document.querySelector(".chat-input").value,
                    targetId: +otherId_now
                },
                success: function (response) {
                    console.log("发送信息成功")
                    document.querySelector(".chat-input").value = ''
                    get_chat_history(otherId_now)
                }
            }
            GetAndPost(postChatPparamsObj)
        }
        
    }
    // let time = window.setInterval(console.log("定时器"),500)
    //点击返回他人主页
    document.querySelector(".chat .chat-top-back").addEventListener('click',function(){
        // clearInterval(time)
        document.querySelector(".chat").style.display='none'
        other.style.display='block'
        
    })
})
//获取聊天记录
function get_chat_history(otherId){
    // console.log(("定时器开启"))
    let get_chat_history = {
        method: 'get',
        url: 'http://175.178.4.54:3007/chat/getMsg',
        data: {
            targetId: +yourId,
            page:1,
            size:20
        },
        success: function (response) {
            let char_string_left=''
            let char_string_right=''

            for (let i = 0; i < response.data.list.length; i++) {
                if(response.data.list[i].sendId==yourId &&response.data.list[i].receiverId==otherId)
                char_string_right+=`
            <li class="right_word">
                <img src="${response.data.targetInfo.avatar}" class="my"/>
                <span>${response.data.list[i].content}</span>
            </li>
                `
                if(response.data.list[i].sendId==otherId &&response.data.list[i].receiverId==yourId){
                    char_string_left+=`<li class="left_word">
                    <img src="" class="heOrshe" othersId="otherId"/ >
                    <span class="span">
                    ${response.data.list[i].content}</span>
                </li>`
                }
            document.querySelector('.talk_list').innerHTML=char_string_left+char_string_right
            let heOrshe= document.querySelectorAll(".heOrshe")
            for(let h=0;h<heOrshe.length;h++){
                heOrshe[h].addEventListener('click',function(e){
                    document.querySelector('.chat').style.display='none'
                    showother(e.target.getAttribute("othersId"))
                    other.style.display='block'
                })
                
            }
            let my= document.querySelectorAll(".my")
            for(let h=0;h<my.length;h++){
                my[h].addEventListener('click',function(e){
                    document.querySelector('.chat').style.display='none'
                    showcenter()
                    center.style.display='block'
                })
                
            }
            
            //获取聊天对象的头像
                let get_other_avatar={
                    method: 'get',
                    url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
                    data: {
                        id: +otherId
                    },
                    success: function (response) {
                        let box_avatar = document.querySelectorAll(".left_word img")
                        for(let k = 0; k < box_avatar.length; k++){
                            box_avatar[k].src=`${response.data.avatar}`
                        }
                    }
                }
                GetAndPost(get_other_avatar)
//获取聊天对象的名字
                let get_other_name={
                    method: 'get',
                    url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
                    data: {
                        id: +otherId
                    },
                    success: function (response) {
                        document.querySelector('.chat-top-nickname').innerHTML=response.data.username
                    }
                }
                GetAndPost(get_other_name)
            }
        }
    }
    GetAndPost(get_chat_history)
}
//点击删除按钮清空聊天记录
document.querySelector(".chat .chat-top-icon2").addEventListener('click',function(){
    document.querySelector('.talk_list').innerHTML=''
})


//点击跳转到关注列表
document.querySelector('.other-box2-attent').addEventListener('click',function(){
    other.style.display='none'
    center.style.display='none'
    document.querySelector('.newfollow').style.display='block'
    //获取关注列表并渲染到页面
    get_FollowerList2(document.querySelector('.other-box2-attent').getAttribute("othersId"))
    
})
//点击跳转到粉丝列表
document.querySelector('.other-box2-fans').addEventListener('click',function(){
    other.style.display='none'
    center.style.display='none'
    document.querySelector('.newfans').style.display='block'
   //获取粉丝列表并渲染到页面
    get_FansList2(document.querySelector('.other-box2-fans').getAttribute("othersId"))
})
//获取关注列表并渲染到页面
function get_FollowerList2(otherId){
    followsLists = []
    console.log(otherId)
    let string_follower=''
    let FollowerparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/followList',
        data: {
            userId: +otherId
        },
        success: function (response) {
            console.log(response.data.length)
            // console.log(response)
            for(let i=0;i<response.data.length;i++){
                string_follower+=`    
                <div class="newfollow-box1">
                <div class="newfollow-pic"><img src="${response.data[i].avatar}" alt="" class="newfollow-pics"></div>
                <div class="newfollow-name">${response.data[i].username}</div>
                <div class="newfollow-foci">已关注</div>
            </div>
        `
        for(let v=0;v<followsLists.length;v++){
            if(response.data[i].username ==followsLists[v]){
                string_follower+=`
                <div class="newfollow-foci">已关注</div>
            </div>`
            break
            }else if(v==followsLists.length-1){
                string_follower+=`
                <div class="newfollow-foci">未关注</div>
            </div>`
            }
            }
            }
            document.querySelector('.newfollows-main-user').innerHTML = string_follower
                     //关注列表页面点击返回中心页
                    document.querySelector('.newfollow-top-back').addEventListener('click',click_top_back2.bind(this,2))
                    
        }
    }
    // 发起请求
    GetAndPost(FollowerparamsObj)
}
//获取粉丝列表并渲染到页面
function get_FansList2(otherId){
    get_FansList(yourId)
    get_FollowerList(yourId)
    let string_fans=''
    let FansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/fansList',
        data: {
            userId: +otherId
        },
        success: function (response) {
            // console.log(response)
            console.log(response.data.length)
            for(let i=0;i<response.data.length;i++){
            string_fans+=`    
                <div class="newfans-box1">
                    <div class="newfans-pic"><img src="${response.data[i].avatar}" alt="" class="newfans-pics"></div>
                    <div class="newfans-name">${response.data[i].username}</div>
        `
        for(let v=0;v<followsLists.length;v++){
            if(response.data[i].username ==followsLists[v]){
                string_fans+=`
                <div class="newfans-foci">已关注</div>
            </div>`
            break
            }else if(v==followsLists.length-1){
                string_fans+=`
                <div class="newfans-foci">未关注</div>
            </div>`
        }
    }
            }
            document.querySelector('.newfanss-main-user').innerHTML = string_fans
            //粉丝列表页面点击返回中心页
            document.querySelector('.newfans-top-back').addEventListener('click',click_top_back2.bind(this,2))
        }
    }
    // 发起请求
    GetAndPost(FansparamsObj)
}
//做个互相关注的数组
let follow_together_arr=[]
function follow_together(){
    follow_together_arr=[]
    get_FollowerList(yourId)
    get_FansList(yourId)
    for(let v=0;v<followsLists.length;v++){
        for(let k=0;k<fansLists.length;k++){
            if(followsLists[v]==fansLists[k]){
                follow_together_arr=followsLists[v]
                document.querySelector(follow_together_arr)
                break
            }
        }
    }
}
