import { mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, withDirectives, vShow, unref, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
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
    let airlines = [];
    this.airlines.forEach((airline) => {
      airlines.push(
        {
          name: airline.name,
          id: airline.id
        }
      );
    });
    return {
      selectedAirlines: this.user.selectedAirlines,
      airlinesOptions: airlines
    };
  },
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "EditUserForm",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    roles: {
      type: Object,
      default: () => ({})
    },
    airlines: {
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
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
      selectedAirlines: props.user.selectedAirlines,
      selectedRole: props.user.selectedRole,
      status: props.user.hasOwnProperty("status") ? props.user.status : false
    });
    const onRoleSelectChange = (event) => {
      props.user.selectedRole = event.target.options[event.target.selectedIndex].innerHTML;
    };
    const onAirlineSelectChange = (event) => {
      props.user.selectedAirlines.push(event);
    };
    const onStatusChange = (event) => {
      form.status = event;
    };
    const saveUserInformation = () => {
      if (props.formMode == "editUser") {
        form.put(route(
          "users.update",
          props.user.id
        ), {
          preserveScroll: true
        });
      } else {
        form.post(route(
          "users.store"
        ), {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: saveUserInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.formMode == "editUser" ? "Update" : "Add")} User `);
          } else {
            return [
              createTextVNode(toDisplayString(props.formMode == "editUser" ? "Update" : "Add") + " User ", 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.formMode == "editUser" ? "Update" : "Add")} User information. <div class="columns-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editUser" ? props.user.first_name + " " + props.user.last_name : "")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Email:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editUser" ? props.user.email : "")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Status:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.formMode == "editUser" ? props.user.status : "")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>User Role:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(props.user.selectedRole ? props.user.selectedRole.toUpperCase() : "")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Airline(s):  </span><!--[-->`);
            ssrRenderList(props.user.selectedAirlines, (airline) => {
              _push2(`<div style="${ssrRenderStyle([
                props.user.selectedAirlines && props.user.selectedAirlines.length !== 0 ? null : { display: "none" },
                { "font-weight": "900" }
              ])}"${_scopeId}>${ssrInterpolate("  • " + airline.name.toUpperCase())}</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createTextVNode(toDisplayString(props.formMode == "editUser" ? "Update" : "Add") + " User information. ", 1),
              createVNode("div", { class: "columns-1" }, [
                createVNode("div", { class: "mt-4 ml-6" }, [
                  createVNode("span", null, "Name:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editUser" ? props.user.first_name + " " + props.user.last_name : ""), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Email:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editUser" ? props.user.email : ""), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Status:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.formMode == "editUser" ? props.user.status : ""), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "User Role:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(props.user.selectedRole ? props.user.selectedRole.toUpperCase() : ""), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Airline(s):  "),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.user.selectedAirlines, (airline) => {
                    return withDirectives((openBlock(), createBlock("div", {
                      key: airline.id,
                      style: { "font-weight": "900" }
                    }, toDisplayString("  • " + airline.name.toUpperCase()), 1)), [
                      [vShow, props.user.selectedAirlines && props.user.selectedAirlines.length !== 0]
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="UserEditForm"${_scopeId}><div class="col-span-6 sm:col-span-4 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "first_name",
              value: "First Name",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "first_name",
              modelValue: unref(form).first_name,
              "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
              type: "text",
              class: "mt-2 block w-full",
              autocomplete: "First Name",
              style: { "width": "300px" },
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.first_name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "last_name",
              value: "Last Name",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "last_name",
              modelValue: unref(form).last_name,
              "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
              type: "text",
              class: "mt-2 block w-full",
              autocomplete: "Last Name",
              style: { "width": "300px" },
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.last_name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: "Email Address",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-2 block w-full",
              autocomplete: "Email Address",
              style: { "width": "300px" },
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "role",
              value: "User Role",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(`<select id="role" autocomplete="User Role" style="${ssrRenderStyle({ "width": "300px", "cursor": "pointer" })}" required class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.$page.props.roles, (role) => {
              _push2(`<option${ssrRenderAttr("name", role.id)}${ssrRenderAttr("value", role.name)}${_scopeId}>${ssrInterpolate(role.name.toUpperCase())}</option>`);
            });
            _push2(`<!--]--></select></div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "airlines",
              value: "Airlines",
              style: { "width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Multiselect), {
              modelValue: unref(form).selectedAirlines,
              "onUpdate:modelValue": ($event) => unref(form).selectedAirlines = $event,
              style: { "width": "300px" },
              placeholder: "Select an Airline",
              label: "name",
              "track-by": "id",
              options: _ctx.airlinesOptions,
              multiple: true,
              onSelect: ($event) => onAirlineSelectChange($event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}><div class="mt-2 block w-full" style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId}><label id="toggle-label" class="block font-medium text-sm text-gray-700" value=""${_scopeId}>User Status</label></div><div style="${ssrRenderStyle({ "width": "300px", "opacity": ".5" })}"${_scopeId}><small id="toggle-description"${_scopeId}>Set the user&#39;s status</small></div>`);
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
              createVNode("div", { id: "UserEditForm" }, [
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-2" }, [
                  createVNode(_sfc_main$2, {
                    for: "first_name",
                    value: "First Name",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "first_name",
                    modelValue: unref(form).first_name,
                    "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "First Name",
                    style: { "width": "300px" },
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.first_name,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "last_name",
                    value: "Last Name",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "last_name",
                    modelValue: unref(form).last_name,
                    "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                    type: "text",
                    class: "mt-2 block w-full",
                    autocomplete: "Last Name",
                    style: { "width": "300px" },
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.last_name,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: "Email Address",
                    style: { "width": "300px" }
                  }),
                  createVNode(_sfc_main$3, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-2 block w-full",
                    autocomplete: "Email Address",
                    style: { "width": "300px" },
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.email,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "role",
                    value: "User Role",
                    style: { "width": "300px" }
                  }),
                  withDirectives(createVNode("select", {
                    id: "role",
                    "onUpdate:modelValue": ($event) => unref(form).selectedRole = $event,
                    autocomplete: "User Role",
                    style: { "width": "300px", "cursor": "pointer" },
                    required: "",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    onChange: onRoleSelectChange
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.roles, (role) => {
                      return openBlock(), createBlock("option", {
                        key: role.id,
                        name: role.id,
                        value: role.name
                      }, toDisplayString(role.name.toUpperCase()), 9, ["name", "value"]);
                    }), 128))
                  ], 40, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).selectedRole]
                  ])
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "airlines",
                    value: "Airlines",
                    style: { "width": "300px" }
                  }),
                  createVNode(unref(Multiselect), {
                    modelValue: unref(form).selectedAirlines,
                    "onUpdate:modelValue": ($event) => unref(form).selectedAirlines = $event,
                    style: { "width": "300px" },
                    placeholder: "Select an Airline",
                    label: "name",
                    "track-by": "id",
                    options: _ctx.airlinesOptions,
                    multiple: true,
                    onSelect: ($event) => onAirlineSelectChange($event)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
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
                    }, "User Status")
                  ]),
                  createVNode("div", { style: { "width": "300px", "opacity": ".5" } }, [
                    createVNode("small", { id: "toggle-description" }, "Set the user's status")
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
            _push2(`<a href="/users"${_scopeId}>`);
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
              createVNode("a", { href: "/users" }, [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Partials/EditUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
