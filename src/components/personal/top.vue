<template>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-top row">
        <div class="main-top-left col-lg-8" >
          <div class="icon"><Updateicon></Updateicon></div>
          <div class="image">
            <div class="name_sex">
              <div>{{basic.name}}</div>
              <div><img src="../../assets/Personal/性别女.svg" v-if="!1" v-model="basic.sex" height="23" width="23"></div>
              <div><img src="../../assets/Personal/性别男.svg" v-if="1" v-model="basic.sex" height="23" width="23"></div>
            </div>
            <div class="integral">个签：
              <span>{{basic.qianming}}</span>
            </div>
          </div>
        </div>
        <div class="main-top-right col-lg-4">
          <div class="data">
            <div><img src="../../assets/Personal/闪电-空心圆.svg" height="20" width="20"></div>
            <div>训练数据</div>
          </div >
          <div class="days">
            <div class="china">签到：</div>
            <div class="english">{{basic.qiandaodays}}次</div>
          </div>
          <div class="minutes">
            <div class="china">积分：</div>
            <div class="english">{{basic.intergral}}分</div>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
</template>

<script>
  import Updateicon from './Updateicon'
  import axios from 'axios'

  export default {
    name: 'top',
    components: {Updateicon},
    data:function () {
      return{
        token:'',
        basic:{},
      }
    },
    created:function () {
      this.getdata()
      this.$emit('flushnav')
    },
    methods:{
      getdata:function () {
        let token=window.sessionStorage.getItem('token');
        let data1={
          headers:{"token":token}
        };
        // console.log(data1);
        let vm=this;
        if(token){
          axios({
            method:"POST",
            data:data1,
            url:this.GLOBAL.HOST+'user/getuserinfobytel/'
          })
            .then(function (response) {
              // console.log(response.data)
              vm.basic=response.data[0]
              // console.log(response.data[0])
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

  /*-------------------------主体上半部分------------------------*/

  .main-top{
    height: 152px;
    border: solid 1px lightgray;
  }
  .row{
    padding: 0px;
    margin: 0px;
  }
  /*-------------------------------上左半部分-----------------------------*/
  .main-top-left{
    height: 150px;
    background: white;
    border-radius:0 10px 10px 0;
    border-right: dashed 1px gray;
  }
  .main-top-left div{
    float: left;
  }
  .main-top-left .icon{
    position: relative;
    margin: 25px 5px;
  }
  .image{
    width: 260px;
    position: relative;
    top: 35px;
  }
  .name_sex{
    width: 100%;
    height: 30px;
  }
  .integral{
    width: 300px;
    margin-top: 30px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*//文本不换行，这样超出一行的部分被截取，显示...*/
  }
  .write{
    margin-top:35px;
    /*margin-left: 350px;*/
    font-size: 14px;
  }
  /*-------------------------------------上右半部分---------------------------*/
  .main-top-right{
    height: 150px;
    background: white;
    border-radius:10px 0px 0px 10px;

  }
  .main-top-right div{
    float: left;
  }
  .data{
    width: 100%;
    height: 10px;
    margin-top: 10px;
    font-size: 13px;
  }
  .days{
    width: 50%;
    height: 90px;
    border-right: dashed 1px lightgray;
    margin-top: 30px;
  }
  .china{
    font-size: 21px;
    width: 70%;
    height: 50%;
  }
  .english{
    width: 70%;
    height: 50%;
    margin-left: 35%;
    font-size: 15px;
  }
  .minutes{
    width: 48%;
    height: 90px;
    margin-top: 30px;
    margin-left: 2%;
  }
  a{
    color: black !important;
  }
  a:hover{
    text-decoration: none;
  }
</style>
