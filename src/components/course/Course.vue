<template>
  <div class="container">
    <!--<div class="search">-->
    <!--<div>-->
    <!--<input type="text" id="search" >-->
    <!--<input type="button" value="搜索" @click="skipsearch" id="btnSearch">-->
    <!--</div>-->
    <!--</div>-->
    <div class="row" style="position: relative;top: -20px;">
      <!--<img src="../../assets/course/134679459.jpg"  style="width: 100%;height:610px;background-size: cover;background-position: center" alt="">-->
      <img src="http://www.whytewoolf.com/static/upload/2018/10/11/60f6afe11db6de16.jpg" style="width: 100%" alt="">
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="main">
          <div class="main-content">
            <div class="content-title">
              <div class="title1"><p>课程分类</p></div>
              <div class="title2">丰富的训练课程，规范你的训练过程</div>

            </div>
            <div class="content-info">
              <div class="coursetype" :data-coursetype-id=course.id @click="skip" v-for="course in list"
                   :style="{backgroundImage: 'url(' + course.picture_url + ')' } ">
                <!--<p>{{course.type_name}}</p>-->
                <p>{{course.type_name}}</p>
                <p class="nums">{{course.nums}}个课程</p>
              </div>
            </div>
            <div class="bottom">
              <div class="word">没有想要的分类</div>
              <div class="all-class" @click="skip2">全部课程</div>
            </div>

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
    name: 'course',
    data: function () {
      return {
        condition: '',
        pageindex: 1,
        list: [],
        pagesize: 0,
        param: ''
      }

    },
    created() {
      this.$emit('flushnav')
    },
    mounted: function () {
      window.scrollTo(0, 0);

      this.getdata()
    },
    methods: {
      skip: function (e) {
        let $obj = $(e.target).parents('.coursetype')
        let i = $obj.attr('data-coursetype-id')
        if (i) {
          this.$router.push({
            name: 'CourseFenlei',
            params: {tid: i},
          });
        }
      },
      skip2: function (e) {

        this.$router.push({
          name: 'coursesearch',
          params: {cname: ''},
        });

      },

      skipsearch: function () {
        let i = $('#search').val()
        console.log(i)
        this.$router.push({
          name: 'coursesearch',
          params: {cname: i},
        })
      },
      tiaozhuan: function () {
        let routeData = this.$router.resolve({
          name: "CourseFenlei",
          // query: params,
          // params:{catId:params.catId}
        });
        window.open(routeData.href, '_blank');

      },
      getdata: function () {
        var vm = this;
        axios({
          url: this.GLOBAL.HOST + 'course/getcoursefenlei/'
        }).then(function (response) {
          vm.list = response.data
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      getPageSize: function () {
        var vm = this
        axios({
          url: this.GLOBAL.HOST + 'job/acount/' + vm.condition + '/'
        })
          .then(function (response) {
            vm.pagesize = Math.ceil(response.data.acount / 20)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      searchData: function () {
        this.pageindex = 1;
        this.getdata()
        this.getPageSize()
      },
      getIndex: function (i) {
        this.pageindex = i;
        this.getdata();
      }

    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body, ul, li, h1, h2, h3, h4, p, html .container {
    margin: 0;
    padding: 0;
    /*overflow: auto;   在需要时内容会自动添加滚动条*/
    /*overflow: scroll;   总是显示滚动条*/
    /*overflow-x: hidden;  !*禁止横向的滚动条*!*/
    /*overflow-y: scroll;  总是显示纵向滚动条*/
  }

  .container {
    width: 100%;
  }

  /*去除列表的符号样式*/
  ul li {
    list-style-type: none;
  }

  a {
    /*去除超链接下划线*/
    text-decoration: none;
    color: white;
  }

  /*搜索框-----------------------------*/
  .search {
    width: 100%;
    height: 100px;
    padding-top: 35px;
    box-sizing: border-box;
  }

  .search div {
    /*width: 32%;*/
    height: 35px;
    margin-left: 50%;
  }

  .search div #search {
    width: 350px;
    height: 35px;
  }

  .search div #btnSearch {
    width: 120px;
    height: 35px;
    background: darkslategray;
    color: white;
    border: none;
  }

  .main {
    width: 100%;

  }

  .main .main-content {
    width: 100%;
    /*height: 600px;*/
    margin: auto;
    /*padding-top: 70px;*/
    /*background-color: #fafafa;*/
  }

  .main .main-content .content-title {
    width: 100%;
    height: 200px;
    align-items: center;

    /*background-color: #efffe3;*/
    margin: auto;

  }

  .main .main-content .content-title .title1 {
    font-size: 23px;
    height: 115px;
    font-weight: bold;
    line-height: 115px;
    text-align: center;
    color: #24c789;

  }

  .main .main-content .content-title .title2 {
    font-size: 15px;
    text-align: center;
    color: grey;

  }

  .main .main-content .content-info {

    display: flex;
    flex-wrap: wrap;

  }

  .main .main-content .content-info .coursetype {
    list-style: none;
    width: 50%;
    height: 375px;
    /*background: url("https://static1.keepcdn.com/2018/01/26/16/1516955563493_750x700.jpg");*/
    background-size: cover;
    background-position: center;
    font-size: 20px;
    font-weight: bold;
    color: whitesmoke;
    line-height: 190px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .main .main-content .content-info .coursetype p {
    /*widows: 50px;*/
    /*margin-top: 50px;*/
    /*margin: auto;*/
    text-align: center;
    font-size: larger;

  }

  .main .main-content .content-info .coursetype .nums {
    /*widows: 50px;*/
    font-size: 15px;
    /*color: grey;*/
    font-weight: lighter;
  }

  .main .main-content .content-info div:hover {
    cursor: pointer;
  }

  .main .main-content .bottom {
    width: 100%;
    height: 145px;

  }

  .main .main-content .bottom div {
    margin: auto;
    position: relative;
    top: 35px;
    text-align: center;
    line-height: 32px;
    font-size: 10px;
    color: grey;
  }

  .main .main-content .bottom .word {
    width: 155px;
    height: 32px;
  }

  .main .main-content .bottom .all-class {
    width: 155px;
    height: 32px;
    border: solid 1px #67d8ad;
    border-radius: 20px;
    color: #67d8ad;

  }

  .main .main-content .bottom .all-class:hover {
    cursor: pointer;
  }


</style>
