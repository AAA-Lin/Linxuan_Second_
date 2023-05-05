yourId = window.sessionStorage.getItem('yourId')
let center_box1_imgs = document.querySelector('.center-box1-imgs')
let center_box1_name = document.querySelector('.center-box1-name')
let center_bgc = document.querySelector('.center-text .bgc')
let center_box1_id1 = document.querySelector('.center-box1-id1')
let center_box1_id2 = document.querySelector('.center-box1-id2')
let center_foot_page = document.querySelector('.center-foot-page')
let center_foot_msg = document.querySelector('.center-foot-msg')
let center_foot_shop = document.querySelector('.center-foot-shop')
let center_foot_publish = document.querySelector('.center-foot-publish')
let center_attent_num = document.querySelector('.center-attent-num')
let center_fans_num = document.querySelector('.center-fans-num')
let center_like_num = document.querySelector('.center-like-num')
let center_top_icon2 = document.querySelector('.center-top-icon2')
let center_foot_data_bigbox = document.querySelector('.center-foot-data-bigbox')
let center_tag_mask = document.querySelector('.center-tag-mask')
let center_data_btn = document.querySelector('.center-data-btn')
let center_box_land = document.querySelector('.center-box-land')
let cancelbox1 = document.querySelector('.cancelbox1')
// 下面的三个大盒子
let lis_centerClass = document.getElementsByClassName('centerbox')
let centercontent_mainbox = document.querySelector('.centercontent-mainbox')
let centercontent_main1_recommend = document.querySelector('.centercontent-main1-recommend')
let center_box1 = document.querySelector('.center-box1')
let center_box_pic = document.getElementsByClassName('center-box-pics')
let center_box_title = document.getElementsByClassName('center-box-title')
let center_foot_pic = document.getElementsByClassName('center-foot-pics')
let center_foot_author = document.getElementsByClassName('center-foot-author')
let center_foot_icon = document.getElementsByClassName('center-foot-icon')
let center_foot_like = document.getElementsByClassName('center-foot-like')

// 获取编辑个人资料页面
let data = document.querySelector(".data")
let data_pics = document.querySelector(".data-pics")
let edit_data_all = document.querySelectorAll(".edit-data-all")
let data_backgroun_pics = document.querySelector(".data-backgroun-pics")
let savaData = document.querySelector(".savaData")
// 记录总点赞数
let centerlikesum = 0
// let data = document.querySelector(".data")
// let data = document.querySelector(".data")
// let data = document.querySelector(".data")
// let data = document.querySelector(".data")
// let data = document.querySelector(".data")

// 从个人中心跳到首页
center_foot_page.addEventListener('click', function () {
    message.style.display = 'none';
    center.style.display = 'none';
    homepage.style.display = 'block';

})
// 从个人中心跳到消息页
center_foot_msg.addEventListener('click', function () {
    homepage.style.display = 'none';
    center.style.display = 'none';
    message.style.display = 'block';

})
// 从个人中心跳到周边
center_foot_shop.addEventListener('click', function () {
    homepage.style.display = 'none';
    center.style.display = 'none';
    shop.style.display = 'block';
})
// 从个人中心跳到发布页
center_foot_publish.addEventListener('click', function () {
    homepage.style.display = 'none';
    center.style.display = 'none';
    publish.style.display = 'block';
})

