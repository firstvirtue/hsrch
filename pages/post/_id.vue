<template>
  <main class="main">
    <v-app>
      <div class="community" data-invert>
        <div class="wrapper wrapper--m-p">
          <div class="cmd" v-if="$auth.user && article && article.writer === $auth.user.profile.id">
            <a :href="`/post/write?id=${articleId}`" class="btn btn--sm btn--ghost btn--next">수정하기</a>
            <button class="btn btn--sm btn--ghost btn--cancel" @click="onDelete">삭제하기</button>
          </div>
        </div>
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
