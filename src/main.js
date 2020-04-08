import Vue from "vue";
import router from "./router/index";
import App from "./App.vue";
// import router from "./router";//index는생략해도 동작
import store from "./store";

new Vue({
    el: "#app",
    router, //라우터 주입
    store,
    //render가 되면 router-view 생성
    // render: h => h({ template: "<router-view></router-view>" })
    render: h => h(App)
});

// new Vue({
//     el: "#app",
//     // computed: {
//     //     VueComponent() {
//     //         return routes[window.location.pathname] || NotFound;
//     //     }
//     // },
//     render(h) {
//         return h(this.VueComponent);
//     }
// });