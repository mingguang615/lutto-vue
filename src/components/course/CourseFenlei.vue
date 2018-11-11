<template>

  <div class="container" style="overflow: hidden">
    <div class="search">
      <div>
        <input type="text" id="search">
        <input type="button" @click="skipsearch" value="搜索" id="btnSearch">
      </div>
    </div>
    <div class="row title">
      <div class="col-md-3 col-sm-2"></div>
      <div class="col-md-6  font-color-grey">
        <div class="col-md-6 col-sm-2 col-xs-6 " > <router-link to="/course"><span class="fenlei">课程分类</span></router-link> - {{my_type}}</div>
        <div class="col-md-6 col-sm-2 col-xs-6" style="text-align: right">共{{course_num}}个课程</div>

      </div>
      <div class="col-md-3 col-sm-2"></div>

    </div>
    <div class="content ">
      <ul>
        <li  v-for="course in list">
          <!--<a href="####" v-on:click.stop="doThis">-->
          <div class="course"  :data-course-id=course.id  @click="skip"  :style="{backgroundImage: 'url(' + course.picture__url + ')' } ">
            <p class="font-size-20">{{course.name}}</p>
            <p class="suojin">
              <span>{{course.day}}天</span>&nbsp;&nbsp;&nbsp;
              <span v-for="body in course.trainbody">{{body}}  </span>
            </p>
          </div>
          <div class="suojin" style="color: rgba(0,0,0,0.72);font-size: 10px">
            <p class="text">
              <span>{{course.level__level}}</span>

            </p>
            <p class="text">{{course.useradd}}人训练</p>
          </div>
          <!--</a>-->

        </li>
      </ul>

    </div>
    <pagination :currentPage="currentPage" :pageCount="parseInt(pageCount)" @prePage="prePage" @nextPage="nextPage" @jumpPage="jumpPage"></pagination>
  </div>

</template>


<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'CourseFenlei',
  data :function(){
    return{
      condition:'',
      // pageIndex:1,
      list:[],
      pagesize:0,
      type_id:'',
      my_type:'',
      course_num:'',
      cname:'',
      currentPage:1,
      pageCount:4,
    }

  },
  created: function () {
    this.type_id = this.$route.params.tid
    this.$emit('flushnav')
  },

  mounted:function(){
    window.scrollTo(0, 0);

    this.getdata()
    this.getPageSize()
  },
  methods:{
    skip:function (e) {
      let $obj = $(e.target).parents('.course')
      let id=$obj.attr('data-course-id')
      // let i = e.target.getAttribute('data-course-id')
      // console.log(i)
      if (id){
        this.$router.push({
          name: 'courseinfo',
          params:{cid:id},
        });
      }else {
        console.log('null id')

      }
    },
    skipsearch:function () {
      let cname = $('#search').val()
      // console.log(cname)
      this.$router.push({
        name: 'coursesearch',
        params:{cname:cname},
      });
    },
    getdata:function () {
      var vm = this;
      axios({
        url:this.GLOBAL.HOST+'course/getcoursebytypeid/'+vm.currentPage+'/'+vm.type_id+'/'
       // url: 'http://localhost:8000/course/getcoursebytypeid/1/'
      }).then(function (response) {
        // console.log(response.data)
        vm.list = response.data
        vm.my_type = vm.list[0].type__type_name
        // vm.course_num = vm.list[0].course_nums
        // console.log(vm.list)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPageSize:function(){
      var vm =this
      // alert(vm.type_id)
      axios({
        url:this.GLOBAL.HOST+'course/pageacountbytid/'+vm.type_id+'/'
      })
        .then(function (response) {
          // console.log(response.data)
          vm.course_num=response.data.acount
          vm.pageCount=Math.ceil(response.data.acount/6)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    searchData:function () {
      this.pageindex=1;
      this.getdata()
      this.getPageSize()
    },
    getIndex:function (i) {
      this.pageindex=i;
      this.getdata();
    },
    // 分页
    prePage() {
      this.currentPage--;
      this.getdata();
    },
    nextPage() {
      this.currentPage++;
      // 重新渲染数据
      this.getdata();
    },
    jumpPage(pageIndex) {
      if(pageIndex<0){
        pageIndex=1
      }
      if (pageIndex > this.pageCount) {
        pageIndex = this.pageCount
      }
      if (!pageIndex || pageIndex < 1) {
        pageIndex = 1
      }
      this.currentPage = pageIndex;
      this.getdata();
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body, ul, li, h1, h2, h3, h4 ,p,html .container{
    margin: 0;
    padding: 0;
    /*overflow: auto;   在需要时内容会自动添加滚动条*/
    /*overflow: scroll;   总是显示滚动条*/
    overflow-x: hidden;  /*禁止横向的滚动条*/
    /*overflow-y: scroll;  总是显示纵向滚动条*/
  }
  .container{
    width: 100%;
  }
  ul li{
    list-style: none;
  }
  a,p{
    /*去除超链接下划线*/
    text-decoration: none;
  }
  a:hover{
    text-decoration: none;
  }
  /*.container-fluid{*/
    /*width: 100%;*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*!*overflow: auto;   在需要时内容会自动添加滚动条*!*/
    /*!*overflow-x: hidden;  !*禁止横向的滚动条*!*!*/
    /*!*overflow-y: scroll;  总是显示纵向滚动条*!*/
  /*}*/
  /*.navbar-static-top{*/
    /*width: 100%;*/
  /*}*/
  /*.navbar-default{*/
    /*background-image: none;*/
    /*border: none;*/
    /*box-shadow: none;*/
    /*background-color: black;*/
    /*color: white;*/
    /*height: 70px;*/
    /*line-height: 70px;*/
    /*width: 100%;*/
  /*}*/
  .container-fluid  a{
    color: white;
  }
  .navbar-brand img{
    width: 60px;
    height: 50px;

    background-size: cover;
    background-position: right;
    position: relative;
    left: 40px;
  }
  .fenlei{
    color: black;
  }
  .fenlei:hover{
    color: grey;
  }
  .font-size-20{
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-indent: 15px;
    padding-top: 80px;
    padding-bottom: 10px;
  }
  .suojin{
    text-indent: 15px;
  }
  .font-color-grey{
    color: grey;
  }
  .search{
    width: 100%;
    height: 100px;
    padding-top: 35px;
    box-sizing: border-box;
  }
  .search div{
    /*width: 32%;*/
    height: 35px;
    margin-left: 50%;
  }
  .search div #search{
    width: 350px;
    height: 35px;
  }
  .search div #btnSearch{
    width: 120px;
    height: 35px;
    background:darkslategray;
    color: white;
    border: none;
  }
  .title{
    height:50px;
    line-height: 50px;
    position: relative;
    top: -20px;
  }
  .middle{
    width: 100%;
    background-color: #fafafa;
    position: relative;
    top: -20px;
  }
  .content{
    width:80%;
    margin: auto;
    text-align: left;
  }
  .content ul{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
  }
  .content ul li{
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
    box-shadow: 0px 2px 2px #bbbbbb;
  }
  .content ul li .text{
    height:30px;
    line-height:30px;
    padding:0;
    margin: 0
  }
  .content ul li .course{
    /*background: url('https://static1.keepcdn.com/misc/2016/06/27/10/5563edfbdf000000.jpg');*/
    width: 330px;
    height: 150px;
    color:white;
    background-size: cover;
    background-position: center;
  }
  .content ul li .course:hover {
    cursor: pointer;
  }
</style>
