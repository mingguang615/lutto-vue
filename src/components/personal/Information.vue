<template>
  <div>
    <Header></Header>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div><router-link to="/mycourse">我的课程</router-link></div>
          <div><router-link to="/mycollect">我的收藏</router-link></div>
          <div><router-link class="myinformation" to="/information">基本资料</router-link></div>
        </div>
        <div class="col-lg-12 main-body-bottom">
          <div>
            <button type="button" class="button-info"  @click="toggle1">
              基本信息
            </button>
          </div>
          <transition name="fade" >
            <div class="aaa " v-show="aaa">
              <div class="q_a clearfix">
                <div>
                  <div ><img src="../../assets/Personal/昵称.svg" alt="">&nbsp&nbsp昵称：</div><div>{{name}}</div>
                </div>
              </div>
              <div class="q_a clearfix">
                <div v-if="1" v-model="sex"><div><img src="../../assets/Personal/性别.svg" alt="">&nbsp&nbsp性别：</div><div>霹雳小美女</div></div>
                <div v-if="0" v-model="sex"><div><img src="../../assets/Personal/性别.svg" alt="">&nbsp&nbsp性别：</div><div>无敌大帅哥</div></div>
              </div>
              <div class="q_a clearfix">
                <div>
                  <div ><img src="../../assets/Personal/年龄.svg" alt="">&nbsp&nbsp年龄：</div><div>{{age}}岁</div>
                </div>
              </div>
              <div class="q_a clearfix">
                <div>
                  <div><img src="../../assets/Personal/身高.svg" alt="">&nbsp;&nbsp;身高：</div><div>{{height}}cm</div>
                </div>
              </div>
              <div class="q_a clearfix">
                <div>
                  <div><img src="../../assets/Personal/体重.svg" alt="">&nbsp;&nbsp;体重：</div><div>{{weight}}kg</div>
                </div>
              </div>
            </div>
          </transition>

          <div>
            <button type="button" class="button-address" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggle2">
              收货地址
            </button>
          </div>
          <transition name="fade">
            <div class="bbb" v-show="bbb">
              <div class="q_a address clearfix"  :data-address-id="al.id" v-for="al in address_list">
                <div>
                  <div><img src="../../assets/Personal/姓名.svg" alt="">&nbsp;&nbsp;姓名：</div>
                  <div>{{al.recievename}}</div>
                </div>
                <div>
                  <div><img src="../../assets/Personal/电话.svg" alt="">&nbsp;&nbsp;手机号：</div>
                  <div>{{al.telephone}}</div>
                </div>
                <div class="address_span">
                  <div><img src="../../assets/Personal/地址.svg" alt="">&nbsp;&nbsp;地址：</div>
                  <div>{{al.province}}</div>
                  <div>{{al.city}}</div>
                  <div>{{al.area}}</div>
                  <span>{{al.detailaddress}}</span>
                  <!--<input class="checkbox" type="checkbox">-->
                  <input class="delete" type="button" @click="deladdress" value="删除">
                </div>
              </div>
            </div>
          </transition>
          <div class="col-lg-3"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from './top'
  import axios from 'axios'
  import $ from 'jquery'

export default {
  name: 'information',
  components:{Header},
  data(){
    return{
      name:'',
      sex:'0',
      age:'',
      height:'',
      weight:'',
      address_list:[],
      order1_list:[],
      order2_list:[],
      order_id:'',
      id:'',

      aaa:true,
      bbb:false,
      ccc:false,
      ddd:false,
      eee:false,
    }
  },
  created:function(){
    this.basic();
    this.address();
    this.getorder1();
    this.getorder2();
    this.$emit('flushnav')
  },
  methods:{
    basic:function(){
      let token=window.sessionStorage.getItem('token');
      let data1={
        headers:{"token":token}
      };
      let vm=this;
      if(token){
        axios({
          method:"POST",
          data:data1,
          url:this.GLOBAL.HOST+'user/getuserinfobytel/'
        })
          .then(function (response) {
            // console.log(response.data)
            vm.name=response.data[0].name;
            vm.sex=response.data[0].sex;
            vm.age=response.data[0].age;
            vm.height=response.data[0].height;
            vm.weight=response.data[0].width;
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    address:function(){
      let token=window.sessionStorage.getItem('token');
      let data1={
        headers:{"token":token}
      };
      let vm=this;
      if(token){
        axios({
          method:"POST",
          data:data1,
          url:this.GLOBAL.HOST+'user/getaddress/'
        })
          .then(function (response) {
            vm.address_list=response.data['data'];

          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    deladdress:function(e){
      let $obj = $(e.target).parents('.address')
      let i=$obj.attr('data-address-id')
      if (i){
        this.id=i
      }else {
        console.log('null id')
      }
      let vm=this;
      let token=window.sessionStorage.getItem('token');
      let data1={
        headers:{"token":token},
        "id":vm.id,
      };
      // console.log(data1)
      if(token){
        axios({
          method:"POST",
          data:data1,
          url:this.GLOBAL.HOST+'user/deladdress/'
        })
          .then(function (response) {
            vm.address();
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    getorder1:function(){
      let token=window.sessionStorage.getItem('token');
      let data1={
        token:token,
        good_status:'1'
      };
      let vm=this;
      if(token){
        axios({
          method:"POST",
          data:data1,
          url:this.GLOBAL.HOST+'shop/gettorder/'
        })
          .then(function (response) {
            vm.order1_list=response.data;
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    getorder2:function(){
      let token=window.sessionStorage.getItem('token');
      let data1={
        token:token,
        good_status:'2'
      };
      let vm=this;
      if(token){
        axios({
          method:"POST",
          data:data1,
          url:this.GLOBAL.HOST+'shop/gettorder/'
        })
          .then(function (response) {
            vm.order2_list=response.data;
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    toggle1:function () {
      var vm = this;
      vm.aaa=!vm.aaa;
    },
    toggle2:function () {
      var vm = this;
      vm.bbb=!vm.bbb;
    },
    toggle4:function () {
      var vm = this;
      vm.ddd=!vm.ddd;
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
    min-height:500px;
    +height:100%;
    _height:400px;
    margin: 0;
    padding: 0;
  }
  .myinformation{
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
  /*----------------------------------个人信息部分----------------------------*/

  button{
    width: 100% !important;
    height: 40px;
    border: solid 1px lightgray;
    background: #f3f3f3;
    outline: none;
    font-size: 16px;
  }
  .q_a div{
    float: left;
    font-size: 17px;
    color: black;
    padding: 5px 0px 10px 35px;
  }
  .q_a img{

    width: 25px;
    height: 25px;
  }
  /*---------------------------收货地址-----------------------*/
  .address{
    margin-top: 20px;
  }
  .address div{
    padding:5px 0px 0px 10px !important;
  }
  .address img{
    margin-left: 50px;
  }
  .bbb div{
    padding-bottom: 30px;
  }
  .address_span{
    width: 690px;
  }
  .address_span span{
    width: 450px;
    display:inline-block;
    padding-left:10px !important;
  }

  .address_span .delete{
    width: 50px;
    height: 30px;
    margin-top: -30px;
    float: right;
    border: solid 1px darkgray;
    border-radius: 3px;
    outline: none;
  }
  /*---------------------------待付款，已付款-------------------------*/

  .box span{
    margin-left: 10px;
  }
  .img img{
    display: none;
  }
  .pay:hover .img img{
    display: block;
  }
  .pay div{
    padding:10px 15px 10px 10px !important;
  }
  /*-----------------------------已发货-----------------------*/
  .number div{
    padding:0 15px 15px 0 !important;
    margin-top: -30px;
  }

</style>
