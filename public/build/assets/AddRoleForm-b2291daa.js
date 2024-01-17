import{r as y,i as P,v as O,c as k,w as m,o as d,f as b,t as f,a as l,d as c,g as w,F as V,b as r,u as a,e as D,l as F,n as M,m as E}from"./app-262a2786.js";import{_ as T}from"./ActionMessage-10225983.js";import{_ as I}from"./FormSection-8e6c7726.js";import{_ as L}from"./InputError-5f2d5f55.js";import{_ as R}from"./InputLabel-0afd5ac9.js";import{_ as G}from"./PrimaryButton-a709ea04.js";import{_ as j}from"./SecondaryButton-d3277a63.js";import{_ as q}from"./TextInput-bbe8df5b.js";import{s as z}from"./vue-multiselect.css_vue_type_style_index_0_src_true_lang-cff1377d.js";import{T as x}from"./ToggleButton-2e04d601.js";import"./SectionTitle-9e468a0a.js";import"./_plugin-vue_export-helper-c27b6911.js";const K={class:"columns-1"},H={class:"mt-4 ml-6"},J=l("span",null,"Name:  ",-1),Q={style:{"font-weight":"900"}},W={class:"ml-6"},X=l("span",null,"Associated Account(s):  ",-1),Y={style:{"font-weight":"900"}},Z={id:"EditRoleForm",class:"col-span-6 mt-2"},ee={class:"col-span-6"},se={class:"col-span-6"},le={class:"multiselect-multiple-label"},te={class:"ml-2 text-gray-600 uppercase"},oe=["id","name","category"],ae={key:0},ie={key:0},ne={style:{float:"left","padding-top":"6px"}},re=l("div",{style:{clear:"both"}},null,-1),de={key:1},ue=l("div",{style:{float:"left","padding-top":"6px"},class:"role-perm-div-singles"}," View ",-1),ce=l("div",{style:{clear:"both"}},null,-1),pe={style:{height:"10px"}},me={href:"/roles"},fe=l("span",{style:{width:"20px"}},null,-1),xe={__name:"AddRoleForm",props:{role:{type:Object,default:()=>({})},usersOptions:{type:Array,default:()=>[]},formMode:{type:String,default:()=>""},isSuperAdmin:{type:Boolean,default:()=>!1},canReadRoles:{type:Boolean,default:()=>!1},canEditRoles:{type:Boolean,default:()=>!1},canAddRoles:{type:Boolean,default:()=>!1},canDeleteRoles:{type:Boolean,default:()=>!1}},setup($){const u=$,h=y(u.role.selectedUsers),v=y(u.role.currentPerms),g=y(u.role.perms),U=P(()=>o.name=="super-admin"||u.isSuperAdmin),o=O({name:u.role.name,selectedUsers:h.value,selectedPermissions:v.value}),A=(s,i,e,t)=>{if(v.value[i]||v.value.push([n=>s]),e=="create"){let n=g.value[t].store;v.value[n]=s}if(e=="edit"){let n=g.value[t].update;v.value[n]=s}},B=s=>s.charAt(0).toUpperCase()+s.slice(1),C=s=>{switch(s){case"destroy":return"Delete";case"index":return"View";case"show":return"View";case"restore":return"Remove";default:return B(s)}},N=()=>{u.formMode=="editRole"?o.put(route("roles.update",u.role.id),{preserveScroll:!0}):o.post(route("roles.store"),{preserveScroll:!0})},S=(s,i)=>{typeof u.role.selectedUsers>"u"&&(u.role.selectedUsers=[]),i==="add"?h.value.push(s):h.value=h.value.filter(function(e){return e.id!=s.id})};return(s,i)=>(d(),k(I,{onSubmitted:N},{title:m(()=>[b(f(s.$page.props.formMode=="editRole"?"Update":"Add")+" Role ",1)]),description:m(()=>[b(f(s.$page.props.formMode=="editRole"?"Update":"Add")+" Role information. ",1),l("div",K,[l("div",H,[J,l("span",Q,f(s.$page.props.formMode=="editRole"?s.$page.props.role.name:""),1)]),l("div",W,[X,(d(!0),c(V,null,w(h.value,e=>(d(),c("div",{key:e.id},[l("span",Y,f("  • "+e.email),1)]))),128))])])]),form:m(()=>[l("div",Z,[l("div",ee,[r(R,{for:"name",value:"Name",style:{"min-width":"300px"},class:"mt-2"}),r(q,{id:"name",modelValue:a(o).name,"onUpdate:modelValue":i[0]||(i[0]=e=>a(o).name=e),class:"block w-full",type:"text",autocomplete:"Name",style:{"min-width":"300px"},required:""},null,8,["modelValue"]),r(L,{message:a(o).errors.name,class:"mt-2"},null,8,["message"])]),l("div",se,[r(R,{for:"users",value:"Associated Account(s)",class:"mt-2 block w-full",style:{"min-width":"300px"}}),r(a(z),{modelValue:a(o).selectedUsers,"onUpdate:modelValue":i[1]||(i[1]=e=>a(o).selectedUsers=e),style:{"min-width":"300px"},placeholder:"Select Account(s)",label:"email","track-by":"id",options:s.$page.props.usersOptions,multiple:!0,"close-on-select":!1,"clear-on-select":!1,"preserve-search":!0,onSelect:i[2]||(i[2]=e=>S(e,"add")),onRemove:i[3]||(i[3]=e=>S(e,"sub"))},{selection:m(({values:e})=>[l("div",le,f(e.length)+" users selected ",1)]),_:1},8,["modelValue","options"])]),r(R,{for:"permissions",value:"Associated Permissions(s)",style:{"min-width":"300px"},class:"mt-2 block w-full"}),(d(!0),c(V,null,w(g.value,(e,t)=>(d(),c("div",{key:e.id,style:{width:"30%","min-width":"190px",padding:"1%",margin:"5px",float:"left",border:"1px solid #e2e8f0","border-radius":"0.5em"}},[l("span",te,f(t=="airlines_labels_lids"?"LIDS":t=="airlines_branding"?"BRANDING":t=="airlines_logos"?"LOGOS":t=="tokens"?"API TOKENS":t),1),(d(!0),c(V,null,w(e,(n,p)=>(d(),c("div",{id:t+"_"+p,key:t+"_"+p,name:p,category:t,style:{width:"175px","padding-left":"15px"}},[t!=="teams"?(d(),c("div",ae,[p!=="store"&&p!=="update"&&p!=="cancel"?(d(),c("div",ie,[l("div",ne,f(C(p))+": ",1),r(x,{modelValue:a(o).selectedPermissions[n],"onUpdate:modelValue":_=>a(o).selectedPermissions[n]=_,"on-label":"On","off-label":"Off",labelledby:"toggle-label",describedby:"toggle-description","false-value":"false","true-value":"true",style:{float:"right"},disabled:a(U),classes:{container:"mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"},onChange:_=>A(_,n,p,t)},null,8,["modelValue","onUpdate:modelValue","disabled","onChange"]),re])):D("",!0)])):(d(),c("div",de,[ue,r(x,{modelValue:a(o).selectedPermissions[n],"onUpdate:modelValue":_=>a(o).selectedPermissions[n]=_,"on-label":"On","off-label":"Off",labelledby:"toggle-label",describedby:"toggle-description","false-value":"false","true-value":"true",style:{float:"right"},disabled:a(U),classes:{container:"mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"},onChange:_=>A(_,n,"edit",t)},null,8,["modelValue","onUpdate:modelValue","disabled","onChange"]),ce]))],8,oe))),128)),F(l("div",pe,null,512),[[E,t==="airlines_labels_lids"||t==="airlines_branding"||t==="airlines_logos"||t==="teams"]])]))),128))])]),actions:m(()=>[r(T,{on:a(o).recentlySuccessful,class:"mr-3"},{default:m(()=>[b(f(s.$page.props.flash.message),1)]),_:1},8,["on"]),l("a",me,[r(j,{type:"button"},{default:m(()=>[b(" Cancel ")]),_:1})]),fe,r(G,{class:M({"opacity-25":a(o).processing}),disabled:a(o).processing},{default:m(()=>[b(" Save ")]),_:1},8,["class","disabled"])]),_:1}))}};export{xe as default};
