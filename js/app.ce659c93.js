(function(e){function t(t){for(var r,i,c=t[0],s=t[1],u=t[2],p=0,f=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var s=n[c];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/ShogiBoard/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"23a9":function(e,t,n){},2518:function(e,t,n){"use strict";var r=n("23a9"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("ShogiBoard")],1)],1)},a=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"shogiboard"}},e._l(e.board,(function(t,r){return n("div",{key:r,staticClass:"container"},e._l(t[0],(function(t,o){return n("div",{key:o,staticClass:"edge"},[n("p",{class:{blackP:t.match(/[A-Z]/),whiteP:t.match(/[a-z]/),isSelect:9*r+(o+1)==e.isSelect,empty:t.match(/[-]/)},on:{click:function(n){return e.move(r,o,t)}}},[e._v(e._s(t.match(/[A-z]/)?e.pieces[t.toUpperCase()]:"-"))])])})),0)})),0)},c=[],s=(n("4160"),n("a630"),n("a434"),n("a9e3"),n("ac1f"),n("3ca3"),n("5319"),n("1276"),n("159b"),n("0ff2")),u=n("59ca"),l=n.n(u);n("e71f");r["a"].use(s["a"]);var p=l.a.initializeApp({apiKey:"AIzaSyDZN80LeGf2IF2ab7PZwlNMD_SQtK_a7O0",authDomain:"shogiboard.firebaseapp.com",databaseURL:"https://shogiboard.firebaseio.com",projectId:"shogiboard",storageBucket:"shogiboard.appspot.com",messagingSenderId:"168671221298",appId:"1:168671221298:web:082e1d84a23cf6a5f7ce2b",measurementId:"G-R6YKTDL951"}),f=p.firestore(),d={name:"ShogiBoard",data:function(){return{document:[],startpos:String,position:String,moves:[],isSelect:Number,board:[[],[],[],[],[],[],[],[],[]],pieces:{L:"香",N:"桂",S:"銀",G:"金",K:"玉",B:"角",R:"飛",P:"歩"}}},computed:{},mounted:function(){},watch:{document:{immediate:!1,handler:function(){console.log("Document Watch"),this.startpos=this.document["startpos"].replace(/1/g,"-").replace(/2/g,"--").replace(/3/g,"---").replace(/4/g,"----").replace(/5/g,"-----").replace(/6/g,"------").replace(/7/g,"-------").replace(/8/g,"--------").replace(/9/g,"---------").split(/[/\s]/),this.startpos.forEach((function(e,t){this[t].splice(0,0,Array.from(e))}),this.board)}},board:{immediate:!0,handler:function(){}}},methods:{move:function(e,t,n){this.isSelect!=9*e+(t+1)?(this.isSelect=9*e+(t+1),console.log(e,t,n,this.isSelect)):this.isSelect=Number}},firestore:function(){return{document:f.collection("KIF").doc("SFEN")}}},h=d,m=(n("2518"),n("2877")),g=Object(m["a"])(h,i,c,!1,null,null,null),b=g.exports,v={name:"App",components:{ShogiBoard:b},data:function(){return{}}},S=v,y=n("6544"),_=n.n(y),w=n("7496"),O=n("f6c4"),j=Object(m["a"])(S,o,a,!1,null,null,null),B=j.exports;_()(j,{VApp:w["a"],VMain:O["a"]});var P=n("8c4f"),x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("ShogiBoard")],1)},k=[],I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("h1",[e._v("ShogiBoard")]),n("h2",[e._v(e._s(e.sfen))])])},A=[],E={name:"ShogiBoard",data:function(){return{sfen:[]}},methods:{},firestore:function(){return{sfen:f.collection("KIF").doc("SFEN")}}},N=E,K=n("a523"),M=Object(m["a"])(N,I,A,!1,null,null,null),C=M.exports;_()(M,{VContainer:K["a"]});var D={name:"ShogiBoard",components:{ShogiBoard:C}},F=D,$=Object(m["a"])(F,x,k,!1,null,null,null),z=$.exports;r["a"].use(P["a"]);var L=[{path:"/",name:"Home",component:z}],T=new P["a"]({mode:"hash",base:"/ShogiBoard/",routes:L}),G=T,R=n("f309");r["a"].use(R["a"]);var V=new R["a"]({});r["a"].config.productionTip=!1,new r["a"]({router:G,vuetify:V,render:function(e){return e(B)}}).$mount("#app")}});