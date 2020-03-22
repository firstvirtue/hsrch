<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper">
        <div class="func align-right">
          <a :href="`/post/write?id=${articleId}`" class="btn btn--invert">수정하기</a>
          <button class="btn btn--invert" @click="onDelete">삭제하기</button>
        </div>
        <article class="article">
          <h1 class="h2 article__title">{{article.title}}</h1>

          <p v-for="block in article.blocks" :key="block.id">
            <template v-if="block.type === 'paragraph'">
              {{block.content}}
            </template>
            <template v-else-if="block.type === 'image'">
              <img :src="block.content" alt="">
            </template>
          </p>
        </article>
      </div>
    </div>
    <v-dialog/>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
export default {
  mounted() {

    this.$axios.get(`/api/posts/${this.articleId}`)
      .then(res => {
        console.log(res.data);
        // this.articles = res.data;
        this.article = res.data;
      })
      .catch(err => console.log(err));
  },
  asyncData({ params }) {
    return {
      articleId: params.id,
      article: {}
    }
  },
  methods: {
    onDelete() {
      // TODO: 삭제 하시겠습니까?
      this.$modal.show('dialog', {
        title: '삭제',
        text: '이야기를 삭제 하시겠습니까?',
        buttons: [
          {
            title: '삭제',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {
              this.$axios.delete(`/api/posts/${this.articleId}`)
              .then(res => {
                this.$router.push(`/@${this.$auth.user.profile.username}`);
              })
              .catch(err => console.log(err));
            }
          },
          {
            title: '취소'
          }
      ]
      });
    }
  },
  validate({ params }) {
    // return /^\d+$/.test(params.id);
    return params.id;
  }
};
</script>
