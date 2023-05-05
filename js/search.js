let search_head_main = document.querySelector('.search-head-main')
let search_btn = document.querySelector('.search-btn')
let search_head1_label = document.querySelector('.search-head1-label')
let search_head1_essay = document.querySelector('.search-head1-essay')
let search_head1_user = document.querySelector('.search-head1-user')

//点击放大镜图标实现搜索
search_btn.addEventListener('click',function(){
    document.querySelector('.search_history').style.display='none'
    document.querySelector('.search-main-boxs').style.display='none'
    document.querySelector('.search-bigbox-dispaly2').style.display='none'
    document.querySelector('.search-main-head').style.display='block'
    document.querySelector('.search-tag-bigbox').style.display='block'
    document.querySelector('.search-main-head .active').classList.remove('active')
    document.querySelector('.search-head1-label').classList.add('active')
    search_history_get()
    show_tag_search()
})
//渲染搜索结果的标签结果
function show_tag_search(){
    document.querySelector('.search-tag-bigbox').innerHTML=''
    let postSearchtag ={
        method: 'get',
        url: 'http://175.178.4.54:3007/search/getLabel',
        data: {
            keyWord: document.querySelector('.search-head-main').value,
            page: 1,
            size: 10
        },
        success: function (response) {
            let string = ''
            for(let i = 0; i < response.data.labelList.length; i++){
                string+=`
                <div class="search-tag-body" label="${response.data.labelList[i]}">
                <div class="tag-boxleft" label="${response.data.labelList[i]}">#${response.data.labelList[i]}</div>
                <div class="tag-boxright">123人参与</div>
            </div>`
            }
            document.querySelector('.search-tag-bigbox').innerHTML=string
            document.querySelector('.search-bigbox-dispaly2').style.display='none'
            document.querySelector('.search-tag-bigbox').style.display='block'
            search_tagResult_click()
        }
        }
        // 发起请求
        GetAndPost(postSearchtag)
}
//给标签 文章 用户绑定点击事件
search_head1_label.addEventListener('click',function(){
    document.querySelector('.search-main-head .active').classList.remove('active')
    this.classList.add('active')
    document.querySelector('.search-main-boxs').style.display='none'
    document.querySelector('.search-bigbox-dispaly2').style.display='none'
    show_tag_search()
    document.querySelector('.search-tag-bigbox').style.display='block'
})
search_head1_essay.addEventListener('click',function(){
    document.querySelector('.search-main-head .active').classList.remove('active')
    this.classList.add('active')
    document.querySelector('.search-tag-bigbox').style.display='none'
    document.querySelector('.search-tag2-user').style.display='none'
    document.querySelector('.search-bigbox-dispaly2').style.display='none'
    document.querySelector('.search-main-boxs').style.display='block'
    document.querySelector('.search_bigbox_dispaly').style.display='block'
    show_essay_search()
    
})
search_head1_user.addEventListener('click',function(){
    document.querySelector('.search-main-head .active').classList.remove('active')
    this.classList.add('active')
    document.querySelector('.search-tag-bigbox').style.display='none'
    document.querySelector('.search-bigbox-dispaly2').style.display='none'
    document.querySelector('.search_bigbox_dispaly').style.display='none'
    document.querySelector('.search-main-boxs').style.display='block'
    document.querySelector('.search-tag2-user').style.display='block'
    show_user_search()

})
//渲染搜索结果的文章结果
function show_essay_search(){
    document.querySelector('.search-tag1-artical').innerHTML=''
    let value = document.querySelector('.search-head-main').value
    let postSearchtag ={
        method: 'get',
        url: 'http://175.178.4.54:3007/search/getArticleByKeyWord',
        data: {
            keyWord: value,
            page: 1,
            size: 10
        },
        success: function (response) {
            document.querySelector('.search-tag1-artical').innerHTML=''
            getLikeArticle(likPparamsObj)
            for(let i = 0; i < response.data.articleList.length; i++){
                getLikeArticle_detial(response.data.articleList[i].articleId)
            }
            // search_eassyResult_click()
    }
        }
        
        // 发起请求
        GetAndPost(postSearchtag)
}
//获取文章细节
function getLikeArticle_detial(articleId){
    let getLikeArticle_detial ={
        method: 'get',
        url: 'http://175.178.4.54:3007/article/getDetails',
        data: {
            articleId:articleId
        },
        success: function (response) {
            let cnode = document.createElement("div");
            cnode.setAttribute("class", "search-main1-artical_bigbox");
            cnode.innerHTML = `
                        <div class="artical-box1">
                            <div class="artical-box-pic" articleId="${articleId}"><img src="${response.data.img[0]}" alt="" class="artical-box-pics"></div>
                            <div class="artical-box-title">${response.data.title}</div>
                            <div class="artical-box-foot">
                                <div class="artical-foot-pic"><img src="${response.data.avatar}" alt="" class="artical-foot-pics" authorId="${response.data.authorId}"></div>
                                <div class="artical-foot-author">${response.data.authorName}</div>
                                <div class="artical-foot-icon" style="color:rgb(128,124,124)" articleId="${articleId}"></div>
                                <div class="artical-foot-like">${response.data.fanNum}</div>
                            </div>
                            </div>
                    `
                    document.querySelector('.search-tag1-artical').appendChild(cnode)
                    // console.log(document.querySelector('.artical-foot-icon'))
                    let artical_foot_icon = document.querySelectorAll(".artical-foot-icon")
                    // console.log(artical_foot_icon.length)
                    for (let i = 0; i < artical_foot_icon.length; i++) {
                        let articleId =artical_foot_icon[i].getAttribute('articleId')
                        for(let k =0;k<like_num;k++){
                        if (likeArticleList[k] == articleId) {
                            artical_foot_icon[i].style.color = 'rgb(253,55,72)'
                            break
                        }else{
                            artical_foot_icon[i].style.color = 'rgb(128,124,124)'
                        }
                    }
                    }
                    search_eassyResult_click()
                    }
                    
        }
        // 发起请求
        GetAndPost(getLikeArticle_detial)
}
//渲染搜索结果的用户结果
function show_user_search(){
    document.querySelector('.search-main2-user').innerHTML=''
    let value = document.querySelector('.search-head-main').value
    let postSearchuser ={
        method: 'get',
        url: 'http://175.178.4.54:3007/search/getUser',
        data: {
            keyWord: value,
            page: 1,
            size: 10
        },
        success: function (response) {
            let string = ''
            for(let i = 0; i < response.data.userList.length; i++){
                string+=`
                <div class="search-user-box1" authorId="${response.data.userList[i].authorId}">
                            <div class="search-user-pic"><img src="${response.data.userList[i].avatar}" alt="" class="search-user-pics" authorId="${response.data.userList[i].authorId}"></div>
                            <div class="userName_intro">
                            <div class="search-user-name">${response.data.userList[i].username}</div>
                            <div class="search-user-intro">${response.data.userList[i].intro}</div>
                        </div>
                        </div>`
            }
            document.querySelector('.search-main2-user').innerHTML=string
            search_userResult_click()
        }
        }
        // 发起请求
        GetAndPost(postSearchuser)
}
//给用户结果点击绑定事件
function search_userResult_click(){
    let userBox = document.querySelectorAll('.search-user-box1')
    for(let i = 0; i < userBox.length; i++){
        userBox[i].addEventListener('click',function(){
            search.style.display='none'
            other.style.display='block'
            showother(this.getAttribute("authorId"))
        })
    }
}
//给文章结果绑定点击事件
function search_eassyResult_click(){

    let eassyBox = document.querySelectorAll('.artical-box-pic')
    for(let i = 0; i < eassyBox.length; i++){
        eassyBox[i].addEventListener('click',function(){
            search.style.display='none'
            article.style.display='block'
            showarticle(this.getAttribute("articleId"))
        })
    }
    let eassy_icon = document.querySelectorAll('.artical-foot-icon')
    for(let j = 0; j < eassy_icon.length; j++){
        eassy_icon[j].addEventListener('click',function(e){
            if (e.target.style.color === 'rgb(128, 124, 124)') {
                postLike(e.target.getAttribute('articleId'), e.target)
            } else if (e.target.style.color === 'rgb(253, 55, 72)') {
                cancleLike(e.target.getAttribute('articleId'), e.target)
            } else {
                console.log("查询错误11111")
            }
        })
    }
    let eassy_user_avatar = document.querySelectorAll('.artical-foot-pics')
    for(let k = 0; k < eassy_user_avatar.length; k++){
        eassy_user_avatar[k].addEventListener('click',function(){
            search.style.display='none'
            other.style.display='block'
            showother(this.getAttribute("authorId"))
        })
    }
}


