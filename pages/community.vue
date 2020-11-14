<template>
  <main class="main">
    <div class="list" data-invert>
      <h1 class="h2 title">커뮤니티</h1>

      <ul class="nav">
        <li v-for="item in navList" :key="item.id">
          <h2>
            <a :href="item.id" :data-id="'#' + item.id" @click="selectCategory">
              {{item.tagname}}
              <span class="bar"></span>
            </a>
          </h2>
        </li>
      </ul>

      <div class="wrapper">
        <ul class="items items--masonry">
          <li v-for="(item) in items" :key="item.videoId">
            <a :href="`/post/${item.id}`">
              <div class="img-wrap" v-if="item.thumbnail">
                <img :src="item.thumbnail" alt="">
              </div>
              <div class="cont">
                <div class="cont__wrapper">
                  <div class="badge-wrap" v-if="item.tags && item.tags.length > 0">
                    <span class="category-badge" v-for="tag in item.tags" :key="tag.id">
                      {{tag.tagname}}
                    </span>
                  </div>
                  <h3 class="tit">{{item.title}}</h3>
                  <p class="desc" v-html="item.description">{{item.description}}</p>
                </div>
                <span class="date">
                  {{item.created_on && item.created_on.substring(0,10).replace(/-/gi, '.')}}
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
    this.getCategory();
    this.getList();

    document.querySelector(`.nav li a[data-id="#all"]`)
        .classList.add('is-active');
  },
  data() {
    return {
      navList: [
        {
          id: 'all',
          tagname: '전체보기'
        },
      ],
      items: [],
    }
  },
  methods: {
    async selectCategory(e) {
      e.preventDefault();
      const target = e.target.getAttribute('href').replace('#', '');

      document.querySelectorAll('.nav li a').forEach(function(el) {
        el.classList.remove('is-active');
      });
      document.querySelector(`.nav li a[data-id="#${target}"]`)
        .classList.add('is-active');

      this.getList(target);
    },
    async getList(target) {

      let apiUrl;

      if(target && target !== 'all') {
        apiUrl = `/api/posts/hsrch.co.kr?tags=${target}`;
      } else {
        apiUrl = '/api/posts/hsrch.co.kr';
      }

      await this.$axios.get(apiUrl)
      .then(res => {
        console.log(res);

        this.items = res.data.results;
      })
      .catch(err => console.log(err));
    },
    async getCategory() {
      const categories = await this.$axios.get('/api/tags?domain=hsrch.co.kr');
      this.navList = this.navList.concat(categories.data);
    }
  }
}
</script>
