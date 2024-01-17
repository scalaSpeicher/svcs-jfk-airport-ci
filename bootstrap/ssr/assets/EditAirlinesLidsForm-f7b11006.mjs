import { ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$6 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$5 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$3 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$8 } from "./DialogModal-c762adec.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main = {
  __name: "EditAirlinesLidsForm",
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
    const props = __props;
    const confirmingLabelDeletion = ref(false);
    const confirmingLabelCreation = ref(false);
    const displayMessage = ref(false);
    const displayError = ref(false);
    const errorMessage = ref("");
    let form = useForm("editAirlines", {
      background_color: props.airlines_branding.lids_background_color ? props.airlines_branding.lids_background_color : "",
      status_bar_color: props.airlines_branding.lids_status_bar_color ? props.airlines_branding.lids_status_bar_color : "",
      airlines_labels_lids: props.airlines_labels_lid ? props.airlines_labels_lid : ""
    });
    const labelCreateForm = useForm({
      airline_id: props.airline.id,
      label_name: "",
      class_code: ""
    });
    let deleteLabelId;
    const labelDeleteForm = useForm({
      label_id: deleteLabelId
    });
    const updateAirlineLidsInformation = () => {
      displayMessage.value = false;
      form.put(route(
        "airlines_labels_lids.update",
        props.airline.id
      ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
        onSuccess: () => displayingMessage(form, 1e4),
        onError: () => displayingMessage(form, 1e4, true)
      });
    };
    const deleteLabel = () => {
      labelDeleteForm.delete(route(
        "airlines_labels_lids.destroy",
        deleteLabelId
      ), {
        // preserveScroll: true,
        onSuccess: () => displayingMessage(form, 2e3)
      });
    };
    const createLabel = () => {
      displayMessage.value = false;
      labelCreateForm.clearErrors();
      if (labelCreateForm.label_name == "") {
        labelCreateForm.setError("label_name", "Label required.");
      }
      if (labelCreateForm.class_code == "") {
        labelCreateForm.setError("class_code", "Class code required.");
      }
      for (let i = 0; i < props.airlines_labels_lid.length; i++) {
        if (props.airlines_labels_lid[i].label == labelCreateForm.label_name) {
          labelCreateForm.setError("label_name", "Label must be unique.");
        }
        if (props.airlines_labels_lid[i].class_code == labelCreateForm.class_code) {
          labelCreateForm.setError("class_code", "Class code must be unique.");
        }
      }
      if (Object.keys(labelCreateForm.errors).length > 0) {
        return;
      }
      labelCreateForm.post(route("airlines_labels_lids.store"), {
        onSuccess: () => displayingMessage(form, 2e3),
        onError: () => label_name.value.focus()
      });
    };
    const confirmLabelDeletion = (labelId) => {
      displayMessage.value = false;
      deleteLabelId = labelId;
      confirmingLabelDeletion.value = true;
    };
    const confirmLabelCreation = () => {
      confirmingLabelCreation.value = true;
    };
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const displayingMessage = async (form2, time, error = false) => {
      displayError.value = false;
      if (confirmingLabelDeletion.value || confirmingLabelCreation.value) {
        closeModal();
        form2.airlines_labels_lids = props.airlines_labels_lid;
      } else if (error) {
        displayError.value = true;
        errorMessage.value = form2.errors.message;
        form2.airlines_labels_lids = props.airlines_labels_lid;
      }
      displayMessage.value = true;
      await delay(parseInt(time));
      displayMessage.value = false;
    };
    const closeModal = () => {
      confirmingLabelDeletion.value = false;
      confirmingLabelCreation.value = false;
    };
    const classCodeChange = (event) => {
      if (typeof event.key === "undefined") {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9.]/gi, "").toUpperCase();
      } else if (event.key.length == 1) {
        event.preventDefault();
        event.target.value = event.key.replace(/[^A-Za-z0-9.]/gi, "").toUpperCase();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateAirlineLidsInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Airline LIDS Update `);
          } else {
            return [
              createTextVNode(" Airline LIDS Update ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Update Airline LIDS information.</span><div class="grid-cols-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>IATA:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.iata)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>ICAO:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.icao)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.airlines_basic.name)}</span></div></div>`);
          } else {
            return [
              createVNode("span", null, "Update Airline LIDS information."),
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
            _push2(`<fieldset${ssrIncludeBooleanAttr(__props.canEditLabels === false) ? " disabled" : ""}${_scopeId}><div id="EditAirlineLidsForm"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "iata",
              value: "Background Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "background_color_picker",
              modelValue: unref(form).background_color,
              "onUpdate:modelValue": ($event) => unref(form).background_color = $event,
              type: "color",
              class: "mt-4 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.background_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-2" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "background_color",
              modelValue: unref(form).background_color,
              "onUpdate:modelValue": ($event) => unref(form).background_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.background_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "status_bar_color",
              value: "Status Bar Color",
              class: "mt-4",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex"${_scopeId}><div class="col-span-6 sm:col-span-4" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "status_bar_color_picker",
              modelValue: unref(form).status_bar_color,
              "onUpdate:modelValue": ($event) => unref(form).status_bar_color = $event,
              type: "color",
              class: "mt-4 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.status_bar_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-2" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "status_bar_color",
              modelValue: unref(form).status_bar_color,
              "onUpdate:modelValue": ($event) => unref(form).status_bar_color = $event,
              type: "text",
              class: "mt-1 ml-2 block w-full",
              autocomplete: "Color",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.status_bar_color,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-span-6 sm:col-span-4 mt-6"${_scopeId}><table class="min-w-full max-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> LABELS </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Delete </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> CLASS CODE </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).airlines_labels_lids, (label) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(label.label)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                onClick: ($event) => confirmLabelDeletion(label.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` X `);
                  } else {
                    return [
                      createTextVNode(" X ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                id: "status_bar_color",
                modelValue: label.class_code,
                "onUpdate:modelValue": ($event) => label.class_code = $event,
                type: "text",
                class: "mt-2 block w-full",
                autocomplete: "Class Code",
                style: { "width": "100px" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                message: unref(form).errors.class_code,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--><tr class="h-30 px-6 py-3 text-xs font-bold text-right uppercase border col-span-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-4 ml-4 mb-4",
              style: { "width": "120px" },
              onClick: confirmLabelCreation
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` New Label `);
                } else {
                  return [
                    createTextVNode(" New Label ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</tr></tbody></table></div></div></fieldset>`);
          } else {
            return [
              createVNode("fieldset", {
                disabled: __props.canEditLabels === false
              }, [
                createVNode("div", { id: "EditAirlineLidsForm" }, [
                  createVNode(_sfc_main$2, {
                    for: "iata",
                    value: "Background Color",
                    style: { "width": "300px" }
                  }),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$3, {
                        id: "background_color_picker",
                        modelValue: unref(form).background_color,
                        "onUpdate:modelValue": ($event) => unref(form).background_color = $event,
                        type: "color",
                        class: "mt-4 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(form).errors.background_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-2",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$3, {
                        id: "background_color",
                        modelValue: unref(form).background_color,
                        "onUpdate:modelValue": ($event) => unref(form).background_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(form).errors.background_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode(_sfc_main$2, {
                    for: "status_bar_color",
                    value: "Status Bar Color",
                    class: "mt-4",
                    style: { "width": "300px" }
                  }),
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$3, {
                        id: "status_bar_color_picker",
                        modelValue: unref(form).status_bar_color,
                        "onUpdate:modelValue": ($event) => unref(form).status_bar_color = $event,
                        type: "color",
                        class: "mt-4 block w-full",
                        autocomplete: "Color",
                        style: { "width": "24px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(form).errors.status_bar_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-6 sm:col-span-4 mt-2",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$3, {
                        id: "status_bar_color",
                        modelValue: unref(form).status_bar_color,
                        "onUpdate:modelValue": ($event) => unref(form).status_bar_color = $event,
                        type: "text",
                        class: "mt-1 ml-2 block w-full",
                        autocomplete: "Color",
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(form).errors.status_bar_color,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ]),
                  createVNode("div", { class: "col-span-6 sm:col-span-4 mt-6" }, [
                    createVNode("table", { class: "min-w-full max-w-full divide-y divide-gray-200 border-separate" }, [
                      createVNode("thead", { class: "bg-gray-200 border" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, " LABELS "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, " Delete "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, " CLASS CODE ")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).airlines_labels_lids, (label) => {
                          return openBlock(), createBlock("tr", {
                            key: label.id
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(label.label), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                              createVNode(_sfc_main$5, {
                                onClick: ($event) => confirmLabelDeletion(label.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" X ")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                              createVNode(_sfc_main$3, {
                                id: "status_bar_color",
                                modelValue: label.class_code,
                                "onUpdate:modelValue": ($event) => label.class_code = $event,
                                type: "text",
                                class: "mt-2 block w-full",
                                autocomplete: "Class Code",
                                style: { "width": "100px" },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$4, {
                                message: unref(form).errors.class_code,
                                class: "mt-2"
                              }, null, 8, ["message"])
                            ])
                          ]);
                        }), 128)),
                        createVNode("tr", { class: "h-30 px-6 py-3 text-xs font-bold text-right uppercase border col-span-2" }, [
                          createVNode(_sfc_main$5, {
                            class: "mt-4 ml-4 mb-4",
                            style: { "width": "120px" },
                            onClick: confirmLabelCreation
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" New Label ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ], 8, ["disabled"])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, {
              on: displayMessage.value,
              html: displayError.value ? errorMessage.value : _ctx.$page.props.flash.message,
              class: "mr-3 text-left"
            }, null, _parent2, _scopeId));
            _push2(`<a href="/airlines"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, { type: "button" }, {
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
              style: __props.canEditLabels === true ? null : { display: "none" },
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
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: confirmingLabelDeletion.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>DELETE LABEL</span>`);
                } else {
                  return [
                    createVNode("span", null, "DELETE LABEL")
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Do you really want to delete this label?</span>`);
                } else {
                  return [
                    createVNode("span", null, "Do you really want to delete this label?")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` NO `);
                      } else {
                        return [
                          createTextVNode(" NO ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId2}></span>`);
                  _push3(ssrRenderComponent(_sfc_main$7, { onClick: deleteLabel }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` YES `);
                      } else {
                        return [
                          createTextVNode(" YES ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(" NO ")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { style: { "width": "20px" } }),
                    createVNode(_sfc_main$7, { onClick: deleteLabel }, {
                      default: withCtx(() => [
                        createTextVNode(" YES ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              show: confirmingLabelCreation.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>ADD LABEL</span>`);
                } else {
                  return [
                    createVNode("span", null, "ADD LABEL")
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="md:grid md:grid-cols-2 md:gap-6 mt-6"${_scopeId2}><div class="col-span-1 sm:col-span-1 mt-2 float-left" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    for: "label_name",
                    value: "Airline Label",
                    style: { "width": "300px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "label_name",
                    modelValue: unref(labelCreateForm).label_name,
                    "onUpdate:modelValue": ($event) => unref(labelCreateForm).label_name = $event,
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "label_name",
                    style: { "width": "300px" },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: unref(labelCreateForm).errors.label_name,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="col-span-1 sm:col-span-1 mt-2 float-left" style="${ssrRenderStyle({ "opacity": ".75" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    for: "class_code",
                    value: "Class Code",
                    style: { "width": "300px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    id: "class_code",
                    modelValue: unref(labelCreateForm).class_code,
                    "onUpdate:modelValue": ($event) => unref(labelCreateForm).class_code = $event,
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "class_code",
                    style: { "width": "300px" },
                    required: "",
                    onKeyup: classCodeChange
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: unref(labelCreateForm).errors.class_code,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "md:grid md:grid-cols-2 md:gap-6 mt-6" }, [
                      createVNode("div", {
                        class: "col-span-1 sm:col-span-1 mt-2 float-left",
                        style: { "opacity": ".75" }
                      }, [
                        createVNode(_sfc_main$2, {
                          for: "label_name",
                          value: "Airline Label",
                          style: { "width": "300px" }
                        }),
                        createVNode(_sfc_main$3, {
                          id: "label_name",
                          modelValue: unref(labelCreateForm).label_name,
                          "onUpdate:modelValue": ($event) => unref(labelCreateForm).label_name = $event,
                          type: "text",
                          class: "mt-2 block w-full",
                          autocomplete: "label_name",
                          style: { "width": "300px" },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          message: unref(labelCreateForm).errors.label_name,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", {
                        class: "col-span-1 sm:col-span-1 mt-2 float-left",
                        style: { "opacity": ".75" }
                      }, [
                        createVNode(_sfc_main$2, {
                          for: "class_code",
                          value: "Class Code",
                          style: { "width": "300px" }
                        }),
                        createVNode(_sfc_main$3, {
                          id: "class_code",
                          modelValue: unref(labelCreateForm).class_code,
                          "onUpdate:modelValue": ($event) => unref(labelCreateForm).class_code = $event,
                          type: "text",
                          class: "mt-2 block w-full",
                          autocomplete: "class_code",
                          style: { "width": "300px" },
                          required: "",
                          onKeyup: classCodeChange
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          message: unref(labelCreateForm).errors.class_code,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, { onClick: closeModal }, {
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
                  _push3(`<span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId2}></span>`);
                  _push3(ssrRenderComponent(_sfc_main$7, { onClick: createLabel }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` ADD `);
                      } else {
                        return [
                          createTextVNode(" ADD ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(" CANCEL ")
                      ]),
                      _: 1
                    }),
                    createVNode("span", { style: { "width": "20px" } }),
                    createVNode(_sfc_main$7, { onClick: createLabel }, {
                      default: withCtx(() => [
                        createTextVNode(" ADD ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$6, {
                on: displayMessage.value,
                html: displayError.value ? errorMessage.value : _ctx.$page.props.flash.message,
                class: "mr-3 text-left"
              }, null, 8, ["on", "html"]),
              createVNode("a", { href: "/airlines" }, [
                createVNode(_sfc_main$5, { type: "button" }, {
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
                [vShow, __props.canEditLabels === true]
              ]),
              createVNode(_sfc_main$8, {
                show: confirmingLabelDeletion.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createVNode("span", null, "DELETE LABEL")
                ]),
                content: withCtx(() => [
                  createVNode("span", null, "Do you really want to delete this label?")
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$5, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" NO ")
                    ]),
                    _: 1
                  }),
                  createVNode("span", { style: { "width": "20px" } }),
                  createVNode(_sfc_main$7, { onClick: deleteLabel }, {
                    default: withCtx(() => [
                      createTextVNode(" YES ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["show"]),
              createVNode(_sfc_main$8, {
                show: confirmingLabelCreation.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createVNode("span", null, "ADD LABEL")
                ]),
                content: withCtx(() => [
                  createVNode("div", { class: "md:grid md:grid-cols-2 md:gap-6 mt-6" }, [
                    createVNode("div", {
                      class: "col-span-1 sm:col-span-1 mt-2 float-left",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$2, {
                        for: "label_name",
                        value: "Airline Label",
                        style: { "width": "300px" }
                      }),
                      createVNode(_sfc_main$3, {
                        id: "label_name",
                        modelValue: unref(labelCreateForm).label_name,
                        "onUpdate:modelValue": ($event) => unref(labelCreateForm).label_name = $event,
                        type: "text",
                        class: "mt-2 block w-full",
                        autocomplete: "label_name",
                        style: { "width": "300px" },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(labelCreateForm).errors.label_name,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", {
                      class: "col-span-1 sm:col-span-1 mt-2 float-left",
                      style: { "opacity": ".75" }
                    }, [
                      createVNode(_sfc_main$2, {
                        for: "class_code",
                        value: "Class Code",
                        style: { "width": "300px" }
                      }),
                      createVNode(_sfc_main$3, {
                        id: "class_code",
                        modelValue: unref(labelCreateForm).class_code,
                        "onUpdate:modelValue": ($event) => unref(labelCreateForm).class_code = $event,
                        type: "text",
                        class: "mt-2 block w-full",
                        autocomplete: "class_code",
                        style: { "width": "300px" },
                        required: "",
                        onKeyup: classCodeChange
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: unref(labelCreateForm).errors.class_code,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$5, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" CANCEL ")
                    ]),
                    _: 1
                  }),
                  createVNode("span", { style: { "width": "20px" } }),
                  createVNode(_sfc_main$7, { onClick: createLabel }, {
                    default: withCtx(() => [
                      createTextVNode(" ADD ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Airlines/Partials/EditAirlinesLidsForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
