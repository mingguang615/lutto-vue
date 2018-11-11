<template>
  <div>
    <Header></Header>

    <div class="row">

      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div><router-link to="/basic">身体素质</router-link>
          </div>
          <div><router-link to="/phone">修改绑定</router-link></div>
          <div><router-link to="/address">添加地址</router-link></div>
          <div><router-link class="editior" to="/password">修改密码</router-link></div>
        </div>
        <div class="col-lg-12 main-body-bottom">
          <!--<Modal_password v-show="ModalVisible" style="position: absolute; top:-10%; left: 10%" @close="closeModal"/>-->
          <div class="width" >
            <section class="repair">
              <!--<div class="tip">设置后台登陆密码后PC段和移动端为同一个登陆密码</div>-->
              <div class="repair-requre">
                <form >
                  <!--@submit.prevent="changePwd"-->
                  <div class="repair-row">
                    <div class="label">
                      <label for="">新密码</label>
                    </div>
                    <div class="text">
                      <input type="password" v-model="password" @keyup="samepwd" placeholder="输入新密码" />
                    </div>
                  </div>
                  <div class="repair-row">
                    <div class="label">
                      <label for="">确认密码</label>
                    </div>
                    <div class="text">
                      <input type="password" v-model="password2" @keyup="samepwd" placeholder="再次输入密码" />
                    </div>
                  </div>
                  <div class="submit-row">
                    <div class="filter-foot">
                      <div class="cancel">
                        <button type="reset" class="filter-show">取消</button>
                      </div>
                      <div class="sure" @click="updatepas">
                        <button type="submit" :class="{'filter-sure':true, disable:subable}" :disabled="subable">确认</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tip font1">
                {{warning}}
                <!--密码 （密码必须以字母开头，长度在6-18之间，只能包含字母、数字和下划线）-->
                <!--<p>-->
                <!--<a href="tel:15882084312">忘记旧密码？</a>-->
                <!--</p>-->
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
    <motal_lutto v-show="isModalVisible" @close="closeModal"/>
  </div>
</template>

<script>
  import Header from './top'
  import Modal_password from './Modal_password'
  import axios from 'axios'
  export default{
    name: 'collect',
    components:{Header,Modal_password},
    data(){
      return {
        // //原密码验证模态框
        // ModalVisible:true,

        //修改成功模态框
        isModalVisible: false,
        subable:true,
        password:'',
        password2:'',
        warning:"注：  两次密码要输入一致，小心不要输错哦~",
        token:window.sessionStorage.getItem("token")
      }
    },
    created:function(){
      this.$emit('flushnav')
    },
    methods:{
      //模态框部分
      showModal: function () {
        this.isModalVisible = true
      },
      closeModal: function () {
        this.isModalVisible = false
      },
      samepwd:function(){
        if(this.password.trim().length>0){
          if (this.password.trim().length>10){
            if (this.password == this.password2){
              this.subable = false; //两次密码一致，取消禁用
            }else{
              this.subable = true;
              this.warning='注：  啊啊~'
            }
          } else {
            this.warning='注：  为了账号安全，密码不能少于10位哦~'
          }
        }else{
          this.warning='注：  先输入密码呀！~'
        }
      },
      updatepas: function () {
        var vm = this;
        let data1={
          headers:{"token":vm.token},
          "password":vm.password,
        };
          let token=window.sessionStorage.getItem('token');
          if (token){
            axios({
              method:"post",
              data:data1,
              url:this.GLOBAL.HOST+'user/change/'
            })
              .then(function (response) {
                let code = response.data.code;
                // console.log(response.data.code)
                if(code == "204"){
                  vm.showModal()
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          else{
            alert('请登录')
          }

      },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  ::-webkit-input-placeholder {
    color: #999;
    font-style: normal;
  }
  .filter-foot {
    display: flex;
    height: 45px;
    width: 100%;
    clear: both;
  >div {
    position: relative;
    height:44px;
    flex: 1;
    line-height: 44px;
  }
  button {
    width: 100%;
    height: 100%;
    border: #fff;
    background: #5b89ff;
    font-size: 17px;
    color: #fff;
  &.disable{
     background: #ddd;
     color: #fff;
   }
  &.filter-show {
     background: #fff;
     color: #5b89ff;
   }
  }
  }
  .tip {
    margin: 20px 0;
    padding: 0 10px;
    line-height: 1.2;
    color: #666;
    font-size:15px;
  p{
    margin:10px 0 0;
  }
  a {
    color: #5b89ff;
  }
  }
  .repair-requre {
    background: #fff;
    border: solid 1px #cecece;
    /*box-shadow: 0 0 7px 3px rgba(36, 38, 91, 0.06);*/
  }
  .repair-row {
    display: flex;
    flex-flow: row;
    margin: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    font-size:16px;
  .label {
    font-size: 13px;
    width: 4em;
    margin: 0 10px 0 0;
    color: #333;
    line-height: 44px;
  }
  .text {
    box-flex: 1;
    flex: 1
  }
    .text input{
      border-right: solid 1px lightgray;
    }
  input[type=password] {
    width: 100%;
    margin-top: 3px;
    margin-left: 10px;
    padding:8px 0;
    line-height: 28px;
    border: none;
    color:#333;
    font-size:15px;
  }
  }
  .repair-data {
    width: 100%;
    margin: 10px 0 0;
    border: 1px solid #5b89ff;
    line-height: 30px;
    background: #eff4f8;
    border-radius: 20px;
    color: #5b89ff;
    font-size: 17px;
    text-align: center;
  .iconfont {
    font-size: 16px;
  }
  }
  .result-cont {
    min-height: 20em;
  }
  .font1{
    font-size: 13px !important;
    color: darkred;
  }


  body{
    background:#f3f3f3;
    overflow-x:hidden;

  }
  .row{
    padding: 0px;
    margin: 0px;
  }
  .main-body{
    background: white;
    margin-top: 20px;
    border: solid 1px lightgray;
  }
  .main-body-top{
    height: 70px;
    margin: auto;
    border-bottom: solid 1px lightgray;
    display: flex;
    justify-content: space-around;
    line-height: 70px;
  }
  .main-body-top div{
    float: left;
    display: flex;
    justify-content: space-around;
  }
  .font{
    font-size: 18px;
    font-weight: 300;
  }
  .main-body-bottom {
    min-height:400px;
    height:100%;
    _height:400px;
    margin: 0;
    padding: 0;
  }
  .editior{
    font-size: 20px;
    color: #584f60;
    font-weight: 500;
    border-bottom: solid 3px #584f60;
  }
  a{
    color: black !important;
  }
  a:hover{
    text-decoration: none;
  }
  /*----------------------------修改密码------------------------------------*/
  .width{
    width: 500px;
    font-size: 20px;
    margin: 60px 0 0 130px;
  }
  div input{
    font-size: 14px;
  }
  input{
    width: 250px;
    height:45px;
    outline: none;
    border-radius: 3px;
    border: solid 1px #c6c6c6;
    margin: 0 0  20px 15px;
  }
  #pas1{
    margin-left: 35px;
  }
  .a{
    margin-top: 50px !important;
    width: 320px !important;
  }
</style>
