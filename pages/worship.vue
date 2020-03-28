<template lang="html">
  <main class="main">

    <div class="list" data-invert>
      <!-- <div class="wrapper"> -->
        <h1 class="h2 title">설교와 찬양</h1>

        <ul class="nav">
          <li v-for="item in navList" :key="item.id">
            <h2>
              <a :href="item.id" :data-id="item.id" @click="getList">
                {{item.title}}
                <span class="bar"></span>
              </a>
            </h2>
          </li>
        </ul>

        <ul class="items items--list">
          <li v-for="(item) in items" :key="item.videoId">
            <a :href="item.videoId" @click="onVideo(item.videoId, $event)">
              <div class="wrapper">
                <div class="img-wrap">
                  <img :src="item.thumbnail" alt="">
                </div>
                <div class="cont">
                  <div class="cont__wrapper">
                    <h3 class="tit">{{item.title}}</h3>
                    <p class="desc">{{item.description}}</p>
                  </div>
                  <span class="date">{{item.publishedAt}}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      <!-- </div> -->

      <div class="create-bar"></div>

    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_list.scss"></style>

<script>

import YoutubeDataProvider from '~/assets/js/module/youtube-data-provider.js';
import YoutubeLayer from '~/assets/js/module/youtube-layer.js';

export default {
  async mounted() {

    this.youtubeLayer = new YoutubeLayer();

    this.getSermons();
    // this.getPraises();

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          console.log('intersect');
          this.getDatas();
        }
      })
    }, {
      // threshold: options.threshold
    });

    io.observe(document.querySelector('.create-bar'));

  },
  data() {
    return {
      navList: [
        {
          id: '#sermonSunday',
          title: '주일예배'
        },
        {
          id: '#praise',
          title: '찬양'
        }
      ],
      items: [],
    }
  },
  methods: {
    getList(e) {

      if(e.target.getAttribute('href') === '#sermonSunday') {
        this.getSermons();
      } else if (e.target.getAttribute('href') === '#praise') {
        this.getPraises();
      }

      e.preventDefault();
    },
    async getSermons() {

      document.querySelectorAll('.nav li a').forEach(function(el) {
        el.classList.remove('is-active');
      });
      document.querySelector('.nav li a[data-id="#sermonSunday"]').classList.add('is-active');

      const youtubeDataProvider = new YoutubeDataProvider();
      this.playlistId = 'PLsNXvRSsZOc1fJl5QoRbK11-Z53PKjAle';

      this.items = [];

      try {
        await youtubeDataProvider.get({
          maxResults: 10,
          part: 'snippet, contentDetails',
          playlistId: 'PLsNXvRSsZOc1fJl5QoRbK11-Z53PKjAle'
        }).then(res => {

          this.items = res.items;
          this.nextPageToken = res.nextPageToken;
        });

        console.log('end');

      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    },
    async getPraises() {
      document.querySelectorAll('.nav li a').forEach(function(el) {
        el.classList.remove('is-active');
      });
      document.querySelector('.nav li a[data-id="#praise"]').classList.add('is-active');

      const youtubeDataProvider = new YoutubeDataProvider();

      this.playlistId = 'PLsNXvRSsZOc0Y6WPKGXXUUHjxwjTOekNL';

      this.items = [];

      try {
        await youtubeDataProvider.get({
          maxResults: 10,
          part: 'snippet, contentDetails',
          playlistId: 'PLsNXvRSsZOc0Y6WPKGXXUUHjxwjTOekNL'
        }).then(res => {

          this.items = res.items;
          this.nextPageToken = res.nextPageToken;
        });

        console.log('end');

      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    },
    async getDatas() {
      if(this.nextPageToken === undefined) return;

      const youtubeDataProvider = new YoutubeDataProvider();

      try {
        await youtubeDataProvider.get({
          maxResults: 10,
          part: 'snippet, contentDetails',
          playlistId: this.playlistId,
          pageToken: this.nextPageToken
        }).then(res => {

          this.items = this.items.concat(res.items);
          this.nextPageToken = res.nextPageToken;

          console.log(this.nextPageToken);
        });

      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    },
    onVideo(videoId, e) {
      e.preventDefault();
      e.stopPropagation();

      console.log(videoId);
      this.youtubeLayer.open(videoId);
    }

  }
}
</script>

<style lang="css" scoped>
</style>
