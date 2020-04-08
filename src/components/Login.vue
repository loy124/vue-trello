<template>
  <div>
    <div class="login">
      <h2>Log in to Trello</h2>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="email">Email</label>
          <input
            class="form-control"
            type="text"
            name="email"
            v-model="email"
            autofocus
            placeholder="e.g., test@test.com"
          />
        </div>
        <div>
          <label for="password">Passwrod</label>
          <input class="form-control" type="password" v-model="password" placeholder="123123" />
        </div>
        <button
          class="btn"
          :class="{ 'btn-success': !invalidForm }"
          type="submit"
          :disabled="invalidForm"
        >Log In</button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { auth, setAuthInHeader } from "../api";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password;
    }
  },
  created() {
    //redirect를 위한 rPath 저장
    console.log(this.$route.query);
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    onSubmit() {
      console.log(this.email, this.password);
      auth
        .login(this.email, this.password)
        .then(data => {
          console.log(data);
          //토큰 저장
          localStorage.setItem("token", data.accessToken);
          setAuthInHeader(data.accessToken);
          console.log(this.rPath);
          //로그인 성공시 저장된 rPath 로 이동
          this.$router.push(this.rPath);
        })
        .catch(err => {
          console.log(err);
          console.log(this.rPath);
          this.error = err.data.error;
        });
    }
  }
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}
</style>
