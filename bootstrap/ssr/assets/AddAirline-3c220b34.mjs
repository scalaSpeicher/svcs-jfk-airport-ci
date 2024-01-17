import { mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$9 } from "./AppLayout-348f14a8.mjs";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$6 } from "./ActionMessage-d6a1993d.mjs";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
import { _ as _sfc_main$8 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$7 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$5 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$3 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$4 } from "./TextInput-e4b68561.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./SectionTitle-592cad78.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "AddAirline",
  __ssrInlineRender: true,
  props: {
    canAddAirlines: {
      type: Boolean,
      default: () => false
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
    const form = useForm({
      iata: "",
      icao: "",
      name: "",
      status: false,
      mode: "Light",
      primary_color: "#a03d8c",
      secondary_color: "#d31c77",
      tertiary_color: "#002b5c",
      font: "Poppins",
      font_color_primary: "#ffffff",
      font_color_secondary: "#ffffff",
      fids_color: "black",
      lids_background_color: "#162f56",
      lids_status_bar_color: "#323237",
      ssbd_logo: "ssbd_logo/jfkT4_SSBD_3168px_Logo.png",
      logo_small_white: "default_generic_logo/default_airline_logo.png",
      logo_small_color: "logo_small_color/wayfinding_icon_jfkT4.png",
      logo_large_white: "default_generic_logo/default_airline_logo.png",
      logo_large_color: "logo_large_color/wayfinding_jfkT4.png",
      lids_logo_large: "lids_logo_large/JFKIAT_Check_In_Counter_Logo.png",
      endcap_fids_logo_small_color: "endcap_fids_logo_small_color/small_airlines_jfkT4.png",
      wayfinding_arrow_color: "wayfinding_arrow_color/jfkT4_wf_arrow_up_55x55.png",
      brand_accent_image: "default_generic_logo/default_airline_logo.png"
    });
    const onStatusChange = (event) => {
      form.status = event;
    };
    const addAirlineGeneralInformation = () => {
      form.post(route(
        "airlines.store"
      ), {
        //errorBag: 'createAirline',
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Add Airline </h2></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Add Airline ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "width": "100%", "height": "30px" })}"${_scopeId}></div>`);
            if (__props.canAddAirlines) {
              _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto px-400 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between h-16"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { onSubmitted: addAirlineGeneralInformation }, {
                title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Airline General Information `);
                  } else {
                    return [
                      createTextVNode(" Airline General Information ")
                    ];
                  }
                }),
                description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Add Airline general information.</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Add Airline general information.")
                    ];
                  }
                }),
                form: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div id="AddAirlineGeneralForm"${_scopeId2}><div class="col-span-6 sm:col-span-4 mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      for: "iata",
                      value: "IATA",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      id: "iata",
                      modelValue: unref(form).iata,
                      "onUpdate:modelValue": ($event) => unref(form).iata = $event,
                      type: "text",
                      class: "mt-2 block w-full",
                      autocomplete: "IATA",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      message: unref(form).errors.iata,
                      class: "mt-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      for: "icao",
                      value: "ICAO",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      id: "icao",
                      modelValue: unref(form).icao,
                      "onUpdate:modelValue": ($event) => unref(form).icao = $event,
                      type: "text",
                      class: "mt-2 block w-full",
                      autocomplete: "ICAO",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      message: unref(form).errors.icao,
                      class: "mt-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      for: "name",
                      value: "Airline Name",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      id: "name",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      type: "text",
                      class: "mt-2 block w-full",
                      autocomplete: "Name",
                      style: { "width": "300px" }
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      message: unref(form).errors.name,
                      class: "mt-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId2}><div class="mt-2 block w-full" style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId2}><label id="toggle-label" class="block font-medium text-sm text-gray-700" value=""${_scopeId2}>Airline Status</label></div><div style="${ssrRenderStyle({ "width": "300px", "opacity": ".5" })}"${_scopeId2}><small id="toggle-description"${_scopeId2}>Turn ON to set airline status to Active</small></div>`);
                    _push3(ssrRenderComponent(ToggleButton, {
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
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { id: "AddAirlineGeneralForm" }, [
                        createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                          createVNode(_sfc_main$3, {
                            for: "iata",
                            value: "IATA",
                            style: { "width": "300px" }
                          }),
                          createVNode(_sfc_main$4, {
                            id: "iata",
                            modelValue: unref(form).iata,
                            "onUpdate:modelValue": ($event) => unref(form).iata = $event,
                            type: "text",
                            class: "mt-2 block w-full",
                            autocomplete: "IATA",
                            style: { "width": "300px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.iata,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                          createVNode(_sfc_main$3, {
                            for: "icao",
                            value: "ICAO",
                            style: { "width": "300px" }
                          }),
                          createVNode(_sfc_main$4, {
                            id: "icao",
                            modelValue: unref(form).icao,
                            "onUpdate:modelValue": ($event) => unref(form).icao = $event,
                            type: "text",
                            class: "mt-2 block w-full",
                            autocomplete: "ICAO",
                            style: { "width": "300px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.icao,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                          createVNode(_sfc_main$3, {
                            for: "name",
                            value: "Airline Name",
                            style: { "width": "300px" }
                          }),
                          createVNode(_sfc_main$4, {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: "mt-2 block w-full",
                            autocomplete: "Name",
                            style: { "width": "300px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$5, {
                            message: unref(form).errors.name,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
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
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$6, {
                      on: unref(form).recentlySuccessful,
                      class: "mr-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.$page.props.flash.message)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<a href="/airlines"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$7, { type: "button" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Cancel `);
                        } else {
                          return [
                            createTextVNode(" Cancel ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</a><span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId2}></span>`);
                    _push3(ssrRenderComponent(_sfc_main$8, {
                      class: { "opacity-25": unref(form).processing },
                      disabled: unref(form).processing
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Save `);
                        } else {
                          return [
                            createTextVNode(" Save ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$6, {
                        on: unref(form).recentlySuccessful,
                        class: "mr-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                        ]),
                        _: 1
                      }, 8, ["on"]),
                      createVNode("a", { href: "/airlines" }, [
                        createVNode(_sfc_main$7, { type: "button" }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("span", { style: { "width": "20px" } }),
                      createVNode(_sfc_main$8, {
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
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$9, {
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
              createVNode("div", { style: { "width": "100%", "height": "30px" } }),
              __props.canAddAirlines ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-400 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between h-16" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$2, { onSubmitted: addAirlineGeneralInformation }, {
                        title: withCtx(() => [
                          createTextVNode(" Airline General Information ")
                        ]),
                        description: withCtx(() => [
                          createVNode("span", null, "Add Airline general information.")
                        ]),
                        form: withCtx(() => [
                          createVNode("div", { id: "AddAirlineGeneralForm" }, [
                            createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                              createVNode(_sfc_main$3, {
                                for: "iata",
                                value: "IATA",
                                style: { "width": "300px" }
                              }),
                              createVNode(_sfc_main$4, {
                                id: "iata",
                                modelValue: unref(form).iata,
                                "onUpdate:modelValue": ($event) => unref(form).iata = $event,
                                type: "text",
                                class: "mt-2 block w-full",
                                autocomplete: "IATA",
                                style: { "width": "300px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$5, {
                                message: unref(form).errors.iata,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                              createVNode(_sfc_main$3, {
                                for: "icao",
                                value: "ICAO",
                                style: { "width": "300px" }
                              }),
                              createVNode(_sfc_main$4, {
                                id: "icao",
                                modelValue: unref(form).icao,
                                "onUpdate:modelValue": ($event) => unref(form).icao = $event,
                                type: "text",
                                class: "mt-2 block w-full",
                                autocomplete: "ICAO",
                                style: { "width": "300px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$5, {
                                message: unref(form).errors.icao,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                              createVNode(_sfc_main$3, {
                                for: "name",
                                value: "Airline Name",
                                style: { "width": "300px" }
                              }),
                              createVNode(_sfc_main$4, {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                type: "text",
                                class: "mt-2 block w-full",
                                autocomplete: "Name",
                                style: { "width": "300px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$5, {
                                message: unref(form).errors.name,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ]),
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
                                "false-value": "Inactive",
                                "true-value": "Active",
                                classes: {
                                  container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                                },
                                onChange: ($event) => onStatusChange($event)
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                            ])
                          ])
                        ]),
                        actions: withCtx(() => [
                          createVNode(_sfc_main$6, {
                            on: unref(form).recentlySuccessful,
                            class: "mr-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.flash.message), 1)
                            ]),
                            _: 1
                          }, 8, ["on"]),
                          createVNode("a", { href: "/airlines" }, [
                            createVNode(_sfc_main$7, { type: "button" }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("span", { style: { "width": "20px" } }),
                          createVNode(_sfc_main$8, {
                            class: { "opacity-25": unref(form).processing },
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Save ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
              }, [
                createVNode("p", null, "You do not have permission to access this page."),
                createVNode(_sfc_main$9, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/AddAirline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
