<template>
 <div>
   <div class="row title">
     <div class="col-md-3 col-sm-2"></div>
     <div class="col-md-6  font-color-grey">
       <div style="position: relative;left: -80px;" >
         <span class="course-nav" @click="toCourse">课程分类</span> -
         <span class="course-nav" @click="toFenlei">{{course.type_name}}</span> -
         <span style="font-size: 15px;color: grey;">{{course.name}}</span>
       </div>

     </div>
     <div class="col-md-3 col-sm-2"></div>

   </div>
   <div class="title1">
     <div class="bgphoto" :style="{backgroundImage: 'url(' + course.picture + ')' } ">
       <div class="joinplan" v-show="!course.add_flag" @click="addplan">+加入训练计划</div>
       <div class="joinplan" v-show="course.add_flag" @click="addplan" style="background: grey">-取消训练计划</div>
       <p class="font-size-15">{{course.name}}</p>
       <div class="need">
         <div class="q_a">
           <div>强度:</div>
           <div>{{course.level}}</div>
         </div>
         <div class="q_a">
           <div>部位:</div>
           <div v-for="body in bodypart">{{body}}</div>
         </div>
         <div class="q_a">
           <div>器械:</div>
           <div>{{course.machine}}</div>
         </div>
         <div class="q_a">
           <div>课时:</div>
           <div>{{course.day}}</div>
         </div>
         <div class="q_a">
           <div>日均:</div>
           <div>{{course.minute_avg}}</div>
         </div>
         <div class="q_a">
           <div>总消耗:</div>
           <div>{{course.consume_total}}</div>
         </div>
       </div>
       <div class="jjj">{{course.useradd}}人已参与</div>
     </div>
   </div>

   <div class="middle">
     <div class="content1" v-for="(actions,i) in action_list">
       <button type="button" class="daynum1 daynum" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
               @click="toggle2" :vv="i+1">
         第{{i+1}}天
       </button>
       <transition name="fade">
         <div class="day_action1 day_action" style="width: 100%; display: flex;flex-wrap: wrap" v-show="mark==i+1">
           <div class="step" :data-action-id=action.action__id @click="skip" v-for="action in actions ">
             <div class="stepphoto" :style="{backgroundImage: 'url(' + action.action__picture__url + ')' } "></div>
             <div class="step-name">
               <p class="name">{{action.action__name}}</p>
               <p class="payload">{{action.action__times}}</p>
             </div>
           </div>
         </div>
       </transition>
     </div>
     <div class="comment">
       <div class="all_comment">
         <span >所有评论</span>
         <div class="big_gray">
           <textarea cols="110" rows="4" class="big_publish" placeholder="在这里输入内容..."></textarea><br>
           <button type="button" class="button "  @click="addcomment">发表评论
           </button>
         </div>
         <span id ="newcom" :class="{newcomment:newr==='最新评论'}"  @click="selectnewcoment($event)">最新评论</span><span> | </span>
         <span id="hotcom" :class="{newcomment:newr==='热门评论'}" @click="selectnewcoment($event)">热门评论</span>
         <div v-if="show" class="every_comment" :data-comment-id="comment.id" v-for="comment in comment_list">
           <img class="commenicon" :src="GLOBAL.IMG+comment.icon" alt="">
           <div class="every_right">
             <div><span>{{comment.username}}</span></div>
             <div class="time">( {{comment.time}} )</div>
           </div>
           <div class="float">
             <div class="comment_info">{{comment.content}}</div>
             <div class="zan" id="zan" @click="likecomment">
               <img id="hand" src="../../assets/course/取消点赞.svg" v-if="!comment.like_flag" alt=""
                    style="width: 20px;height: 20px">
               <img id="hand1" src="../../assets/course/点赞.svg" v-if="comment.like_flag" alt=""
                    style="width: 20px;height: 20px">
               <span id="zan-text">({{comment.like}})</span>
             </div>
             <!--<div class="zan pinglun" @click="toggle4" :tt="comment.id">-->
               <!--<img id="pao" src="../../assets/course/未回复.svg"  v-if="!comment.reply_flag" alt="" style="width: 20px;height: 20px">-->
               <!--<img id="pao1" src="../../assets/course/回复.svg" v-if="comment.reply_flag" alt="" style="width: 20px;height: 20px">-->
               <!--<span id="pao-text">({{comment.replynum}})</span>-->
             <!--</div>-->
             <div class="zan pinglun"  @click="commentdong":tt="comment.id">
               <img id="pao"  src="../../assets/course/未回复.svg"  v-if="!comment.reply_flag" alt="" style="width: 20px;height: 20px">
               <img id="pao1"  src="../../assets/course/回复.svg" v-if="comment.reply_flag" alt="" style="width: 20px;height: 20px">
               <span id="pao-text">({{comment.replynum}})</span>
             </div>
             <div class="zan shanchu" :tt="comment.id" @click="toDelComment(comment.id)" v-if="comment.deletecomment_flag">
               <img id="del" src="../../assets/course/删除.svg"   alt="" style="width: 20px;height: 20px">
               <!--<img id="p1" src="../../assets/course/回复.svg" v-if="comment.reply_flag" alt="" style="width: 20px;height: 20px">-->
               <!--<span id="pao-text">({{comment.replynum}})</span>-->
             </div>
           </div>
           <div class="container-bottom"  style="overflow: hidden;height: 0">
             <div class="t1">
               <textarea name="comm" cols="80" rows="3" placeholder="请输入留言内容:"></textarea>
               <div class="t2">
                 <button :data-comm-id="comment.id" @click="replyComment">发表</button>
               </div>
             </div>
           </div>
           <div class="all_huifu">
             <div class="huifu" v-for="reply in  comment.commnetreply">
               <div class="line_height">
                 <span><img class="small_icon" :src="GLOBAL.IMG+reply.icon" alt=""></span>
                 <span>{{reply.username}}</span>
                 <div class="small_info">{{reply.content}}</div>
                 <img class="del1" src="../../assets/course/删除.svg" :tt="reply.id" @click="toDel(reply.id)" alt="" v-if="reply.deletereply_flag" style="width: 20px;height: 20px;float: right" >
               </div>
               <div class="small_time">({{reply.time}})</div>

             </div>

           </div>
         </div>
       </div>
       <div v-if="nonecomment" class="null"><img  src="../../assets/Personal/什么都没有.png"  alt=""><div>还没有人评论哦~</div></div>
       <span class="zhu">注：网友评论仅供表达个人看法，并不表达偶家同意其观点或证实其描述</span>
     </div>
   </div>
   <!--<motal_lutto v-show="isModalVisible" style="position: absolute; bottom: 30%; left: 30%" @close="closeModal"/>-->
   <NotBut v-if="isShow" :title="title" :com_msg="com_msg" @sureclick="isShow=false"></NotBut>
   <MakeSureBuy v-if="isDel" @quxiaodelclick="isDel=false" @suredelclick="delreply" ></MakeSureBuy>
   <DelComment v-if="isDelCom" @quxiaodelclick="isDelCom=false" @suredelclick="delcomment" ></DelComment>
 </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import NotBut from './NotBuy'
  import MakeSureBuy from './MakeSureBuy'
  import DelComment from './DelComment'
  // import global from '../global/Global'

  export default {
    name: 'CourseInfo',
    components: {NotBut, MakeSureBuy, DelComment},
    data: function () {
      return {
        reply_id: '',
        com_id: '',
        isDel: false,
        isDelCom: false,
        title:'',
        com_msg:'',
        isShow: false,
        course: {},
        nonecomment:false,
        newr:'最新评论',
        mark: '1',
        replymark: '',
        flag: true,
        isModalVisible: false,
        day_action1: true,
        // day_action2: false,
        // day_action3: false,
        condition: '',
        pageindex: 1,
        cid: '',
        pagesize: 0,
        bodypart: [],
        action_list: [],
        comment_list: [],
        time: '',
        like_flag: true,
        kuang: false,
        reply_list: [],
        show:true,
      }

    },
    created: function () {

      this.cid = this.$route.params.cid
      window.sessionStorage.setItem('from','courseinfo')
      this.$emit('flushnav')

    },
    mounted: function () {
      window.scrollTo(0, 0);
      this.getcourseinfo()
      this.getactioninfo()
      this.getcomment()
      window.sessionStorage.setItem('from','courseinfo/'+this.cid)
      // this.loadicon()
      // this.getPageSize()
    },
    methods: {
      toDel: function (rid){
        this.reply_id = rid
        this.isDel = true
      },
      toDelComment:function(comid){
        this.com_id=comid
        this.isDelCom = true

      },


      replyComment: function (e) {
        let obj = e.target.parentElement.previousElementSibling.value
        // console.log(obj)
        let id = e.target.getAttribute('data-comm-id')
        // var replycontent = $(e.target).siblings('#small_publish').val()
        var replycontent = obj

        let token = window.sessionStorage.getItem('token')
        if (token){
          if (replycontent) {
            var vm = this;
            let token = window.sessionStorage.getItem('token')
            // alert(token)
            let data1 = {
              "comment_id": id,
              headers: {"token": token},
              "content": replycontent
            }
            axios({
              url: this.GLOBAL.HOST + 'course/replycomment/',
              data: data1,
              method: 'POST',
            })
              .then(function (response) {
                // console.log(response.data)
                if (response.data.code == '210') {
                  vm.isShow = true
                  vm.title = '发表回复'
                  vm.com_msg = '回复成功'
                  //如果是热门评论执行
                  if(vm.newr=='最新评论'){
                    vm.getcomment()
                  }else{
                    vm.hotsort()
                  }
                e.target.parentElement.previousElementSibling.value=''

                  // var replycontent = $(e.target).siblings('#small_publish').val('')
                } else {
                  vm.isShow = true
                  vm.title = '发表回复'
                  vm.com_msg = '回复失败'

                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            this.isShow = true
            this.title = '发表回复'
            this.com_msg = '回复不能为空呦!'
          }
        }
        else{
          this.$router.push({
            path: '/login'
          })
        }


      },

      // 跳转首页
      toCourse: function () {
        // this.$router.go(-1)
        this.$router.push({
          path: '/course/'
        })
      },
      // 跳转课程分类页
      toFenlei: function () {
        this.$router.push({
          name: 'CourseFenlei',
          params: {tid: this.course.type},
        })
      },
      //跳转
      skip: function (e) {
        let $obj = $(e.target).parents('.step')
        let id = $obj.attr('data-action-id')
        // let i = e.target.getAttribute('data-action-id')
        // console.log(i)
        if (id) {
          this.$router.push({
            name: 'action',
            params: {aid: id},
          });
        } else {
          console.log('null id')

        }
      },

      //获取课程详细信息
      getcourseinfo: function () {
        var vm = this;
        let token = window.sessionStorage.getItem('token')
        // alert(token)
        let data1 = {
          "cid": vm.cid,
          headers: {"token": token},
        }
        axios({
          url: this.GLOBAL.HOST + 'course/getcourseinfobyid/',
          data: data1,
          method: 'POST',
        })
          .then(function (response) {
            vm.course = response.data[0]
            vm.bodypart = vm.course.trainbody
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 获取每天动作信息
      getactioninfo: function () {
        var vm = this;
        axios({
          url: this.GLOBAL.HOST + 'course/getactionbycid/' + vm.cid + '/'
        }).then(function (response) {

          vm.action_list = response.data.days
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      //选中最新评论
      selectnewcoment:function(e){
        let text1=e.target.innerText
        this.newr=text1
        if(text1=='最新评论'){
          this.getcomment()
        }
        else{
          this.hotsort()
        }
      },
      //选中热门评论
      selecthotcoment:function(e){
        let text1=e.target.innerText
        this.newr=text1
        this.hotsort()
      },
      //获取最新评论信息
      getcomment: function () {
        let token = window.sessionStorage.getItem('token')
        let data1 = {
          "cid": this.cid,
          "headers": {"token": token}
        }
        var vm = this;
        axios({
          method: 'POST',
          url: this.GLOBAL.HOST + 'course/getcoursecomment/',
          data: data1
        }).then(function (response) {
          // console.log(response.data)
          vm.comment_list = response.data


          if (vm.comment_list.length){
            vm.nonecomment=false
          } else{
            vm.nonecomment=true
          }
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      //获取热门评论排序
      hotsort: function () {
        var vm = this;
        let token = window.sessionStorage.getItem('token')
        let data1 = {
          "cid": vm.cid,
          headers: {"token": token},
        }

        axios({
          method: 'POST',
          url: this.GLOBAL.HOST + 'course/gethotcoursecomment/',
          data: data1
        }).then(function (response) {

          vm.comment_list = response.data

        })
          .catch(function (error) {
            console.log(error)
          })
      },
      getPageSize: function () {
        var vm = this
        axios.get('http://localhost:8000/job/acount/' + vm.condition + '/')
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
      },
      //发表评论
      addcomment: function () {
        // window.sessionStorage.setItem('from','/courseinfo')
        let token = window.sessionStorage.getItem('token')
        if (token) {
          let content = $('.big_publish').val()
          if (content) {
            let data1 = {
              headers: {"token": token},
              "content": content,
              "cid": this.cid,
            }
            var vm = this;
            axios({
              url: this.GLOBAL.HOST + 'user/addcoursecomment/',
              method: "POST",
              data: data1,
            })

              .then(function (response) {
                if (response.data.code == 210) {
                  if(vm.newr=='最新评论'){
                    vm.getcomment()
                  }else{
                    vm.hotsort()
                  }
                  vm.isShow = true
                  vm.title = '发表评论'
                  vm.com_msg = '评论成功!'

                  $('.big_publish').val('')
                } else {
                  vm.isShow = true
                  vm.title = '发表评论'
                  vm.com_msg = '评论失败!'
                  alert('失败')

                }
              })
              .catch(function (error) {
                console.log(error)
              })

          }
          else {
            this.isShow = true
            this.title = '发表评论'
            this.com_msg = '评论不能为空呦!'
          }
          // this.isModalVisible = true
        }

        else {

          this.$router.push({
            path: '/login'
          })
        }
      },
      //给评论点赞
      likecomment: function (e) {
        // window.sessionStorage.setItem('from','/courseinfo')
        let token = window.sessionStorage.getItem('token')

        if (token) {
          let $obj = $(e.target).parents('.every_comment')
          let id = $obj.attr('data-comment-id')
          let data1 = {
            "headers": {"token": token},
            "commentid": id
            // "cid":this.cid,
          }
          // console.log(data1)
          var vm = this;
          axios({
            url: this.GLOBAL.HOST + 'user/likecoursecomment/',
            method: "POST",
            data: data1,
          })
            .then(function (response) {
              // console.log(response.data)
              if (response.data.code == 210) {

                if(vm.newr=='最新评论'){
                  vm.getcomment()
                }else{
                  vm.hotsort()
                }
              } else if (response.data.code == 410) {

                if(vm.newr=='最新评论'){
                  vm.getcomment()
                }else{
                  vm.hotsort()
                }
              }
              else {
                alert('没登陆')
              }
            })
            .catch(function (error) {
              console.log(error)
            })

        }

        // this.isModalVisible = true


        else {
          this.$router.push({
            path: '/login'
          })
        }
      },
      closeModal: function () {
        this.isModalVisible = false
      },

      toggle1: function (e,cid) {
        this.com_id = cid
        this.isDelCom = true
        // this.mark = $(e.target).attr('vv')

      },


      //获取用户点击的是第几天
      toggle2: function (e,) {
        if (this.mark) {
          this.mark = ''
        }else{
          this.mark = $(e.target).attr('vv')
        }



      },

      toggle4: function (e) {
        // alert('00')
        // console.log(e.target.nextElementSibling.nextElementSibling)
        if (this.replymark) {
          this.replymark = ''
        } else {
          let $pid = $(e.target).parents('.pinglun').attr('tt')
          if ($pid) {
            this.replymark = $pid
          }
        }
      },
      //删除评论
      delcomment: function () {
        var vm=this
        // let $pid = $(e.target).parents('.shanchu').attr('tt')
        let $pid = vm.com_id

        let token = window.sessionStorage.getItem('token')
        let data1 = {
          "headers": {"token": token},
          "commentid": $pid,
        }
        if (token) {
          axios({
            url: this.GLOBAL.HOST + 'course/deloursecomment/',
            method: "POST",
            data: data1,
          })

            .then(function (response) {
              // console.log(response.data.code)
              if (response.data.code == 210) {

                if(vm.newr=='最新评论'){
                  vm.getcomment()


                }else{
                  vm.hotsort()
                }
              } else {

                if(vm.newr=='最新评论'){
                  vm.getcomment()


                }else{
                  vm.hotsort()
                }
              }


            })
            .catch(function (error) {

              console.log(error)
            })
        }
        else {
          this.$router.push({
            path: '/login'
          })
        }
        this.isDelCom = false

      },
      //删除回复
      delreply: function (e) {

        var vm=this
        // let $pid = $(e.target).attr('tt')
        let $pid = vm.reply_id
        let token = window.sessionStorage.getItem('token')
        let data1 = {
          "headers": {"token": token},
          "replyid": $pid,
        }
        if (token){
          axios({
            url: this.GLOBAL.HOST + 'course/delcoursereply/',
            method: "POST",
            data: data1,
          })
            .then(function (response) {
              if (response.data.code == 210) {

                if(vm.newr=='最新评论'){
                  vm.getcomment()
                }else{
                  vm.hotsort()
                }
              } else {

                if(vm.newr=='最新评论'){
                  vm.getcomment()
                }else{
                  vm.hotsort()
                }
              }


            })
            .catch(function (error) {

              console.log(error)
            })
          vm.isDel = false
        }
        else{
          this.$router.push({
            path: '/login'
          })
        }
      },
      //加入训练计划
      addplan: function () {
        let token = window.sessionStorage.getItem('token')
        let data1 = {
          "headers": {"token": token},
          "cid": this.cid,
        }
        if (token) {
          var vm = this;
          axios({
            url: this.GLOBAL.HOST + 'course/addcourse/',
            method: "POST",
            data: data1,
          })

            .then(function (response) {
              // console.log(response.data.code)
              if (response.data.code == 410) {
                // alert('取消该课程')
                vm.isShow = true
                vm.title = ''
                vm.com_msg = '取消该训练计划'
                vm.getcourseinfo()

              } else {
                vm.isShow = true
                vm.title = ''
                vm.com_msg = '添加到训练计划'

                vm.getcourseinfo()
              }


            })
            .catch(function (error) {

              console.log(error)
            })


        } else {
          this.$router.push({
            path: '/login'
          })
        }

      },

      //动画显示留言框的方法
      commentdong:function (e) {
        // 找到留言框的节点
        // let $comm=$(this).next().next()
        let comm=e.target.nextElementSibling.parentElement.parentElement.nextElementSibling
        //开始高度为
        let jj = 0
        //当高度为0px时每次1毫秒执行一次,不给时间时默认1毫秒触发一次
        if(comm.style.height == "0px"){
          let ss= setInterval(function () {
            //高度加1
            jj += 1
            comm.style.height = jj.toString()+"px"
            //高度等于160时清楚计时器
            if(jj == 160){
              clearInterval(ss)
            }
          },1)
        }else{
          let jj = 160
          let ss= setInterval(function () {
            jj -= 1
            comm.style.height = jj.toString()+"px"
            if(jj == 0){
              clearInterval(ss)
            }
          })
        }

      },

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .pingjia-container .container-bottom{
    width: 830px;
    margin-top: 20px;
    background: #eeeeee;
    margin-left: 150px;
    box-sizing: border-box;
  }
  .pingjia-container .container-bottom .t1{
    width: 800px;
    height: 90px;
    margin: auto;
    margin-top: 20px;
    background: white;
    padding: 10px;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
  }
  .pingjia-container .container-bottom textarea{
    resize: none;
    width: 780px;
    height: 70px;
    border: none;
  }
  .pingjia-container .container-bottom button{
    width: 80px;
    height: 30px;
    outline: none;
    background: red;
    border: none;
    color: white;
    font-size: 1.1em;
    margin-left: 700px;
    position: relative;
    top: 10px;
    border-radius: 3px;
  }

  .course-nav{

    font-size: 15px;
    color: black;
  }
  .course-nav:hover{
    cursor: pointer;
    color: grey;

  }
  .line_height {
    height: 40px;
    /*margin: 10px 0;*/
    margin-top: 15px;
    padding-left: 10px;
    padding-right: 10px;

  }

  .line_height span {
    padding: 0 !important;
    margin: 0 3px;
  }

  .small_info {
    color: black;
    display: block;
    position: relative;
    width: 400px;
    left: 100px;
    top: -33px;
  }

  .small_time {
    width: 690px;
    color: darkgray;
    text-align: right;
    padding-right: 10px;
    /*position: relative;*/
    /*bottom: 10px;*/
  }

  .small_icon {
    width: 45px !important;
    height: 45px !important;
    border-radius: 50%;
  }

  .all_huifu {
    margin: 25px 0 10px 60px;
    width: 690px;
    height: 100%;
    /*border: solid 1px lightgray;*/
    background: #f3f3f3;
  }

  .huifu {
    width: 690px;
    height: 100%;
    /*margin: 0 15px;*/
    padding-bottom: 10px;
    border-top: dashed 1px lightgray;
    word-wrap:break-word

  }

  body, ul, li, h1, h2, h3, h4, p, html .container {
    margin: 0;
    padding: 0;
    /*overflow: auto;   在需要时内容会自动添加滚动条*/
    /*overflow: scroll;   总是显示滚动条*/
    overflow-x: hidden; /*禁止横向的滚动条*/
    /*overflow-y: scroll;  总是显示纵向滚动条*/
  }

  .container {
    width: 100%;
  }

  .jjj {
    margin: -80px 0 0 640px;
    color: white;
  }

  /*.fade-enter-active, .fade-leave-active {*/
    /*max-height: 500px;*/
    /*min-height: 0px;*/
    /*overflow: hidden;*/
    /*transition: max-height ease-in 3s;*/
  /*}*/

  /*.fade-enter, .fade-leave-to {*/
    /*max-height: 0px;*/
    /*min-height: 0px;*/
    /*overflow: hidden;*/
    /*transition: max-height ease-out 3s;*/
  /*}*/

  body {
    background: #f3f3f3;
    position: relative;
  }

  .title1 {
    width: 100%;
    position: relative;
    top: -20px;
    padding-top: 20px;
  }

  .bgphoto {
    /*background: url('https://static1.keepcdn.com/misc/2016/06/27/10/5563edfbdf000000.jpg');*/
    height: 257px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 818px;
    margin: auto;
    position: relative;
  }

  .bgphoto .joinplan {
    width: 160px;
    line-height: 48px;
    color: white;
    background: red;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    float: right;
    margin-right: 20px;
    margin-top: 30px;
    position: relative;
    top: 40px;
  }

  .bgphoto .joinplan:hover {

    cursor: pointer;
  }

  .need {
    width: 500px;
    height: 80px;
    /*background: #2aabd2;*/
    margin-top: 50px;
    margin-left: 20px;
  }

  .need div {
    float: left;
  }

  .q_a {
    width: 160px;
    height: 30px;
    color: white;
    font-size: 14px;
  }

  .q_a :nth-child(2) {
    margin-left: 10px;
  }

  .font-size-15 {
    font-size: 20px;
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 10px;
    color: white;
    font-weight: bold;
    clear: both;
    text-align: left;
  }

  /*!*课程动作开始*--------------------------------------------------/*/
  .middle {
    width: 818px;
    margin: auto;
    background-color: #f3f3f3;
  }

  .middle .content1 {

    display: flex;
    background-color: white;
    flex-wrap: wrap;
    margin: auto;
  }

  .middle .content1 .open {
    height: 20px;
  }

  .middle .content1 .daynum {
    margin: auto;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center
  }

  .middle .content1 .day_action {
    width: 100%;
    display: flex;
    flex-wrap: wrap
  }

  .middle .content1 .step {
    width: 340px;
    height: 82px;
    margin-left: 40px;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
  }

  .middle .content1 .step {
    cursor: pointer;
  }

  .middle .content1 .step .stepphoto {
    height: 82px;
    width: 136px;
    background: url("https://static1.keepcdn.com/picture/2015/12/21/15/5470dae76b800000.jpg");
    background-size: cover;
    background-position: center;
  }

  .middle .content1 .step .step-name {
    width: 200px;
    height: 80px;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
    color: #584f60;

  }

  .middle .content1 .step .step-name .name {
    font-size: 14px;
  }

  .middle .content1 .step .step-name .payload {
    font-size: 12px;
    font-weight: bold;
    color: #9999b3;
  }

  /*--------------------------------评论------------------------*/
  .newcomment{
    padding: 5px;
    background: red;
    color: white;

  }
  .newcomment:hover{
    cursor: pointer;
  }
  .every_comment span:hover{
    cursor: pointer;

  }
  .comment {
    width: 100%;
    height: 100%;
    background: white;
    margin-top: 10px;
    padding-bottom: 20px;
    text-align: left;
  }
  .comment .null{
    width: 100%;
    height: 350px;
  }
  .comment .null img{
    margin-top: 5%;
    margin-left: 35%;
  }
  .comment .null div{
    margin-top: 10px;
    margin-left: 40%;
    font-size: 16px;
    color: grey;
  }
  .all_comment {
    width: 800px;
    height: 100%;
    margin: auto;
    color: black;
  }

  span {
    /*height: 40px;*/
    min-height: 40px;
  + height: 100 %;
    _height: 40px;
    line-height: 40px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 176, 0.65);
  }

  .big_gray {
    min-height: 140px;
  + height: 100 %;
    _height: 140px;
    background: #f3f3f3;
    border: solid 1px rgba(189, 189, 189, 0.24);
  }

  .big_publish {
    height: 80px;
    width: 780px;
    margin: auto;
    margin-top: 10px;
    margin-left: 10px;
    background: white;
    border: solid 1px rgba(143, 143, 143, 0.44);
    outline: none;
  }
  textarea{
    resize: none;

  }

  .button {
    width: 80px;
    height: 25px;
    /*line-height: 30px;*/
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background: red;
    border: none;
    outline: none;
    border-radius: 5%;
    float: right;
    margin: 10px 10px 5px 0;
    position: relative;
  }

  input {
    outline: none;
  }

  .every_comment {
    min-height: 70px;
  + height: 100 %;
    _height: 70px;
    border-bottom: dashed 1px lightgray;
    margin-top: 10px;
  }

  .every_comment img {
    width: 60px;
    height: 60px;
    position: relative;
  }

  .every_right {
    width: 700px;
    min-height: 40px;
  + height: 100 %;
    _height: 50px;
    margin: -50px 0 0 50px;
    padding-left: 10px;
  }

  .every_right div {
    float: left;
  }

  .fade-enter-active, .fade-leave-active {
    max-height: 500px;
    min-height: 0px;
    overflow: hidden;
    transition: max-height ease-in .5s;
  }

  .fade-enter, .fade-leave-to {
    max-height: 0px;
    min-height: 0px;
    overflow: hidden;
    transition: max-height ease-out .5s;
  }

  .every_comment span {
    /*height: 20px;*/
    min-height: 20px;
  + height: 100 %;
    _height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 0 20px 0 10px;
  }

  .time {
    color: rgba(124, 124, 124, 0.81);
    font-size: 12px;
  }

  .comment_info {
    width: 550px;
    min-height: 20px;
  + height: 100 %;
    padding-left: 10px;
    word-wrap:break-word
    /*_height: 20px;*/
    /*overflow: hidden;*/

  }

  .zan {
    padding: 0 !important;
  }

  .zan img {
    position: relative;
    left: 10px;
  }

  .zan :hover {
    cursor: pointer;
  }

  .float {
    min-height:20px;
  + height: 100 %;
    _height: 20px;
    margin: -10px 0 0 60px;
    /*background: grey;*/
  }

  .float div {

    float: left;
  }

  .small_publish {
    margin: 5px 10px 0 -10px;
    width: 720px;
    height: 60px;
    border: solid 1px lightgray;
  }

  .zhu {
    margin-left: 10px;
    color: black;

  }
  .del1{
    position: relative;
    top: -60px;
  }
  .del1:hover{
    cursor: pointer;
  }
  #newcom:hover{
    cursor: pointer;

  }
  #hotcom:hover{
    cursor: pointer;

  }

  .container-bottom{
    width: 690px;
    height: 140px;
    margin-top: 20px;
    background: #eeeeee;
    margin-left: 60px;
    box-sizing: border-box;
  }
  .container-bottom .t1{
    width: 630px;
    height: 90px;
    margin: auto;
    margin-top: 20px;
    background: white;
    padding: 10px;
    box-sizing: border-box;
  }
  /*.container-bottom .t2{*/
   /*height: 60px;*/
  /*}*/
  .container-bottom textarea{
    resize: none;
    width: 580px;
    height: 70px;
    border: none;
  }
  .container-bottom button{
    width: 80px;
    height: 30px;
    outline: none;
    background: red;
    border: none;
    color: white;
    font-size: 1.1em;
    margin-left: 540px;
    position: relative;
    top: 13px;
    border-radius: 3px;
  }

</style>
