import{_ as d,a as i}from"./AppLayout-ebba8cdf.js";import r from"./EditTemplatesForm-145eb4d1.js";import{c as n,w as a,o as l,a as p,t as c,d as s,b as o,f}from"./app-262a2786.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./TextInput-bbe8df5b.js";import"./SecondaryButton-d3277a63.js";import"./DangerButton-8bd23b7f.js";import"./FormSectionWide-371a92bf.js";import"./PrimaryButton-a709ea04.js";import"./DialogModal-370dc470.js";import"./Modal-e32cf43d.js";import"./InputError-5f2d5f55.js";import"./InputLabel-0afd5ac9.js";import"./ToggleButton-2e04d601.js";const u={class:"font-semibold text-xl text-gray-800 leading-tight"},y={key:0},h={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},g={key:1,class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},_=p("p",null,"You do not have permission to access this page.",-1),P={__name:"EditTemplates",props:{template:{type:Object,default:()=>({})},templates:{type:Object,default:()=>({})},templateField:{type:Object,default:()=>({})},templateFields:{type:Object,default:()=>({})},canEditTemplates:{type:Boolean,default:()=>!1},canDeleteTemplates:{type:Boolean,default:()=>!1},canAddTemplates:{type:Boolean,default:()=>!1},formMode:{type:String,default:()=>""}},setup(t){const m=t;return(e,T)=>(l(),n(d,{title:"AirPortal JFK Terminal 4"},{header:a(()=>[p("h2",u," AirPortal JFK Terminal 4 | "+c(m.formMode==="add"?"New Template":"Modify Template"),1)]),default:a(()=>[t.canEditTemplates?(l(),s("div",y,[p("div",h,[o(r,{templates:e.$page.props.templates,template:e.$page.props.template,"template-fields":e.$page.props.templateFields,"template-field":e.$page.props.templateField,"can-edit-templates":t.canEditTemplates,"can-delete-templates":t.canDeleteTemplates,"can-add-templates":t.canAddTemplates,"form-mode":e.$page.props.formMode},null,8,["templates","template","template-fields","template-field","can-edit-templates","can-delete-templates","can-add-templates","form-mode"])])])):(l(),s("div",g,[_,o(i,{href:e.route("planners.index",{_query:{today_only:0,search_by:"open",active_only:1,sort:"checkindesk"}}),active:e.route().current("planners.index")},{default:a(()=>[f(" Return to Planners List Page ")]),_:1},8,["href","active"])]))]),_:1}))}};export{P as default};
