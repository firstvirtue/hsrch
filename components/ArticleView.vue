<template>
  <div class="blessay" data-invert>
    <article class="article">
      <span class="date">{{article.created_on.substring(0,10).replace(/-/gi, '.')}}</span>
      <template v-for="block in article.blocks">
        <p v-if="block.type === 'paragraph'" v-html="block.content_data.text" :key="block.id"></p>
        <h1 v-if="block.type === 'header' && block.content_data.level === 1" v-html="block.content_data.text" :key="block.id"></h1>
        <h3 v-if="block.type === 'header' && block.content_data.level === 2" v-html="block.content_data.text" :key="block.id"></h3>
        <figure v-if="block.type === 'image'" :key="block.id" :class="{'is-stretched': block.content_data.stretched}">
          <img :src="block.content_data.file.url">
          <figcaption v-if="block.content_data.caption">{{block.content_data.caption}}</figcaption>
        </figure>
        <hr v-if="block.type === 'delimiter'" :key="block.id">
        <blockquote v-if="block.type === 'quote'" :key="block.id">
          <p v-html="block.content_data.text"></p>
          <footer v-if="block.content_data.caption">{{block.content_data.caption}}</footer>
        </blockquote>
        <figure v-if="block.type === 'embed'" :key="block.id" class="video-wrapper">
          <iframe :src="block.content_data.embed" frameborder="0" allowfullscreen="1"></iframe>
          <figcaption v-if="block.content_data.caption">{{block.content_data.caption}}</figcaption>
        </figure>
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

  @mixin common {
    width: 90%;
    max-width: 630px;
    margin-left: auto;
    margin-right: auto;
    color: #343a40;
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
    font-size: 1.8rem;
    @include common;
  }

  figure {
    @include common;
    display: block;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;

    &.is-stretched {
      max-width: none;

      figcaption {
        @include common;
      }
    }

    img {
      width: 100%;
    }

    figcaption {
      margin-top: 0.4rem;
      text-align: center;
    }
  }

  blockquote {
    @include common;
    margin-top: 2em;
    margin-bottom: 5rem;
    width: 90%;

    p {
      margin: 0;
      width: 100%;
      color: 868e96;
      font-family: 'iropke', serif;
      font-size: 1.8rem;
    }

    footer {
      margin-top: 1em;
      color: #868e96;
      font-size: 1.6rem;
      text-align: center;
    }
  }

  hr {
    @include common;
    width: 35%;
    margin: 4rem auto 3.4rem;
    border: none;
    background-color: #e6e6e6;
  }

  figure.video-wrapper {
    position: relative;
    width: 100%;

    &::before {
      content: '';
      display: block;
      padding-bottom: 9 / 16 * 100%;
    }

    iframe {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    figcaption {
      position: absolute;
      width: 100%;
      bottom: -2em;
    }
  }

  @media (min-width: 540px) {
    line-height: 1.55;

    h1 {
      font-size: 4.6rem;
    }
    h3 {
      font-size: 2.8rem;
    }
    p {
      font-size: 2.0rem;
    }
    figure {
      &.is-stretched {
        margin-top: 6rem;
        margin-bottom: 5.2rem;
      }
    }
    hr {
      margin: 6rem auto;
      width: 25%;
      max-width: 220px;
    }
    blockquote {
      p {
        font-size: 2.6rem;
      }
    }
  }
}
</style>