// 这个函数是用于中间核心的盒子中删除所有小卡片
function remove_center() {
    centercontent_main1_recommend = document.querySelector(".centercontent-main1-recommend")
    let centerArticle_main_bigbox1 = document.querySelectorAll('.centercontent-mainbox')
    // console.log(centerArticle_main_bigbox1);
    for (let i=0; i<centerArticle_main_bigbox1.length; i++) {
        centercontent_main1_recommend.removeChild(centerArticle_main_bigbox1[i])
        // console.log("yoyo");
    }

}
// 获取个人信息页面数据
function showcenter() {
    document.querySelector('.center .centerbox-change').classList.remove('centerbox-change')
    document.querySelector('.center .center-box3-notes').classList.add('centerbox-change')
    let centerPparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
        data: {
            id: yourId
        },
        success: function (response) {
            window.sessionStorage.setItem('userSelfName',response.data.username)
            userSelfName = window.sessionStorage.getItem('userSelfName')
            center_box1_imgs.src = response.data.avatar
            center_box1_name.innerHTML = response.data.username
            // console.log(`url(${
            //     response.data.background_img
            // })`)
            center_bgc.style.backgroundImage = `url(${
                response.data.background_img
            })`
            center_box1_id2.innerHTML = `简介：${
                response.data.intro
            }`
            center_box1_id1.innerHTML = `id：${yourId}`
            // console.log(response.data.avatar)
            // 这个是聊天的里面的nickname
            // chat_top_nickname.innerHTML = response.data.username
            // document.querySelector('.other-like-num').innerHTML = response.data.likedArticles.length + response.data.user.staredArticles.length
            center_fans(yourId)
            center_follow(yourId)
            remove_center()
            center_publish(yourId)

        }
    }
    // 发起请求
    GetAndPost(centerPparamsObj)
}
// Ta的关注人数
function center_follow(yourId) {
    let otherFollowparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/followList',
        data: {
            userId: yourId
        },
        success: function (response) {
            if (response === null) {
                document.querySelector('.center-attent-num').innerHTML = 0
            }
            document.querySelector('.center-attent-num').innerHTML = response.data.length
            // document.querySelector('.other-fans-num').innerHTML = response.data.fans.length
            // document.querySelector('.other-like-num').innerHTML = response.data.likedArticles.length + response.data.user.staredArticles.length
        }
    }
    // 发起请求
    GetAndPost(otherFollowparamsObj)
}
// Ta的粉丝人数
function center_fans(yourId) {
    let fansFansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/fansList',
        data: {
            userId: yourId
        },
        success: function (response) {
            if (response === null) {
                document.querySelector('center-fans-num').innerHTML = 0
            }
            // document.querySelector('.other-attent-num').innerHTML = response.data.length
            document.querySelector('.center-fans-num').innerHTML = response.data.length
            // document.querySelector('.other-like-num').innerHTML = response.data.likedArticles.length + response.data.user.staredArticles.length
        }
    }
    GetAndPost(fansFansparamsObj)
}
// Ta发布过的文章
function center_publish(yourId) {
    // centerlikesum = 0
    getLikeArticle(likPparamsObj)
    let otherPulishparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getUserArticle',
        data: {
            authorId: yourId,
            page: 1,
            size: 10
        },
        success: function (response) {
            centerlikesum=0
            document.querySelector(".centercontent-box1").innerHTML = `${
                response.data.articleList.length
            } 篇文章`
            let res_data = {}
            // let recommend_box1 = document.querySelectorAll('.recommend-box1')
            // let box1 = recommend_box1.length
            let boxnum1 = response.data.articleList.length
            res_data = response.data
            // console.log(response.data);
            let strings = ''
            for (let i = 0; i < res_data.articleList.length; i++) {
                centerlikesum += res_data.articleList[i].fanNum
                let stringsTwo = ''
                // console.log(res_data.articleList[i].label);
                let cnode = document.createElement("div");
                cnode.setAttribute("class", "centercontent-mainbox");
                for (let k = 0; k < res_data.articleList[i].label.length; k++) {
                    strings += `
                <div class="centercontent-foot-tag">#${
                        res_data.articleList[i].label[k]
                    }</div>
            `
                }
                if (res_data.articleList[i].firstReview.authorName) { 
                    // for(let k = 0; k < res_data.articleList[i].firstReview.length; k++){
                    stringsTwo += `
                <div class="username">${
                        res_data.articleList[i].firstReview.authorName
                    }: </div>
                <div class="content"> ${
                        res_data.articleList[i].firstReview.content
                    }</div>
                </div>
            `
                    if (res_data.articleList[i].reviewNum > 1) {
                        stringsTwo += `
                <div class="more">查看更多评论</div>
            </div>
    </div>`
                    } else {
                        stringsTwo += `</div>
                </div>`
                    }
                    // }
                } else {
                    stringsTwo += `</div>
            <div class="more">暂无评论</div>
        </div>
</div>`
                } cnode.innerHTML = `
                <div class="centerArticle-main-bigbox1" articleId="${res_data.articleList[i].articleId}">
            <div class="centercontentArticlesbox">
            <div class="centercontent-box-time">
                <div class="time1">${
                    res_data.articleList[i].time.slice(5, 7)
                }</div>
                <div>/</div>
                <div class="time2">${
                    res_data.articleList[i].time.slice(8, 10)
                }</div>
            </div>
            <div class=" centercontent-box-title">${
                    res_data.articleList[i].title
                }</div>
            <div class=" centercontent-box-content">${
                    res_data.articleList[i].content
                }</div>
            <div class=" centercontent-tagAndview">
            <div class="cent-taglittlebox">` + `${strings}` + `   
            </div>    
            <div class="centercontent-foot-view">${
                    res_data.articleList[i].reviewNum
                }人阅读</div>
            </div>
            <div class="centercontent-iconBox">
                <div class="centercontent-foot-iconshare1"></div>
                <div class="centercontent-foot-iconlike1"  style="color:rgb(128, 124, 124);" articleId="${res_data.articleList[i].articleId}"></div>
                <div class="centercontent-foot-iconlikenum" fanNum="${res_data.articleList[i].fanNum}">${
                    res_data.articleList[i].fanNum
                }</div>

                <div class="centercontent-foot-iconcomment2"></div>
                <div class="centercontent-foot-iconcommentnum">${
                    res_data.articleList[i].reviewNum
                }</div>
            </div>
            <div class="centercontent-main-commentsbox">
                <div class="word">` + `${stringsTwo}`
                centercontent_main1_recommend.appendChild(cnode)
            }
            document.querySelector('.center-like-num').innerHTML = centerlikesum
            click_center_article()
        }
    }
    centerPublish(otherPulishparamsObj)
    // getstar(yourId)
    function centerPublish(otherPulishparamsObj) {
        // getLikeArticle(yourId)
        // getstar(yourId)
        // 发起请求
        // console.log("请求");
        otherPublishGet(otherPulishparamsObj)
        function otherPublishGet(otherPulishparamsObj) {
            // console.log('111')
            let xhr = new XMLHttpRequest()
            const qs = resolveData(otherPulishparamsObj.data)
            const formData = new FormData();
            for (let k in otherPulishparamsObj.data) {
                formData.append(k, otherPulishparamsObj.data[k]);
            }

            if (otherPulishparamsObj.method.toUpperCase() === 'GET') {
                xhr.open(otherPulishparamsObj.method, otherPulishparamsObj.url + '?' + qs)
                xhr.setRequestHeader('Authorization', token)
                xhr.send()
            } else if (otherPulishparamsObj.method.toUpperCase() === 'POST') {
                xhr.open(otherPulishparamsObj.method, otherPulishparamsObj.url)
                xhr.send(formData)
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText)
                    if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                        otherPulishparamsObj.success(result)
                        console.log("查询他人文章列表成功~")
                    }
                    if (result.status === 400) {
                        console.log(xhr.responseText)
                        console.log("查询他人文章列表失败")
                    }
                }
            }
        };
    }
}


