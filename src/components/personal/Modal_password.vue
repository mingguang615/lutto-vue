<template>
    <transition class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="modal-dialog" role="document" >
        <div class="modal-content" >
          <div class="modal-header">
            <slot>
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true" @click="close">&times;</span></button>-->
              <h4 class="modal-title" id="myModalLabel">请输入原密码</h4>
            </slot>
          </div>
          <div class="modal-body">
            <slot>
              <input type="password" style="border: none; outline: none;" >
            </slot>
          </div>
          <div class="modal-footer">
            <slot>
              <!--<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>-->
              <button type="button" class="btn btn-primary">确定</button>
            </slot>
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
    created:function(){
      this.$emit('flushnav')
    },
    methods: {
      close: function () {
        this.$emit('close');
      }
    }
  }
</script>
<style scoped>

</style>
