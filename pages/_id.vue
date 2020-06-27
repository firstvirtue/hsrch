<template>
  <main class="main">
    <div class="community" data-invert>
      <div class="wrapper wrapper--m-p">
        <div class="cmd">
          <h1 class="title">@{{$auth.user.profile.username}} 님의 이야기</h1>
          <a href="/post/write" class="btn btn--sm btn--ghost btn--next">글 쓰기</a>
        </div>
      </div>
    </div>

    <v-app>
      <ArticleList v-if="articles !== null" :articlesProp="articles" :baseViewPathProp="baseViewPath"/>

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
import ArticleList from '~/components/ArticleList';

export default {
  components: {
    ArticleList
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(this.$auth);
  //   if (this.$auth.profile) next();
  //   next('/auth/login?returnPath=mypage');
  // },
  async mounted() {
    await this.$axios.get(`/api/posts/user/${this.$auth.user.profile.id}`)
      .then(res => {
        console.log(res);
        res.data.forEach(item => {
          item.isActive = false;
        });
        this.articles = res.data;
      })
      .catch(err => console.log(err));
  },
  asyncData({ params }) {
    console.log(params);
    return {
      articles: null,
      article: undefined,
      dialog: false,
      baseViewPath: './post/',
    }
  },
  methods: {
    onUtil(item) {
      item.isActive = !item.isActive;
    },
    onDelete(item) {
      item.isActive = false;

      this.article = item;
      this.dialog = true;
    },
    execDelete() {

      this.$axios.delete(`/api/posts/${this.article.id}`)
      .then(res => {
        // this.$router.push(`/@${this.$auth.user.profile.username}`);
        this.articles.splice(this.articles.findIndex(item => item.id === this.article.id), 1);
        this.dialog = false;
      })
      .catch(err => console.log(err))
      .finally(() => { this.$modal.hide('dialog'); });
    }
  },
  validate({ params, query, store }) {
    // return /^\d+$/.test(params.id);
    // console.log(params.id);
    // console.log(store.$auth.user.profile.username);

    return `@${store.$auth.user.profile.id}` === params.id;
  }
};
</script>
