<template>
  <main class="main">
    <div class="write" data-invert>
      <div class="wrapper">
        <div class="func align-right">
          <template v-if="article.published">
            <button class="btn btn--invert" @click="onSavePublish">게시글 저장하기</button>
          </template>
          <template v-else>
            <button class="btn btn--invert" @click="onPublish">게시하기</button>
            <button class="btn btn--invert" @click="onSave">저장</button>
          </template>
          <button class="btn btn--invert" @click="$router.back()">취소</button>
        </div>

        <!-- <div class="wrapper wrapper__post"> -->
          <article class="article">

            <div id="container"></div>
          </article>
        <!-- </div> -->
      </div>
    </div>

    <modal name="publish-modal"
         :adaptive="true"
         :max-width="1000"
         :max-height="500"
         @before-open="beforeOpen">
      <div style="padding:30px; text-align: center" class="article-modal">
        <h3>출간</h3>
        <p>이야기를 게시하시면 커뮤니티 메뉴에서 이 글을 모두 볼 수 있습니다.<br> 게시 하시겠습니까?</p>
        <div class="article-modal__preview">
          <img src="" alt="">
          <input type="text" class="article-modal__h" v-model="article.title">
          <input type="text" class="article-modal__desc" v-model="article.description">
        </div>
        <button @click="execPublish">게시하기</button>
        <button @click="$modal.hide('publish-modal')">취소</button>
      </div>
    </modal>

    <modal name="published-modal"
         :adaptive="true"
         :max-width="1000"
         :max-height="500"
         @before-open="beforeOpen">
      <div style="padding:30px; text-align: center">
        <h3>출간</h3>
        <p>이 게시글의 편집한 내용이 저장되어 커뮤니티에 반영됩니다.<br> 저장 하시겠습니까?</p>
        <button @click="execPublish">게시글 저장하기</button>
        <button @click="$modal.hide('published-modal')">취소</button>
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
          this.article = res.data;
          console.log(this.article);
          // this.article.storedTitle = res.data.title;

          const data = {
            blocks: []
          }

          res.data.blocks.forEach(el => {
            let blockContent;

            switch(el.type) {
            case 'image':
              blockContent = {
                file: {
                  url: el.content
                }
              }
              break;
            case 'paragraph':
              blockContent = {
                text: el.content
              };
              break;
            case 'header':
              blockContent = {
                text: el.content,
                level: el.optional
              }
              break;
            }

            let item = {
              type: el.type,
              data: blockContent
            };

            data.blocks.push(item);
          });

          this.editor = new Editor('container', data, () => {
            this.editor.focus(1);
          });
        })
    } else {
      const data = {
        blocks: [
          { type: 'header', data: {
            level: 1
          }},
          { type: 'paragraph' }
        ]
      }

      this.editor = new Editor('container', data, () => {
        this.editor.focus(1);
      });
    }

  },
  data() {
    return {
      article: {
        id: null,
        title: null,
        description: null,
        thumbnail: null,
        published: 0
      }
    }
  },
  methods: {
    async onSave() {

      this.saveArticle().then(result => {
        if(result) {
          this.execServiceSave();
        }
      });
    },
    async saveArticle() {
      await this.editor.save().then((outputData) => {
        console.log(outputData);
        const blocks = [];
        // let title = null, desc = null;

        outputData.blocks.forEach(el => {
          let blockContent, optional;

          switch(el.type) {
            case 'image':
              blockContent = el.data.file.url;
              break;
            case 'paragraph':
              blockContent = el.data.text;
              break;
            case 'header':
              blockContent = el.data.text;
              optional = el.data.level;
              break;
          }

          const item = {
            type: el.type,
            content: blockContent,
            optional: optional,
            created_on: new Date().toISOString(),
            updated_on: new Date().toISOString()
          }
          blocks.push(item);
        });

        this.article.blocks = blocks;
      });


      // validate
      const hBlock = this.article.blocks.find(block => block.type === 'header');
      const pBlock = this.article.blocks.find(block => block.type === 'paragraph');

      if(hBlock === null || hBlock === undefined) {
        // console.log(hBlock);

        this.$toast.error('제목이 있어야 저장이 가능해요!');
        return false;
      }

      if(this.article.title === null) {
        this.article.title = hBlock.content;
      }
      if(this.article.description === null && pBlock !== undefined) {
        this.article.description = pBlock.content;
      }

      const thumbBlock = this.article.blocks.find(block => block.type === 'image');
      if(thumbBlock !== undefined) {
        this.article.thumbnail = thumbBlock.content;
      }
      // console.log(this.article);
      return true;
    },
    execServiceSave() {
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
    },
    onPublish() {
      this.saveArticle().then(result => {
        if(result) {
          this.$modal.show('publish-modal');
        }
      });
    },
    onSavePublish() {
      this.saveArticle().then(result => {
        if(result) {
        this.$modal.show('published-modal');
        }
      });
    },
    execPublish() {
      this.article.published = 1;
      this.execServiceSave();
    },
    beforeOpen() {
      // ToDo: 썸네일

    },
    onTemp() {

    }
  }
}
</script>
