<template>
  <div>
    <Top v-if="abc"></Top>
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6 main-body row">
        <div class="col-lg-12 main-body-top font">
          <div>
            <router-link class="editior" to="/basic">身体素质</router-link>
          </div>
          <div>
            <router-link to="/phone">修改绑定</router-link>
          </div>
          <div>
            <router-link to="/address">添加地址</router-link>
          </div>
          <div>
            <router-link to="/password">修改密码</router-link>
          </div>
        </div>
        <div class="col-lg-12 main-body-bottom row">
          <div class="width">
            <div class="my_editior clearfix">
              <div>昵称</div>
              <div><input type="text" v-model="user_info.name"></div>
            </div>
            <div class="my_editior clearfix sex">
              <div>性别</div>
              <div><input id="man" type="radio" name="sex" @click="changeSex(2)" :checked="user_info.sex===2?2:0"/>男<input
                id="woman" type="radio" name="sex" @click="changeSex(1)" :checked="user_info.sex===1?1:0"/>女
              </div>
            </div>
            <div class="my_editior clearfix">
              <div>身高</div>
              <div><input type="text" v-model="user_info.height"> &nbsp; cm</div>
            </div>
            <div class="my_editior clearfix">
              <div>体重</div>
              <div><input type="text" v-model="user_info.width"> &nbsp; kg</div>
            </div>
            <div class="my_editior clearfix">
              <div>生日</div>
              <div><input class="birthday" title="年龄" id="birthday" require="required" name="birthday" type="date"
                          v-model="user_info.birth"></div>
            </div>
            <div class="my_editior clearfix">
              <div>个签</div>
              <div><input type="text" v-model="user_info.qianming"></div>
            </div>
            <div @click="save">
              <div class="btn btn-info btn-lg show-layer" data-show-layer="hw-layer" role="button">保存
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="col-lg-3"></div>
    </div>
    <motal_lutto v-show="isModalVisible" @close="closeModal"/>
  </div>

</template>

<script>
  import Top from './top'
  import axios from 'axios'

  export default {
    name: 'basic',
    components: {Top},
    data() {
      return {
        abc: true,
        user_info: {},
        isModalVisible: false,
        // token:window.sessionStorage.getItem("token")
      }
    },
    created:function(){
      this.$emit('flushnav')
    },
    // 钩子获取数据
    mounted: function () {
      this.getdata()
    },
    methods: {
      //获取数据
      getdata: function () {
        let token = window.sessionStorage.getItem('token');
        let data1 = {
          headers: {"token": token}
        };
        let vm = this;
        if (token) {
          axios({
            method: "POST",
            data: data1,
            url: this.GLOBAL.HOST + 'user/getuserinfobytel/'
          })
            .then(function (response) {
              // console.log(response.data)
              vm.user_info = response.data[0]
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      // 保存
      save: function () {
        var vm = this;
        let upuser = {
          "name": vm.user_info.name,
          "height": vm.user_info.height,
          "width": vm.user_info.width,
          "birth": vm.user_info.birth,
          "sex": vm.user_info.sex,
          "qianming": vm.user_info.qianming,
          headers: {"token": window.sessionStorage.getItem("token")},
        };
        // console.log(upuser)
        let token = window.sessionStorage.getItem('token');

        if (token) {
          axios({
            method: "post",
            data: upuser,
            url: this.GLOBAL.HOST + 'user/upuser/'
          })
            .then(function (response) {
              let code = response.data.code;
              // console.log(response.data)
              if(code==201){
                vm.showModal()
              }else if(code==500){
                alert('再把生日完善一下吧~')
              }

              vm.abc = false;
              vm.$nextTick(() => {
                vm.abc = true
              })
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          alert('请登录')
        }

      },
      // 模态框显示
      showModal: function () {
        this.isModalVisible = true
      },
      //关闭模态框
      closeModal: function () {
        this.isModalVisible = false
      },

      changeSex: function (sex) {
        // alert(sex);
        this.user_info.sex = sex;
      }
    },

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

  .white {
    color: white;
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

  .main-body-bottom {
    min-height: 400px;
  + height: 100 %;
    _height: 400px;
    margin: 0;
    padding: 0;
  }

  .editior {
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

  /*----------------------------完善资料------------------------------------*/
  .width {
    width: 400px;
    margin: auto;
    margin-top: 40px;
  }

  .my_editior div {
    float: left;
    height: 45px;
  }

  input {
    width: 250px;
    height: 25px;
    border-radius: 3px;
    outline: none;
    margin: -5px 0 0 50px;
    border: solid 1px #c6c6c6;
  }

  .sex input {
    width: 20px;
    height: 13px;
  }

  .show-layer {
    width: 300px;
    height: 40px;
    margin: 10px 0 0 20px;
    font-size: 16px;
  }

  .my_editior :nth-child(1) {
    font-weight: 600;
  }

  .my_editior input {
    font-weight: 500 !important;
  }

</style>
