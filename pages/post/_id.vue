<template>
  <main class="main">
    <v-app>
      <div class="blessay" data-invert>
        <div class="wrapper">
          <div class="func align-right" v-if="$auth.user && article && article.writer === $auth.user.profile.id">
            <a :href="`/post/write?id=${articleId}`" class="btn btn--sm btn--ghost btn--next">수정하기</a>
            <button class="btn btn--sm btn--ghost btn--cancel" @click="onDelete">삭제하기</button>
          </div>
        </div>
          <!-- <article class="article">
            <p v-for="block in article.blocks" :key="block.id">
              <template v-if="block.type === 'paragraph'">
                <p v-html="block.content"></p>
              </template>
              <template v-if="block.type === 'header'">
                <h1 v-if="block.optional === '1'">{{block.content}}</h1>
                <h2 v-if="block.optional === '2'">{{block.content}}</h2>
              </template>
              <template v-else-if="block.type === 'image'">
                <img :src="block.content" :alt="block.optional">
              </template>
              <template v-else-if="block.type === 'embed'">
                <div class="video-wrapper video-wrapper--youtube">
                  <iframe :src="block.content" frameborder="0"></iframe>
                </div>
              </template>
            </p>
          </article> -->
        <ArticleView v-if="article !== null" :articleProp="article"/>
      </div>

      <v-dialog
        v-model="dialog"
        max-width="290">
        <v-card>
          <v-card-title class="headline">삭제</v-card-title>

          <v-card-text>
            이야기를 삭제 하시겠습니까?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="execDelete">
              삭제
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              취소
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_community.scss"></style>

<script>
import ArticleView from '~/components/ArticleView';
export default {
  components: {
    ArticleView
  },
  mounted() {

    this.$axios.get(`/api/posts/read/${this.articleId}`)
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
      article: null,
      dialog: false
    }
  },
  methods: {
    onDelete() {
      this.dialog = true;
    },
    execDelete() {
      this.$axios.delete(`/api/posts/${this.articleId}`)
      .then(res => {
        this.dialog = false;
        this.$router.push(`/@${this.$auth.user.profile.id}`);
      })
      .catch(err => console.log(err));
    }
  },
  validate({ params }) {
    // return /^\d+$/.test(params.id);
    return params.id;
  }
};
</script>
