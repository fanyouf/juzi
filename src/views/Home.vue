<template>
    <div class="home">
        <header><h1>日拱一卒</h1></header> 
        <div class="slide-inner">
            <div class="cover-photo-box">
              <img class="cover-photo" :src="imgUrl" alt="" />
              <ul class="old-calendar">
                <li>{{ oldYear }}</li>
                <li>{{ oldMonth }}</li>
                <li>{{ oldDay }}</li>
              </ul>
              <span class="huge-day">{{ newDay }}</span>
            </div>
            <div class="date-box">
              <span class="huge-day">{{ newDay }}</span>
              <span class="date">{{ newYear }}.{{ newMonth }}.{{ newDay }} {{ ncWeek }}</span>
            </div>
            <div class="content-box">
              <p class="sentence">{{ curWord.w }}</p>
              <p class="works-info" v-if="curWord.author">
                {{ curWord.author  }}
              </p>
            </div>
        </div>
        <footer >
            ---------------@凡人进阶----------------
        </footer>
    </div>
</template>

<script setup>
import {computed, onMounted, ref } from 'vue'
import { getWord } from '../api/index'
import calendarFormatter from '../utils/calendarFormatter'
const dt = new Date()

let nongli = calendarFormatter.solar2lunar(dt.getFullYear(), dt.getMonth()+1, dt.getDate());

console.log(nongli)
const oldYear = nongli.gzYear+nongli.Animal + '年'
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
onMounted(()=>{
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
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  .main {
    width: 100vw;
    height: calc(100vh - 15vw);
  }
  header {
    padding: 1em;
    line-height: 20px;
    height: 20px;
    h1{
        font-size: 18px;
        font-weight: normal;
        color: #555;
    }
  }
  footer {
    font-size:12px;
    color:#ccc;position: fixed; bottom: 0px; width: 100%;height: 50px; line-height: 50px; text-align: center;}
  .home-nav{
    width: 100vw;
    height: 15vw;
  }

  .cover-photo-box {
      width: 100vw;
      height: 38vh;
      overflow: hidden;
      position: relative;
      .cover-photo {
        position: absolute;
        width: auto;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
      .old-calendar {
        position: absolute;
        z-index: 1;
        top: 5%;
        right: 5%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        writing-mode: tb-rl;
        li{
          font-size: 3.5vw;
          letter-spacing: 1vw;
          color: #fff;
          border-left: 1px solid rgba(255, 255, 255, 0.5);
          text-align: left;
          margin: 0 1vw;
        }
      }
      .huge-day {
        position: absolute;
        left: 4%;
        bottom: -25%;
        letter-spacing: -1vw;
        z-index: 1;
        font-size: 33vw;
        font-weight: 500;
        color: #fff;
      }
    }
    .date-box {
      width: 100%;
      box-sizing: border-box;
      padding: 2vw 4vw;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      .huge-day{
        font-size: 33vw;
        font-weight: 500;
        letter-spacing: -1vw;
        color: #010101;
        position: absolute;
        top: -370%;
        left: 4%;
      }
      .date {
        font-size: 3vw;
        color: #010101;
      }
    }
    .content-box {
      position: absolute;
      top: 65%;
      line-height: 30px;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      width: 92%;
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