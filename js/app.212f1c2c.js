(function(e){function t(t){for(var r,s,o=t[0],c=t[1],h=t[2],m=0,l=[];m<o.length;m++)s=o[m],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&l.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(l.length)l.shift()();return n.push.apply(n,h||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(r=!1)}r&&(n.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},i={app:0},n=[];function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/ShogiBoard/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var h=0;h<o.length;h++)t(o[h]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("8a23"),i=a.n(r);i.a},"23a9":function(e,t,a){},2518:function(e,t,a){"use strict";var r=a("23a9"),i=a.n(r);i.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ShogiBoard")},n=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shogiboard"},[a("div",{staticClass:"player"},[a("p",[e._v("☖後手")]),a("div",{staticClass:"capture"},e._l(e.capture.white,(function(t,r){return a("div",{key:r,on:{click:function(t){return e.pickPiece({mX:-1,mY:-1,mPiece:r},!0)}}},[0!=t?[a("p",{class:{isSelect:e.moves.prev.mPiece==r&&-1==e.moves.prev.mX}},[e._v(e._s(e.pieces[r.toUpperCase()])+e._s(t))])]:e._e()],2)})),0)]),a("div",{staticClass:"board"},e._l(e.board,(function(t,r){return a("div",{key:r,staticClass:"container"},e._l(t,(function(t,i){return a("div",{key:i,staticClass:"edge"},[a("p",{class:{blackP:t.match(/[A-Z]/),whiteP:t.match(/[a-z]/),isSelect:r==e.moves.prev.mX&&i==e.moves.prev.mY,empty:t.match(/[-]/)},on:{click:function(a){return e.pickPiece({mX:r,mY:i,mPiece:t},!1)}}},[e._v(e._s(t.match(/[A-z]/)?e.pieces[t.toUpperCase()]:"-"))])])})),0)})),0),a("div",{staticClass:"player"},[a("p",[e._v("☗先手")]),a("div",{staticClass:"capture"},e._l(e.capture.black,(function(t,r){return a("div",{key:r,on:{click:function(t){return e.pickPiece({mX:-1,mY:-1,mPiece:r},!0)}}},[0!=t?[a("p",{class:{isSelect:e.moves.prev.mPiece==r&&-1==e.moves.prev.mX}},[e._v(e._s(e.pieces[r])+e._s(t))])]:e._e()],2)})),0)]),a("div",{staticClass:"control"},[a("ul",{staticClass:"center-block"},[a("li",[a("v-icon",{attrs:{size:"6.0vw",color:"#67c5ff"},on:{click:function(t){return e.popPosition(0)}}},[e._v("mdi-skip-backward-outline")])],1),a("li",[a("v-icon",{attrs:{size:"6.0vw",color:"#67c5ff"},on:{click:function(t){return e.popPosition(-1)}}},[e._v("mdi-menu-left-outline")])],1)])])])},o=[],c=(a("4160"),a("a630"),a("fb6a"),a("a434"),a("b64b"),a("d3b7"),a("ac1f"),a("25f0"),a("3ca3"),a("466d"),a("5319"),a("1276"),a("159b"),a("96cf"),a("1da1")),h=a("0ff2"),u=a("59ca"),m=a.n(u);a("e71f");r["a"].use(h["a"]);var l=m.a.initializeApp({apiKey:"AIzaSyDZN80LeGf2IF2ab7PZwlNMD_SQtK_a7O0",authDomain:"shogiboard.firebaseapp.com",databaseURL:"https://shogiboard.firebaseio.com",projectId:"shogiboard",storageBucket:"shogiboard.appspot.com",messagingSenderId:"168671221298",appId:"1:168671221298:web:082e1d84a23cf6a5f7ce2b",measurementId:"G-R6YKTDL951"}),f=l.firestore(),p={name:"ShogiBoard",data:function(){return{document:[],startpos:"lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL",position:[],board:[[],[],[],[],[],[],[],[],[]],capture:{black:{L:0,N:0,S:0,G:0,B:0,R:0,P:0},white:{l:0,n:0,s:0,g:0,b:0,r:0,p:0}},pieces:{L:"香",N:"桂",S:"銀",G:"金",K:"玉",B:"角",R:"飛",P:"歩","+L":"杏","+N":"圭","+S":"全","+B":"馬","+R":"龍","+P":"と"},rank:{1:"a",2:"b",3:"c",4:"d",5:"e",6:"f",7:"g",8:"h",9:"i"},moves:{turn:0,isPicked:!1,prev:{mX:null,mY:null,mPiece:null,isCaptured:!1},next:{mX:null,mY:null,mPiece:null,isPromoted:!1}}}},computed:{},mounted:function(){},watch:{document:{immediate:!1,handler:function(){this.position=this.document["position"],0==this.document["position"].length&&f.collection("KIF").doc("SFEN").update({position:["lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 0"]});var e=this.position.slice(-1)[0],t=e.split(/[/\s]/);this.moves.turn=parseInt(t.slice(11,12).toString());var a=t.slice(10,11).toString().match(/[1-9]*[A-z]/g);null!=a?Array.prototype.forEach.call(a,(function(e){var t=e.match(/[A-z]/).toString(),a=null==e.match(/[1-9]/)?1:parseInt(e.match(/[1-9]/).toString());t.match(/[a-z]/)&&(this.white[t]=a),t.match(/[A-Z]/)&&(this.black[t]=a)}),this.capture):this.capture={black:{L:0,N:0,S:0,G:0,B:0,R:0,P:0},white:{l:0,n:0,s:0,g:0,b:0,r:0,p:0}};var r=[[],[],[],[],[],[],[],[],[]];t.slice(0,9).forEach((function(e,t){Array.from(e).forEach((function(a,i){if(a.match(/[1-9]/))for(var n=0;n<a;n++)r[t].push("-");a.match(/[A-z]/)&&(e.substr(i-1,1).match(/[+]/)?r[t].push("+"+a):r[t].push(a))}),this)}),r),this.board=r}}},methods:{buildSfen:function(){var e=this.board.toString().replace(/[,]/g,""),t="";Array.prototype.forEach.call(e,(function(e){t+=e,t.replace(/[+/]/g).length%9||"+"!=e&&(t+="/")})),t=t.replace(/---------/g,"9").replace(/--------/g,"8").replace(/-------/g,"7").replace(/------/g,"6").replace(/-----/g,"5").replace(/----/g,"4").replace(/---/g,"3").replace(/--/g,"2").replace(/-/g,"1"),t+=this.moves.turn%2?"w ":"b ";var a=JSON.parse(JSON.stringify(this.capture)),r="";return Object.keys(a).forEach((function(e){Object.keys(this[e]).forEach((function(e){0!=this[e]&&(r+=(1==this[e]?"":this[e])+e)}),this[e])}),a),t+=(""===r?"- ":r+" ")+this.moves.turn.toString(),t},popPosition:function(e){var t=this.position.slice(0,e);f.collection("KIF").doc("SFEN").update({position:t})},showDialog:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$dialog.confirm({title:"将棋にゃも v0.0.1",body:"成りますか？"},{okText:"不成",cancelText:"成"}).then((function(){return!1})).catch((function(){return!0}));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})))()},isPromoted:function(e,t,a){return null==a.match(/[+GKgk]/)&&(a.match(/[A-Z]/)?(e<=2||t<=2)&&this.showDialog():a.match(/[a-z]/)?(e>=6||t>=6)&&this.showDialog():void 0)},selectPiece:function(e,t){"-"!=e.mPiece&&(this.moves.turn%2==0&&null==e.mPiece.match(/[A-Z]/)||this.moves.turn%2==1&&null==e.mPiece.match(/[a-z]/)||(this.moves.isPicked=!0,this.moves.prev.mX=e.mX,this.moves.prev.mY=e.mY,this.moves.prev.mPiece=e.mPiece,this.moves.prev.isCaptured=t))},movePiece:function(e,t){var a=this;return Object(c["a"])(regeneratorRuntime.mark((function r(){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(i="","-"!=t.mPiece&&(t.mPiece.match(/[a-z]/)?a.capture.black[t.mPiece.toUpperCase().replace("+","")]+=1:a.capture.white[t.mPiece.toLowerCase().replace("+","")]+=1),e.isCaptured){r.next=13;break}return i=9-e.mY+a.rank[e.mX+1]+(9-t.mY)+a.rank[t.mX+1],a.board[e.mX].splice(e.mY,1,"-"),r.next=7,a.isPromoted(e.mX,t.mX,e.mPiece);case 7:if(!r.sent){r.next=12;break}i+="+",a.board[t.mX].splice(t.mY,1,"+"+e.mPiece),r.next=13;break;case 12:a.board[t.mX].splice(t.mY,1,e.mPiece);case 13:e.isCaptured&&(i=e.mPiece.toUpperCase()+"*"+(9-t.mY)+a.rank[t.mX+1],e.mPiece.match(/[A-Z]/)?a.capture.black[e.mPiece.replace("+","")]-=1:a.capture.white[e.mPiece.replace("+","")]-=1,a.board[t.mX].splice(t.mY,1,e.mPiece)),a.moves.turn+=1,a.moves.prev.mX=null,a.moves.prev.mY=null,a.moves.isPicked=!1,console.log(a.moves.turn,i,a.buildSfen()),a.position.push(a.buildSfen()),f.collection("KIF").doc("SFEN").update({position:a.position});case 21:case"end":return r.stop()}}),r)})))()},pickPiece:function(e,t){if(this.moves.isPicked){var a=this.moves.prev;return this.isMovable(a,e)?void this.movePiece(a,e):void 0}this.moves.isPicked||this.selectPiece(e,t)},checkBitBoard:function(e,t){var a=e.mX,r=e.mY,i=t.mX,n=t.mY,s=e.mPiece;if(s.match(/[A-Z]/)){switch(s.toUpperCase()){case"L":if(0==Math.abs(n-r)&&i<a){for(var o=Math.min(i,a)+1;o<Math.max(i,a);o++)if("-"!=this.board[o][n])return!1;return!0}break;case"N":if(1==Math.abs(n-r)&&i-a==-2)return!0;break;case"S":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return(0!=Math.abs(n-r)||i-a!=1)&&(1!=Math.abs(n-r)||0!=Math.abs(i-a));break;case"G":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return 1!=Math.abs(n-r)||i-a!=1;break;case"K":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;break;case"B":if(Math.abs(i-a)==Math.abs(n-r)){if(Math.min(i,a)==i&&Math.min(n,r)==r||Math.min(i,a)==a&&Math.min(n,r)==n){for(var c=Math.min(i,a)+1;c<Math.max(i,a);c++)if("-"!=this.board[c][i+n-c])return!1}else for(var h=1;h<Math.abs(i-a);h++)if("-"!=this.board[Math.min(i,a)+h][Math.min(n,r)+h])return!1;return!0}break;case"R":if(0==Math.abs(n-r)){for(var u=Math.min(i,a)+1;u<Math.max(i,a);u++)if("-"!=this.board[u][n])return!1;return!0}if(0==Math.abs(i-a)){for(var m=Math.min(n,r)+1;m<Math.max(n,r);m++)if("-"!=this.board[i][m])return!1;return!0}break;case"P":if(a==i+1&&n==r)return!0;break;case"+B":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;if(Math.abs(i-a)==Math.abs(n-r)){if(Math.min(i,a)==i&&Math.min(n,r)==r||Math.min(i,a)==a&&Math.min(n,r)==n){for(var l=Math.min(i,a)+1;l<Math.max(i,a);l++)if("-"!=this.board[l][i+n-l])return!1}else for(var f=1;f<Math.abs(i-a);f++)if("-"!=this.board[Math.min(i,a)+f][Math.min(n,r)+f])return!1;return!0}break;case"+R":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;if(0==Math.abs(n-r)){for(var p=Math.min(i,a)+1;p<Math.max(i,a);p++)if("-"!=this.board[p][n])return!1;return!0}if(0==Math.abs(i-a)){for(var b=Math.min(n,r)+1;b<Math.max(n,r);b++)if("-"!=this.board[i][b])return!1;return!0}break;default:if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return 1!=Math.abs(n-r)||i-a!=1;break}return!1}if(s.match(/[a-z]/)){switch(s.toUpperCase()){case"L":if(0==Math.abs(n-r)&&i>a){for(var d=Math.min(i,a)+1;d<Math.max(i,a);d++)if("-"!=this.board[d][n])return!1;return!0}break;case"N":if(1==Math.abs(n-r)&&i-a==2)return!0;break;case"S":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return(0!=Math.abs(n-r)||i-a!=-1)&&(1!=Math.abs(n-r)||0!=Math.abs(i-a));break;case"G":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return 1!=Math.abs(n-r)||i-a!=-1;break;case"K":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;break;case"B":if(Math.abs(i-a)==Math.abs(n-r)){if(Math.min(i,a)==i&&Math.min(n,r)==r||Math.min(i,a)==a&&Math.min(n,r)==n){for(var v=Math.min(i,a)+1;v<Math.max(i,a);v++)if("-"!=this.board[v][i+n-v])return!1}else for(var M=1;M<Math.abs(i-a);M++)if("-"!=this.board[Math.min(i,a)+M][Math.min(n,r)+M])return!1;return!0}break;case"R":if(0==Math.abs(n-r)){for(var P=Math.min(i,a)+1;P<Math.max(i,a);P++)if("-"!=this.board[P][n])return!1;return!0}if(0==Math.abs(i-a)){for(var k=Math.min(n,r)+1;k<Math.max(n,r);k++)if("-"!=this.board[i][k])return!1;return!0}break;case"P":if(a==i-1&&n==r)return!0;break;case"+B":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;if(Math.abs(i-a)==Math.abs(n-r)){if(Math.min(i,a)==i&&Math.min(n,r)==r||Math.min(i,a)==a&&Math.min(n,r)==n){for(var g=Math.min(i,a)+1;g<Math.max(i,a);g++)if("-"!=this.board[g][i+n-g])return!1}else for(var S=1;S<Math.abs(i-a);S++)if("-"!=this.board[Math.min(i,a)+S][Math.min(n,r)+S])return!1;return!0}break;case"+R":if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return!0;if(0==Math.abs(n-r)){for(var w=Math.min(i,a)+1;w<Math.max(i,a);w++)if("-"!=this.board[w][n])return!1;return!0}if(0==Math.abs(i-a)){for(var _=Math.min(n,r)+1;_<Math.max(n,r);_++)if("-"!=this.board[i][_])return!1;return!0}break;default:if(Math.abs(i-a)<=1&&Math.abs(n-r)<=1)return 1!=Math.abs(n-r)||i-a!=-1;break}return!1}},isMovable:function(e,t){return e.mX==t.mX&&e.mY==t.mY?(this.moves.prev.mX=null,this.moves.prev.mY=null,this.moves.isPicked=!1,!1):e.isCaptured?"-"==this.board[t.mX][t.mY]:!!this.checkBitBoard(e,t)&&("-"==this.board[t.mX][t.mY]||(this.moves.turn%2?null!=this.board[t.mX][t.mY].match(/[A-Z]/):null!=this.board[t.mX][t.mY].match(/[a-z]/)))}},firestore:function(){return{document:f.collection("KIF").doc("SFEN")}}},b=p,d=(a("2518"),a("2877")),v=a("6544"),M=a.n(v),P=a("132d"),k=Object(d["a"])(b,s,o,!1,null,null,null),g=k.exports;M()(k,{VIcon:P["a"]});var S=a("03a5"),w=a.n(S);a("c5c5");r["a"].use(w.a);var _={name:"App",components:{ShogiBoard:g},data:function(){return{}}},y=_,x=(a("034f"),Object(d["a"])(y,i,n,!1,null,null,null)),X=x.exports,Y=a("8c4f"),B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ShogiBoard")},C=[],O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("h1",[e._v("ShogiBoard")]),a("h2",[e._v(e._s(e.sfen))])])},N=[],j={name:"ShogiBoard",data:function(){return{sfen:[]}},methods:{},firestore:function(){return{sfen:f.collection("KIF").doc("SFEN")}}},A=j,R=a("a523"),z=Object(d["a"])(A,O,N,!1,null,null,null),E=z.exports;M()(z,{VContainer:R["a"]});var I={name:"ShogiBoard",components:{ShogiBoard:E}},K=I,L=Object(d["a"])(K,B,C,!1,null,null,null),G=L.exports;r["a"].use(Y["a"]);var F=[{path:"/",name:"Home",component:G}],Z=new Y["a"]({mode:"hash",base:"/ShogiBoard/",routes:F}),D=Z,U=a("f309");r["a"].use(U["a"]);var T=new U["a"]({});r["a"].config.productionTip=!1,new r["a"]({router:D,vuetify:T,render:function(e){return e(X)}}).$mount("#app")},"8a23":function(e,t,a){}});