<template>
  <div class="container">
    <div v-for="(item, index) in cardArrs" :key="index"
         :style="[
        { zIndex: item.zIndex },
        { transform: `scale(${item.scale}) translate3d(0px, ${item.translateY}, 0px)` },
        { transition: `transform ${item.transitionTime}s ease 0s` }
      ]"
         class="card-item"
    >
      <div :style="{ backgroundColor: item.bgColor }" class="item-inner">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideCard',
  data() {
    return {
      cardArrs: [
        {
          text: "card-1",
          zIndex: 10,
          bgColor: "red",
          scale: 1,
          translateY: 0,
          transitionTime: 1
        },
        {
          text: "card-2",
          zIndex: 9,
          bgColor: "blue",
          scale: 0.9,
          translateY: '9vh',
          transitionTime: 1
        },
        {
          text: "card-3",
          zIndex: 8,
          bgColor: "yellow",
          scale: 0.85,
          translateY: '14vh',
          transitionTime: 1
        },
        {
          text: "card-4",
          zIndex: 7,
          bgColor: "green",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 1
        },
        {
          text: "card-5",
          zIndex: 6,
          bgColor: "gray",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
        {
          text: "card-6",
          zIndex: 5,
          bgColor: "pink",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
        {
          text: "card-7",
          zIndex: 4,
          bgColor: "purple",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
        {
          text: "card-8",
          zIndex: 3,
          bgColor: "green",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
        {
          text: "card-9",
          zIndex: 2,
          bgColor: "#fff",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
        {
          text: "card-10",
          zIndex: 1,
          bgColor: "pink",
          scale: 0.5,
          translateY: '40vh',
          transitionTime: 0
        },
      ],
      isClick: true,
      startY: 0, // 触摸位置
      endY: 0, // 结束位置
      moveY: 0, // 滑动时的位置
      disY: 0, // 移动距离
      slideDistance: 40, // 滑动触发切换还是回位的阀值
      currentIndex: 0, // 当前第一个的 index
      slideDirection: 0, // 滑动方向：0 向下，1 向上
      slideFilishDistance: 300,  // 滑动切换动画完成的距离
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 6.9rem;
  height:5.2rem;
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
  box-shadow: 0 4px 12px 1px rgba(57,57,57,.14);
  position: relative;
  border-radius: 12px;
}
</style>
