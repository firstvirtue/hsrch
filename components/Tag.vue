<template>
  <div class="tag-wrapper">
    <div class="tag-container" :class="{'is-popup': isPopup}">
      <div class="tag-watermark" :class="{ 'is-hide': isPopup || currentTags.length > 0 }">태그를 입력해 주세요.</div>
      <div class="tag-input" @click="handleClickTagContainer">
        <div v-for="item in currentTags" :key="item.id" class="tag">
          {{item.tagname}}
          <span class="close-btn" @click="handleRemoveTag(item)">+</span>
        </div>

        <input class="tag tag--holder" ref="tagInput" autocomplete="off"
          @focus="handleFocusTagInput"
          @click="handleClickTagInput"
          @blur="handleBlurTagInput"
          @keydown="handleKeyDownTagInput"
          @keyup="handleKeyUpTagInput" />
      </div>
      <div class="tag-popup" v-show="isPopup">
        <ul class="tag-list">
          <li class="tag-item" :class="{ 'is-active': item.isActive, 'is-new': item.isNew }" v-for="item in filteredTags" :key="item.id"
            @click="addNewTag(item, $event)"
            @mouseenter="handleEnterMouse(item)"
            @mouseleave="handleLeaveMouse(item)">
            <span class="tag-name">{{item.tagname}}</span>
            <div class="tag-func">
              <button class="tag-func-opener" @click="handleSwitchTagFunc(item, $event)">...</button>
              <div class="preventer" :class="{'is-open': item.isOpen}" @click="handleHideTagFunc(item, $event)" role="presentation"></div>
              <ul class="tag-func-list" :class="{'is-open': item.isOpen}">
                <li class="tag-func-item"><button class="tag-func-trigger" @click="handleRemoveStoredTag(item, $event)">삭제</button></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialTags: Array
  },
  async mounted() {

    this.currentTags = this.initialTags;

    window.addEventListener('click', () => {
      this.isPopup = false;
    });

    const domain = 'jakel.ee';
    await this.$axios.get(`/api/tags?domain=${domain}`)
      .then(res => {
        this.tags = res.data.map(x => {
          x.isOpen = false;
          x.isActive = false;
          return x;
        });
        this.filteredTags = this.tags;
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      activeTag: null,
      prevFilter: null,
      isModal: false,
      isPopup: false,
      currentTags: [],
      tags: [],
      filteredTags: [],
    }
  },
  watch: {
    activeTag: function() {
      this.filteredTags.forEach(x => x.isActive = false);
      if(this.activeTag) this.activeTag.isActive = true;

      // console.log(this.activeTag ? this.activeTag.tagname : 'null');
    },
    isPopup: function() {
      this.activeTag = null;
      this.$refs.tagInput.value = '';
      this.filteredTags = this.tags;
    }
  },
  methods: {
    handleRemoveTag(item) {
      const index = this.currentTags.indexOf(item);
      if(index > -1) {
        this.currentTags.splice(index, 1);
      }
    },
    handleKeyDownTagInput(e) {

      switch (e.keyCode) {
        case 13:
          e.preventDefault();
          const inputValue = e.target.value;

          let item = this.activeTag ? this.activeTag : {
            tagname: inputValue,
            domain: 'jakel.ee',
            isOpen: false,
            isActive: false,
            isNew: true,
          };

          this.addNewTag(item);

          break;
        case 8:
          if(e.target.value.length === 0) {
            if(this.currentTags.length > 0) {
              this.currentTags.pop();
            }
          }
          this.activeTag = null;
          break;
        case 38:
          e.preventDefault();
          if(this.activeTag) {
            const idx = this.filteredTags.indexOf(this.activeTag);
            this.activeTag = this.filteredTags[idx - 1 < 0 ? this.filteredTags.length - 1 : idx - 1];
          } else {
            this.activeTag = this.filteredTags[this.filteredTags.length - 1];
          }
          break;
        case 40:
          e.preventDefault();
          if(this.activeTag) {
            const idx = this.filteredTags.indexOf(this.activeTag);
            this.activeTag = this.filteredTags[idx + 1 > this.filteredTags.length - 1 ? 0 : idx + 1];
          } else {
            this.activeTag = this.filteredTags[0];
          }
          break;
        default:
          this.activeTag = null;
          break;
      }
    },
    handleKeyUpTagInput(e) {
      if(e.keyCode !== 38 && e.keyCode !== 40) {
        const filter = e.target.value;

        this.updateFilteredTags(filter);
      }
    },
    updateFilteredTags(filter = '') {
      if(filter === this.prevFilter) return;

      this.prevFilter = filter;
      const filtered = this.tags.filter(x => x.tagname.match(filter));
      this.filteredTags = filtered;

      if(filter.length > 0 && !this.filteredTags.find(x => x.tagname === filter)) {
        const newTag = {
          tagname: filter,
          domain: 'jakel.ee',
          isOpen: false,
          isActive: false,
          isNew: true,
        };

        this.filteredTags.push(newTag);
      }
    },
    addNewTag(item, event) {

      event && event.stopPropagation();
      // console.log(item);

      if(item.tagname.length) {
        this.handleAddTagAPI(item, (newTag) => {
          this.handleAddTagLocal(newTag);
        });
      }
    },
    async handleAddTagAPI(tag, callback) {

      if(tag.isNew && !this.tags.find(x => x.tagname === tag.tagname)) {

        await this.$axios.post(`/api/tags`, tag)
        .then(res => {
          const newTag = res.data;
          newTag.isOpen = false;
          newTag.isActive = false;

          this.tags.push(newTag);
          this.activeTag = null;
          callback && callback(newTag);
          this.updateFilteredTags();
        })
        .catch(err => console.log(err));
      } else {
        callback && callback(tag);
      }
    },
    handleAddTagLocal(tag, event) {
      event && event.stopPropagation();
      // if(this.handleCheckAndHideTagFunc()) return;
      this.$refs.tagInput.value = '';
      // this.handleAddTagLocal(newTag);
      this.$refs.tagInput.focus();
      if(this.currentTags.some(item => item.tagname === tag.tagname)) return;

      this.currentTags.push(tag);
      this.$emit('changeTags', this.currentTags);
    },
    async handleRemoveStoredTag(tag, event) {
      event.stopPropagation();

      const check = window.confirm(`${tag.tagname} 태그를 삭제 하시겠습니까?`);

      if(check) {
        await this.$axios.delete(`/api/tags/${tag.id}`)
        .then(res => {
          console.log(tag);
          const index = this.filteredTags.indexOf(tag);
          if(index > -1) {
            this.filteredTags.splice(index, 1);
          }

          const indexCurrent = this.currentTags.indexOf(tag);
          if(indexCurrent > -1) {
            this.currentTags.splice(indexCurrent, 1);
          }

          const indexTag = this.tags.indexOf(tag);
          if(indexTag > -1) {
            this.tags.splice(indexTag, 1);
          }

          this.$refs.tagInput.focus();

          // [TODO] Remove all others current tags
        })
        .catch(err => console.log(err));
      }
    },
    handleFocusTagInput(e) {
      // console.log(e);
      this.isPopup = true;
      this.handleCheckAndHideTagFunc();
    },
    handleClickTagInput(e) {
      e.stopPropagation();
    },
    handleBlurTagInput() {
      // this.$refs.tagInput.value = '';
      // this.filteredTags = this.tags;
    },
    handleEnterMouse(tag) {
      this.activeTag = tag;
      // console.log(tag);
    },
    handleLeaveMouse(tag) {
      //
      //
    },
    handleClickTagContainer(e) {
      e.stopPropagation();
      this.isPopup = true;
      setTimeout(() => {
        this.$refs.tagInput.focus();
      }, 10);
    },
    handleSwitchTagFunc(tag, event) {
      event.stopPropagation();
      tag.isOpen = true;
    },
    handleHideTagFunc(tag, event) {
      event.stopPropagation();
      tag.isOpen = false;
    },
    // [TODO] rename handleHideTagFunc, remove flag
    handleCheckAndHideTagFunc() {
      let flag;
      this.filteredTags.forEach(tag => {
        if(tag.isOpen) {
          flag = true;
          tag.isOpen = false;
        }
      });

      return flag;
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag {

    $fontSize: 14px;
    $minHeight: 22px;

    &-wrapper {
      height: $minHeight;
      width: 100%;
      margin-left: -0.3em;
    }

    &-container {
      position: absolute;
      border: 1px solid #e6e6e6;
      max-width: 400px;
    }

    &-input {
      position: relative;
      min-height: $minHeight;
      min-width: 20rem;
      // padding: 0.3em 0;
      cursor: pointer;

      input {
        border: 0;
      }
    }

    &-watermark {
      position: absolute;
      top: 50%;
      left: 1em;
      transform: translate(0, -50%);
      color: #999;
      font-size: $fontSize;

      &.is-hide {
        display: none;
      }
    }

    & {
      display: inline-block;
      position: relative;
      color: #a69174;
      margin: 0.3em;
      outline: none;
      font-size: $fontSize;

      &--holder {
        display: none;
        color: #333;
        font-size: $fontSize;
      }
    }

    .close-btn {
      display: none;
      position: absolute;
      top: 50%;
      right: -9px;
      font-size: 24px;
      transform: translate(-50%, -50%) rotate(45deg);
      cursor: pointer;
    }

    &-popup {
      // padding: 0 1em 1em;
    }

    &-list {
      max-width: 30rem;
    }

    &-item {
      // display: flex;
      // justify-content: space-between;
      position: relative;
      cursor: pointer;
      padding: 0.3em;
      font-size: $fontSize;

      &:hover {
        background-color: aliceblue;
      }

      &.is-active {
        background-color: aliceblue;
      }

      &.is-new {
        padding-left: 70px;
        &::before {
          content: '새로만들기';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          font-size: 13px;
          color: #999999;
        }
      }
    }

    &-func {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 30px;

      .is-active & {
        display: block;
      }

      &-opener {
        height: 100%;
        width: 100%;
        text-align: center;
        letter-spacing: 0.2em;
      }

      &-list {
        display: none;
        position: absolute;
        top: -2.2em;
        min-width: 3em;
        background-color: #ffffff;
        box-shadow: 1px 1px 4px 0 #f0f0f0;
        z-index: 101;

        &.is-open {
          display: block;
        }
      }

      &-item {
        padding: 0.5em;
      }

      &-trigger {
        top: -20px;
      }

      .preventer {
        display: none;
        position: fixed;
        // width: 100vw;
        // height: 100vh;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;

        &.is-open {
          display: block;
        }
      }
    }
  }

  .is-popup {
    &.tag-container {
        border: none;
        padding: 1em;
        background-color: #ffffff;
        transform: translateY(-93%);
        box-shadow: 2px 2px 6px 1px rgba(153, 153, 153, 0.2);
      }

    .tag {
      padding-right: 0.8em;

      .close-btn {
        display: inline-block;
      }

      &--holder {
        display: inline-block;
      }

      &-input {
        margin-bottom: 1em;
      }

    }
  }
</style>
