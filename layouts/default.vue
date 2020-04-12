<template>
  <div>
    <Header/>
    <div class="smooth-scroll">
      <nuxt/>
      <footer class="footer">
        <div class="l-footer">
          <p>© 2020 hansarang church.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Header from '~/components/header.vue';
import SmoothScroll from '~/assets/js/module/smooth-scroll.js';

export default {
  components: {
    Header
  },
  mounted() {

    if(! window.Browser.isMobileAndTablet && ! window.Browser.isIE) {
      const smoothScroll = new SmoothScroll($('.smooth-scroll'));
    }
  }
}
</script>
