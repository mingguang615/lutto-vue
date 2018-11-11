<template>
  <form id="myform" name="myform">
    <div>
      <input type="file" name="usericon" id="userimg">
      <div class="img-add" @click="updateicon">
        <img src="" alt="">
      </div>
    </div>
  </form>
</template>

<script defer="defer">
  import * as qiniu from 'qiniu-js'
  import $ from 'jquery'
  import global from "../global/Global"
  export default {
    name: "Updateicon",
    data: function () {
      return {
        goods: [],//存储用户添加的商品
        good_total_rice: 0,//商品总价
        good_sum: 0,//勾选商品数量
        check_all: null,//默认全选为勾上
      }
    },
    created: function () {
      this.$emit('flushnav')
      this.a()
    },
    mounted: function () {
      // //页面加载时获取数据
      // this.getData()

    },
    methods:{
      a:function () {
        let uuu = global.IMG
        let data = {
          "headers": {
            "token": window.sessionStorage.getItem('token')
          }
        }

        $.post({
          url: global.HOST + 'user/getuserinfobytel/',
          data: JSON.stringify(data),
          success: function (res) {
            res = JSON.parse(res)
            // console.log(res)
            let u = res[0].icon_url
            $('.img-add img').attr('src', uuu + u)
          }
        })
      },
      updateicon:function () {
        let vm = this
        // alert(6)
        let ipt = document.querySelector('#userimg')
        let ie = false
        if (navigator.appName === 'Microsoft Internet Explorer') {
          ie = true
        }
        if (ie) {
          ipt.click()
        } else {
          let a = document.createEvent('MouseEvents')
          a.initEvent('click', true, true)
          ipt.dispatchEvent(a)
          ipt.onchange = function (e) {
            // 将图片存到data当中的file对象中
            // 展示图片
            let f=e.target.files[0]
            vm.preview1(f)
          }
        }
      },
      // 展示头像
      preview1:function(f) {

        let img = new Image()
        img.src = URL.createObjectURL(f)
        let url = img.src
        let $img = $(img)
        img.onload = function () {
          URL.revokeObjectURL(url)
          $img.css('width', '100%').css('height', '100%').css('object-fit', 'cover').css('border-radius', '50%')
          $('.img-add').empty().append($img)
        }
      // 调用上传头像的方法
        this.upImg(f)
  },
      // 上传到七牛云
      upImg:function(file) {
        $.ajax({
          url: global.HOST + 'user/qiniutoken/?name=' + file.name,
          success: function (res) {
            let token = res.token
            let newname = res.filename

            let newfile = new File([file], newname)
            // 使得ESLint不检查以下代码
            /* eslint-disable */
            let observable
            let config = {
              useCdnDomain: false,
              disableStatisticsReport: true,
              retryCount: 6,
              region: qiniu.region.z0
            }
            let putExtra = {
              fname: '',
              params: {},
              mimeType: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
            }
            let key = newfile.name
            // 添加上传dom面板
            putExtra.params['x:name'] = key.split('.')[0]
            let subscription
            // 调用sdk上传接口获得相应的observable，控制上传和暂停

            observable = qiniu.upload(file, key, token, putExtra)
            subscription = observable.subscribe({
              next(res) {
              },
              error(err) {
                alert('error！')
              },
              complete(res) {
                // res.key 是文件名称，发送ajax将文件名称保存到数据库中
                let data = {
                  "url": res.key,
                  "headers": {
                    "token": window.sessionStorage.getItem('token')
                  }
                }
                $.post({
                  url: global.HOST + 'user/upicon/',
                  data: JSON.stringify(data)
                })
                  .then(function (response) {
                    // let res = response.data.res
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              }
            });
          }
        })
      },
    }
  }



</script>

<style scoped>
  input {
    /*display: none;*/
  }

  #userimg {
    width: 100px;
    height: 100px;
    opacity: 0;
    position: relative;
    z-index: 100;
  }

  .img-add {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    z-index: 100;
  }

  .img-add img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

</style>
