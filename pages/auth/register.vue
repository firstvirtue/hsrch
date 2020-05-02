<template>
  <main class="main" data-invert>
    <div class="auth">
      <div class="auth__wrap">
        <h1 class="title">회원 가입</h1>

        <form @submit.prevent="onSubmit">
          <ValidationObserver ref="observer">
            <ValidationProvider rules="required|alpha_num|min:6|unique" v-slot="{ errors }" class="auth__g" ref="provider">
              <label for="id">아이디</label>
              <input type="text" id="id" v-model="user.id">
              <div class="error">
                {{errors[0]}}
              </div>
            </ValidationProvider>

            <ValidationProvider vid="password" rules="required|min:8" v-slot="{ errors }" ref="password" class="auth__g">
              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="user.password">
              <div class="error">
                {{errors[0]}}
              </div>
            </ValidationProvider>

            <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }" data-vv-as="password" class="auth__g">
              <label for="passwordConfirm">비밀번호 확인</label>
              <input type="password" id="passwordConfirm" v-model="user.passwordConfirm">
              <div class="error">
                {{errors[0]}}
              </div>
            </ValidationProvider>

            <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="auth__g">
              <label for="username">이름</label>
              <input type="text" id="username" v-model="user.username">
              <div class="error">
                {{errors[0]}}
              </div>
            </ValidationProvider>

            <button type="submit" class="btn btn--invert">가입 하기</button>
          </ValidationObserver>
        </form>
        <a href="/auth/login" class="register-link">로그인</a>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_auth.scss"></style>

<script>
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import qs from 'qs';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
        passwordConfirm: ''
      },
    }
  },
  mounted() {
    const isUnique = value =>
      new Promise(resolve => {
        setTimeout(() => {
          this.$axios.get('/api/auth/exists/id/' + value).then(result => {

            if(!result.data.exists) {
              return resolve({
                valid: true
              })
            }

            return resolve({
              valid: false
            });

          })
        }, 200);
      });


    extend('unique', {
      validate: isUnique,
      message: (field, params) => `${params._value_}는 이미 존재하는 ID 입니다.`
    });

  },
  methods: {
    async onSubmit() {

      this.$refs.observer.validate().then(async isValid => {
        console.log(isValid);
        if(isValid) {
          const param = {
          id: this.user.id,
          username: this.user.username,
          password: this.user.password
        }

        await this.$axios.post('/api/auth/register/local', param )
          .then(e => console.log(e))
          .catch(e => this.$toast.error('회원 가입에 실패했습니다.', { icon: 'error_outline' }));
        }
      });

    },

  }
};
</script>
