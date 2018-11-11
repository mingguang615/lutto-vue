<template>
  <div class="container">
    <!------------------------商品详情---------------------------->
    <div class="good-details" :data-good-id=$route.params.goods_id v-for="item in goods">
      <!----------商品左半部分-------------->
      <div class="good-left">
        <div class="good-img">
          <!--动态改变商品图片-->
          <img v-bind:src="change_url" alt="">
        </div>
        <div class="good-right-info">
          <div class="share"><a href="####"><img src="../../assets/good_details/share.svg" alt="">&nbsp;分享</a></div>
          <div class="collect" @click="love_good">
            <a>
              <img v-if="show_xingxing" src="../../assets/good_details/collect.svg" alt="">
              <img v-if="!show_xingxing" src="../../assets/good_details/collect-red.svg" alt="">
              收藏商品
            </a>
          </div>
          <div class="report"><a href="####">举报</a></div>
        </div>
      </div>

      <!----------商品右半部分-------------->
      <div class="good-right text-left">
        <div class="good-name" v-text="item.name"></div>
        <div class="good-price">
          <div class="price">
            <span class="price-p1">乐&nbsp;途&nbsp;价</span>
            <span class="price-p2">
              <span v-text="item.intergal"></span>
              <span>积分</span>
            </span>
          </div>
        </div>
        <div class="freight">
          <span class="t1">运费</span>
          <span class="t2 same-font">浙江金华</span>
          <span class="t3 same-font">至</span>
          <span class="t4 same-font">苏州<img src="../../assets/good_details/arrows.svg" alt="">苏州工业园区<img
            src="../../assets/good_details/arrows.svg"></span>
          <span class="t5 same-font">快递：0.00</span>
        </div>
        <div class="good-check">
          <div class="select-color">查看样式</div>
          <div class="good" :data-good-url=img_url v-for="img_url in item.url_size_1" v-bind:style="{ 'background-image': 'url(' + img_url + ')'}" @click="change_image"></div>
        </div>
        <div class="good-account">
          <div class="good-account-info">数量</div>
          <div class="good-num">
            <input type="text" id="num" v-model="good_num">
          </div>
          <div class="query-num">
            <input type="button" class="up" value="+" @click="buyGoodNumberPlus">
            <input type="button" class="down" value="-" @click="buyGoodNumberMinus">
          </div>
          <label for="num" class="num-jian">件</label>
          <div class="good-inventory">库存<span v-text="item.good_kucun"></span>件</div>
        </div>
        <div class="good-button">
          <div class="lijiduihuan" @click="go_buy(goods_id,item.intergal)">立即兑换</div>
          <!--添加购物车成功时提示信息-->
          <div id="add-success"></div>
          <div class="jiaru-cart" @click="add_cart">
            <img style="cursor: pointer" src="../../assets/good_details/cart.svg" alt="">
            加入购物车
          </div>
        </div>
      </div>
    </div>

    <!----------商品详情信息------------------->
    <div class="good-info" v-for="item in goods">
      <!--商品描述导航-->
      <div class="good-info-nav" >
        <div class="good-xiangqing">
          <span @click="goodsdescShow">商品详情</span>
        </div>
        <div @click="goodsevaluateShow" class="good-pingjia">
          <span class="t1">商品评价(<span v-text="item.comment_num"></span>)</span>
          <!--<span class="t2">275297</span>-->
        </div>
      </div>

      <!--商品详情描述-->
      <div v-if="!goods_show" class="good-desc" v-for="good in goods">
        <div class="good-info-desc text-left">
          <div class="good-brand">品牌名称:<span v-text="good.goodbrand_name"></span></div>
          <div class="product-parameter">产品参数:</div>
          <div class="product-parameter-desc">
            <ul>
              <!--------------------商品详情--------------------------------------->
              <li v-for="li in good.gooddesc" v-text="li.slice(0,19)"></li>
            </ul>
          </div>
        </div>
        <div class="good-info-img">
          <img v-for="ii in good.url_size_3" v-bind:src="ii">
        </div>
      </div>

      <!--商品评价-->
      <div v-if="goods_show" class="good-evaluate">
        <!--<div class="evaluate-title">商品评价</div>-->
        <!--<div class="evaluate-info">-->
          <!--<div class="pingjia-title">-->
            <!--<div class="left">-->
              <!--<div class="good-reputation">好评度</div>-->
              <!--<div class="haopingdu">96%</div>-->
            <!--</div>-->
            <!--<div class="right">-->
              <!--<ul>-->
                <!--<li>安装简单(235)</li>-->
                <!--<li>在家健身(221)</li>-->
                <!--<li>物流很快(192)</li>-->
                <!--<li>操作简单(179)</li>-->
                <!--<li>物美价廉(153)</li>-->
                <!--<li>送货到家(112)</li>-->
                <!--<li>效果不错(112)</li>-->
                <!--<li>质量很好(108)</li>-->
                <!--<li>机器很棒(104)</li>-->
                <!--<li>美观大方(104)</li>-->
                <!--<li>美观大方(104)</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--筛选评论内容-->
        <!--<div class="pinjia-select" v-if="show_pinglun">-->
          <!--<div>-->
            <!--<ul class="item">-->
              <!--<li>全部评价(10万+)</li>-->
              <!--<li>晒图(500)</li>-->
              <!--<li>追评(500+)</li>-->
              <!--<li>好评(10万+)</li>-->
              <!--<li>中评(2400+)</li>-->
              <!--<li>差评(1400+)</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="banner">推荐排序 <img src="../../assets/good_details/down.svg" alt="">-->
            <!--<ul>-->
              <!--<li>推荐排序</li>-->
              <!--<li>时间排序</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->

        <!--用户评论商品的内容-->
        <div class="pingjia-container" v-if="show_pinglun" v-for="comm in comm_list" :data-comm-id="comm.comment_id">
          <div class="container-heard">
            <div class="user-heard-img" v-bind:style="{ 'background-image': 'url(' + GLOBAL.IMG+comm.icon_url + ')'}"></div>
            <div class="user-name" v-text="comm.name">147***9198</div>
            <div class="pingjia-info-container">
              <div class="user-pingjia-info" v-text="comm.content">
                此用户没有发表评价
              </div>
              <div class="user-buy-goodstype">
                <!--<div class="info">经典款</div>-->
                <div class="pingjia-date" v-text="comm.time">2018-10-19 19:20</div>
                <div class="report-way">
                  <div class="t1">举报</div>
                  <div class="t2">
                    <img  @click="getDianzan" :data-comm-id="comm.comment_id" v-bind:src="imgUrl" alt="" style="position: relative;top: -3px;"/>
                    <!--<img  @click="getDianzan" :data-comm-id="comm.comment_id" :src="Bol == 1?imgUrl : imgUrl2" alt="" style="position: relative;top: -3px;">-->
                    <!--<img v-if="!show_dianzan" @click="getDianzan" :data-comm-id="comm.comment_id" src="../../assets/good_details/dianzan-red.svg" title="取消点赞" style="position: relative;top: -3px;">-->
                  </div>
                  <span style="position: relative;left: -15px" v-text="comm.likes">11</span>
                  <div class="t3" @click="comment"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-bottom"  style="overflow: hidden;height: 0">
            <div class="t1">
              <textarea name="comm" cols="80" rows="3" placeholder="请输入留言内容:"></textarea>
              <div class="t2">
                <button @click="getCommText" :data-comm-id="comm.comment_id">发表</button>
              </div>

            </div>

          </div>
          <div class="all_huifuu" style="margin: 25px 0 10px 60px;width: 1008px;height: 100%;background: #f3f3f3;">
            <div class="huifu" v-for="reply in  comm.replycomment">
              <div class="line_height">
                <div>
                  <span><img class="small_icon" :src="GLOBAL.IMG+reply.icon_url" alt=""></span>
                  <span v-text="reply.name">{{reply.name}}</span>
                </div>
                <div>
                  <span class="small_info" v-text="reply.content">{{reply.content}}</span>
                  <img class="del1" src="../../assets/course/删除.svg" :tt="reply.id" @click="toDel(reply.id)" alt="" v-if="reply.deletereply_flag" style="width: 20px;height: 20px;float: right" >
                </div>
                <div>
                  <span class="small_time" v-text="reply.time"></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!--当该商品没有评论的时候显示该div-->
        <div class="good-back-img" v-if="!show_pinglun"></div>
      </div>

    </div>

    <!--模态框-->
    <!-- data-backdrop="false"去除遮罩层  -->
    <div class="modal fade bd-example-modal-sm" id="myModalDesc" role="dialog" data-backdrop="false" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <p class="text-center mb-0">
            <span class="fa fa-check-circle text-success mr-1" aria-hidden="true" v-text="motai_data"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // <!--导入ajax-->
  import axios from 'axios'
  // import $ from 'jquery'
  export default {
    name: 'goods_detail',
    data() {
      return {
        goods_id: '',//商品id
        goods:[],//商品集合
        change_url:[],//改变时商品的url
        good_num:1,//购买的商品数量，默认为1
        goods_show:false,//默认情况下评论模块不显示
        show_comm: false,//默认不显示商品评论框
        comm_list:[],//评论内容列表
        motai_data:"",//模态框提示信息
        show_pinglun:true,//筛选评论默认显示
        show_xingxing:true,//默认未收藏显示
        show_dianzan:true,//点赞默认未点赞，灰色
        Bol:1,//切换点赞图片
        imgUrl:require("../../assets/good_details/dianzan.svg"),//灰色点赞图片
        imgUrl2:require('../../assets/good_details/dianzan-red.svg'),//红色点赞图片
      }
    },
    created: function () {
      this.goods_id = this.$route.params.gid;
      window.sessionStorage.setItem("from","/detail/"+this.goods_id);
      this.$emit('flushnav')
    },
    mounted: function () {
      // 设置当前滚动条为0，0
      window.scrollTo(0, 0);
      this.getData();
      this.show_shoucang()//收藏商品
    },
    methods:{
      //获取详情页数据
      getData:function(){
        let vm = this;
        axios({
          method: 'get',//get请求
          //请求的地址
          url: this.GLOBAL.HOST+'shop/getgoods/?gid='+vm.goods_id
        }).then(function (resp) {
          //调用处理商品方法，传参resp.data
          vm.goods = resp.data;
          //默认商品初始大图
          vm.change_url = resp.data[0].url_size_1[0];
          // console.log(resp.data)
        }).catch(err => {
          console.log('请求失败:' + err)
        });
      },

      //动态切换图片
      change_image:function (e) {
        //获取当前点击的图片的url给change_url
        this.change_url = e.target.getAttribute('data-good-url')
      },

      //购买商品的数量加1
      buyGoodNumberPlus:function () {
        this.good_num = parseInt(this.good_num)+1;
      },

      //购买商品数量减1
      buyGoodNumberMinus:function () {
        if (parseInt(this.good_num)>1){
          this.good_num =parseInt(this.good_num)-1;
        }
      },

      //商品描述模块隐藏
      goodsdescShow:function () {
        this.goods_show = false;
      },

      //添加购物车
      add_cart:function (e) {
        let vm = this;
        let vme = e
        let token = window.sessionStorage.getItem("token");
        let data = {
          "token":token,
          "good_id":vm.goods_id,
          "num":parseInt(vm.good_num),//商品数量
        };
        axios({
          method: 'post',
          data:data,
          url: this.GLOBAL.HOST+'shop/addgood/'
        }).then(function (resp) {
          let code = resp.data.code;
          let add_suc = vme.target.previousElementSibling
          if(code=="206"){
            add_suc.style.opacity = 1
            let a = -40
            let aa = setInterval(function () {
              add_suc.style.top = a.toString()+'px'
              a += 0.45
              add_suc.style.opacity -= 0.01
              if(add_suc.style.opacity == 0){
                clearInterval(aa)
              }
            },10)
          }else if(code == "411"){
            vm.$router.push({path: '/login',});
          }else if(code == "403"){
            vm.$router.push({path: '/cart',});
          }
        }).catch(err => {
          console.log('请求失败:' + err)
        })
      },

      //获取评论信息
      getCommData:function(){
        let vm = this;
        axios({
          method: 'get',//get请求
          //请求的地址
          url: this.GLOBAL.HOST+'shop/getcomment/?gid='+vm.goods_id
        }).then(function (resp) {
          let code = resp.data.code
          //234获取该商品评论信息成功
          if(code == "234"){
            //将获取到的数据赋值给comm_list
            vm.comm_list = resp.data.data
            //  434该商品评论为空
          }else if(code == "434"){
            vm.show_pinglun = false;//筛选评论选项置false
            vm.comm_list = [] //comm_list赋值为空数组

          }
        }).catch(err => {
          console.log('请求失败:' + err)
        });
      },

      //商品评论模块显示
      goodsevaluateShow:function () {
        this.goods_show = true;
        this.getCommData()
      },

      //动画显示留言框的方法
      comment:function (e) {
        // 找到留言框的节点
        let comm=e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        //开始高度为
        let jj = 0
        //当高度为0px时每次1毫秒执行一次,不给时间时默认1毫秒触发一次
        if(comm.style.height == "0px"){
          let ss= setInterval(function () {
            //高度加1
            jj += 1
            comm.style.height = jj.toString()+"px"
            //高度等于160时清楚计时器
            if(jj == 160){
              clearInterval(ss)
            }
          },1)
        }else{
          let jj = 160
          let ss= setInterval(function () {
            jj -= 1
            comm.style.height = jj.toString()+"px"
            if(jj == 0){
              clearInterval(ss)
            }
          })
        }
      },

      //获取用户评论的信息
      getCommText:function(e){
        let vm = this
        //找到文本域并取到其中的内容
        let text = e.target.parentElement.previousElementSibling.value
        let commentid=e.target.getAttribute('data-comm-id')
        let token = window.sessionStorage.getItem('token')
        if(token){
          let data1={
            "content":text,
            "comment_id":commentid,
            "token":token
          }
          let vm=this
          axios({
            method: 'POST',//get请求
            data:data1,
            //请求的地址
            url: this.GLOBAL.HOST+'shop/shopreply/'
          }).then(function (resp) {
            vm.getCommData()
          }).catch(err => {
            console.log('请求失败:' + err)
          });
        }else {
          window.sessionStorage.setItem("from","/detail/"+vm.goods_id)
          vm.$router.push({path:"/login"})
        }
      },

      //立即兑换
      go_buy:function (gid,price) {
        let token = window.sessionStorage.getItem("token")
        let vm = this

        if(token){
          let goods = []
          //封装数据
          let gg={
            "good_id":gid,
            "good_num":parseInt(vm.good_num),
            "total":parseInt(vm.good_num)*parseInt(price)
          }
          goods.push(gg) //追加到goods数组中
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
            console.log(resp.data)
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
          window.sessionStorage.setItem("from","/detail/"+gid)
          vm.$router.push({path:"/login"})
        }
      },

      //收藏商品
      love_good:function () {
        let vm = this
        let good_list = new Array() //定义一个空数组
        good_list.push(vm.goods_id)
        //获取本地保存的token信息
        let token = window.sessionStorage.getItem("token");
        if(token){
          if(vm.show_xingxing){
            let data = {
              "token": token,
              "good_id": good_list
            };
            let vm1 = vm
            axios({
              method: 'post',
              data: data,
              url: this.GLOBAL.HOST + 'shop/lovegood/'
            }).then(function (resp) {
              //收藏成功
              if(resp.data.code == "212"){
                vm.show_xingxing = false
                //  417已经被收藏了
              }else if(resp.data.code == "417"){
                vm.show_xingxing = false
              }else if(resp.data.code == "411"){
                vm.$router.push({path:"/detail/"+vm1.goods_id})
              }
            }).catch(err => {
              console.log('请求失败:' + err)
            })
          }else {
            let data = {
              "headers":{"token": window.sessionStorage.getItem("token")},
              "good_id": vm.goods_id
            };
            axios({
              method: 'post',
              data: data,
              url: this.GLOBAL.HOST + 'user/dellove/'
            }).then(function (resp) {
              //删除收藏的商品成功
              if(resp.data.code == "213"){
                vm.show_xingxing = true
                //  417已经被收藏了
              }else if(resp.data.code == "422"){
                vm.show_xingxing = true
              }
            }).catch(err => {
              console.log('请求失败:' + err)
            })
          }
        }else {
          window.sessionStorage.setItem("from","/detail/"+vm.goods_id)
          vm.$router.push({path:"/login"})
        }
      },

      // 初始化时显示商品是否被收藏
      show_shoucang:function () {
        let vm = this
        let token = window.sessionStorage.getItem("token");
        if(token){
          let data = {
            "headers":{"token": token}
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'user/getlove/'
          }).then(function (resp) {
            //判断返回来的数据是否有code这个key
            if(resp.data.hasOwnProperty("code")){
              if(resp.data.code == "411"){
                window.sessionStorage.setItem("from","/detail/"+vm.goods_id)
                vm.$router.push({path:"/login"})
              }else if(resp.data.code == "421"){
                // vm.style.background = url()
                vm.show_xingxing = true
              }
            }else {
              for(let item of resp.data){
                if(item.good_id == vm.goods_id){
                  vm.show_xingxing = false
                  break //终止循环
                }
              }
            }
          }).catch(err => {
            console.log('请求失败:' + err)
          })
        }
      },

      //商品评论点赞
      getDianzan:function (e) {
        let vm = this
        let token = window.sessionStorage.getItem("token");
        let comm_id = e.target.getAttribute("data-comm-id")
        if(token){
          let data = {
            "token": token,
            "comment_id":comm_id
          };
          axios({
            method: 'post',
            data: data,
            url: this.GLOBAL.HOST + 'shop/likecomment/'
          }).then(function (resp) {
            let code = resp.data.code
            //215点赞成功
            if(code == "215"){
              e.target.src = vm.imgUrl2
              vm.getCommData()
            //  214点赞失败
            }else if(code == "214"){
              e.target.src = vm.imgUrl
              vm.getCommData()
            //  411未登录
            }else if(code == "411"){
              window.sessionStorage.setItem("from","/detail/"+vm.goods_id)
              vm.$router.push({path:"/login"})
            }

          }).catch(err => {
            console.log('请求失败:' + err)
          })
        }else{
          window.sessionStorage.setItem("from","/detail/"+vm.goods_id)
          vm.$router.push({path:"/login"})
        }
      }
    },

    watch:{
      good_num:function () {
        if (!isNaN(this.good_num) && this.good_num % 1 === 0) {
          // return true;
        } else {
          this.good_num = 1
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .huifu {
    width: 930px;
    border-top: dashed 1px lightgray;
    /*padding-bottom: 5px;*/
  }
  .line_height {
    height: 50px;
    margin: 15px 0;
  }
  .line_height div{
    float: left;
  }
  .line_height>div:nth-child(1){
    width: 140px;
  }
  .line_height>div:nth-child(2){
    width: 690px;
  }
  .line_height>div:nth-child(3){
    padding-left: 10px;
  }
  .line_height span {
    padding: 0 !important;
    margin: 0 3px;
  }
  .small_info {
    width: 500px;
    word-wrap:break-word;
    color: #565656;
  }

  .small_time {
    color: darkgray;
  }

  .small_icon {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50%;
  }

  /*m模态框样式*/
  .modal-content {
    margin-top: 60px;
    margin-left: 660px;
    line-height: 25px;
    background: #e0ebff;
    height: 25px;
    width: 70px;
  / / 宽度自适应内容 width: fit-content;
  / / 流出间隙 padding: 0.2 rem 0.4 rem;
  }

  body, .container {
    padding: 0;
    margin: 0;
    width: 100%;
    position: relative;
    top:-20px;
  }

  /*----------商品详情左半部分---------------------*/
  .good-details {
    width: 1008px;
    height: 450px;
    margin: auto;
    margin-top: 50px;
    display: flex;
  }
  .good-left .good-img img {
    width: 350px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .good-left .good-right-info {
    margin-top: 30px;
    margin-left: 20px;
    display: flex;
  }

  .good-left .good-right-info >div{
    cursor: pointer;
  }
  .good-left .good-right-info a {
    color: #9b9b9b;
  }

  .good-left .good-right-info .share a:hover {
    text-decoration: none;
  }

  .good-left .good-right-info .collect a:hover {
    text-decoration: none;
  }

  .good-left .good-right-info .collect {
    margin-left: 20px;
    color: #9b9b9b;
  }

  .good-left .good-right-info .report {
    margin-left: 40px;
  }

  /*----------商品详情左半部分---------------------*/


  /*----------商品详情右半部分---------------------*/
  .good-details .good-right {
    width: 780px;
    height: 500px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .good-right .good-name {
    color: #383838;
    font-size: 1.3em;
    font-weight: 700;
    margin-top: 10px;
  }

  .good-right .good-price {
    width: 100%;
    /*height: 105px;*/
    background: #F3F3F3;
    padding-left: 10px;
    margin-top: 10px;
  }

  .good-right .good-price .price {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .good-right .good-price .price .price-p1 {
    font-size: 1em;
    color: #9b9b9b;
    margin: auto;
  }

  .good-right .good-price .price .price-p2 {
    font-size: 1.4em;
    color: red;
    margin-left: 10px;
  }

  .good-right .good-price .price a:hover {
    text-decoration: none;
  }
  .good-right .good-check {
    /*padding-left: 75px;*/
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
  }

  .good-right .good-check .good {
    background: url("https://img14.360buyimg.com/n0/jfs/t1/4156/30/2206/212252/5b96240cEc2d48235/435b019257e2f9df.jpg") no-repeat;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    background-size: cover;
  }
  .good-right .good-check .select-color{
    line-height: 60px;
    padding-right: 20px;
    color: #9b9b9b;
  }
  .good-right .good-check .good{
    cursor: pointer;
  }
  .good-right .good-check .good:hover {
    border: red 2px solid;
  }
  .good-right .freight {
    margin-top: 10px;
  }

  .good-right .freight .t1 {
    color: #9b9b9b;
  }

  .good-right .freight .t2 {
    margin-left: 30px;
  }

  .good-right .freight .same-font {
    font-size: 0.9em;
  }

  .good-right .evaluate .t1 {
    margin-left: 50px;
  }

  .good-right .evaluate .t2 {
    border-right: solid 1px #9b9b9b;
    padding-right: 30px;
  }
  .good-right .good-class .good-color-desc .good {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border: 1px solid #7b7b7b;
    /*background: url("https://img14.360buyimg.com/n0/jfs/t1/4156/30/2206/212252/5b96240cEc2d48235/435b019257e2f9df.jpg") no-repeat;*/
    background-size: cover;
    cursor: pointer;
  }
  .good-right .good-class .good-color-desc .good:hover {
    border: 2px solid red;
    box-sizing: border-box;
  }

  .good-right .good-account {
    margin-top: 10px;
    color: #7b7b7b;
    display: flex;
  }

  .good-right .good-account .good-account-info {
    line-height: 30px;
    margin-right: 48px;
  }

  .good-right .good-account .good-num {
    display: flex;
  }

  .good-right .good-account .query-num {
    margin-right: 10px;
  }

  .good-right .good-account .query-num .up {
    display: block;
    width: 25px;
    height: 15px;
    text-align: center;
    line-height: 12px;
    background: white;
    outline: none;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
  }

  .good-right .good-account .query-num .down {
    display: block;
    margin-top: 3px;
    width: 25px;
    height: 15px;
    line-height: 12px;
    text-align: center;
    outline: none;
    background: white;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
  }

  .good-right .good-account .good-num input {
    width: 43px;
    height: 33px;
    outline: none;
    text-align: center;
    margin-right: 10px;
  }

  .good-right .good-account .num-jian {
    line-height: 33px;
    color: #9b9b9b;
    font-weight: 500;
  }

  .good-right .good-account .good-inventory {
    line-height: 33px;
    margin-left: 20px;
  }

  .good-right .good-button {
    margin-top: 20px;
    display: flex;
    margin-left: 76px;
  }

  .good-right .good-button .lijiduihuan {
    width: 180px;
    height: 40px;
    border: 1px solid red;
    background: #ffc197;
    line-height: 40px;
    text-align: center;
    font-size: 1.06em;
    font-weight: 600;
    color: red;
    cursor: pointer;
  }

  .good-right .good-button .jiaru-cart {
    margin-left: 20px;
    width: 180px;
    height: 40px;
    border: 1px solid red;
    background: red;
    /*background: url("../../assets/good_details/cart.svg") no-repeat;*/
    line-height: 40px;
    text-align: center;
    font-size: 1.06em;
    font-weight: 600;
    color: white;
    cursor: pointer;
  }
  .good-right .good-footer-info > div {
    margin-right: 30px;
  }

  .good-right .good-footer-info > div a {
    color: #7b7b7b;
  }

  .good-right .good-footer-info > div a:hover {
    text-decoration: none;
  }

  /*----------商品详情右半部分---------------------*/

  .good-info {
    margin: auto;
    width: 1008px;
  }

  .good-info .good-info-nav {
    display: flex;
    border: 1px solid #aaaaaa;
  }

  .good-info .good-info-nav .good-xiangqing {
    color: red;
    font-size: 1.1em;
    font-weight: 600;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .good-info .good-info-nav .good-pingjia {
    color: red;
    font-size: 1.1em;
    font-weight: 600;
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-left: none;
    cursor: pointer;
  }


  /*---------商品描述------------------*/
  .good-desc{
    width: 1008px;
  }
  .good-info-desc {
    border: 1px solid #b6b6b6;
    border-top: none;
    padding-left: 30px;
  }

  .good-info-desc .good-brand {
    padding-top: 20px;
  }

  .good-info-desc .product-parameter {
    margin-top: 30px;
    color: grey;
    font-size: 1.1em;
  }

  .good-info-desc .product-parameter-desc {
    margin-top: 10px;
    color: #9b9b9b;
  }

  .good-info-desc .product-parameter-desc ul {
    margin: 0;
    /*padding: 0;*/
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }

  .good-info-desc .product-parameter-desc ul li {
    list-style-type: none;
    width: 240px;
    margin-top: 15px;
  }

  .good-info .good-info-img img{
    /*padding-left: 200px;*/
    margin-left: 219px;
    margin-top: 10px;
  }


  /* ------------------ 评价 ---------------- */
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .good-evaluate{
    width: 1008px;
    color: #a8a8a8;
  }

  .good-evaluate .evaluate-title{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    font-size: 1.1em;
    font-weight: 600;
    color: #787878;
    border: 1px solid #d4d4d4;
    box-sizing: border-box;
    background: #f4f4f4;
  }
  .good-evaluate .evaluate-info .pingjia-title .right ul{
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 30px;
  }
  .good-evaluate .evaluate-info .pingjia-title .right li{
    height: 25px;
    border: 1px solid #d7d7d7;
    margin-right: 30px;
    line-height: 25px;
    padding-left: 10px;
    border-radius: 3px;
    padding-right: 10px;
    margin-bottom: 10px;
  }
  .good-evaluate .pinjia-select{
    font-weight: 500;
    margin-top: 20px;
    width: 1008px;
    position: relative;
    padding-bottom: 50px;
  }
  .good-evaluate .pinjia-select .item{
    display: flex;
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
  }
  .good-evaluate .pinjia-select .item > li{
    margin-right: 30px;
    cursor: pointer;
  }
  .good-evaluate .pinjia-select .item > li:hover{
    color: red;
  }
  .good-evaluate .pinjia-select .banner{
    position: absolute;
    top: -4px;
    right: 30px;
  }

  .good-evaluate .pinjia-select .banner {
    float: left;
    text-align: center;
    height: 40px;
    /*width: 20%;*/
    line-height: 40px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .good-evaluate .pinjia-select .banner:hover {
    /*background-color: #00BFFF;*/
    cursor: pointer;
  }

  .good-evaluate .pinjia-select .banner ul {
    list-style: none;
    /*display: none;*/
    /*background-color: blue;*/
    overflow: hidden;
    /*模拟height:auto时候的情况*/
    max-height: 0;
    transition: max-height 0.3s;
    /*多浏览器支持*/
    -moz-transition: height 1s;
    -webkit-transition: height 1s;
    -o-transition: height 1s;
  }

  .good-evaluate .pinjia-select .banner:hover ul {
    width: 100%;
    max-height: 160px;
  }

  .good-evaluate .pinjia-select .banner ul li {
    padding-left: 5px;
    padding-right: 5px;
    overflow: hidden;
  }
  .good-evaluate .pinjia-select .banner ul li:hover {
    color: red;
  }
  .good-evaluate .pingjia-container{
    margin-top: 20px;
    padding-left: 20px;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 10px;
  }


   .pingjia-container .container-heard{
     display: flex;
   }

  .pingjia-container .container-bottom{
    width: 830px;
    margin-top: 20px;
    background: #eeeeee;
    margin-left: 150px;
    box-sizing: border-box;
  }
  .pingjia-container .container-bottom .t1{
    width: 800px;
    height: 90px;
    margin: auto;
    margin-top: 20px;
    background: white;
    padding: 10px;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
  }
  .pingjia-container .container-bottom textarea{
    resize: none;
    width: 780px;
    height: 70px;
    border: none;
  }
  .pingjia-container .container-bottom button{
    width: 80px;
    height: 30px;
    outline: none;
    background: red;
    border: none;
    color: white;
    font-size: 1.1em;
    margin-left: 700px;
    position: relative;
    top: 10px;
    border-radius: 3px;
  }

  .good-evaluate .pingjia-container .user-heard-img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: url("../../assets/good_details/头像.jpg");
    background-size: contain;
  }
  .good-evaluate .pingjia-container .user-name{
    width: 100px;
    line-height: 60px;
    padding-left: 10px;
    margin-right: 30px;
  }
  .pingjia-container .pingjia-info-container{
    width: 800px;
  }
  .pingjia-info-container .user-pingjia-info{
    margin-top: 10px;
    text-align: left;

  }
  .pingjia-info-container .user-buy-goodstype{
    margin-top: 10px;
    display: flex;
  }
  .user-buy-goodstype .pingjia-date{
    width: 640px;
  }
  .user-buy-goodstype .report-way{
    display: flex;
  }
  .user-buy-goodstype .report-way div{
    margin-right: 20px;
    cursor: pointer;
  }
  .user-buy-goodstype .report-way .t1{
    color: #969696;
  }
  .user-buy-goodstype .report-way .t1:hover{
    color: red;
  }
  .user-buy-goodstype .report-way .t3{
    background: url("../../assets/good_details/liuyan.svg") no-repeat;
    width: 20px;
    height: 20px;
  }
  .user-buy-goodstype .report-way .t3:hover{
    background: url("../../assets/good_details/liuyan-red.svg") no-repeat;
    width: 20px;
    height: 20px;
  }
  #add-success{
    overflow: hidden;
    height: 32px;
    position:relative;
    width: 50px;
    top: -40px;
    left: 105px;
    background: url("../../assets/good_details/goods.svg") no-repeat;
    font-size: 0.85em;
    border-radius: 4px;
    opacity: 0;
    line-height: 20px;
  }
  #add-shoucang{
    overflow: hidden;
    height: 32px;
    position:relative;
    width: 100px;
    top: -25px;
    left: 120px;
    font-size: 1em;
    border-radius: 4px;
    opacity: 0;
    line-height: 20px;
    color: red;
  }
  .good-back-img{
    width: 720px;
    height: 300px;
    margin: auto;
    margin-top: 80px;
    background: url("../../assets/good_details/pinglun-back.png") no-repeat;
  }
</style>
