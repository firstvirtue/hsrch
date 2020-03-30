<template>
  <main class="main">
    <header class="cover" data-cover>
      <!-- <div class="video-wrapper visual" data-d-src="/video/main.mp4" data-d-poster-src="/image/cover-bg.jpg"></div> -->
      <video class="video-wrapper"
        autoplay playsinline muted loop
        poster="/image/cover-bg.jpg">
        <source src="/video/main.mp4" type="video/mp4">
      </video>
      <div class="dimmed" role="presentation"></div>
      <div class="cont">
        <h1 class="title">
          a light has dawned
        </h1>
        <span class="btn btn--discover" lang="ko">올 봄 등장!</span>
      </div>
    </header>

    <div class="container">
      <div class="wrapper">
        <section class="worship" data-invert>
          <div class="sermon reveal">
            <h2 class="head">sunday sermon</h2>
            <div v-swiper:swiperS="swiperOptionSermons" class="">
              <ul class="swiper-wrapper sermon-list">
                <li class="swiper-slide sermon-item" v-for="item in sermons" :key="item.videoId">
                  <a href="#" @click="onSermon">
                    <div class="img-wrap">
                      <img src="@/assets/image/main/sermon-01.jpg" alt="">
                    </div>
                    <div class="cont">
                      <h3 class="tit">{{item.title}}</h3>
                      <p class="desc">{{item.description}}</p>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="swiper-pagination"></div>
            </div>
            <div class="sermon-current">
              <h3 class="tit reveal">{{sermonCurrent.title}}</h3>
              <p class="desc reveal">{{sermonCurrent.description}}</p>
            </div>
          </div>
          <div class="praise reveal">
            <h2 class="head">sunday praise</h2>
            <a href="#" @click="onPraise">
              <div class="praise-item">
                <div class="img-wrap">
                  <img src="@/assets/image/main/praise-01.jpg" alt="">
                </div>
                <div class="cont">
                  <h3 class="tit reveal">내가 너를 사랑함이라</h3>
                  <p class="desc reveal">임마누엘 찬양대</p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
      <section class="counsel">
        <div class="dimmed" role="presentation"></div>
        <h2 class="a11y">신앙상담</h2>
        <strong class="reveal">love in jesus christ</strong>
        <!-- <a href="#" class="btn btn--discover" lang="ko">신앙상담</a> -->
        <a href="#" class="btn btn--discover reveal">discover</a>
      </section>

      <div class="wrapper">
        <section class="logos" data-invert>
          <h2 class="a11y">주제말씀</h2>
          <p class="reveal">
            또 네가 많은 증인 앞에서 내게 들은 바를 충성된 사람들에게 부탁하라. 그들이 또 다른 사람들을 가르칠 수 있으리라
          </p>
          <span class="reveal">디모데후서 2장 2절</span>
        </section>
        <section class="community" data-invert>
          <h2 class="a11y">커뮤니티</h2>
          <strong class="reveal">there's more to explore</strong>
          <div v-swiper:swiperC="swiperOptionNews" class="reveal">
            <ul class="swiper-wrapper news disabled">
              <li class="swiper-slide item reveal-comm" :data-delay="index * 0.15" v-for="(item, index) in news" :key="item.id">
                <a href="#">
                  <div class="img-wrap">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <div class="cont">
                    <span class="category">{{item.category}}</span>
                    <h3 class="tit">{{item.tit}}</h3>
                    <p class="desc">
                      {{item.desc}}
                    </p>
                    <span class="date">{{item.date}}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="func">
            <a href="/community" class="btn btn--discover btn--invert">view more</a>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_main.scss"></style>

<script>
import { fromEvent, merge } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import VideoWrapper from '~/assets/js/module/video-wrapper.js';
import YoutubeLayer from '~/assets/js/module/youtube-layer.js';
import Reveal from '~/assets/js/module/reveal.js';
import YoutubeDataProvider from '~/assets/js/module/youtube-data-provider.js';
import Objectfit from '~/assets/js/module/objectfit.js';


