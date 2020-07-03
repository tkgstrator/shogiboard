<template>
  <div id="shogiboard">
    <div v-for="(item, i) in board" :key="i" class="container">
      <div v-for="(piece, j) in item[0]" :key="j" class="edge">
        <p
          :class="{'blackP': piece.match(/[A-Z]/), 'whiteP': piece.match(/[a-z]/), 'isSelect': 9 * i + (j + 1) == isSelect, 'empty': piece.match(/[-]/)}"
          @click="move(i, j, piece)"
        >{{ piece.match(/[A-z]/) ? pieces[piece.toUpperCase()] : "-"}}</p>
        <!-- <div>{{ piece }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../plugins/firebase";

export default {
  name: "ShogiBoard",
  data() {
    return {
      document: [],
      startpos: String,
      position: String,
      moves: [],
      isSelect: Number,
      board: [[], [], [], [], [], [], [], [], []],
      pieces: {
        L: "香",
        N: "桂",
        S: "銀",
        G: "金",
        K: "玉",
        B: "角",
        R: "飛",
        P: "歩"
      }
    };
  },
  computed: {},
  mounted() {},
  watch: {
    document: {
      immediate: false,
      handler() {
        console.log("Document Watch");
        // 初期状態を配列に変換して将棋盤変数に格納する
        this.startpos = this.document["startpos"]
          .replace(/1/g, "-")
          .replace(/2/g, "--")
          .replace(/3/g, "---")
          .replace(/4/g, "----")
          .replace(/5/g, "-----")
          .replace(/6/g, "------")
          .replace(/7/g, "-------")
          .replace(/8/g, "--------")
          .replace(/9/g, "---------")
          .split(/[/\s]/);
        this.startpos.forEach(function(value, index) {
          this[index].splice(0, 0, Array.from(value));
        }, this.board);
        // sfenの値が変化したときの処理を書く（ここで盤面を変化させればよい）
      }
    },
    board: {
      // 将棋盤情報が変化したら呼び出されるところ
      immediate: true,
      handler() {
        // 表示を変換する
      }
    }
  },
  methods: {
    move(i, j, piece) {
      if (this.isSelect == 9 * i + (j + 1)) {
        this.isSelect = Number;
        return;
      }
      this.isSelect = 9 * i + (j + 1);
      console.log(i, j, piece, this.isSelect);
    }
  },
  firestore() {
    return {
      document: db.collection("KIF").doc("SFEN")
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap");

* {
  -ms-user-select: none; /* IE 10+ */
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

div {
  min-width: 8vw;
  max-height: 8vw;
  min-height: 8vw;
}

p {
  font-size: 6.3vw;
  font-family: "Sawarabi Mincho";
  margin-bottom: 0px !important;
}
.container {
  display: flex;
  justify-content: center;
  padding: 0px !important;
}

.blackP {
  display: block;
  line-height: 8vw;
  text-align: center;
}

.empty {
  color: transparent;
}

.whiteP {
  display: block;
  line-height: 8vw;
  /* margin: auto; */
  text-align: center;
  transform: rotate(180deg);
}

.isSelect:not(.empty) {
  color: white;
  background-color: black;
}

/* .isSelect.empty {
  color: transparent;
  background-color: black;
} */

.edge {
  border: 1px solid black;
  background-color: #ffc107;
}
</style>