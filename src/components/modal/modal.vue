<template>
  <div class="Modal" v-if="show">
    <div class="box clearfix">
      <div class="box-main">
        <div class="box-txt">{{text}}</div>
        <div class="box-btons">
          <div class="box-btons-left zp-border-top" @click="cancel">{{cancelText}}</div>
          <div class="box-btons-right" @click="confirm">{{confirmText}}</div>
        </div>
      </div>
      <div class="layoutfix"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: "提示"
      },
      text: {
        type: String
      },
      confirmText: {
        type: String,
        default: "确定"
      },
      cancelText: {
        type: String,
        default: "取消"
      }
    },
    data: function() {
      return {
        show: this.value
      };
    },
    watch: {
      value(val) {
        this.show = val;
      }
    },
    computed: {
      priviceCity: function() {}
    },
    methods: {
      confirm() {
        this.show = false;
        this.$emit("on-confirm");
      },
      cancel() {
        this.show = false;
        this.$emit("on-cancel");
      }
    },
    mounted() {}
  };
</script>

<style scoped lang='scss'>
  @import "./modal.scss";
</style>
