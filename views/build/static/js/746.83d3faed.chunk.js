"use strict";(self.webpackChunknode_complete_social_network_prep=self.webpackChunknode_complete_social_network_prep||[]).push([[746],{6746:(t,e,o)=>{o.r(e),o.d(e,{default:()=>d});var r=o(5043),n=o(2110),a=o(5865),s=o(6494),i=o(3216),c=o(579);const d=t=>{const[e,o]=(0,r.useState)({title:"",author:"",date:"",image:"",content:""}),{postId:d}=(0,i.g)();return(0,r.useEffect)((()=>{fetch("https://mkrolik-social-api-de4b456-s7k2op5jka-ew.a.run.app/feed/post/"+d,{headers:{Authorization:"Bearer "+t.token}}).then((t=>{if(200!==t.status)throw new Error("Failed to fetch status");return t.json()})).then((t=>{o({title:t.post.title,author:t.post.creator.name,image:t.post.imageUrl,date:new Date(t.post.createdAt).toLocaleDateString("en-US"),content:t.post.content})})).catch((t=>{console.log(t)}))}),[d,t.token]),(0,c.jsxs)(n.A,{style:{maxWidth:500,margin:"auto",border:"1px solid #000"},children:[(0,c.jsx)(a.A,{variant:"h5",component:"h2",children:e.title}),(0,c.jsxs)(a.A,{color:"textSecondary",gutterBottom:!0,children:["Created by ",e.author," on ",e.date]}),(0,c.jsx)("img",{src:e.image,alt:e.title,style:{width:"100%",height:"auto"}}),(0,c.jsx)(s.A,{children:(0,c.jsx)(a.A,{variant:"body2",component:"p",children:e.content})})]})}},2110:(t,e,o)=>{o.d(e,{A:()=>v});var r=o(8168),n=o(8587),a=o(5043),s=o(8387),i=o(8606),c=o(4535),d=o(2876),l=o(3336),u=o(7056),p=o(2400);function h(t){return(0,p.Ay)("MuiCard",t)}(0,u.A)("MuiCard",["root"]);var m=o(579);const A=["className","raised"],f=(0,c.Ay)(l.A,{name:"MuiCard",slot:"Root",overridesResolver:(t,e)=>e.root})((()=>({overflow:"hidden"}))),v=a.forwardRef((function(t,e){const o=(0,d.A)({props:t,name:"MuiCard"}),{className:a,raised:c=!1}=o,l=(0,n.A)(o,A),u=(0,r.A)({},o,{raised:c}),p=(t=>{const{classes:e}=t;return(0,i.A)({root:["root"]},h,e)})(u);return(0,m.jsx)(f,(0,r.A)({className:(0,s.A)(p.root,a),elevation:c?8:void 0,ref:e,ownerState:u},l))}))},6494:(t,e,o)=>{o.d(e,{A:()=>f});var r=o(8168),n=o(8587),a=o(5043),s=o(8387),i=o(8606),c=o(4535),d=o(2876),l=o(7056),u=o(2400);function p(t){return(0,u.Ay)("MuiCardContent",t)}(0,l.A)("MuiCardContent",["root"]);var h=o(579);const m=["className","component"],A=(0,c.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(t,e)=>e.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),f=a.forwardRef((function(t,e){const o=(0,d.A)({props:t,name:"MuiCardContent"}),{className:a,component:c="div"}=o,l=(0,n.A)(o,m),u=(0,r.A)({},o,{component:c}),f=(t=>{const{classes:e}=t;return(0,i.A)({root:["root"]},p,e)})(u);return(0,h.jsx)(A,(0,r.A)({as:c,className:(0,s.A)(f.root,a),ownerState:u,ref:e},l))}))}}]);
//# sourceMappingURL=746.83d3faed.chunk.js.map