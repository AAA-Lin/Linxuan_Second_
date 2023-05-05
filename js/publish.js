// 获取元素
let publish_head_back = document.querySelector('.publish-head-back')
let home_foot_publish = document.getElementsByClassName('home-foot-publish')
let publish_title = document.querySelector('.publish-title')
let publish_maintext = document.querySelector('.publish-maintext')
let upload_file = document.querySelector('.upload-file')
let upload_imgs = document.querySelector('.upload-imgs')
let btn_topic = document.querySelector('.btn-topic')
let topic_box = document.querySelector('.topic-box')
let publish_tag_mask = document.querySelector('.publish-tag-mask')
let tag_cancle = document.querySelector('.tag-cancle')
let tag_ensuer = document.querySelector('.tag-ensuer')
let publish_tag = document.querySelector('.publish-tag')
let publish_foot = document.querySelector('.publish-foot')
// 点击返回后回到首页部分
publish_head_back.addEventListener('click', function () {
    publish.style.display = 'none'
    homepage.style.display = 'block'
    document.querySelector('.home-foot .active').classList.remove('active');
    home_foot_page.classList.add('active')
})


// 标签输入盒子
btn_topic.addEventListener('click', function () {
    topic_box.style.display = 'block'
    publish_tag_mask.style.display = 'block'

})
tag_cancle.addEventListener('click', function () {
    publish_tag.value = ''
    topic_box.style.display = 'none'
    publish_tag_mask.style.display = 'none'
})
tag_ensuer.addEventListener('click', function () {
    topic_box.style.display = 'none'
    publish_tag_mask.style.display = 'none'

})
let pic_url = []
// 上传图片后显示图片
function previewFile() {
    pic_url = []
    let preview = document.querySelector('.upload-imgs')
    preview.style.display = 'block'
    let fileDom = document.querySelector('.upload-file')
    let file = fileDom.files[0]
    pic_url[0] = file
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        fileDom.files[0]=''
        return false
    }
    let imgUrl = window.URL.createObjectURL(file)
    preview.setAttribute('src', imgUrl)
    preview.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }

    // 发布文章
    publish_foot.addEventListener('click', function () {
        let optionsparamsObj = {
            method: 'POST',
            url: "http://175.178.4.54:3007/article/publish",
            data: {
                img: pic_url[0],
                title: publish_title.value,
                content: publish_maintext.value,
                label: publish_tag.value
            },

            success: function (response) {
                preview.src = ''
                preview.style.display = 'none'
                publish.style.display = 'none'
                // 将刚刚的内容清空
                publish_title.value = ''
                publish_maintext.value = ''
                publish_tag.value = ''
                preview.src = ''
                
                homepage.style.display = 'block'
                alert("发布成功")
            }
        }
        // 发起请求
        GetAndPost(optionsparamsObj)
    })
}