// 点击右上角图标显示小框
center_top_icon2.addEventListener('click', function () {
    center_tag_mask.style.display = 'block'
    center_foot_data_bigbox.style.display = 'block'
})
center_data_btn.addEventListener('click', function () {
    center.style.display = 'none'
    data.style.display = 'block'
    // 获取个人资料
    yourId = window.sessionStorage.getItem('yourId')
    showdata(yourId)
})
center_box_land.addEventListener('click', function () {
    center_landsee()
})
cancelbox1.addEventListener('click', function () {
    center_tag_mask.style.display = 'none'
    center_foot_data_bigbox.style.display = 'none'
})

// 获取编辑个人资料页面数据
function showdata(yourId) {
    console.log(yourId)
    let dataPparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
        data: {
            id: + yourId
        },
        success: function (response) {
            // console.log(response.data.avatar)
            if (response.data.avatar) {
                data_pics.src = response.data.avatar
            }
            edit_data_all[0].value = response.data.username
            // bgc_url.style.backgroundImage=`url:(${response.data.background_img})`
            edit_data_all[1].value = yourId
            if (response.data.gender === 1) {
                edit_data_all[2].value = '女'
            } else if (response.data.gender === 0) {
                edit_data_all[2].value = '男'
            } else {
                edit_data_all[2].value = '保密'
            } edit_data_all[3].value = response.data.birthday
            edit_data_all[4].value = response.data.intro
            if (response.data.background_img) {
                data_backgroun_pics.src = response.data.background_img
            }
            edit_data(yourId)
            // other_follow(yourId)
            // other_publish(yourId)

        }
    }
    // 发起请求
    GetAndPost(dataPparamsObj)
}

