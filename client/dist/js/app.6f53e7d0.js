(function(t){function e(e){for(var a,r,n=e[0],l=e[1],d=e[2],m=0,u=[];m<n.length;m++)r=n[m],i[r]&&u.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);c&&c(e);while(u.length)u.shift()();return o.push.apply(o,d||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],a=!0,n=1;n<s.length;n++){var l=s[n];0!==i[l]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},i={app:0},o=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=e,n=n.slice();for(var d=0;d<n.length;d++)e(n[d]);var c=l;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var a=s("c21b"),i=s.n(a);i.a},"08ee":function(t,e,s){},2435:function(t,e,s){},"3e59":function(t,e,s){"use strict";var a=s("2435"),i=s.n(a);i.a},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},o=[],r=(s("034f"),s("2877")),n={},l=Object(r["a"])(n,i,o,!1,null,null,null);l.options.__file="App.vue";var d=l.exports,c=s("8c4f"),m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"boards container-fluid"},[s("div",{staticClass:"row header bg-primary text-white text-align-center"},[t._m(0),s("div",{staticClass:"col-md-1 text-align-right mt-4"},[s("button",{staticClass:"btn btn-success",on:{click:t.logout}},[t._v("Logout")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-3"},[s("label",{staticClass:"mt-3 underline new-board",attrs:{for:"createNewBoard"}},[t._v("Create a New Board")]),s("form",{on:{submit:function(e){return e.preventDefault(),t.addBoard(e)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.title,expression:"newBoard.title"}],attrs:{type:"text",placeholder:"Title",rows:"1",required:""},domProps:{value:t.newBoard.title},on:{input:function(e){e.target.composing||t.$set(t.newBoard,"title",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],staticClass:"form-control",attrs:{id:"createNewBoard",placeholder:"Description of your new amazing board",row:"3",cols:"20"},domProps:{value:t.newBoard.description},on:{input:function(e){e.target.composing||t.$set(t.newBoard,"description",e.target.value)}}})]),s("button",{staticClass:"btn btn-outline-primary",attrs:{type:"submit"}},[t._v("Create Board")])])]),s("div",{staticClass:"col-md-9"},[s("div",{staticClass:"row"},t._l(t.boards,function(e){return s("div",{key:e._id,staticClass:"card border-primary mb-3 col-md-3 ml-3 mt-3 p-0",staticStyle:{"max-width":"15rem"}},[s("div",{staticClass:"card-header"},[s("router-link",{attrs:{to:{name:"board",params:{boardId:e._id}}}},[s("strong",[t._v(t._s(e.title))])]),t._v("\n            |\n            "),s("span",{staticClass:"clickable",on:{click:function(s){t.deleteBoard(e._id)}}},[s("i",{staticClass:"fa fa-trash-o"})])],1),s("div",{staticClass:"card-body"},[s("p",{staticClass:"card-text"},[t._v(t._s(e.description))])]),s("div",{staticClass:"card-footer p-0"},[s("p",{staticClass:"card-text"},[s("small",{staticClass:"text-muted"},[s("strong",[t._v("Created")]),t._v(": "+t._s(e.created))])])])])}))])])])},u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-md-11 mt-4"},[s("h1",[t._v("Boards on Boards!")])])}],p={name:"boards",created(){this.$store.state.user._id||this.$router.push({name:"login"})},mounted(){this.$store.dispatch("getBoards")},data(){return{newBoard:{title:"",description:""}}},computed:{boards(){return this.$store.state.boards},lists(){return this.$store.state.lists},tasks(){return this.$store.state.tasks}},methods:{deleteBoard(t){this.lists[t]&&this.lists[t].forEach(t=>{this.tasks[t._id].forEach(t=>{this.$store.dispatch("deleteTaskComments",t._id)}),this.$store.dispatch("deleteListTasks",t._id)}),this.$store.dispatch("deleteBoardLists",t),this.$store.dispatch("deleteBoard",t)},addBoard(){this.$store.dispatch("addBoard",this.newBoard),this.newBoard={title:"",description:""}},logout(){this.$store.dispatch("logout")}}},v=p,h=(s("ffba"),Object(r["a"])(v,m,u,!1,null,"60888326",null));h.options.__file="Boards.vue";var k=h.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"board container-fluid"},[s("div",{staticClass:"row bg-primary text-white"},[s("div",{staticClass:"col-md-4"},[s("form",{staticClass:"mt-5 mb-5",on:{submit:function(e){return e.preventDefault(),t.addList(e)}}},[s("h3",[t._v("Add New List")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.title,expression:"newList.title"}],staticClass:"form-control-lg",attrs:{name:"new-list",type:"text",placeholder:"list title",required:""},domProps:{value:t.newList.title},on:{input:function(e){e.target.composing||t.$set(t.newList,"title",e.target.value)}}}),s("button",{staticClass:"btn-lg btn-secondary ml-2",attrs:{type:"submit"}},[t._v("Create List")])])]),s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"underline"},[t.activeBoard.title?s("h1",{staticClass:"mt-3"},[t._v(t._s(t.activeBoard.title))]):t._e()]),s("h5",{staticClass:"mb-4 mt-3"},[t._v(t._s(t.activeBoard.description))])]),s("div",{staticClass:"col-md-4 text-right"},[s("div",{attrs:{id:"nav"}},[s("router-link",{attrs:{to:"/"}},[s("h5",{staticClass:"clickable inline"},[t._v("Back to Main Page   |")])]),s("h5",{staticClass:"clickable inline",on:{click:t.logout}},[t._v("  Logout")])],1)])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8"},[s("div",{staticClass:"row"},t._l(t.boardLists,function(e){return s("div",{key:e._id,staticClass:"col-md-3"},[s("List",{attrs:{list:e,boardId:t.boardId,activeTask:t.activeTask},on:{showDetail:t.showDetail,hideDetails:t.hideDetails}})],1)}))]),s("div",{staticClass:"col-md-4 detail-jar"},[s("TaskDetail",{attrs:{activeTask:t.activeTask,detailVisible:t.detailVisible},on:{hideDetails:t.hideDetails}})],1)])])},g=[],f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"list mt-5"},[s("div",{staticClass:"underline mb-3"},[s("h2",{staticClass:"text-primary"},[s("strong",[t._v(t._s(t.list.title))])])]),s("button",{staticClass:"btn btn-success",on:{click:function(e){t.deleteList(t.list)}}},[t._v("DELETE LIST")]),s("button",{staticClass:"btn btn-success ml-3",on:{click:function(e){t.taskFormVisible=!t.taskFormVisible}}},[t._v("Add Task")]),t.taskFormVisible?s("form",{staticClass:"form-group mt-2",on:{submit:function(e){e.preventDefault(),t.addTask(t.list._id)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.title,expression:"newTask.title"}],staticClass:"form-control",attrs:{type:"text",name:"title",placeholder:"task title"},domProps:{value:t.newTask.title},on:{input:function(e){e.target.composing||t.$set(t.newTask,"title",e.target.value)}}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newTask.description,expression:"newTask.description"}],staticClass:"form-control",attrs:{name:"description",rows:"5",placeholder:"description"},domProps:{value:t.newTask.description},on:{input:function(e){e.target.composing||t.$set(t.newTask,"description",e.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.assignee,expression:"newTask.assignee"}],staticClass:"form-control",attrs:{type:"text",name:"assignee",placeholder:"task assigned to"},domProps:{value:t.newTask.assignee},on:{input:function(e){e.target.composing||t.$set(t.newTask,"assignee",e.target.value)}}}),s("select",{directives:[{name:"model",rawName:"v-model",value:t.newTask.status,expression:"newTask.status"}],staticClass:"form-control",attrs:{name:"status"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.newTask,"status",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"To-do",selected:""}},[t._v("To-do")]),s("option",{attrs:{value:"In-work"}},[t._v("In-work")]),s("option",{attrs:{value:"Complete"}},[t._v("Complete")])]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.estTime,expression:"newTask.estTime"}],staticClass:"form-control",attrs:{type:"text",name:"estTime",placeholder:"estimated duration (hrs)"},domProps:{value:t.newTask.estTime},on:{input:function(e){e.target.composing||t.$set(t.newTask,"estTime",e.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.startDate,expression:"newTask.startDate"}],staticClass:"form-control",attrs:{type:"date",name:"startDate",placeholder:"start date (YYYY/MM/DD)"},domProps:{value:t.newTask.startDate},on:{input:function(e){e.target.composing||t.$set(t.newTask,"startDate",e.target.value)}}}),s("br"),s("button",{staticClass:"btn btn-primary mt-2",attrs:{type:"submit"}},[t._v("Create Task")])]):t._e(),s("drop",{staticClass:"drop list pl-2 pr-2 pt-3 pb-5 mt-2",on:{drop:function(e){var s=arguments.length,a=Array(s);while(s--)a[s]=arguments[s];t.handleDrop.apply(void 0,[t.list].concat(a))}}},t._l(t.taskList,function(e){return s("drag",{key:e._id,staticClass:"mt-3 drag",class:(a={},a[e]=!0,a),attrs:{"transfer-data":{task:e}}},[s("Task",{attrs:{task:e,list:t.list,activeTask:t.activeTask},on:{showDetail:t.showDetail,hideDetails:t.hideDetails}})],1);var a}))],1)},_=[],w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task card border-primary mb-3"},[s("div",{staticClass:"card-header bg-secondary text-white text-center"},[s("h3",[s("span",{staticClass:"clickable right",on:{click:function(e){t.showDetail(t.task)}}},[s("i",{staticClass:"fa fa-ellipsis-h"})]),t._v("  \n      "),s("span",{staticClass:"clickable",on:{click:function(e){t.deleteTask(t.task)}}},[s("i",{staticClass:"fa fa-trash-o"})])])]),s("div",{staticClass:"card-body",class:[{todo:"To-do"==t.task.status},{inwork:"In-work"==t.task.status},{complete:"Complete"==t.task.status}]},[s("h4",{staticClass:"card-title text-primary"},[s("strong",[t._v(t._s(t.task.title))])]),s("p",{staticClass:"card-text"},[t._v(t._s(t.task.description))])]),s("div",{staticClass:"card-body"},[s("button",{staticClass:"btn btn-primary disabled clickable",on:{click:function(e){t.commentFormVisible=!t.commentFormVisible}}},[t._v("Add Comment")]),t.commentFormVisible?s("form",{staticClass:"form-group mt-2 bg-light",on:{submit:function(e){e.preventDefault(),t.addComment(t.task._id)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment.description,expression:"newComment.description"}],attrs:{type:"text",name:"description",placeholder:"comment here"},domProps:{value:t.newComment.description},on:{input:function(e){e.target.composing||t.$set(t.newComment,"description",e.target.value)}}}),s("br"),s("button",{staticClass:"btn btn-success disabled mt-2 clickable",attrs:{type:"submit"}},[t._v("Create Comment")])]):t._e()])])},C=[],T={name:"Task",props:["list","task","activeTask"],data(){return{commentFormVisible:!1,newComment:{description:"",taskId:"",userName:""}}},methods:{deleteTask(t){this.$store.dispatch("deleteTask",t),t==this.activeTask&&this.$parent.$emit("hideDetails")},showDetail(t){this.$emit("showDetail",t)},addComment(t){this.newComment.taskId=t,this.newComment.userName=this.userName,this.$store.dispatch("addComment",this.newComment),this.newComment={description:"",taskId:"",userName:""},this.commentFormVisible=!1}},computed:{userName(){return this.$store.state.user.name}}},y=T,D=(s("3e59"),Object(r["a"])(y,w,C,!1,null,"2268789a",null));D.options.__file="Task.vue";var $=D.exports,I=s("df76"),x={name:"List",props:["list","boardId"],components:{Task:$,Drag:I["Drag"],Drop:I["Drop"]},data(){return{taskFormVisible:!1,newTask:{title:"",description:"",assignee:"",status:"",estTime:"",startDate:void 0,listId:"",boardId:this.boardId}}},methods:{deleteList(t){this.taskList.forEach(t=>{this.$store.dispatch("deleteTaskComments",t._id)}),this.$store.dispatch("deleteList",t)},addTask(t){this.newTask.listId=t,this.$store.dispatch("addTask",this.newTask),this.newTask={title:"",description:"",assignee:"",status:"",estTime:"",startDate:void 0,boardId:this.boardId},this.taskFormVisible=!1},showDetail(t){this.$emit("showDetail",t)},hideDetails(){this.$parent.$emit("hideDetails")},handleDrop(t,e){this.$store.dispatch("moveTask",{taskId:e.task._id,oldListId:e.task.listId,newListId:t._id})}},computed:{taskList(){return this.$store.state.tasks[this.list._id]},activeTask(){return this.$store.state.activeTask}}},L=x,B=(s("f5f2"),Object(r["a"])(L,f,_,!1,null,"5535cff2",null));B.options.__file="List.vue";var U=B.exports,V=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.detailVisible?s("div",{staticClass:"task-details mt-5 bg-light p-3 slideInRight animated"},[s("div",{staticClass:"underline"},[s("h1",{staticClass:"text-primary"},[s("strong",[t._v(t._s(t.activeTask.title)+"   "),s("span",{on:{click:t.hideDetails}},[s("i",{staticClass:"fa fa-minus-circle clickable"})])])])]),s("h4",{staticClass:"mt-4 mb-3"},[s("strong",[t._v("Description")]),t._v(": "+t._s(t.activeTask.description)+" ")]),s("ul",[s("li",[s("strong",[t._v("Status")]),t._v(": "+t._s(t.activeTask.status)+"   "),s("span",{staticClass:"clickable",on:{click:function(e){t.statusFormVisible=!t.statusFormVisible}}},[s("i",{staticClass:"fa fa-edit"})])]),t.statusFormVisible?s("form",{staticClass:"form-inline",on:{submit:function(e){e.preventDefault(),t.updateTaskStatus()}}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.taskUpdate.status,expression:"taskUpdate.status"}],staticClass:"form-control",attrs:{name:"status"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.taskUpdate,"status",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"To-do",selected:""}},[t._v("To-do")]),s("option",{attrs:{value:"In-work"}},[t._v("In-work")]),s("option",{attrs:{value:"Complete"}},[t._v("Complete")])]),s("button",{staticClass:"btn btn-primary ml-2",attrs:{type:"Submit"}},[t._v("Submit")])]):t._e(),s("li",[s("strong",[t._v("Estimate")]),t._v(": "+t._s(t.activeTask.estTime)+"   "),s("span",{staticClass:"clickable",on:{click:function(e){t.estimateFormVisible=!t.estimateFormVisible}}},[s("i",{staticClass:"fa fa-edit"})])]),t.estimateFormVisible?s("form",{staticClass:"form-inline",on:{submit:function(e){e.preventDefault(),t.updateTaskEstimate()}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.taskUpdate.estTime,expression:"taskUpdate.estTime"}],staticClass:"form-control",attrs:{type:"number",name:"estimate"},domProps:{value:t.taskUpdate.estTime},on:{input:function(e){e.target.composing||t.$set(t.taskUpdate,"estTime",e.target.value)}}}),s("button",{staticClass:"btn btn-primary ml-2",attrs:{type:"Submit"}},[t._v("Submit")])]):t._e(),s("li",[s("strong",[t._v("Assignee")]),t._v(": "+t._s(t.activeTask.assignee)+"   "),s("span",{staticClass:"clickable",on:{click:function(e){t.assigneeFormVisible=!t.assigneeFormVisible}}},[s("i",{staticClass:"fa fa-edit"})])]),t.assigneeFormVisible?s("form",{staticClass:"form-inline",on:{submit:function(e){e.preventDefault(),t.updateTaskAssignee()}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.taskUpdate.assignee,expression:"taskUpdate.assignee"}],staticClass:"form-control",attrs:{type:"text",name:"assignee"},domProps:{value:t.taskUpdate.assignee},on:{input:function(e){e.target.composing||t.$set(t.taskUpdate,"assignee",e.target.value)}}}),s("button",{staticClass:"btn btn-primary ml-2",attrs:{type:"Submit"}},[t._v("Submit")])]):t._e(),s("li",[s("strong",[t._v("Start Date")]),t._v(": "+t._s(t.activeTask.startDate)+"   "),s("span",{staticClass:"clickable",on:{click:function(e){t.startDateFormVisible=!t.startDateFormVisible}}},[s("i",{staticClass:"fa fa-edit"})])]),t.startDateFormVisible?s("form",{staticClass:"form-inline",on:{submit:function(e){e.preventDefault(),t.updateTaskStartDate()}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.taskUpdate.startDate,expression:"taskUpdate.startDate"}],staticClass:"form-control",attrs:{type:"date",name:"startDate"},domProps:{value:t.taskUpdate.startDate},on:{input:function(e){e.target.composing||t.$set(t.taskUpdate,"startDate",e.target.value)}}}),s("button",{staticClass:"btn btn-primary ml-2",attrs:{type:"Submit"}},[t._v("Submit")])]):t._e(),s("li",[s("strong",[t._v("Created")]),t._v(": "+t._s(t.activeTask.created))])]),s("h2",{staticClass:"text-primary underline"},[t._v("Comments")]),s("ul",[s("hr"),t._l(t.comments,function(e){return s("li",{key:e._id},[s("strong",[t._v(t._s(e.userName))]),t._v("   "+t._s(e.description)+"\n        "),s("span",{on:{click:function(s){t.deleteComment(e)}}},[s("i",{staticClass:"fa fa-trash clickable"})]),s("hr")])})],2)]):t._e()},F=[],N={name:"TaskDetail",props:["detailVisible"],data(){return{taskUpdate:{status:"",estTime:"",assignee:"",startDate:void 0},statusFormVisible:!1,estimateFormVisible:!1,assigneeFormVisible:!1,startDateFormVisible:!1}},methods:{deleteComment(t){this.$store.dispatch("deleteComment",t)},hideDetails(){this.$emit("hideDetails")},updateTaskStatus(){this.$store.dispatch("updateTaskStatus",{taskId:this.activeTask._id,listId:this.activeTask.listId,status:this.taskUpdate.status}),this.statusFormVisible=!1,this.taskUpdate.status=""},updateTaskEstimate(){this.$store.dispatch("updateTaskEstimate",{taskId:this.activeTask._id,listId:this.activeTask.listId,estTime:this.taskUpdate.estTime}),this.estimateFormVisible=!1,this.taskUpdate.estTime=""},updateTaskAssignee(){this.$store.dispatch("updateTaskAssignee",{taskId:this.activeTask._id,listId:this.activeTask.listId,assignee:this.taskUpdate.assignee}),this.assigneeFormVisible=!1,this.taskUpdate.assignee=""},updateTaskStartDate(){this.$store.dispatch("updateTaskStartDate",{taskId:this.activeTask._id,listId:this.activeTask.listId,startDate:this.taskUpdate.startDate}),this.startDateFormVisible=!1,this.taskUpdate.startDate=void 0}},computed:{comments(){return this.$store.state.comments[this.activeTask._id]},tasks(){return this.$store.state.tasks[this.activeTask.listId]},activeTask(){return this.$store.state.activeTask}}},S=N,E=(s("e57b"),Object(r["a"])(S,V,F,!1,null,"bd8b3bc4",null));E.options.__file="TaskDetail.vue";var P=E.exports,A={name:"board",created(){this.$store.state.user._id||this.$router.push({name:"login"})},mounted(){this.$route.params.boardId;this.$store.dispatch("setActiveBoard",this.boardId)},components:{List:U,Task:$,TaskDetail:P},props:["boardId"],data(){return{newList:{title:"",boardId:this.boardId},detailVisible:!1}},methods:{addList(){this.$store.dispatch("addList",this.newList),this.newList={title:"",boardId:this.boardId}},showDetail(t){this.$store.dispatch("setActiveTask",t),this.detailVisible=!0},hideDetails(){this.detailVisible=!1},logout(){this.$store.dispatch("logout")}},computed:{boardLists(){return this.$store.state.lists[this.boardId]},activeBoard(){return this.$store.state.activeBoard},activeTask(){return this.$store.state.activeTask}}},O=A,j=(s("a32a"),Object(r["a"])(O,b,g,!1,null,"45d403d9",null));j.options.__file="Board.vue";var M=j.exports,R=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login container-fluid"},[t._m(0),s("div",{staticClass:"row",attrs:{id:"image"}},[s("div",{staticClass:"col-md-3 mt-3"},[s("div",{staticClass:"form-container"},[t.loginForm?s("form",{on:{submit:function(e){return e.preventDefault(),t.loginUser(e)}}},[s("h1",{staticClass:"underline"},[t._v("Login")]),s("div",{staticClass:"form-group mt-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.creds.email,expression:"creds.email"}],attrs:{type:"email",placeholder:"email"},domProps:{value:t.creds.email},on:{input:function(e){e.target.composing||t.$set(t.creds,"email",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.creds.password,expression:"creds.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.creds.password},on:{input:function(e){e.target.composing||t.$set(t.creds,"password",e.target.value)}}}),s("br"),s("button",{staticClass:"btn btn-lg btn-outline-primary mt-2",attrs:{type:"submit"}},[t._v("Login")])])]):s("form",{on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[s("h1",{staticClass:"underline"},[t._v("Register")]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.name,expression:"newUser.name"}],attrs:{type:"text",placeholder:"name"},domProps:{value:t.newUser.name},on:{input:function(e){e.target.composing||t.$set(t.newUser,"name",e.target.value)}}}),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.email,expression:"newUser.email"}],attrs:{type:"email",placeholder:"email"},domProps:{value:t.newUser.email},on:{input:function(e){e.target.composing||t.$set(t.newUser,"email",e.target.value)}}}),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.password,expression:"newUser.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.newUser.password},on:{input:function(e){e.target.composing||t.$set(t.newUser,"password",e.target.value)}}}),s("button",{staticClass:"btn btn-outline-primary",attrs:{type:"submit"}},[t._v("Create Account")])])])]),s("div",{staticClass:"text-primary",on:{click:function(e){t.loginForm=!t.loginForm}}},[t.loginForm?s("h4",[t._v("No account?"),s("br"),s("button",{staticClass:"btn btn-primary btn-lg"},[t._v("Register")])]):s("h4",[t._v("Already have an account? "),s("br"),s("button",{staticClass:"btn btn-primary btn-lg"},[t._v("Login")])])])])])])},Y=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row header bg-primary text-white text-align-center"},[s("div",{staticClass:"col-md-12 mt-4"},[s("h1",[t._v("Welcome to BoardTown")])])])}],q={name:"login",data(){return{loginForm:!0,creds:{email:"",password:""},newUser:{email:"",password:"",name:""}}},methods:{register(){this.$store.dispatch("register",this.newUser)},loginUser(){this.$store.dispatch("login",this.creds)}}},J=q,z=(s("e49b"),Object(r["a"])(J,R,Y,!1,null,"63a71304",null));z.options.__file="Login.vue";var W=z.exports;a["a"].use(c["a"]);var G=new c["a"]({routes:[{path:"/",name:"boards",component:k},{path:"/board/:boardId",name:"board",props:!0,component:M},{path:"/login",name:"login",component:W},{path:"*",redirect:"/"}]}),H=s("2f62"),K=s("bc3a"),Q=s.n(K);a["a"].use(H["a"]);let X=!window.location.host.includes("localhost"),Z=X?"//board-on-boards.herokuapp.com/":"//localhost:3000/",tt=Q.a.create({baseURL:Z+"auth/",timeout:3e3,withCredentials:!0}),et=Q.a.create({baseURL:Z+"api/",timeout:3e3,withCredentials:!0});var st=new H["a"].Store({state:{user:{},boards:[],activeBoard:{},lists:{},tasks:{},comments:{},activeTask:{}},mutations:{setUser(t,e){t.user=e,console.log("user",t.user)},logout(t){t.user={},t.boards=[],t.activeBoard={},t.lists={},t.tasks={},t.comments={},G.push({name:"login"})},setBoards(t,e){t.boards=e,t.boards.forEach(t=>{t.created=new Date(t.created).toDateString()})},setActiveBoard(t,e){t.activeBoard=t.boards.find(t=>t._id==e),console.log("activeBoard = ",t.activeBoard)},deleteBoardLists(t,e){delete t.lists[e]},setLists(t,e){a["a"].set(t.lists,e.boardId,e.lists)},deleteListTasks(t,e){delete t.tasks[e]},setTasks(t,e){a["a"].set(t.tasks,e.listId,e.tasks),t.tasks[e.listId].forEach(s=>{s.created=new Date(s.created).toISOString().substring(0,10),s.startDate&&(s.startDate=s.startDate.substring(0,10)),t.activeTask._id&&(t.activeTask=e.tasks.find(e=>{return e._id=t.activeTask._id})),G.push({path:"/board/"+t.activeBoard._id})})},setActiveTask(t,e){t.activeTask=e},setComments(t,e){a["a"].set(t.comments,e.taskId,e.comments),G.push({path:"/board/"+t.activeBoard._id})},deleteTaskComments(t,e){delete t.comments[e]}},actions:{register({commit:t,dispatch:e},s){tt.post("register",s).then(e=>{t("setUser",e.data),G.push({name:"boards"})})},authenticate({commit:t,dispatch:e}){tt.get("authenticate").then(e=>{t("setUser",e.data),G.push({name:"boards"})})},login({commit:t,dispatch:e},s){tt.post("login",s).then(e=>{t("setUser",e.data),G.push({name:"boards"})})},logout({commit:t,dispatch:e}){tt.delete("logout").then(e=>{console.log(e.data),t("logout")}).catch(t=>console.log(t.message))},getBoards({commit:t,dispatch:e}){et.get("boards").then(e=>{t("setBoards",e.data)})},addBoard({commit:t,dispatch:e},s){et.post("boards",s).then(t=>{e("getBoards")})},deleteBoard({commit:t,dispatch:e},s){et.delete("boards/"+s).then(t=>{e("getBoards")})},setActiveBoard({commit:t,dispatch:e},s){t("setActiveBoard",s),e("getLists",s)},getLists({commit:t,dispatch:e},s){et.get("lists/by-board/"+s).then(a=>{t("setLists",{boardId:s,lists:a.data}),a.data.forEach(t=>{e("getTasks",t._id)})}).catch(t=>console.log(t.message))},addList({commit:t,dispatch:e},s){et.post("lists/",s).then(t=>{e("getLists",s.boardId)})},deleteList({commit:t,dispatch:e},s){et.delete("lists/"+s._id).then(t=>{e("deleteListTasks",s._id),e("getLists",s.boardId)}).catch(t=>console.log(t.message))},deleteBoardLists({commit:t,dispatch:e},s){et.delete("lists/by-board/"+s).then(e=>{t("deleteBoardLists",s)}).catch(t=>console.log(t.message))},getTasks({commit:t,dispatch:e},s){et.get("tasks/by-list/"+s).then(a=>{t("setTasks",{listId:s,tasks:a.data}),a.data.forEach(t=>{e("getComments",t._id)})}).catch(t=>console.log(t.message))},setActiveTask({commit:t,dispatch:e},s){t("setActiveTask",s)},addTask({commit:t,dispatch:e},s){et.post("tasks/",s).then(t=>{e("getTasks",s.listId)}).catch(t=>console.log(t.message))},moveTask({commit:t,dispatch:e},s){et.put("/tasks/"+s.taskId,{listId:s.newListId}).then(t=>{e("getTasks",s.oldListId),e("getTasks",s.newListId)}).catch(t=>console.log(t.message))},updateTaskStatus({commit:t,dispatch:e},s){et.put("/tasks/"+s.taskId,{status:s.status}).then(t=>{e("getTasks",s.listId)}).catch(t=>console.log(t.message))},updateTaskEstimate({commit:t,dispatch:e},s){et.put("/tasks/"+s.taskId,{estTime:s.estTime}).then(t=>{e("getTasks",s.listId)}).catch(t=>console.log(t.message))},updateTaskAssignee({commit:t,dispatch:e},s){et.put("/tasks/"+s.taskId,{assignee:s.assignee}).then(t=>{e("getTasks",s.listId)}).catch(t=>console.log(t.message))},updateTaskStartDate({commit:t,dispatch:e},s){et.put("/tasks/"+s.taskId,{startDate:s.startDate}).then(t=>{e("getTasks",s.listId)}).catch(t=>console.log(t.message))},deleteTask({commit:t,dispatch:e},s){et.delete("tasks/"+s._id).then(t=>{e("deleteTaskComments",s._id),e("getTasks",s.listId)}).catch(t=>console.log(t.message))},deleteListTasks({commit:t,dispatch:e},s){et.delete("tasks/by-list/"+s).then(e=>{t("deleteListTasks",s)}).catch(t=>console.log(t.message))},addComment({commit:t,dispatch:e},s){et.post("comments/",s).then(t=>{console.log("add comment: ",t.data),e("getComments",s.taskId)})},getComments({commit:t,dispatch:e},s){et.get("comments/by-task/"+s).then(e=>{t("setComments",{taskId:s,comments:e.data})}).catch(t=>console.log(t.message))},deleteComment({commit:t,dispatch:e},s){et.delete("comments/"+s._id).then(t=>{e("getComments",s.taskId)}).catch(t=>console.log(t.message))},deleteTaskComments({commit:t,dispatch:e},s){et.delete("/comments/by-task/"+s).then(e=>{t("deleteTaskComments",s)}).catch(t=>console.log(t.message))}}});a["a"].config.productionTip=!1,new a["a"]({router:G,store:st,created(){this.$store.dispatch("authenticate")},render:t=>t(d)}).$mount("#app")},"57ae":function(t,e,s){},"9ba7":function(t,e,s){},a32a:function(t,e,s){"use strict";var a=s("ab1d"),i=s.n(a);i.a},ab1d:function(t,e,s){},c144:function(t,e,s){},c21b:function(t,e,s){},e49b:function(t,e,s){"use strict";var a=s("9ba7"),i=s.n(a);i.a},e57b:function(t,e,s){"use strict";var a=s("57ae"),i=s.n(a);i.a},f5f2:function(t,e,s){"use strict";var a=s("08ee"),i=s.n(a);i.a},ffba:function(t,e,s){"use strict";var a=s("c144"),i=s.n(a);i.a}});
//# sourceMappingURL=app.6f53e7d0.js.map