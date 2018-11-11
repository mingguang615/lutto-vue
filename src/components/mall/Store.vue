<template>
  <div class="container">
    <!------------------------搜索框---------------------->
    <div class="row search">
      <div class="col-md-6 col-xs-2"></div>
      <div class="col-md-6 col-xs-10">
        <input type="text" id="search-box" placeholder="运动器材" v-model="condition" v-on:keyup.enter="searchData">
        <input type="button" id="search-btn" value="搜索" @click="searchData">
      </div>
    </div>
    <!------------------------搜索框---------------------->

    <!----------------------轮播图------------------------------>
    <div class="row hidden-xs">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div id="myCarousel" class="carousel slide">
          <!-- 轮播（Carousel）指标 -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <!-- 轮播（Carousel）项目 -->
          <div class="carousel-inner">
            <div class="item active">
              <img src="http://i7.hexunimg.cn/2014-04-02/163582611.jpg" alt="First slide"
                   style="width: 1280px;height: 350px">
              <!--<div class="carousel-caption">标题 1</div>-->
            </div>
            <div class="item">
              <img
                src="https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/0C/06/ChMkJlcMnFmIR_neAAW2HWCqjjkAAPwSgKb9TsABbY1074.jpg"
                alt="Second slide" style="width: 1280px;height: 350px">
              <!--<div class="carousel-caption">标题 2</div>-->
            </div>
            <div class="item">
              <img
                src="https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g5/M00/0C/06/ChMkJ1cMnFKIKCYFAANEc8Z_STEAAPwSQL6qOcAA0SL975.jpg"
                alt="Third slide" style="width: 1280px;height: 350px">
              <!--<div class="carousel-caption">标题 3</div>-->
            </div>
          </div>
          <!-- 轮播（Carousel）导航 -->
          <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <!----------------------轮播图------------------------------>

    <!-----------------商品部分--------------------------------->
    <div class="row center-block text-left" style="width: 80%;margin-top: 100px">
      <div class="col-md-3 col-sm-4 col-xs-6 good" v-for="li in list">
        <a @click="skip_good_detail(li.good_id)" class="good-img">
          <img v-bind:src="li.goode_url">
        </a>
        <div class="training-bottom">
          <div class="t1"><span v-text="li.intergal"></span>&nbsp;积分</div>
          <div class="t2" v-text="li.name.slice(1,35)"></div>
          <div class="t3"><a href="####" v-text="li.good_comment"></a>&nbsp;条评价</div>
          <div class="t4"><a href="####">蜗牛自营店</a></div>
          <div class="t6" id="add-success">加入成功</div>
          <div class="t5" title="加入购物车" @click="add_cart" :data-good-id="li.good_id"></div>
        </div>

      </div>
    </div>
    <!-----------------商品部分--------------------------------->

    <!----------分页--------------------->
    <div class="row" v-show="pagesize>1">
      <div class="col-md-12 text-center">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <a aria-label="Previous" @click="previous_page">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <!--分页-->
            <li v-for="i in pagesize"><a href="#" v-text="i" @click="getIndex(i)">1</a></li>
            <!--<li><a href="#">2</a></li>-->
            <!--<li><a href="#">3</a></li>-->
            <!--<li><a href="#">4</a></li>-->
            <!--<li><a href="#">5</a></li>-->
            <li>
              <a aria-label="Next" @click="next_page">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!--<div class="col-md-1"></div>-->
    </div>
    <!----------分页--------------------->

    <!-- data-backdrop="false"去除遮罩层  -->
    <div class="modal fade bd-example-modal-sm" id="myModalCart" role="dialog" data-backdrop="false" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <p class="text-center mb-0">
            <i class="fa fa-check-circle text-success mr-1" aria-hidden="true"></i>
            加入成功
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'mall',
    data: function () {
      return {
        condition: '',//默认搜索关键字为空
        pagesize: 0,//默认分页数量
        pageindex: 1,//默认当前页码为第1页
        list: []//商品集合
      }
    },
    mounted: function () {
      //设置当前位于商城页面
      window.sessionStorage.setItem("from", "/mall")
      //渲染数据
      this.getData();
      //渲染分页页码
      this.getPagesize()
    },
    created: function () {
      this.$emit('flushnav')
    },
    methods: {
      //初始化数据
      getData: function () {
        let vm = this;
        //发送ajax,获取页面初始化数据，get请求
        axios({
          method: 'get',
          url: this.GLOBAL.HOST + 'shop/search/?index=' + vm.pageindex + '&name=' + vm.condition
        }).then(function (resp) {
          vm.list = resp.data;
        }).catch(err => {
          console.log('请求失败:' + err)
        })
      },

      //获取分页数量
      getPagesize: function () {
        let vm = this;
        //发送ajax请求页码数量，get请求
        axios({
          method: 'get',
          url: this.GLOBAL.HOST + 'shop/account/?name=' + vm.condition
        }).then(function (resp) {
          vm.pagesize = Math.ceil(resp.data.acount / 20)
        }).catch(err => {
          console.log('请求失败:' + err)
        })
      },

      //获取搜索的数据
      searchData: function () {
        //当前页码位置置第一页
        this.pageindex = 1;
        //重新渲染数据
        this.getData();
        //重新获取分页数量
        this.getPagesize()
      },

      //获取当前点击的分页页码
      getIndex: function (i) {
        this.pageindex = i;
        this.getData()
      },

      //点击时触发下一页
      next_page: function () {
        //判断当前页码是否小于页码总数，是则当前页码加1
        if (this.pageindex < this.pagesize) {
          this.pageindex += 1;
        }
        //重新渲染数据
        this.getData();
        //重新获取分页数量
        this.getPagesize()
      },

      //点击时触发上一页
      previous_page: function () {
        //判断当前页码是否大于1，大于1时页码减1
        if (this.pageindex > 1) {
          this.pageindex -= 1;
        }
        //重新渲染数据
        this.getData();
        //重新获取分页数量
        this.getPagesize()
      },

      //跳转到商品详情界面
      skip_good_detail: function (id) {
        // this.$emit('good',e.target.getAttribute('data-good-id'))
        //跳转到商品详情界面
        this.$router.push({
          name: 'goods_detail',
          params: {gid: id},
        });
      },
      //添加到购物车中
      add_cart: function (e) {
        let vm = this;
        let vme = e
        let good_id = e.target.getAttribute("data-good-id")
        //获取保存在sessionStorage中的token
        let token = window.sessionStorage.getItem("token");
        //封装发送的ajax数据
        let data = {
          "token": token,
          "good_id": good_id,
          "num": 1,//商品数量
        };
        //请求Ajax，post的请求
        axios({
          method: 'post',
          data: data,
          url: this.GLOBAL.HOST + 'shop/addgood/'
        }).then(function (resp) {
          let code = resp.data.code;
          let add_suc = vme.target.previousElementSibling
          //返回code206即商品添加成功
          if (code == "206") {
            add_suc.style.opacity = 1
            let aa = setInterval(function () {
              add_suc.style.opacity -= 0.01
              if(add_suc.style.opacity == 0){
                clearInterval(aa)
              }
            },10)
            // vm.$router.push({path: '/cart',});
            //411用户未登录，跳转到登陆界面
          } else if (code == "411") {
            //保存当前路由到sessionStorage中key为from
            window.sessionStorage.setItem("from", "/store");
            //跳转到登陆界面
            vm.$router.push({path: '/login',});
            //403商品已经添加到购物车中
          } else if (code == "403") {
            //跳转到购物车界面
            vm.$router.push({path: '/cart'});
          }
        }).catch(err => {
          console.log('请求失败:' + err)
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .container, html, body {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  /*------------------------搜索框------------------------*/
  .search {
    position: relative;
    margin-bottom: 50px;
    display: flex;
  }

  #search-box {
    width: 65%;
    height: 40px;
    border: solid 2px red;
    outline: none;
    box-sizing: border-box;
    padding-left: 5px;
  }

  #search-btn {
    height: 40px;
    width: 80px;
    outline: none;
    border: none;
    font-size: 1.2em;
    background: red;
    color: white;
    box-sizing: border-box;
    position: relative;
    top: 1px;
  }

  /*------------------------搜索框------------------------*/

  /*------------------------主体部分------------------------*/
  .good {
    width: 255px;
    height: 470px;
    margin: 15px;
    padding-top: 8px;
  }

  .good a {
    cursor: pointer;
  }

  .good-img img {
    width: 230px;
    height: 300px;
  }

  .good:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .training-bottom {
    position: relative;
  }

  .training-bottom .t1 {
    color: red;
    font-size: 1.3em;
    margin-top: 15px;
  }

  .training-bottom .t2 {
    font-size: .9em;
    margin-top: 15px;
  }

  .training-bottom .t3 {
    font-size: .9em;
    margin-top: 15px;
  }

  .training-bottom .t4 {
    font-size: .9em;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .training-bottom .t4 a {
    color: #919191;
  }

  .training-bottom .t5 {
    width: 32px;
    height: 32px;
    position: absolute;
    background: url("../../assets/store/cart.svg");
    top: 100px;
    left: 160px;
    cursor: pointer;
  }
  .training-bottom .t6{
    overflow: hidden;
    height: 20px;
    position:relative;
    width: 50px;
    top: -78px;
    left: 153px;
    background: #ff866e;
    font-size: 0.85em;
    border-radius: 4px;
    opacity: 0;
    line-height: 20px;
  }


  /*------------------------主体部分------------------------*/

</style>
