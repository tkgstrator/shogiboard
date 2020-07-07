<template>
  <div class="shogiboard">
    <div class="player">
      <p>☖後手</p>
      <div class="capture">
        <p
          v-for="(num, key) in capture.white"
          :key="key"
          @click="pickPiece({mX:-1, mY:-1, mPiece:key}, true)"
        >
          <template v-if="num != 0">{{ pieces[key.toUpperCase()] }}{{ num }}</template>
        </p>
      </div>
    </div>
    <div class="board">
      <div v-for="(item, i) in board" :key="i" class="container">
        <div v-for="(piece, j) in item" :key="j" class="edge">
          <p
            :class="{'blackP': piece.match(/[A-Z]/), 'whiteP': piece.match(/[a-z]/), 'isSelect': (i == moves.prev.mX) && (j == moves.prev.mY), 'empty': piece.match(/[-]/)}"
            @click="pickPiece({mX:i, mY:j, mPiece:piece}, false)"
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
          @click="pickPiece({mX:-1, mY:-1, mPiece:key}, true)"
        >
          <template
            v-if="num != 0"
            :class="{'isSelect': (-1 == moves.mX) && (moves.turn % 2 ==0) && (moves.mPiece == key)}"
          >{{ pieces[key] }}</template>
          <template v-if="num != 0">{{ num }}</template>
        </p>
      </div>
    </div>
    <div class="control">
      <ul class="center-block">
        <li>
          <v-icon size="6.0vw" color="#67c5ff">mdi-skip-backward-outline</v-icon>
        </li>
        <li>
          <v-icon size="6.0vw" color="#67c5ff" @click="popLast()">mdi-menu-left-outline</v-icon>
        </li>
        <li>
          <v-icon size="6.0vw" color="#67c5ff" @click="getPosition(1, true)">mdi-menu-right-outline</v-icon>
        </li>
        <li>
          <v-icon size="6.0vw" color="#67c5ff">mdi-skip-forward-outline</v-icon>
        </li>
      </ul>
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
      startpos: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL",
      position: [],
      board: [[], [], [], [], [], [], [], [], []],
      shogiboard: [[], [], [], [], [], [], [], [], []], // 表示用のやつ
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
        "+L": "杏",
        "+N+": "圭",
        "+S": "全",
        "+B": "馬",
        "+R": "龍",
        "+P": "と"
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
        isPicked: false,
        prev: {
          mX: null,
          mY: null,
          mPiece: null,
          isCaptured: false
        },
        next: {
          mX: null,
          mY: null,
          mPiece: null,
          isPromoted: false
        }
      }
    };
  },
  computed: {},
  mounted() {
    // console.log(this.document);
  },
  watch: {
    document: {
      // ドキュメントが変更されたとき実行する関数
      // immediateをtrueにするとこの関数内ではdocumentを呼び出せない
      immediate: false,
      handler() {
        // 指し手が0ではなかったら最後の局面を出力する
        this.position = this.document["position"];
        if (this.document["position"].length == 0) {
          db.collection("KIF")
            .doc("SFEN")
            .update({
              position: [
                "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 0"
              ]
            });
        }
        let sfenboard = this.position.pop();
        let sfen = sfenboard.split(/[/\s]/);
        this.moves.turn = parseInt(sfen.slice(11, 12).toString());

        var board = [[], [], [], [], [], [], [], [], []];
        sfen.slice(0, 9).forEach(function(value, index) {
          Array.from(value).forEach(function(piece, id) {
            // console.log(value, index, piece, id);
            // 数字の場合
            if (piece.match(/[1-9]/))
              for (let i = 0; i < piece; i++) board[index].push("-");
            // コマの場合
            if (piece.match(/[A-z]/)) {
              if (value.substr(id - 1, 1).match(/[+]/))
                board[index].push("+" + piece);
              else board[index].push(piece);
            }
          }, this);
        }, board);
        console.log("Document:", board);
        // this.shogiboard = board;
        this.board = board;
      }
    }
  },
  methods: {
    buildSfen() {
      var sfen = this.board.toString().replace(/[,]/g, "");

      var sfenboard = "";
      Array.prototype.forEach.call(sfen, function(value) {
        sfenboard += value;
        if (!(sfenboard.replace(/[+/]/g, "").length % 9)) sfenboard += "/";
      });
      sfenboard = sfenboard
        .replace(/---------/g, "9")
        .replace(/--------/g, "8")
        .replace(/-------/g, "7")
        .replace(/------/g, "6")
        .replace(/-----/g, "5")
        .replace(/----/g, "4")
        .replace(/---/g, "3")
        .replace(/--/g, "2")
        .replace(/-/g, "1");
      // console.log(sfenboard);
      // 手番情報を加える
      sfenboard += this.moves.turn % 2 ? "w " : "b ";
      // 持ち駒情報を加える
      let capture = JSON.parse(JSON.stringify(this.capture));
      var pieces = "";
      Object.keys(capture).forEach(function(player) {
        Object.keys(this[player]).forEach(function(capture) {
          if (this[capture] != 0)
            pieces += (this[capture] == 1 ? "" : this[capture]) + capture;
        }, this[player]);
      }, capture);
      sfenboard +=
        (pieces === "" ? "- " : pieces + " ") + this.moves.turn.toString();
      return sfenboard;
    },
    popLast() {
      let position = this.position.slice(0, this.position.length);
      db.collection("KIF")
        .doc("SFEN")
        .update({
          position: position
        });
    },
    getPosition() {
      var isPromoted = false;
      var move = this.moves.usi[this.moves.turn]
        .replace(/a/g, "1")
        .replace(/b/g, "2")
        .replace(/c/g, "3")
        .replace(/d/g, "4")
        .replace(/e/g, "5")
        .replace(/f/g, "6")
        .replace(/g/g, "7")
        .replace(/h/g, "8")
        .replace(/i/g, "9");

      // 駒台から打った場合
      if (move.match(/\*/)) {
        let piece = move[0];
        move = "10" + move.substr(2, 2);
        let prev = {
          mX: -1,
          mY: -1,
          mPiece: this.moves.turn % 2 ? piece.toLowerCase() : piece
        };
        let next = {
          mX: parseInt((move % 100) % 10) - 1,
          mY: 9 - parseInt((move % 100) / 10),
          mPiece: this.board[parseInt((move % 100) % 10) - 1][
            9 - parseInt((move % 100) / 10)
          ]
        };
        this.movePiece(prev, next, true, false, false);
        return;
      }
      if (move.match(/\+/)) {
        isPromoted = true;
        move = move.replace(/\+/, "");
      }
      let prev = {
        mX: parseInt((move / 100) % 10) - 1,
        mY: 9 - parseInt(move / 100 / 10),
        mPiece: this.board[parseInt((move / 100) % 10) - 1][
          9 - parseInt(move / 100 / 10)
        ]
      };
      let next = {
        mX: parseInt((move % 100) % 10) - 1,
        mY: 9 - parseInt((move % 100) / 10),
        mPiece: this.board[parseInt((move % 100) % 10) - 1][
          9 - parseInt((move % 100) / 10)
        ]
      };
      console.log(move, prev, next);
      this.movePiece(prev, next, false, isPromoted, false);
    },
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
    selectPiece(current, isCaptured) {
      // 空マスは選択できない
      if (current.mPiece == "-") {
        return;
      }
      // 手番と違うコマは選択できない
      if (this.moves.turn % 2 == 0 && current.mPiece.match(/[A-Z]/) == null) {
        return;
      }
      if (this.moves.turn % 2 == 1 && current.mPiece.match(/[a-z]/) == null) {
        return;
      }
      this.moves.isPicked = true;
      this.moves.prev.mX = current.mX;
      this.moves.prev.mY = current.mY;
      this.moves.prev.mPiece = current.mPiece;
      this.moves.prev.isCaptured = isCaptured;
      return;
    },
    movePiece(prev, next, isPlayer = true) {
      // USI形式の指し手表示
      var usi_move = "";

      // 移動先が空マスでなければ手駒に加える
      if (next.mPiece != "-") {
        if (next.mPiece.match(/[a-z]/)) {
          this.capture.black[next.mPiece.toUpperCase().replace("+", "")] += 1;
        } else {
          this.capture.white[next.mPiece.toLowerCase().replace("+", "")] += 1;
        }
      }

      // 盤から動かした場合、成り判定を加える
      if (!prev.isCaptured) {
        // 成るかどうかのチェック
        usi_move =
          9 -
          prev.mY +
          this.rank[prev.mX + 1] +
          (9 - next.mY) +
          this.rank[next.mX + 1];
        // 移動元を空マスにする
        this.board[prev.mX].splice(prev.mY, 1, "-");
        // 成り判定を加えてコマを置く
        if (this.isPromoted(prev.mX, next.mX, prev.mPiece)) {
          usi_move += "+";
          this.board[next.mX].splice(next.mY, 1, "+" + prev.mPiece);
        } else {
          this.board[next.mX].splice(next.mY, 1, prev.mPiece);
        }
      }

      // 駒台から打った場合、駒台から一枚減らす
      if (prev.isCaptured) {
        usi_move =
          prev.mPiece.toUpperCase() +
          "*" +
          (9 - next.mY) +
          this.rank[next.mX + 1];
        // 手番の持ち駒を一つ減らす
        if (prev.mPiece.match(/[A-Z]/)) {
          this.capture.black[prev.mPiece.replace("+", "")] -= 1;
        } else {
          this.capture.white[prev.mPiece.replace("+", "")] -= 1;
        }
        // 打ったコマを盤におく
        this.board[next.mX].splice(next.mY, 1, prev.mPiece);
      }
      // 手番を一つ増やす
      this.moves.turn += 1;

      // コマの選択を解除する
      this.moves.prev.mX = null;
      this.moves.prev.mY = null;
      this.moves.isPicked = false;

      // 結果を出力する
      console.log(this.moves.turn, usi_move, this.buildSfen(), isPlayer);
      this.position.push(this.buildSfen());
      db.collection("KIF")
        .doc("SFEN")
        .update({
          position: this.position
        });

      // プレイヤーが指したのであれば更新する
      // if (isPlayer) {
      //   this.moves.usi.push(usi_move);
      //   db.collection("KIF")
      //     .doc("SFEN")
      //     .update({
      //       moves: this.moves.usi
      //     });
      // }
    },
    // コマを選択する
    pickPiece(current, isCaptured) {
      // コマを選択した状態なら
      if (this.moves.isPicked) {
        // 前状態を読み込む
        let prev = this.moves.prev;
        // コマが動かせるかチェックする
        if (this.isMovable(prev, current)) {
          // 動かせるなら動かす
          this.movePiece(prev, current);
          return;
        }
        // コマが動かせないならそのコマを選択する
        return;
      }
      // そのコマを選択する
      if (!this.moves.isPicked) {
        // console.log("コマを選択しました");
        this.selectPiece(current, isCaptured);
        return;
      }
    },
    checkBitBoard(prev, next) {
      let nX = prev.mX;
      let nY = prev.mY;
      let mX = next.mX;
      let mY = next.mY;
      let nPiece = prev.mPiece;
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
    isMovable(prev, next) {
      // console.log("isMovable", prev, next, prev.isCaptured);
      // 持ち駒を打つ場合、移動先が空マスなら移動可能
      if (prev.isCaptured) {
        // console.log("持ち駒を打ちます");
        if (this.board[next.mX][next.mY] == "-") {
          return true;
        }
        return false;
      }

      // 同じ位置を選んだら選択を解除する
      if (prev.mX == next.mX && prev.mY == next.mY) {
        this.moves.prev.mX = null;
        this.moves.prev.mY = null;
        this.moves.isPicked = false;
        return false;
      }

      // 動き上コマが移動できない場所だったら
      if (!this.checkBitBoard(prev, next)) {
        return false;
      }

      // 移動先が空マスであれば移動できる
      if (this.board[next.mX][next.mY] == "-") {
        return true;
      }

      // 移動先が相手のコマであれば移動できる
      if (this.moves.turn % 2) {
        if (this.board[next.mX][next.mY].match(/[A-Z]/) != null) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.board[next.mX][next.mY].match(/[a-z]/) != null) {
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
  /* display: block; */
  /* margin: 0 auto; */
  text-align: center;
  font-family: "Sawarabi Mincho";
}

.board {
  display: inline-block;
  margin: 0 auto;
  /* position: relative; */
  border: solid 2px #000000;
}

/* 盤の中に適応 */
.board p {
  font-size: 6.3vw;
  /* margin-bottom: 0px !important; */
}

.player {
  display: flex;
  justify-content: center;
  font-size: 4.5vw;
  /* text-align: center; */
  margin-bottom: 0px !important;
}

.capture {
  display: inline-flex;
  /* justify-content: right; */
  padding-left: 2vw !important;
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

.center-block {
  padding: 0 auto;
  text-align: center;
}

.v-icon {
  list-style: none;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  border: solid 3px #67c5ff;
  border-radius: 3px;
  transition: 0.4s;
  cursor: pointer;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.v-icon:hover {
  background: #67c5ff;
}

li {
  display: inline-block;
}
</style>