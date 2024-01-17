import{v as A,r as C,d as l,b as t,w as s,a,e as f,o as i,f as r,u as c,F as g,g as h,t as _,n as T,p as U,h as q}from"./app-262a2786.js";import{_ as z}from"./ActionMessage-10225983.js";import{_ as $}from"./ActionSection-72bf6f02.js";import{C as w}from"./Checkbox-4bd22b28.js";import{_ as L}from"./ConfirmationModal-555a1821.js";import{_ as O}from"./DangerButton-8bd23b7f.js";import{_ as S}from"./DialogModal-370dc470.js";import{_ as Y}from"./FormSection-8e6c7726.js";import{_ as E}from"./InputError-5f2d5f55.js";import{_ as b}from"./InputLabel-0afd5ac9.js";import{_ as I}from"./PrimaryButton-a709ea04.js";import{_ as P}from"./SecondaryButton-d3277a63.js";import{S as V}from"./SectionBorder-35e93445.js";import{_ as B}from"./TextInput-bbe8df5b.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import"./SectionTitle-9e468a0a.js";import"./Modal-e32cf43d.js";const H=d=>(U("data-v-f598c658"),d=d(),q(),d),J={class:"col-span-6 sm:col-span-4"},K={key:0,class:"col-span-6"},Q={class:"mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"},W={style:{"align-items":"flex-start"},class:"flex items-center"},X={class:"ml-2 text-sm text-gray-600 capitalize"},Z={key:0},ee={class:"mt-10 sm:mt-0"},se={class:"space-y-6"},te={class:"break-all"},oe={class:"flex items-center ml-2"},ae={key:0,class:"text-sm text-gray-400"},ne=["onClick"],le=["onClick"],ie={key:1},re={class:"mt-10 sm:mt-0"},ce={class:"space-y-6"},de={class:"break-all"},me={class:"flex items-center ml-2"},ue={key:0,class:"text-sm text-gray-400"},pe=["onClick"],fe=H(()=>a("div",null," Please copy your new API token. For your security, it won't be shown again. ",-1)),_e={key:0,class:"mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all"},ve={class:"col-span-6 sm:col-span-4 mb-4"},ke={class:"mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"},ye={style:{"align-items":"flex-start"},class:"flex items-center"},ge={class:"ml-2 text-sm text-gray-600 capitalize"},he={__name:"ApiTokenManager",props:{tokens:{type:Object,default:()=>({})},availablePermissions:{type:Array,default:()=>[]},defaultPermissions:{type:Array,default:()=>[]},apiRoutes:{type:Array,default:()=>[]},canReadTokens:{type:Boolean,default:!1},canCreateTokens:{type:Boolean,default:!1},canDeleteTokens:{type:Boolean,default:!1},canEditTokens:{type:Boolean,default:!1}},setup(d){const n=A({name:"",permissions:d.defaultPermissions}),m=A({name:"",permissions:[]}),x=A({}),y=C(!1),v=C(null),k=C(null),j=()=>{n.clearErrors(),n.name==""&&n.setError("name","Name required."),n.permissions.length===0&&n.setError("name","At least one permission required."),!(Object.keys(n.errors).length>0)&&n.post(route("tokens.store"),{preserveScroll:!0,onSuccess:()=>{y.value=!0,n.reset()},onError:()=>{y.value=!1,n.focus()}})},D=u=>{m.permissions=u.abilities,m.name=u.name,v.value=u},F=()=>{m.clearErrors(),m.permissions.length===0&&m.setError("name","At least one permission required."),!(Object.keys(m.errors).length>0)&&m.put(route("tokens.update",v.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>v.value=null,onError:()=>{m.focus()}})},N=u=>{k.value=u},M=()=>{x.delete(route("tokens.destroy",k.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>k.value=null})},R=u=>{console.log(u)};return(u,o)=>(i(),l("div",null,[t(Y,{onSubmitted:j},{title:s(()=>[r(" Create API Token ")]),description:s(()=>[r(" API tokens allow third-party services to authenticate with our application on your behalf. ")]),form:s(()=>[a("div",J,[t(b,{for:"name",value:"Name"}),t(B,{id:"name",modelValue:c(n).name,"onUpdate:modelValue":o[0]||(o[0]=e=>c(n).name=e),type:"text",class:"mt-1 block w-full"},null,8,["modelValue"]),t(E,{message:c(n).errors.name,class:"mt-2"},null,8,["message"])]),d.availablePermissions.length>0?(i(),l("div",K,[t(b,{for:"permissions",value:"Permissions"}),a("div",Q,[(i(!0),l(g,null,h(d.availablePermissions,e=>(i(),l("div",{key:e},[a("label",W,[t(w,{checked:c(n).permissions,"onUpdate:checked":o[1]||(o[1]=p=>c(n).permissions=p),value:e},null,8,["checked","value"]),a("span",X,_(e),1)])]))),128))])])):f("",!0)]),actions:s(()=>[t(z,{on:c(n).recentlySuccessful,class:"mr-3"},{default:s(()=>[r(" Created. ")]),_:1},8,["on"]),t(I,{class:T({"opacity-25":c(n).processing}),disabled:c(n).processing},{default:s(()=>[r(" Create ")]),_:1},8,["class","disabled"])]),_:1}),d.tokens.length>0?(i(),l("div",Z,[t(V),a("div",ee,[t($,null,{title:s(()=>[r(" Manage API Tokens ")]),description:s(()=>[r(" You may delete any of your existing tokens if they are no longer needed. ")]),content:s(()=>[a("div",se,[(i(!0),l(g,null,h(d.tokens,e=>(i(),l("div",{key:e.id,class:"flex items-center justify-between"},[a("div",te,_(e.name),1),a("div",oe,[e.last_used_ago?(i(),l("div",ae," Last used "+_(e.last_used_ago),1)):f("",!0),d.availablePermissions.length>0?(i(),l("button",{key:1,class:"cursor-pointer ml-6 text-sm text-gray-400 underline",onClick:p=>D(e)}," Permissions ",8,ne)):f("",!0),a("button",{class:"cursor-pointer ml-6 text-sm text-red-500",onClick:p=>N(e)}," Delete ",8,le)])]))),128))])]),_:1})])])):f("",!0),d.apiRoutes.length>0?(i(),l("div",ie,[t(V),a("div",re,[t($,null,{title:s(()=>[r(" Manage API Routes ")]),description:s(()=>[r(" Currently, routes cannot be edited or deleted. ")]),content:s(()=>[a("div",ce,[(i(!0),l(g,null,h(d.apiRoutes,(e,p)=>(i(),l("div",{key:p,class:"flex items-center justify-between"},[a("div",de,_(e),1),a("div",me,[d.canEditTokens?(i(),l("div",ue," Last used "+_(p)+" days ago ",1)):f("",!0),d.canEditTokens?(i(),l("button",{key:1,class:"cursor-pointer ml-6 text-sm text-gray-400 underline",onClick:xe=>R(e)}," Manage Endpoint ",8,pe)):f("",!0)])]))),128))])]),_:1})])])):f("",!0),t(S,{show:y.value,onClose:o[3]||(o[3]=e=>y.value=!1)},{title:s(()=>[r(" API Token ")]),content:s(()=>[fe,u.$page.props.jetstream.flash.token?(i(),l("div",_e,_(u.$page.props.jetstream.flash.token),1)):f("",!0)]),footer:s(()=>[t(P,{onClick:o[2]||(o[2]=e=>y.value=!1)},{default:s(()=>[r(" Close ")]),_:1})]),_:1},8,["show"]),t(S,{show:v.value!=null,onClose:o[7]||(o[7]=e=>v.value=null)},{title:s(()=>[r(" API Token Permissions ")]),content:s(()=>[a("div",ve,[t(b,{for:"name",value:"Name"}),t(B,{id:"name",modelValue:c(m).name,"onUpdate:modelValue":o[4]||(o[4]=e=>c(m).name=e),type:"text",class:"mt-1 block w-full opacity-70",disabled:""},null,8,["modelValue"]),t(E,{message:c(m).errors.name,class:"mt-2"},null,8,["message"])]),a("div",null,[t(b,{for:"permissions",value:"Permissions"}),a("div",ke,[(i(!0),l(g,null,h(d.availablePermissions,e=>(i(),l("div",{key:e},[a("label",ye,[t(w,{checked:c(m).permissions,"onUpdate:checked":o[5]||(o[5]=p=>c(m).permissions=p),value:e},null,8,["checked","value"]),a("span",ge,_(e),1)])]))),128))])])]),footer:s(()=>[t(P,{onClick:o[6]||(o[6]=e=>v.value=null)},{default:s(()=>[r(" Cancel ")]),_:1}),t(I,{class:T(["ml-3",{"opacity-25":c(m).processing}]),disabled:c(m).processing,onClick:F},{default:s(()=>[r(" Save ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),t(L,{show:k.value!=null,onClose:o[9]||(o[9]=e=>k.value=null)},{title:s(()=>[r(" Delete API Token ")]),content:s(()=>[r(" Are you sure you would like to delete this API token? ")]),footer:s(()=>[t(P,{onClick:o[8]||(o[8]=e=>k.value=null)},{default:s(()=>[r(" Cancel ")]),_:1}),t(O,{class:T(["ml-3",{"opacity-25":c(x).processing}]),disabled:c(x).processing,onClick:M},{default:s(()=>[r(" Delete ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])]))}},Ue=G(he,[["__scopeId","data-v-f598c658"]]);export{Ue as default};