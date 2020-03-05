<template>
  <div>
    <h1>User</h1>
    <p>User ID : {{id}}</p>
  </div>
</template> <script>
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
