"use strict";(self.webpackChunknode_complete_social_network_prep=self.webpackChunknode_complete_social_network_prep||[]).push([[571],{571:(e,a,n)=>{n.r(a),n.d(a,{default:()=>f});var l=n(5043),t=n(6325),o=n(9352),s=n(8279),i=n(5969),r=n(8757),d=n(5376),m=n(6446),c=n(8613),u=n(5865),p=n(9657),h=n(1906),v=n(8903),x=n(8446),w=n(5475),g=n(579);const A=(0,s.A)({palette:{mode:"dark"}});function f(e){let{onLogin:a}=e;const[n,s]=(0,l.useState)({email:{value:"",valid:!1,touched:!1,validators:[o.mw,o.Rp]},password:{value:"",valid:!1,touched:!1,validators:[o.mw,(0,o.Bw)({min:5})]}}),[f,j]=(0,l.useState)(!1),_=(e,a)=>{let l=!0;for(const s of n[e].validators)l=l&&s(a);const t={...n,[e]:{...n[e],valid:l,value:a}};let o=!0;for(const n in t)o=o&&t[n].valid;s(t),j(o)},b=e=>{s({...n,[e]:{...n[e],touched:!0}})};return(0,g.jsx)(i.A,{theme:A,children:(0,g.jsxs)(r.A,{component:"main",maxWidth:"xs",children:[(0,g.jsx)(d.Ay,{}),(0,g.jsxs)(m.A,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,g.jsx)(c.A,{sx:{m:1,bgcolor:"secondary.main"},children:(0,g.jsx)(t.A,{})}),(0,g.jsx)(u.A,{component:"h1",variant:"h5",children:"Sign in"}),(0,g.jsxs)(m.A,{component:"form",onSubmit:e=>{e.preventDefault(),a(e,{email:n.email.value,password:n.password.value})},noValidate:!0,sx:{mt:1},children:[(0,g.jsx)(p.A,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,value:n.email.value,onChange:e=>_("email",e.target.value),onBlur:()=>b("email"),error:!n.email.valid&&n.email.touched}),(0,g.jsx)(p.A,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:n.password.value,onChange:e=>_("password",e.target.value),onBlur:()=>b("password"),error:!n.password.valid&&n.password.touched}),(0,g.jsx)(h.A,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:!f,children:"Sign In"}),(0,g.jsx)(v.Ay,{container:!0,children:(0,g.jsx)(v.Ay,{item:!0,children:(0,g.jsx)(x.A,{component:w.N_,to:"/signup",variant:"body2",children:"Don't have an account? Sign Up"})})})]})]})]})})}},9352:(e,a,n)=>{n.d(a,{Bw:()=>t,Rp:()=>o,mw:()=>l});const l=e=>""!==e.trim(),t=e=>a=>{let n=!0;return e.min&&(n=n&&a.trim().length>=e.min),e.max&&(n=n&&a.trim().length<=e.max),n},o=e=>/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)}}]);
//# sourceMappingURL=571.7be48019.chunk.js.map