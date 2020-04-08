<template>
  <div>
    <!-- <div>
      Board list:
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="b in boards" :key="b.id">
          {{ b }}
        </div>
      </div>
      <ul>
        <li>
          <router-link to="/b/1">Board 1</router-link>
        </li>
        <li>
          <router-link to="/b/2">Board 2</router-link>
        </li>
      </ul>
    </div>-->
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="b in boards"
        :key="b.id"
        :data-bgcolor="b.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href @click.prevent="SET_IS_ADD_BOARD(true)">Create new board...</a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" @submit="onAddBoard" />
  </div>
</template>

<script>
// import axios from "axios";
import { board } from "../api";
import AddBoard from "./AddBoard";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
      boards: [],
      error: ""
      // isAddBoard: false
    };
  },
  // computed: {
  //   isAddBoard() {
  //     return this.$store.state.isAddBoard;
  //   }
  // },
  computed: {
    ...mapState(["isAddBoard"])
    // foo(){

    // }
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),
    fetchData() {
      this.loading = true;
      board
        .fetch()
        .then(data => {
          this.boards = data.list;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    // addBoard() {
    //   // this.isAddBoard = true;
    //   // console.log("addBoard()");
    //원래는 coomit 함수를 해야한다

    //   this.$store.commit("SET_IS_ADD_BOARD", true);
    // },
    onAddBoard(title) {
      console.log(title);
      // api 호출
      board
        .create(title)
        //다시 모든 목록을 호출해서 다시 불러온다
        .then(() => this.fetchData());
    }
  }
};
// export default {
//   data() {
//     return {
//       loading: false,
//       boards: []
//     };
//   },
//   created() {
//     this.fetchData();
//   },
//   methods: {
//     fetchData() {
//       this.loading = true;
//       board
//         .fetch()
//         .then(data => {
//           this.boards = data;
//         })
//         .finally(_ => {
//           this.loading = false;
//         });
// this.loading = true;
// axios
//   .get("http://localhost:3000/boards")
//   .then(res => {
//     console.log(res);
//     this.boards = res.data;
//   })
//   .catch(error => {
//     console.log(error);
//     this.$router.replace("/login"); // 토큰이 없을때 경로이동
//   })
//   .finally(() => {
//     this.loading = false;
//   });
// this.loading = true;
// //요청하기
// const req = new XMLHttpRequest();
// req.open("GET", "http://localhost:3000/health");
// //클라이언트에서 백엔드서버로 요청을 보낸다
// req.send();
// //로딩이 완료되면
// req.addEventListener("load", () => {
//   this.loading = false;
//   this.apiRes = {
//     status: req.status,
//     statusText: req.statusText,
//     response: JSON.parse(req.response) //순수 문자열
//   }
// }
// }
// }
// };
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
