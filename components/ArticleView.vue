<template>
  <div class="blessay" data-invert>
    <article class="article">
      <span class="date">{{article.created_on.substring(0,10).replace(/-/gi, '.')}}</span>
      <template v-for="block in article.blocks">
        <p v-if="block.type === 'paragraph'" v-html="block.content_data.text" :key="block.id">{{block.content_data.text}}</p>
        <h1 v-if="block.type === 'header' && block.content_data.level === 1" :key="block.id">{{block.content_data.text}}</h1>
        <h3 v-if="block.type === 'header' && block.content_data.level === 2" :key="block.id">{{block.content_data.text}}</h3>
        <img v-if="block.type === 'image'" :key="block.id" :src="block.content_data.file.url" :alt="block.content_data.caption" :class="{'is-stretched': block.content_data.stretched}">
        <hr v-if="block.type === 'delimiter'" :key="block.id">
        <blockquote v-if="block.type === 'quote'" :key="block.id" v-html="block.content_data.text">{{block.content_data.text}}</blockquote>
      </template>
    </article>
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
  }
}
</script>

<style lang="scss" scoped>
.blessay {
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  word-break: keep-all;
  word-wrap: break-word;

  *:last-child {
    margin-bottom: 5rem;
  }

  @mixin common {
    width: 90%;
    max-width: 630px;
    margin-left: auto;
    margin-right: auto;
  }

  .date {
    display: block;
    margin-top: 5rem;
    color: #868e96;
    font-family: 'Myriad', sans-serif;
    font-size: 20px;
    font-weight: bold;
    @include common;

    & + h1 {
      margin-top: 0.5em;
    }
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
    font-size: 22px;
    line-height: 1.3;
    font-weight: bold;
    @include common;
  }

  p {
    margin-top: 1em;
    margin-bottom: 1.3em;
    @include common;
  }

  img {
    @include common;
    display: block;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;

    &.is-stretched {
      max-width: none;
    }
  }

  blockquote {
    @include common;
    margin-top: 1.3em;
    margin-bottom: 1.3em;
    color: 868e96;
    font-size: 2.4rem;
  }

  hr {
    @include common;
    margin: 4rem auto 3.4rem;
    border: none;
    background-color: #f0f0f0;
  }

  @media (min-width: 500px) {
    line-height: 1.55;

    h1 {
      font-size: 46px;
    }
    h3 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
    img {
      &.is-stretched {
        margin-top: 6rem;
        margin-bottom: 5.2rem;
      }
    }
    hr {
      margin: 6rem auto;
    }
  }
}
</style>