function edit_data(yourId) {
    savaData.addEventListener('click', function () {
        let gender = 0

        let name = edit_data_all[0].value
        let id = edit_data_all[1].value
        // console.log(edit_data_all[2].value)
        if (edit_data_all[2].value === '女') {
            gender = 1
        } else if (edit_data_all[2].value === '男') {
            gender = 0
        } else {
            gender = 2
        }
        let birthday = edit_data_all[3].value
        let intro = edit_data_all[4].value
        let dataPparamsObj = {
            method: 'post',
            url: 'http://175.178.4.54:3007/userInfo/updateUserInfo',
            data: {
                username: name,
                gender: gender,
                intro: intro,
                birthday: birthday
            },
            success: function (response) {
                if (response.data.avatar) {
                    data_pics.src = response.data.avatar
                }
                edit_data_all[0].value = response.data.username
                // bgc_url.style.backgroundImage=`url:(${response.data.background_img})`
                edit_data_all[1].value = yourId
                if (response.data.gender === 1) {
                    edit_data_all[2].value = '女'
                } else if (response.data.gender === 0) {
                    edit_data_all[2].value = '男'
                } else {
                    edit_data_all[2].value = '保密'
                } edit_data_all[3].value = response.data.birthday
                edit_data_all[4].value = response.data.intro
                if (response.data.background_img) {
                    data_backgroun_pics.src = response.data.background_img
                }
                // 上传头像
                post_avatar()
                // 上传背景
                post_bgcavatar()
            }
        }
        // 发起请求
        GetAndPost(dataPparamsObj)
    })
}
// 记录头像图片的url
let avatar_url = []
// 记录背景图片的url
let background_url = []
// 这个函数用来头像上传后显示图片
function previewthis() {

    let fileDom = document.querySelector('.upload-avatar')
    let file = fileDom.files[0]
    avatar_url[0] = file
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        return false
    }
    let imgUrl = window.URL.createObjectURL(file)
    data_pics.setAttribute('src', imgUrl)
    data_pics.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }
}
// 上传头像
function post_avatar() {
    let avatarparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/userInfo/uploadAvatar",
        data: {
            avatar: avatar_url[0]
        },

        success: function (response) {
            data_pics.src = response.data.avatar
            console.log('上传成功')
        }
    }
    // 发起请求
    GetAndPost(avatarparamsObj)
}
// 这个函数用来上传背景后显示图片
function background() {

    let fileDom = document.querySelector('.upload-background')
    let file = fileDom.files[0]
    background_url[0] = file
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        return false
    }
    let imgUrl = window.URL.createObjectURL(file)
    data_backgroun_pics.setAttribute('src', imgUrl)
    data_backgroun_pics.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }
}
// 上传背景
function post_bgcavatar() {
    let bgcavatarparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/userInfo/uploadBackground",
        data: {
            background_img: background_url[0]
        },

        success: function (response) {
            data_backgroun_pics.src = response.data.background_img
            console.log('上传成功')
        }
    }
    // 发起请求
    GetAndPost(bgcavatarparamsObj)
}
// 记录登录状态
let isLogin = 0
// 查看登录状态
function center_landsee() {

    let landparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/userInfo/checkLogin',
        success: function (response) {
            if (response.data.isLogin === 1) {
                isLogin = 1
                alert('已登录')
                center_leaveland()
            }
        }
    }
    GetAndPost(landparamsObj)

}
// 退出登录
function center_leaveland() {
    if (isLogin === 1) {

        let landleveparamsObj = {
            method: 'get',
            url: 'http://175.178.4.54:3007/userInfo/logout',
            success: function (response) {
                center_tag_mask.style.display = 'none'
                center_foot_data_bigbox.style.display = 'none'
                center.style.display = 'none'
                landing.style.display = 'block'
                console.log('已退出')
                isLogin = 0
            }
        }
        GetAndPost(landleveparamsObj)
    }
}
//给小盒子绑定点击事件使添加样式
document.querySelector('.center-text-box3').addEventListener('click',function(e){
    document.querySelector('.center .centerbox-change').classList.remove('centerbox-change')
    e.target.classList.add('centerbox-change')
})
//点击渲染不同的内容
document.querySelector(".center-box3-notes").addEventListener("click",function(){
    remove_center()
    center_publish(yourId)
})
document.querySelector(".center-box3-collect").addEventListener("click",function(){
    remove_center()
    center_collectArticleGet(yourId)
})
document.querySelector(".center-box3-like").addEventListener("click",function(){
    remove_center()
    center_likeArticleGet(yourId)
})

