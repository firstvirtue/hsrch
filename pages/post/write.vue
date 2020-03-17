<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper">
        <div class="func align-right">
          <button class="btn btn--invert" @click="onSave">저장하기</button>
          <button class="btn btn--invert" @click="$router.back()">취소</button>
        </div>

        <!-- <div class="wrapper wrapper__post"> -->

          <article class="article">
            <h1 contenteditable="true" class="h2 article__title" @input="onKeyin">
              {{article.title}}
            </h1>

            <div id="container"></div>
          </article>
        <!-- </div> -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
import Editor from '~/assets/js/module/editor.js';

export default {
  mounted() {

    const urlParams = new URLSearchParams(window.location.search);
    this.article.id = urlParams.get('id');

    if(this.article.id) {
      this.$axios.get(`/api/posts/${this.article.id}`)
        .then(res => {
          this.article.title = res.data.title;
          this.article.storedTitle = res.data.title;

          const data = {
            blocks: []
          }

          res.data.blocks.forEach(el => {
            let item = {
              type: el.type,
              data: {
                text: el.content
              }
            };

            data.blocks.push(item);
          });

          this.editor = new Editor('container', data);
        })
    } else {
      this.editor = new Editor('container');
    }

  },
  data() {
    return {
      article: {
        id: null,
        title: '',
        storedTitle: '',
        description: '',
        blocks: []
      }
    }
  },
  methods: {
    async onSave() {

      // TODO: 저장 하시겠습니까?

      await this.editor.save().then((outputData) => {
        const blocks = [];

        outputData.blocks.forEach(el => {
          const item = {
            type: el.type,
            content: el.data.text,
            created_on: new Date().toISOString(),
            updated_on: new Date().toISOString()
          }
          blocks.push(item);
        })

        this.article.blocks = blocks;
        this.article.title = this.article.storedTitle;

        if(this.article.id) {
          this.$axios.patch('/api/posts/' + this.article.id, this.article).then((e) => {
            console.log(e);
            this.$router.push(`/@${this.$auth.user.profile.username}`);

          }).catch((e) => {
            console.log(e);
            notify('연결에 실패했습니다.');
          });
        } else {
          this.$axios.post('/api/posts/', this.article).then((e) => {
            // history.push('/post/list');
            console.log(e);
            this.$router.push(`/@${this.$auth.user.profile.username}`);

          }).catch((e) => {
            console.log(e);
            notify('연결에 실패했습니다.');
          });
        }
      })
    },
    onKeyin(e) {
      this.article.storedTitle = e.target.innerText;
    }
  }
}
</script>
