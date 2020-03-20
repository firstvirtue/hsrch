<template>
  <main class="main">
    <div class="blessay" data-invert>
      <div class="wrapper">
        <h1>@{{$auth.user.profile.username}} 님의 이야기</h1>

        <div class="func align-right">
          <a href="/post/write" class="btn btn--invert">글 쓰기</a>
        </div>

        <div class="essay">
          <ul class="essay__list">
            <li v-for="item in articles" v-bind:key="item.id">
              <a :href="`/post/write?id=${item.id}`">
                <!-- {{article.title}} -->
                <div class="cont">
                  <div class="cont__wrapper">
                    <h3 class="tit">{{item.title}}</h3>
                    <p class="desc">{{item.description}}</p>
                  </div>
                  <span class="date">{{item.created_on}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <modal name="hello-world">
      hello, world!
    </modal> -->
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
        this.articles = res.data;
      })
      .catch(err => console.log(err));

    // this.$modal.show('hello-world');
  },
  asyncData({ params }) {
    console.log(params);
    return {
      articles: []
    }
  },
  validate({ params }) {
    // return /^\d+$/.test(params.id);
    return params.id;
  }
};
</script>
