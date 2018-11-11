<template>
  <div>
    <div class="row title">
      <div class="col-md-3 col-sm-2"></div>
      <div class="col-md-6  font-color-grey">
        <div style="position: relative;left: -80px;padding-bottom: 10px;font-size: 15px">
          <span class="back" v-if="back" @click="$router.go(-1)">返回课程继续训练</span>
        </div>
      </div>
      <div class="col-md-3 col-sm-2"></div>
    </div>

   <div style="width: 818px;margin: auto">
     <div class="title1 ">
     <div class="row">
       <div class="col-md-2 col-sm-3"></div>
       <div class=" video col-md-8 col-sm-6" v-for="action in action_list"
            :style="{backgroundImage: 'url(' + action.action_picture + ')' } ">
         <div class="player"></div>
       </div>
       <div class="col-md-2 col-sm-3"></div>
     </div>
   </div>
     <div class="middle">
       <div class="content1" v-for="action in action_list">
         <h2 class="name">{{action.name}}</h2>
         <div>
           <div style="display: flex">
             <div class="" style="width: 200px;padding-left: 15px">
               <p style="height: 30px">级别：<span>{{action.level}}</span></p>
               <p style="height: 30px">器材要求：<span>{{action.machine_name}}</span></p>
             </div>
             <div style="width: 150px;">
               <p style="height: 30px">主要肌肉：<span>{{action.muscle_name}}</span></p>
               <p style="height: 30px">其他肌肉：<span></span></p>

             </div>
           </div>
           <h4>动作要领图</h4>
           <div class="yaolingphotos">
             <ul v-for="yaoling in action.jibendongzuo_picture">
               <li><img class='yaoling' :src="yaoling.url" alt=""></li>
             </ul>
           </div>
           <h4>动作要领</h4>
           <pre class="cont">{{action.info}}</pre>
           <h4>主要肌肉图</h4>
           <p v-for="muslc_picture in action.muscle_url">
             <img class="musle" :src="muslc_picture " alt="">
           </p>

         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'action',
    components: {},
    data: function () {
      return {
        condition: '',
        pageindex: 1,
        list: [],
        pagesize: 0,
        action_list: [],
        aid: '',
        back: true,
      }

    },
    created: function () {
      this.aid = this.$route.params.aid
      this.$emit('flushnav')
    },
    mounted: function () {
      window.scrollTo(0, 0);
      this.getdata()
    },
    methods: {
      getdata: function () {
        let from = sessionStorage.getItem('from')
        if (from == 'actionlibrary') {
          this.back = false
        }
        var vm = this;
        axios({
          url: this.GLOBAL.HOST + 'action/getaction/?id=' + vm.aid
        })
          .then(function (response) {
            vm.action_list = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getPageSize: function () {
        var vm = this
        axios.get('http://localhost:8000/job/acount/' + vm.condition + '/')
          .then(function (response) {
            vm.pagesize = Math.ceil(response.data.acount / 12)
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

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    width: 100%;
    background: #f3f3f3;
    overflow-x: hidden;

  }

  /*播放视频开始*/
  .title1 {
    width: 100%;
    position: relative;
    /*top: -20px;*/
    /*padding-top: 20px;*/
  }

  .title1 .video {
    height: 500px;
    width: 818px;
    position: relative;
    /*margin-left: 86px;*/
    /*background-image:url('');*/
    background-size: cover;
    background-position: center;
  }

  .title1 .video .player {
    width: 72px;
    height: 72px;
    margin: auto;
    background: url("https://staticweb.keepcdn.com/showstatic/images/homepage/play-1a7aadd99d.png");
    position: relative;
    top: 200px;
  }

  .back:hover {
    cursor: pointer;
    color: grey;
  }

  /*动作内容开始*/
  .middle .content1 .name {
    height: 70px;
    line-height: 70px;
  }

  .middle .content1 h2 {
    font-weight: bold;
  }

  .middle .content1 h4 {
    font-weight: bold;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    text-indent: 15px;
  }

  .middle .content1 ul {
    margin-bottom: 30px;
    margin-top: 10px;
  }

  .middle .content1 ul {
    padding-left: 30px;
    /*list-style-type: disc !important;*/
    list-style: disc !important;
  }

  .middle .content1 .musle {
    width: 400px;
    height: 600px;
    /*margin: 20px;*/
  }

  .middle .content1 p {
    float: left;
  }

  .middle .content1 .yaolingphotos {
    display: flex;
    justify-content: space-around;
    width: 818px;
  }

  .middle .content1 .yaolingphotos ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .middle .content1 .yaoling {
    width: 300px;
    height: 250px;
    background-size: cover;
    background-position: center;
    margin: 20px;
  }

  .middle .content1 .cont {
    line-height: 2em;
    font-size: 14px;
    word-break: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: Tahoma, "Microsoft YaHei", sans-serif;
    margin-left: 10px;
    margin-right: 10px;
  }

  .row {
    padding: 0;
    margin: 0;
  }

  .col-md-2 {
    width: 265px;
  }

  .middle {
    width: 818px;
    margin: auto;
    background-color: #f3f3f3;
  }

  .middle .content1 {
    display: flex;
    background-color: white;
    flex-wrap: wrap;
  }

  .middle .content1 .step .step-name .name {
    font-size: 14px;
  }

</style>
