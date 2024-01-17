import{v as g,i as p,d as a,b as e,u as t,w as o,F as _,o as l,X as h,e as y,a as s,n as v,f as n,A as u,z as x}from"./app-262a2786.js";import{A as b}from"./AuthenticationCard-724edf31.js";import{_ as w}from"./AuthenticationCardLogo-dbebe1f0.js";import{_ as k}from"./PrimaryButton-a709ea04.js";import"./_plugin-vue_export-helper-c27b6911.js";const V=s("div",{class:"mb-4 text-sm text-gray-600"}," Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",-1),E={key:0,class:"mb-4 font-medium text-sm text-green-600"},A=["onSubmit"],B={class:"mt-4 flex items-center justify-between"},L={__name:"VerifyEmail",props:{status:{type:String,default:()=>""}},setup(d){const c=d,i=g({}),f=()=>{i.post(route("verification.send"))},m=p(()=>c.status==="verification-link-sent");return(r,C)=>(l(),a(_,null,[e(t(h),{title:"Email Verification"}),e(b,null,{logo:o(()=>[e(w)]),default:o(()=>[V,t(m)?(l(),a("div",E," A new verification link has been sent to the email address you provided in your profile settings. ")):y("",!0),s("form",{onSubmit:x(f,["prevent"])},[s("div",B,[e(k,{class:v({"opacity-25":t(i).processing}),disabled:t(i).processing},{default:o(()=>[n(" Resend Verification Email ")]),_:1},8,["class","disabled"]),s("div",null,[e(t(u),{href:r.route("profile.show"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:o(()=>[n(" Edit Profile ")]),_:1},8,["href"]),e(t(u),{href:r.route("logout"),method:"post",as:"button",class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"},{default:o(()=>[n(" Log Out ")]),_:1},8,["href"])])])],40,A)]),_:1})],64))}};export{L as default};
