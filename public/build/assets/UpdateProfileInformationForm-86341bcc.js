import{v as I,r as h,c as R,w as r,o as f,f as n,a as s,t as _,l as m,m as c,d as v,g as F,F as T,b as a,D as B,z as g,u as o,e as P,A as O,n as j,O as E}from"./app-262a2786.js";import{_ as L}from"./ActionMessage-10225983.js";import{_ as x}from"./FormSection-8e6c7726.js";import{_ as y}from"./InputError-5f2d5f55.js";import{_ as k}from"./InputLabel-0afd5ac9.js";import{_ as z}from"./PrimaryButton-a709ea04.js";import{_ as w}from"./SecondaryButton-d3277a63.js";import{_ as U}from"./TextInput-bbe8df5b.js";import"./SectionTitle-9e468a0a.js";import"./_plugin-vue_export-helper-c27b6911.js";const M=s("div",{class:"font-medium text-gray-900"}," User Role:   ",-1),Y=s("div",{class:"font-medium text-gray-900"}," User Team:   ",-1),q=s("div",{class:"font-medium text-gray-900"}," User Airline(s):   ",-1),G={key:0,class:"col-span-6 sm:col-span-4"},H={class:"mt-2"},J=["src","alt"],K={class:"mt-2"},Q={class:"col-span-6 sm:col-span-4"},W={class:"col-span-6 sm:col-span-4"},X={class:"col-span-6 sm:col-span-4"},Z={key:1},ee={class:"text-sm mt-2"},se={class:"mt-2 font-medium text-sm text-green-600"},pe={__name:"UpdateProfileInformationForm",props:{user:{type:Object,default:()=>({})}},setup(b){const p=b,t=I({_method:"PUT",first_name:p.user.first_name,last_name:p.user.last_name,email:p.user.email,photo:null}),$=h(!1),d=h(null),i=h(null),C=()=>{const e=i.value.files[0];if(!e)return;const u=new FileReader;u.onload=l=>{d.value=l.target.result},u.readAsDataURL(e)},V=()=>{i.value.click()},S=()=>{var e;(e=i.value)!=null&&e.value&&(i.value.value=null)},D=()=>{E.delete(route("current-user-photo.destroy"),{preserveScroll:!0,preserveState:!1,resetOnSuccess:!0,onSuccess:()=>{d.value=null,S()}})},N=()=>{i.value&&(t.photo=i.value.files[0]),t.post(route("user-profile-information.update"),{errorBag:"updateProfileInformation",preserveScroll:!0,preserveState:!1,resetOnSuccess:!0,onSuccess:()=>S()})},A=()=>{$.value=!0};return(e,u)=>(f(),R(x,{onSubmitted:N},{title:r(()=>[n(" Profile Information ")]),description:r(()=>[M,s("div",null,_(e.$page.props.userData.currentUserRole.name?"  • "+e.$page.props.userData.currentUserRole.name.toUpperCase():""),1),m(s("div",null,[Y,s("div",null,_(e.$page.props.userData.currentUserTeam.name?"  • "+e.$page.props.userData.currentUserTeam.name.toUpperCase():""),1)],512),[[c,e.$page.props.userData.canReadTeams]]),q,(f(!0),v(T,null,F(e.$page.props.userData.userAirlines,l=>m((f(),v("div",{key:l.id},_("  • "+l.name.toUpperCase()),1)),[[c,p.user.airlines&&p.user.airlines.length!==0]])),128))]),form:r(()=>[e.$page.props.jetstream.managesProfilePhotos?(f(),v("div",G,[s("input",{ref_key:"photoInput",ref:i,type:"file",class:"hidden",onChange:C},null,544),a(k,{for:"photo",value:"Photo"}),m(s("div",H,[s("img",{class:"rounded-full h-20 w-20 object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.email},null,8,J)],512),[[c,!d.value]]),m(s("div",K,[s("span",{class:"block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center",style:B("background-image: url('"+d.value+"');")},null,4)],512),[[c,d.value]]),a(w,{class:"mt-2 mr-2",type:"button",onClick:g(V,["prevent"])},{default:r(()=>[n(" Select A New Photo ")]),_:1},8,["onClick"]),m(a(w,{type:"button",class:"mt-2",onClick:g(D,["prevent"])},{default:r(()=>[n(" Remove Photo ")]),_:1},8,["onClick"]),[[c,e.$page.props.auth.user.profile_photo_path]]),a(y,{message:o(t).errors.photo,class:"mt-2"},null,8,["message"])])):P("",!0),s("div",Q,[a(k,{for:"first_name",value:"First Name"}),a(U,{id:"first_name",modelValue:o(t).first_name,"onUpdate:modelValue":u[0]||(u[0]=l=>o(t).first_name=l),type:"text",class:"mt-1 block w-full",autocomplete:"first_name"},null,8,["modelValue"]),a(y,{message:o(t).errors.first_name,class:"mt-2"},null,8,["message"])]),s("div",W,[a(k,{for:"last_name",value:"Last Name"}),a(U,{id:"last_name",modelValue:o(t).last_name,"onUpdate:modelValue":u[1]||(u[1]=l=>o(t).last_name=l),type:"text",class:"mt-1 block w-full",autocomplete:"last_name"},null,8,["modelValue"]),a(y,{message:o(t).errors.last_name,class:"mt-2"},null,8,["message"])]),s("div",X,[n(" Email Address: "),s("b",null,_(o(t).email),1)]),e.$page.props.jetstream.hasEmailVerification&&b.user.email_verified_at===null?(f(),v("div",Z,[s("p",ee,[n(" Your email address is unverified. "),a(o(O),{href:e.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:g(A,["prevent"])},{default:r(()=>[n(" Click here to re-send the verification email. ")]),_:1},8,["href","onClick"])]),m(s("div",se," A new verification link has been sent to your email address. ",512),[[c,$.value]])])):P("",!0)]),actions:r(()=>[a(L,{on:o(t).recentlySuccessful,class:"mr-3"},{default:r(()=>[n(" Saved. ")]),_:1},8,["on"]),a(z,{class:j({"opacity-25":o(t).processing}),disabled:o(t).processing},{default:r(()=>[n(" Save ")]),_:1},8,["class","disabled"])]),_:1}))}};export{pe as default};
