import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import NotFound from "../components/NotFound.vue";
import Board from "../components/Board.vue";
import Card from "../components/Card.vue";

Vue.use(VueRouter);

// const Login = { template: "<div>Login Page</div>" };
// const NotFound = { template: "<div>Page not found</div>" };

// const routes = {
//     "/": App,
//     "/login": Login
// };
const requireAuth = (to, from, next) => {
    const isAuth = localStorage.getItem("token");
    // 쿼리문자열은 encdoing이 필요하다
    console.log(to);
    console.log(next);
    //로그인에 갔다가 현재페이지로 돌아와야해서 path
    //로그인 완료 후에 rPath로 redirect
    //현재경로는 파라미터 to 에 있다
    // to 대상 route 객체로 이동
    // from 현재 라우트로 오기전 라우트
    // next를 실행해야지 한다
    // next안에 인자가 있을경우 다른위치로 redirection 된다
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
    console.log(loginPath);
    //토큰이 없을때는 loginPath로 redirect 해버리기
    isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
    mode: "history", //기본은 #표시가 되는모드인데 #를 제거하기위해 정상적인 url 출력하기
    routes: [
        //선행함수
        { path: "/", component: Home, beforeEnter: requireAuth }, //to.path = "/를 가리킨다"
        { path: "/login", component: Login },
        {
            path: "/b/:bid",
            component: Board,
            beforeEnter: requireAuth,
            //자식 컴포넌트 설정하기
            children: [{ path: "c/:cid", component: Card }]
        }, //:를 넣어주면 bid라는 변수로 받을수 있다
        //최후 경로 설정(즉 선언한 라우터빼고 NotFound)
        { path: "*", component: NotFound }
    ]
});

export default router;