export default {
  components: {

  },
  data() {
    return {
      sermons: [
        {
          videoId: '-mf8GYOtZSM',
          title: '하나님 나라 비전',
          description: '마태복음 13장 10-20절'
        },
        {
          videoId: 'EvwUFnwoDOE',
          title: '힐링(Healing)',
          description: '출애굽기 1장 1-2절'
        },
        {
          title: '사랑의 길',
          description: '요한일서 4장 8절'
        }
      ],
      sermonCurrent: {
        title: '',
        description: '',
        videoId: ''
      },
      praiseCurrent: {
        title: '',
        description: '',
        videoId: ''
      },
      news: [
        {
          id: 0,
          imgSrc: require('~/assets/image/main/community-01.jpg'),
          category: '신앙칼럼',
          tit: '하나님께서는 저를 왜 사랑하시나요?',
          desc: '하나님이 가라사대 우리의 형상을 따라 우리의 모양대로',
          date: '2019.07.21'
        },
        {
          id: 1,
          imgSrc: require('~/assets/image/main/community-02.png'),
          category: '청년부',
          tit: '가망이 없다는 그 영화 어벤져스 관람기',
          desc: '안녕하세요. 청년교회는 지난 27일 토요일에 건대 롯데시네마에 아침부터 모여 앤드게임 영화를 같이 보는 시간을',
          date: '2019.07.21'
        },
        {
          id: 2,
          imgSrc: require('@/assets/image/main/community-03.png'),
          category: '청년부',
          tit: '가정 식사 모임',
          desc: '비정기적으로 돌아가며 집에서 초청하는 청년부, 이번 주는 이상오 형제의 가정에서 식사 모임을 가지며',
          date: '2019.07.21'
        },
        {
          id: 3,
          imgSrc: require('~/assets/image/main/community-04.png'),
          category: '청년부',
          tit: '어버이주일 청년부 중식 준비',
          desc: '청년부는 어버이주일을 맞이하여 특별히 점심식사를 담당했습니다',
          date: '2019.07.21'
        }
      ],
      swiperOptionSermons: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        clickable: true,
        speed: 600,
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          tap() {
            console.log('onTap', this);
          }
        }
      },
      swiperOptionNews: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        on: {
          slideChange() {
            console.log('onSlideChangeEnd', this);
          },
          tap() {
            console.log('onTap', this);
          }
        }
      }
    }
  },
  mounted() {
    window.dispatchEvent(new CustomEvent('scroll'));

    this.getApiData();
    this.setMotion();

    this.youtubeLayer = new YoutubeLayer();

    this.swiperS.on('slideChange', () => {
      this.updateSermonIndex();
    });

    const windowResize$ = fromEvent(window, 'resize');

    this.windowResize = windowResize$
    .pipe(
      map(() => {
        return window.innerWidth < 720 ? true : false
      }),
      distinctUntilChanged()
    )
    .subscribe((isMobile) => {
      this.updateCommunityLayout(isMobile);

      if(isMobile) {
        document.querySelector('.cover').style.height = window.innerHeight + 'px';
      } else {
        document.querySelector('.cover').style.height = '';
      }
    });

    window.dispatchEvent(new CustomEvent('resize'));
    // this.updateCommunityLayout(window.innerWidth < 720 ? true : false);
    // document.querySelector('.cover').style.height = window.innerHeight;

    const video = new VideoWrapper();
    video.init({ oncomplete: () => {
      const objectfit = new Objectfit();
      objectfit.init();
    }});

  },
  beforeDestroy() {
    if(this.windowResize) this.windowResize.unsubscribe();
  },
  methods: {
    async getApiData() {
      const youtubeDataProvider = new YoutubeDataProvider();
      try {
        await youtubeDataProvider.get({
          maxResults: 3,
          part: 'snippet, contentDetails',
          playlistId: 'PLsNXvRSsZOc1fJl5QoRbK11-Z53PKjAle'
        }).then(res => {

          this.sermons = res.items;
          this.updateSermonIndex();
        });

      } catch (e) {
        console.log(`ERROR: ${e}`);
      }

      try {
        await youtubeDataProvider.get({
          maxResults: 1,
          part: 'snippet, contentDetails',
          playlistId: 'PLsNXvRSsZOc0Y6WPKGXXUUHjxwjTOekNL'
        }).then(res => {

          this.praiseCurrent = res.items[0];
        });

      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    },
    updateSermonIndex() {
      if(this.swiperS !== undefined) {
        this.sermonCurrent = this.sermons[this.swiperS.activeIndex];
      }

      const curSermon = document.querySelector('.sermon-current');
      curSermon.classList.remove('is-animated');
      void curSermon.offsetWidth;
      curSermon.classList.add('is-animated');
    },
    updateCommunityLayout(isMobile) {
      if(isMobile) {
        $('.community .swiper-wrapper').removeClass('disabled');
      } else {
        $('.community .swiper-wrapper').addClass('disabled');
      }
    },
    onSermon(e) {
      this.youtubeLayer.open(this.sermonCurrent.videoId);

      e.preventDefault();
      e.stopPropagation();
    },
    onPraise(e) {
      this.youtubeLayer.open(this.praiseCurrent.videoId);

      e.preventDefault();
      e.stopPropagation();
    },
    setMotion() {
      new Reveal('.sermon', {
        threshold: 0.3
      }, () => {
        this.updateSermonIndex();
      });
      new Reveal('.praise', {
        threshold: 0.3
      });

      new Reveal('.reveal');

      if(! window.Browser.isMobileAndTablet) {
        new Reveal('.reveal-comm');
      }
    }
  }
}
</script>

<style>
.container {

}
</style>
