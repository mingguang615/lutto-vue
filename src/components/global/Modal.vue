<template>
  <!--<transition class="hw-overlay">-->
    <!--<div class="hw-layer-wrap row" >-->
      <!--<div class="modal-header">-->
        <!--<slot name="header">-->
          <!--<span class="glyphicon glyphicon-remove hwLayer-close" @click="close"></span>-->
        <!--</slot>-->
      <!--</div>-->
      <!--<div class="modal-body ">-->
        <!--<slot name="body" class="col-md-3 col-sm-12 hw-icon">-->
          <!--<div class="glyphicon glyphicon-info-sign"></div>-->
        <!--</slot>-->
      <!--</div>-->
      <!--<div class="modal-footer col-md-9 col-sm-12">-->
        <!--<slot name="footer">-->
          <!--<h4>保存成功</h4>-->
          <!--<button class="btn btn-success hwLayer-ok" @click="close">确 定</button>-->
          <!--<button class="btn btn-warning hwLayer-cancel" @click="close">取 消</button>-->
          <!--&lt;!&ndash;<button type="button" class="btn-green" @click="close">关闭</button>&ndash;&gt;-->
        <!--</slot>-->
      <!--</div>-->
    <!--</div>-->
  <!--</transition>-->

    <transition class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="zzc">
        <div class="modal-dialog " role="document">
          <div class="modal-content">
            <div class="modal-header">
              <slot>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true" @click="close">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">确认</h4>
              </slot>
            </div>
            <div class="modal-body">
              <slot>保存成功！！！</slot>
            </div>
            <div class="modal-footer">
              <slot>
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="close">关闭</button>
                <button type="button" class="btn btn-primary" @click="close">确定</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>


<script>
  export default {
    name: 'Modal',
    props: ['show'],
    data() {
      return {}
    },
    methods: {
      close: function () {
        this.$emit('close');
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
  <!--@media (max-width:768px){-->
    <!--.hw-layer-wrap{width:350px; margin-left:-175px; margin-top:-200px; padding:45px 50px; text-align:center;}-->
  <!--}-->
  <!--@media (max-width:400px){-->
    <!--.hw-layer-wrap{width:250px; margin-left:-125px;padding:25px 30px;}-->
  <!--}-->
  <!--.hw-overlay{display:none; position: fixed; top:0;left:0;width:100%;height:100%; background-color: rgba(0,0,0,0.3);z-index:10;}-->
  <!--.hw-layer-wrap{box-sizing:border-box; width:500px; position:absolute;left:33%;top:40%; margin-left:-285px; border-radius:3px; background-color:#fff; box-shadow:1px 2px 4px 0 rgba(0,0,0,0.12); padding:45px 50px;}-->
  <!--.hwLayer-close{position:absolute; right:20px; top:20px; width:20px; height:20px; cursor:pointer; font-size:20px; color:#ccc;}-->
  <!--.hw-layer-wrap .hw-icon{color:#b4d8f3;font-size:86px;text-align:center;}-->
  <!--.hw-layer-wrap h4{margin:5px 0 30px; font-size:24px; color:#383c3e;}-->
  <!--.hw-layer-wrap p{margin:30px 0; line-height:22px; color:#595d60; text-align:left;}-->

<!--</style>-->
<style scoped>
  /*<!--遮罩层-->*/
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
</style>
