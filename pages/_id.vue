<template>
  <div>
    <h1>User</h1>
    <p>User ID : {{id}}</p>
  </div>
</template>

<style lang="scss" src="~/assets/scss/page/_write.scss"></style>

<script>
export default {
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
