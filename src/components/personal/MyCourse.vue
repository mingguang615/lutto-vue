<template>
  <div>
    <Header></Header>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div>
            <router-link class="mycourse" to="/collect">我的课程</router-link>
          </div>
          <div>
            <router-link to="/mycollect">我的收藏</router-link>
          </div>
          <div>
            <router-link to="/information">基本资料</router-link>
          </div>
        </div>
        <div class="col-lg-12 main-body-bottom">
          <div v-if="show" v-model="show" class="myclass" id="mycourse">
            <div class="all_myclass" :data-mycourse-id="course.id" v-for="course in course_list">
              <div class="bgimage" :style="{backgroundImage: 'url(' + course.picture__url + ')' }">
                <img src="../../assets/Personal/删除.svg" alt="" @click="toDel(course.id)">
              </div>
              <div class="block">
                <h5 @click="skip">{{course.name}}</h5>
                <span>{{course.level__level}}</span>
                <span>{{course.type__type_name}}</span>
                <span>{{course.machine__name}}</span>
              </div>
            </div>
          </div>

          <div class="font1" v-if="!show" v-model="show">
            <div><img  src="../../assets/Personal/什么都没有.png" alt="" ></div>
            <div>您还没有添加课程训练哦</div>
          </div>
        </div>

      </div>
      <div class="col-lg-3"></div>
    </div>
    <MakeSureBuy v-if="isDel" @quxiaodelclick="isDel=false" @suredelclick="delcourse" ></MakeSureBuy>
  </div>
</template>

<script>
  import Header from './top'
  import axios from 'axios'
  import $ from 'jquery'
  import MakeSureBuy from '../course/MakeSureBuy'

  export default {
    name: 'course',
    components: {Header,MakeSureBuy},
    data() {
      return {
        course_list: [],
        id: '',
        show: true,
        isDel: false,

      }
    },
    created: function () {
      this.getcourse()
      this.$emit('flushnav')
    },
    methods: {
      toDel: function (rid){
        this.id = rid
        this.isDel = true
      },
      skip: function (e) {
        let $obj = $(e.target).parents('.all_myclass')
        let i = $obj.attr('data-mycourse-id')
        if (i) {
          this.id = i;
          this.$router.push({
            name: 'courseinfo',
            params: {cid: i},
          });
        } else {
          console.log('null id')
        }
      },
      getcourse: function () {
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          headers: {"token": token}
        };
        let vm = this;
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/getaction/'
          })
            .then(function (response) {
              vm.course_list = response.data;
              // console.log(response.data)
              if (response.data.code) {
                vm.show = false;
              } else {
                vm.show = true;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      delcourse: function (e) {
        // let $obj = $(e.target).parents('.all_myclass')
        // let i = $obj.attr('data-mycourse-id')
        // if (i) {
        //   this.id = i
        // } else {
        //   console.log('null id')
        // }
        let vm = this;
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          headers: {"token": token},
          "id": vm.id,
        };
        // console.log(data1)
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/delaction/'
          })
            .then(function (response) {
              vm.isDel=false
              vm.getcourse();

            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    background: #f3f3f3;
    overflow-x: hidden;
  }

  .row {
    padding: 0px;
    margin: 0px;
  }

  .main-body {
    background: white;
    margin-top: 20px;
    border: solid 1px lightgray;
  }

  .main-body-top {
    height: 70px;
    margin: auto;
    border-bottom: solid 1px lightgray;
    display: flex;
    justify-content: space-around;
    line-height: 70px;
  }

  .main-body-top div {
    float: left;
    display: flex;
    justify-content: space-around;
  }

  .font {
    font-size: 18px;
    font-weight: 300;
  }
  .font1{
    font-size: 20px;
    margin-top: 50px;
    margin-left: 250px;
    color: lightgray;
  }
  .main-body-bottom {
    margin-top: 15px;
    width: 100%;
    min-height: 400px;
  + height: 100 %;
    _height: 400px;
  }

  .myclass .all_myclass {
    float: left;
    margin: 10px 20px;
    width: 200px;
    height: 170px;
    border: solid 1px lightgray;
  }

  .bgimage {
    width: 198px;
    height: 110px;
    background-size: cover;
  }

  .all_myclass:hover {
    box-shadow: 1px 1px 5px gray;
  }

  .all_myclass img {
    display: none;
    width: 20px;
    height: 20px;
  }

  .myclass :hover img {
    display: block;
  }

  .block {
    width: 180px;
    height: 40px;
    margin: 3px 10px;
  }

  h5 {
    font-weight: 600;
  }

  h5:hover {
    color: darkred;
  }

  .block span {
    font-size: 12px;
  }

  .mycourse {
    font-size: 20px;
    color: #584f60;
    font-weight: 500;
    border-bottom: solid 3px #584f60;
  }

  a {
    color: black !important;
  }

  a:hover {
    text-decoration: none;
  }
</style>
