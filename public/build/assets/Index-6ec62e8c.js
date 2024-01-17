import{J as F,r as y,i as N,q as P,v as I,c as L,w as d,o as l,a as s,t as c,l as k,m as z,u,d as p,b as m,g as C,F as B,e as R,z as A,f as $,n as D,O as U}from"./app-262a2786.js";import{_ as J}from"./AppLayout-ebba8cdf.js";import{_ as H}from"./FormSectionWide-371a92bf.js";import{_ as K}from"./PrimaryButton-a709ea04.js";import{_ as q}from"./SecondaryButton-d3277a63.js";import{T as G}from"./ToggleButton-2e04d601.js";import"./_plugin-vue_export-helper-c27b6911.js";const Q=s("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," AirPortal JFK Terminal 4 | Permissions ",-1),W={class:"py-4"},X={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Y={class:"flex mr-2 mb-2"},Z={class:"mt-8 mr-4 mb-4"},ee={id:"alertnotification",class:"flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3",role:"alert"},se=s("svg",{class:"fill-current w-4 h-4 mr-2",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},[s("path",{d:"M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"})],-1),te=["innerHTML"],re={class:"px-4 py-3 justify-end"},oe=s("title",null,"Close",-1),ie=s("path",{d:"M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"},null,-1),ae=[oe,ie],ne={id:"PermissionsTable",class:"bg-white overflow-hidden shadow-xl sm:rounded-lg"},le={class:"ml-2 text-gray-600 uppercase"},de=["id","name","category"],ce={key:0},pe={style:{float:"left","padding-top":"6px"}},ue=s("div",{style:{clear:"both"}},null,-1),me={href:"/permissions"},fe=s("span",{style:{width:"20px"}},null,-1),ye={__name:"Index",props:{currentPerms:{type:Object,default:()=>({})},permissions:{type:Object,default:()=>({})},user:{type:Object,default:()=>({})},userRole:{type:String,default:()=>""}},setup(b){const o=b,v=F(),f=y(!1);let h=y("");const _=N({get(){return h.value?h.value:v.props.flash.message},set(e){h.value=e}}),x=()=>{f.value=!0,document.getElementById("alertnotification")&&(document.getElementById("alertnotification").style="display:justify;")},M=()=>{f.value=!1,document.getElementById("alertnotification")&&(document.getElementById("alertnotification").style="display:none;")};P(v.props,function(e){e!=null&&e.flashMessage&&x()},{immediate:!0,deep:!0}),P(_,(e,i)=>{e&&x()},{immediate:!0,deep:!0});const g=I({permissions:o.currentPerms}),V=(e,i,a,t)=>{if(o.currentPerms[i]||o.currentPerms.push([r=>e]),a=="create"){let r=o.permissions[t].update;o.currentPerms[r]=e}if(a=="edit"){let r=o.permissions[t].store;o.currentPerms[r]=e}},S=e=>e.charAt(0).toUpperCase()+e.slice(1),E=e=>{switch(e){case"destroy":return"Delete";case"index":return"View";case"show":return"View";default:return S(e)}},O=()=>{g.put(route("permissions.update",o.user.id),{preserveScroll:!0,preserveState:!1,resetOnSuccess:!0})},j=e=>{let i="";return typeof e=="object"?(i+="Problem updating template! (records with issues marked in red)<br/>",Object.entries(e).forEach(a=>{const[t,r]=a;i+=r}),i):e},T=()=>{U.get(route("permissions.edit",o.user.id))};return(e,i)=>(l(),L(J,{title:"AirPortal JFK Terminal 4"},{header:d(()=>[Q]),default:d(()=>[s("div",W,[s("div",X,[s("div",Y,[s("div",Z," Permissions for: "+c(e.$page.props.user.first_name)+" "+c(e.$page.props.user.last_name)+" (ID: "+c(e.$page.props.user.id)+") | "+c(e.$page.props.userRole.toUpperCase()),1)]),k(s("div",ee,[se,s("p",{innerHTML:u(_)?j(u(_)):""},null,8,te),s("span",re,[(l(),p("svg",{class:"fill-current h-6 w-6 text-indigo-500",role:"button",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",onClick:i[0]||(i[0]=a=>M())},ae))])],512),[[z,f.value]]),m(H,{onSubmitted:O},{form:d(()=>[s("div",ne,[(l(!0),p(B,null,C(b.permissions,(a,t)=>(l(),p("div",{key:a.id,style:{width:"auto",padding:"20px 30px 25px 20px",margin:"15px",float:"left",border:"1px solid #e2e8f0","border-radius":"0.5em"}},[s("span",le,c(t=="planners"?"PLANNERS":t),1),(l(!0),p(B,null,C(a,(r,n)=>(l(),p("div",{id:t+"_"+n,key:t+"_"+n,name:n,category:t,style:{width:"175px","padding-left":"15px"}},[n!=="store"&&n!=="update"?(l(),p("div",ce,[s("div",pe,c(E(n))+": ",1),m(G,{modelValue:e.$page.props.currentPerms[r],"onUpdate:modelValue":w=>e.$page.props.currentPerms[r]=w,"on-label":"On","off-label":"Off",labelledby:"toggle-label",describedby:"toggle-description",disabled:e.$page.props.userRole=="super-admin","false-value":"false","true-value":"true",style:{float:"right"},classes:{container:"mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"},onChange:w=>V(w,r,n,t)},null,8,["modelValue","onUpdate:modelValue","disabled","onChange"]),ue])):R("",!0)],8,de))),128))]))),128))])]),actions:d(()=>[s("a",me,[m(q,{type:"button",onClick:A(T,["prevent"])},{default:d(()=>[$(" Reset ")]),_:1},8,["onClick"])]),fe,m(K,{class:D({"opacity-25":u(g).processing}),disabled:u(g).processing},{default:d(()=>[$(" Save ")]),_:1},8,["class","disabled"])]),_:1})])])]),_:1}))}};export{ye as default};
