<template>
  <div class="live" v-if="live">
    <a :href="videoId" class="live__link">
      <div class="live__motion"></div>
      <img class="live__logo" src="https://camo.githubusercontent.com/d54e97f5edde790381f7e62b217410df33e066a0dc8f692f2fc6b25fc1768b0c/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f796f75747562652e737667" alt="">

      <div class="live__noti">
        지금 예배가 실시간<br> 스트리밍되고 있습니다!
      </div>
    </a>
  </div>
</template>

<script>
import YoutubeDataProvider from '~/assets/js/module/youtube-data-provider.js';
export default {
  async mounted() {
    const youtubeDataProvider = new YoutubeDataProvider();
    const videoId = await youtubeDataProvider.getLive();
    console.log('ID:: ', videoId);
    if(videoId) {
      this.videoId = videoId;
      this.live = true;
    }
  },
  data() {
    return {
      live: false,
      videoId: '#',
    }
  }
}
</script>

<style lang="scss">
  .live {
    position: absolute;
    bottom: 40px;
    right: 30px;

    &__link {
      display: flex;
      align-items: center;
    }

    &__logo {
      width: 34px;
      height: 34px;
    }

    &__motion {
      position: absolute;
      width: 30px;
      height: 30px;
    }

    &__noti {
      margin-left: 1rem;
      color: #ffffff;
      font-size: 14px;
    }


  }
</style>
