<template>
  <div class="shogiboard">
    <div class="player">
      <p>☖後手</p>
      <div class="capture">
        <p
          v-for="(num, key) in capture.white"
          :key="key"
          @click="pickPiece(-1, -1, key, num)"
        >{{ pieces[key] }}{{ num }}</p>
      </div>
    </div>

    <div class="board">
      <div v-for="(item, i) in board" :key="i" class="container">
        <div v-for="(piece, j) in item" :key="j" class="edge">
          <p
            :class="{'blackP': piece.match(/[A-Z]/), 'whiteP': piece.match(/[a-z]/), 'isSelect': (i == moves.mX) && (j == moves.mY), 'empty': piece.match(/[-]/)}"
            @click="pickPiece(i, j, piece, 1)"
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
          @click="pickPiece(-1, -1, key, num)"
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
      board: [[], [], [], [], [], [], [], [], []],
      capture: {
        black: { L: 0, N: 0, S: 0, G: 0, B: 0, R: 0, P: 0 },
        white: { l: 0, n: 0, s: 0, h: 0, b: 0, r: 0, p: 0 }
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
      moves: {
        turn: 0,
        sfen: [],
        isPicked: false,
        mX: null,
        mY: null,
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
    // コマを選択する
    pickPiece(mX, mY, piece, num) {
      // 既にコマが選択されていた場合
      if (this.moves.isPicked) {
        // 移動可能かどうかを判定する
        if (this.checkMovePiece(mX, mY)) {
          // 移動先が空マスでなければ手駒に加える
          if (piece != "-") {
            if (piece.match(/[a-z]/)) {
              this.capture.black[piece.toUpperCase()] += 1;
            } else {
              this.capture.white[piece.toLowerCase()] += 1;
            }
          }
          // コマを置き換える
          this.board[mX].splice(mY, 1, this.moves.piece);
          // 盤から動かしたのであれば盤のコマを消す
          if (this.moves.mX != -1 || this.moves.mY != -1) {
            this.board[this.moves.mX].splice(this.moves.mY, 1, "-");
          } else {
            // そうでなければ手番の持ち駒を一つ減らす
            if (this.moves.piece.match(/[A-Z]/)) {
              this.capture.black[this.moves.piece] -= 1;
            } else {
              this.capture.white[this.moves.piece] -= 1;
            }
          }
          this.moves.turn += 1;
        }
        console.log("選択状態を解除しました");
        this.moves.mX = null;
        this.moves.mY = null;
        this.moves.isPicked = false;
        console.log("SUCCESS");
        return;
      }

      // まだコマが選択されていない場合
      if (!this.moves.isPicked) {
        // 手番と違うコマは選択できない
        if (this.moves.turn % 2 == 0 && piece.match(/[A-Z]/) == null) {
          console.log("あなたの手番ではありません");
          return;
        }
        if (this.moves.turn % 2 == 1 && piece.match(/[a-z]/) == null) {
          console.log("あなたの手番ではありません");
          return;
        }
        console.log("コマを選択しました");
        this.moves.mX = mX;
        this.moves.mY = mY;
        this.moves.piece = piece;
        this.moves.isPicked = true;
        return;
      }
      console.log(num);
    },
    // コマが移動可能かどうかを判定し、真理値を返す関数
    checkMovePiece(mX, mY) {
      console.log(this.moves.turn, mX, mY, this.moves.mX, this.moves.mY);
      // 持ち駒を打つ場合
      if (this.moves.mX == -1 && this.moves.mY == -1) {
        if (this.board[mX][mY] == "-") {
          return true;
        }
        return false;
      }

      // // 無は移動できない
      // if (this.moves.piece == "-") {
      //   console.log("空マスは移動できません");
      //   return false;
      // }

      if (this.moves.mX == mX && this.moves.mY == mY) {
        console.log("同じ位置にコマを動かすことはできません");
        return false;
      }

      // 移動先が無であれば移動できる
      if (this.board[mX][mY] == "-") {
        console.log("移動先が空マスです");
        return true;
      }

      // 移動先が相手のコマであれば移動できる
      // console.log(this.moves.turn % 2, this.board[mX][mY].match(/[a-z]/));
      if (this.moves.turn % 2) {
        if (this.board[mX][mY].match(/[A-Z]/) != null) {
          console.log("移動先が相手のコマです");
          return true;
        } else {
          console.log("移動先が自分のコマです");
          return false;
        }
      } else {
        if (this.board[mX][mY].match(/[a-z]/) != null) {
          console.log("移動先が相手のコマです");
          return true;
        } else {
          console.log("移動先が自分のコマです");
          return false;
        }
      }
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