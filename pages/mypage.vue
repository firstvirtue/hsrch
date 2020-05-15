<template>
  <main class="main" data-invert>
    <div class="auth">
      <div class="auth__wrap">
        <h1 class="title">마이페이지</h1>

        <form @submit.prevent="onSubmit">
          <ValidationObserver ref="observer">
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

            <button type="submit" class="btn btn--invert">수정하기</button>
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
        password: '',
        passwordConfirm: ''
      },
    }
  },
}
</script>
