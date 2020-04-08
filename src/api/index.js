import axios from "axios";
import router from "../router";

const DOMAIN = "http://localhost:3000";
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
    //다른 url로 이동
    console.log("다른 url");
    console.log(location.pathname);
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
    return axios({
            method,
            url: DOMAIN + url,
            data
        })
        .then(result => result.data)
        .catch(result => {
            //result.status
            const { status } = result.response;
            console.log(result.response);
            console.log(result.response.status);
            if (status === UNAUTHORIZED) onUnauthorized();
            // return Error(result);
            throw result.response;
        });
};

export const setAuthInHeader = token => {
    //공통헤더
    axios.defaults.headers.common["Authorization"] = token ?
        `Bearer ${token}` :
        null;
};

//새로고침하면 메모리 토큰정보가 초기화되는데 해당 부분을 해결하는법
const { token } = localStorage;
if (token) setAuthInHeader(token);

export const board = {
    fetch() {
        return request("get", "/boards");
    },
    create(title) {
        return request("post", "/boards", { title });
    }
};

export const auth = {
    login(email, password) {
        return request("post", "/login", { email, password });
    }
};