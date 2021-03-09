<template>
  <div>
    <Header/>
    <div class="smooth-scroll">
      <nuxt/>
      <footer class="footer">
        <div class="l-footer">
          <p>© 2021 hansarang church.</p>
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
      const smoothScroll = new SmoothScroll(
        $('.smooth-scroll'),
        this.$router.currentRoute.name === 'index' ? '100vh' : null
      );
    }
  },
  watch: {
    $route: async function() {
      // [TODO] router로 네비게이션 하지 않아 이 메서드가 타지 않음.
    }
  }
}
</script>
