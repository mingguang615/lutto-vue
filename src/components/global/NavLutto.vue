<template>
  <div>
    <!------------------------导航部分---------------------->
    <nav class="navbar navbar-default" style="position: fixed;z-index: 500;width: 100%">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" id="log-name" href="#/">
            <img src="../../assets/index_images/Lotto-log.png" style="width: 60px;margin-left: 50px;position:relative;top: -10px;">
            <span style="position: relative;top: -40px;left: 120px;margin-right: 150px;color: white"><router-link to="/">Lutto</router-link></span>
          </a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse text-left" id="bs-example-navbar-collapse-1" style="overflow:hidden">
          <ul class="nav navbar-nav">
            <li class="hidden-lg hidden-md hidden-sm right-nav">
              <router-link to="/login">登陆 | 注册</router-link>
            </li>
            <li><router-link to="/actionlibrary">动作库</router-link></li>
            <li><router-link to="/course">特色课程</router-link></li>
            <li><router-link to="/mall">积分商城</router-link></li>
            <li><router-link to="/user">关于我们</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-xs login-regist" v-if="chk_login">
            <li style="margin-right: 12px;line-height: 50px;cursor: pointer" @click="go_cart"><img src="../../assets/cart.svg" title="购物车"></li>
            <li style="margin-right: -4px">
              <router-link to="/login">登陆</router-link>
            </li>
            <li style="position:relative;top:14px;color: #c6c6c6">|</li>
            <li style="margin-right: 20px">
              <router-link to="/regist">注册</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-xs" v-if="!chk_login">
            <li style="margin-right: 125px;line-height: 50px;cursor: pointer" @click="go_cart"><img src="../../assets/cart.svg" alt=""></li>
            <li style="line-height: 50px;color: #d0d0d0;margin-right: 50px;cursor: pointer;display: flex">
              <div class="aaa" @click="show_user">
                <a v-text="tel" class="tel"></a>
                <ul class="hid" v-if="show">
                  <li><router-link to="/mycourse" style="color: gray!important;">个人中心</router-link></li>
                  <li><router-link to="/basic" style="color: gray!important;">编辑资料</router-link></li>
                  <li><router-link to="/order" style="color: gray!important;">我的订单</router-link></li>
                  <li><a style="color: gray!important;" @click="qiandao">每日签到</a></li>
                </ul>
              </div>
              <div @click="quit_login" class="quit_login">退出</div>
            </li>
          </ul>
          <ul style="margin-left: 1200px;padding-top: 10px"></ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div id="add-qiandao" v-text="show_qiandao_text"></div>
    <!------------------------导航部分---------------------->

    <!--&lt;!&ndash; data-backdrop="false"去除遮罩层  &ndash;&gt;-->
    <!--<div class="modal fade bd-example-modal-sm"  id="myModal" role="dialog" data-backdrop="false"  aria-hidden="true">-->
      <!--<div class="modal-dialog modal-sm">-->
        <!--<div class="modal-content">-->
          <!--<p class="text-center mb-0">-->
            <!--<span class="fa fa-check-circle text-success mr-1" aria-hidden="true" v-text="qiaodao_info"></span>-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'nav_lutto',

    data () {
      return {
        tel:"",
        chk_login:true,//true未登录
        show : false,
        show_qiandao_text:""//签到提示信息
      }
    },

    created:function(){
      //刷新导航栏
      this.$emit('flushnav')
    },

    mounted:function () {
      this.tel = window.sessionStorage.getItem("username")
      this.check_login();
    },

    methods:{

      //显示用户名
      show_user:function(){
        if(this.show==false){
          this.show=true
        }else{
          this.show=false
        }
      },

      //检查登陆状态
      check_login:function () {
        this.tel = window.sessionStorage.getItem("username");
        if (this.tel){
          this.chk_login=false;
        }
      },

      //退出登陆
      quit_login:function () {
        //未登陆状态设置为true
        this.chk_login=true;
        //移除sessionStorage中的username
        window.sessionStorage.removeItem("username")
        //移除sessionStorage中的token
        window.sessionStorage.removeItem("token")
      },

      //签到
      qiandao:function (e) {
        let vm = this;
        let vme = e
        let data1={
          headers:{"token":window.sessionStorage.getItem("token")},
        };
        let token=window.sessionStorage.getItem('token');
        if(token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/qiandao/'
          }).then(function (response) {
            let code=response.data.code
            let add_suc = document.getElementById("add-qiandao")
            //428今天已经签到过了
            if(code=='428'){
              vm.show_qiandao_text = "今天已经签到过了"
            //  220签到成功
            }else if(code == "220"){
              vm.show_shoucang_text = "签到成功"
              //刷新页面
              location.reload()
            }
            add_suc.style.opacity = 1
            let aa = setInterval(function () {
              add_suc.style.opacity -= 0.01
              if(add_suc.style.opacity == 0){
                clearInterval(aa)
              }
            },10)
            // $('#myModal').modal('show');
            // setTimeout(function(){
            //   $("#myModal").modal("hide")
            // },1200);
          })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //到购物车
      go_cart:function () {
        let token = window.sessionStorage.getItem("token")
        if(token){
          this.$router.push({path: '/cart',});
        }else {
          window.sessionStorage.setItem("from","/cart")
          this.$router.push({path: '/login',});
        }
      },

    }
  }
</script>

<style scoped>

  .modal-content {
    margin-top: 60px;
    margin-left: 600px;
    width: 120px;
    height: 30px;
    line-height: 30px;
  / / 宽度自适应内容 width: fit-content;
  // 流出间隙
  padding: 0.2rem 0.4rem;
  }

  /*-------------导航部分---------------*/
  .navbar{
    background:#202023;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
  .navbar a{
    color: #b1b1b1 !important;
  }
  .navbar .container-fluid a:hover{
    color: #e9e9e9 !important;
    text-decoration: none;
  }
  .quit_login:hover{
    color: #ff332c;
  }
  /*------------------------导航部分------------------------*/
  .tel{
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-left: -100px;
  }
  .hid{
    list-style: none;
    position: absolute;
    margin-left: -150px;
    z-index: 1 !important;
  }
  .hid li{
    height: 30px;
    width: 100px;
    background: white;
    border: solid 1px lightgray;
    border-top: none;
    font-size: 13px;
    text-align: center;
    line-height: 30px;
  }
  #add-qiandao{
    /*overflow: hidden;*/
    z-index: 700;
    height: 32px;
    position: fixed;
    top: 60px;
    font-weight: 600;
    right: 75px;
    font-size: 1.2em;
    border-radius: 4px;
    opacity: 0;
    line-height: 20px;
    color: red;
  }

</style>
