<template>
  <div class="fresh-load-outer" :style="clientObj">
    <div class="fresh-load-page">
      <div class="fresh-load-bar" :style="{height: loadbarHeight + 'px', backgroundColor: backgroundColor, color:color, fontSize:fontSize}">
        <span>{{text}}</span>
      </div>
      <div class="fresh-load-fix-height">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .fresh-load-outer {
    background-color: yellow;
  }

  .fresh-load-page {
    overflow: auto;
    width: 100%;
    height: 100%;
  }

  .fresh-load-bar {
    background-color: red;
    overflow: hidden;
    position: relative;
    span {
      display: inline-block;
      width: 100%;
      position: absolute;
      bottom: 5px;
      text-align: center;
      font-size: 13px;
    }
  }

  .fresh-load-placeholder {
    width: 100%;
  }

  .fresh-load-common {
    width: 100%;
    height: 100%;
  }
</style>
<script type="text/javascript">
  export default {
    data() {
      return {
        loadbarHeight: 0,
        currentTop: 0,
        text: '',
        dom: '',
        duration: 300,
        isPullUp: false
      }
    },
    props: {
      type: {
        default: 1,
        validator(val) {
          return val == 1 || val == 2;
        }
      },
      refreshContentHeight: {
        type: Number,
        default: 200
      },
      loadHandler: {
        type: Function,
        require: true
      },
      pullTip: {
        type: String,
        default: "↓"
      },
      releaseTip: {
        type: String,
        default: "释放刷新"
      },
      loadingTip: {
        type: String,
        default: "加载中…"
      },
      backgroundColor: {
        type: String,
        default: '#f2f3f7'
      },
      color: {
        type: String,
        default: 'black'
      },
      fontSize: {
        type: String,
        default: '13px'
      },
      pullTipLimit: {
        type: Number,
        default: 20
      },
      releaseTipLimit: {
        type: String,
        default: 60
      },
      pullSpeed: {
        type: Number,
        default: 0.35
      }
    },
    computed: {
      clientObj() {
        if (this.type == 1) return {
          width: document.documentElement.clientWidth + 'px',
          height: document.documentElement.clientHeight + 'px'
        }
        return {
          height: this.refreshContentHeight + 'px'
        };
      }
    },
    mounted() {
      this.dom = document.querySelector('.fresh-load-bar');

      let scroller = document.querySelector('.fresh-load-page');

      scroller.addEventListener('touchstart', this.touchstartHandler, false);
      scroller.addEventListener('touchmove', this.touchmoveHandler, false);
      scroller.addEventListener('touchend', this.touchendHandler, false);

      this.scroller = scroller;
    },
    methods: {
      touchstartHandler(e) {
        let touchPoint = e.targetTouches[0];
        this.currentCY = touchPoint.clientY;

        let fixHeightBox = document.querySelector('.fresh-load-fix-height');
        let originHeight = parseInt(window.getComputedStyle(fixHeightBox, null).height);

        // inner需出现滚动条，即内容高度大于inner高度时滑动才不会影响window的滚动
        let scrollH = parseInt(window.getComputedStyle(this.scroller, null).height);
        if (originHeight <= scrollH) {
          fixHeightBox.style.height = scrollH + 1 + 'px';
        }
        this.originHeight = originHeight;

        if (e.currentTarget.scrollTop == 0) e.currentTarget.scrollTop = 1;

      },
      touchmoveHandler(e) {
        let touchPoint = e.targetTouches[0];

        let dis = touchPoint.clientY - this.currentCY;
        // 下拉
        if (dis > 0) {
          this.currentCY = touchPoint.clientY;

          // 到顶
          if (e.currentTarget.scrollTop == 0) {

            this.loadbarHeight += parseFloat(dis * this.pullSpeed);

            if (this.loadbarHeight > this.pullTipLimit && this.loadbarHeight < this.releaseTipLimit) {
              this.text = this.pullTip;
            } else if (this.loadbarHeight >= this.releaseTipLimit) {
              this.text = this.releaseTip;
            }
          };
        }
      },
      touchendHandler(e) {
        let vm = this;
        if (this.text == this.releaseTip) {
          this.changeBarHeight(40);
          this.text = this.loadingTip;

          new Promise((resolve) => {
            this.loadHandler(resolve);
          }).then((tip) => {
            if (tip) this.text = tip;
            this.changeBarHeight(0, true);

            let fixHeightBox = document.querySelector('.fresh-load-fix-height');
            if (vm.originHeight) {
              fixHeightBox.style.height = vm.originHeight + 'px';
              vm.originHeight = null;
            }
          });
        } else if (this.loadbarHeight > 0) {
          this.changeBarHeight(0, true);
        }
      },
      changeBarHeight(height, clearText) {
        let bar = this.dom;
        bar.style.transition = `height ${this.duration}ms ease-in-out`;
        this.loadbarHeight = height;
        setTimeout(() => {
          console.log("112345");
          bar.style.transition = 'height 0ms ease-in-out';
          if (clearText) this.text = '';
        }, this.duration);
      }
    }
  }
</script>
