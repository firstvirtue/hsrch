<template>
  <main class="main" data-invert>
    <div class="login">
      <h1>로그인</h1>

      <form @submit.prevent="onSave">
        <div class="form-g">
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="user.email">
        </div>

        <div class="form-g">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="user.password">
        </div>

        <div class="error">
          {{error}}
        </div>

        <button type="submit" class="btn btn--invert">로그인</button>
      </form>
      <a href="/auth/register">회원 가입</a>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_login.scss"></style>

<script>
import qs from 'qs';

export default {

  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async onSave() {

      const param = {
        email: this.user.email,
        password: this.user.password
      }

      this.$store.dispatch('LOGIN', param)
        .then(() => this.redirect())
        .catch((message) => this.error = message);

      // await this.$axios.$post('/api/auth/login/local', param)
      // .then(res => {
      //   console.log(res);
      //   //
      // })
      // .catch(e => {
      //   console.log(e.response);
      //   this.error = '잘못된 계정 정보입니다.'
      // });

    },
    redirect() {
      const {search} = window.location;
      const tokens = search.replace(/^\?/, '').split('&');
      const {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs;
      }, {});

      // 리다이렉트 처리
      this.$router.push(returnPath);
    }
  }
};
</script>