// Ta收藏过的文章
function center_collectArticleGet(yourId) {
    getLikeArticle(likPparamsObj)
    let otherPulishparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/star/getStarArticles',
        data: {
            id: yourId
        },
        success: function (response) {
            for (let i = 0; i < response.data.pages.length; i++) {
            // getCollectArticle_comment(response.data.pages[i].id)
            getCollectArticle_detial(response.data.pages[i].id)
            }
            document.querySelector(".centercontent-box1").innerHTML = `${
                response.data.pages.length
            } 篇文章`
        }
    }
    GetAndPost(otherPulishparamsObj)

}
let string_center_collect_comment=''
//获取文章细节
function getCollectArticle_detial(articleId){
    let getCollectArticle_detial ={
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getDetails',
        data: {
            articleId: +articleId
        },
        success: async function (response) {
            string_center_collect_comment=''
            // console.log(string_center_collect_comment)
            await getCollectArticle_comment(articleId)
            // console.log("+++++++++++++++++++++++++++++++++")
            // console.log(string_center_collect_comment)
            let strings=''
                let cnode = document.createElement("div")
                cnode.setAttribute("class", "centercontent-mainbox")
                let res_data = response.data
                for (let k = 0; k < res_data.label.length; k++) {
                    strings += `
                <div class="centercontent-foot-tag">#${
                        res_data.label[k]
                    }</div>
            `
                }
            cnode.innerHTML = `
            <div class="centerArticle-main-bigbox1" articleId="${articleId}">
            <div class="centercontentArticlesbox">
            <div class="centercontent-box-time">
                <div class="time1">${
                    res_data.time.slice(5, 7)
                }</div>
                <div>/</div>
                <div class="time2">${
                    res_data.time.slice(8, 10)
                }</div>
            </div>
            <div class=" centercontent-box-title">${
                    res_data.title
                }</div>
            <div class=" centercontent-box-content">${
                    res_data.content
                }</div>
            <div class=" centercontent-tagAndview">
            <div class="cent-taglittlebox">` + `${strings}` + `   
            </div>    
            <div class="centercontent-foot-view">${
                    res_data.reviewNum
                }人阅读</div>
            </div>
            <div class="centercontent-iconBox">
                <div class="centercontent-foot-iconshare1"></div>
                <div class="centercontent-foot-iconlike1" style="color:rgb(128, 124, 124);" articleId="${articleId}"></div>
                <div class="centercontent-foot-iconlikenum" fanNum="${res_data.fanNum}">${
                    res_data.fanNum
                }</div>

                <div class="centercontent-foot-iconcomment2"></div>
                <div class="centercontent-foot-iconcommentnum">${
                    res_data.reviewNum
                }</div>
            </div>
            <div class="centercontent-main-commentsbox">
                <div class="word">` + `${string_center_collect_comment}`
                document.querySelector('.centercontent-main1-recommend').appendChild(cnode)
                click_center_article()
            }
            
        }
    
        // 发起请求
        GetAndPost(getCollectArticle_detial)
}
//获取收藏的文章的评论（有bug)
function getCollectArticle_comment(articleId){
    return new Promise((res, rej) => {
        let otherFansparamsObj = {
            method: 'get',
            url: 'http://175.178.4.54:3007/review/getReviewsByArt',
            data: {
                articleId: +articleId,
                page: 1,
                size: 10
            },
            success: function (response) {
                string_center_collect_comment=''
                // console.log("--------------------")
    
                // console.log(response)
                // console.log(response.list[0])
                // console.log(response.list.length)
                    if (response.list.length>0){ 
                        // for(let k = 0; k < response.list.pages[i].firstReview.length; k++){
                            string_center_collect_comment += `
                            
                    <div class="username">${response.list[0].userInfo.userName}: </div>
                    <div class="content"> ${response.list[0].content}</div>
                        </div>
                `
                        if (response.list.length > 1) {
                            string_center_collect_comment += `
                    <div class="more">查看更多评论</div>
                </div>
                </div>
    `
                        } else {
                            string_center_collect_comment += `</div>
                            </div>
                    `
                        }
                        // }
                    } else if(response.list.length==0){
                        string_center_collect_comment += `</div>
                <div class="more">暂无评论</div>
            </div>
            </div>
    `
                    }
                    // console.log(string_center_collect_comment)
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
                    res()
                }
                if (result.status === 400) {
    
                    console.log(xhr.responseText)
                    console.log("查询失败~")
                    rej()
        //             string_center_collect_comment=`</div>
        //             <div class="more">暂无评论</div>
        //         </div>
        // </div>`
                }
            } else {
                // console.log("请求失败")
            }
        }
    })
    

}

