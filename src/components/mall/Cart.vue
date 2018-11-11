<template>
  <div class="container">
    <div class="cart">
      <div class="header">
        <div>
          <input type="checkbox" id="check_all_top" @click="checkAll" v-bind:checked="check_all">
          <label for="check_all_top">全选</label>
        </div>
        <div>商品</div>
        <div>单价</div>
        <div>数量</div>
        <div>小计</div>
        <div>操作</div>
      </div>
      <div class="goods">
        <!--模板在js中-->
        <div class="good-item" v-for="good in goods" :data-good-id="good.good_id">
          <div class="item-01">
            <div><input type="checkbox" @click="checkOne(good.good_id,good.checked)" v-bind:checked="good.checked"></div>
            <!--商品图片-->
            <div><a href="#"><img :src="good.good_url"></a></div>
          </div>
          <!--商品名称-->
          <div class="good-name"><a @click="go_gooddetail(good.good_id)" v-text="good.good_name.slice(0,20)"></a></div>
          <!--商品价格-->
          <div class="price"><span v-text="good.good_intergal"></span>积分</div>
          <!--购买的商品数量-->
          <div class="btn-account">
            <!--单价减号-->
            <div class="btn-num" @click="buyGoodNumberMinus(good.good_id,good.good_num)">-</div>
            <!--&lt;!&ndash;输入购买的商品数量1 ->-->
            <input type="text" :value="good.good_num" :data-good-id="good.good_id" @change="updataNum">
            <!--单击加的时候商品数量加1 -->
            <div class="btn-num" @click="buyGoodNumberPlus(good.good_id,good.good_num)">+</div>
            <div class="inventory">有货</div>
          </div>
          <div class="subtotal"><span v-text="good.good_num*parseInt(good.good_intergal)"></span>积分</div>
          <div class="operation">
            <!--传递状态1 表示删除的是单个商品-->
            <a  data-toggle="modal" data-target="#myModalDel01">删除</a>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModalDel01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                      &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel" style="color: red">
                      确定删除该商品
                    </h4>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="del_good(1,good.good_id)">
                      确定
                    </button>
                  </div>
                </div><!-- /.modal-content -->
              </div><!-- /.modal -->
            </div>
            <!--<a @click="del_good(1,good.good_id)">删除</a>-->
            <a @click="love_good(1,good.good_id)">添加到我的关注</a>
          </div>
        </div>
      </div>
      <div class="good-account">
        <div>
          <input type="checkbox" id="check_all_bottom" v-bind:checked="check_all" @click="checkAll">
          <label for="check_all_bottom">全选</label>
        </div>
        <div>
          <!--传递状态2 表示删除的是选中的商品-->
          <a data-toggle="modal" data-target="#myModalDel02">删除选中的商品</a>
          <!--<a @click="del_good(2)">删除选中的商品</a>-->
          <!-- 模态框（Modal） -->
          <div class="modal fade" id="myModalDel02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                  </button>
                  <h4 class="modal-title" id="myModalLabel02" style="color: red">
                    确定删除选中的商品
                  </h4>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">取消
                  </button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="del_good(2)">
                    确定
                  </button>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>
        </div>
        <div>
          <a @click="love_good(2)">添加到我的关注</a>
        </div>
        <div class="clear-cart">
          <a data-toggle="modal" data-target="#myModalDel03">清理购物车</a>
          <!-- 模态框（Modal） -->
          <div class="modal fade" id="myModalDel03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                  </button>
                  <h4 class="modal-title" id="myModalLabel03" style="color: red">
                    确定清除购物车中的商品
                  </h4>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">取消
                  </button>
                  <button type="button" class="btn btn-primary" @click="del_good(2)">
                    确定
                  </button>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>
        </div>
        <div class="select-good-num">已选择&nbsp;<span class="good-num-color" v-text="good_sum"></span>&nbsp;件商品</div>
        <div class="total-prices">总价：<span class="zongjia" v-text="good_total_rice"></span>&nbsp;积分</div>
        <div class="btn-account" @click="go_order">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "Cart",
      data:function(){
        return {
          goods:[],//存储用户添加的商品
          good_total_rice:0,//商品总价
          good_sum:0,//勾选商品数量
          check_all:null,//默认全选为勾上
        }
      },
      created () {
        window.scrollTo(0,0)  //导航栏置0，0
        this.$emit('flushnav')  //刷新导航栏

      },
      mounted:function(){
        //页面加载时获取数据
        this.getData()
        window.sessionStorage.setItem("from","/cart")
      },
      methods: {
        //初始化数据
        getData: function () {
          let vm = this
          let data = {
            //获取token
            "token": window.sessionStorage.getItem("token")
          }
          //发送ajax post请求
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/getcart/'
          }).then(function (resp) {
            // console.log(resp.data)
            let code = resp.data.code
            //获取该用购物车商品成功
            if (code == "213") {
              vm.goods = resp.data.goods //请求到的数据赋值给goods

            //  该用户的购物车为空
            }else if(code == "423"){
              vm.goods = ""
            }
            vm.good_sum = 0
            vm.good_total_rice = 0
            vm.watch_chekall()
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        },

        //单击 + 时增加商品数量
        buyGoodNumberPlus: function (good_id, good_num) {
          let vm = this;
          let checked = null
          vm.checkOne(good_id,checked)
          let token = window.sessionStorage.getItem("token");
          let data = {
            "token": token,
            "good_id": good_id,
            "num": parseInt(good_num) + 1
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/upgoodnum/'
          }).then(function (resp) {
            //重新渲染数据
            vm.getData()
            vm.watch_chekall()
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        },

        //单击 - 时减少商品数量
        buyGoodNumberMinus: function (good_id, good_num) {
          let vm = this;
          let checked = null
          vm.checkOne(good_id,checked)
          if (good_num > 1) {
            //获取本地保存的token信息
            let token = window.sessionStorage.getItem("token");
            let data = {
              "token": token,
              "good_id": good_id,
              "num": parseInt(good_num) - 1
            };
            axios({
              method: 'post',
              data: data,
              url: this.GLOBAL.HOST + 'shop/upgoodnum/'
            }).then(function (resp) {
              //重新渲染数据
              vm.getData()
              vm.watch_chekall()
            }).catch(err => {
              console.log('请求失败:' + err)
            })
          }
        },

        //更新商品数量（通过文本框输入）
        updataNum:function (e) {
          let good_num = e.target.value
          let good_id = e.target.getAttribute("data-good-id")//获取当前元素的商品id
          let vm = this;
          //获取本地保存的token信息
          let token = window.sessionStorage.getItem("token");
          let data = {
            "token": token,
            "good_id": good_id,
            "num": good_num
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/upgoodnum/'
          }).then(function (resp) {
            //重新渲染数据
            vm.getData()
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        },

        //商品全选勾选事件
        checkAll: function () {
          let vm = this;
          //判断当前的状态是否为全选，如果不是全选，则赋值checked全选复选框勾上
          if (!vm.check_all){
            vm.check_all = "checked";
            //所有商品状态置checked勾选上
          }else {
            vm.good_sum = 0
            vm.good_total_rice = 0
            vm.check_all = null;
          }
          let data = {
            "token": window.sessionStorage.getItem("token"),
            "status": "all",
            "checked":vm.check_all
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/updatacart/'
          }).then(function (resp) {
            //重新渲染数据
            vm.getData()
            if(vm.check_all){
              vm.watch_chekall()
            }
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        },

        //单个商品勾选事件
        checkOne:function (good_id,checked) {
          let vm = this
          let new_checked = null
          if (!checked){
            new_checked = "checked"
          }
          let data = {
            "token": window.sessionStorage.getItem("token"),
            "status": "one",
            "checked":new_checked,
            "good_id":good_id
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/updatacart/'
          }).then(function (resp) {
            //重新渲染数据
            vm.getData()
            vm.watch_chekall()
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        },

        //查看当前商品选中的情况
        watch_chekall:function () {
          let vm = this
          for (let good of vm.goods){
            if(good.checked=="checked"){
              vm.good_sum +=1
              vm.good_total_rice += parseInt(good.good_intergal)*good.good_num
            }
          }
          //判断商品数量和勾选的商品数量是否一致
          if(vm.goods && vm.good_sum == vm.goods.length){
            vm.check_all = "checked" //勾上全选
          }else{
            vm.check_all = null //取消全选
          }
        },

        //跳到详情页
        go_gooddetail:function (good_id) {
          this.$router.push({
            name: 'goods_detail', params: {gid: good_id},
          });
        },

        //删除商品
        del_good:function (status,good_id) {
          let vm = this
          // $("#myModalDel").modal("hide")
          let good_list = []
          if(status == 1){
            good_list.push(good_id)
          }else if(status == 2){
            for(let good of vm.goods){
              if(good.checked){
                good_list.push(good.good_id)
              }
            }
          }else if(status == 3){
            for(let good of vm.goods){
              good_list.push(good.good_id)
            }
          }
          if(good_list){
            //获取本地保存的token信息
            let token = window.sessionStorage.getItem("token");
            let data = {
              "token": token,
              "good_list": good_list
            };
            axios({
              method: 'post',
              data: data,
              url: this.GLOBAL.HOST + 'shop/delgood/'
            }).then(function (resp) {
              //重新渲染数据
              vm.getData()
            }).catch(err => {
              console.log('请求失败:' + err)
            })
          }else {
            alert("请选择删除的商品")
          }
        },

        //收藏商品
        love_good:function (status,good_id) {
          let vm = this
          let good_list = new Array() //定义一个空数组
          //判断收藏的状态，等于1时说明收藏一条商品
          if(status == 1){
            good_list.push(good_id)
            // 等于2时说明收藏选中的商品
          }else if(status == 2){
            for(let good of vm.goods){
              //判断改商品是否被选中
              if(good.checked){
                good_list.push(good.good_id) //追加到商品列表中
              }
            }
          }
          //js中空数组的布尔值时true
          if(good_list.length){
            //获取本地保存的token信息
            let token = window.sessionStorage.getItem("token");
            let data = {
              "token": token,
              "good_id": good_list
            };
            axios({
              method: 'post',
              data: data,
              url: this.GLOBAL.HOST + 'shop/lovegood/'
            }).then(function (resp) {
              console.log(resp.data)
              //212收藏该商品成功
              if(resp.data.code == "212"){
                alert("收藏成功")
              //  417该商品已被收藏
              }else if(resp.data.code == "417"){
                alert("该商品已被收藏过")
              }
            }).catch(err => {
              console.log('请求失败:' + err)
            })
          }else {
            alert("请选择你要收藏的商品")
          }
        },

        //去结算
        go_order:function () {
          let vm = this
          //延时0.1秒执行
          setTimeout(function () {
            let goods = []
            for (let good of vm.goods){
              if(good.checked){
                let gg={
                  "good_id":good.good_id,
                  "good_num":good.good_num,
                  "total":good.good_num*parseInt(good.good_intergal)
                }
                goods.push(gg)
              }
            }
            if(goods.length){
              //获取本地保存的token信息
              let token = window.sessionStorage.getItem("token");
              let data = {
                "token": token,
                "goods": goods
              };
              axios({
                method: 'post',
                data: data,
                url: vm.GLOBAL.HOST + 'shop/makeorder/'
              }).then(function (resp) {
                // 订单生成成功
                if(resp.data.code == "217"){
                  vm.$router.push({
                    name: 'goodsaddress', params: {orderId: JSON.stringify(resp.data.order_id)},
                  });
                }else if(resp.data.code == "403"){
                  console.log("订单已存在")
                }
              }).catch(err => {
                console.log('请求失败:' + err)
              })
            }else {
              alert("请选择购买的商品")
            }
          },100)
        }
      },
  }
</script>

<style scoped>
  /*----------------------购物车部分------------------------*/
  .container{
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: gray;
  }
  a:hover{
    color: #ff3538;
    text-decoration: none;
  }
  .cart {
    width: 990px;
    /*background: #e5f39d;*/
    margin: auto;
    margin-top: 100px;
    color: #c3c3c3;

  }

  .cart .header {
    margin-bottom: 20px;
  }

  .cart .header {
    width: 100%;
    height: 50px;
    background: #f3f3f3;
    border: #c3c3c3 1px solid;
    border-top: #c3c3c3 2px solid;
    box-sizing: border-box;
    display: flex;
    line-height: 50px;
    padding-left: 10px;
    color: #6f6f6f;
    font-size: 1.1em;
  }
  label{
    color: #6f6f6f;
    font-size: 1.1em;
    font-weight: 400;
  }
  .cart .header > div:nth-child(2){
    margin-left: 100px;
  }
  .cart .header > div:nth-child(3){
    margin-left: 310px;
  }
  .cart .header > div:nth-child(4){
    margin-left: 100px;
  }
  .cart .header > div:nth-child(5){
    margin-left: 115px;
  }
  .cart .header > div:nth-child(6){
    margin-left: 70px;
  }
  .cart .good-item {
    width: 100%;
    height: 120px;
    background: rgb(243, 243, 243);
    border: none;
    border-top: 1px #cecece solid;
    box-sizing: border-box;
    display: flex;
    line-height: 50px;
    padding-left: 10px;
  }

  .cart .good-item img {
    width: 80px;
    margin-top: 15px;
    margin-left: 10px;
    border: solid 1px #cecece;
    box-sizing: border-box;
  }
  .cart .good-item .item-01{
    display: flex;
  }
  .goods .good-item .good-name{
    margin-left: 40px;
    flex: 3;
  }
  .goods .good-item .good-name a{
    cursor: pointer;
  }
  .cart .good-item .price{
    font-size: 1em;
    color: #1c1c1c;
    cursor: pointer;
  }
  .goods .good-item > div {
    flex: 1;
  }
  .cart .good-item .btn-account{
    height: 20px;
    display: flex;
    flex-wrap: wrap;
    /*background: white;*/
  }
  .cart .good-item .btn-account .btn-num{
    width: 20px;
    height: 20px;
    margin-top: 15px;
    outline: none;
    text-align: center;
    background: white;
    line-height: 20px;
    cursor: pointer;
    border: 1px solid #d2d2d2;
    color: #707070;
  }
  .cart .good-item .btn-account input[type='text'] {
    width: 50px;
    height: 20px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    top: 15px;
  }
  .cart .good-item .btn-account .inventory{
    padding-left: 30px;
  }
  .goods .good-item .subtotal{
    margin-left: 50px;
    font-size: 1.1em;
    font-weight: 600;
    color: black;
  }
  .goods .good-item .operation a{
    display: block;
    text-decoration: none;
    width: 100px;
    height: 25px;
    cursor: pointer;
  }

  .good-account {
    width: 100%;
    height: 55px;
    border: solid 1px #d6d6d6;
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    line-height: 55px;
  }
  .good-account{
    padding-left: 10px;
  }
  .good-account > div {
    margin-right: 20px;
  }
  .good-account div a{
    cursor: pointer;
  }
  .good-account .clear-cart{
    flex: 3;
  }
  .good-account .select-good-num .good-num-color{
    color: red;
    font-weight: 600;
  }
  .good-account .total-prices .zongjia{
    font-size: 1.2em;
    font-weight: 700;
    color: red;
  }
  .good-account .btn-account{
    width: 100px;
    height: 55px;
    background: red;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    left: 21px;
    top: -1px;
    color: white;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
  }
  /*----------------------购物车部分------------------------*/
</style>
