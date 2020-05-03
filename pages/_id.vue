<template>
  <main class="main">
    <div class="blessay" data-invert>
      <div class="wrapper wrapper--m-p">
        <h1>@{{$auth.user.profile.username}} 님의 이야기</h1>

        <div class="func align-right">
          <a href="/post/write" class="btn btn--invert">글 쓰기</a>
        </div>

        <div class="essay">
          <ul class="essay__list">
            <li class="essay__item" v-for="item in articles" v-bind:key="item.id">
              <a :href="`/post/${item.id}`">
                <!-- {{article.title}} -->
                <div class="cont">
                  <div class="cont__wrapper">
                    <h3 class="tit">{{item.title}}</h3>
                    <p class="desc">{{item.description}}</p>
                  </div>
                  <span class="date">
                    {{item.created_on.substring(0,10).replace(/-/gi, '.')}}
                  </span>
                </div>
              </a>
              <div class="func" :class="{'is-active': item.isActive}">
                <button @click="onUtil(item)" class="func__btn"><span class="a11y">유틸</span></button>
                <div v-show="item.isActive" class="func__layer">
                  <a :href="`/post/write?id=${item.id}`" class="btn btn--invert">수정하기</a>
                  <button class="btn btn--invert" @click="onDelete(item)">삭제하기</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <v-dialog/>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_blessay.scss"></style>

<script>
export default {
  // beforeRouteEnter (to, from, next) {
  //   console.log(this.$auth);
  //   if (this.$auth.profile) next();
  //   next('/auth/login?returnPath=mypage');
  // },
  async mounted() {
    await this.$axios.get(`/api/posts/user/${this.$auth.user.profile.username}`)
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
      articles: [],
      article: undefined
    }
  },
  methods: {
    onUtil(item) {
      item.isActive = !item.isActive;
    },
    onDelete(item) {
      item.isActive = false;
      // this.$modal.show('conditional-modal');
      this.article = item;
      let ccc = this.$modal.show('dialog', {
        title: '삭제',
        text: '이야기를 삭제 하시겠습니까?',
        buttons: [
          {
            title: '삭제',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {
              this.$axios.delete(`/api/posts/${this.article.id}`)
              .then(res => {
                // this.$router.push(`/@${this.$auth.user.profile.username}`);
                this.articles.splice(this.articles.findIndex(item => item.id === this.article.id), 1);
              })
              .catch(err => console.log(err))
              .finally(() => { this.$modal.hide('dialog'); });
            }
          },
          {
            title: '취소'
          }
      ]
      });
    },
    execDelete() {

      console.log(this.articles);
    }
  },
  validate({ params, query, store }) {
    // return /^\d+$/.test(params.id);
    // console.log(params.id);
    // console.log(store.$auth.user.profile.username);

    return `@${store.$auth.user.profile.username}` === params.id;
  }
};
</script>
