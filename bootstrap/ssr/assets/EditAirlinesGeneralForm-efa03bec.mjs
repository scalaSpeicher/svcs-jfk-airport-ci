import { mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "EditAirlinesGeneralForm",
  __ssrInlineRender: true,
  props: {
    airline: {
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
      status: props.airline.status
    });
    const onStatusChange = (event) => {
      form.status = event;
    };
    const updateAirlineGeneralInformation = () => {
      form.put(route(
        "airlines.update",
        props.airline.id
      ), {
        //errorBag: 'updateAirline',
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateAirlineGeneralInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Airline General Update `);
          } else {
            return [
              createTextVNode(" Airline General Update ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Update Airline general information.</span><div class="grid-cols-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>IATA:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.iata)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>ICAO:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.icao)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.name)}</span></div></div>`);
          } else {
            return [
              createVNode("span", null, "Update Airline general information."),
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
            _push2(`<div id="EditAirlineGeneralForm"${_scopeId}><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}><div class="mt-2 block w-full" style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId}><label id="toggle-label" class="block font-medium text-sm text-gray-700" value=""${_scopeId}>Airline Status</label></div><div style="${ssrRenderStyle({ "width": "300px", "opacity": ".5" })}"${_scopeId}><small id="toggle-description"${_scopeId}>Turn ON to set airline status to Active</small></div>`);
            _push2(ssrRenderComponent(ToggleButton, {
              modelValue: unref(form).status,
              "onUpdate:modelValue": ($event) => unref(form).status = $event,
              "on-label": "On",
              "off-label": "Off",
              labelledby: "toggle-label",
              describedby: "toggle-description",
              disabled: __props.canEditAirlines === false,
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
              createVNode("div", { id: "EditAirlineGeneralForm" }, [
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode("div", {
                    class: "mt-2 block w-full",
                    style: { "width": "300px" }
                  }, [
                    createVNode("label", {
                      id: "toggle-label",
                      class: "block font-medium text-sm text-gray-700",
                      value: ""
                    }, "Airline Status")
                  ]),
                  createVNode("div", { style: { "width": "300px", "opacity": ".5" } }, [
                    createVNode("small", { id: "toggle-description" }, "Turn ON to set airline status to Active")
                  ]),
                  createVNode(ToggleButton, {
                    modelValue: unref(form).status,
                    "onUpdate:modelValue": ($event) => unref(form).status = $event,
                    "on-label": "On",
                    "off-label": "Off",
                    labelledby: "toggle-label",
                    describedby: "toggle-description",
                    disabled: __props.canEditAirlines === false,
                    "false-value": "Inactive",
                    "true-value": "Active",
                    classes: {
                      container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                    },
                    onChange: ($event) => onStatusChange($event)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])
                ])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
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
            _push2(ssrRenderComponent(_sfc_main$3, { type: "button" }, {
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
            _push2(ssrRenderComponent(_sfc_main$4, {
              style: __props.canEditAirlines === true ? null : { display: "none" },
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
              createVNode(_sfc_main$2, {
                on: unref(form).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode("a", { href: "/airlines" }, [
                createVNode(_sfc_main$3, { type: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("span", { style: { "width": "20px" } }),
              withDirectives(createVNode(_sfc_main$4, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"]), [
                [vShow, __props.canEditAirlines === true]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/Partials/EditAirlinesGeneralForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
