let yourId = ''
let token = ""
token = window.sessionStorage.getItem('token')
yourId = window.sessionStorage.getItem('yourId')
// yourId=window.sessionStorage.getItem('yourId')
// console.log(yourId)
// console.log(token)
let homepage = document.querySelector('.homepage')
let home_Head_Publish = document.querySelector('.home-foot-publish')
let home_Head_Search = document.querySelector('.home-head-search .searchSpan')
let home_foot = document.querySelector('.home-foot')
let home_foot_page = document.querySelector('.home-foot-page')
let home_foot_msg = document.querySelector('.home-foot-msg')
let home_foot_shop = document.querySelector('.home-foot-shop')
let home_foot_center = document.querySelector('.home-foot-center')


let search = document.querySelector('.search')
let lis_homeHeadClass = document.querySelectorAll('.home-main-head ul li')
let home_head = document.querySelector('.home-main-head')
// 推荐里面的每一个小卡片
let home_main1_recommend = document.querySelector('.home-main1-recommend')
let recommend_box1 = document.querySelectorAll('.recommend-box1')
let recommend_box_pics = document.querySelectorAll('.recommend-box-pics')
let recommend_box_pic = document.querySelectorAll('.recommend-box-pic img')
let recommend_box_title = document.querySelectorAll('.recommend-box-title')
let recommend_foot_pic = document.querySelectorAll('.recommend-foot-pics')
let recommend_foot_author = document.querySelectorAll('.recommend-foot-author')
let recommend_foot_icon = document.querySelectorAll('.recommend-foot-icon')
let recommend_foot_like = document.querySelectorAll('.recommend-foot-like')
// 底部tag对应的页面
let message = document.querySelector('.message')
let publish = document.querySelector('.publish')
let center = document.querySelector('.center')
let shop = document.querySelector('.shop')
// 获取他人面的文章主盒子
let other = document.querySelector('.other')
let other_main1_recommend = document.querySelector('.other-main1-recommend')
let other_box1_imgs = document.querySelector('.other-box1-imgs')
let other_box1_name = document.querySelector('.other-box1-name')
let bgc_url = document.querySelector('.other .bgc')
let other_id = document.querySelector('.other-box1-id1')
let other_intro = document.querySelector('.other-box1-id2')
// 记录点赞总数
let otherlikesum = 0
// 获取文章详情页面
let article = document.querySelector('.article')
let artical_top_imgs = document.querySelector('.artical-top-imgs')
let artical_top_name = document.querySelector('.artical-top-name')
let artical_top_attent = document.querySelector('.artical-top-attent')
let artical_imgs = document.querySelector('.artical-imgs')
let article_main_content = document.querySelector('.article-main-content')
let article_main_title = document.querySelector('.article-main-title')
let article_main_tag = document.querySelector('.article-main-tag')
let article_main_time = document.querySelector('.article-main-time')
let article_comment_likenumbox = document.querySelector('.article-comment-likenumbox')
let article_comment_commentnumbox = document.querySelector('.article-comment-commentnumbox')
let article_comment_bigbox1 = document.querySelector('.article-comment-bigbox1')
let article_comment_main_bigbox = document.querySelector('.article-comment-main-bigbox')
let article_likebox_num = document.querySelector('.article-likebox-num')
let article_commentbox_num = document.querySelector('.article-commentbox-num')
// let message = document.querySelector('.message')
// 获取关注的人的清单 获取喜欢的文章的清单
let followsLists = [];
let follow_num = 0;
let fansLists = [];
let likeArticleList = [];
let like_num = 0
let starArticleList = [];
let star_num = 0
//搜索框页面
let search_input = document.querySelector('.search-input')


// 点击首页到顶部
home_foot_page.addEventListener('click', function () {
    center.style.display = 'none';
    message.style.display = 'none';
    homepage.style.display = 'block';
    document.querySelector('.home-foot .active').classList.remove('active');
    home_foot_page.classList.add('active')
})
// 点击消息到消息
home_foot_msg.addEventListener('click', function () {
    center.style.display = 'none';
    homepage.style.display = 'none';
    message.style.display = 'block';
})
// 从首页跳到周边
home_foot_shop.addEventListener('click', function () {
    homepage.style.display = 'none';
    center.style.display = 'none';
    shop.style.display = 'block';
})
// 从首页到个人中心页
home_foot_center.addEventListener('click', function () {
    homepage.style.display = 'none';
    center.style.display = 'block';
    remove_center() 
    showcenter()
})
// 点击加号进入发表文章界面
home_Head_Publish.addEventListener('click', function () {
    homepage.style.display = 'none';
    publish.style.display = 'block';
})

