<template>
  <!-------------------------脚部内容--------------------->
  <footer>
    <div class="footer-heard-block"></div>
    <div class="row">
      <div class="col-md-1 col-sm-1 col-xs-1"></div>
      <div class="col-md-3 col-sm-4 col-xs-10">
        <div class="row text-center">
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="#/user" class="footer-heard-a">关于我们</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">加入我们</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="###" class="footer-heard-a">联系方式</a>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">训练课程</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">运动轨迹</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">社区精选</a>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">用户协议</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">隐私政策</a>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4 info-block">
            <a href="####" class="footer-heard-a">社区规范</a>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-sm-6 col-xs-10">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-2"></div>
          <div class="col-md-4 col-sm-6 col-xs-10">
            <div class="row">
              <div class="col-md-3 col-xs-3 col-sm-3 text-center">
                <a href="http://www.qq.com/"><img src="../../assets/index_images/QQ.svg" alt=""></a>
              </div>
              <div class="col-md-3 col-xs-3 col-sm-3 text-center">
                <a href="https://www.dingtalk.com/"><img src="../../assets/index_images/dingding.svg" alt=""></a>
              </div>
              <div class="col-md-3 col-xs-3 col-sm-3 text-center">
                <a href="https://weibo.com/"><img src="../../assets/index_images/weibo.svg" alt=""></a>
              </div>
              <div class="col-md-3 col-xs-3 col-sm-3 text-center">
                <a href="https://weixin.qq.com/"><img src="../../assets/index_images/weixin.svg" alt=""></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1 col-sm-1 col-xs-1"></div>
    </div>
    <div class="foot-middle"></div>
    <div class="foot-middle01"></div>
    <div class="foot-bottom">
      <div class="foot-bottom-info01">2017-2019 © Lutto All Rights Reserved. <a href="#">蜗牛科技有限公司</a> 京ICP备14051192号
        <img src="../../assets/index_images/government-d0289dc0a4.png"
             alt="">京ICP证53655号京公网安备 88888888888888888号 节目制作经营许可证京字19999号
      </div>
      <div class="foot-bottom-info02">如果您在 Lutto 发现违法违规内容， 请您向我们举报！ 举报电话：0110-1314520 举报邮箱：lutto@gotokeep.com</div>
    </div>
  </footer>
  <!-------------------------脚部内容--------------------->
</template>

<script>
export default {
  name: 'nav_lutto',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*-------------------------脚部内容---------------------*/
  .footer-heard-block{
    height: 80px;
  }

  .info-block{
    padding-bottom: 10px;
  }

  .info-block a{
    color: #AEAEAE;
  }
  .info-block a:hover{
    text-decoration: none;
  }
  .foot-middle{
    height: 50px;
    width: 82%;
    margin: auto;
    border-bottom: solid 1px #dddddd;
  }
  .foot-middle01{
    height: 30px;
  }
  .foot-bottom{
    width: 82%;
    margin: auto;
    color: #AEAEAE;
  }
  .foot-bottom .foot-bottom-info02{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  /*-------------------------脚部内容---------------------*/
</style>
