import { mergeProps, withCtx, openBlock, createBlock, unref, createVNode, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$6 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$3 } from "./TextInput-e4b68561.mjs";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
import Multiselect from "vue-multiselect";
/* empty css                                                                    */import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "@vueform/toggle";
const __default__ = {
  components: {
    Multiselect
  },
  data() {
    return {
      countryOptions: [
        { countryName: "United States", countryCode: "US" },
        { countryName: "Afghanistan", countryCode: "AF" },
        { countryName: "Aland Islands", countryCode: "AX" },
        { countryName: "Albania", countryCode: "AL" },
        { countryName: "Algeria", countryCode: "DZ" },
        { countryName: "American Samoa", countryCode: "AS" },
        { countryName: "Andorra", countryCode: "AD" },
        { countryName: "Angola", countryCode: "AO" },
        { countryName: "Anguilla", countryCode: "AI" },
        { countryName: "Antarctica", countryCode: "AQ" },
        { countryName: "Antigua and Barbuda", countryCode: "AG" },
        { countryName: "Argentina", countryCode: "AR" },
        { countryName: "Armenia", countryCode: "AM" },
        { countryName: "Aruba", countryCode: "AW" },
        { countryName: "Australia", countryCode: "AU" },
        { countryName: "Austria", countryCode: "AT" },
        { countryName: "Azerbaijan", countryCode: "AZ" },
        { countryName: "Bahamas", countryCode: "BS" },
        { countryName: "Bahrain", countryCode: "BH" },
        { countryName: "Bangladesh", countryCode: "BD" },
        { countryName: "Barbados", countryCode: "BB" },
        { countryName: "Belarus", countryCode: "BY" },
        { countryName: "Belgium", countryCode: "BE" },
        { countryName: "Belize", countryCode: "BZ" },
        { countryName: "Benin", countryCode: "BJ" },
        { countryName: "Bermuda", countryCode: "BM" },
        { countryName: "Bhutan", countryCode: "BT" },
        { countryName: "Bolivia", countryCode: "BO" },
        { countryName: "Bosnia and Herzegovina", countryCode: "BA" },
        { countryName: "Botswana", countryCode: "BW" },
        { countryName: "Bouvet Island", countryCode: "BV" },
        { countryName: "Brazil", countryCode: "BR" },
        { countryName: "British Indian Ocean Territory", countryCode: "IO" },
        { countryName: "Brunei Darussalam", countryCode: "BN" },
        { countryName: "Bulgaria", countryCode: "BG" },
        { countryName: "Burkina Faso", countryCode: "BF" },
        { countryName: "Burundi", countryCode: "BI" },
        { countryName: "Cambodia", countryCode: "KH" },
        { countryName: "Cameroon", countryCode: "CM" },
        { countryName: "Canada", countryCode: "CA" },
        { countryName: "Cape Verde", countryCode: "CV" },
        { countryName: "Cayman Islands", countryCode: "KY" },
        { countryName: "Central African Republic", countryCode: "CF" },
        { countryName: "Chad", countryCode: "TD" },
        { countryName: "Chile", countryCode: "CL" },
        { countryName: "China", countryCode: "CN" },
        { countryName: "Christmas Island", countryCode: "CX" },
        { countryName: "Cocos (Keeling) Islands", countryCode: "CC" },
        { countryName: "Colombia", countryCode: "CO" },
        { countryName: "Comoros", countryCode: "KM" },
        { countryName: "Congo", countryCode: "CG" },
        { countryName: "Congo", countryCode: "CD" },
        { countryName: "Cook Islands", countryCode: "CK" },
        { countryName: "Costa Rica", countryCode: "CR" },
        { countryName: "Cote D'Ivoire", countryCode: "CI" },
        { countryName: "Croatia", countryCode: "HR" },
        { countryName: "Cuba", countryCode: "CU" },
        { countryName: "Curacao", countryCode: "CW" },
        { countryName: "Cyprus", countryCode: "CY" },
        { countryName: "Czech Republic", countryCode: "CZ" },
        { countryName: "Denmark", countryCode: "DK" },
        { countryName: "Djibouti", countryCode: "DJ" },
        { countryName: "Dominica", countryCode: "DM" },
        { countryName: "Dominican Republic", countryCode: "DO" },
        { countryName: "Ecuador", countryCode: "EC" },
        { countryName: "Egypt", countryCode: "EG" },
        { countryName: "El Salvador", countryCode: "SV" },
        { countryName: "Equatorial Guinea", countryCode: "GQ" },
        { countryName: "Eritrea", countryCode: "ER" },
        { countryName: "Estonia", countryCode: "EE" },
        { countryName: "Ethiopia", countryCode: "ET" },
        { countryName: "Falkland Islands (Malvinas)", countryCode: "FK" },
        { countryName: "Faroe Islands", countryCode: "FO" },
        { countryName: "Fiji", countryCode: "FJ" },
        { countryName: "Finland", countryCode: "FI" },
        { countryName: "France", countryCode: "FR" },
        { countryName: "French Guiana", countryCode: "GF" },
        { countryName: "French Polynesia", countryCode: "PF" },
        { countryName: "French Southern Territories", countryCode: "TF" },
        { countryName: "Gabon", countryCode: "GA" },
        { countryName: "Gambia", countryCode: "GM" },
        { countryName: "Georgia", countryCode: "GE" },
        { countryName: "Germany", countryCode: "DE" },
        { countryName: "Ghana", countryCode: "GH" },
        { countryName: "Gibraltar", countryCode: "GI" },
        { countryName: "Greece", countryCode: "GR" },
        { countryName: "Greenland", countryCode: "GL" },
        { countryName: "Grenada", countryCode: "GD" },
        { countryName: "Guadeloupe", countryCode: "GP" },
        { countryName: "Guam", countryCode: "GU" },
        { countryName: "Guatemala", countryCode: "GT" },
        { countryName: "Guernsey", countryCode: "GG" },
        { countryName: "Guinea", countryCode: "GN" },
        { countryName: "Guinea-Bissau", countryCode: "GW" },
        { countryName: "Guyana", countryCode: "GY" },
        { countryName: "Haiti", countryCode: "HT" },
        { countryName: "Heard Island and Mcdonald Islands", countryCode: "HM" },
        { countryName: "Holy See (Vatican City State)", countryCode: "VA" },
        { countryName: "Honduras", countryCode: "HN" },
        { countryName: "Hong Kong", countryCode: "HK" },
        { countryName: "Hungary", countryCode: "HU" },
        { countryName: "CANARY ISLANDS", countryCode: "IC" },
        { countryName: "Iceland", countryCode: "IS" },
        { countryName: "India", countryCode: "IN" },
        { countryName: "Indonesia", countryCode: "ID" },
        { countryName: "Iran", countryCode: "IR" },
        { countryName: "Iraq", countryCode: "IQ" },
        { countryName: "Ireland", countryCode: "IE" },
        { countryName: "Isle of Man", countryCode: "IM" },
        { countryName: "Israel", countryCode: "IL" },
        { countryName: "Italy", countryCode: "IT" },
        { countryName: "Jamaica", countryCode: "JM" },
        { countryName: "Japan", countryCode: "JP" },
        { countryName: "Jersey", countryCode: "JE" },
        { countryName: "Jordan", countryCode: "JO" },
        { countryName: "Kazakhstan", countryCode: "KZ" },
        { countryName: "Kenya", countryCode: "KE" },
        { countryName: "Kiribati", countryCode: "KI" },
        { countryName: "North Korea", countryCode: "KP" },
        { countryName: "South Korea", countryCode: "KR" },
        { countryName: "Kosovo", countryCode: "XK" },
        { countryName: "Kuwait", countryCode: "KW" },
        { countryName: "Kyrgyzstan", countryCode: "KG" },
        { countryName: "Lao People's Democratic Republic", countryCode: "LA" },
        { countryName: "Latvia", countryCode: "LV" },
        { countryName: "Lebanon", countryCode: "LB" },
        { countryName: "Lesotho", countryCode: "LS" },
        { countryName: "Liberia", countryCode: "LR" },
        { countryName: "Libya", countryCode: "LY" },
        { countryName: "Liechtenstein", countryCode: "LI" },
        { countryName: "Lithuania", countryCode: "LT" },
        { countryName: "Luxembourg", countryCode: "LU" },
        { countryName: "Macao", countryCode: "MO" },
        { countryName: "North Macedonia", countryCode: "MK" },
        { countryName: "Madagascar", countryCode: "MG" },
        { countryName: "Malawi", countryCode: "MW" },
        { countryName: "Malaysia", countryCode: "MY" },
        { countryName: "Maldives", countryCode: "MV" },
        { countryName: "Mali", countryCode: "ML" },
        { countryName: "Malta", countryCode: "MT" },
        { countryName: "Marshall Islands", countryCode: "MH" },
        { countryName: "Martinique", countryCode: "MQ" },
        { countryName: "Mauritania", countryCode: "MR" },
        { countryName: "Mauritius", countryCode: "MU" },
        { countryName: "Mayotte", countryCode: "YT" },
        { countryName: "Mexico", countryCode: "MX" },
        { countryName: "Micronesia", countryCode: "FM" },
        { countryName: "Moldova", countryCode: "MD" },
        { countryName: "Monaco", countryCode: "MC" },
        { countryName: "Mongolia", countryCode: "MN" },
        { countryName: "Montenegro", countryCode: "ME" },
        { countryName: "Montserrat", countryCode: "MS" },
        { countryName: "Morocco", countryCode: "MA" },
        { countryName: "Mozambique", countryCode: "MZ" },
        { countryName: "Myanmar", countryCode: "MM" },
        { countryName: "Namibia", countryCode: "NA" },
        { countryName: "Nauru", countryCode: "NR" },
        { countryName: "Nepal", countryCode: "NP" },
        { countryName: "Netherlands", countryCode: "NL" },
        { countryName: "Netherlands Antilles", countryCode: "AN" },
        { countryName: "New Caledonia", countryCode: "NC" },
        { countryName: "New Zealand", countryCode: "NZ" },
        { countryName: "Nicaragua", countryCode: "NI" },
        { countryName: "Niger", countryCode: "NE" },
        { countryName: "Nigeria", countryCode: "NG" },
        { countryName: "Niue", countryCode: "NU" },
        { countryName: "Norfolk Island", countryCode: "NF" },
        { countryName: "Northern Mariana Islands", countryCode: "MP" },
        { countryName: "Norway", countryCode: "NO" },
        { countryName: "Oman", countryCode: "OM" },
        { countryName: "Pakistan", countryCode: "PK" },
        { countryName: "Palau", countryCode: "PW" },
        { countryName: "Palestinian Territory", countryCode: "PS" },
        { countryName: "Panama", countryCode: "PA" },
        { countryName: "Papua New Guinea", countryCode: "PG" },
        { countryName: "Paraguay", countryCode: "PY" },
        { countryName: "Peru", countryCode: "PE" },
        { countryName: "Philippines", countryCode: "PH" },
        { countryName: "Pitcairn", countryCode: "PN" },
        { countryName: "Poland", countryCode: "PL" },
        { countryName: "Portugal", countryCode: "PT" },
        { countryName: "Puerto Rico", countryCode: "PR" },
        { countryName: "Qatar", countryCode: "QA" },
        { countryName: "Reunion", countryCode: "RE" },
        { countryName: "Romania", countryCode: "RO" },
        { countryName: "Russian Federation", countryCode: "RU" },
        { countryName: "Rwanda", countryCode: "RW" },
        { countryName: "Saint Barthelemy", countryCode: "BL" },
        { countryName: "Saint Helena", countryCode: "SH" },
        { countryName: "Saint Kitts and Nevis", countryCode: "KN" },
        { countryName: "Saint Lucia", countryCode: "LC" },
        { countryName: "Saint Martin", countryCode: "MF" },
        { countryName: "Saint Pierre and Miquelon", countryCode: "PM" },
        { countryName: "Saint Vincent and the Grenadines", countryCode: "VC" },
        { countryName: "Samoa", countryCode: "WS" },
        { countryName: "San Marino", countryCode: "SM" },
        { countryName: "Sao Tome and Principe", countryCode: "ST" },
        { countryName: "Saudi Arabia", countryCode: "SA" },
        { countryName: "Senegal", countryCode: "SN" },
        { countryName: "Serbia", countryCode: "RS" },
        { countryName: "Serbia and Montenegro", countryCode: "CS" },
        { countryName: "Seychelles", countryCode: "SC" },
        { countryName: "Sierra Leone", countryCode: "SL" },
        { countryName: "Singapore", countryCode: "SG" },
        { countryName: "Sint Maarten", countryCode: "SX" },
        { countryName: "Slovakia", countryCode: "SK" },
        { countryName: "Slovenia", countryCode: "SI" },
        { countryName: "Solomon Islands", countryCode: "SB" },
        { countryName: "Somalia", countryCode: "SO" },
        { countryName: "South Africa", countryCode: "ZA" },
        { countryName: "South Georgia and the South Sandwich Islands", countryCode: "GS" },
        { countryName: "South Sudan", countryCode: "SS" },
        { countryName: "Spain", countryCode: "ES" },
        { countryName: "Sri Lanka", countryCode: "LK" },
        { countryName: "Sudan", countryCode: "SD" },
        { countryName: "Suriname", countryCode: "SR" },
        { countryName: "Svalbard and Jan Mayen", countryCode: "SJ" },
        { countryName: "Swaziland", countryCode: "SZ" },
        { countryName: "Sweden", countryCode: "SE" },
        { countryName: "Switzerland", countryCode: "CH" },
        { countryName: "Syria", countryCode: "SY" },
        { countryName: "Taiwan", countryCode: "TW" },
        { countryName: "Tajikistan", countryCode: "TJ" },
        { countryName: "Tanzania", countryCode: "TZ" },
        { countryName: "Thailand", countryCode: "TH" },
        { countryName: "Timor-Leste", countryCode: "TL" },
        { countryName: "Togo", countryCode: "TG" },
        { countryName: "Tokelau", countryCode: "TK" },
        { countryName: "Tonga", countryCode: "TO" },
        { countryName: "Trinidad and Tobago", countryCode: "TT" },
        { countryName: "Tunisia", countryCode: "TN" },
        { countryName: "Turkey", countryCode: "TR" },
        { countryName: "Turkmenistan", countryCode: "TM" },
        { countryName: "Turks and Caicos Islands", countryCode: "TC" },
        { countryName: "Tuvalu", countryCode: "TV" },
        { countryName: "Uganda", countryCode: "UG" },
        { countryName: "Ukraine", countryCode: "UA" },
        { countryName: "United Arab Emirates", countryCode: "AE" },
        { countryName: "United Kingdom", countryCode: "GB" },
        { countryName: "United States Minor Outlying Islands", countryCode: "UM" },
        { countryName: "Uruguay", countryCode: "UY" },
        { countryName: "Uzbekistan", countryCode: "UZ" },
        { countryName: "Vanuatu", countryCode: "VU" },
        { countryName: "Venezuela", countryCode: "VE" },
        { countryName: "Viet Nam", countryCode: "VN" },
        { countryName: "Virgin Islands, British", countryCode: "VG" },
        { countryName: "Virgin Islands, U.s.", countryCode: "VI" },
        { countryName: "Wallis and Futuna", countryCode: "WF" },
        { countryName: "Western Sahara", countryCode: "EH" },
        { countryName: "Yemen", countryCode: "YE" },
        { countryName: "Zambia", countryCode: "ZM" },
        { countryName: "Zimbabwe", countryCode: "ZW" }
      ]
    };
  },
  methods: {
    nameWithLang({ countryName, countryCode }) {
      return `${countryName} — [${countryCode}]`;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "EditDestinationForm",
  __ssrInlineRender: true,
  props: {
    destination: {
      type: Object,
      default: () => ({})
    },
    formMode: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      // _method: 'PUT',
      iata: props.destination.iata,
      icao: props.destination.icao,
      city: props.destination.city,
      airport_name: props.destination.airport_name,
      country: props.destination.country,
      latitude: props.destination.latitude ? props.destination.latitude.toString() : props.destination.latitude,
      longitude: props.destination.longitude ? props.destination.longitude.toString() : props.destination.longitude,
      country_code: props.destination.country_code,
      status: props.destination.hasOwnProperty("status") ? props.destination.status : false
    });
    const onStatusChange = (event) => {
      form.status = event;
    };
    const updateDestinationInformation = () => {
      if (props.formMode == "editDestination") {
        form.put(route(
          "destinations.update",
          props.destination.id
        ), {
          preserveScroll: true
        });
      } else {
        form.post(route(
          "destinations.store"
        ), {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateDestinationInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.formMode == "editDestination") {
              _push2(`<span${_scopeId}>Destination Update</span>`);
            } else {
              _push2(`<span${_scopeId}>Destination Add</span>`);
            }
          } else {
            return [
              props.formMode == "editDestination" ? (openBlock(), createBlock("span", { key: 0 }, "Destination Update")) : (openBlock(), createBlock("span", { key: 1 }, "Destination Add"))
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.formMode == "editDestination") {
              _push2(`<span${_scopeId}>Update Destination information.</span>`);
            } else {
              _push2(`<span${_scopeId}>Add Destination information.</span>`);
            }
            if (props.formMode == "editDestination") {
              _push2(`<div class="columns-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>IATA:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(unref(form).iata)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>ICAO:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(unref(form).icao)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Airport Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(unref(form).airport_name)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Country:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(unref(form).country)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Country Code:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(unref(form).country_code)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.formMode == "editDestination" ? (openBlock(), createBlock("span", { key: 0 }, "Update Destination information.")) : (openBlock(), createBlock("span", { key: 1 }, "Add Destination information.")),
              props.formMode == "editDestination" ? (openBlock(), createBlock("div", {
                key: 2,
                class: "columns-1"
              }, [
                createVNode("div", { class: "mt-4 ml-6" }, [
                  createVNode("span", null, "IATA:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(unref(form).iata), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "ICAO:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(unref(form).icao), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Airport Name:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(unref(form).airport_name), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Country:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(unref(form).country), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Country Code:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(unref(form).country_code), 1)
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="DestinationEditForm"${_scopeId}>`);
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "iata",
                value: "IATA",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "iata",
                modelValue: unref(form).iata,
                "onUpdate:modelValue": ($event) => unref(form).iata = $event,
                required: "",
                type: "text",
                class: "mt-2 block w-full",
                autocomplete: "IATA",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.iata,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "icao",
                value: "ICAO",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "icao",
                modelValue: unref(form).icao,
                "onUpdate:modelValue": ($event) => unref(form).icao = $event,
                required: "",
                type: "text",
                class: "mt-2 block w-full",
                autocomplete: "ICAO",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.icao,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "city",
              value: "City",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "city",
              modelValue: unref(form).city,
              "onUpdate:modelValue": ($event) => unref(form).city = $event,
              required: "",
              type: "text",
              class: "mt-2 block w-full",
              autocomplete: "City",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.city,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "airport_name",
                value: "Airport Name",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "airport_name",
                modelValue: unref(form).airport_name,
                "onUpdate:modelValue": ($event) => unref(form).airport_name = $event,
                required: "",
                type: "text",
                class: "mt-2 block w-full",
                autocomplete: "Airport Name",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.airport_name,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "country",
                value: "Country",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Multiselect), {
                modelValue: unref(form).country,
                "onUpdate:modelValue": ($event) => unref(form).country = $event,
                style: { "width": "300px" },
                options: _ctx.countryOptions,
                "custom-label": _ctx.nameWithLang,
                placeholder: "Select Country",
                label: "countryName",
                "track-by": "countryCode",
                "allow-empty": false,
                "preselect-first": true
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "latitude",
                value: "Latitude",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "latitude",
                modelValue: unref(form).latitude,
                "onUpdate:modelValue": ($event) => unref(form).latitude = $event,
                required: "",
                type: "number",
                step: "any",
                class: "mt-2 block w-full",
                autocomplete: "Latitude",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.latitude,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (props.formMode == "addDestination") {
              _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "lonitude",
                value: "Longitude",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "longitude",
                modelValue: unref(form).longitude,
                "onUpdate:modelValue": ($event) => unref(form).longitude = $event,
                required: "",
                type: "number",
                step: "any",
                class: "mt-2 block w-full",
                autocomplete: "Country",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.longitude,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}><div class="mt-2 block w-full" style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId}><label id="toggle-label" class="block font-medium text-sm text-gray-700" value=""${_scopeId}>Destination Status</label></div><div style="${ssrRenderStyle({ "width": "300px", "opacity": ".5" })}"${_scopeId}><small id="toggle-description"${_scopeId}>Set the destination&#39;s status</small></div>`);
            _push2(ssrRenderComponent(ToggleButton, {
              modelValue: unref(form).status,
              "onUpdate:modelValue": ($event) => unref(form).status = $event,
              "on-label": "On",
              "off-label": "Off",
              labelledby: "toggle-label",
              describedby: "toggle-description",
              "false-value": "Inactive",
              "true-value": "Active",
              classes: {
                container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
              },
              onChange: ($event) => onStatusChange($event)
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { id: "DestinationEditForm" }, [
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "col-span-6 sm:col-span-4 mt-2"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "iata",
                    value: "IATA",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "iata",
                    modelValue: unref(form).iata,
                    "onUpdate:modelValue": ($event) => unref(form).iata = $event,
                    required: "",
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "IATA",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.iata,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "col-span-6 sm:col-span-4 mt-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "icao",
                    value: "ICAO",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "icao",
                    modelValue: unref(form).icao,
                    "onUpdate:modelValue": ($event) => unref(form).icao = $event,
                    required: "",
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "ICAO",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.icao,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "city",
                    value: "City",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "city",
                    modelValue: unref(form).city,
                    "onUpdate:modelValue": ($event) => unref(form).city = $event,
                    required: "",
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "City",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.city,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "col-span-6 sm:col-span-4 mt-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "airport_name",
                    value: "Airport Name",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "airport_name",
                    modelValue: unref(form).airport_name,
                    "onUpdate:modelValue": ($event) => unref(form).airport_name = $event,
                    required: "",
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "Airport Name",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.airport_name,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "col-span-6 sm:col-span-4 mt-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "country",
                    value: "Country",
                    style: { "width": "300px" }
                  }),
                  createVNode(unref(Multiselect), {
                    modelValue: unref(form).country,
                    "onUpdate:modelValue": ($event) => unref(form).country = $event,
                    style: { "width": "300px" },
                    options: _ctx.countryOptions,
                    "custom-label": _ctx.nameWithLang,
                    placeholder: "Select Country",
                    label: "countryName",
                    "track-by": "countryCode",
                    "allow-empty": false,
                    "preselect-first": true
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "custom-label"])
                ])) : createCommentVNode("", true),
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "col-span-6 sm:col-span-4 mt-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "latitude",
                    value: "Latitude",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "latitude",
                    modelValue: unref(form).latitude,
                    "onUpdate:modelValue": ($event) => unref(form).latitude = $event,
                    required: "",
                    type: "number",
                    step: "any",
                    class: "mt-2 block w-full",
                    autocomplete: "Latitude",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.latitude,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                props.formMode == "addDestination" ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: "col-span-6 sm:col-span-4 mt-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "lonitude",
                    value: "Longitude",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "longitude",
                    modelValue: unref(form).longitude,
                    "onUpdate:modelValue": ($event) => unref(form).longitude = $event,
                    required: "",
                    type: "number",
                    step: "any",
                    class: "mt-2 block w-full",
                    autocomplete: "Country",
                    style: { "width": "300px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.longitude,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode("div", {
                    class: "mt-2 block w-full",
                    style: { "width": "300px" }
                  }, [
                    createVNode("label", {
                      id: "toggle-label",
                      class: "block font-medium text-sm text-gray-700",
                      value: ""
                    }, "Destination Status")
                  ]),
                  createVNode("div", { style: { "width": "300px", "opacity": ".5" } }, [
                    createVNode("small", { id: "toggle-description" }, "Set the destination's status")
                  ]),
                  createVNode(ToggleButton, {
                    modelValue: unref(form).status,
                    "onUpdate:modelValue": ($event) => unref(form).status = $event,
                    "on-label": "On",
                    "off-label": "Off",
                    labelledby: "toggle-label",
                    describedby: "toggle-description",
                    "false-value": "Inactive",
                    "true-value": "Active",
                    classes: {
                      container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                    },
                    onChange: ($event) => onStatusChange($event)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                ])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              on: unref(form).recentlySuccessful,
              class: "mr-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$page.props.flash.message)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<a href="/destinations"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { type: "button" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</a><span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId}></span>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$5, {
                on: unref(form).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode("a", { href: "/destinations" }, [
                createVNode(_sfc_main$6, { type: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$7, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Destinations/Partials/EditDestinationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
