<template>
  <div class="container study-carousel">
    <div class="row">
      <div class="col-md-12 text-center">
        <ul>
          <li ref="lun" v-for="i in 5" :class="lis[i]" @mouseover="enter(i)"
              @mouseout="slidRight" :key="i">
              <img :src="imgs[i]" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Carousel',
  data () {
    return {
      msg: '轮播图',
      lis: ['', 'li1', 'li2', 'li3', 'li4', 'li5'],
      imgs: [
        '',
        'http://img14.360buyimg.com/n0/jfs/t20221/3/2077026209/193298/9296520c/5b46f705N65387f21.jpg',
        'http://img14.360buyimg.com/n0/jfs/t17074/88/2327662779/371594/7c5812fa/5aed67bcNe80075f7.jpg',
        'http://img14.360buyimg.com/n0/jfs/t22135/103/9261746/582954/7a402d9b/5af529aeNb05c4ad2.jpg',
        'http://img14.360buyimg.com/n0/jfs/t20257/153/7929377/282692/f54824e2/5af529b2N420507e5.jpg',
        'http://img14.360buyimg.com/n0/jfs/t16921/229/2405539182/301873/d2edc5c2/5af529b3N4f3869de.jpg'
      ],
      timer: ''
    }
  },
  created () {
    // 进入界面，执行向左滑动,循环播放
    this.slidLeft()
    this.$emit('flushnav')
  },
  methods: {
    // 向左滑动
    slidLeft: function () {
      window.clearInterval(this.timer)
      // 每过一秒钟，变换图片位置
      this.timer = window.setInterval(() => {
        // 将imgs第一个空元素删除
        this.imgs.shift()
        // 将删除第一个元素后的数组中的第一的元素删除，并且将其追加到末尾
        this.imgs.push(this.imgs.shift())
        // 最后在imgs的头部插入一个空元素
        this.imgs.unshift('')
      }, 1500)
    },
    // 向右滑动
    slidRight: function () {
      window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        // 将imgs第一个空元素删除
        this.imgs.shift()
        // 将最后一个元素移到第一个:将最后一个添加到第一个，删除最后一个
        this.imgs.unshift(this.imgs[4])
        this.imgs.pop()
        // 最后在imgs的头部插入一个空元素
        this.imgs.unshift('')
      }, 1500)
    },
    // 鼠标悬停，控制滑动
    enter: function (i) {
      window.clearInterval(this.timer)
      if (i < 3) {
        // 反方向滑动
        this.slidRight()
      } else if (i > 3) {
        this.slidLeft()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul,li {
    list-style: none;
  }
  .study-carousel{
    /*margin: 60px 0 30px 0;*/
    margin: 30px auto;
    /*position: absolute;*/
    height: 360px;
  }

  li{
    position: absolute;
    width: 800px;
    height: 360px;
    /*transition: all 0.8s ease-out;*/
    cursor: pointer;
    left: 50%;
    top: 50%;
    margin-left: -400px;
  }
  li img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 2px 2px 5px #3c3c3c;
  }
  .li1{
    transform: translate3d(-280px, 0, 0) scale(0.8);
    z-index: 1;
  }
  .li2{
    transform: translate3d(-140px, 0, 0) scale(0.9);
    z-index: 2;
  }
  .li3{
    transform: translate3d(0, 0, 0) scale(1);
    z-index: 3;

  }
  .li4{
      transform: translate3d(140px, 0, 0) scale(0.9);
      z-index: 2;
  }
  .li5{
    transform: translate3d(280px, 0, 0) scale(0.8);
    z-index: 1;
  }

</style>
