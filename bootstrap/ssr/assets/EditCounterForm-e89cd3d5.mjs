import { reactive, mergeProps, withCtx, openBlock, createBlock, createVNode, toDisplayString, unref, withDirectives, vModelSelect, createTextVNode, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$6 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$3 } from "./TextInput-e4b68561.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "EditCounterForm",
  __ssrInlineRender: true,
  props: {
    counter: {
      type: Object,
      default: () => ({
        position: "entry",
        type: "single"
      })
    },
    formMode: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    const counterform = reactive({ changed: false });
    const form = useForm({
      // _method: 'PUT',
      counter_location: props.counter.counter_location ? props.counter.counter_location : "1",
      row: props.counter.row ? props.counter.row : "1",
      position: props.counter.position ? props.counter.position : "entry",
      width: props.counter.width ? props.counter.width : "1",
      type: props.counter.type ? props.counter.type : "single"
    });
    const onChange = (event) => {
      form[event.target.name] = event.target.value;
      counterform.changed = true;
    };
    const ucFirst = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    const updateCounterInformation = () => {
      if (props.formMode == "editCounter") {
        form.put(route(
          "counters.update",
          props.counter.id
        ), {
          preserveScroll: true
        });
      } else {
        form.post(route(
          "counters.store"
        ), {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updateCounterInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.formMode == "editCounter") {
              _push2(`<span${_scopeId}>Counter Update</span>`);
            } else {
              _push2(`<span${_scopeId}>Counter Add</span>`);
            }
          } else {
            return [
              props.formMode == "editCounter" ? (openBlock(), createBlock("span", { key: 0 }, "Counter Update")) : (openBlock(), createBlock("span", { key: 1 }, "Counter Add"))
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (props.formMode == "editCounter") {
              _push2(`<span${_scopeId}>Update Counter Information</span>`);
            } else {
              _push2(`<span${_scopeId}>Add Counter Information</span>`);
            }
            _push2(`<div class="columns-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>Location:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editCounter" ? __props.counter.counter_location : "1")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Row:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editCounter" ? __props.counter.row : "1")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Position:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editCounter" ? ucFirst(__props.counter.position) : "Entry")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Width:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editCounter" ? __props.counter.width : "1")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Type:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editCounter" ? ucFirst(__props.counter.type) : "Single")}</span></div></div></div>`);
          } else {
            return [
              createVNode("div", null, [
                props.formMode == "editCounter" ? (openBlock(), createBlock("span", { key: 0 }, "Update Counter Information")) : (openBlock(), createBlock("span", { key: 1 }, "Add Counter Information")),
                createVNode("div", { class: "columns-1" }, [
                  createVNode("div", { class: "mt-4 ml-6" }, [
                    createVNode("span", null, "Location:  "),
                    createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editCounter" ? __props.counter.counter_location : "1"), 1)
                  ]),
                  createVNode("div", { class: "ml-6" }, [
                    createVNode("span", null, "Row:  "),
                    createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editCounter" ? __props.counter.row : "1"), 1)
                  ]),
                  createVNode("div", { class: "ml-6" }, [
                    createVNode("span", null, "Position:  "),
                    createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editCounter" ? ucFirst(__props.counter.position) : "Entry"), 1)
                  ]),
                  createVNode("div", { class: "ml-6" }, [
                    createVNode("span", null, "Width:  "),
                    createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editCounter" ? __props.counter.width : "1"), 1)
                  ]),
                  createVNode("div", { class: "ml-6" }, [
                    createVNode("span", null, "Type:  "),
                    createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editCounter" ? ucFirst(__props.counter.type) : "Single"), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="CounterEditForm"${_scopeId}><div class="col-span-6 sm:col-span-4 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "counter_location",
              value: "Counter Location",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "counter_location",
              modelValue: unref(form).counter_location,
              "onUpdate:modelValue": ($event) => unref(form).counter_location = $event,
              type: "number",
              min: "1",
              required: "",
              class: "mt-2 block w-full",
              autocomplete: "Counter Location",
              style: { "width": "300px" },
              name: "counter_location",
              onChange
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.counter_location,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "row",
              value: "Counter Row",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "row",
              modelValue: unref(form).row,
              "onUpdate:modelValue": ($event) => unref(form).row = $event,
              type: "number",
              min: "1",
              class: "mt-2 block w-full",
              autocomplete: "Row",
              style: { "width": "300px" },
              name: "row",
              onChange
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.row,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "position",
              value: "Counter Position",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<select required class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" style="${ssrRenderStyle({ "width": "300px" })}" name="position"${_scopeId}><option value="entry"${_scopeId}> Entry </option><option value="security"${_scopeId}> Security </option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.position,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "width",
              value: "Counter Width",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "width",
              modelValue: unref(form).width,
              "onUpdate:modelValue": ($event) => unref(form).width = $event,
              type: "number",
              min: "1",
              class: "mt-2 block w-full",
              autocomplete: "Width",
              style: { "width": "300px" },
              name: "width",
              onChange
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.width,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "type",
              value: "Counter Type",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<select required class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" style="${ssrRenderStyle({ "width": "300px" })}" name="type"${_scopeId}><option value="single"${_scopeId}> Single </option><option value="double"${_scopeId}> Double </option></select>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.type,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { id: "CounterEditForm" }, [
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "counter_location",
                    value: "Counter Location",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "counter_location",
                    modelValue: unref(form).counter_location,
                    "onUpdate:modelValue": ($event) => unref(form).counter_location = $event,
                    type: "number",
                    min: "1",
                    required: "",
                    class: "mt-2 block w-full",
                    autocomplete: "Counter Location",
                    style: { "width": "300px" },
                    name: "counter_location",
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.counter_location,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "row",
                    value: "Counter Row",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "row",
                    modelValue: unref(form).row,
                    "onUpdate:modelValue": ($event) => unref(form).row = $event,
                    type: "number",
                    min: "1",
                    class: "mt-2 block w-full",
                    autocomplete: "Row",
                    style: { "width": "300px" },
                    name: "row",
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.row,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "position",
                    value: "Counter Position",
                    style: { "width": "300px" }
                  }),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).position = $event,
                    required: "",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    style: { "width": "300px" },
                    name: "position",
                    onChange
                  }, [
                    createVNode("option", { value: "entry" }, " Entry "),
                    createVNode("option", { value: "security" }, " Security ")
                  ], 40, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).position]
                  ]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.position,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "width",
                    value: "Counter Width",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "width",
                    modelValue: unref(form).width,
                    "onUpdate:modelValue": ($event) => unref(form).width = $event,
                    type: "number",
                    min: "1",
                    class: "mt-2 block w-full",
                    autocomplete: "Width",
                    style: { "width": "300px" },
                    name: "width",
                    onChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.width,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "type",
                    value: "Counter Type",
                    style: { "width": "300px" }
                  }),
                  withDirectives(createVNode("select", {
                    ref: "counterType",
                    "onUpdate:modelValue": ($event) => unref(form).type = $event,
                    required: "",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    style: { "width": "300px" },
                    name: "type",
                    onChange
                  }, [
                    createVNode("option", { value: "single" }, " Single "),
                    createVNode("option", { value: "double" }, " Double ")
                  ], 40, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).type]
                  ]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.type,
                    class: "mt-2"
                  }, null, 8, ["message"])
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
            _push2(`<a href="/counters"${_scopeId}>`);
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
              style: counterform.changed === true || props.formMode == "addCounter" ? null : { display: "none" },
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
            _push2(ssrRenderComponent(_sfc_main$6, {
              style: [
                counterform.changed === false && props.formMode != "addCounter" ? null : { display: "none" },
                { "opacity": ".5", "cursor": "default" }
              ],
              type: "button"
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
              createVNode("a", { href: "/counters" }, [
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
                [vShow, counterform.changed === true || props.formMode == "addCounter"]
              ]),
              withDirectives(createVNode(_sfc_main$6, {
                type: "button",
                style: { "opacity": ".5", "cursor": "default" }
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 512), [
                [vShow, counterform.changed === false && props.formMode != "addCounter"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Counters/Partials/EditCounterForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
