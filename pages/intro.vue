<template>
  <main class="main">
    <div class="intro" data-invert>
      <section class="section section--cover">
        <div class="wrapper wrapper--m-p">
          <h1 class="intro__title">소개합니다</h1>

          <!-- <img src="" alt="">
          <video src=""></video> -->

          <div class="cover-desc">
            하나님을 경외하고<br>
            사람을 사랑하는 교회
          </div>
        </div>
      </section>

      <section class="section section--worship">
        <div class="wrapper wrapper--m-p">
          <h2>예배 안내</h2>
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
          <h2>교회 위치</h2>
          <div class="cont">
            04773<br>
            서울 성동구 뚝섬로 312<br>
            한진타운아파트 상가<br>
            전화. 02.499.5262<br>
            팩스. 02.3409.3044<br>
            목사관. 02.461.7939
          </div>
          <div class="map-container" id="map-container">

          </div>
        </div>
      </section>

      <section class="section section--feature">

      </section>

      <section class="section section--religious-worker">

      </section>

    </div>

  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_intro.scss"></style>

<script>
export default {
  mounted() {

  }
}
</script>
