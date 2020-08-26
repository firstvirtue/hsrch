<template>
  <div class="blessay">
    <ul class="blessay__list">
      <li class="blessay__item" v-for="item in articles" v-bind:key="item.id">
        <a :href="`${baseViewPath}${item.id}`">
          <div class="cont">
            <div class="cont__wrapper">
              <h3 class="tit" v-html="item.title"></h3>
              <p class="desc" v-html="item.description"></p>
            </div>
            <span class="date">{{item.created_on.substring(0,10).replace(/-/gi, '.')}}</span>
          </div>
        </a>

        <template v-if="$auth !== undefined">
          <div class="func" :class="{'is-active': item.isActive}">
            <button @click="onUtil(item)" class="func__opener">
              <span class="a11y">유틸</span>
            </button>
            <div v-show="item.isActive" class="func__layer">
              <a :href="`/post/write?id=${item.id}`" class="func__btn">수정하기</a>
              <button class="func__btn" @click="onDelete(item)">삭제하기</button>
            </div>
          </div>
        </template>
      </li>
    </ul>
    <template v-if="articles && articles.length === 0">
      <div class="notice-recommend">
        <a href="/post/write">새로운 글을 작성해 보세요!</a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    articlesProp: Array,
    baseViewPathProp: String,
    onUtilCallback: Function,
    onDeleteCallback: Function
  },
  data() {
    return {
      articles: this.articlesProp,
      baseViewPath: this.baseViewPathProp
    };
  },
  methods: {
    onUtil(item) {
      this.onUtilCallback && this.onUtilCallback(item);
    },
    onDelete(item) {
      this.onDeleteCallback && this.onDeleteCallback(item);
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  display: block;
  color: #666666;
  text-decoration: none;
  text-align: left;
}

ul {
  margin: 0;
  padding: 0;
}

.notice-recommend {
  a {
    display: block;
    // color: $gray3;
    color: #b3b3b3;
    font-size: 32px;
    padding: 20rem 0;
    text-align: center;
    align-self: center;
    word-break: keep-all;
    word-wrap: break-word;
  }
}

.blessay {
  font-family: "Noto Sans KR", sans-serif;
  word-break: keep-all;
  word-wrap: break-word;

  &__list {
    max-width: 700px;
    margin: 0 auto;
    padding-left: 6%;
    padding-right: 6%;
    box-sizing: border-box;
  }
  &__item {
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    padding-right: 2em;

    &:last-child {
      border-bottom: none;
    }

    a {
      display: block;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .func {
    position: relative;

    &__opener {
      // color: $gray6;
      color: #666666;
      font-size: 13px;
      @include icon(arrow) {
        transform: rotateZ(90deg);
        transition: transform 0.2s;
      }
    }

    &__btn {
      padding: 0.35em 0;
      // color: $gray6;
      color: #666666;
      font-size: 15px;
    }

    &__layer {
      position: absolute;
      right: 0;
      top: 3rem;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      padding: 1rem 2rem;
      background-color: #ffffff;
    }
  }
  .tit {
    margin-bottom: 0.5em;
    color: #343a40;
    font-size: 24px;
    font-weight: bold;
  }
  .desc {
    margin: 0;
    color: #495057;
  }
  .date {
    font-size: 13px;
    letter-spacing: 0.05em;
    color: #868e96;
    font-weight: bold;
  }
  .func {
    position: absolute;
    top: 20px;
    right: 10px;
  }

  @media (min-width: 540px) {
    &__list {
      margin: 0 auto;
      padding-left: 4rem;
      padding-right: 4rem;
    }
    &__item {
      a {
        padding: 50px 0;
      }
    }
    .tit {
      font-size: 42px;
    }
    .desc {
      margin-bottom: 0.3em;
      font-size: 18px;
    }
    .date {
      font-size: 13px;
    }
    .func {
      top: 60px;
    }
  }
}
</style>
