<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper wrapper__post">
      <div class="func">

      </div>

      <h2 contenteditable="true">
        제목
      </h2>

      <div id="container"></div>
    </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
import Editor from '~/assets/js/module/editor.js';

export default {
  mounted() {
    const editor = new Editor('container');
  }
}
</script>
