<template>
  <div class="shogiboard">
    <div class="player">
      <p>☖後手</p>
      <div class="capture">
        <p
          v-for="(num, key) in capture.white"
          :key="key"
          @click="pickPiece(key, num)"
        >{{ pieces[key] }}{{ num }}</p>
      </div>
    </div>

    <div class="board">
      <div v-for="(item, i) in board" :key="i" class="container">
        <div v-for="(piece, j) in item" :key="j" class="edge">
          <p
            :class="{'blackP': piece.match(/[A-Z]/), 'whiteP': piece.match(/[a-z]/), 'isSelect': 9 * i + j == move.prev, 'empty': piece.match(/[-]/)}"
            @click="selectPiece(i, j, piece)"
          >{{ piece.match(/[A-z]/) ? pieces[piece.toUpperCase()] : "-"}}</p>
        </div>
      </div>
    </div>
    <div class="player">
      <p>☗先手</p>
      <div class="capture">
        <p
          v-for="(num, key) in capture.black"
          :key="key"
          @click="pickPiece(key, num)"
        >{{ pieces[key] }}{{ num }}</p>
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
      board: [[], [], [], [], [], [], [], [], []],
      capture: {
        black: { L: 0, N: 0, S: 0, G: 0, B: 0, R: 0, P: 0 },
        white: { L: 0, N: 0, S: 0, G: 0, B: 0, R: 0, P: 0 }
      },
      pieces: {
        L: "香",
        N: "桂",
        S: "銀",
        G: "金",
        K: "玉",
        B: "角",
        R: "飛",
        P: "歩"
      },
      row: {
        1: "a",
        2: "b",
        3: "c",
        4: "d",
        5: "e",
        6: "f",
        7: "g",
        8: "h",
        9: "i"
      },
      move: {
        prev: null,
        next: null,
        piece: null
      }
    };
  },
  computed: {},
  mounted() {},
  watch: {
    document: {
      immediate: false,
      handler() {
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
          Array.from(value).forEach(function(value) {
            this[index].push(value);
          }, this);
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
    pickPiece(key, num) {
      // コマがないところは選択できない（まあ非表示にしてもいいけど）
      // if (num == 0) {
      //   console.log("No pieces");
      //   return;
      // }
      // 駒台からとってきたことを示す-1を代入
      this.move.prev = -1;
      this.move.piece = key;
      console.log("Pick", key, num);
    },
    selectPiece(i, j, piece) {
      // 一回目のクリック
      if (this.move.prev == null) {
        if (piece != "-") {
          // 選択だけして終了
          this.move.prev = 9 * i + j;
          return;
        } else {
          this.move.prev = this.move.next = null;
          return;
        }
      }
      // 駒台からとってきた場合
      if (this.move.prev == -1) {
        // 空のところになら駒を置ける
        if (this.board[i][j] == "-") {
          console.log("Set piece", this.move.piece);
          this.move.prev = this.move.next = null;
          this.board[i][j] = this.move.piece;
          return;
        } else {
          console.log("Not empty");
          return;
        }
      }

      // 二回目のクリック
      this.move.next = 9 * i + j;
      // 同じところを二回クリックしたら選択解除
      if (this.move.prev == this.move.next) {
        this.move.prev = this.move.next = null;
        return;
      }
      // 何も選択していない状態であれば選択して終了
      if (this.move.prev == null) {
        this.move.prev = 9 * i + j;
        return;
      }
      // どちらでもなければ前にどこかを選択していて新たに選択
      this.movePiece(i, j, this.move.prev, this.move.next);
    },
    movePiece(i, j, prev, next) {
      // まずは選択を無効化
      this.move.prev = null;

      // まずは配列の位置をチェックする
      let prev_rank = parseInt(prev / 9);
      let prev_file = prev - 9 * prev_rank;
      let next_rank = parseInt(next / 9);
      let next_file = next - 9 * next_rank;

      // 移動先にあった駒を持ち駒として追加する
      let piece = this.board[next_rank][next_file];
      // 移動先の駒が後手の駒なら先手の駒台に追加する
      if (piece.match(/[a-z]/)) {
        this.capture.black[piece.toUpperCase()] += 1;
      }
      if (piece.match(/[A-Z]/)) {
        this.capture.white[piece.toUpperCase()] += 1;
      }
      this.board[next_rank][next_file] = this.board[prev_rank][prev_file];
      this.board[prev_rank][prev_file] = "-";
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

.shogiboard {
  display: block;
  margin: 0 auto;
  font-family: "Sawarabi Mincho";
}

.board {
  display: block;
}

/* 盤の中に適応 */
.board p {
  font-size: 6.3vw;
  /* margin-bottom: 0px !important; */
}

.player {
  /* display: inline-flex;
  justify-content: right; */
  font-size: 4vw;
  /* margin-bottom: 0px !important; */
}

.capture {
  display: flex;
  /* justify-content: center; */
  padding: 0px !important;
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
  width: 8vw;
  height: 8vw;
  /* min-width: 8vw;
  max-height: 8vw;
  min-height: 8vw; */
}
</style>