<template>
  <main class="main">
    <div class="blessay" data-invert>
      <div class="wrapper">
        <h1>@{{$auth.user.profile.username}}</h1>

        <div class="essay">
          <ul class="essay__list">
            <li v-for="item in articles" v-bind:key="item.id">
              <a :href="`/post/${item.id}`">
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
  mounted() {
    this.$axios.get(`/api/posts/user/${this.$auth.user.profile.username}`)
      .then(res => {
        console.log(res);
        this.articles = res.data;
      })
      .catch(err => console.log(err));
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