//给标签结果绑定点击事件(有bug)
function search_tagResult_click(){
    let tagBox = document.querySelectorAll('.search-tag-body')
    for(let i = 0; i < tagBox.length; i++){
        tagBox[i].addEventListener('click',function(e){
            document.querySelector('.search-tag-body').style.display='none'
            document.querySelector('.search-bigbox-dispaly2').style.display='block'
            document.querySelector('.search-bigbox-dispaly2').innerHTML=''
            get_tag_article(e.target.getAttribute("label"))
        })
    }
}
//获取标签的对应文章
function get_tag_article(label){
    let getTagArticle_detial ={
        method: 'get',
        url: 'http://175.178.4.54:3007/search/getArticleByLabel',
        data: {
            label:label,
            page:1,
            size:10
        },
        success: function (response) {
            let cnode = document.createElement("div");
            cnode.setAttribute("class", "search-tag2-artical");
            for(let i = 0; i < response.data.articleList.length; i++){
            cnode.innerHTML = `
            <div class="search-main1-artical_bigbox">
                        <div class="artical-box1">
                            <div class="artical-box-pic" articleId="${response.data.articleList[i].articleId}"><img src="${response.data.articleList[i].cover[0]}" alt="" class="artical-box-pics"></div>
                            <div class="artical-box-title">${response.data.articleList[i].title}</div>
                            <div class="artical-box-foot">
                                <div class="artical-foot-pic"><img src="${response.data.articleList[i].avatar}" alt="" class="artical-foot-pics" authorId="${response.data.articleList[i].authorId}"></div>
                                <div class="artical-foot-author">${response.data.articleList[i].username}</div>
                                <div class="artical-foot-icon" style="color:rgb(128,124,124)" articleId="${response.data.articleList[i].articleId}"></div>
                                <div class="artical-foot-like">${response.data.articleList[i].fanNum}</div>
                            </div>
                            </div>
                            </div>
                        `
                    }
                    document.querySelector('.search-bigbox-dispaly2').appendChild(cnode)
                    // console.log(document.querySelector('.artical-foot-icon'))
                    let artical_foot_icon = document.querySelectorAll(".artical-foot-icon")
                    // console.log(artical_foot_icon.length)
                    getLikeArticle(likPparamsObj)
                    for (let i = 0; i < artical_foot_icon.length; i++) {
                        let articleId =artical_foot_icon[i].getAttribute('articleId')
                        for(let k =0;k<like_num;k++){
                        if (likeArticleList[k] == articleId) {
                            artical_foot_icon[i].style.color = 'rgb(253,55,72)'
                            break
                        }else{
                            artical_foot_icon[i].style.color = 'rgb(128,124,124)'
                        }
                    }
                    }
                    search_eassyResult_click()
                    }
                
                    
        }
        // 发起请求
        GetAndPost(getTagArticle_detial)
}

