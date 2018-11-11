<template>
  <div class="container">
    <div class="back-color">
      <div class="register">
        <div class="register-top">
          <div class="register-top-one">
            <div><router-link to="login">登陆</router-link></div>
            <div class="border-regist"><router-link to="regist">注册</router-link></div>
          </div>
          <div class="register-top-two">
            <input type="text" value="+86" class="country-input" style="text-align: center">
            <div class="line">|</div>
            <input type="text" placeholder="用户名" id="tel" class="tel-input" v-model="username">
            <div id="checkphone"></div>
          </div>
          <div class="register-top-three">
            <div class="div01">
              <div class="lock"><img src="../../assets/user/lock.svg" alt=""></div>
            </div>
            <input type="password" placeholder="密码" class="password-input" id="pwd" v-model="pwd">
          </div>
          <div class="register-top-four">
            <div class="div02">
              <div class="log"><img src="../../assets/user/lock.svg" alt="lock"></div>
            </div>
            <input type="password" placeholder="确认密码" class="user-id-input" id="confirm-pwd" v-model="confirm_pwd" @keyup.enter="register">
          </div>
          <div id="warning">
          </div>
          <div class="register-top-five" v-text="prefsession">
          </div>
          <div class="register-top-six">
            <input type="button" class="ok" value="注册" @click="register">
          </div>
        </div>
        <div class="register-bottom">
          <div class="register-bottom-connect">注册即表示同意「Lutto」 <a href="####" class="user-protocol">用户协议</a> 和 <a href="####" class="user-privacy">隐私政策</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is Register',
      username:"",
      pwd:"",
      confirm_pwd:"",
      //登陆状态
      prefsession:"",
    }
  },
  mounted:function(){
    //窗口位置置坐标0，0
    window.scrollTo(0, 0);
  },
  methods:{
    register:function () {
      var vm = this;
      let user = {
        "telephone":vm.username,
        "password":vm.pwd,
        "passwords":vm.confirm_pwd
      };
      //判断用户输入的注册名和密码是否合法
      if (vm.username.trim().length>=11 && vm.username.trim().length<=15 && vm.pwd.trim().length>=10 && vm.confirm_pwd.trim().length>=10){
        if (vm.pwd.trim() == vm.confirm_pwd.trim()){
          axios({
            //请求方式为post
            method: 'post',
            url:this.GLOBAL.HOST+'user/regist/',
            //请求发送的数据user
            data:user
          }).then(function (resp) {
            console.log(resp.data)
            //判断返回的code203为注册成功
            if (resp.data.code == "203"){
              vm.prefsession = "";
              //获取headers中的token并存到sessionStorage中
              window.sessionStorage.setItem('token',resp.headers.token);
              //登陆成功后将用户名存到sessionStorage中
              window.sessionStorage.setItem('username',resp.data.telephone);
              //跳转路由
              // vm.$router.push({name: 'index', params: {gid: "111"},});
              vm.$router.push(window.sessionStorage.getItem("from"));
              //  407为用户注册的两次密码不一致
            }else if (resp.data.code == "407"){
              vm.prefsession = "两次密码不一致！";
              //  用户名已经存在
            }else if (resp.data.code == "408"){
              vm.prefsession = "用户已存在！";
              //  注册失败
            }else{
              vm.prefsession = "注册失败！";
            }
          }).catch(err => {
              console.log('请求失败:' + err.code)
            }
          );
        }else {
          vm.prefsession = "两次密码不一致!"
        }
      }else if(vm.username.trim().length<11 || vm.username.trim().length>=15){
        vm.prefsession = "请输入用户合法的用户名";
      }else if(vm.pwd.trim().length<10 && vm.confirm_pwd.trim().length<10) {
        vm.prefsession = "密码不安全,请输入大于10位的密码!";
      }else {
        vm.prefsession = "用户名或密码不合法";
      }
    }
  }
}
</script>

 <!--Add "scoped" attribute to limit CSS to this component only -->
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
  .container .back-color{
    background-color: #3d3743;
    height: 675px;
    position: relative;
    top: -20px;
    padding-top: 80px;
  }
  .container .register{
    width: 460px;
    height: 480px;
    margin: auto;
    background-color: #584f60;
    border-radius: 10px;

  }
  /*--------------注册框顶部开始----------------*/
  .container .register-top{
    width: 460px;
    height: 300px;
  }
  .container .register-top .register-top-one{
    width: 460px;
    height: 76px;
  }
  .container .register-top .register-top-one>div{
    float: left;
    width: 45px;
    height: 40px;
    position: relative;
    top: 20px;
    left:20px;
    font-size: 18px;
    color: white;
  }
  .border-regist{
    border-bottom: solid 1px white;
    margin-left: 30px;
  }
  .container .register-top .register-top-one>div:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .container .register .register-top .register-top-two{
    width: 405px;
    height: 52px;
    margin: auto;
    position: relative;
    top: 5px;
  }

  .container .register .register-top .register-top-two #checkphone{
    text-align: center;
    color: red;
  }
  .container .register-top .register-top-two .country-input{
    width: 50px;
    height: 50px;
    border: none;
    font-size: 15px;
    float: left;
    background: #453d4b;
    /*color: white;*/
    color: rgba(128, 128, 128, 0.59);
  }
  .container .register-top .register-top-two .line{
    width: 55px;
    height: 50px;
    background: #453d4b;
    float: left;
    line-height: 50px;
    color: rgba(128, 128, 128, 0.59);
  }
  .container .register-top .register-top-two .tel-input{
    width: 300px;
    height: 50px;
    border: none;
    font-size: 15px;
    float: right;
    background: #453d4b;
    color: white;
  }
  .container .register-top .register-top-two input:focus{
    outline-style: none;
  }
  .container .register .register-top .register-top-three{
    width: 405px;
    height: 50px;
    margin: auto;
    position: relative;
    top: 35px;
  }
  .container .register .register-top .register-top-three .div01{
    width: 105px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    background: #453d4b;
  }
  .container .register .register-top .register-top-three .div01 .lock{
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    left: -25px;
  }
  .container .register .register-top .register-top-three .password-input{
    width: 300px;
    height: 50px;
    float: right;
    background: #453d4b;
    border: none;
    color: white;
    font-size: 15px;
  }
  .container .register .register-top .register-top-three .password-input:focus{
    outline-style: none;
  }
  .container .register .register-top .register-top-four{
    width: 405px;
    height: 50px;
    margin: auto;
    position: relative;
    top: 70px;
  }
  .container .register .register-top .register-top-four .div02{
    width: 105px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    background: #453d4b;
  }
  .container .register .register-top .register-top-four .div02 .log{
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    left: -25px;
  }
  .container .register .register-top .register-top-four .user-id-input{
    width: 300px;
    height: 50px;
    float: right;
    background: #453d4b;
    border: none;
    color: white;
    font-size: 15px;
  }
  .container .register .register-top .register-top-four .user-id-input:focus{
    outline-style: none;
  }
  .container .register .register-top .register-top-five{
    width: 261px;
    height: 50px;
    margin: auto;
    color: #ff2a25;
    font-size: 1.1em;
    position: relative;
    top: 85px;
  }
  .container .register .register-top .register-top-six {
    width: 405px;
    height: 20px;
    margin: auto;
    background: #2aabd2;
  }
  .container .register .register-top .register-top-six .ok{
    width: 405px;
    height: 55px;
    margin: auto;
    position: relative;
    top: 80px;
    border-radius: 50px;
    border: none;
    background-color: #31a56e;
    font-size: 20px;
  }
  .container .register .register-top .register-top-six .ok:hover{
    cursor: pointer;
  }
  .container .register .register-top .register-top-six .ok:focus{
    outline-style: none;
  }
  .container .register .register-bottom{
    width: 460px;
    height: 60px;
    background-color: #dddddd;
    position: relative;
    top: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .container .register .register-bottom .register-bottom-connect{
    width: 280px;
    height: 13px;
    line-height: 13px;
    font-size: 0.8em;
    margin: auto;
    color:#6f6e6f;
  }
  .container .register .register-bottom .register-bottom-connect .user-protocol{
    text-decoration: none;
    color:#6f6e6f;
  }
  .container .register .register-bottom .register-bottom-connect .user-privacy{
    text-decoration: none;
    color:#6f6e6f;
  }
</style>
