<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>bid : {{bid}}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
    </div>

    <!-- 화면이 갱신되지 않는다 created hook이 실행이 되지 않는다 -->
    <hr />
    <!-- children 부분을 나타내려면 새로 router view로 나타내 주어야한다. -->

    <router-view></router-view>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        bid: 0,
        loading: false
    };
  },

  created() {
    this.fetchData();
    console.log(this.$route);
    //라우팅 정보 출력하기
    console.log(this.$route.params.bid);
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.bid = this.$route.params.bid;
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style>
</style>
