<template>
  <main class="main" data-invert>
    <div class="auth">
      <div class="auth__wrap">
        <h1 class="title">마이페이지</h1>

        <form @submit.prevent="onSubmitEmail">
          <ValidationObserver ref="observerEmail">
            <fieldset>
              <legend>내 정보</legend>
              <ValidationProvider rules="required|min:8" v-slot="{ errors }" class="auth__g">
                <label for="email">이메일</label>
                <input type="email" id="email" v-model="user.email">
                <div class="error">
                  {{errors[0]}}
                </div>
              </ValidationProvider>

              <button type="submit" class="btn btn--invert">저장</button>
            </fieldset>
          </ValidationObserver>
        </form>

        <form @submit.prevent="onSubmitPassword">
          <ValidationObserver ref="observerPassword">
            <fieldset>
              <legend>비밀번호 변경</legend>
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
            </fieldset>

            <button type="submit" class="btn btn--invert">저장</button>
          </ValidationObserver>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="~/assets/scss/page/_auth.scss"></style>

<script>
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        passwordConfirm: ''
      },
    }
  },
  mounted() {
    this.user.email = this.$auth.$state.user.profile.email;
  },
  methods: {
    async onSubmitEmail() {
      this.$refs.observerEmail.validate().then(async isValid => {
        console.log(isValid);
        if(isValid) {
          const param = {
            email: this.user.email,
          }

          await this.$axios.post('/api/auth/register/local/email', param )
            .then(res => {
              this.$toast.success('이메일이 저장되었습니다.');
            })
            .catch(e => this.$toast.error('이메일이 저장에 실패했습니다.', { icon: 'error_outline' }));
        }
      });
    },
    async onSubmitPassword() {
      this.$refs.observerPassword.validate().then(async isValid => {
        console.log('pass');
        if(isValid) {
          if(isValid) {
          const param = {
            password: this.user.password,
          }

          await this.$axios.post('/api/auth/register/local/password', param )
            .then(res => {
              this.$toast.success('비밀번호가 변경되었습니다.');
            })
            .catch(e => this.$toast.error('비밀번호 변경이 실패했습니다.', { icon: 'error_outline' }));
        }
        }
      });
    }
  }
}
</script>