// 点击搜索符号进入搜索界面
home_Head_Search.addEventListener('click', function () {
    homepage.style.display = 'none';
    search.style.display = 'block';
})
//给顶部搜索框绑定点击事件
search_input.addEventListener('click',function(){
    homepage.style.display='none'
    search.style.display='block'
    document.querySelector('.search-main-head').style.display='none'
    document.querySelector('.search-main-boxs').style.display='none'
    document.querySelector('.search-tag-bigbox').style.display='none'
    document.querySelector('.search-bigbox-dispaly2').style.display='none'
    document.querySelector('.search-head-main').value = ''
    document.querySelector('.search_history').style.display='block'

})
// 点击底部tag对应加高光
// home_foot.addEventListener('click', function (e) {
//     if(e.target.dataset.id!=='1'){
//     document.querySelector('.home-foot .active').classList.remove('active');
//     e.target.parentNode.classList.add('active')
//     }
// })
// 点击头部tab对应加高光
home_head.addEventListener('click', function (e) {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    if (e.target.tagName !== 'UL') {
        document.querySelector('.home-main-head .active').classList.remove('active');
        e.target.classList.add('active')
    }
})

// 点击头部tab获取对应文章
lis_homeHeadClass[0].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '推荐'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
// lis_homeHeadClass[1].addEventListener('click', function(){
//     remove_recommend()
//     // paramsObj.data.type = '推荐'
//     recommend_tag(paramsObj)

