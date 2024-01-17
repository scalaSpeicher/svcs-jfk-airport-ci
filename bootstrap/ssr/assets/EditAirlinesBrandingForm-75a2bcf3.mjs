import { mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, withDirectives, vModelSelect, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$3 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$6 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$4 } from "./TextInput-e4b68561.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const __default__ = {
  data() {
    return {
      logo_small_white: null,
      file2: null
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "EditAirlinesBrandingForm",
  __ssrInlineRender: true,
  props: {
    airlines_basic: {
      type: Object,
      default: () => ({})
    },
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
    const form = useForm({
      mode: props.airlines_branding.mode,
      primary_color: props.airlines_branding.primary_color,
      secondary_color: props.airlines_branding.secondary_color,
      tertiary_color: props.airlines_branding.tertiary_color,
      font: props.airlines_branding.font,
      font_color_primary: props.airlines_branding.font_color_primary,
      font_color_secondary: props.airlines_branding.font_color_secondary,
      fids_color: props.airlines_branding.fids_color,
      ssbd_logo: props.airlines_branding.ssbd_logo,
      logo_small_white: props.airlines_branding.logo_small_white,
      logo_small_color: props.airlines_branding.logo_small_color,
      logo_large_white: props.airlines_branding.logo_large_white,
      logo_large_color: props.airlines_branding.logo_large_color,
      lids_logo_large: props.airlines_branding.lids_logo_large,
      endcap_fids_logo_small_color: props.airlines_branding.endcap_fids_logo_small_color,
      wayfinding_arrow_color: props.airlines_branding.wayfinding_arrow_color,
      brand_accent_image: props.airlines_branding.brand_accent_image,
      form_name: "airline_branding"
    });
    const onSelectChange = (event) => {
      form.mode = event.target.value;
    };
    const updateAirlineBrandingInformation = () => {
      form.put(route(
        "airlines_branding.update",
        props.airline.id
      ), {
        //errorBag: 'updateAirline',
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateAirlineBrandingInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Airline Branding Update `);
          } else {
            return [
              createTextVNode(" Airline Branding Update ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Update Airline branding information.</span><div class="grid-cols-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>IATA:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.iata)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>ICAO:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.icao)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.name)}</span></div></div>`);
          } else {
            return [
              createVNode("span", null, "Update Airline branding information."),
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
            _push2(`<fieldset${ssrIncludeBooleanAttr(__props.canEditBranding === false) ? " disabled" : ""}${_scopeId}><div id="EditAirlineBrandingForm"${_scopeId}><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "mode",
              value: "Mode",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<select style="${ssrRenderStyle({ "width": "300px" })}" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><option${_scopeId}>${ssrInterpolate(props.airlines_branding.mode ? "Dark" : "Light")}</option><option${_scopeId}>${ssrInterpolate(props.airlines_branding.mode ? "Light" : "Dark")}</option></select>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.mode,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 mb-0"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "primary_color",
              value: "Primary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "primary_color_picker",
              modelValue: unref(form).primary_color,
              "onUpdate:modelValue": ($event) => unref(form).primary_color = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.primary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "primary_color",
              modelValue: unref(form).primary_color,
              "onUpdate:modelValue": ($event) => unref(form).primary_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Primary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.primary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-6 mb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "secondary_color",
              value: "Secondary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "secondary_color_picker",
              modelValue: unref(form).secondary_color,
              "onUpdate:modelValue": ($event) => unref(form).secondary_color = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.secondary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "secondary_color",
              modelValue: unref(form).secondary_color,
              "onUpdate:modelValue": ($event) => unref(form).secondary_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Secondary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.secondary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-6 mb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "tertiary_color",
              value: "Tertiary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "tertiary_color_picker",
              modelValue: unref(form).tertiary_color,
              "onUpdate:modelValue": ($event) => unref(form).tertiary_color = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.tertiary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "tertiary_color",
              modelValue: unref(form).tertiary_color,
              "onUpdate:modelValue": ($event) => unref(form).tertiary_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Tertiary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.tertiary_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-span-6 sm:col-span-4 mt-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "font",
              value: "Font",
              class: "ml-0 block w-full",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "font",
              modelValue: unref(form).font,
              "onUpdate:modelValue": ($event) => unref(form).font = $event,
              type: "text",
              class: "mt-1 ml-0 block w-full",
              autocomplete: "Font",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.font,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 mb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "font_color_primary",
              value: "Font Primary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "font_color_primary_picker",
              modelValue: unref(form).font_color_primary,
              "onUpdate:modelValue": ($event) => unref(form).font_color_primary = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.font_color_primary,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "font_color_primary",
              modelValue: unref(form).font_color_primary,
              "onUpdate:modelValue": ($event) => unref(form).font_color_primary = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Font",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.font_color_primary,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-6 mb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "font_color_secondary",
              value: "Font Secondary Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "font_color_secondary_picker",
              modelValue: unref(form).font_color_secondary,
              "onUpdate:modelValue": ($event) => unref(form).font_color_secondary = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.font_color_secondary,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "font_primary_color",
              modelValue: unref(form).font_color_secondary,
              "onUpdate:modelValue": ($event) => unref(form).font_color_secondary = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Font",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.font_color_secondary,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-6 mb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "fids_color",
              value: "Fids Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "fids_color_picker",
              modelValue: unref(form).fids_color,
              "onUpdate:modelValue": ($event) => unref(form).fids_color = $event,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.fids_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-0" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "fids_color",
              modelValue: unref(form).fids_color,
              "onUpdate:modelValue": ($event) => unref(form).fids_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Fids Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              message: unref(form).errors.fids_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></fieldset>`);
          } else {
            return [
              createVNode("fieldset", {
                disabled: __props.canEditBranding === false
              }, [
                createVNode("div", { id: "EditAirlineBrandingForm" }, [
                  createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                    createVNode(_sfc_main$2, {
                      for: "mode",
                      value: "Mode",
                      style: { "width": "300px" }
                    }),
                    withDirectives(createVNode("select", {
                      ref: "mode",
                      "onUpdate:modelValue": ($event) => unref(form).mode = $event,
                      style: { "width": "300px" },
                      class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                      onChange: ($event) => onSelectChange($event)
                    }, [
                      createVNode("option", null, toDisplayString(props.airlines_branding.mode ? "Dark" : "Light"), 1),
                      createVNode("option", null, toDisplayString(props.airlines_branding.mode ? "Light" : "Dark"), 1)
                    ], 40, ["onUpdate:modelValue", "onChange"]), [
                      [vModelSelect, unref(form).mode]
                    ]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.mode,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }),
                  createVNode(_sfc_main$2, {
                    for: "primary_color",
                    value: "Primary Color",
                    style: { "width": "300px" }
                  }),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "primary_color_picker",
                        modelValue: unref(form).primary_color,
                        "onUpdate:modelValue": ($event) => unref(form).primary_color = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.primary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "primary_color",
                        modelValue: unref(form).primary_color,
                        "onUpdate:modelValue": ($event) => unref(form).primary_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Primary Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.primary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }, [
                    createVNode(_sfc_main$2, {
                      for: "secondary_color",
                      value: "Secondary Color",
                      style: { "width": "300px" }
                    })
                  ]),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "secondary_color_picker",
                        modelValue: unref(form).secondary_color,
                        "onUpdate:modelValue": ($event) => unref(form).secondary_color = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.secondary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "secondary_color",
                        modelValue: unref(form).secondary_color,
                        "onUpdate:modelValue": ($event) => unref(form).secondary_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Secondary Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.secondary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }, [
                    createVNode(_sfc_main$2, {
                      for: "tertiary_color",
                      value: "Tertiary Color",
                      style: { "width": "300px" }
                    })
                  ]),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "tertiary_color_picker",
                        modelValue: unref(form).tertiary_color,
                        "onUpdate:modelValue": ($event) => unref(form).tertiary_color = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.tertiary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "tertiary_color",
                        modelValue: unref(form).tertiary_color,
                        "onUpdate:modelValue": ($event) => unref(form).tertiary_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Tertiary Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.tertiary_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", {
                    class: "col-span-6 sm:col-span-4 mt-4",
                    style: { "opacity": ".75" }
                  }, [
                    createVNode(_sfc_main$2, {
                      for: "font",
                      value: "Font",
                      class: "ml-0 block w-full",
                      style: { "width": "300px" }
                    }),
                    createVNode(_sfc_main$4, {
                      id: "font",
                      modelValue: unref(form).font,
                      "onUpdate:modelValue": ($event) => unref(form).font = $event,
                      type: "text",
                      class: "mt-1 ml-0 block w-full",
                      autocomplete: "Font",
                      style: { "width": "300px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$3, {
                      message: unref(form).errors.font,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }, [
                    createVNode(_sfc_main$2, {
                      for: "font_color_primary",
                      value: "Font Primary Color",
                      style: { "width": "300px" }
                    })
                  ]),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "font_color_primary_picker",
                        modelValue: unref(form).font_color_primary,
                        "onUpdate:modelValue": ($event) => unref(form).font_color_primary = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.font_color_primary,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "font_color_primary",
                        modelValue: unref(form).font_color_primary,
                        "onUpdate:modelValue": ($event) => unref(form).font_color_primary = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Font",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.font_color_primary,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }, [
                    createVNode(_sfc_main$2, {
                      for: "font_color_secondary",
                      value: "Font Secondary Color",
                      style: { "width": "300px" }
                    })
                  ]),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "font_color_secondary_picker",
                        modelValue: unref(form).font_color_secondary,
                        "onUpdate:modelValue": ($event) => unref(form).font_color_secondary = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.font_color_secondary,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "font_primary_color",
                        modelValue: unref(form).font_color_secondary,
                        "onUpdate:modelValue": ($event) => unref(form).font_color_secondary = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Font",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.font_color_secondary,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 mb-0" }, [
                    createVNode(_sfc_main$2, {
                      for: "fids_color",
                      value: "Fids Color",
                      style: { "width": "300px" }
                    })
                  ]),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "fids_color_picker",
                        modelValue: unref(form).fids_color,
                        "onUpdate:modelValue": ($event) => unref(form).fids_color = $event,
                        type: "color",
                        class: "mt-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.fids_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-0",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$4, {
                        id: "fids_color",
                        modelValue: unref(form).fids_color,
                        "onUpdate:modelValue": ($event) => unref(form).fids_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Fids Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$3, {
                        message: unref(form).errors.fids_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ])
                ])
              ], 8, ["disabled"])
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
            _push2(`<a href="/airlines"${_scopeId}>`);
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
              style: __props.canEditBranding === true ? null : { display: "none" },
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
              createVNode("a", { href: "/airlines" }, [
                createVNode(_sfc_main$6, { type: "button" }, {
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
                [vShow, __props.canEditBranding === true]
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/Partials/EditAirlinesBrandingForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
