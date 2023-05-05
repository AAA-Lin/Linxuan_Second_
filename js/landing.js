
let land_pass = document.querySelector('#landing-btn')
let userName = document.querySelector('#username')
let passWord = document.querySelector('#password')
let landing = document.querySelector('.landing')
let homepageOne = document.querySelector('.homepage')
let agree = document.querySelector('.land-agree input')
let userSelfName = ""

let othersId = ''
// 点击登录
land_pass.addEventListener('click', function (e) { 
    e.stopPropagation()
    let landings = {   
        method: 'post' ,
        url:'http://175.178.4.54:3007/user/login',
        data: {
            username: userName.value,
            password: passWord.value
        },
        success: function(res){
            // alert('密码正确')
            userName.value = ''
            passWord.value = ''
            // landing.style.display = 'none'
            // homepageOne.style.display = 'block'
            yourId = res.data.id
            window.sessionStorage.setItem("token", res.data.token)
            window.sessionStorage.setItem("yourId", res.data.id)
            // console.log(yourId)
            landing.style.display="none";
            homepageOne.style.display="block";
            lis_homeHeadClass[0].click()
            showcenter()
        }
    }
    if(userName.value.trim() === ''|| passWord.value.trim() === ''){
        alert('不可输入空信息')
    }else if(agree.checked === false){
        alert('请先阅读并同意《用户协议》')
    }else{
        land(landings)
    }
    })

//发起请求
function land(landings) {
    let xhr= new XMLHttpRequest()
    const qs = resolveData(landings.data)
    const formData = new FormData();
    for (let k in landings.data) {
        formData.append(k, landings.data[k]);
    }
    
    if(landings.method.toUpperCase() === 'GET'){
        xhr.open(landings.method, landings.url + '?' + qs)
        xhr.send()
    }
    else if(landings.method.toUpperCase() === 'POST'){
        xhr.open(landings.method, landings.url)
        xhr.send(formData)
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 &&xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            if(result.status === 200){
                // var result = JSON.parse(xhr.responseText)
                landings.success(result)
                alert("登录成功~")
            }
            if(result.status === 400){
                userName.value = ''
                passWord.value = ''
                alert("用户名或密码错误")
        }
    }
    }
};


