<template>
  <div class="shogiboard">
    <div class="player">
      <p>☖後手</p>
      <div class="capture">
        <p v-for="(num, key) in capture.white" :key="key" @click="pickPiece(-1, -1, key, true)">
          <template v-if="num != 0">{{ pieces[key.toUpperCase()] }}{{ num }}</template>
        </p>
      </div>
    </div>
    <div class="board">
      <div v-for="(item, i) in board" :key="i" class="container">
        <div v-for="(piece, j) in item" :key="j" class="edge">
          <p
            :class="{'blackP': piece.match(/[A-Z]/), 'whiteP': piece.match(/[a-z]/), 'isSelect': (i == moves.mX) && (j == moves.mY), 'empty': piece.match(/[-]/)}"
            @click="pickPiece(i, j, piece, false)"
          >{{ piece.match(/[A-z]/) ? pieces[piece.toUpperCase()] : "-"}}</p>
        </div>
      </div>
    </div>
    <div class="player">
      <p>☗先手</p>
      <div class="capture">
        <p v-for="(num, key) in capture.black" :key="key" @click="pickPiece(-1, -1, key, true)">
          <template
            v-if="num != 0"
            :class="{'isSelect': (-1 == moves.mX) && (moves.turn % 2 ==0) && (moves.mPiece == key)}"
          >{{ pieces[key] }}</template>
          <template v-if="num != 0">{{ num }}</template>
        </p>
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
        white: { l: 0, n: 0, s: 0, g: 0, b: 0, r: 0, p: 0 }
      },
      pieces: {
        L: "香",
        N: "桂",
        S: "銀",
        G: "金",
        K: "玉",
        B: "角",
        R: "飛",
        P: "歩",
        "L+": "杏",
        "N+": "圭",
        "S+": "全",
        "B+": "馬",
        "R+": "龍",
        "P+": "と"
      },
      rank: {
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
        isCaptured: false,
        mX: null,
        mY: null,
        mPiece: null
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
    // コマを成る関数（だいたい完成している）
    isPromoted(mX, nX, nPiece) {
      // 既に成っているコマもしくは金か玉なら
      if (nPiece.match(/[+GKgk]/) != null) {
        return false;
      }
      // 先手のコマなら
      if (nPiece.match(/[A-Z]/)) {
        if (mX <= 2 || nX <= 2) {
          return true;
        }
        return false;
      }
      // 後手のコマなら
      if (nPiece.match(/[a-z]/)) {
        if (mX >= 6 || nX >= 6) {
          return true;
        }
        return false;
      }
    },
    selectPiece(mX, mY, mPiece, isCaptured) {
      // 空マスは選択できない
      if (mPiece == "-") {
        return;
      }
      // 手番と違うコマは選択できない
      if (this.moves.turn % 2 == 0 && mPiece.match(/[A-Z]/) == null) {
        return;
      }
      if (this.moves.turn % 2 == 1 && mPiece.match(/[a-z]/) == null) {
        return;
      }
      this.moves.mX = mX;
      this.moves.mY = mY;
      this.moves.mPiece = mPiece;
      this.moves.isPicked = true;
      this.moves.isCaptured = isCaptured;
      return;
    },
    movePiece(mX, mY, nX, nY, mPiece, nPiece) {
      // USI形式の指し手表示
      var usi_move = "";

      // 移動先が空マスでなければ手駒に加える
      if (mPiece != "-") {
        if (mPiece.match(/[a-z]/)) {
          this.capture.black[mPiece.toUpperCase().replace("+", "")] += 1;
        } else {
          this.capture.white[mPiece.toLowerCase().replace("+", "")] += 1;
        }
      }

      // 盤から動かした場合、成り判定を加える
      if (!this.moves.isCaptured) {
        usi_move = 9 - nY + this.rank[nX + 1] + (9 - mY) + this.rank[mX + 1];
        // 移動元を空マスにする
        this.board[nX].splice(nY, 1, "-");
        // 成り判定を加えてコマを置く
        if (this.isPromoted(mX, nX, nPiece)) {
          usi_move += "+";
          this.board[mX].splice(mY, 1, nPiece + "+");
        } else {
          this.board[mX].splice(mY, 1, nPiece);
        }
      }

      // 駒台から打った場合、駒台から一枚減らす
      if (this.moves.isCaptured) {
        usi_move = nPiece.toUpperCase() + "*" + (9 - mY) + this.rank[mX + 1];
        // 手番の持ち駒を一つ減らす
        if (nPiece.match(/[A-Z]/)) {
          this.capture.black[nPiece.replace("+", "")] -= 1;
        } else {
          this.capture.white[nPiece.replace("+", "")] -= 1;
        }
        // 打ったコマを盤におく
        this.board[mX].splice(mY, 1, nPiece);
      }
      // 手番を一つ増やす
      this.moves.turn += 1;

      // コマの選択を解除する
      this.moves.mX = null;
      this.moves.mY = null;
      this.moves.isPicked = false;

      // 結果を出力する
      console.log(this.moves.turn, usi_move);
      // console.log(this.board);
    },
    // コマを選択する
    pickPiece(mX, mY, mPiece, isCaptured) {
      // コマを選択した状態なら
      if (this.moves.isPicked) {
        // 前状態を読み込む
        let nX = this.moves.mX;
        let nY = this.moves.mY;
        let nPiece = this.moves.mPiece;
        // コマが動かせるなら
        if (this.isMovable(mX, mY, nX, nY, nPiece)) {
          this.movePiece(mX, mY, nX, nY, mPiece, nPiece, isCaptured);
          return;
        }
        // コマが動かせないならそのコマを選択する
        return;
      }
      // そのコマを選択する
      if (!this.moves.isPicked) {
        this.selectPiece(mX, mY, mPiece, isCaptured);
        return;
      }
    },
    checkBitBoard(mX, mY, nX, nY, nPiece) {
      // コマによる移動の制約チェック
      if (nPiece.match(/[A-Z]/)) {
        switch (nPiece.toUpperCase()) {
          case "L":
            if (Math.abs(mY - nY) == 0 && mX < nX) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          case "N":
            if (Math.abs(mY - nY) == 1 && mX - nX == -2) {
              return true;
            }
            break;
          case "S":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 真下には動けない
              if (Math.abs(mY - nY) == 0 && mX - nX == 1) {
                return false;
              }
              // 真横には動けない
              if (Math.abs(mY - nY) == 1 && Math.abs(mX - nX) == 0) {
                return false;
              }
              return true;
            }
            break;
          case "G":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 斜め後ろに動いたかどうかをチェック
              if (Math.abs(mY - nY) == 1 && mX - nX == 1) {
                return false;
              }
              return true;
            }
            break;
          case "K":
            // 隣接一マス以内なら動ける（もっと簡単にかけそう
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            break;
          case "B":
            if (Math.abs(mX - nX) == Math.abs(mY - nY)) {
              // 右上または左下に移動している
              if (
                (Math.min(mX, nX) == mX && Math.min(mY, nY) == nY) ||
                (Math.min(mX, nX) == nX && Math.min(mY, nY) == mY)
              ) {
                for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                  if (this.board[i][mX + mY - i] != "-") {
                    return false;
                  }
                }
              } else {
                // 左上または右下に移動している
                for (let i = 1; i < Math.abs(mX - nX); i++) {
                  if (
                    this.board[Math.min(mX, nX) + i][Math.min(mY, nY) + i] !=
                    "-"
                  ) {
                    return false;
                  }
                }
              }
              return true;
            }
            break;
          case "R":
            if (Math.abs(mY - nY) == 0) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            if (Math.abs(mX - nX) == 0) {
              for (let i = Math.min(mY, nY) + 1; i < Math.max(mY, nY); i++) {
                if (this.board[mX][i] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          case "P":
            if (nX == mX + 1 && mY == nY) {
              return true;
            }
            break;
          case "B+":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            // 相対ズレが等しければ角が動ける範囲である
            if (Math.abs(mX - nX) == Math.abs(mY - nY)) {
              // 右上または左下に移動している
              if (
                (Math.min(mX, nX) == mX && Math.min(mY, nY) == nY) ||
                (Math.min(mX, nX) == nX && Math.min(mY, nY) == mY)
              ) {
                for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                  if (this.board[i][mX + mY - i] != "-") {
                    return false;
                  }
                }
              } else {
                // 左上または右下に移動している
                for (let i = 1; i < Math.abs(mX - nX); i++) {
                  if (
                    this.board[Math.min(mX, nX) + i][Math.min(mY, nY) + i] !=
                    "-"
                  ) {
                    return false;
                  }
                }
              }
              return true;
            }
            break;
          case "R+":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            if (Math.abs(mY - nY) == 0) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            if (Math.abs(mX - nX) == 0) {
              for (let i = Math.min(mY, nY) + 1; i < Math.max(mY, nY); i++) {
                if (this.board[mX][i] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          default:
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 斜め後ろに動いたかどうかをチェック
              if (Math.abs(mY - nY) == 1 && mX - nX == 1) {
                return false;
              }
              return true;
            }
            break;
        }
        return false;
      }
      if (nPiece.match(/[a-z]/)) {
        switch (nPiece.toUpperCase()) {
          case "L":
            if (Math.abs(mY - nY) == 0 && mX > nX) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          case "N":
            if (Math.abs(mY - nY) == 1 && mX - nX == 2) {
              return true;
            }
            break;
          case "S":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 真下には動けない
              if (Math.abs(mY - nY) == 0 && mX - nX == -1) {
                return false;
              }
              // 真横には動けない
              if (Math.abs(mY - nY) == 1 && Math.abs(mX - nX) == 0) {
                return false;
              }
              return true;
            }
            break;
          case "G":
            // まずは玉の動きを指定
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 斜め後ろに動いたかどうかをチェック
              if (Math.abs(mY - nY) == 1 && mX - nX == -1) {
                return false;
              }
              return true;
            }
            break;
          case "K":
            // 隣接一マス以内なら動ける（もっと簡単にかけそう
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            break;
          case "B":
            if (Math.abs(mX - nX) == Math.abs(mY - nY)) {
              // 右上または左下に移動している
              if (
                (Math.min(mX, nX) == mX && Math.min(mY, nY) == nY) ||
                (Math.min(mX, nX) == nX && Math.min(mY, nY) == mY)
              ) {
                for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                  if (this.board[i][mX + mY - i] != "-") {
                    return false;
                  }
                }
              } else {
                // 左上または右下に移動している
                for (let i = 1; i < Math.abs(mX - nX); i++) {
                  if (
                    this.board[Math.min(mX, nX) + i][Math.min(mY, nY) + i] !=
                    "-"
                  ) {
                    return false;
                  }
                }
              }
              return true;
            }
            break;
          case "R":
            if (Math.abs(mY - nY) == 0) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            if (Math.abs(mX - nX) == 0) {
              for (let i = Math.min(mY, nY) + 1; i < Math.max(mY, nY); i++) {
                if (this.board[mX][i] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          case "P":
            if (nX == mX - 1 && mY == nY) {
              return true;
            }
            break;
          case "B+":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            if (Math.abs(mX - nX) == Math.abs(mY - nY)) {
              // 右上または左下に移動している
              if (
                (Math.min(mX, nX) == mX && Math.min(mY, nY) == nY) ||
                (Math.min(mX, nX) == nX && Math.min(mY, nY) == mY)
              ) {
                for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                  if (this.board[i][mX + mY - i] != "-") {
                    return false;
                  }
                }
              } else {
                // 左上または右下に移動している
                for (let i = 1; i < Math.abs(mX - nX); i++) {
                  if (
                    this.board[Math.min(mX, nX) + i][Math.min(mY, nY) + i] !=
                    "-"
                  ) {
                    return false;
                  }
                }
              }
              return true;
            }
            break;
          case "R+":
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              return true;
            }
            if (Math.abs(mY - nY) == 0) {
              for (let i = Math.min(mX, nX) + 1; i < Math.max(mX, nX); i++) {
                if (this.board[i][mY] != "-") {
                  return false;
                }
              }
              return true;
            }
            if (Math.abs(mX - nX) == 0) {
              for (let i = Math.min(mY, nY) + 1; i < Math.max(mY, nY); i++) {
                if (this.board[mX][i] != "-") {
                  return false;
                }
              }
              return true;
            }
            break;
          default:
            // まずは玉の動きを指定
            if (Math.abs(mX - nX) <= 1 && Math.abs(mY - nY) <= 1) {
              // 斜め後ろに動いたかどうかをチェック
              if (Math.abs(mY - nY) == 1 && mX - nX == -1) {
                return false;
              }
              return true;
            }
            break;
        }
        return false;
      }
    },
    // コマが移動可能かどうかを判定し、真理値を返す関数
    isMovable(mX, mY, nX, nY, nPiece) {
      // 持ち駒を打つ場合、移動先が空マスなら移動可能
      if (this.moves.isCaptured) {
        try {
          if (this.board[mX][mY] == "-") {
            this.moves.mX = nX;
            this.moves.mY = nY;
            return true;
          }
        } catch (error) {
          return false;
        }
        return false;
      }

      // 同じ位置を選んだら選択を解除する
      if (mX == nX && mY == nY) {
        this.moves.mX = null;
        this.moves.mY = null;
        this.moves.isPicked = false;
        return false;
      }

      // 動き上コマが移動できない場所だったら
      if (!this.checkBitBoard(mX, mY, nX, nY, nPiece)) {
        return false;
      }

      // 移動先が空マスであれば移動できる
      if (this.board[mX][mY] == "-") {
        return true;
      }

      // 移動先が相手のコマであれば移動できる
      if (this.moves.turn % 2) {
        if (this.board[mX][mY].match(/[A-Z]/) != null) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.board[mX][mY].match(/[a-z]/) != null) {
          return true;
        } else {
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