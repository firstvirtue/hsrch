<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper">
        <div class="func align-right">
          <button class="btn btn--invert" @click="onSave">저장하기</button>
          <button class="btn btn--invert" @click="$router.back()">취소</button>
        </div>

        <!-- <div class="wrapper wrapper__post"> -->

          <article class="article">
            <h2 contenteditable="true" class="h2 article__title">
              {{articleTitle}}
            </h2>

            <div id="container"></div>
          </article>
        <!-- </div> -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
import Editor from '~/assets/js/module/editor.js';

export default {
  mounted() {
    this.editor = new Editor('container');
  },
  data() {
    return {
      articleTitle: ''
    }
  },
  methods: {
    onSave() {
      console.log(this.$auth);
      // this.editor.save()
    }
  }
}
</script>
