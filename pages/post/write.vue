<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper">
        <div class="func align-right">
          <button class="btn btn--invert" @click="onPublish">게시하기</button>
          <button class="btn btn--invert" @click="onSave">저장</button>
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

    <modal name="publish-modal"
         :adaptive="true"
         :max-width="1000"
         :max-height="400"
         width="300px"
         height="150px"
         @before-open="beforeOpen">
      <div style="padding:30px; text-align: center">
        <h2>출간</h2>
        <p>이야기를 게시하시면 커뮤니티 메뉴에서 이 글을 모두 볼 수 있습니다. 게시 하시겠습니까?</p>
        <!-- <button @click="execDelete">삭제</button>
        <button @click="execCancel">취소</button> -->
      </div>
    </modal>
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
    },
    onPublish() {
      this.$modal.show('publish-modal');
    },
    beforeOpen() {
      // ToDo: 썸네일
    }
  }
}
</script>
