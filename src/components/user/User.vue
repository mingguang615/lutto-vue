<template>
    <div class="container">
      <div class="user">
        <div class="img" >
          <div>About Lutto</div>
          <div>-</div>
          <div>关于我们</div>
        </div>
        <div class="text">
          <p>Lutto是一款健身与商城相结合的网站，本站暂时实现了以下功能：</p>
          <p>1.动作筛选：可通过训练器械，训练部位，训练难度三个条件筛选动作，你也可以自主搜索关键词来获取你想要的动作，
            每个动作都有详细的动作要领图，主要肌肉图以及详细动作解析。</p>
          <p>2.课程分类：我们专门为久坐，久站，初级，进阶等健身群体对不同课程进行了分类，让用户更快速的找到适合自己的
          课程，提升用户的体验度。</p>
          <p>3.收藏课程：你可以把喜欢的课程添加到我的课程里，方便训练时查找。</p>
          <p>4.评论课程：对喜欢的课程当然要评价一下啦，当然我们的不足您也可以进行评价和回复，我们会及时反省和改进。</p>
          <p>5.积分兑换：通过评论，签到等获得积分，积分可以免费兑换等价商品。</p>
          <p>6.购物车：可以暂时把挑选商品放入购物车或更改购买数量，并对多个商品进行一次结款。</p>
          <p>7.个人中心：可以查看订单状态，也可以修改手机绑定，添加地址，完善个人资料，修改密码等。</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "user",
      mounted:function () {
        this.$emit('flushnav') //刷新导航栏
        window.sessionStorage.setItem("from","/user")
        window.scrollTo(0,0)
      }
    }
</script>

<style scoped>
  .container{
    background: #f3f3f3;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .container .img{
    height: 388px;
    margin-top: -20px;
    color: #fff;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(https://staticweb.keepcdn.com/showstatic/images/about/banner-0925524b72.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .text{
    margin: auto;
    margin-top: 50px;
    margin-bottom: 100px;
    width: 60%;
  }
  p{
    font-size: 16px;
  }
</style>
