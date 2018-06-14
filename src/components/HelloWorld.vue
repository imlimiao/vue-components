<template>
  <div class="main clearfix">
    <modal v-model="isModalPost" text="我是弹出框" confirmText="继续" cancelText="重新点评" @on-confirm='confirmPost' @on-cancel="cancelPost" />

  </div>
</template>

<script>
  import modal from "../components/modal/modal";
  export default {
    name: "category",
    components: { modal },
    data: function() {
      return {
        isCheck: false,
        /**是否展示弹出框 */
        isModalPost: true,


      }
    },
    computed: {
      priviceCity: function() {

      }
    },

    methods: {
      confirmPost() {},
      cancelPost() {}
    },
    mounted() {
      setTimeout(() => { document.getElementById("loadingbox").style.display = "none" }, 5000)

    }

  }
</script>

<style>
</style>
