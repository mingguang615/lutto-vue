<template>
  <div>
    <div class="search">
      <div>
        <input type="text" id="search">
        <input type="button" @click="skipsearch" value="搜索" id="btnSearch">
      </div>
    </div>
    <div class="condition">
      <div class="machine" id="machine" >
        <span>器械要求:</span>
        <span @click="selectmachine($event)" :class="{greenwhite:machine==='不限'}">不限</span>
        <span id="machine_content" v-for="machine1 in machine_list">
            <span  @click="selectmachine($event)" :class="{greenwhite:machine===machine1.name}">{{machine1.name}}</span>

      </span>

      </div>
      <div class="part" id="part">
        <span>训练部位:</span>
        <span @click="selectmuscle($event)" :class="{greenwhite:part==='不限'}">不限</span>
        <span id="bodypart" v-for="muscle in muscle_list">
               <span @click="selectmuscle($event)" :class="{greenwhite:part===muscle.name}">{{muscle.name}}</span>
            </span>
      </div>
      <div class="level" id="trainlevel">
        <span>训练难度:</span>
        <span @click="selectlevel($event)" :class="{greenwhite:level==='不限'}">不限</span>
        <span id="level" v-for="l in level_list">
        <span @click="selectlevel($event)" :class="{greenwhite:level===l.level}">{{l.level}}</span>
            </span>
      </div>
    </div>
    <div class="main row">
      <div class="action-item" v-for="action in list">
        <div class="actions" :data-action-id="action.id" @click="skip">
          <img :src="action.picture__url" alt="">
          <div class="info">
            <h5 v-text="action.name.slice(0,28)" style="width: 235px"></h5>
            <span v-text="action.level__level"></span>
            <span v-text="action.machine__name"></span>
            <span v-text="action.muscle__name"></span>
          </div>

        </div>
      </div>

    </div>
    <pagination :currentPage="currentPage" :pageCount="parseInt(pageCount)" @prePage="prePage" @nextPage="nextPage" @jumpPage="jumpPage"></pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    name: 'action',
    components: { },
    data: function () {
      return {
        // condition: {},
        part:'不限',
        level:'不限',
        machine:'不限',
        pageindex: 1,
        list: [],
        pagesize: 0,
        action_list:[],
        aid:'',
        level_list:[],
        muscle_list:[],
        machine_list:[],
        currentPage:1,
        pageCount:1,
        machinecon:'',
        levelcon:'',
        musclecon:'',
        searchcontent:'',
      }

    },
    created: function () {
      this.$emit('flushnav')
      window.sessionStorage.setItem('from','actionlibrary')
    },
    mounted: function () {
      this.getlevel()
      this.getmachine()
      this.getmuscle()
      this.getdata()
      this.getPageSize()
    },
    methods: {
      selectmachine:function(e){
        let text=e.target.innerText
        this.machine=text
        this.machinecon=text
        if (text=='不限'){
          this.machinecon=''
        }
        this.getdata()
        this.getPageSize()
        this.currentPage=1
      },
      selectmuscle:function(e){
        let text=e.target.innerText
        this.part=text
        this.musclecon=text
        if (text=='不限'){
          this.musclecon=''
        }
        this.getdata()
        this.getPageSize()
        this.currentPage=1
      },
      selectlevel:function(e){
        let text=e.target.innerText
        this.level=text
        if (text=='不限'){
          this.levelcon=''
        }else{
          this.levelcon=text
        }
        this.getdata()
        this.getPageSize()
        this.currentPage=1
      },

      getlevel: function () {
        var vm = this;
        axios({
          url:this.GLOBAL.HOST+'action/getactionlevel/'
        })
          .then(function (response) {

            vm.level_list = response.data

          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getmachine: function () {
        var vm = this;
        axios({
          url:this.GLOBAL.HOST+'action/getactionmachine/'
        })
          .then(function (response) {

            vm.machine_list = response.data

          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getmuscle: function () {
        var vm = this;
        axios({
          url:this.GLOBAL.HOST+'action/getactionpart/'
        })
          .then(function (response) {
            vm.muscle_list = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      skip:function (e) {
        let $obj = $(e.target).parents('.actions')
        let id=$obj.attr('data-action-id')
        if (id){
          this.$router.push({
            name: 'action',
            params:{aid:id},
          });
        }else {
          console.log('null id')

        }
      },
      skipsearch:function () {
        this.searchcontent = $('#search').val()
        this.levelcon=''
        this.machinecon=''
        this.musclecon=''
        this.getdata()

        this.getPageSize()

      },
      getdata:function(){
        var condition={
          "searchcontent":this.searchcontent,
          "levelcon":this.levelcon,
          "musclecon":this.musclecon,
          "machinecon":this.machinecon,
          "index":this.currentPage,

        }
        var vm=this;

        axios({
          url:this.GLOBAL.HOST+'action/search/',
          data:condition,
          method:"POST"
        }).then(function (response) {
          vm.list = response.data
        })
          .catch(function (error) {
            console.log(error)
          })

      },
      getPageSize: function () {
        var condition={
          "searchcontent":this.searchcontent,
          "levelcon":this.levelcon,
          "musclecon":this.musclecon,
          "machinecon":this.machinecon,
          "index":this.currentPage,

        }

        var vm = this
        axios({
          url:this.GLOBAL.HOST+'action/acount/',
          data:condition,
          method:"POST"
        })
          .then(function (response) {
            vm.pageCount = Math.ceil(response.data.acount / 12)
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
  ul li{
    list-style: none;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .paixu_neirong{
    font-weight: 200;
    font-size: 10px;
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
  .condition{
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background: gainsboro;
    margin-top: 50px;
  }
  .condition div{
    margin-top: 20px;
    background: ghostwhite;
    padding: 10px;
    box-sizing: border-box;
  }
  .condition div span{
    text-decoration: none;
    /*color: black;*/
    padding: 5px;
    margin-top: 5px;
    display: inline-block;
  }
  .greenwhite{
    background: #2f4f4f;
    /*border-radius: 5px;*/
    color: white;
  }
  /*.condition div span:nth-child(2){*/
  /*background:darkslategray;*/
  /*color: white;*/
  /*}*/
  /*.condition  span:first-child{*/
  /*font-weight: normal;*/
  /*margin: 0 10px;*/
  /*}*/

  /*职位列表*/
  .main{
    width: 80%;
    height: 100%;
    margin:auto;
    margin-top: 20px;
    background: white;
  }
  .action-item:hover{
    box-shadow: 1px 1px 5px grey;
  }
  .action-item{
    float: left;
    width: 256px;
    height: 200px;
    background: white;
    border: solid 1px lightgray;
    margin-left:  10px;
    margin-top:  10px;
    margin-bottom:  10px;
  }
  .action-item img{
    width: 255px;
    height: 150px;
  }
  .action-item .info{
    width: 230px;
    height: 36px;
    padding: 7px 19px;
  }
  .info h5{
    color: black;
  }
  .info span{
    font-size: 12px;
    font-weight: 500;
    color: grey;
  }
  a{
    text-decoration: none;
  }
  a :hover{
    color: darkred;
  }


</style>