//实现最近搜索的历史记录渲染
function search_history_get(){
    let history_content = document.querySelector('.history_content')
    let cnode = document.createElement("li");
            cnode.setAttribute("class", "history-li");
            cnode.innerHTML = `${document.querySelector('.search-head-main').value}`
            cnode.setAttribute("vale-li", `${document.querySelector('.search-head-main').value}`);
                    history_content.appendChild(cnode)
                    search_history_post()
}
function search_history_post(){
    let liBox = document.querySelectorAll(".history-li")
    for(let i = 0;i<liBox.length;i++){
        liBox[i].addEventListener('click',function(){
            document.querySelector('.search-head-main').value=liBox[i].getAttribute("vale-li")
            document.querySelector('.search_history').style.display='none'
            document.querySelector('.search-main-boxs').style.display='none'
            document.querySelector('.search-bigbox-dispaly2').style.display='none'
            document.querySelector('.search-main-head').style.display='block'
            document.querySelector('.search-tag-bigbox').style.display='block'
            document.querySelector('.search-main-head .active').classList.remove('active')
            document.querySelector('.search-head1-label').classList.add('active')
            search_history_get()
            show_tag_search()
        })
    }
}
//点击取消返回首页
document.querySelector(".cancel-head-box3").addEventListener('click',function(){
    search.style.display="none"
    remove_recommend()
    paramsObj.data.page = 1
    recommend_tag(paramsObj)
    homepage.style.display="block"

})
//点击删除小图标
document.querySelector(".search .delect_icon").addEventListener('click',function(){
    document.querySelector(".search .history_content").innerHTML=''

})

//
// search_head_main.addEventListener('keydown',function(){
//     // console.log('您已经按下键盘')
// })
//