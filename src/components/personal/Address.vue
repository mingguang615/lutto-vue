<template>
  <div>
    <Header></Header>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div><router-link to="/basic">身体素质</router-link>
          </div>
          <div><router-link to="/phone">修改绑定</router-link>
          </div>
          <div><router-link class="editior" to="/address">添加地址</router-link></div>
          <div><router-link to="/password">修改密码</router-link></div>
        </div>
        <div class="col-lg-12 main-body-bottom">
          <div class="width">
            <div class="btn-group" data-toggle="distpicker">
              <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名
                <input type="text" value="姓名" v-model="recievename"></div>
              <div>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机
                <input type="text" value="手机" v-model="telephone"></div>
              <!--省市区联动-->
              <div ><div class="mail">邮寄地址</div>
                <v-distpicker @selected='selected' @click="toAddress"></v-distpicker>
                <div class="city" v-show="province1" v-model="province">{{province}}</div>
                <div class="addinp" v-show="addInp" v-model="city">{{city}}</div>
                <div class="area" v-show="mask" v-model="area">{{area}}</div>
              </div>

              <div class="info">详细地址
                <input type="text" value="详细地址" v-model="detailaddress"></div>
              <div>邮政编码 <input type="text" value="邮政编码" v-model="youbian"></div>
              <div @click="save"><div class="btn btn-info btn-lg show-layer" data-show-layer="hw-layer" role="button">保存</div></div>
            </div>
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
  import VDistpicker from 'v-distpicker'
  import $ from 'jquery'
export default {
  name: 'collect',
  components:{Header,VDistpicker},
  data() {
    return {
      isModalVisible: false,
      province1:false,
      addInp :false,
      mask:false,
      recievename:'',
      telephone:'',
      province:'',
      city:'',
      area:'',
      detailaddress:'',
      youbian:'',
      token:window.sessionStorage.getItem("token"),
      addrss_list:[],
    }
  },
  created:function(){
    this.$emit('flushnav')
  },
  methods: {
    save: function () {
      var vm = this;
      var province=$('.city').text();
      var city=$('.addinp').text();
      var area=$('.area').text();
      let upuser = {
        "recievename":vm.recievename,
        "telephone":vm.telephone,
        "province":province,
        "city":city,
        "area":area,
        "detailaddress":vm.detailaddress,
        "youbian":vm.youbian,
        headers:{"token":vm.token},
      };
      if(upuser.recievename&& upuser.telephone &&upuser.province && upuser.city && upuser.area && upuser.detailaddress){
        let token=window.sessionStorage.getItem('token');
        if (token){
          axios({
            method:"post",
            data:upuser,
            url:this.GLOBAL.HOST+'user/useraddress/'
          })
            .then(function (response) {
              // console.log(response.data)
              let code = response.data.code;
              if(code == "202"){
                vm.showModal()
                window.sessionStorage.setItem('address_list',response.data);
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else{
          alert('请登录')
        }
      }else{
        alert('这样包裹会找不到你哒啦~')
      }
      },

    // 点击弹出三级联动
    toAddress(){
      this.mask = true;
      this.addInp = true;
    },
    // 省市区三级联动
    selected(data){
      this.mask =false;
      this.addInp = false;
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },

    showModal: function () {
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mail{
    padding-right: 7px;
    position: relative;
    top: 10px;
  }
  body{
    background:#f3f3f3;
    overflow-x:hidden;
  }
  .row{
    padding: 0px;
    margin: 0px;
  }
  .show-layer{
    margin: 20px 300px  0 0 !important;
  }
  .width{
    width: 650px;
    margin: auto;
    margin-top: 30px;
  }
  select{
    width: 160px;
    height: 35px;
    outline: none;
    margin: 0 0px 0 15px;
  }
  .btn-group div{
    margin: 10px 7px 10px 0 ;
    float: left;
  }
  .btn-group div input{
    width: 200px;
    height: 35px;
    margin-left: 10px;
    margin-right: 36px;
  }
  .btn-group div{
    font-size: 16px;
    font-weight: 600;
  }
  .btn-group input,select{
    font-size: 14px;
    font-weight: 400 !important;
    color: gray;
  }
  .info input{
    width: 500px !important;
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
    height: 400px;
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

</style>
