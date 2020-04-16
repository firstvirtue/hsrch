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
      </section>

      <section class="section section--religious-worker">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">섬기는 사람들</h2>
          <ul>
            <li>
              <img src="~/assets/image/welcome/DSC00213.jpeg" alt="">
            </li>
            <li>
              <img src="~/assets/image/welcome/DSC00207.jpeg" alt="">
            </li>
            <li>
              <img src="~/assets/image/welcome/DSC00215.jpeg" alt="">
            </li>
          </ul>
        </div>
      </section>

      <section class="section section--worship">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">예배 안내</h2>
          <table>
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
              <tr>
                <td>새벽예배</td>
                <td>(월-토) 오전 5:30</td>
              </tr>
              <tr class="bordered">
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
      </section>

      <section class="section section--location">
        <div class="wrapper wrapper--m-p">
          <h2 class="section__title">오시는 길</h2>
          <div class="cont">
            04773<br>
            서울 성동구 뚝섬로 312<br>
            한진타운아파트 상가<br>
            전화. 02.499.5262<br>
            팩스. 02.3409.3044<br>
            목사관. 02.461.7939
          </div>
          <div class="map-container" id="map-container" style="height: 40vh;">
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
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // map.setDraggable(false);
    // map.setZoomable(false);
  }
}
</script>