// })
lis_homeHeadClass[2].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '文学'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
lis_homeHeadClass[3].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '绘画'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
lis_homeHeadClass[4].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '摄影'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
lis_homeHeadClass[5].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '影视'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
lis_homeHeadClass[6].addEventListener('click', function () {
    remove_recommend()
    paramsObj.data.type = '娱乐'
    paramsObj.data.page = 1
    recommend_tag(paramsObj)

})
// 封装发起请求函数
function GetAndPost(PparamsObj) {
    token = window.sessionStorage.getItem('token')
    let xhr = new XMLHttpRequest()
    const qs = resolveData(PparamsObj.data)
    const formData = new FormData()
    for (let k in PparamsObj.data) {
        formData.append(k, PparamsObj.data[k]);
    }
    if(PparamsObj.url=="http://175.178.4.54:3007/follow/followUser"){
        xhr.open(PparamsObj.method, PparamsObj.url + '?' + qs)
        xhr.setRequestHeader('Authorization', token)
        xhr.send()
    }else{

    if (PparamsObj.method.toUpperCase() === 'GET') {
        xhr.open(PparamsObj.method, PparamsObj.url + '?' + qs)
        xhr.setRequestHeader('Authorization', token)
        xhr.send()
    } else if (PparamsObj.method.toUpperCase() === 'POST') {
        xhr.open(PparamsObj.method, PparamsObj.url)
        xhr.setRequestHeader('Authorization', token)
        xhr.send(formData)
    }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if(PparamsObj.url=="http://175.178.4.54:3007/follow/followUser"){
                PparamsObj.success()
                return
            }
            var result = JSON.parse(xhr.responseText)
            if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                PparamsObj.success(result)
                // console.log("查询成功~")
            }
            if (result.status === 400) {

                console.log(xhr.responseText)
                console.log("查询失败~")
            }
        } else {
            console.log("请求失败")
        }
    }
};
// 用于获取喜欢列表
let likPparamsObj = {
    method: 'get',
    url: 'http://175.178.4.54:3007/like/getLikeArticles',
    data: {
        id: yourId
    },
    success: function (response) {
        like_num=0
        likeArticleList = []
        for (let i = 0; i < response.data.pages.length; i++) {
            likeArticleList[i] = response.data.pages[i].id
        }
        // 记录已经喜欢的文章的数量
        like_num = likeArticleList.length
        // 文章盒子底部点赞旁边的点赞数量
        // center_like_num.innerHTML = like_num
        // console.log(like_num)
        // console.log(likeArticleList)
    }
}
// 获取喜欢的文章的列表(有bug)
function getLikeArticle(likPparamsObj) { 
    // 发起请求
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
                    
                    for (let k = 0; k < recommend_foot_icon.length; k++) {
                            recommend_foot_icon[k].style.color = 'rgb(128,124,124)'
                            
                    }
                    console.log(xhr.responseText)
                    console.log("查询失败~")
                }
            } else {
                console.log("请求失败")
            }
        }
    
}
let boxpageNUm = 0
// 将首页中每个小盒子的内容渲染进去 点击的时候才会调用这个函数 点击过后清空之前盒子里面的所有东西 重新渲染
let paramsObj = {
    method: 'get',
    url: 'http://175.178.4.54:3007/article/getArticle',
    data: {
        type: '推荐',
        page: 1,
        size: 10
    },
    // res_data: {},
    success: function (response) {


        let res_data = {}
        let recommend_box1 = document.querySelectorAll('.recommend-box1')
        boxpageNUm = recommend_box1.length
        // console.log(boxpageNUm)
        let boxnum1 = response.data.articleList.length
        res_data = response.data.articleList
        // console.log(response.data);
        for (let i = boxpageNUm, j = 0; j < boxnum1; i++, j ++) {
            let cnode = document.createElement("div")
            cnode.setAttribute("class", "recommend-box1")
            cnode.innerHTML = `
                    <div class="recommend-box-pic" data-id="${
                res_data[j].authorId
            }">
                        <img src="${
                res_data[j].cover
            }" alt="" class="recommend-box-pics" num="${i}" articleId="${
                res_data[j].articleId
            }">
                    </div>
                    <div class="recommend-box-title">${
                res_data[j].title
            }</div>
                    <div class="recommend-box-foot">
                        <div class="recommend-foot-pic data-id="${
                res_data[j].authorId
            }">
                            <img src="${
                res_data[j].avatar
            }" alt="" class="recommend-foot-pics" articleId="${
                res_data[j].articleId
            }" usernameId="${
                res_data[j].username
            }" authorId="${
                res_data[j].authorId
            }">
                        </div>
                        <div class="recommend-foot-author">${
                res_data[j].username
            }</div>
                        <div class="recommend-foot-icon" style="color:rgb(128, 124, 124)" articleId="${
                res_data[j].articleId
            }"> </div>
                        <div class="recommend-foot-like" fanNum="${
                res_data[j].fanNum
            }">${
                res_data[j].fanNum
            }</div>
                    </div>
                `
            home_main1_recommend.appendChild(cnode)

        }
        // 重新获取
        recommend_box1 = document.querySelectorAll('.recommend-box1')
        recommend_box_pics = document.querySelectorAll('.recommend-box-pics')
        recommend_box_pic = document.querySelectorAll('.recommend-box-pic img')
        recommend_box_title = document.querySelectorAll('.recommend-box-title')
        recommend_foot_pic = document.querySelectorAll('.recommend-foot-pics')
        recommend_foot_author = document.querySelectorAll('.recommend-foot-author')
        recommend_foot_icon = document.querySelectorAll('.recommend-foot-icon')
        recommend_foot_like = document.querySelectorAll('.recommend-foot-like')
        // 判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
        // 添加自定义属性为了点击喜欢和取消喜欢
        likPparamsObj.data.id = window.sessionStorage.getItem('yourId')
        // 获取喜欢的文章列表
        getLikeArticle(likPparamsObj)
        // get_collectArticle()
        // console.log(like_num)
        // 遍历所有盒子并一一判断盒子所对应的文章id是否在已经喜欢的文章列表里
        for (let i = boxpageNUm; i < recommend_box1.length; i++) {
            // console.log(likeArticleList)
            let articleId = recommend_foot_icon[i].getAttribute('articleId')
            for (let k = 0; k < like_num; k++) {
                if (likeArticleList[k] == articleId) {
                    recommend_foot_icon[i].style.color = 'rgb(253,55,72)'
                    break
                }else{
                    recommend_foot_icon[i].style.color = 'rgb(128,124,124)'
                }
            }
        }
        // 绑定点击事件
        clickthing()
        article_other_click()
    }
}
// 到底部自动获取文章
window.addEventListener('scroll', function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部的高度
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // dom元素的高度
    // console.log("scroll", scrollTop, clientHeight, scrollHeight)
    // if (clientHeight + scrollTop  === scrollHeight) {
    if (clientHeight + scrollTop + 50 >= scrollHeight) {
        // console.log(paramsObj.data.page);
        // console.log(paramsObj.data.page < 10);
        if (paramsObj.data.page < 20) {
            paramsObj.data.page += 1;
            recommend_tag(paramsObj)
        }
    }
}, true)

// window.onbeforeunload = function(){
//     alert("111")
//     recommend_tag(paramsObj)

//     alert("111")
// }

