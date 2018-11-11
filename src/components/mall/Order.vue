<template>
  <div class="container">
    <div class="width">
      <div class="header" >
        <span @click="allorder" id="allorder" class="font">所有订单</span>
        <span @click="daifukuan">待付款</span>
        <span @click="daishouhuo">待收货</span>
        <span @click="daipingjia" style="border-right: none">待评价</span>
      </div>
      <div class="header_info">
        <span style="padding-left: 210px;padding-right: 210px">宝贝</span>
        <span style="padding-left: 20px;padding-right: 20px">单价</span>
        <span style="padding-left: 30px;padding-right: 30px">数量</span>
        <span style="padding-left: 30px;padding-right: 30px">实付款</span>
        <span style="padding-left: 30px;padding-right: 30px">交易状态</span>
        <span style="padding-left: 40px;padding-right: 40px">交易操作</span>
      </div>
      <div style="padding-left: 10px">
        <input type="checkbox" @click="all_check">
        <span style="padding: 10px">全选</span>
        <input class="button white" type="button" value="批量去付款" @click="go_order(2)">
      </div>
      <div v-for="order in new_order1_list">
        <!--未付款-->
        <div class="content del" v-if="1==order.order_status" :data-order-id="order.order_id">
          <div class="backcolor res" style="padding-left: 10px">
            <input type="checkbox" id="checkaa">
            <span style="font-weight: 600;padding: 12px;margin: 0!important;" v-text="order.order_time"></span>
            <span>订单号:</span>
            <span v-text="order.order_id"></span>
          </div>
          <div class="info">
            <img :src="order.good_url" alt="">
            <span style="display:inline-block; width: 350px;" v-text="order.good_name"></span>
            <span style="display:inline-block; width: 90px;" v-text="order.good_intergal"></span>
            <span style="display:inline-block; width: 80px;" v-text="order.order_goodcounts"></span>
            <span style="display:inline-block; width: 90px;font-weight: 600;font-size: 15px" v-text="order.order_total"></span>
            <span style="display:inline-block; width: 110px;">等待买家付款</span>
            <span style="display:inline-block; width: 110px">
              <input class="button" type="button" value="立即付款" @click="go_order(1,order.order_id)" style="margin-top: 10px">
              <span style="margin-top: 10px;height: 20px;display: block;cursor: pointer" @click="delorder">取消订单</span>
            </span>
          </div>
        </div>

        <!--待收货-->
        <div class="content del" v-if="2==order.order_status" :data-order-id="order.order_id">
          <div class="backcolor">
            <span style="font-weight: 600;padding: 20px" v-text="order.order_time"></span>
            <span>订单号:</span>
            <span v-text="order.order_id"></span>
          </div>
          <div class="info">
            <img :src="order.good_url" alt="">
            <span style="display:inline-block; width: 350px;" v-text="order.good_name"></span>
            <span style="display:inline-block; width: 90px;" v-text="order.good_intergal"></span>
            <span style="display:inline-block; width: 80px;" v-text="order.order_goodcounts"></span>
            <span style="display:inline-block; width: 90px;font-weight: 600;font-size: 15px" v-text="order.order_total"></span>
            <span style="display:inline-block; width: 110px;"><div>等待买家收货</div><a>订单详情</a></span>
            <span style="display:inline-block; width: 110px;height: 50px;"><input class="button" type="button"
                                                                                  value="确认收货"
                                                                                  @click="dealorder"></span>
          </div>
        </div>

        <!--已收货，待评价-->
        <div class="content del" v-if="3==order.order_status" :data-order-id="order.order_id">
          <div class="backcolor">
            <span style="font-weight: 600;padding: 20px" v-text="order.order_time"></span>
            <span>订单号:</span>
            <span v-text="order.order_id"></span>
            <img src="../../assets/Personal/删除黑.svg" alt="" @click="delorder">
          </div>
          <div class="info" :data-good-id="order.good_id">
            <img :src="order.good_url" alt="" >
            <span style="display:inline-block; width: 350px;" v-text="order.good_name"></span>
            <span style="display:inline-block; width: 90px;" v-text="order.good_intergal"></span>
            <span style="display:inline-block; width: 80px;" v-text="order.order_goodcounts"></span>
            <span style="display:inline-block; width: 90px;font-weight: 600;font-size: 15px" v-text="order.order_total"></span>
            <span style="display:inline-block; width: 110px;"><div>交易成功</div></span>
            <span style="display:inline-block; width: 100px;height: 50px;" >
              <input class="button" type="button" value="立即评价" @click="comment">
            </span>
            <div class="container-bottom" id="container-bottom" style="overflow: hidden;height: 0">
              <div class="t1">
                <textarea name="comm" id="comm" cols="80" rows="3" placeholder="请输入内容"></textarea>
                <div class="t2">
                  <button @click="submit">发表</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--评价过，历史订单-->
        <div class="content del" v-if="4==order.order_status" :data-order-id="order.order_id">
          <div class="backcolor">
            <span style="font-weight: 600;padding: 20px" v-text="order.order_time"></span>
            <span>订单号:</span>
            <span v-text="order.order_id"></span>
          </div>
          <div class="info">
            <img :src="order.good_url" alt="">
            <span style="display:inline-block; width: 350px;" v-text="order.good_name"></span>
            <span style="display:inline-block; width: 90px;" v-text="order.good_intergal">分</span>
            <span style="display:inline-block; width: 80px;" v-text="order.order_goodcounts"></span>
            <span style="display:inline-block; width: 90px;font-weight: 600;font-size: 15px" v-text="order.order_total"></span>
            <span style="display:inline-block; width: 110px;"><div>历史订单</div></span>
            <span style="display:inline-block; width: 110px;height: 50px;"><input class="delete" type="button" value="删除" @click="delorder" ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    name: 'order',
    data() {
      return {
        order1_list: [],
        new_order1_list:[],
        show_comm: false,
        goods: [],//存储用户添加的商品
        status_select:0, //
      }
    },
    created: function () {
      this.getorder();
    },

    mounted: function () {
      //窗口位置置坐标0，0
      window.scrollTo(0, 0);
    },
    methods: {
      //获取该用户的订单
      getorder: function () {
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          token: token,
        };
        let vm = this;
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'shop/getallorder/'
          })
            .then(function (response) {
              vm.order1_list = response.data;
              vm.new_order1_list = response.data;
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //删除订单、取消订单
      delorder: function (e) {
        let vm = this;
        let $obj = $(e.target).parents('.del')
        let id = $obj.attr('data-order-id')
        if (id) {
          vm.order_id = id
        } else {
          console.log('null id')
        }
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          token: token,
          "order_id": vm.order_id,
        };
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'shop/delorder/'
          })
            .then(function (response) {
              console.log(response.data)
              vm.getorder();
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //确认收货
      dealorder: function (e) {
        let vm = this;
        let $obj = $(e.target).parents('.del')
        let id = $obj.attr('data-order-id')
        if (id) {
          vm.order_id = id
        } else {
          console.log('null id')
        }
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          token: token,
          "order_id": vm.order_id,
        };
        // console.log(data1)
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/shouhuo/'
          })
            .then(function (response) {
              vm.getorder();
              vm.daipingjia();
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      //立即付款
      go_order: function (status,orderId) {
        let vm = this
        //延时0.1秒执行
        let oreders = []
        if(status == 1){
          oreders.push(orderId)
        }else if(status == 2){
          //查找所有未付款的订单
          let chs = document.querySelectorAll("#checkaa")
          for(let ch of chs){
            if(ch.checked){
              //取到订单id
              let order_id = ch.parentElement.parentElement.getAttribute("data-order-id")
              //追加到orders中
              oreders.push(order_id)
            }
          }
        }
        if(oreders.length){
          vm.$router.push({
            name: 'goodsaddress', params: {orderId: JSON.stringify(oreders)},
          });
        }else {
          alert("请选择付款的商品")
        }
      },

      // 全选复选框
      all_check:function (e) {
        if(e.target.checked){
          let checks = document.querySelectorAll("#checkaa")
          for(let ck of checks){
            //添加checked属性
            ck.checked="true"
          }
        }else {
          let checks = document.querySelectorAll("#checkaa")
          for(let ck of checks){
            //移除checked属性
            ck.checked=""
          }
        }
      },

     //  代付款
      daifukuan:function () {
        let vm = this
        vm.new_order1_list = []
        for(let order of vm.order1_list){
          if(order.order_status == 1){
            vm.new_order1_list.push(order)
            this.changefont()
          }
        }
      },

      //待收货
      daishouhuo:function () {
        let vm = this
        vm.new_order1_list = []
        for(let order of vm.order1_list){
          if(order.order_status == 2){
            vm.new_order1_list.push(order)
            this.changefont()
          }
        }
      },

      //待评价
      daipingjia:function () {
        let vm = this
        vm.new_order1_list = []
        for(let order of vm.order1_list){
          if(order.order_status == 3){
            vm.new_order1_list.push(order)
            this.changefont()
          }
        }
      },

      //全部订单
      allorder:function () {
        let vm = this
        vm.new_order1_list=vm.order1_list
        this.changefont()
      },

      //动画显示留言框的方法
      comment:function (e) {
        // 找到留言框的节点
        let comm=e.target.parentElement.nextElementSibling
        //开始高度为
        let jj = 0
        //当高度为0px时每次1毫秒执行一次,不给时间时默认1毫秒触发一次
        if(comm.style.height == "0px"){
          let ss= setInterval(function () {
            //高度加1
            jj += 1
            comm.style.height = jj.toString()+"px"
            //高度等于160时清楚计时器
            if(jj == 140){
              clearInterval(ss)
            }
          },1)
        }else{
          let jj = 140
          let ss= setInterval(function () {
            jj -= 1
            comm.style.height = jj.toString()+"px"
            if(jj == 0){
              clearInterval(ss)
            }
          })
        }
      },

      //发表评论
      submit: function (e) {
        let vm = this;
        let $obj = $(e.target).parents('.info')
        let id = $obj.attr('data-good-id')
        if (id) {
          vm.good_id = id
        } else {
          console.log('null id')
        }
        let token = window.sessionStorage.getItem('token')
        if (token) {
          let $obj = $(e.target).parents('.del')
          let id = $obj.attr('data-order-id')
          if (id) {
            vm.order_id = id
          } else {
            console.log('null id')
          }
          let content = $('#comm').val()
          if (content) {
            let data1 = {
              "token": token,
              "content": content,
              "good_id":vm.good_id,
              "order_id":vm.order_id
            }
            console.log(data1)
            axios({
              url: this.GLOBAL.HOST + 'shop/goodcomment/',
              method: "POST",
              data: data1,
            })
              .then(function (response) {
                console.log(response.data)
                if (response.data.code == 210) {
                  alert('发表成功')
                  vm.getorder()
                  vm.allorder()
                }
                  else {
                  alert('失败')
                }
              })
              .catch(function (error) {
                console.log(error)
              })

          }
          // else {
          //   this.isShow = true
          //   this.title = '发表评论'
          //   this.com_msg = '评论不能为空呦!'
          // }
          // this.isModalVisible = true
        }

        else {

          this.$router.push({
            path: '/login'
          })
        }
      },

      changefont:function () {
        $(".header span").click(function(){
          $(".header span").removeClass("font");
          $(this).addClass("font");
          console.log('fdwygsuhaxijok')
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .font{
    color: orangered;
    font-size: 17px;
  }
  .delete{
    border: solid 1px lightgrey;
    border-radius: 3px;
    width: 80px;
    height: 30px;
    /*background: white;*/
  }
  .container, html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    /*隐藏横向滚动条*/
    overflow-x: hidden;
    background: #f3f3f3;
  }

  .width {
    margin: 50px auto;
    width: 1000px;
    background: white;
    border: solid 1px rgba(211, 211, 211, 0.44);
  }

  span {
    font-size: 13px;
  }

  .header span {
    font-size: 16px !important;
    font-weight: 600;
    padding-left: 20px;
    padding-right: 20px;
    border-right: solid 1px lightgrey;
  }
  .header span:hover{
    cursor: pointer;
  }
  .header {
    margin-top: 50px;
    height: 30px;
    border-bottom: solid 2px rgba(211, 211, 211, 0.61);
  }
  .header_info {
    margin-top: 30px;
    height: 40px;
    background: rgba(220, 220, 220, 0.27);
    font-size: 13px;
    border: solid 1px rgba(211, 211, 211, 0.44);
    line-height: 40px;
    margin-bottom: 20px;
  }

  .content {
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: solid 1px rgba(211, 211, 211, 0.44);
  }

  .backcolor {
    height: 40px;
    background: rgba(220, 220, 220, 0.27);
    line-height: 40px;
    border: solid 1px rgba(211, 211, 211, 0.44);
  }

  .res :nth-child(2) {
    margin-left: -15px !important;
  }

  .backcolor img {
    width: 20px;
    height: 20px;
    float: right;
    margin: 10px 60px 0 0;
  }

  .info img {
    margin: 20px 0 0 20px;
    width: 80px;
    height: 80px;
  }

  .info span {
    padding-left: 10px;
    padding-bottom: 10px;
    /*background: red;*/
  }

  input {
    border: none;
    outline: none;
  }

  .button {
    background: red;
    width: 80px;
    height: 30px;
    border-radius: 3px;
    color: white;
  }

  .container-bottom {
    width: 830px;
    height: 140px;
    margin-top: 15px;
    /*padding-top: 15px;*/
    background: #eeeeee;
    margin-left: 120px;
    /*border: 1px solid #ebebeb;*/
    box-sizing: border-box;
  }

  .container-bottom .t1 {
    width: 800px;
    height: 80px;
    margin: auto;
    margin-top: 15px;
    background: white;
    padding: 5px;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
  }

  .container-bottom textarea {
    resize: none;
    width: 780px;
    height: 65px;
    border: none;
  }

  .container-bottom button {
    width: 80px;
    height: 30px;
    outline: none;
    background: red;
    border: none;
    color: white;
    font-size: 1.1em;
    margin-left: 710px;
    position: relative;
    top: 10px;
    border-radius: 3px;
  }

  .white {
    width: 100px;
    border: solid 1px lightgrey;
    background: white;
    color: gray;
    font-size: 13px;
    margin-left: 40px;
  }
</style>
