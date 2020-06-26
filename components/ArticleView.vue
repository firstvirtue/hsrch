<template>
  <div class="blessay" data-invert>
    <!-- <div class="wrapper"> -->
      <article class="article">
        <template v-for="block in article.blocks">
          <p v-if="block.type === 'paragraph'" v-html="block.content" :key="block.id"></p>
          <h1 v-if="block.type === 'header' && block.optional === '1'" :key="block.id">{{block.content}}</h1>
          <h3 v-if="block.type === 'header' && block.optional === '2'" :key="block.id">{{block.content}}</h3>
          <img v-else-if="block.type === 'image'" :key="block.id" :src="block.content" :alt="block.optional">
        </template>
      </article>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    articleProp: Object
  },
  data() {
    return {
      articleId: this.articleIdProp,
      article: this.articleProp
    }
  },
  async mounted() {
    console.log(this.articleIdProp)
    // await this.$axios.get(`/api/posts/read/${this.articleId}`)
    //   .then(res => {
    //     console.log(res.data);
    //     // this.articles = res.data;
    //     this.article = res.data;
    //   })
    //   .catch(err => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
.blessay {

  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.5;

  @mixin common {
    width: 90%;
    max-width: 630px;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 30px;
    line-height: 1.3;
    font-weight: bold;
    @include common;
  }

  h3 {
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 28px;
    line-height: 1.3;
    font-weight: bold;
    @include common;
  }

  p {
    margin-top: 1em;
    margin-bottom: 1.3em;
    font-size: 18px;
    @include common;
  }

  img {
    width: 100%;
  }

  @media (min-width: 500px) {
    line-height: 1.55;

    h1 {
      font-size: 46px;
    }
    h3 {
      font-size: 34px;
    }
    p {
      font-size: 20px;
    }
  }
}
</style>
