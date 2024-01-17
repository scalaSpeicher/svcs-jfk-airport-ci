import { computed, mergeProps, unref, useSSRContext, reactive, withCtx, createVNode, createTextVNode, openBlock, createBlock, withDirectives, vShow } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$6 } from "./AppLayout-348f14a8.mjs";
import _sfc_main$4 from "./EditAirlinesGeneralForm-efa03bec.mjs";
import _sfc_main$3 from "./EditAirlinesBrandingForm-75a2bcf3.mjs";
import _sfc_main$5 from "./EditAirlinesLidsForm-f7b11006.mjs";
import EditAirlinesLogosForm from "./EditAirlinesLogosForm-990c31c9.mjs";
import { S as SectionBorder } from "./SectionBorder-bc7fc547.mjs";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./ActionMessage-d6a1993d.mjs";
import "./FormSection-a1f03dbe.mjs";
import "./SectionTitle-592cad78.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./ToggleButton-5ebee51d.mjs";
import "@vueform/toggle";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./TextInput-e4b68561.mjs";
import "./DialogModal-c762adec.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main$1 = {
  __name: "SecondaryNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      default: () => ""
    },
    active: Boolean
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return props.active ? "cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "cursor-pointer inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(classes),
        style: { "height": "40px" }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryNavLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "EditAirlines",
  __ssrInlineRender: true,
  props: {
    airline: {
      type: Object,
      default: () => ({})
    },
    airlines_basic: {
      type: Object,
      default: () => ({})
    },
    airlines_branding: {
      type: Object,
      default: () => ({})
    },
    airlines_labels_lid: {
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
    const formShown = reactive({ form: "general", genActive: true, brandActive: false, lidsActive: false, logosActive: false });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Modify Airline </h2></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Modify Airline ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.canEditAirlines) {
              _push2(`<div${_scopeId}><div class="space-x-8 flex justify-center bg-white shadow"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                active: formShown.genActive,
                onClick: ($event) => (formShown.form = "general", formShown.genActive = true, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = false)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` General `);
                  } else {
                    return [
                      createTextVNode(" General ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                active: formShown.brandActive,
                onClick: ($event) => (formShown.form = "branding", formShown.genActive = false, formShown.brandActive = true, formShown.lidsActive = false, formShown.logosActive = false)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Branding `);
                  } else {
                    return [
                      createTextVNode(" Branding ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                active: formShown.logosActive,
                onClick: ($event) => (formShown.form = "logos", formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = true)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Logos `);
                  } else {
                    return [
                      createTextVNode(" Logos ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                active: formShown.lidsActive,
                onClick: ($event) => (formShown.form = "lids", formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = true, formShown.logosActive = false)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` LIDS `);
                  } else {
                    return [
                      createTextVNode(" LIDS ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="max-w-7xl mx-auto px-400 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between h-16"${_scopeId}><div style="${ssrRenderStyle(formShown.form === "logos" ? null : { display: "none" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(EditAirlinesLogosForm, {
                airlines_branding: _ctx.$page.props.airlines_branding,
                airline: _ctx.$page.props.airlines_basic,
                "can-edit-logos": __props.canEditLogos,
                class: "mt-6"
              }, null, _parent2, _scopeId));
              _push2(`</div><div style="${ssrRenderStyle(formShown.form === "branding" ? null : { display: "none" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                airlines_branding: _ctx.$page.props.airlines_branding,
                airline: _ctx.$page.props.airlines_basic,
                "can-edit-branding": __props.canEditBranding,
                class: "mt-6"
              }, null, _parent2, _scopeId));
              _push2(`</div><div style="${ssrRenderStyle(formShown.form === "general" ? null : { display: "none" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                airline: _ctx.$page.props.airlines_basic,
                "can-edit-airlines": __props.canEditAirlines,
                class: "mt-6"
              }, null, _parent2, _scopeId));
              _push2(`</div><div style="${ssrRenderStyle(formShown.form === "lids" ? null : { display: "none" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                airlines_labels_lid: _ctx.$page.props.airlines_labels_lid,
                airlines_branding: _ctx.$page.props.airlines_branding,
                airline: _ctx.$page.props.airlines_basic,
                "can-edit-labels": __props.canEditLabels,
                class: "mt-6"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(SectionBorder, null, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                href: _ctx.route("airlines.index"),
                active: _ctx.route().current("airlines.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Return to Airlines List Page `);
                  } else {
                    return [
                      createTextVNode(" Return to Airlines List Page ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              __props.canEditAirlines ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "space-x-8 flex justify-center bg-white shadow" }, [
                  createVNode(_sfc_main$1, {
                    active: formShown.genActive,
                    onClick: ($event) => (formShown.form = "general", formShown.genActive = true, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" General ")
                    ]),
                    _: 1
                  }, 8, ["active", "onClick"]),
                  createVNode(_sfc_main$1, {
                    active: formShown.brandActive,
                    onClick: ($event) => (formShown.form = "branding", formShown.genActive = false, formShown.brandActive = true, formShown.lidsActive = false, formShown.logosActive = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Branding ")
                    ]),
                    _: 1
                  }, 8, ["active", "onClick"]),
                  createVNode(_sfc_main$1, {
                    active: formShown.logosActive,
                    onClick: ($event) => (formShown.form = "logos", formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = true)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Logos ")
                    ]),
                    _: 1
                  }, 8, ["active", "onClick"]),
                  createVNode(_sfc_main$1, {
                    active: formShown.lidsActive,
                    onClick: ($event) => (formShown.form = "lids", formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = true, formShown.logosActive = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" LIDS ")
                    ]),
                    _: 1
                  }, 8, ["active", "onClick"])
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto px-400 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between h-16" }, [
                    withDirectives(createVNode("div", null, [
                      createVNode(EditAirlinesLogosForm, {
                        airlines_branding: _ctx.$page.props.airlines_branding,
                        airline: _ctx.$page.props.airlines_basic,
                        "can-edit-logos": __props.canEditLogos,
                        class: "mt-6"
                      }, null, 8, ["airlines_branding", "airline", "can-edit-logos"])
                    ], 512), [
                      [vShow, formShown.form === "logos"]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode(_sfc_main$3, {
                        airlines_branding: _ctx.$page.props.airlines_branding,
                        airline: _ctx.$page.props.airlines_basic,
                        "can-edit-branding": __props.canEditBranding,
                        class: "mt-6"
                      }, null, 8, ["airlines_branding", "airline", "can-edit-branding"])
                    ], 512), [
                      [vShow, formShown.form === "branding"]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode(_sfc_main$4, {
                        airline: _ctx.$page.props.airlines_basic,
                        "can-edit-airlines": __props.canEditAirlines,
                        class: "mt-6"
                      }, null, 8, ["airline", "can-edit-airlines"])
                    ], 512), [
                      [vShow, formShown.form === "general"]
                    ]),
                    withDirectives(createVNode("div", null, [
                      createVNode(_sfc_main$5, {
                        airlines_labels_lid: _ctx.$page.props.airlines_labels_lid,
                        airlines_branding: _ctx.$page.props.airlines_branding,
                        airline: _ctx.$page.props.airlines_basic,
                        "can-edit-labels": __props.canEditLabels,
                        class: "mt-6"
                      }, null, 8, ["airlines_labels_lid", "airlines_branding", "airline", "can-edit-labels"])
                    ], 512), [
                      [vShow, formShown.form === "lids"]
                    ]),
                    createVNode(SectionBorder)
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
              }, [
                createVNode("p", null, "You do not have permission to access this page."),
                createVNode(_sfc_main$6, {
                  href: _ctx.route("airlines.index"),
                  active: _ctx.route().current("airlines.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Return to Airlines List Page ")
                  ]),
                  _: 1
                }, 8, ["href", "active"])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/EditAirlines.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
