import{v as c,d as f,b as e,u as o,w as l,F as w,o as _,X as g,a as r,n as V,f as b,z as v}from"./app-262a2786.js";import{A as k}from"./AuthenticationCard-724edf31.js";import{_ as y}from"./AuthenticationCardLogo-dbebe1f0.js";import{_ as m}from"./InputError-5f2d5f55.js";import{_ as i}from"./InputLabel-0afd5ac9.js";import{_ as x}from"./PrimaryButton-a709ea04.js";import{_ as n}from"./TextInput-bbe8df5b.js";import"./_plugin-vue_export-helper-c27b6911.js";const P=["onSubmit"],$={class:"mt-4"},C={class:"mt-4"},S={class:"flex items-center justify-end mt-4"},E={__name:"ResetPassword",props:{email:{type:String,default:()=>""},token:{type:String,default:()=>""}},setup(p){const d=p,s=c({token:d.token,email:d.email,password:"",password_confirmation:""}),u=()=>{s.post(route("password.update"),{onFinish:()=>s.reset("password","password_confirmation")})};return(h,a)=>(_(),f(w,null,[e(o(g),{title:"Reset Password"}),e(k,null,{logo:l(()=>[e(y)]),default:l(()=>[r("form",{onSubmit:v(u,["prevent"])},[r("div",null,[e(i,{for:"email",value:"Email"}),e(n,{id:"email",modelValue:o(s).email,"onUpdate:modelValue":a[0]||(a[0]=t=>o(s).email=t),type:"email",class:"mt-1 block w-full",required:"",autocomplete:"username"},null,8,["modelValue"]),e(m,{class:"mt-2",message:o(s).errors.email},null,8,["message"])]),r("div",$,[e(i,{for:"password",value:"Password"}),e(n,{id:"password",modelValue:o(s).password,"onUpdate:modelValue":a[1]||(a[1]=t=>o(s).password=t),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(m,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),r("div",C,[e(i,{for:"password_confirmation",value:"Confirm Password"}),e(n,{id:"password_confirmation",modelValue:o(s).password_confirmation,"onUpdate:modelValue":a[2]||(a[2]=t=>o(s).password_confirmation=t),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(m,{class:"mt-2",message:o(s).errors.password_confirmation},null,8,["message"])]),r("div",S,[e(x,{class:V({"opacity-25":o(s).processing}),disabled:o(s).processing},{default:l(()=>[b(" Reset Password ")]),_:1},8,["class","disabled"])])],40,P)]),_:1})],64))}};export{E as default};
