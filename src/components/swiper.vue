<template>
  <div class="carousel">
    <div class="indicators">
      <!-- 循环创建指示器，根据activeIndex显示选中状态 -->
      <img
        v-for="(indicator, index) in indicators"
        :key="index"
        :src="activeIndex === index ? indicator.selected : indicator.normal"
        @click="switchTo(index)"
        class="indicator"
      />
    </div>
    <div class="carousel-images">
      <!-- 循环创建轮播图片，根据activeIndex显示当前图片 -->
      <img
        v-for="(src, index) in props.imageSrcs"
        :key="index"
        :src="src"
        :class="{ 'carousel-image': true, active: activeIndex === index }"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, props, onMounted, onUnmounted } from 'vue';

// 定义组件的props
const props = defineProps({
  imageSrcs: {
    type: Array,
    required: true,
  },
  indicatorSrcs: {
    type: Array,
    required: true,
  },
  selectedIndicatorSrcs: {
    type: Array,
    required: true,
  },
});

const activeIndex = ref(0);

// 设置自动轮播的定时器
let autoplayInterval;

const switchTo = (index) => {
  activeIndex.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    if (activeIndex.value < props.imageSrcs.length - 1) {
      activeIndex.value++;
    } else {
      activeIndex.value = 0;
    }
  }, 3000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

const resetAutoplay = () => {
  clearInterval(autoplayInterval);
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  clearInterval(autoplayInterval);
});
</script>

<style scoped>
.carousel {
  position: relative;
}

.indicators {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.indicator {
  cursor: pointer;
  width: 10px; /* 根据实际情况调整 */
  height: 10px; /* 根据实际情况调整 */
  margin: 0 5px;
}

.carousel-image {
  width: 100%;
  height: auto;
  display: none;
}

.carousel-image.active {
  display: block;
}
</style>