(function (doc) {
    var Wapper = function (op) {
        this.el = doc.getElementById(op.el)
        this.el_itemClassName = op.el_itemClassName
        this.colum = op.colum
        this.gap = op.gap
       // 1.首先获取到每个照片外层盒子 也就是wr_item 的宽度
       this.wr_item_w = (this.el.offsetWidth - (this.colum - 1) * this.gap) / this.colum
        this.pageNum = 1
        this.hightArr = []
        this.pageSize = 4
        this.type = op.type
    }
    Wapper.prototype = {
    init() {
    this.getPartList(this.pageNum)
    this.bindEvetn()
    },
    getPartList(pageNum) {
    var _this = this;
    var list = [];
    let paramsObj = { 
        type : '推荐',
        number : pageNum,
        size : 10
        }
        
    let xhr = new XMLHttpRequest();
   //调用open函数
    xhr.open('get', 'http://175.178.4.54:3007/article/getArticle?type='+_this.type+'&size=10&page=' + pageNum)
   //调用send函数
    xhr.send()
   //监听事件
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           //获取成功
            if (xhr.responseText) {
                list = JSON.parse(xhr.responseText).data.articleList;
                _this.render(list)
                console.log(xhr.responseText)
            }
        }
    }
},
render(partList) {
   // 只有数据存在才进行下面的操作
    if (partList) {
    partList.forEach((li, index) => {
    const o_item = document.createElement('div')
     // 这里要给o_item设置高度
     // 不要想着用img撑开，这样做会导致不能够获取到o_item的offsetWidth
     // 注意dom添加一个节点后，你是不能马上获取到其一些宽高的，
     // 所以后端在返回数据的时候要给出高度
    const imgW = li.width
    const imgH = li.height
    o_item.style.width = this.wr_item_w + 'px'
     // 高度等于 盒子宽度x图片高度/图片宽度
     const oitemH = (this.wr_item_w * imgH) / imgW
    o_item.style.height = oitemH + 'px'
    o_item.className = this.el_itemClassName
    const img = new Image()
    img.src = li.avatar

     // 注意这里好像不能直接设置透明度，最好加个定时器触发重绘
     // img.style.opacity = '1'
    o_item.innerHTML = '<div class="recommend-box1"><div class="recommend-box-pic"></div><div class="recommend-box-title">'+li.title+'</div><div class="recommend-box-foot"><div class="recommend-foot-pic"><img src="image/1.jpg" alt="" class="recommend-foot-pics"></div><div class="recommend-foot-author">'+li.username+'</div><div class="recommend-foot-icon"></div><div class="recommend-foot-like"></div></div></div>'
    o_item.getElementsByClassName('recommend-box-pic')[0].appendChild(img)
    this.el.appendChild(o_item)
     // 设置第一行 
     // 必须是第一页的数据
        if (index < this.colum && this.pageNum === 1) {
        this.hightArr.push(o_item.offsetHeight)

        o_item.style.top = '0'

        if (index + 1 % this.colum === 0) {
       // 说明这是第一个
        o_item.style.left = '0'
        } else {
       o_item.style.left = index * (this.wr_item_w + this.gap) + 'px'
        }

        } else {
        const items = this.el.getElementsByClassName(this.el_itemClassName)
        const minIndex = getMinIdx(this.hightArr)
        const c_item = items[minIndex]
            
        o_item.style.left = c_item.offsetLeft + 'px'
        o_item.style.top = this.hightArr[minIndex] + this.gap + 'px'
        this.hightArr[minIndex] += (o_item.offsetHeight + this.gap)
        }
        img.style.opacity = '1'

    })
    this.el.style.height = '500' + 'px'
    }
},
    bindEvetn() {
    var that = this
    window.addEventListener('scroll', function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollHeight + scrollTop + 50 >= clientHeight) {
            if (that.pageNum < 2) {
                that.pageNum++;
                that.getPartList(that.pageNum)
            }
        }
    }, true)
}
}


 // 找最小下标
function getMinIdx(arr) {
    const minHeight = Math.min.apply(null, arr)
    return [].indexOf.call(arr, minHeight)
}
 // 找最大
function getMaxIdx(arr) {
    const maxHeight = Math.max.apply(null, arr)
    return [].indexOf.call(arr, maxHeight)
}

window.Wapper = Wapper

})(document)