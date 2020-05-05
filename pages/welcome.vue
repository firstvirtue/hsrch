<template>
  <main class="main">
    <div class="welcome" data-invert>
      <!-- <section class="section section--cover"> -->
        <div class="wrapper wrapper--m-p">
          <div class="cover">
            <h1 class="welcome__title">소개합니다</h1>
            <div class="welcome__desc">
              하나님을 경외하고<br>
              사람을 사랑하는 교회
            </div>
          </div>
        </div>
      <!-- </section> -->

      <section class="section section--feature">
        <h2 class="a11y">교회 특징</h2>
        <div class="wrapper wrapper--m-p">
          <div class="feature__wrap">
            <figure>
              <video src="~/assets/video/prayfor.mp4" playsinline loop autoplay muted></video>
              <!-- <ficaption>성도를 위한 담임목사 기도</ficaption> -->
            </figure>
            <figure>
              <img src="~/assets/image/welcome/friends.jpeg" alt="">
              <!-- <ficaption>서울숲 청년 교제</ficaption> -->
            </figure>
            <figure>
              <img src="~/assets/image/welcome/bowling.jpeg" alt="">
              <!-- <ficaption>주일 오후 청년 교제</ficaption> -->
            </figure>
            <figure>
              <video src="~/assets/video/harmonica.mp4" playsinline loop autoplay muted></video>
              <!-- <ficaption>하모니카 찬양단</ficaption> -->
            </figure>
          </div>
        </div>
      </section>

      <section class="section section--staff">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">섬기는 사람들</h2>
          <ul class="staff-list">
            <li v-for="item in staff" v-bind:key="item.name">
              <div class="staff">
                <div class="img-wrap">
                  <img :src="item.pic" alt="">
                </div>
                <div class="summary">
                  <span>{{item.name}}</span>
                  <small>{{item.summary}}</small>
                  <div v-if="item.desc" class="mission">
                    {{item.desc}}
                  </div>
                </div>
              </div>
              <div v-if="item.comment" class="comment" :class="{'is-open': isOpen}">
                <h3>담임목사 메시지</h3>
                <div class="comment__wrapper">
                  <p v-html="item.comment">{{item.comment}}</p>
                </div>
                <div class="func">
                  <button class="comment__more" @click="onComment"><span>더 보기</span></button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="section section--worship">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">예배 안내</h2>
        </div>
          <div class="worship-guide">
            <video class="bg" src="~/assets/video/worship-guide.mp4" playinlines loop autoplay muted></video>
            <div class="dimmed" role="presentation"></div>
            <div class="worship-guide__container">
              <table class="worship-guide__table">
                <!-- <caption>예배 시간</caption> -->
                <thead>
                  <tr>
                    <th>예배</th>
                    <th>시간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>주일예배</td>
                    <td>1부 오전 9:00</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>2부 오전 11:00</td>
                  </tr>
                  <tr>
                    <td>찬양예배</td>
                    <td>오후 2:00</td>
                  </tr>
                  <tr>
                    <td>수요예배</td>
                    <td>오전 11:00</td>
                  </tr>
                  <tr class="bordered">
                    <td>새벽예배</td>
                    <td>(월-토) 오전 5:30</td>
                  </tr>
                  <tr>
                    <td>어린이교회</td>
                    <td>오전 11:00</td>
                  </tr>
                  <tr>
                    <td>청소년교회</td>
                    <td>오전 11:00</td>
                  </tr>
                  <tr>
                    <td>청년교회</td>
                    <td>오후 12:50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </section>

      <section class="section section--location">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">오시는 길</h2>
          <div class="location">
            <div class="cont">
              <div class="cont__top">
                04773<br>
                서울 성동구 뚝섬로 312<br>
                한진타운아파트 상가<br>
                대한예수교 장로회 한사랑교회
              </div>
              <div class="cont__bottom">
                전화. <a href="tel:024995262"><span>02.499.5262</span></a><br>
                팩스. <a href="tel:0234093044"><span>02.3409.3044</span></a><br>
                목사관. <a href="tel:024617939"><span>02.461.7939</span></a>
              </div>
            </div>
            <div class="map-container" id="map-container" style="height: 40vh;">
            </div>
          </div>
        </div>
      </section>

    </div>

  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_welcome.scss"></style>

<script>
export default {
  mounted() {

    // TODO: resize event
    document.querySelector('.cover').style.height = window.innerHeight + 'px';

    var container = document.getElementById('map-container'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.54124699815597, 127.04562849894883), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // map.setDraggable(false);
    // map.setZoomable(false);
    var imageSrc = '/ri.png', // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
      imageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.54124699815597, 127.04562849894883); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  },
  data() {
    return {
      staff: [
        {
          name: '이명덕',
          summary: '담임목사',
          pic: require('~/assets/image/welcome/dsc00213.jpeg'),
          comment: '한사랑 교회가 세상에 희망을 주는 하나님께서 기뻐하시는 교회로 거듭나기를 기도합니다.<br> 다음세대를 성경적 가치관 세계관으로 세우는 것이 하나님 나라의 건설과 확장에 가장 빠른 길이라고 믿습니다.<br><hr> 저희 교회는 다음 세대를 세우기 위하여 414생활관을 운영하고 있습니다. 가난한 집의 자녀나 부잣집의 자녀나 똑같이 교육의 기회는 제공받아야 하는데 이 사회는 그렇지 못한 구조적인 모순을 지니고 있 습니다. 서민들도 기회를 제공받아야 하겠기에 만든 제도가 바로 414생활관입니다. 기울어진 운동장에서 출발하는 것은 모순입니다. 작게나마 기회를 제공하기 위하여 배움과 훈련의 장을 마련했습니다.<br> 말씀과 기도로 영성을, 공동체생활로 인성을, 자기주도학습을 통해 지성을 계발하여 4차 산업시대에 합당한 전인적으로 건강한 인재 양육하는 일에 교회가 힘을 기울이고 있습니다.<br> 다음 세대 신앙전수의 요람이 되는 가정과 교회가 되기 위해 최선을 다하도록 하겠습니다.<br><hr> 예배와 공동체와 성화와 섬김과 복음전파가 한사랑교회가 지향하는 목적입니다.<br> “하나님을 사랑하고 이웃을 사랑하라”는 가장 위대한 계명을 실천함으로 세상에 하나님의 은혜와 복을 전달하는 강소 교회 되기를 소망합니다.'
        },
        {
          name: '이세라',
          summary: '교육전도사',
          desc: '청년교회/청소년교회',
          pic: require('~/assets/image/welcome/dsc00207.jpeg')
        },
        {
          name: '이희준',
          summary: '교육전도사',
          desc: '어린이교회/414생활관',
          pic: require('~/assets/image/welcome/dsc00199.jpeg')
        }
      ],
      isOpen: false
    }
  },
  methods: {
    onComment() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
