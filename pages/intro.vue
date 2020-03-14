<template>
  <main class="main">
    <div class="intro" data-invert>
      <div class="l-wrap">
        <h1 class="title">소개합니다</h1>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="slogan">
          하나님을 경외하고<br>
          사람을 사랑하는 교회
        </div>
        <div id="container"></div>
      </div>

    </div>

  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_intro.scss"></style>

<script>
// import EditorJS from '@editorjs/editorjs';
import Editor from '~/assets/js/module/editor.js';

export default {
  mounted() {
    const editor = new Editor('container');
  }
}
</script>
