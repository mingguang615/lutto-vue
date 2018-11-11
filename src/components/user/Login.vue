<template>
  <div class="container">
    <div class="color">
      <div class="login">
        <div class="login-top">
          <div class="login-top-one">
            <div class="border-login"><router-link to="login">登陆</router-link></div>
            <div class="border-regist"><router-link to="regist">注册</router-link></div>
          </div>
          <div class="login-top-two">
            <input type="text" value="+86" class="country-input" style="text-align: center">
            <div class="line">|</div>
            <input type="text" placeholder="请输入用户名" class="tel-input" v-model="tel">
            <div id="checkphone"></div>
          </div>

          <div class="login-top-three">
            <div class="div01">
              <div class="lock"><img src="../../assets/user/lock.svg" alt="lock"></div>
            </div>
            <input type="password"  placeholder="请输入密码" class="password-input" v-model="pwd" @keyup.enter="login">
            <div id="warning" class="login-fail" v-text="prefsession">
            </div>
            <input type="button" class="ok" value="登录" @click="login">
          </div>
        </div>
        <div class="login-bottom">
          <div class="write">其他方式登录：</div>
          <div class="weibo"><a href="#"><img src="../../assets/user/weibo.svg" alt="微博"></a></div>
          <div class="qq"><a href="#"><img src="../../assets/user/QQ.svg" alt="QQ"></a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  export default {
    name: 'Login',
    data () {
      return {
        tel:'', //用户名
        pwd:'',//用户名密码
        prefsession:"",//登陆状态信息
      }
    },
    mounted:function(){
      //窗口位置置坐标0，0
      window.scrollTo(0, 0);
    },
    methods:{
      login:function () {
        let vm = this;
        let user = {
          "telephone":this.tel,
          "password":this.pwd
        };
        axios({
          method:"post",
          data:user,
          url:this.GLOBAL.HOST+"user/login/"
          //  请求成功
        }).then(function (resp) {
          //将请求到的数据code赋值给code
          let code = resp.data.code;
          if(code == "201"){
            //提示信息置空
            vm.prefsession = "";
            // 登陆成功后将token存到sessionStorage中
            window.sessionStorage.setItem('token',resp.headers.token);
            //登陆成功后将用户名存到sessionStorage中
            window.sessionStorage.setItem('username',resp.data.telephone);
            //跳转路由
            vm.$router.push(window.sessionStorage.getItem('from'))
          }else if(code == "405"){
            vm.prefsession = "用户不存在";
          }else if(code == "402"){
            vm.prefsession = "密码错误";
          }else {
            vm.prefsession = "no";
          }
          //  请求失败
        }).catch(err=> {
          console.log(err.code)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    /*去除超链接下划线*/
    text-decoration: none;
    color: white;
  }
  .container{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .color{
    height: 675px;
    background: #3d3743;
    position: relative;
    top: -20px;
    padding-top: 80px;
  }
  .container .login{
    width: 460px;
    height: 370px;
    margin: auto;
    background-color: #584f60;
    border-radius: 10px;
  }
  /*--------------登录框顶部开始----------------*/
  .container .login-top{
    width: 460px;
    height: 300px;

  }
  .container .login-top .login-top-one{
    width: 460px;
    height: 76px;
  }
  .container .login-top .login-top-one>div{
    float: left;
    width: 45px;
    height: 40px;
    position: relative;
    top: 20px;
    left:20px;
    font-size: 18px;
    color: white;
  }
  .border-login{
    border-bottom: solid 1px white;
  }
  .border-regist{
    margin-left: 30px;
  }
  .container .login-top .login-top-one>div:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .container .login .login-top .login-top-two{
    width: 405px;
    height: 52px;
    margin: auto;
    position: relative;
    top: 5px;
  }
  .container .login .login-top .login-top-two #checkphone{
    text-align: center;
    color: red;
  }

  .container .login-top .login-top-two .country-input{
    width: 50px;
    height: 50px;
    border: none;
    font-size: 15px;
    float: left;
    background: #453d4b;
    /*color: white;*/
    color: rgba(128, 128, 128, 0.59);
  }
  .container .login-top .login-top-two .line{
    width: 55px;
    height: 50px;
    background: #453d4b;
    float: left;
    line-height: 50px;
    color: rgba(128, 128, 128, 0.59);
  }
  .container .login-top .login-top-two .tel-input{
    width: 300px;
    height: 50px;
    border: none;
    font-size: 15px;
    float: right;
    background: #453d4b;
    color: white;
  }
  .container .login-top .login-top-two input:focus{
    outline-style: none;
  }
  .container .login .login-top .login-top-three{
    width: 405px;
    height: 50px;
    margin: auto;
    position: relative;
    top: 35px;

  }
  .container .login .login-top .login-top-three .div01{
    width: 105px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    background: #453d4b;
  }
  .container .login .login-top .login-top-three .div01 .lock{
    width: 25px;
    height: 25px;
    /*background: url("D:\vue-project\vue_lottoapp\src\assets\imgs\lock.svg");*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    left: -25px;
  }
  .container .login .login-top .login-top-three .password-input{
    width: 300px;
    height: 50px;
    float: right;
    background: #453d4b;
    border: none;
    color: white!important;
    font-size: 15px;
  }
  .container .login .login-top .login-top-three .password-input:focus{
    outline-style: none;

  }
  .login-fail{
    /*width: 100px;*/
    height: 50px;
    color: #ff3e31;
    font-size: 1.1em;
    line-height: 40px;
    margin: auto;
  }
  .container .login .login-top .login-top-three .ok{
    width: 405px;
    height: 55px;
    margin: auto;
    margin-top: 20px;
    position: relative;
    top: 15px;
    border-radius: 50px;
    border: none;
    background-color: #31a56e;
    font-size: 20px;
  }
  .container .login .login-top .login-top-three .ok:hover{
    cursor: pointer;
    background: #30945e;
  }
  .container .login .login-top .login-top-three .ok:focus{
    outline-style: none;
  }
  /*-------------登录框顶部结束--------------*/
  /*--------------登录框底部开始----------------*/
  .container .login .login-bottom{
    width: 460px;
    height: 60px;
    background-color: #dddddd;
    margin-top: 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .container .login .login-bottom .write{
    position: relative;
    width: 200px;
    height: 20px;
    font-size: 15px;
    left:50px;
    top: 15px;
  }
  .container .login .login-bottom .weibo{
    width: 15px;
    height: 15px;
    padding-left: 210px;
    margin-top: -5px;
  }
  .container .login .login-bottom .qq{
    width: 15px;
    height: 15px;
    padding-left: 240px;
    margin-top: -15px;
  }
</style>
