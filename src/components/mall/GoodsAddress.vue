<template>
  <div class="container">
    <div class="width">
      <div class="bigbox" style="font-size: 13px;">
        <div class="border goods" >
          <p>Lutto自营</p>
          <div v-for="order in order_list">
            <img :src="order.good_url">
            <span style="font-size: 14px;display:inline-block;width: 500px;" v-text="order.good_name"></span>
            <span style="color: red;padding: 0">
              <span v-text="order.order_total"></span>积分
            </span>
            <span>x<span v-text="order.order_goodcounts"></span></span>
            <span>有货</span>
          </div>
        </div>
        <div class="border" >
          <p>收货人信息</p>
          <!--<router-link to="/address"><span style="float: right;color: darkblue;margin-top: -40px;margin-right: 20px">新增收货地址</span></router-link>-->
          <span style="float: right;color: darkblue;margin-top: -40px;margin-right: 20px;cursor: pointer" data-toggle="modal" data-target="#myModalAdd">新增收货地址</span>
          <div class="fat" id="fat" >
            <div style="width: 100%;" v-for="add in address_list">
              <input type="radio" name="address" @click="changeadd(add)">
              <span v-text="add.recievename"></span>
              <span v-text="add.province"></span>
              <span v-text="add.city"></span>
              <span v-text="add.area"></span>
              <span v-text="add.detailaddress"></span>
              <span v-text="add.telephone"></span>
            </div>
          </div>
          <div style="font-size: 13px;margin: 10px;border: none" class="glyphicon glyphicon-menu-down" v-if="show" @click="more">更多</div>
          <div style="font-size: 13px;margin: 10px;border: none" v-if="!show" class="glyphicon glyphicon-menu-up" @click="less">收起</div>
        </div>
        <div class="border price" >
          <p>订单信息</p>
          <div>
            <div style="margin-left: -20px">
              <span style="color: red;margin-left: 20px" v-text="number"></span><span>件商品，总商品金额：</span>
              <span><span v-text="acount"></span>积分</span>
              <!--<span v-text=""></span>-->
            </div>
            <div><span>运费：</span><span>￥0.00</span></div>
            <div><span>返现：</span><span>-￥0.00</span></div>
            <div class="info">
              <div><span>应付总额：</span><span style="font-size: 20px;color: red"><span v-text="acount"></span>积分</span></div>
              <div style="color: gray">
                <span >寄送至：</span>
                <!--省份-->
                <span v-text="addr.province"></span>
                <!--城市-->
                <span v-text="addr.city"></span>
                <!--地区-->
                <span v-text="addr.area"></span>
                <!--用户详细地址-->
                <span v-text="addr.detailaddress"> </span>
                <span style="padding-left: 50px">收货人：</span>
                <!--收货人姓名-->
                <span v-text="addr.recievename"></span>
                <!--收货人联系电话-->
                <span v-text="addr.telephone"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="input"><input type="button" value="确定付款" @click="dealorder"></div>
      </div>
    </div>

    <div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
              收货地址
            </h4>
          </div>
          <div data-toggle="distpicker" style="margin-top: 10px;width: 595px;padding-left: 10px">
            <span style="padding-right: 10px">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><input type="text"  v-model="recievename" placeholder="姓名" style="padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe">
            <span style="padding-left: 20px">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span><input type="text"  v-model="telephone" placeholder="手机" style="padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe">
            <!--省市区联动-->
            <div style="position: relative;top: 33px">省市区</div>
            <div style="width: 400px;margin-left: 73px">
              <v-distpicker @selected='selected' @click="toAddress"></v-distpicker>
              <div class="city" v-show="province1" v-model="province" style="padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe">{{province}}</div>
              <div class="addinp" v-show="addInp" v-model="city" style="padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe">{{city}}</div>
              <div class="area" v-show="mask" v-model="area" style="padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe">{{area}}</div>
            </div>
            <div class="info" style="width: 595px;margin-top: 20px">详细地址:
              <input type="text" placeholder="详细地址" v-model="detailaddress" style="width: 400px;margin-left: 10px;padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe"></div>
            <div>邮政编码: <input type="text" placeholder="邮政编码" v-model="youbian" style="margin-left: 10px;margin-top: 10px;width: 120px;padding-left: 5px;border-radius: 3px;border: solid 1px #bebebe"></div>
          </div>
          <div class="modal-footer" style="padding-right: 20px;padding-bottom: 10px">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消
            </button>
            <button @click="save" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 55px;height: 32px">
              确定
            </button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import VDistpicker from 'v-distpicker'
  export default {
    name: 'goodsaddress',
    components:{VDistpicker},
    data() {
      return {
        address_list: [],//获取用户的地址列表
        order_list:[],//获取的订单列表
        number:0,//
        acount:0,
        addr:"",
        goods:[],
        show:true,
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
    created () {
      this.$emit('flushnav')
    },
    mounted: function () {
      //窗口位置置坐标0，0
      window.scrollTo(0, 0);
      this.goods = JSON.parse(this.$route.params.orderId);
      this.address();
      this.getorder();
    },
    methods: {
      changeadd:function(addrs){
        let vm = this
        vm.addr = addrs
      },
      more: function () {
        $('#fat').removeClass('fat')
        this.show=false
      },
      less: function () {
        $('#fat').addClass('fat')
        this.show=true
      },
      //
      address: function () {
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          headers: {"token": token}
        };
        let vm = this;
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/getaddress/'
          })
            .then(function (response) {
              let code = response.data.code
              //249获取用户地址成功
              if(code == "249"){
                vm.address_list = response.data.data;
                vm.addr = vm.address_list[0]
              //  419用户未添加地址
              }else if(code == "419"){
                console.log("该用户未添加地址")
              }else if(code == "411"){
                console.log("该用户未登录")
              }else{
                console.log("系统崩溃")
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //获取订单信息
      getorder:function(){
        let vm=this;
        let token=window.sessionStorage.getItem('token');
        let data1={
          token:token,
          order_id:vm.goods,
        };
        if(token){
          axios({
            method:"POST",
            data:data1,
            url:this.GLOBAL.HOST+'shop/getorderbyid/'
          })
            .then(function (response) {
              vm.order_list=response.data;
              for (let order of vm.order_list) {
                vm.number += order.order_goodcounts
                vm.acount += order.order_total
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //确认订单
      dealorder: function () {
        let vm = this
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          token: token,
          "order_id": this.goods,
          "address_id":this.addr.id,
        };
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'shop/dealorder/'
          })
            .then(function (response) {
              let code = response.data.code
              if(code =="427"){
                alert("对不起您的积分不足")
              }else if(code == "219"){
                //购买成功跳转路由
                vm.$router.push({path: '/order'});
              }

            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      save: function () {
        let vm = this;
        let province=$('.city').text();
        let city=$('.addinp').text();
        let area=$('.area').text();
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
        let token=window.sessionStorage.getItem('token');
        //判断又没登陆
        if (token){
          if(vm.recievename && vm.telephone && province && city && vm.detailaddress){
            axios({
              method:"post",
              data:upuser,
              url:this.GLOBAL.HOST+'user/useraddress/'
            })
              .then(function (response) {
                let code = response.data.code;
                if(code == "202"){
                  // vm1('#myModalAdd').modal('hide')
                  vm.address() //重新渲染地址
                }
              })
              .catch(function (error) {
              })
          }else {
            alert("请完善地址信息")
          }
        }
        else{
          window.sessionStorage.setItem("from","/goodsaddress/"+JSON.stringify(vm.address_list))
          vm.$router.push({path:"/login"})
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
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /**/
  .fat {
    max-height: 32px;
    overflow: hidden;
  }

  .container,html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    /*隐藏横向滚动条*/
    overflow-x:hidden;
    background: #f3f3f3;
  }
  .width{
    margin: 50px auto;
    width: 900px;
    background: white;
    border: solid 1px rgba(211, 211, 211, 0.44);
  }
  .bigbox{
    width: 870px;
    height: 100%;
    margin: auto;
  }
  .goods div span{
    padding: 30px;
  }
  .bigbox .border{
    border-bottom: solid 1px rgba(170, 170, 170, 0.34);
    width: 870px;
  }
  .bigbox img{
    width: 90px;
    height: 90px;
    margin-bottom: 10px;
    border: solid 1px rgba(173, 173, 173, 0.59);
  }
  .bigbox :nth-child(1),:nth-child(2),:nth-child(3),:nth-child(4), span{
    padding: 2px;
  }
  .bigbox .price div {
    width: 300px;
  }
  .bigbox p{
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .input input{
    float: right;
    width: 130px;
    height: 40px;
    color: white;
    font-size: 16px;
    background: red;
    border: none;
    outline: none;
  }
  .input{
    margin-top: 20px;
    width: 100%;
    height: 70px;
    line-height: 30px;
    text-align: center;
  }
</style>
