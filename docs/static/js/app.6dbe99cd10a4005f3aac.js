webpackJsonp([1],{NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var l=o("VU/8")({name:"App"},n,!1,function(t){o("uC79")},null,null).exports,r=o("/ocq"),s=o("fZjL"),i=o.n(s),c=o("Gu7T"),u=o.n(c),m={name:"vote",data:function(){return{memberList:["刘志斌","刘钦铸","马文涛","柯艳琴","张贵","戴敏","熊龙辉","叶国良","许璠","王晓芳","艾小姚","姜明哲","王生资","孟腾飞","徐海","刘雅琴"],noVoteList:["刘志斌","刘钦铸","马文涛"],form:{oldGoodMember:"",allMember:"",voteA:"",voteB:""},tableData:{header:["","A","B","C","票数"],body:{A:{auth:{name:"A",noVote:!1},A:0,B:0,C:0,total:""},B:{auth:{name:"B",noVote:!0},A:0,B:0,C:0,total:""},C:{auth:{name:"C",noVote:!1},A:0,B:0,C:0,total:""}}}}},computed:{oldGoodMemList:function(){return""!==this.form.oldGoodMember?this.form.oldGoodMember.split(","):[]},allMemList:function(){return""!==this.form.allMember?this.form.allMember.split(","):[]},beVoteOpt:function(){var t=this,e=[];return this.memberList.forEach(function(o){if(!t.noVoteList.includes(o)){var a={};a.label=o,a.value=o,e.push(a)}}),e},memberOpt:function(){var t=[];return this.memberList.forEach(function(e){var o={};o.label=e,o.value=e,t.push(o)}),t}},watch:{allMemList:function(){this.memberList=this.allMemList,this.transTableData(this.allMemList)},oldGoodMemList:function(){this.noVoteList=this.oldGoodMemList,this.transNoVote(this.noVoteList)}},methods:{transTableData:function(t){var e=["","票数"];e.splice.apply(e,[1,0].concat(u()(t))),this.tableData.header=e;var o={};t.forEach(function(e){o[e]={};var a={},n={name:e,noVote:!1};a.auth=n,t.forEach(function(t){a[t]=0}),a.total="",o[e]=a}),this.tableData.body=o},transNoVote:function(t){var e=this.tableData.body;this.noVoteList.forEach(function(t){e[t].auth.noVote=!0})},handleVote:function(){var t=this.form,e=t.voteA,o=t.voteB;this.tableData.body[o][e]=1,this.calcVoteNumber()},calcVoteNumber:function(){var t=this.tableData.body;i()(t).forEach(function(e){var o=0;i()(t[e]).forEach(function(a){"auth"!==a&&"total"!==a&&(o+=+t[e][a])}),t[e].total=o})},isNoVote:function(t){return!0===t.noVote},showCol:function(t){return t.name?t.name:t},isColTitle:function(t){return!!t.noVote},isColHasVolter:function(t,e){return"total"===e&&t>0}},created:function(){this.transTableData(this.memberList),this.transNoVote(this.noVoteList)}},f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"vote-wrap"},[o("div",{staticClass:"show-wrap"},[o("div",{staticClass:"tb-head"},t._l(t.tableData.header,function(e,a){return o("div",{key:a,staticClass:"tb-head-col"},[t._v("\n        "+t._s(e)+"\n      ")])}),0),t._v(" "),o("div",{staticClass:"tb-body"},t._l(t.tableData.body,function(e,a){return o("div",{key:a,staticClass:"tb-row"},t._l(e,function(e,a){return o("div",{key:a,staticClass:"tb-col",class:{noVote:t.isNoVote(e),"col-title":t.isColTitle(e),"col-hasVoter":t.isColHasVolter(e,a)}},[t._v("\n          "+t._s(t.showCol(e))+"\n        ")])}),0)}),0)]),t._v(" "),o("div",{staticClass:"set-wrap"},[o("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"所有小伙伴"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.form.allMember,callback:function(e){t.$set(t.form,"allMember",e)},expression:"form.allMember"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"曾经周最佳"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.form.oldGoodMember,callback:function(e){t.$set(t.form,"oldGoodMember",e)},expression:"form.oldGoodMember"}})],1),t._v(" "),o("div",{staticClass:"vote"},[o("el-select",{attrs:{placeholder:"投票人"},model:{value:t.form.voteA,callback:function(e){t.$set(t.form,"voteA",e)},expression:"form.voteA"}},t._l(t.memberOpt,function(t,e){return o("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),o("span",[t._v("选")]),t._v(" "),o("el-select",{attrs:{placeholder:"得票人"},model:{value:t.form.voteB,callback:function(e){t.$set(t.form,"voteB",e)},expression:"form.voteB"}},t._l(t.beVoteOpt,function(t,e){return o("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.handleVote}},[t._v("确定")])],1)],1)],1)])},staticRenderFns:[]};var d=o("VU/8")(m,f,!1,function(t){o("Pcj9")},null,null).exports;a.default.use(r.a);var v=new r.a({routes:[{path:"/",name:"vote",component:d}]}),b=o("4DWU"),h=o.n(b);o("epTE");a.default.use(h.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:v,components:{App:l},template:"<App/>"})},Pcj9:function(t,e){},epTE:function(t,e){},uC79:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6dbe99cd10a4005f3aac.js.map