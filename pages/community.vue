<template>
  <main class="main">
    <div class="list" data-invert>
      <h1 class="h2 title">커뮤니티</h1>

      <ul class="nav">
        <li v-for="item in navList" :key="item.id">
          <h2>
            <a :href="item.id" :data-id="item.id" @click="getList">
              {{item.title}}
              <span class="bar"></span>
            </a>
          </h2>
        </li>
      </ul>

      <div class="wrapper">
        <ul class="items items--masonry">
          <li v-for="(item) in items" :key="item.videoId">
            <a :href="`/post/${item.id}`">
              <div class="img-wrap">
                <img :src="item.thumbnail" alt="">
              </div>
              <div class="cont">
                <div class="cont__wrapper">
                  <span class="category-badge">카테고리</span>
                  <h3 class="tit">{{item.title}}</h3>
                  <p class="desc">{{item.description}}</p>
                </div>
                <span class="date">
                  {{item.created_on.substring(0,10).replace(/-/gi, '.')}}
                  </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_list.scss"></style>

<script>
export default {
  async mounted() {
    this.getList();
  },
  data() {
    return {
      navList: [
        {
          id: '#sermonSunday',
          title: '전체보기'
        },
        {
          id: '#praise',
          title: '부서별 행사'
        },
        {
          id: '#praise',
          title: '신앙 칼럼'
        }
      ],
      items: [],
    }
  },
  methods: {
    async getList(e) {

      // if(e.target.getAttribute('href') === '#sermonSunday') {
      //   this.getSermons();
      // } else if (e.target.getAttribute('href') === '#praise') {
      //   this.getPraises();
      // }

      await this.$axios.get(`/api/posts/`)
      .then(res => {
        console.log(res);

        this.items = res.data;
      })
      .catch(err => console.log(err));

      e.preventDefault();
    },

  }
}
</script>
