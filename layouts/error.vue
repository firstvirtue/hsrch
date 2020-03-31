<template>
  <div class="container">
    <h1 class="h1" v-if="error.statusCode === 404">페이지를 찾을 수 없습니다.</h1>
    <h1 class="h1" v-else>내부 에러가 발생했습니다.</h1>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .h1 {
      font-size: 50px;
      text-align: center;
    }

    a {
      margin-top: 3rem;
      text-align: center;
    }
  }
</style>

<script>
export default {
  props: ['error'],
  layout: 'base'
}
</script>
