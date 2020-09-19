<template>
  <main class="main">
    <v-app>
      <div class="community" data-invert>
        <div class="wrapper wrapper--m-p">
          <div class="cmd">
            <template v-if="article.published">
              <button class="btn btn--ghost btn--sm btn--light" @click="onSavePublish">게시글 저장하기</button>
            </template>
            <template v-else>
              <button class="btn btn--ghost btn--sm btn--light btn--em" @click="onPublish">게시하기</button>
              <button class="btn btn--ghost btn--sm btn--light" @click="onSave">저장</button>
            </template>
            <button class="btn btn--ghost btn--sm btn--cancel" @click="$router.back()">취소</button>
          </div>

          <article class="article">
            <div id="container"></div>
          </article>
        </div>
      </div>

      <v-dialog
        v-model="publishDialog"
        max-width="1000">
        <v-card>
          <v-card-title class="headline">출간</v-card-title>

          <v-card-text>
            이야기를 게시하시면 커뮤니티 메뉴에서 이 글을 모두 볼 수 있습니다.<br> 게시 하시겠습니까?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <img src="" alt="">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="제목"
                    v-model="article.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="내용"
                    v-model="article.description"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <Tag :initialTags="article.tags" @changeTags="updateTags"/>
                </v-col>
              </v-row>

              <v-btn @click="execPublish" color="primary">게시하기</v-btn>
              <v-btn @click="publishDialog = false">취소</v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="publishedDialog"
        max-width="1000">
        <v-card>
          <v-card-title class="headline">출간</v-card-title>

          <v-card-text>
            이 게시글의 편집한 내용이 저장되어 커뮤니티에 반영됩니다.<br> 저장 하시겠습니까?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <img src="" alt="">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="제목"
                      v-model="article.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="내용"
                      v-model="article.description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <Tag :initialTags="article.tags" @changeTags="updateTags"/>
                  </v-col>
                </v-row>

                <v-btn @click="execPublish" color="primary">게시글 저장하기</v-btn>
                <v-btn @click="publishedDialog = false">취소</v-btn>
              </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_community.scss"></style>

<script>
import Editor from '~/assets/js/module/editor.js';
import Tag from '~/components/Tag';

export default {
  components: {
    Tag
  },
  mounted() {

    if(this.$auth.user === undefined) {
      alert('TODO: 403 잘못된 접근입니다.');
    }

    const urlParams = new URLSearchParams(window.location.search);
    this.article.id = urlParams.get('id');

    if(this.article.id) {
      this.$axios.get(`/api/posts/read/${this.article.id}`)
        .then(res => {
          this.article = res.data;
          if(this.article.category === null || this.article.category === undefined) {
            this.article.category = this.options[0].value;
          }
          console.log(this.article);

          if(this.article.writer !== this.$auth.user.profile.id) {
            alert('TODO: 403 잘못된 접근입니다.');
            return;
          }

          const data = {
            blocks: []
          }

          res.data.blocks.forEach(el => {
            // let blockContent;

            // switch(el.type) {
            // case 'image':
            //   blockContent = {
            //     file: {
            //       url: el.content
            //     }
            //   }
            //   break;
            // case 'paragraph':
            //   blockContent = {
            //     text: el.content
            //   };
            //   break;
            // case 'header':
            //   blockContent = {
            //     text: el.content,
            //     level: el.optional
            //   }
            //   break;
            // case 'embed':
            //   blockContent = {
            //     service: 'youtube',
            //     embed: el.content,
            //     caption: el.optional
            //   }
            //   break;
            // }

            let item = {
              type: el.type,
              data: el.content_data
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
        category: 'events',
        published: 0,
        blocks: [],
        tags: [],
      },
      options: [
        { text: '부서별 행사', value: 'events' },
        { text: '신앙 칼럼', value: 'columns' }
      ],
      publishDialog: false,
      publishedDialog: false,
    }
  },
  methods: {
    updateTags(tags) {
      console.log('article tags: ', tags);
      this.article.tags = tags.map(tag => {
        delete tag.isOpen;
        delete tag.isActive;
        return tag;
      });
    },
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

        outputData.blocks.forEach(el => {
          // let blockContent, optional;

          // switch(el.type) {
          //   case 'image':
          //     blockContent = el.data.file.url;
          //     break;
          //   case 'paragraph':
          //     blockContent = el.data.text;
          //     break;
          //   case 'header':
          //     blockContent = el.data.text;
          //     optional = el.data.level;
          //     break;
          //   case 'embed':
          //     blockContent = el.data.embed;
          //     optional = el.data.caption;
          //     break;
          // }

          const item = {
            type: el.type,
            content_data: el.data,
            created_on: new Date().toISOString(),
            updated_on: new Date().toISOString()
          }
          blocks.push(item);
        });

        this.article.blocks = blocks;
      });


      // validate
      const hBlock = this.article.blocks.find(block => block.type === 'header');
      if(hBlock) {
        this.article.title = hBlock.content_data.text;
      } else {
        this.$toast.error('제목이 있어야 저장이 가능해요!');
        return false;
      }

      const pBlock = this.article.blocks.find(block => block.type === 'paragraph');
      if(pBlock) {
        this.article.description = pBlock.content_data.text;
      }

      const thumbBlock = this.article.blocks.find(block => block.type === 'image');
      if(thumbBlock) {
        this.article.thumbnail = thumbBlock.content_data.file.url;
      }

      return true;
    },
    execServiceSave() {

      if(this.article.id) {
        this.$axios.patch('/api/posts/' + this.article.id, this.article).then((e) => {
          console.log(e);
          this.$router.push(`/@${this.$auth.user.profile.id}`);

        }).catch((e) => {
          console.log(e);
          notify('연결에 실패했습니다.');
        });
      } else {
        this.$axios.post('/api/posts/', this.article).then((e) => {
          // history.push('/post/list');
          console.log(e);
          this.$router.push(`/@${this.$auth.user.profile.id}`);

        }).catch((e) => {
          console.log(e);
          notify('연결에 실패했습니다.');
        });
      }
    },
    onPublish() {
      this.saveArticle().then(result => {
        if(result) {
          this.publishDialog = true;
        }
      });
    },
    onSavePublish() {
      this.saveArticle().then(result => {
        if(result) {
          this.publishedDialog = true;
        }
      });
    },
    execPublish() {
      this.article.published = 1;
      // this.article.category = 'columns';
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