// 这个函数是用于中间核心的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次复制的模板
function remove_recommend() {
    let childs = home_main1_recommend.childNodes
    for (let i = childs.length - 1; i >= 0; i--) {
        home_main1_recommend.removeChild(childs[i])
    }

}
// 这个函数是用于中间核心的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次复制的模板
// 这个函数是用于中间核心的盒子中删除所有小卡片
function remove_other() {
    let other_main1_recommend = document.querySelector(".other-main1-recommend")
    let other_main_bigbox1 = document.querySelectorAll('.other-main-bigbox1')
    // console.log(centerArticle_main_bigbox1);
    for (let i = 0; i < other_main_bigbox1.length; i++) {
        other_main1_recommend .removeChild(other_main_bigbox1[i])
        // console.log("yoyo");
    }

}
// 第一个卡片在登陆成功的时候就会执行一次这个函数
lis_homeHeadClass[0].addEventListener('click', recommend_tag.bind(this, paramsObj))
function recommend_tag(paramsObj) {
    yourId = window.sessionStorage.getItem('yourId')
    // getLikeArticle(yourId)
    // getfollows(yourId)
    // getstar(yourId)
    // 发起请求
    // console.log("请求");
    // console.log(paramsObj.data.type);
    recommendData(paramsObj)
    function recommendData(recommend) {
        console.log('111')
        let xhr = new XMLHttpRequest()
        const qs = resolveData(recommend.data)
        const formData = new FormData();
        for (let k in recommend.data) {
            formData.append(k, recommend.data[k]);
        }

        if (recommend.method.toUpperCase() === 'GET') {
            xhr.open(recommend.method, recommend.url + '?' + qs)
            xhr.send()
        } else if (recommend.method.toUpperCase() === 'POST') {
            xhr.open(recommend.method, recommend.url)
            xhr.send(formData)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText)
                if (result.status === 200) { // var result = JSON.parse(xhr.responseText)
                    recommend.success(result)
                    console.log("推荐成功~")
                }
                if (result.status === 400) {
                    console.log(xhr.responseText)
                    console.log("推荐失败")
                }
            }
        }
    };
}
// 把外界传递过来的参数对象，转换为查询字符
function resolveData(data) {
    let arr = []
    for (let k in data) {
        let str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// 推荐页点击头像进入作者页面
function clickthing() {
    // console.log("到这")
    // console.log(recommend_foot_pic.length)
    for (let i = 0; i < recommend_foot_pic.length; i++) {
        recommend_foot_pic[i].addEventListener('click', function (e) {
            e.stopPropagation()
            homepage.style.display = 'none'
            if(this.getAttribute('authorId')==yourId){
                showcenter()
                center.style.display = 'block'
            }else{
                showother(this.getAttribute('authorId'))
                other.style.display = 'block'
            }

        })
        recommend_box_pics[i].addEventListener('click', function () {
            homepage.style.display = 'none'
            article.style.display = 'block'
            showarticle(this.getAttribute('articleId'))
        })
    }
}

// 显露其他页面
function showother(othersId) {
    remove_other()
    document.querySelector('.otherbox-change').classList.remove('otherbox-change')
    document.querySelector(".other-box3-notes").classList.add('otherbox-change')
    // console.log('渲染其他页面')
    window.sessionStorage.setItem("authorId", othersId)
    let centerPparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
        data: {
            id: +othersId
        },
        success: function (response) {

            other_box1_imgs.src = response.data.avatar
            other_box1_name.innerHTML = response.data.username
            bgc_url.style.backgroundImage = `url(${
                response.data.background_img
            })`
            other_intro.innerHTML = `简介： ${
                response.data.intro
            }`
            other_id.innerHTML = `id: ${othersId}`
            document.querySelector(".other-box2-attent").setAttribute("othersId",othersId)
            document.querySelector(".other-box2-fans").setAttribute("othersId",othersId)
            document.querySelector(".other-box3-notes").setAttribute("othersId",othersId)
            document.querySelector(".other-box3-collect").setAttribute("othersId",othersId)
            document.querySelector(".other-box3-like").setAttribute("othersId",othersId)
            document.querySelector(".other .chatbox").setAttribute("otherId",othersId)
            console.log(document.querySelector(".other .chatbox").getAttribute("otherId"))
            document.querySelector(".other-main-center-two .followbox").setAttribute("otherId",othersId)
            // console.log(response.data.avatar)
            // 这个是聊天的里面的nickname
            // chat_top_nickname.innerHTML = response.data.username
            // document.querySelector('.other-like-num').innerHTML = response.data.likedArticles.length + response.data.user.staredArticles.length
            other_fans(othersId)
            other_follow(othersId)
            remove_other()
            other_publish(othersId)
            //获取我的关注列表跟粉丝列表
            getFollows(yourId)
            get_FansList(yourId)
            for(let k=0;k<followsLists.length;k++){
                //我的关注列表里有这个人
                if(followsLists[k] == response.data.username){
                    for(let v=0;v<fansLists.length;v++){
                        //我的粉丝列表里有这个人
                    if(fansLists[v] == response.data.username){
                    document.querySelector(".other-main-center-two .followbox").innerHTML='互相关注'
                    document.querySelector(".other-main-center-two .followbox").setAttribute("follow","1")
                    break
                    }else if(v==fansLists.length-1){
                        //我的粉丝列表里没有这个人
                        document.querySelector(".other-main-center-two .followbox").innerHTML='已关注'
                        document.querySelector(".other-main-center-two .followbox").setAttribute("follow","2")
                        break
                    }
                    break
                }
                }else if(k==followsLists.length-1){
                    //我的关注列表里没有这个人
                    document.querySelector(".other-main-center-two .followbox").innerHTML='未关注'
                    document.querySelector(".other-main-center-two .followbox").setAttribute("follow","0")
                }
            }
            //点击渲染不同的内容
            click_other_box()
            document.querySelector(".other-box3-notes").click()
            //点击取消关注
            document.querySelector(".other-main-center-two .followbox").onclick=function(){
                let num=this.getAttribute("follow")
                if(num==1 || num==2){
                cancleFollow(this.getAttribute("otherId"))
                document.querySelector(".other-main-center-two .followbox").innerHTML='未关注'
                }else if(num==0){
                    postFollows(othersId)
                    document.querySelector(".other-main-center-two .followbox").innerHTML='已关注'
                                
                }
            }

        }
    }
    // 发起请求
    GetAndPost(centerPparamsObj)
}
// 显露文章详情页
function showarticle(articleId) {
    window.sessionStorage.setItem("articleId", articleId)
    let articlePparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getDetails',
        data: {
            articleId: +articleId
        },
        success: function (response) {
            let strings = ''
            for (let k = 0; k < response.data.label.length; k++) {
                strings += `
                <div class="article-tag-box1"># ${
                    response.data.label[k]
                }</div>
            `
            }
            artical_top_imgs.src = response.data.avatar
            artical_top_name.innerHTML = response.data.authorName
            artical_imgs.src = response.data.img[0]
            article_main_content.innerHTML = response.data.content
            article_main_tag.innerHTML = strings
            article_main_time.innerHTML = response.data.time
            article_comment_likenumbox.innerHTML = response.data.fanNum
            article_likebox_num.innerHTML = response.data.fanNum
            article_comment_commentnumbox.innerHTML = response.data.reviewNum
            article_commentbox_num.innerHTML = response.data.reviewNum
            article_main_title.innerHTML = response.data.title
            
            // 用于后续点击作者头像进入作者页面
            let authorId = response.data.authorId
            if(authorId==yourId){
                document.querySelector(".article-comment-collect").classList.add("article-comment-collect_change")
                document.querySelector(".article-comment-iconcommentbox").style.transform="translate(-105px, 0px)"
                document.querySelector('.articleDelect-icon-box').style.display='block'
                document.querySelector(".articleDelect-icon-box").setAttribute('articleId',articleId)
                // document.querySelector(".artical-top-attent").style.display='none'
            }else{
                if(document.querySelector(".article-comment-collect_change")){
                document.querySelector(".article-comment-collect_change").classList.remove("article-comment-collect_change")
                }
                document.querySelector(".article-comment-iconcommentbox").style.transform='translate(-160px, 0px)'
                document.querySelector('.articleDelect-icon-box').style.display='none'
                
            }
            document.querySelector(".article-input").setAttribute('articleId',articleId)
            document.querySelector(".article-comment-comment").setAttribute('articleId',articleId)
            document.querySelector(".article-comment-comment").setAttribute('authorId',authorId)
            document.querySelector(".article-comment").setAttribute('articleId',articleId)
            document.querySelector(".article-comment").setAttribute('authorId',authorId)
            document.querySelector(".article-comment-like").setAttribute('articleId',articleId)
            document.querySelector(".article-like").setAttribute('articleId',articleId)
            document.querySelector(".article-input").setAttribute('authorId',authorId)
            document.querySelector(".article-comment-collect").setAttribute('articleId',articleId)
            article_comment_commentnumbox.setAttribute('reviewNum',response.data.reviewNum)
            article_commentbox_num.setAttribute('reviewNum',response.data.reviewNum)
            article_comment_likenumbox.setAttribute('fanNum',response.data.fanNum)
            article_likebox_num.setAttribute('fanNum',response.data.fanNum)
            artical_top_name.setAttribute('authorName',response.data.authorName)
            otherAuthor_top_click(authorId)
            article_comment(articleId,authorId)
            document.querySelector(".artical-top-attent").onclick=function(e){
                postFollows(authorId)
            }
            like_icon_red()

            // 获取关注列表
            if(authorId==yourId){
                document.querySelector(".artical-top-attent").style.display='none'}
                else{getFollows(artical_top_name.getAttribute('authorName'))}
            
            get_collectArticle()
            for (let v = 0; v < star_num; v++) {
                if (starArticleList[v] == articleId) {
                    document.querySelector(".article-comment-collect").style.color = 'rgb(245, 189, 96)'
                    break
                }else{
                    document.querySelector(".article-comment-collect").style.color = 'rgb(128,124,124)'
                }
            }
        //     if(authorId == yourId){
        //     document.querySelector(".artical-top-attent").style.display='none'
        // }else{
        //     document.querySelector(".artical-top-attent").style.display='block'
        // }
            // other_publish(articleId)
            
        }
    }

    // 发起请求
    GetAndPost(articlePparamsObj)
}
// 获取文章评论
function article_comment(articleId,authorId) {
    let otherFansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/review/getReviewsByArt',
        data: {
            articleId: +articleId,
            page: 1,
            size: 10
        },
        success: function (response) {
            let strings = ''
            for (let k = 0; k < response.list.length; k++) {
                console.log(response.list[k])
                strings += `
                <div class="article-comment-main-bigbox" id = "${
                    response.list[k].id
                }">
                <div class="article-comment-box">
                <div class="commentbox-pic">
                <img src="${response.list[k].userInfo.avatar}" alt="" class="commentbox-pics" userId="${response.list[k].userInfo.uid}" authorId="authorId">
                </div>
                <div class="commentbox-main" commentId="${response.list[k].id}" articleId="${articleId}" >
                    <div class="commentbox-nickname">${
                    response.list[k].userInfo.userName
                }</div>
                    <div class="commentbox-content">${
                    response.list[k].content
                }</div>
                    <div class="commentbox-time">${
                    response.list[k].time
                }</div>
                </div>
                <div class="commentbox-main-icon">
                <div class="commentbox-icon" review_id="${response.list[k].id}" style="color:rgb(128, 124, 124)"></div>
                <div class="commentbox-likenum" goodNum="${response.list[k].goodNum}">${
                    response.list[k].goodNum
                }</div>
                </div>
                <div class="commentbox-delect" userId="${response.list[k].userInfo.uid}" commentId="${response.list[k].id}" articleId="${articleId}"></div>
            </div>
            `
            
                if (response.list[k].childrenReviews!=[]) {
                    for(let r=0;r<response.list[k].childrenReviews.length;r++){
                    strings += `      
                <div class="article-commentSecond-bigbox" style="display:block">
                <div class="article-commentSecond-box">
                    <div class="commentSecondbox-pic"><img src="" alt="" class="commentSecondbox-pics" authorId="${response.list[k].childrenReviews[r].authorId}"></div>
                    <div class="commentSecondbox-main">
                        <div class="commentSecondbox-nickname">name123</div>
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
            
            article_comment_bigbox1.innerHTML = strings
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
            article_other_click()
            comment_likeIcon_click()
            commentbox_delect_click()
            comment_user_pic_click()
            commentbox_Second()

        }
    }
    // 发起请求
    GetAndPost(otherFansparamsObj)
}
// 给评论里的头像绑定点击事件
function comment_user_pic_click() {
    let commentbox_pics = document.querySelectorAll(".commentbox-pics")
    let num = commentbox_pics.length
    for (let i = 0; i < num; i++) {
        commentbox_pics[i].addEventListener('click', function (e) {
            e.stopPropagation()
            article.style.display = 'none'
            other.style.display = 'block'
            showother(commentbox_pics[i].getAttribute('userId'))
        })
    }
}
// //给首页盒子里的爱心绑定点击事件(有bug)
function article_other_click() {
    let recommend_foot_icon = document.querySelectorAll(".recommend-foot-icon")
    let num = recommend_foot_icon.length
    // for (let i = 0; i < num; i++) {
    //     recommend_foot_icon[i].addEventListener('click', function (e) {
    //         // console.log(e.target.style.color)
    //         e.stopPropagation()
    //         if (e.target.style.color === 'rgb(128, 124, 124)') {
    //             console.log("点赞函数开始")
    //             postLike(e.target.getAttribute('articleId'), e.target)
    //         } else if (e.target.style.color === 'rgb(253, 55, 72)') {
    //             console.log("取消点赞函数开始")
    //             cancleLike(e.target.getAttribute('articleId'), e.target)
    //         } else {
    //             console.log("查询错误11111")
    //         }
    //     })
    // }
    let fn = function (e) {
        // console.log(e.target.style.color)
        e.stopPropagation()
        if (e.target.style.color === 'rgb(128, 124, 124)') {
            console.log("点赞函数开始")
            postLike(e.target.getAttribute('articleId'), e.target)
        } else if (e.target.style.color === 'rgb(253, 55, 72)') {
            console.log("取消点赞函数开始")
            cancleLike(e.target.getAttribute('articleId'), e.target)
        } else {
            console.log("查询错误11111")
        }
    }
    for (let i = 0; i < num; i++) {
        // recommend_foot_icon[i].removeEventListener('click', fn.bind(this))
        // recommend_foot_icon[i].addEventListener('click', fn.bind(this))
        recommend_foot_icon[i].onclick = fn
    }


}
// 给文章详情页头部的作者头像绑定点击事件
function otherAuthor_top_click(authorId) {

    artical_top_imgs.addEventListener('click', function () {
        article.style.display = 'none'
        other.style.display = 'block'
        showother(authorId)
    })

}
// Ta的关注人数
function other_follow(othersId) {
    console.log(othersId)
    let otherFollowparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/followList',
        data: {
            userId: +othersId
        },
        success: function (response) {
            if (response === null) {
                document.querySelector('.other-attent-num').innerHTML = 0
            }
            document.querySelector('.other-attent-num').innerHTML = response.data.length
            // document.querySelector('.other-fans-num').innerHTML = response.data.fans.length
            // document.querySelector('.other-like-num').innerHTML = response.data.likedArticles.length + response.data.user.staredArticles.length
        }
    }
    // 发起请求
    GetAndPost(otherFollowparamsObj)
}
// Ta的粉丝人数
function other_fans(othersId) {
    let fansFansparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/fansList',
        data: {
            userId: othersId
        },
        success: function (response) {
            if (response === null) {
                document.querySelector('.other-fans-num').innerHTML = 0
            }
            document.querySelector('.other-fans-num').innerHTML = response.data.length
        }
    }
    GetAndPost(fansFansparamsObj)
}
// Ta发布过的文章（
function other_publish(othersId) {
    console.log('渲染发布列表')
    getLikeArticle(likPparamsObj)
    remove_other()
    let otherPulishparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getUserArticle',
        data: {
            authorId: othersId,
            page: 1,
            size: 10
        },
        success: function (response) {
            remove_other()
            otherlikesum=0
            document.querySelector(".other-box1").innerHTML = `${
                response.data.articleList.length
            } 篇文章`
            let res_data = {}
            let boxnum1 = response.data.articleList.length
            res_data = response.data
            // console.log(response.data);
            let strings = ''
            for (let i = 0; i < res_data.articleList.length; i++) {
                otherlikesum += res_data.articleList[i].fanNum
                let stringsTwo = ''
                // console.log(res_data.articleList[i].label);
                let cnode = document.createElement("div");
                cnode.setAttribute("class", "other-main-bigbox1");
                for (let k = 0; k < res_data.articleList[i].label.length; k++) {
                    strings += `
                <div class="other-foot-tag">#${
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
            <div class="otherArticlesbox">
            <div class="other-box-time">
                <div class="time1">${
                    res_data.articleList[i].time.slice(5, 7)
                }</div>
                <div>/</div>
                <div class="time2">${
                    res_data.articleList[i].time.slice(8, 10)
                }</div>
            </div>
            <div class="other-box-title">${
                    res_data.articleList[i].title
                }</div>
            <div class="other-box-content">${
                    res_data.articleList[i].content
                }</div>
            <div class="other-tagAndview">
            <div class="other-taglittlebox">` + `${strings}` + `   
            </div>    
            <div class="other-foot-view">${
                    res_data.articleList[i].reviewNum
                }人阅读</div>
            </div>
            <div class="other-iconBox">
                <div class="other-foot-iconshare1"></div>
                <div class="other-foot-iconlike1" style="color:rgb(128, 124, 124);" articleId="${res_data.articleList[i].articleId}"></div>
                <div class="other-foot-iconlikenum" fanNum="${res_data.articleList[i].fanNum}">${
                    res_data.articleList[i].fanNum
                }</div>

                <div class="other-foot-iconcomment2"></div>
                <div class="other-foot-iconcommentnum">${
                    res_data.articleList[i].reviewNum
                }</div>
            </div>
            <div class="other-main-commentsbox">
                <div class="word">` + `${stringsTwo}`
                other_main1_recommend.appendChild(cnode)
            }
            document.querySelector('.other-like-num').innerHTML = otherlikesum
            click_other_article()
        }
    }
    otherPublish(otherPulishparamsObj)
    // getstar(yourId)
    function otherPublish(otherPulishparamsObj) {
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
                        // console.log("查询他人文章列表成功~")
                    }
                    if (result.status === 400) {
                        // console.log(xhr.responseText)
                        console.log("查询他人文章列表失败")
                    }
                }
            }
        };
    }
}

let second_foot_likeNum = 0
// 点赞
function postLike(articleId, target) {
    let likePostparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/like/likeArticle",
        data: {
            article_id: articleId
        },

        success: function (response) {
            let nextbother = target.nextElementSibling
            // console.log(nextbother.getAttribute('fanNum'))
            target.nextElementSibling.setAttribute('fanNum',`${ +nextbother.getAttribute('fanNum') + 1}`)
            // console.log(nextbother.getAttribute('fanNum'))
            nextbother.innerHTML = +nextbother.getAttribute('fanNum')
            second_foot_likeNum = +nextbother.getAttribute('fanNum')
            article_comment_like.nextElementSibling.innerHTML = second_foot_likeNum
            document.querySelector('.likebox-icon .article-likebox-num').innerHTML = second_foot_likeNum
            // console.log("==============================")
                // console.log(second_foot_likeNum)
            target.style.color = 'rgb(253,55,72)'
        }
    }
    // 发起请求
    GetAndPost(likePostparamsObj)
}
//取消点赞
function cancleLike(articleId, target) {
    let cancleLikePostparamsObj = {
        method: 'POST',
        url: "http://175.178.4.54:3007/like/cancelLikeArticle",
        data: {
            article_id: articleId
        },
        success: function (response) {
            let nextbother = target.nextElementSibling
            // console.log(nextbother.getAttribute('fanNum'))
            target.nextElementSibling.setAttribute('fanNum',`${ +nextbother.getAttribute('fanNum') - 1}`)
            // console.log(nextbother.getAttribute('fanNum'))
            nextbother.innerHTML = +nextbother.getAttribute('fanNum')
            second_foot_likeNum = +nextbother.getAttribute('fanNum')
            document.querySelector('.likebox-icon .article-likebox-num').innerHTML= second_foot_likeNum 
            article_comment_like.nextElementSibling.innerHTML = second_foot_likeNum
            target.style.color = 'rgb(128, 124, 124)'
            console.log('取消成功')
        }
    }
    // 发起请求
    GetAndPost(cancleLikePostparamsObj)
}
// 获取关注列表修改文章头部关注按钮
function getFollows(userSelfName) {
    let getFollowparamsObj = {
        method: 'get',
        url: 'http://175.178.4.54:3007/follow/followList',
        data: {
            userId: yourId
        },
        success: function (response) {
            console.log("获取关注列表成功")
            console.log(response)
            followsLists = []
            for(let i = 0; i < response.data.length; i++){
                followsLists[i]=response.data[i].username
            if(response.data[i].username == userSelfName){
                document.querySelector(".artical-top-attent").style.display='none'
                break
            }else{
                document.querySelector(".artical-top-attent").style.display='block'
                document.querySelector(".artical-top-attent").innerHTML='未关注'
                
            }
        }
        }
    }
    GetAndPost(getFollowparamsObj)
}
let name_second=''
let avatar_second=''
function getuser(id,target){
let getUser={
    method: 'get',
    url: 'http://175.178.4.54:3007/userInfo/getUserInfo',
    data: {
        id:id
    },
    success: function (res) {
        // console.log("yoyoyo")
        let father=target.parentNode.nextElementSibling
        let name=father.firstElementChild
        target.src=res.data.avatar
        name.innerHTML=res.data.username
        // console.log(name_second)
        // console.log(avatar_second)
    }

    }
    GetAndPost(getUser)
}
