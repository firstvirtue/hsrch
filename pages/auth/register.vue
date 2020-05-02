<template>
  <main class="main" data-invert>
    <div class="auth">
      <div class="auth__wrap">
        <h1 class="title">회원 가입</h1>

        <form @submit.prevent="onSubmit">
          <div class="auth__g">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="user.id">
          </div>

          <div class="auth__g">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password">
          </div>

          <div class="auth__g">
            <label for="passwordConfirm">비밀번호</label>
            <input type="password" id="passwordConfirm" v-model="user.passwordConfirm">
          </div>

          <div class="auth__g">
            <label for="username">이름</label>
            <input type="text" id="username" v-model="user.username">
          </div>

          <div class="error">
            {{error}}
          </div>

          <button type="submit" class="btn btn--invert">가입 하기</button>
        </form>
        <a href="/auth/login" class="register-link">로그인</a>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_auth.scss"></style>

<script>
import qs from 'qs';

export default {

  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
        passwordConfirm: ''
      },
      error: ''
    }
  },
  methods: {
    async onSubmit() {

      const param = {
        id: this.user.id,
        username: this.user.username,
        password: this.user.password
      }

      await this.$axios.post('/api/auth/register/local', param )
        .then(e => console.log(e))
        .catch(e => this.$toast.error('회원 가입에 실패했습니다.', { icon: 'error_outline' }));

    },

  }
};
</script>
