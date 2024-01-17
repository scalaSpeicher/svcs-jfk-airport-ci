import{v as M,c as f,w as d,o as c,d as y,a,t as m,u as e,e as i,b as n,f as S,n as A}from"./app-262a2786.js";import{_ as b}from"./ActionMessage-10225983.js";import{_ as I}from"./FormSection-8e6c7726.js";import{_ as l}from"./InputError-5f2d5f55.js";import{_ as s}from"./InputLabel-0afd5ac9.js";import{_ as B}from"./PrimaryButton-a709ea04.js";import{_ as G}from"./SecondaryButton-d3277a63.js";import{_ as C}from"./TextInput-bbe8df5b.js";import{T}from"./ToggleButton-2e04d601.js";import{s as g}from"./vue-multiselect.css_vue_type_style_index_0_src_true_lang-cff1377d.js";import"./SectionTitle-9e468a0a.js";import"./_plugin-vue_export-helper-c27b6911.js";const V={key:0},v={key:1},w={key:0},D={key:1},L={key:2,class:"columns-1"},k={class:"mt-4 ml-6"},P=a("span",null,"IATA:  ",-1),U={style:{"font-weight":"900"}},E={class:"ml-6"},K=a("span",null,"ICAO:  ",-1),R={style:{"font-weight":"900"}},F={class:"ml-6"},x=a("span",null,"Airport Name:  ",-1),O={style:{"font-weight":"900"}},H={class:"ml-6"},W=a("span",null,"Country:  ",-1),Z={style:{"font-weight":"900"}},z={class:"ml-6"},J=a("span",null,"Country Code:  ",-1),Y={style:{"font-weight":"900"}},q={id:"DestinationEditForm"},$={key:0,class:"col-span-6 sm:col-span-4 mt-2"},j={key:1,class:"col-span-6 sm:col-span-4 mt-4"},Q={class:"col-span-6 sm:col-span-4 mt-4"},X={key:2,class:"col-span-6 sm:col-span-4 mt-4"},oo={key:3,class:"col-span-6 sm:col-span-4 mt-4"},eo={key:4,class:"col-span-6 sm:col-span-4 mt-4"},to={key:5,class:"col-span-6 sm:col-span-4 mt-4"},no={class:"col-span-6 sm:col-span-4 mt-4"},ao=a("div",{class:"mt-2 block w-full",style:{width:"300px"}},[a("label",{id:"toggle-label",class:"block font-medium text-sm text-gray-700",value:""},"Destination Status")],-1),ro=a("div",{style:{width:"300px",opacity:".5"}},[a("small",{id:"toggle-description"},"Set the destination's status")],-1),uo={href:"/destinations"},co=a("span",{style:{width:"20px"}},null,-1),yo={components:{Multiselect:g},data(){return{countryOptions:[{countryName:"United States",countryCode:"US"},{countryName:"Afghanistan",countryCode:"AF"},{countryName:"Aland Islands",countryCode:"AX"},{countryName:"Albania",countryCode:"AL"},{countryName:"Algeria",countryCode:"DZ"},{countryName:"American Samoa",countryCode:"AS"},{countryName:"Andorra",countryCode:"AD"},{countryName:"Angola",countryCode:"AO"},{countryName:"Anguilla",countryCode:"AI"},{countryName:"Antarctica",countryCode:"AQ"},{countryName:"Antigua and Barbuda",countryCode:"AG"},{countryName:"Argentina",countryCode:"AR"},{countryName:"Armenia",countryCode:"AM"},{countryName:"Aruba",countryCode:"AW"},{countryName:"Australia",countryCode:"AU"},{countryName:"Austria",countryCode:"AT"},{countryName:"Azerbaijan",countryCode:"AZ"},{countryName:"Bahamas",countryCode:"BS"},{countryName:"Bahrain",countryCode:"BH"},{countryName:"Bangladesh",countryCode:"BD"},{countryName:"Barbados",countryCode:"BB"},{countryName:"Belarus",countryCode:"BY"},{countryName:"Belgium",countryCode:"BE"},{countryName:"Belize",countryCode:"BZ"},{countryName:"Benin",countryCode:"BJ"},{countryName:"Bermuda",countryCode:"BM"},{countryName:"Bhutan",countryCode:"BT"},{countryName:"Bolivia",countryCode:"BO"},{countryName:"Bosnia and Herzegovina",countryCode:"BA"},{countryName:"Botswana",countryCode:"BW"},{countryName:"Bouvet Island",countryCode:"BV"},{countryName:"Brazil",countryCode:"BR"},{countryName:"British Indian Ocean Territory",countryCode:"IO"},{countryName:"Brunei Darussalam",countryCode:"BN"},{countryName:"Bulgaria",countryCode:"BG"},{countryName:"Burkina Faso",countryCode:"BF"},{countryName:"Burundi",countryCode:"BI"},{countryName:"Cambodia",countryCode:"KH"},{countryName:"Cameroon",countryCode:"CM"},{countryName:"Canada",countryCode:"CA"},{countryName:"Cape Verde",countryCode:"CV"},{countryName:"Cayman Islands",countryCode:"KY"},{countryName:"Central African Republic",countryCode:"CF"},{countryName:"Chad",countryCode:"TD"},{countryName:"Chile",countryCode:"CL"},{countryName:"China",countryCode:"CN"},{countryName:"Christmas Island",countryCode:"CX"},{countryName:"Cocos (Keeling) Islands",countryCode:"CC"},{countryName:"Colombia",countryCode:"CO"},{countryName:"Comoros",countryCode:"KM"},{countryName:"Congo",countryCode:"CG"},{countryName:"Congo",countryCode:"CD"},{countryName:"Cook Islands",countryCode:"CK"},{countryName:"Costa Rica",countryCode:"CR"},{countryName:"Cote D'Ivoire",countryCode:"CI"},{countryName:"Croatia",countryCode:"HR"},{countryName:"Cuba",countryCode:"CU"},{countryName:"Curacao",countryCode:"CW"},{countryName:"Cyprus",countryCode:"CY"},{countryName:"Czech Republic",countryCode:"CZ"},{countryName:"Denmark",countryCode:"DK"},{countryName:"Djibouti",countryCode:"DJ"},{countryName:"Dominica",countryCode:"DM"},{countryName:"Dominican Republic",countryCode:"DO"},{countryName:"Ecuador",countryCode:"EC"},{countryName:"Egypt",countryCode:"EG"},{countryName:"El Salvador",countryCode:"SV"},{countryName:"Equatorial Guinea",countryCode:"GQ"},{countryName:"Eritrea",countryCode:"ER"},{countryName:"Estonia",countryCode:"EE"},{countryName:"Ethiopia",countryCode:"ET"},{countryName:"Falkland Islands (Malvinas)",countryCode:"FK"},{countryName:"Faroe Islands",countryCode:"FO"},{countryName:"Fiji",countryCode:"FJ"},{countryName:"Finland",countryCode:"FI"},{countryName:"France",countryCode:"FR"},{countryName:"French Guiana",countryCode:"GF"},{countryName:"French Polynesia",countryCode:"PF"},{countryName:"French Southern Territories",countryCode:"TF"},{countryName:"Gabon",countryCode:"GA"},{countryName:"Gambia",countryCode:"GM"},{countryName:"Georgia",countryCode:"GE"},{countryName:"Germany",countryCode:"DE"},{countryName:"Ghana",countryCode:"GH"},{countryName:"Gibraltar",countryCode:"GI"},{countryName:"Greece",countryCode:"GR"},{countryName:"Greenland",countryCode:"GL"},{countryName:"Grenada",countryCode:"GD"},{countryName:"Guadeloupe",countryCode:"GP"},{countryName:"Guam",countryCode:"GU"},{countryName:"Guatemala",countryCode:"GT"},{countryName:"Guernsey",countryCode:"GG"},{countryName:"Guinea",countryCode:"GN"},{countryName:"Guinea-Bissau",countryCode:"GW"},{countryName:"Guyana",countryCode:"GY"},{countryName:"Haiti",countryCode:"HT"},{countryName:"Heard Island and Mcdonald Islands",countryCode:"HM"},{countryName:"Holy See (Vatican City State)",countryCode:"VA"},{countryName:"Honduras",countryCode:"HN"},{countryName:"Hong Kong",countryCode:"HK"},{countryName:"Hungary",countryCode:"HU"},{countryName:"CANARY ISLANDS",countryCode:"IC"},{countryName:"Iceland",countryCode:"IS"},{countryName:"India",countryCode:"IN"},{countryName:"Indonesia",countryCode:"ID"},{countryName:"Iran",countryCode:"IR"},{countryName:"Iraq",countryCode:"IQ"},{countryName:"Ireland",countryCode:"IE"},{countryName:"Isle of Man",countryCode:"IM"},{countryName:"Israel",countryCode:"IL"},{countryName:"Italy",countryCode:"IT"},{countryName:"Jamaica",countryCode:"JM"},{countryName:"Japan",countryCode:"JP"},{countryName:"Jersey",countryCode:"JE"},{countryName:"Jordan",countryCode:"JO"},{countryName:"Kazakhstan",countryCode:"KZ"},{countryName:"Kenya",countryCode:"KE"},{countryName:"Kiribati",countryCode:"KI"},{countryName:"North Korea",countryCode:"KP"},{countryName:"South Korea",countryCode:"KR"},{countryName:"Kosovo",countryCode:"XK"},{countryName:"Kuwait",countryCode:"KW"},{countryName:"Kyrgyzstan",countryCode:"KG"},{countryName:"Lao People's Democratic Republic",countryCode:"LA"},{countryName:"Latvia",countryCode:"LV"},{countryName:"Lebanon",countryCode:"LB"},{countryName:"Lesotho",countryCode:"LS"},{countryName:"Liberia",countryCode:"LR"},{countryName:"Libya",countryCode:"LY"},{countryName:"Liechtenstein",countryCode:"LI"},{countryName:"Lithuania",countryCode:"LT"},{countryName:"Luxembourg",countryCode:"LU"},{countryName:"Macao",countryCode:"MO"},{countryName:"North Macedonia",countryCode:"MK"},{countryName:"Madagascar",countryCode:"MG"},{countryName:"Malawi",countryCode:"MW"},{countryName:"Malaysia",countryCode:"MY"},{countryName:"Maldives",countryCode:"MV"},{countryName:"Mali",countryCode:"ML"},{countryName:"Malta",countryCode:"MT"},{countryName:"Marshall Islands",countryCode:"MH"},{countryName:"Martinique",countryCode:"MQ"},{countryName:"Mauritania",countryCode:"MR"},{countryName:"Mauritius",countryCode:"MU"},{countryName:"Mayotte",countryCode:"YT"},{countryName:"Mexico",countryCode:"MX"},{countryName:"Micronesia",countryCode:"FM"},{countryName:"Moldova",countryCode:"MD"},{countryName:"Monaco",countryCode:"MC"},{countryName:"Mongolia",countryCode:"MN"},{countryName:"Montenegro",countryCode:"ME"},{countryName:"Montserrat",countryCode:"MS"},{countryName:"Morocco",countryCode:"MA"},{countryName:"Mozambique",countryCode:"MZ"},{countryName:"Myanmar",countryCode:"MM"},{countryName:"Namibia",countryCode:"NA"},{countryName:"Nauru",countryCode:"NR"},{countryName:"Nepal",countryCode:"NP"},{countryName:"Netherlands",countryCode:"NL"},{countryName:"Netherlands Antilles",countryCode:"AN"},{countryName:"New Caledonia",countryCode:"NC"},{countryName:"New Zealand",countryCode:"NZ"},{countryName:"Nicaragua",countryCode:"NI"},{countryName:"Niger",countryCode:"NE"},{countryName:"Nigeria",countryCode:"NG"},{countryName:"Niue",countryCode:"NU"},{countryName:"Norfolk Island",countryCode:"NF"},{countryName:"Northern Mariana Islands",countryCode:"MP"},{countryName:"Norway",countryCode:"NO"},{countryName:"Oman",countryCode:"OM"},{countryName:"Pakistan",countryCode:"PK"},{countryName:"Palau",countryCode:"PW"},{countryName:"Palestinian Territory",countryCode:"PS"},{countryName:"Panama",countryCode:"PA"},{countryName:"Papua New Guinea",countryCode:"PG"},{countryName:"Paraguay",countryCode:"PY"},{countryName:"Peru",countryCode:"PE"},{countryName:"Philippines",countryCode:"PH"},{countryName:"Pitcairn",countryCode:"PN"},{countryName:"Poland",countryCode:"PL"},{countryName:"Portugal",countryCode:"PT"},{countryName:"Puerto Rico",countryCode:"PR"},{countryName:"Qatar",countryCode:"QA"},{countryName:"Reunion",countryCode:"RE"},{countryName:"Romania",countryCode:"RO"},{countryName:"Russian Federation",countryCode:"RU"},{countryName:"Rwanda",countryCode:"RW"},{countryName:"Saint Barthelemy",countryCode:"BL"},{countryName:"Saint Helena",countryCode:"SH"},{countryName:"Saint Kitts and Nevis",countryCode:"KN"},{countryName:"Saint Lucia",countryCode:"LC"},{countryName:"Saint Martin",countryCode:"MF"},{countryName:"Saint Pierre and Miquelon",countryCode:"PM"},{countryName:"Saint Vincent and the Grenadines",countryCode:"VC"},{countryName:"Samoa",countryCode:"WS"},{countryName:"San Marino",countryCode:"SM"},{countryName:"Sao Tome and Principe",countryCode:"ST"},{countryName:"Saudi Arabia",countryCode:"SA"},{countryName:"Senegal",countryCode:"SN"},{countryName:"Serbia",countryCode:"RS"},{countryName:"Serbia and Montenegro",countryCode:"CS"},{countryName:"Seychelles",countryCode:"SC"},{countryName:"Sierra Leone",countryCode:"SL"},{countryName:"Singapore",countryCode:"SG"},{countryName:"Sint Maarten",countryCode:"SX"},{countryName:"Slovakia",countryCode:"SK"},{countryName:"Slovenia",countryCode:"SI"},{countryName:"Solomon Islands",countryCode:"SB"},{countryName:"Somalia",countryCode:"SO"},{countryName:"South Africa",countryCode:"ZA"},{countryName:"South Georgia and the South Sandwich Islands",countryCode:"GS"},{countryName:"South Sudan",countryCode:"SS"},{countryName:"Spain",countryCode:"ES"},{countryName:"Sri Lanka",countryCode:"LK"},{countryName:"Sudan",countryCode:"SD"},{countryName:"Suriname",countryCode:"SR"},{countryName:"Svalbard and Jan Mayen",countryCode:"SJ"},{countryName:"Swaziland",countryCode:"SZ"},{countryName:"Sweden",countryCode:"SE"},{countryName:"Switzerland",countryCode:"CH"},{countryName:"Syria",countryCode:"SY"},{countryName:"Taiwan",countryCode:"TW"},{countryName:"Tajikistan",countryCode:"TJ"},{countryName:"Tanzania",countryCode:"TZ"},{countryName:"Thailand",countryCode:"TH"},{countryName:"Timor-Leste",countryCode:"TL"},{countryName:"Togo",countryCode:"TG"},{countryName:"Tokelau",countryCode:"TK"},{countryName:"Tonga",countryCode:"TO"},{countryName:"Trinidad and Tobago",countryCode:"TT"},{countryName:"Tunisia",countryCode:"TN"},{countryName:"Turkey",countryCode:"TR"},{countryName:"Turkmenistan",countryCode:"TM"},{countryName:"Turks and Caicos Islands",countryCode:"TC"},{countryName:"Tuvalu",countryCode:"TV"},{countryName:"Uganda",countryCode:"UG"},{countryName:"Ukraine",countryCode:"UA"},{countryName:"United Arab Emirates",countryCode:"AE"},{countryName:"United Kingdom",countryCode:"GB"},{countryName:"United States Minor Outlying Islands",countryCode:"UM"},{countryName:"Uruguay",countryCode:"UY"},{countryName:"Uzbekistan",countryCode:"UZ"},{countryName:"Vanuatu",countryCode:"VU"},{countryName:"Venezuela",countryCode:"VE"},{countryName:"Viet Nam",countryCode:"VN"},{countryName:"Virgin Islands, British",countryCode:"VG"},{countryName:"Virgin Islands, U.s.",countryCode:"VI"},{countryName:"Wallis and Futuna",countryCode:"WF"},{countryName:"Western Sahara",countryCode:"EH"},{countryName:"Yemen",countryCode:"YE"},{countryName:"Zambia",countryCode:"ZM"},{countryName:"Zimbabwe",countryCode:"ZW"}]}},methods:{nameWithLang({countryName:p,countryCode:t}){return`${p} — [${t}]`}}},fo=Object.assign(yo,{__name:"EditDestinationForm",props:{destination:{type:Object,default:()=>({})},formMode:{type:String,default:()=>""}},setup(p){const t=p,o=M({iata:t.destination.iata,icao:t.destination.icao,city:t.destination.city,airport_name:t.destination.airport_name,country:t.destination.country,latitude:t.destination.latitude?t.destination.latitude.toString():t.destination.latitude,longitude:t.destination.longitude?t.destination.longitude.toString():t.destination.longitude,country_code:t.destination.country_code,status:t.destination.hasOwnProperty("status")?t.destination.status:!1}),h=N=>{o.status=N},_=()=>{t.formMode=="editDestination"?o.put(route("destinations.update",t.destination.id),{preserveScroll:!0}):o.post(route("destinations.store"),{preserveScroll:!0})};return(N,r)=>(c(),f(I,{onSubmitted:_},{title:d(()=>[t.formMode=="editDestination"?(c(),y("span",V,"Destination Update")):(c(),y("span",v,"Destination Add"))]),description:d(()=>[t.formMode=="editDestination"?(c(),y("span",w,"Update Destination information.")):(c(),y("span",D,"Add Destination information.")),t.formMode=="editDestination"?(c(),y("div",L,[a("div",k,[P,a("span",U,m(e(o).iata),1)]),a("div",E,[K,a("span",R,m(e(o).icao),1)]),a("div",F,[x,a("span",O,m(e(o).airport_name),1)]),a("div",H,[W,a("span",Z,m(e(o).country),1)]),a("div",z,[J,a("span",Y,m(e(o).country_code),1)])])):i("",!0)]),form:d(()=>[a("div",q,[t.formMode=="addDestination"?(c(),y("div",$,[n(s,{for:"iata",value:"IATA",style:{width:"300px"}}),n(C,{id:"iata",modelValue:e(o).iata,"onUpdate:modelValue":r[0]||(r[0]=u=>e(o).iata=u),required:"",type:"text",class:"mt-2 block w-full",autocomplete:"IATA",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.iata,class:"mt-2"},null,8,["message"])])):i("",!0),t.formMode=="addDestination"?(c(),y("div",j,[n(s,{for:"icao",value:"ICAO",style:{width:"300px"}}),n(C,{id:"icao",modelValue:e(o).icao,"onUpdate:modelValue":r[1]||(r[1]=u=>e(o).icao=u),required:"",type:"text",class:"mt-2 block w-full",autocomplete:"ICAO",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.icao,class:"mt-2"},null,8,["message"])])):i("",!0),a("div",Q,[n(s,{for:"city",value:"City",style:{width:"300px"}}),n(C,{id:"city",modelValue:e(o).city,"onUpdate:modelValue":r[2]||(r[2]=u=>e(o).city=u),required:"",type:"text",class:"mt-2 block w-full",autocomplete:"City",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.city,class:"mt-2"},null,8,["message"])]),t.formMode=="addDestination"?(c(),y("div",X,[n(s,{for:"airport_name",value:"Airport Name",style:{width:"300px"}}),n(C,{id:"airport_name",modelValue:e(o).airport_name,"onUpdate:modelValue":r[3]||(r[3]=u=>e(o).airport_name=u),required:"",type:"text",class:"mt-2 block w-full",autocomplete:"Airport Name",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.airport_name,class:"mt-2"},null,8,["message"])])):i("",!0),t.formMode=="addDestination"?(c(),y("div",oo,[n(s,{for:"country",value:"Country",style:{width:"300px"}}),n(e(g),{modelValue:e(o).country,"onUpdate:modelValue":r[4]||(r[4]=u=>e(o).country=u),style:{width:"300px"},options:N.countryOptions,"custom-label":N.nameWithLang,placeholder:"Select Country",label:"countryName","track-by":"countryCode","allow-empty":!1,"preselect-first":!0},null,8,["modelValue","options","custom-label"])])):i("",!0),t.formMode=="addDestination"?(c(),y("div",eo,[n(s,{for:"latitude",value:"Latitude",style:{width:"300px"}}),n(C,{id:"latitude",modelValue:e(o).latitude,"onUpdate:modelValue":r[5]||(r[5]=u=>e(o).latitude=u),required:"",type:"number",step:"any",class:"mt-2 block w-full",autocomplete:"Latitude",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.latitude,class:"mt-2"},null,8,["message"])])):i("",!0),t.formMode=="addDestination"?(c(),y("div",to,[n(s,{for:"lonitude",value:"Longitude",style:{width:"300px"}}),n(C,{id:"longitude",modelValue:e(o).longitude,"onUpdate:modelValue":r[6]||(r[6]=u=>e(o).longitude=u),required:"",type:"number",step:"any",class:"mt-2 block w-full",autocomplete:"Country",style:{width:"300px"}},null,8,["modelValue"]),n(l,{message:e(o).errors.longitude,class:"mt-2"},null,8,["message"])])):i("",!0),a("div",no,[ao,ro,n(T,{modelValue:e(o).status,"onUpdate:modelValue":r[7]||(r[7]=u=>e(o).status=u),"on-label":"On","off-label":"Off",labelledby:"toggle-label",describedby:"toggle-description","false-value":"Inactive","true-value":"Active",classes:{container:"mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"},onChange:r[8]||(r[8]=u=>h(u))},null,8,["modelValue"])])])]),actions:d(()=>[n(b,{on:e(o).recentlySuccessful,class:"mr-3"},{default:d(()=>[S(m(N.$page.props.flash.message),1)]),_:1},8,["on"]),a("a",uo,[n(G,{type:"button"},{default:d(()=>[S(" Cancel ")]),_:1})]),co,n(B,{class:A({"opacity-25":e(o).processing}),disabled:e(o).processing},{default:d(()=>[S(" Save ")]),_:1},8,["class","disabled"])]),_:1}))}});export{fo as default};
