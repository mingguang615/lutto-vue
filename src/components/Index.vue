<template>
  <div class="container">
    <div class="row hidden-xs">
      <div class="col-md-12 center-block video-control">
        <video src="//static1.gotokeep.com/homepage/5s.mp4" width="100%" muted autoplay loop></video>
        <img src="https://staticweb.keepcdn.com/showstatic/images/homepage/slogan-cfd33df7dd.png" id="img-head">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center ziti01">
        量体裁衣 & 多种健身训练供你选择
      </div>
      <div class="col-md-12 text-center ziti02">
        训练计划针对不同人群、各种器械和阶段健身目标组合编排，适用最广泛的健身场景
      </div>
    </div>
    <div class="row xunlian text-left">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-4  col-sm-6" v-for="cours in courses">
            <a>
              <div class="training-block center-block" @click="skip_course(cours.id)"
                   v-bind:style="{ 'background-image': 'url(' + cours.picture__url + ')'}">
                <div class="t1">{{cours.name}}</div>
                <div class="t2">{{cours.minute_avg}}分钟 {{cours.consume_total}}千卡</div>
                <div class="t3">{{cours.machine__name}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center ziti01">
        积分商城 & 尽情挥霍你的汗水
      </div>
      <div class="col-md-12 text-center ziti02">
        通过挥霍你的汗水，让你的装备无限升级
      </div>
    </div>
    <div class="row goods_mall">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3  col-sm-6 goods-item" v-for="item in goods">
            <!--<router-link :to="{name: 'goods_detail'}" target = _blank>查看详情</router-link>-->
            <a @click="skip_mall">
              <div :data-good-id=item.good_id class="goods-block center-block"
                   v-bind:style="{ 'background-image': 'url(' + item.url + ')'}" style="margin-top:10px ">
              </div>
              <div class="integral text-center">
                <span class="title">兑换积分：</span>
                <span class="price">{{item["good__intergal"]}}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'index',
    data() {
      return {
        goods: [],
        courses: []
      }
    },
    created () {
      this.$emit('flushnav')
    },
    mounted: function () {
      //窗口位置置坐标0，0
      window.scrollTo(0, 0);
      window.sessionStorage.setItem("from","/")
      //渲染首页数据
      this.getData()
    },

    methods: {
      getData:function(){
        let vm = this;

        //请求课程数据
        axios({
          method: 'get',
          //请求的主机地址
          url: this.GLOBAL.HOST+'course/getcourse/'
        }).then(function (resp) {
          for (let i=0;i<6;i++){
            vm.courses.push(resp.data[i])
          }
        }).catch(err => {
          console.log('请求失败:' + err.status + ',' + err.statusText)
        })

        //请求商品数据
        axios({
          method: 'get',
          //引用Host地址
          url: this.GLOBAL.HOST
        }).then(function (resp) {
          vm.goods = resp.data
        }).catch(err => {
          console.log('请求失败:' + err.status + ',' + err.statusText)
        });
      },
      //跳转到商城
      skip_mall: function (e) {
        // this.$emit('good',e.target.getAttribute('data-good-id'))
        this.$router.push({
          name: 'goods_detail', params: {gid: e.target.getAttribute('data-good-id')},
        });
      },
      //跳转到课程
      skip_course:function (cid) {
        // alert(e.target.getAttribute('data-course-id'))
        this.$router.push({
          name: 'courseinfo', params: {cid: cid},
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*------------------------主体部分------------------------*/
  .container {
    width: 100%;
    padding: 0;
  }

  .ziti01 {
    padding-top: 50px;
    padding-bottom: 25px;
    font-size: 24px;
    color: #473f4e;
  }

  .ziti02 {
    padding-bottom: 50px;
    font-size: 16px;
    color: #473f4e;
  }

  .container .video-control {
    text-align: center;
    position: relative;
    top: -20px;
  }

  #img-head {
    position: absolute;
    top: 30%;

  }

  .container .xunlian {
    width: 100%;
    /*height: 500px;*/
    background: #3D3744;
    margin: auto;
  }

  .container .xunlian div div {
    padding-left: 10px;
  }

  .xunlian a {
    text-decoration: none;
    color: white;
  }

  .xunlian a:hover {
    text-decoration: none;
    color: white;
  }

  .xunlian .t1 {
    font-size: 1.5em;
    font-weight: 700;
    padding-left: 20px;
    padding-top: 20px;
  }

  .xunlian .t2 {
    font-size: 1.2em;
    padding-left: 20px;
    padding-top: 10px;
  }

  .xunlian .t3 {
    font-size: 1.2em;
    padding-left: 20px;
    padding-top: 80px;
  }

  .training-block {
    width: 356px;
    height: 207px;
    background: url(https://static1.keepcdn.com/2016/11/08/15/1478591073270_750x700.jpg) no-repeat;
    background-size: cover;
    position: relative;
    margin-bottom: 10px;
    top: -20px;
  }

  .training-block:hover {
    transition: all 0.8s;
    transform: scale(1.07);
  }

  .container .goods_mall {
    padding-top: 30px;
    padding-bottom: 30px;
    background: #3D3744;
  }

  .container .goods_mall > div {
    cursor: pointer;
  }

  .container .goods_mall .goods-block {
    width: 250px;
    height: 250px;
    margin-bottom: 10px;
    background-size: contain;
    background-position: center;
  }

  .container .goods-block:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .container .goods_mall .integral .title {
    font-size: 1.1em;
    color: #e9e9e9;
  }

  .container .goods_mall .integral .price {
    font-size: 1.2em;
    color: #ff413c;
  }

  a:hover {
    text-decoration: none;
  }

  /*------------------------主体部分------------------------*/
</style>

