<template>
  <div>
    <Header></Header>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div><router-link  to="/basic">身体素质</router-link></div>
          <div><router-link class="editior" to="/phone">修改绑定</router-link></div>
          <div><router-link to="/address">添加地址</router-link></div>
          <div><router-link to="/password">修改密码</router-link> </div>
        </div>
        <div class="col-lg-12 main-body-bottom">
          <div class="width">
            <div >手机号<input  name="phone" id="btn_getNum" type="number"  placeholder="请输入手机号"  v-model="telephone"/>
              <button type="button" :disabled="disabled" @click="sendcode" class=" btn btn-info btn-lg">{{btntxt}}</button>
            </div>
            <div>验证码<input id="code" type="text" placeholder="请输入短信验证码" v-model="validate"></div>
            <div><input class="btn btn-info btn-lg a" type="button" value="确定" @click="query" /></div>
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
  import axios from 'axios'
export default {
  name: 'phone',
  components:{Header},
  data: function () {
    return {
      //模态框
      isModalVisible: false,

      disabled:false,
      time:0,
      btntxt:"获取验证码",
      telephone:'',
      validate:'',
      abc: true

    }
  },
  created:function(){
    this.$emit('flushnav')
  },
  mounted: function () {

  },
  methods:{
    //模态框部分
    showModal: function () {
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    },
    //验证手机号码部分
    sendcode(){
      var vm = this
      var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if(this.telephone===''){
        alert("请输入手机号码");
      }else if(!reg.test(this.telephone)){
        alert("手机格式不正确");
      }else{
        this.time=60;
        this.disabled=true;
        this.timer();
        let data1={
          headers:{"token":window.sessionStorage.getItem('token')},
          "telephone":vm.telephone,
        };
        // console.log(data1,11111111);
        let token=window.sessionStorage.getItem('token');
        if (token) {
          axios({
            method:"post",
            data:data1,
            url:this.GLOBAL.HOST+'user/sendcode/'
          }).then(function (response) {
            // console.log(response.data)
          })

        }

        // axios.post(url).then(
        //  res=>{
        //  this.phonedata=res.data;
        // })
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt=this.time+"s后重新获取";
        setTimeout(this.timer, 1000);
      } else{
        this.time=0;
        this.btntxt="获取验证码";
        this.disabled=false;
      }
    },
    query(){
      let vm = this;
      let data1={
        headers:{"token":window.sessionStorage.getItem('token')},
        "telephone":vm.telephone,
        "validate":vm.validate,
      };
      if(data1.telephone && data1.validate){
        let token=window.sessionStorage.getItem('token');
        if (token) {
          axios({
            method:"post",
            data:data1,
            url:this.GLOBAL.HOST+'user/checkcode/'
          }).then(function (response) {
            // console.log(response.data)
            if(response.data.code==223){
              vm.showModal()
            }
            // 接受返回的手机号，存入sessionStorage
            window.sessionStorage.setItem('username',response.data.telephone)
            // 重新刷新导航栏
            vm.abc = false
            vm.$nextTick(()=>{
              vm.abc = true
            })
          })
        }
      }else{
        alert('先填下手机号和验证码吧')
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  +height:100%;
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
  /*----------------------------手机绑定------------------------------------*/
  .main-body-bottom div{
    font-size: 16px;
    font-weight: 600;
  }
  .main-body-bottom div input{
    font-size: 14px;
    font-weight: 400;
  }
  .width{
    margin: 40px 0 0 180px;
  }
  input{
    width: 200px;
    height:45px;
    outline: none;
    border: solid 1px #c6c6c6;
    border-radius: 3px;
    margin: 0 20px 25px 20px ;
  }
  .a{
    margin-top: 70px !important;
    width: 250px !important;
  }
  .btn-lg{
    width: 130px;
    height: 40px;
    /*margin-top: 30px;*/
    font-size: 16px;
  }
  p{
    font-weight: 800;
  }

</style>
