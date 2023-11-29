<template>
  <div class="home">
    <div class="header">
      <div class="h1"><span>日拱一卒</span></div>
    </div>

    <div class="cover-photo-box">
      <img class="cover-photo" :src="imgUrl" alt="" />
      <div class="old-calendar">
        <div class="item">{{ oldYear }}</div>
        <div class="item">{{ oldMonth }}</div>
        <div class="item">{{ oldDay }}</div>
      </div>
      <!-- <div class="huge-day">{{ newDay }}</div> -->
      <HugeDay  :huge-day="newDay"/>
    
    </div>
    <div class="date-box">
      <!-- <div class="huge-day">{{ newDay }}</div> -->
      <div class="date">{{ newYear }}.{{ newMonth }}.{{ newDay }} {{ ncWeek }}</div>
    </div>

    <div class="content-box">
      <p class="sentence">{{ curWord.w }}</p>
      <p class="works-info" v-if="curWord.author">
        {{ curWord.author }}
      </p>
    </div>

    <footer @click="shareImg">
      ---------------@凡人进阶----------------
    </footer>
  </div>
</template>

<script setup>
import HugeDay from './HugeDay.vue'
import { autoPicture } from '../utils/export2Image'
import { computed, onMounted, ref } from 'vue'
import { getWord } from '../api/index'
import calendarFormatter from '../utils/calendarFormatter'
const dt = new Date()

let nongli = calendarFormatter.solar2lunar(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());

console.log(nongli)
const oldYear = nongli.gzYear + nongli.Animal + '年'
const oldMonth = nongli.gzMonth + '月' + nongli.gzDay + '日'
const oldDay = nongli.IMonthCn + nongli.IDayCn
const newYear = nongli.cYear
const newMonth = nongli.cMonth
const newDay = nongli.cDay
const ncWeek = nongli.ncWeek
const curWord = ref({})
onMounted(() => curWord.value = getWord())
// const src = computed(() => require('../assets/cover-06.jpg'))
// const imgURLAPI = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3'
const imgURLAPI = 'https://bing.biturl.top/?resolution=1366&format=json&index=0&mkt=zh-CN'
const imgUrl = ref(new URL(`../assets/cover-5.jpg`, import.meta.url).href)
onMounted(() => {
  getAssetURL()
})
const getAssetURL = () => {
  fetch(imgURLAPI)
    .then(response => response.json())
    .then(data => {
      // 处理返回的数据
      // console.log(data.url)
      imgUrl.value = data.url
    })
    .catch(error => {
      // 处理请求错误
    });
  // return new URL(`../assets/cover-${newMonth}.jpg`, import.meta.url).href
}

const show = ref(false)
const currentImg = ref('')

const shareImg = async () => {
  const el = document.querySelector('.home')
  // const canvasFalse = document.createElement('canvas')
  const width = parseInt(window.getComputedStyle(el).width)
  const height = parseInt(window.getComputedStyle(el).height)
  console.log('width:', width, 'height:', height)
  let canvas = await autoPicture(el, {
    scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
     width, height })
  if (canvas) {
    currentImg.value = canvas
    show.value = true
    // canvas为转换后的Canvas对象
    let oImg = new Image()
    oImg = currentImg.value // 导出图片
    console.log(oImg)
    var oA = document.createElement('a')
    oA.download = '分享内容' // 设置下载的文件名，默认是'下载'
    oA.href = oImg
    document.body.appendChild(oA)
    oA.click()
    oA.remove() // 下载之后把创建的元素删除
  }
}
</script>

<style lang="less" scoped>
.preview {
  position: fixed;
  width: 80%;
}
footer{
  width: 100vw;
  font-size: 12px;
  color: #ccc;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.home {
  box-sizing: content-box;
  height: 80vh;
  padding-top: 2vw;
  background-color: #fff;
  .header {
    .h1 {
      line-height: 4vw;
      height: 4vw;
      font-size: 4vw;
      margin: 2vw;
      font-weight: normal;
      color: #555;
    }
  }
  .home-nav {
    width: 100vw;
  }

  .cover-photo-box {
    width: 100vw;
    aspect-ratio: 1366/768;
    position: relative;
    .cover-photo {
      width: 100%;
    }
    .old-calendar {
      position: absolute;
      top:4vw;
      right: 4vw;
      height: 28vw;
      writing-mode: tb-rl;
      font-size: 3.5vw;
      color: #fff;
      .item {
        display: inline-block;
        letter-spacing: 1vw;
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        text-align: left;
        margin: 0 1vw;
      }
    }
  }
  .huge-day {
    position: absolute;
    left: 2vw;
    bottom: -10vw;
    right:0px;
    letter-spacing: -1vw;
    z-index: 1;
    font-size: 20vw;
    font-weight: 500;
    color: #fff;
  }

  .date-box {
    width: 100%;
    box-sizing: border-box;
    padding: 2vw 4vw;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    .huge-day {
      color: #010101;
      top: -17vw;
    }

    .date {
      font-size: 3vw;
      color: #010101;
    }
  }

  .content-box {
    padding: 4vw;
    line-height: 2em;
    text-align: left;
    max-height: 50vh;
    font-size: 4.2vw;
    color: #040404;
    .sentence {
      margin-bottom: 3vw;
    }
    .works-info {
      text-align: right;
    }
  }
}
</style>