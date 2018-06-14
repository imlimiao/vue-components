<template>
  <!-- 刷新部分内容 -->
  <!--     <div style="height:100px;width:100%;">content1</div>
    <fresh :load-handler="loadHandler" :type="2">
        <ul class="demo">
            <li v-for="item in list">{{item}}</li>
        </ul>
    </fresh> -->

  <!-- 刷新整个页面 -->
  <fresh :load-handler="loadHandler" releaseTipLimit=60>
    <ul class="demo">
      <li v-for="(item,index) in list" :key="index" class="demoli">{{item}}</li>
    </ul>
  </fresh>
</template>
<style scope lang="scss">
  .demo {
    width: 100%;
    background-color: #aeaeae;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .demoli {
    border-top: 1px solid yellow;
    width: 100%;
    height: 50px;
  }
</style>
<script type="text/javascript">
  import PullRefresh from '@/components/PullRefresh/PullRefresh.vue'
  export default {
    data: function() {
      return {
        loadHandler: (resolve) => {
          console.log("12345hhhhh");
          setTimeout(() => {
            resolve('刷新成功！');
            console.log("刷新成功")
          }, 1500);
        },
        // list:[0,1,2,3,4,5,6,7,8,9]
        list: [0, 1, 2]
      }
    },
    created: function() {

    },
    methods: {

    },
    components: {
      'fresh': PullRefresh
    }
  }
</script>
