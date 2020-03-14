<template>
  <div>
    <h1>User</h1>
    <p>User ID : {{id}}</p>
  </div>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
export default {
  // beforeRouteEnter (to, from, next) {
  //   console.log(this.$auth);
  //   if (this.$auth.profile) next();
  //   next('/auth/login?returnPath=mypage');
  // },
  asyncData({ params }) {
    console.log(params);
    return { id: params.id };
  },
  validate({ params }) {
    // return /^\d+$/.test(params.id);
    return params.id;
  }
};
</script>
