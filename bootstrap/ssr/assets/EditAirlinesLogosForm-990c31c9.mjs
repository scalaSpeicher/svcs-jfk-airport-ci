import { ref, computed, unref, useSSRContext, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vShow } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$8 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$2 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$5 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$3 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$4 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$6 } from "./DialogModal-c762adec.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./SectionTitle-592cad78.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main$1 = {
  __name: "FileInput",
  __ssrInlineRender: true,
  props: {
    file_description: {
      type: String,
      default: ""
    },
    file: {
      type: File,
      default: null
    }
  },
  emits: ["fileSelected"],
  setup(__props, { emit }) {
    const file = ref(null);
    const fileName = computed(() => {
      var _a;
      return (_a = file.value) == null ? void 0 : _a.name;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(_attrs)}><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase shadow-sm tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"><span>Select File</span></div><div class="ml-2 mt-4">`);
      if (file.value) {
        _push(`<span class="text-sm font-medium leading-5 text-gray-500">Selected File: ${ssrInterpolate(unref(fileName))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><input type="file" accept="image/x-png,image/gif,image/jpeg" style="${ssrRenderStyle({ "display": "none" })}"></div></label>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FileInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const EditAirlinesLogosForm_vue_vue_type_style_index_0_scoped_7a77fef1_lang = "";
const _sfc_main = {
  __name: "EditAirlinesLogosForm",
  __ssrInlineRender: true,
  props: {
    airline: {
      type: Object,
      default: () => ({})
    },
    airlines_branding: {
      type: Object,
      default: () => ({})
    },
    canEditAirlines: {
      type: Boolean,
      default: () => false
    },
    canEditLabels: {
      type: Boolean,
      default: () => false
    },
    canEditBranding: {
      type: Boolean,
      default: () => false
    },
    canEditLogos: {
      type: Boolean,
      default: () => false
    }
  },
  setup(__props) {
    const props = __props;
    const confirmingLogoCreation = ref(false);
    let logoName = "";
    let logoInfo = "";
    const storagePath = props.airlines_branding.brand_store;
    const generateRandomQueryParam = () => "?r=" + Math.random();
    const logoPreview = reactive({
      ssbd_logo: storagePath + props.airlines_branding.ssbd_logo + generateRandomQueryParam(),
      logo_small_color: storagePath + props.airlines_branding.logo_small_color + generateRandomQueryParam(),
      logo_large_color: storagePath + props.airlines_branding.logo_large_color + generateRandomQueryParam(),
      lids_logo_large: storagePath + props.airlines_branding.lids_logo_large + generateRandomQueryParam(),
      endcap_fids_logo_small_color: storagePath + props.airlines_branding.endcap_fids_logo_small_color + generateRandomQueryParam(),
      wayfinding_arrow_color: storagePath + props.airlines_branding.wayfinding_arrow_color + generateRandomQueryParam()
    });
    const form = useForm({
      _method: "PUT",
      ssbd_logo: props.airlines_branding.ssbd_logo,
      logo_small_color: props.airlines_branding.logo_small_color,
      logo_large_color: props.airlines_branding.logo_large_color,
      lids_logo_large: props.airlines_branding.lids_logo_large,
      endcap_fids_logo_small_color: props.airlines_branding.endcap_fids_logo_small_color,
      wayfinding_arrow_color: props.airlines_branding.wayfinding_arrow_color,
      form_name: "airline_logos"
    });
    const logoInformationMap = {
      "Self-Service Bag Drop Position": "Specifications: 3168 pixels width X 360 pixels height; Format: PNG; Safe Zone: avoid encroaching on the top 100 pixels to allow for LIDS labels overlay.",
      "Check-In Counter Position": "Specifications: 710 pixels width X 360 pixels height; Format: PNG; Safe Zone: avoid encroaching on the top 100 pixels to allow for LIDS labels overlay.",
      "Medium Wayfinding": "Specifications: 214 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically.",
      "Small Wayfinding": "Specifications: 55 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically.",
      "Endcap FIDS Small": "Specifications: 37 pixels width x 37 pixels height; Format: PNG; Center horizontally and vertically.",
      "Endcap Wayfinding Arrow": "Specifications: 55 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically. Use primary brand color matching Medium and Small wayfinding logos"
    };
    const getLogoInformation = () => logoInformationMap[logoName] || "";
    const confirmLogoCreation = (name) => {
      confirmingLogoCreation.value = true;
      logoName = name;
      logoInfo = getLogoInformation();
    };
    const validateLogoDimensions = (logoName2, height, width) => {
      const dimensionsMap = {
        "Self-Service Bag Drop Position": { width: 3168, height: 360 },
        "Check-In Counter Position": { width: 710, height: 360 },
        "Medium Wayfinding": { width: 214, height: 55 },
        "Small Wayfinding": { width: 55, height: 55 },
        "Endcap FIDS Small": { width: 37, height: 37 },
        "Endcap Wayfinding Arrow": { width: 55, height: 55 }
      };
      const requiredDimensions = dimensionsMap[logoName2];
      if (requiredDimensions && (width !== requiredDimensions.width || height !== requiredDimensions.height)) {
        logoupload.uploaded = false;
        logoError.status = true;
      } else {
        logoupload.uploaded = true;
        logoError.status = false;
      }
    };
    const logoupload = reactive({ uploaded: false });
    const logoError = reactive({ status: false });
    const photoPreview = reactive({ value: null });
    let logofile = null;
    const processFile = (fileUploaded) => {
      logofile = fileUploaded;
      const img = new Image();
      img.onload = function() {
        const width = img.width;
        const height = img.height;
        validateLogoDimensions(logoName, height, width);
      };
      img.onerror = function() {
        alert("not a valid image file: " + fileUploaded.type);
      };
      img.src = URL.createObjectURL(fileUploaded);
      const reader = new FileReader();
      reader.readAsDataURL(logofile);
      reader.onload = (e) => {
        photoPreview.value = e.target.result;
      };
      logoupload.uploaded = true;
    };
    const logos = reactive({
      ssbd: null,
      lidsLarge: null,
      logoLargeColor: null,
      logoSmallColor: null,
      endcapSmallColor: null,
      wayfindArrow: null
    });
    const logosUpdated = reactive({
      ssbd: false,
      lidsLarge: false,
      logoLargeColor: false,
      logoSmallColor: false,
      endcapSmallColor: false,
      wayfindArrow: false
    });
    const initialLogo = {
      ssbd: true,
      lidsLarge: true,
      logoLargeColor: true,
      logoSmallColor: true,
      endcapSmallColor: true,
      wayfindArrow: true
    };
    const logoSaved = reactive({
      ssbd: false,
      lidsLarge: false,
      logoLargeColor: false,
      logoSmallColor: false,
      endcapSmallColor: false,
      wayfindArrow: false
    });
    const submitLogoFile = (name) => {
      if (logofile !== null) {
        const logosMap = {
          "Self-Service Bag Drop Position": { property: "ssbd", updated: "ssbd", initial: "ssbd", saved: "ssbd" },
          "Check-In Counter Position": { property: "lidsLarge", updated: "lidsLarge", initial: "lidsLarge", saved: "lidsLarge" },
          "Medium Wayfinding": { property: "logoLargeColor", updated: "logoLargeColor", initial: "logoLargeColor", saved: "logoLargeColor" },
          "Small Wayfinding": { property: "logoSmallColor", updated: "logoSmallColor", initial: "logoSmallColor", saved: "logoSmallColor" },
          "Endcap FIDS Small": { property: "endcapSmallColor", updated: "endcapSmallColor", initial: "endcapSmallColor", saved: "endcapSmallColor" },
          "Endcap Wayfinding Arrow": { property: "wayfindArrow", updated: "wayfindArrow", initial: "wayfindArrow", saved: "wayfindArrow" }
        };
        const logoMap = logosMap[logoName];
        if (logoMap) {
          logos[logoMap.property] = photoPreview.value;
          logosUpdated[logoMap.updated] = true;
          initialLogo[logoMap.initial] = false;
          logoSaved[logoMap.saved] = false;
        }
      }
      closeModal();
    };
    const clearFile = () => {
      logofile = null;
      logoName = "";
      photoPreview.value = null;
    };
    const closeModal = () => {
      clearFile();
      logoupload.uploaded = false;
      logoError.status = false;
      confirmingLogoCreation.value = false;
    };
    const updateAirlineBrandingInformation = () => {
      form.ssbd_logo = logos.ssbd;
      form.logo_small_color = logos.logoSmallColor;
      form.logo_large_color = logos.logoLargeColor;
      form.lids_logo_large = logos.lidsLarge;
      form.endcap_fids_logo_small_color = logos.endcapSmallColor;
      form.wayfinding_arrow_color = logos.wayfindArrow;
      form.put(route(
        "airlines_branding.update",
        props.airline.id
      ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
        //resetOnSuccess: true,
        preserveState: true
      });
      logoSaved.ssbd = true;
      logoSaved.logoSmallColor = true;
      logoSaved.logoLargeColor = true;
      logoSaved.lidsLarge = true;
      logoSaved.endcapSmallColor = true;
      logoSaved.wayfindArrow = true;
    };
    const handleImageError = (event) => {
      event.target.style.display = "none";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ onSubmitted: updateAirlineBrandingInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Airline Logo Update `);
          } else {
            return [
              createTextVNode(" Airline Logo Update ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-7a77fef1${_scopeId}>Update Airline logo information.</span><div class="grid-cols-1" data-v-7a77fef1${_scopeId}><div class="mt-4 ml-6" data-v-7a77fef1${_scopeId}><span data-v-7a77fef1${_scopeId}>IATA:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}" data-v-7a77fef1${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.iata)}</span></div><div class="ml-6" data-v-7a77fef1${_scopeId}><span data-v-7a77fef1${_scopeId}>ICAO:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}" data-v-7a77fef1${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.icao)}</span></div><div class="ml-6" data-v-7a77fef1${_scopeId}><span data-v-7a77fef1${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}" data-v-7a77fef1${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.name)}</span></div></div>`);
          } else {
            return [
              createVNode("span", null, "Update Airline logo information."),
              createVNode("div", { class: "grid-cols-1" }, [
                createVNode("div", { class: "mt-4 ml-6" }, [
                  createVNode("span", null, "IATA:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(_ctx.$page.props.airlines_basic.iata), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "ICAO:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(_ctx.$page.props.airlines_basic.icao), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Name:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(_ctx.$page.props.airlines_basic.name), 1)
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<fieldset${ssrIncludeBooleanAttr(__props.canEditLogos === false) ? " disabled" : ""} data-v-7a77fef1${_scopeId}><div id="EditAirlineLogosForm" data-v-7a77fef1${_scopeId}><div class="col-span-6 sm:col-span-4 mt-4 block" data-v-7a77fef1${_scopeId}><div data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "ssbd_logo",
              value: "Self-Service Bag Drop Position",
              style: { "width": "300px", "font-weight": "900" }
            }, null, _parent2, _scopeId));
            if (logoSaved.ssbd === false & logosUpdated.ssbd) {
              _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (logosUpdated.ssbd) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.ssbd)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (initialLogo.ssbd) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.ssbd_logo)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2 ml-2",
              style: { "width": "180px" },
              type: "button",
              onClick: ($event) => confirmLogoCreation("Self-Service Bag Drop Position")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select A New Logo `);
                } else {
                  return [
                    createTextVNode(" Select A New Logo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.ssbd_logo,
              class: "mt-2",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "lids_logo_large",
              value: "Check-In Counter Position",
              class: "mt-6",
              style: { "width": "300px", "font-weight": "900" }
            }, null, _parent2, _scopeId));
            if (logoSaved.lidsLarge === false & logosUpdated.lidsLarge) {
              _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (logosUpdated.lidsLarge) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.lidsLarge)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (initialLogo.lidsLarge) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.lids_logo_large)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2 ml-2",
              style: { "width": "180px" },
              type: "button",
              onClick: ($event) => confirmLogoCreation("Check-In Counter Position")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select A New Logo `);
                } else {
                  return [
                    createTextVNode(" Select A New Logo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.lids_logo_large,
              class: "mt-2",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "logo_large_color",
              value: "Medium Wayfinding",
              class: "mt-6",
              style: { "width": "300px", "font-weight": "900" }
            }, null, _parent2, _scopeId));
            if (logoSaved.logoLargeColor === false & logosUpdated.logoLargeColor) {
              _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (logosUpdated.logoLargeColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.logoLargeColor)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (initialLogo.logoLargeColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.logo_large_color)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2 ml-2",
              style: { "width": "180px" },
              type: "button",
              onClick: ($event) => confirmLogoCreation("Medium Wayfinding")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select A New Logo `);
                } else {
                  return [
                    createTextVNode(" Select A New Logo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.logo_large_color,
              class: "mt-2",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "logo_small_color",
              value: "Small Wayfinding",
              class: "mt-6",
              style: { "width": "300px", "font-weight": "900" }
            }, null, _parent2, _scopeId));
            if (logoSaved.logoSmallColor === false & logosUpdated.logoSmallColor) {
              _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (logosUpdated.logoSmallColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.logoSmallColor)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (initialLogo.logoSmallColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.logo_small_color)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2 ml-2",
              style: { "width": "180px" },
              type: "button",
              onClick: ($event) => confirmLogoCreation("Small Wayfinding")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select A New Logo `);
                } else {
                  return [
                    createTextVNode(" Select A New Logo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.logo_small_color,
              class: "mt-2",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "endcap_fids_logo_small_color",
              value: "Endcap FIDS Small",
              class: "mt-6",
              style: { "width": "300px", "font-weight": "900" }
            }, null, _parent2, _scopeId));
            if (logoSaved.endcapSmallColor === false & logosUpdated.endcapSmallColor) {
              _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (logosUpdated.endcapSmallColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.endcapSmallColor)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (initialLogo.endcapSmallColor) {
              _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.endcap_fids_logo_small_color)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2 ml-2",
              style: { "width": "180px" },
              type: "button",
              onClick: ($event) => confirmLogoCreation("Endcap FIDS Small")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select A New Logo `);
                } else {
                  return [
                    createTextVNode(" Select A New Logo ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.endcap_fids_logo_small_color,
              class: "mt-2",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.canEditAirlines) {
              _push2(`<div data-v-7a77fef1${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                for: "wayfinding_arrow_color",
                value: "Endcap Wayfinding Arrow",
                class: "mt-6",
                style: { "width": "300px", "font-weight": "900" }
              }, null, _parent2, _scopeId));
              if (logoSaved.wayfindArrow === false & logosUpdated.wayfindArrow) {
                _push2(`<div class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500" style="${ssrRenderStyle({ "width": "500px" })}" data-v-7a77fef1${_scopeId}> Logo changed - pending final save. </div>`);
              } else {
                _push2(`<!---->`);
              }
              if (logosUpdated.wayfindArrow) {
                _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logos.wayfindArrow)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (initialLogo.wayfindArrow) {
                _push2(`<div class="mt-2" style="${ssrRenderStyle({ "width": "480px" })}" data-v-7a77fef1${_scopeId}><img${ssrRenderAttr("src", logoPreview.wayfinding_arrow_color)} class="mt-4 mb-4 pt1 border" style="${ssrRenderStyle({ "display": "block" })}" data-v-7a77fef1${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$4, {
                class: "mt-2 ml-2",
                style: { "width": "180px" },
                type: "button",
                onClick: ($event) => confirmLogoCreation("Endcap Wayfinding Arrow")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Select A New Logo `);
                  } else {
                    return [
                      createTextVNode(" Select A New Logo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(form).errors.wayfinding_arrow_color,
                class: "mt-2",
                style: { "width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></fieldset>`);
          } else {
            return [
              createVNode("fieldset", {
                disabled: __props.canEditLogos === false
              }, [
                createVNode("div", { id: "EditAirlineLogosForm" }, [
                  createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4 block" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "ssbd_logo",
                        value: "Self-Service Bag Drop Position",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.ssbd === false & logosUpdated.ssbd ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.ssbd ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.ssbd,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.ssbd ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.ssbd_logo,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Self-Service Bag Drop Position"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.ssbd_logo,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "lids_logo_large",
                        value: "Check-In Counter Position",
                        class: "mt-6",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.lidsLarge === false & logosUpdated.lidsLarge ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.lidsLarge ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.lidsLarge,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.lidsLarge ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.lids_logo_large,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Check-In Counter Position"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.lids_logo_large,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "logo_large_color",
                        value: "Medium Wayfinding",
                        class: "mt-6",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.logoLargeColor === false & logosUpdated.logoLargeColor ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.logoLargeColor ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.logoLargeColor,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.logoLargeColor ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.logo_large_color,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Medium Wayfinding"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.logo_large_color,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "logo_small_color",
                        value: "Small Wayfinding",
                        class: "mt-6",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.logoSmallColor === false & logosUpdated.logoSmallColor ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.logoSmallColor ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.logoSmallColor,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.logoSmallColor ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.logo_small_color,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Small Wayfinding"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.logo_small_color,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        for: "endcap_fids_logo_small_color",
                        value: "Endcap FIDS Small",
                        class: "mt-6",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.endcapSmallColor === false & logosUpdated.endcapSmallColor ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.endcapSmallColor ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.endcapSmallColor,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.endcapSmallColor ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.endcap_fids_logo_small_color,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Endcap FIDS Small"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.endcap_fids_logo_small_color,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ]),
                    __props.canEditAirlines ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_sfc_main$3, {
                        for: "wayfinding_arrow_color",
                        value: "Endcap Wayfinding Arrow",
                        class: "mt-6",
                        style: { "width": "300px", "font-weight": "900" }
                      }),
                      logoSaved.wayfindArrow === false & logosUpdated.wayfindArrow ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 ml-2 text-sm font-medium leading-5 text-green-500",
                        style: { "width": "500px" }
                      }, " Logo changed - pending final save. ")) : createCommentVNode("", true),
                      logosUpdated.wayfindArrow ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logos.wayfindArrow,
                          class: "mt-4 mb-4 pt1 border"
                        }, null, 8, ["src"])
                      ])) : createCommentVNode("", true),
                      initialLogo.wayfindArrow ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2",
                        style: { "width": "480px" }
                      }, [
                        createVNode("img", {
                          src: logoPreview.wayfinding_arrow_color,
                          class: "mt-4 mb-4 pt1 border",
                          style: { "display": "block" },
                          onError: handleImageError
                        }, null, 40, ["src"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$4, {
                        class: "mt-2 ml-2",
                        style: { "width": "180px" },
                        type: "button",
                        onClick: withModifiers(($event) => confirmLogoCreation("Endcap Wayfinding Arrow"), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Select A New Logo ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_sfc_main$5, {
                        message: unref(form).errors.wayfinding_arrow_color,
                        class: "mt-2",
                        style: { "width": "300px" }
                      }, null, 8, ["message"])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ], 8, ["disabled"])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, {
              show: confirmingLogoCreation.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-7a77fef1${_scopeId2}>Update ${ssrInterpolate(unref(logoName))} Logo</span>`);
                } else {
                  return [
                    createVNode("span", null, "Update " + toDisplayString(unref(logoName)) + " Logo", 1)
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mb-4 ml-2 text-sm font-medium leading-5 text-gray-500" data-v-7a77fef1${_scopeId2}>${ssrInterpolate(unref(logoInfo))}</div><div class="col-span-6 sm:col-span-4 mt-2" data-v-7a77fef1${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    class: "ml-2",
                    onFileSelected: processFile
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div style="${ssrRenderStyle(logoError.status === true ? null : { display: "none" })}" class="mb-4 ml-2 text-sm font-medium leading-5 text-red-500" data-v-7a77fef1${_scopeId2}> !! - The image uploaded does not meet the dimensions required for this logo type. </div><div class="flex justify-center" data-v-7a77fef1${_scopeId2}><img style="${ssrRenderStyle(logoupload.uploaded === true ? null : { display: "none" })}"${ssrRenderAttr("src", photoPreview.value)} class="mt-4 mb-4 pt1 border" data-v-7a77fef1${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mb-4 ml-2 text-sm font-medium leading-5 text-gray-500" }, toDisplayString(unref(logoInfo)), 1),
                    createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                      createVNode(_sfc_main$1, {
                        class: "ml-2",
                        onFileSelected: processFile
                      })
                    ]),
                    withDirectives(createVNode("div", { class: "mb-4 ml-2 text-sm font-medium leading-5 text-red-500" }, " !! - The image uploaded does not meet the dimensions required for this logo type. ", 512), [
                      [vShow, logoError.status === true]
                    ]),
                    createVNode("div", { class: "flex justify-center" }, [
                      withDirectives(createVNode("img", {
                        src: photoPreview.value,
                        class: "mt-4 mb-4 pt1 border"
                      }, null, 8, ["src"]), [
                        [vShow, logoupload.uploaded === true]
                      ])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { onClick: closeModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` CANCEL `);
                      } else {
                        return [
                          createTextVNode(" CANCEL ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span style="${ssrRenderStyle({ "width": "20px" })}" data-v-7a77fef1${_scopeId2}></span>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    style: logoupload.uploaded === true ? null : { display: "none" },
                    onClick: ($event) => submitLogoFile({ logoName: unref(logoName) })
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` SUBMIT `);
                      } else {
                        return [
                          createTextVNode(" SUBMIT ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    style: [
                      logoupload.uploaded === false ? null : { display: "none" },
                      { "opacity": ".5", "cursor": "default" }
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` SUBMIT `);
                      } else {
                        return [
                          createTextVNode(" SUBMIT ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(" CANCEL ")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { style: { "width": "20px" } }),
                    withDirectives(createVNode(_sfc_main$7, {
                      onClick: ($event) => submitLogoFile({ logoName: unref(logoName) })
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" SUBMIT ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]), [
                      [vShow, logoupload.uploaded === true]
                    ]),
                    withDirectives(createVNode(_sfc_main$4, { style: { "opacity": ".5", "cursor": "default" } }, {
                      default: withCtx(() => [
                        createTextVNode(" SUBMIT ")
                      ]),
                      _: 1
                    }, 512), [
                      [vShow, logoupload.uploaded === false]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
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
            _push2(`<a href="/airlines" data-v-7a77fef1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { type: "button" }, {
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
            _push2(`</a><span style="${ssrRenderStyle({ "width": "20px" })}" data-v-7a77fef1${_scopeId}></span>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              style: __props.canEditLogos === true ? null : { display: "none" },
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
              createVNode(_sfc_main$6, {
                show: confirmingLogoCreation.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createVNode("span", null, "Update " + toDisplayString(unref(logoName)) + " Logo", 1)
                ]),
                content: withCtx(() => [
                  createVNode("div", { class: "mb-4 ml-2 text-sm font-medium leading-5 text-gray-500" }, toDisplayString(unref(logoInfo)), 1),
                  createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                    createVNode(_sfc_main$1, {
                      class: "ml-2",
                      onFileSelected: processFile
                    })
                  ]),
                  withDirectives(createVNode("div", { class: "mb-4 ml-2 text-sm font-medium leading-5 text-red-500" }, " !! - The image uploaded does not meet the dimensions required for this logo type. ", 512), [
                    [vShow, logoError.status === true]
                  ]),
                  createVNode("div", { class: "flex justify-center" }, [
                    withDirectives(createVNode("img", {
                      src: photoPreview.value,
                      class: "mt-4 mb-4 pt1 border"
                    }, null, 8, ["src"]), [
                      [vShow, logoupload.uploaded === true]
                    ])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$4, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" CANCEL ")
                    ]),
                    _: 1
                  }),
                  createVNode("span", { style: { "width": "20px" } }),
                  withDirectives(createVNode(_sfc_main$7, {
                    onClick: ($event) => submitLogoFile({ logoName: unref(logoName) })
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" SUBMIT ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]), [
                    [vShow, logoupload.uploaded === true]
                  ]),
                  withDirectives(createVNode(_sfc_main$4, { style: { "opacity": ".5", "cursor": "default" } }, {
                    default: withCtx(() => [
                      createTextVNode(" SUBMIT ")
                    ]),
                    _: 1
                  }, 512), [
                    [vShow, logoupload.uploaded === false]
                  ])
                ]),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$8, {
                on: unref(form).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode("a", { href: "/airlines" }, [
                createVNode(_sfc_main$4, { type: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("span", { style: { "width": "20px" } }),
              withDirectives(createVNode(_sfc_main$7, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"]), [
                [vShow, __props.canEditLogos === true]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/Partials/EditAirlinesLogosForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditAirlinesLogosForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7a77fef1"]]);
export {
  EditAirlinesLogosForm as default
};
