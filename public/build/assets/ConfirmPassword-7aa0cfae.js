import{v as m,r as d,d as c,b as o,u as e,w as r,F as p,o as u,X as f,a,n as _,f as w,z as b}from"./app-262a2786.js";import{A as g}from"./AuthenticationCard-724edf31.js";import{_ as h}from"./AuthenticationCardLogo-dbebe1f0.js";import{_ as v}from"./InputError-5f2d5f55.js";import{_ as x}from"./InputLabel-0afd5ac9.js";import{_ as y}from"./PrimaryButton-a709ea04.js";import{_ as V}from"./TextInput-bbe8df5b.js";import"./_plugin-vue_export-helper-c27b6911.js";const C=a("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),$=["onSubmit"],k={class:"flex justify-end mt-4"},q={__name:"ConfirmPassword",setup(A){const s=m({password:""}),t=d(null),n=()=>{s.post(route("password.confirm"),{onFinish:()=>{s.reset(),t.value.focus()}})};return(B,i)=>(u(),c(p,null,[o(e(f),{title:"Secure Area"}),o(g,null,{logo:r(()=>[o(h)]),default:r(()=>[C,a("form",{onSubmit:b(n,["prevent"])},[a("div",null,[o(x,{for:"password",value:"Password"}),o(V,{id:"password",ref_key:"passwordInput",ref:t,modelValue:e(s).password,"onUpdate:modelValue":i[0]||(i[0]=l=>e(s).password=l),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"current-password"},null,8,["modelValue"]),o(v,{class:"mt-2",message:e(s).errors.password},null,8,["message"])]),a("div",k,[o(y,{class:_(["ml-4",{"opacity-25":e(s).processing}]),disabled:e(s).processing},{default:r(()=>[w(" Confirm ")]),_:1},8,["class","disabled"])])],40,$)]),_:1})],64))}};export{q as default};
