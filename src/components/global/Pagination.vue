<template>

  <div>
    <!--<nav_lutto></nav_lutto>-->
    <div id="page-divide">
      <div class="page" v-show="show">
        <div class="pagelist">
          <span class="jump" :class="{disabled:pstart}" @click="$emit('prePage')">上一页</span>
          <span v-show="currentPage>5" class="jump" @click="$emit('jumpPage','1')">1</span>
          <span class="ellipsis" v-show="efont">...</span>
          <span class="jump" v-for="num in indexs" :class="{bgprimary:currentPage==num}"
                @click="$emit('jumpPage',num)">{{num}}</span>
          <span class="ellipsis" v-show="ebehind">...</span>

          <span :class="{disabled:pend}" class="jump" @click="$emit('nextPage')">下一页</span>
          <span v-show="currentPage<pageCount-4" class="jump" @click="$emit('jumpPage',pageCount)">{{pageCount}}</span>

          <span class="jumppoint">跳转到：</span>
          <span class="jumpinp"><input type="text" v-model="changePage"></span>
          <span class="jump gobtn" @click="$emit('jumpPage',changePage)">GO</span>
        </div>
      </div>
    </div>
    <!--<footer_lutto></footer_lutto>-->
  </div>

</template>

<script>
  export default {
    data() {
      return {
        changePage: ''
      }
    },
    props: ['currentPage', 'pageCount'],
    computed: {
      show: function() {
        return this.pageCount && this.pageCount !== 1
      },
      pstart: function() {
        return this.currentPage === 1
      },
      pend: function() {
        return this.currentPage === this.pageCount
      },
      efont: function() {
        if (this.pageCount <= 7) return false
        return this.currentPage > 5
      },
      ebehind: function() {
        if (this.pageCount <= 7) return false
        var nowAy = this.indexs
        return nowAy[nowAy.length - 1] !== this.pageCount
      },
      indexs: function() {
        var left = 1
        var right = this.pageCount
        var ar = []
        if (this.pageCount >= 7) {
          if (this.currentPage > 5 && this.currentPage < this.pageCount - 4) {
            left = Number(this.currentPage) - 3
            right = Number(this.currentPage) + 3
          } else {
            if (this.currentPage <= 5) {
              left = 1
              right = 7
            } else {
              right = this.pageCount

              left = this.pageCount - 6
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .page {
    font-weight: 900;
    height: 40px;
    text-align: center;
    color: #888;
    margin: 20px auto 0;
  }

  .pagelist {
    font-size: 0;
    height: 50px;
    line-height: 50px;
  }

  .pagelist span {
    font-size: 14px;
  }

  .pagelist .jump {
    border: 1px solid #ccc;
    padding: 5px 8px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
  }

  .pagelist .bgprimary {
    cursor: default;
    color: #fff;
    background: #337ab7;
    border-color: #337ab7;
  }

  .jumpinp input {
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #ccc;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
  }

  .ellipsis {
    padding: 0px 8px;
  }

  .jumppoint {
    margin-left: 30px;
  }

  .pagelist .gobtn {
    font-size: 12px;
  }

  .bgprimary {
    cursor: default;
    color: #fff;
    background: #337ab7;
    border-color: #337ab7;
  }
  .pagelist .jump.disabled{
    pointer-events: none;
    background: #ddd;
  }
  .pagelist span { font-size: 14px; user-select: none;/*禁止文本选中*/ }

</style>
