<template>
  <div
      @touchstart="playerTouchStart"
      @touchmove="playerTouchMove"
      @touchend="playerTouchEnd"
      class="container">
    <div v-for="(item, index) in cardArrs" :key="index"
         :style="[
        { zIndex: item.zIndex },
        { transform: `scale(${item.scale}) translate3d(${item.translateX}, 0px, 0px)` },
        { transition: `transform ${item.transitionTime}s ease 0s` }
      ]"
         class="card-item"
    >
      <div class="item-inner" :id="'item-' + index" @click="go(index)">
      </div>
    </div>

  </div>
</template>

<script>
const ua = decodeURIComponent(navigator.userAgent);
const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export default {
  name: 'SlideCard',
  data() {
    return {
      cardArrs: [
        {
          text: "card-0",
          zIndex: 10,
          bgColor: "red",
          scale: 1,
          translateX: 0,
          transitionTime: 1
        },
        {
          text: "card-1",
          zIndex: 9,
          bgColor: "blue",
          scale: 0.9,
          translateX: '9vw',
          transitionTime: 1
        },
        {
          text: "card-2",
          zIndex: 8,
          bgColor: "yellow",
          scale: 0.85,
          translateX: '15vw',
          transitionTime: 1
        },
        {
          text: "card-3",
          zIndex: 7,
          bgColor: "green",
          scale: 0.5,
          translateX: '40vw',
          transitionTime: 1
        },
        {
          text: "card-4",
          zIndex: 6,
          bgColor: "gray",
          scale: 0.5,
          translateX: '40vw',
          transitionTime: 0
        },
        {
          text: "card-5",
          zIndex: 5,
          bgColor: "pink",
          scale: 0.5,
          translateX: '40vw',
          transitionTime: 0
        }
      ],
      appLinks: [
          'thepaper|3|91835',
          'thepaper|2|13144362',
          'thepaper|10|13143155',
          'thepaper|9|13135686',
          'thepaper|6|1264661|0|https://www.baidu.com/',
          'thepaper|6|0|1|https://www.baidu.com/'
      ],
      webLinks: [
          'https://www.thepaper.cn/newsDetail_forward_91835',
          'https://www.thepaper.cn/newsDetail_forward_13144362',
          'https://www.thepaper.cn/newsDetail_forward_13143155',
          'https://www.thepaper.cn/newsDetail_forward_13135686',
          'https://www.baidu.com/',
          'https://www.baidu.com/'
      ],
      isClick: true,
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      slideDistance: 40, // 滑动触发切换还是回位的阀值
      currentIndex: 0, // 当前第一个的 index
      slideLeft: false,   // 向左滑动
      slideFinishDistance: 300,  // 滑动切换动画完成的距离
    }
  },

  methods: {
    playerTouchStart(ev) {
      ev = ev || event
      this.click = true
      if (ev.touches.length === 1) {
        //记录开始滑动的位置
        this.startX = ev.touches[0].clientX;
        //console.log('开始触摸-startX', this.startX)
      }
    },

    playerTouchMove(ev) {
      ev = ev || event
      this.click = true
      if (ev.touches.length === 1) {
        this.moveX = ev.touches[0].clientX
        this.disX = this.startX - this.moveX

        if (this.disX < 0) {  //右滑
          this.slideLeft = false
          // 当前上一个变化
          if (this.cardArrs[this.currentIndex - 1]) {
            let item_0 = this.cardArrs[this.currentIndex - 1]
            item_0.translateX = -window.innerWidth - this.disX + 'px'
            item_0.transitionTime = 0
            if (-this.disX <= this.slideFinishDistance) {
              item_0.scale = -(0.2 / this.slideFinishDistance) * this.disX + 0.8
            }
          }
          // 当前第一个变化
          let item_1 = this.cardArrs[this.currentIndex]
          if (-this.disX <= this.slideFinishDistance) {
            item_1.translateX = -(9 / this.slideFinishDistance) * this.disX + 'vw'
            item_1.transitionTime = 0
            item_1.scale = (0.1 / this.slideFinishDistance) * this.disX + 1
          }
          // 当前第二个变化
          if (this.cardArrs[this.currentIndex + 1]) {
            let item_2 = this.cardArrs[this.currentIndex + 1]
            if (-this.disX <= this.slideFinishDistance) {
              item_2.translateX = -(5 / this.slideFinishDistance) * this.disX + 9 + 'vw'
              item_2.transitionTime = 0
              item_2.scale = (0.05 / this.slideFinishDistance) * this.disX + 0.9
            }
          }
          // 当前第三个变化
          if (this.cardArrs[this.currentIndex + 2]) {
            let item_3 = this.cardArrs[this.currentIndex + 2]
            if (-this.disX <= this.slideFinishDistance) {
              item_3.translateX = -(26 / this.slideFinishDistance) * this.disX + 15 + 'vw'
              item_3.transitionTime = 0
              item_3.scale = (0.35 / this.slideFinishDistance) * this.disX + 0.85
            }
          }
        } else if (this.disX > 0){  //左滑
          this.slideLeft = true
          let item_1 = this.cardArrs[this.currentIndex]
          item_1.translateX = -this.disX + 'px'
          item_1.transitionTime = 0
          item_1.scale = 1

          if (this.cardArrs[this.currentIndex + 1]) {
            let item_2 = this.cardArrs[this.currentIndex + 1]
            if (this.disX <= this.slideFinishDistance) {
              item_2.translateX = -(9 / this.slideFinishDistance) * this.disX + 9 + 'vw'
              item_2.transitionTime = 0
              item_2.scale = (0.1 / this.slideFinishDistance) * this.disX + 0.9
            }
          }

          // 当前第三个变化
          if (this.cardArrs[this.currentIndex + 2]) {
            let item_3 = this.cardArrs[this.currentIndex + 2]
            if (this.disX <= this.slideFinishDistance) {
              item_3.translateX = -(5 / this.slideFinishDistance) * this.disX + 15 + 'vw'
              item_3.transitionTime = 0
              item_3.scale = (0.05 / this.slideFinishDistance) * this.disX + 0.85
            }
          }
          // 当前第四个变化
          if (this.cardArrs[this.currentIndex + 3]) {
            let item_4 = this.cardArrs[this.currentIndex + 3]
            if (this.disX <= this.slideFinishDistance) {
              item_4.translateX = -(26 / this.slideFinishDistance) * this.disX + 40 + 'vw'
              item_4.transitionTime = 0
              item_4.scale = (0.35 / this.slideFinishDistance) * this.disX + 0.5
            }
          }
        }
      }
    },

    playerTouchEnd(ev) {
      ev = ev || event
      if (ev.changedTouches.length === 1) {
        this.endX = ev.changedTouches[0].clientX
        //console.log('滑动结束-endX', this.endX)
        this.disX = this.startX - this.endX
        if (Math.abs(this.disX) < this.slideDistance) {
          // 滑动距离小于滑动限制的距离,强行回到起点
          this.returnBack()
        } else {
          // 滑动距离大于滑动限制的距离,滑动到最大值
          if (this.slideLeft) {
            this.slideUp()
          } else {
            this.slideDown()
          }
        }
      }
    },

    // 回到起点
    returnBack () {
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex]
      item_1.translateX = 0
      item_1.transitionTime = 1
      item_1.scale = 1
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1]
        item_2.translateX = '9vw'
        item_2.transitionTime = 1
        item_2.scale = 0.9
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2]
        item_3.translateX = '15vw'
        item_3.transitionTime = 1
        item_3.scale = 0.85
      }
      // 当前第四个变化
      if (this.cardArrs[this.currentIndex + 3]) {
        let item_4 = this.cardArrs[this.currentIndex + 3]
        item_4.translateX = '40vw'
        item_4.transitionTime = 1
        item_4.scale = 0.5
      }
    },

    // 向上滑动切换
    slideUp () {
      if (this.currentIndex === this.cardArrs.length - 1) {
        return this.returnBack()
      }
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex]
      item_1.translateX = '-160vw'
      item_1.transitionTime = 1
      item_1.scale = 0.5
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1]
        item_2.translateX = 0
        item_2.transitionTime = 1
        item_2.scale = 1
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2]
        item_3.translateX = '9vw'
        item_3.transitionTime = 1
        item_3.scale = 0.9
      }
      // 当前第四个变化
      if (this.cardArrs[this.currentIndex + 3]) {
        let item_4 = this.cardArrs[this.currentIndex + 3]
        item_4.translateX = '15vw'
        item_4.transitionTime = 1
        item_4.scale = 0.85
      }
      this.currentIndex++
      if (this.currentIndex > this.cardArrs.length - 1) {
        this.currentIndex = this.cardArrs.length - 1
      }
      //console.log('currentIndex---', this.currentIndex)
    },
    // 向下滑动切换
    slideDown () {
      if (this.currentIndex === 0) {
        return this.returnBack()
      }
      // 当前上一个变化
      if (this.cardArrs[this.currentIndex - 1]) {
        let item_0 = this.cardArrs[this.currentIndex - 1]
        item_0.translateX = 0
        item_0.transitionTime = 0.6
        item_0.scale = 1
      }
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex]
      item_1.translateX = '9vw'
      item_1.transitionTime = 0.6
      item_1.scale = 0.9
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1]
        item_2.translateX = '15vw'
        item_2.transitionTime = 0.6
        item_2.scale = 0.85
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2]
        item_3.translateX = '40vw'
        item_3.transitionTime = 0.6
        item_3.scale = 0.5
      }
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = 0
      }
      console.log('currentIndex---', this.currentIndex)
    },

    //点击事件
    go(id) {
      console.log(id);
      try {
        if (isIOS) {
          try {
            window.webkit.messageHandlers.adClicked.postMessage(this.appLinks[id]);
          } catch (e) {
            window.webkit.messageHandlers.thepaperNewsClicked.postMessage(this.appLinks[id]);
          }
        } else if (isAndroid) {
          window.thepaper.adClicked(this.appLinks[id]);
        } else {
          window.open(this.webLinks[id]);
        }
      } catch (e) {
        window.open(this.webLinks[id]);
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 6.9rem;
  height: 4.8rem;
  background: #fff;
  margin: 0 auto;
  overflow: hidden;
}

.card-item {
  position: absolute;
  width: 6.35rem;
  height: 4.8rem;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  will-change: transform;
}

.item-inner {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 12px 1px rgba(57,57,57,.2);
  position: relative;
  border-radius: 20px;
  background-size: 100% 100%;
}

/* 卡片背景图 */
#item-0 {
  background-image: url('../assets/p0.jpg');

}

#item-1 {
  background-image: url('../assets/p1.jpg');
}

#item-2 {
  background-image: url('../assets/p2.jpg');
}

#item-3 {
  background-image: url('../assets/p3.jpg');
}

#item-4 {
  background-image: url('../assets/p4.jpg');
}

#item-5 {
  background-image: url('../assets/p5.jpg');
}
</style>
