(this.webpackJsonphiekkalaatikko=this.webpackJsonphiekkalaatikko||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(15),o=n.n(c),r=n(6),i=n(3),a=n(2),u=n(0),s=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[e.content,Object(u.jsxs)("button",{onClick:n,children:[" ",c," "]})]})},l=n(4),j=n.n(l),f="api/notes",b=function(){return j.a.get(f).then((function(t){return t.data}))},d=function(t){return j.a.post(f,t).then((function(t){return t.data}))},m=function(t,e){return j.a.put("".concat(f,"/").concat(t),e).then((function(t){return t.data}))},O=function(t){var e=t.message;return console.log(e),null===e?null:Object(u.jsx)("div",{className:"error",children:e})},h=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},p=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],c=e[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),j=l[0],f=l[1],p=Object(a.useState)(!1),v=Object(i.a)(p,2),x=v[0],g=v[1],k=Object(a.useState)(null),S=Object(i.a)(k,2),y=S[0],w=S[1];Object(a.useEffect)((function(){console.log("effect"),b().then((function(t){c(t)}))}),[]);var N=x?n:n.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(O,{message:y}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(u.jsx)("ul",{children:N.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),o=Object(r.a)(Object(r.a)({},e),{},{important:!e.important});m(t,o).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(o){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:j,date:(new Date).toISOString(),important:Math.random()>.5};d(e).then((function(t){c(n.concat(t)),f("")}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),f(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(h,{})]})};n(39);o.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.3bda3a51.chunk.js.map