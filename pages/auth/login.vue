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
      <button @click="checkAuth">auth check</button>
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

      // console.log(this.$auth);

      await this.$auth.loginWith('local', {data: param})
        // .then(e => console.log(e))
        .catch(e => this.$toast.error('로그인에 실패했습니다.', { icon: 'error_outline' }));

      console.log(this.$auth);
      // this.$store.dispatch('LOGIN', param)
      //   .then(() => this.redirect())
      //   .catch((message) => this.error = message);

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
      return;

      const {search} = window.location;
      const tokens = search.replace(/^\?/, '').split('&');
      const {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split('=')
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs;
      }, {});

      // 리다이렉트 처리
      this.$router.push(returnPath);
    },
    checkAuth() {
      this.$axios.get('/api/auth/user')
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>
