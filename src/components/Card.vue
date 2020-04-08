<template>
  <div>
    Card
    <div v-if="loading">loading card...</div>
    <div v-else>cid : {{cid}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cid: 0,
      loading: false
    };
  },
  watch: {
    //라우터 감시
    // $route() {
    //   this.fetchData();
    // }
    $route: {
      handler: "fetchData",
      immediate: true //즉시실행 즉 created랑 같다
    }
  },
  // created() {
  //   this.fetchData();
  //   console.log(this.$route.params);
  // },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style>
</style>