// Ta喜欢过的文章
function center_likeArticleGet(yourId) {

    getLikeArticle(likPparamsObj)
    let center_likeArticleGet = {
        method: 'get',
        url: 'http://175.178.4.54:3007/like/getLikeArticles',
        data: {
            id: yourId
        },
        success: function (response) {
            for (let i = 0; i < response.data.pages.length; i++) {
                // console.log(response)
                // getCollectArticle_comment(response.data.pages[i].id)
                getCollectArticle_detial(response.data.pages[i].id)
            }
            document.querySelector(".centercontent-box1").innerHTML = `${
                response.data.pages.length
            } 篇文章`
        }
    }
    GetAndPost(center_likeArticleGet)
}
//给文章盒子绑定点击事件
function click_center_article(){
    let boxAll = document.querySelectorAll(".centerArticle-main-bigbox1")
    for(let i = 0;i < boxAll.length; i++){
        boxAll[i].addEventListener('click',function(){
        center.style.display='none'
        showarticle(this.getAttribute("articleId"))
        article.style.display='block'
    })
    //绑定点赞跟取消事件（有bug)
    let iconBox = document.querySelectorAll(".centercontent-foot-iconlike1")
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







//点击跳转到关注列表页面
document.querySelector('.center-box2-attent').addEventListener('click',function(){
    other.style.display='none'
    center.style.display='none'
    document.querySelector('.newfollow').style.display='block'
    //获取关注列表并渲染到页面
    get_FansList(yourId)
    get_FollowerList(yourId)
})
//获取关注列表并渲染到页面
function get_FollowerList(otherId){
    
    followsLists=[]
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
                followsLists[i]=response.data[i].username
                string_follower+=`    
                <div class="newfollow-box1">
                <div class="newfollow-pic"><img src="${response.data[i].avatar}" alt="" class="newfollow-pics"></div>
                <div class="newfollow-name">${response.data[i].username}</div>
                
        `
        if(fansLists.length==0){
            string_follower+=`
                <div class="newfollow-foci">已关注</div>
            </div>`
        }else{
            for(let v=0;v<fansLists.length;v++){
            if(response.data[i].username ==fansLists[v]){
                string_follower+=`
                <div class="newfollow-foci">互相关注</div>
            </div>`
            break
            }else if(v==fansLists.length-1){
                string_follower+=`
                <div class="newfollow-foci">已关注</div>
            </div>`
            }
            }
        
            }
        }
            document.querySelector('.newfollows-main-user').innerHTML = string_follower
            document.querySelector('.newfollow-top-back').addEventListener('click',click_top_back2.bind(this,1))
        
        }
    }
    // 发起请求
    GetAndPost(FollowerparamsObj)
}
function click_top_back2(next){
    if(next==1){
        other.style.display='none'
        document.querySelector('.newfollow').style.display='none'
        document.querySelector('.newfans').style.display='none'
        center.style.display='block'
    }
    if(next==2){
        center.style.display='none'
        document.querySelector('.newfollow').style.display='none'
        document.querySelector('.newfans').style.display='none'
        other.style.display='block'
    }
}
//点击跳转的粉丝列表
document.querySelector('.center-box2-fans').addEventListener('click',function(){
    center.style.display='none'
    other.style.display='none'
    document.querySelector('.newfans').style.display='block'
    //获取粉丝列表并渲染到页面
    get_FollowerList(yourId)
    get_FansList(yourId)
})
//获取粉丝列表并渲染到页面
function get_FansList(otherId){
    
    let string_fans=''
    fansLists=[]
    let FansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/fansList',
        data: {
            userId: +otherId
        },
        success: function (response) {
            // console.log(response)
            // console.log(response.data.length)
            for(let i=0;i<response.data.length;i++){
                fansLists[i]=response.data[i].username
            string_fans+=`    
                <div class="newfans-box1">
                    <div class="newfans-pic"><img src="${response.data[i].avatar}" alt="" class="newfans-pics"></div>
                    <div class="newfans-name">${response.data[i].username}</div>
        `
        if(followsLists.length==0){
            string_fans+=`
                <div class="newfans-foci">未关注</div>
            </div>`
        }else{
        for(let v=0;v<followsLists.length;v++){
            if(response.data[i].username ==followsLists[v]){
                string_fans+=`
                <div class="newfans-foci">互相关注</div>
            </div>`
            break
            }else if(v==followsLists.length-1){
                string_fans+=`
                <div class="newfans-foci">未关注</div>
            </div>`
            }
            }
        }
            }
            document.querySelector('.newfanss-main-user').innerHTML = string_fans
            document.querySelector('.newfans-top-back').addEventListener('click',click_top_back2.bind(this,1))
        }
    }
    // 发起请求
    GetAndPost(FansparamsObj)
}
