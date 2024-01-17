import { ref, computed, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, unref, createCommentVNode, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$5 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$7 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$6 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$3 } from "./TextInput-e4b68561.mjs";
import Multiselect from "vue-multiselect";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
/* empty css                                                                    */import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "AddRoleForm",
  __ssrInlineRender: true,
  props: {
    role: {
      type: Object,
      default: () => ({})
    },
    usersOptions: {
      type: Array,
      default: () => []
    },
    formMode: {
      type: String,
      default: () => ""
    },
    isSuperAdmin: {
      type: Boolean,
      default: () => false
    },
    canReadRoles: {
      type: Boolean,
      default: () => false
    },
    canEditRoles: {
      type: Boolean,
      default: () => false
    },
    canAddRoles: {
      type: Boolean,
      default: () => false
    },
    canDeleteRoles: {
      type: Boolean,
      default: () => false
    }
  },
  setup(__props) {
    const props = __props;
    const roleUsers = ref(props.role.selectedUsers);
    const currentPerms = ref(props.role.currentPerms);
    const permissions = ref(props.role.perms);
    const disablePerms = computed(() => {
      return form.name == "super-admin" || props.isSuperAdmin;
    });
    const form = useForm({
      name: props.role.name,
      selectedUsers: roleUsers.value,
      selectedPermissions: currentPerms.value
    });
    const onPermissionChange = (event, id, name, category) => {
      if (!currentPerms.value[id]) {
        currentPerms.value.push([(id2) => event]);
      }
      if (name == "create") {
        let id2 = permissions.value[category]["store"];
        currentPerms.value[id2] = event;
      }
      if (name == "edit") {
        let id2 = permissions.value[category]["update"];
        currentPerms.value[id2] = event;
      }
    };
    const ucFirst = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const permissionName = (name) => {
      switch (name) {
        case "destroy":
          return "Delete";
        case "index":
          return "View";
        case "show":
          return "View";
        case "restore":
          return "Remove";
        default:
          return ucFirst(name);
      }
    };
    const saveRole = () => {
      if (props.formMode == "editRole") {
        form.put(route(
          "roles.update",
          props.role.id
        ), {
          preserveScroll: true
        });
      } else {
        form.post(route(
          "roles.store"
        ), {
          preserveScroll: true
        });
      }
    };
    const onUsersSelectChange = (event, action) => {
      if (typeof props.role.selectedUsers === "undefined") {
        props.role.selectedUsers = [];
      }
      if (action === "add") {
        roleUsers.value.push(event);
      } else {
        roleUsers.value = roleUsers.value.filter(function(user) {
          return user.id != event.id;
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: saveRole }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.formMode == "editRole" ? "Update" : "Add")} Role `);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.formMode == "editRole" ? "Update" : "Add") + " Role ", 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.formMode == "editRole" ? "Update" : "Add")} Role information. <div class="columns-1"${_scopeId}><div class="mt-4 ml-6"${_scopeId}><span${_scopeId}>Name:  </span><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.formMode == "editRole" ? _ctx.$page.props.role.name : "")}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}>Associated Account(s):  </span><!--[-->`);
            ssrRenderList(roleUsers.value, (user) => {
              _push2(`<div${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "900" })}"${_scopeId}>${ssrInterpolate("  • " + user.email)}</span></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.formMode == "editRole" ? "Update" : "Add") + " Role information. ", 1),
              createVNode("div", { class: "columns-1" }, [
                createVNode("div", { class: "mt-4 ml-6" }, [
                  createVNode("span", null, "Name:  "),
                  createVNode("span", { style: { "font-weight": "900" } }, toDisplayString(_ctx.$page.props.formMode == "editRole" ? _ctx.$page.props.role.name : ""), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, "Associated Account(s):  "),
                  (openBlock(true), createBlock(Fragment, null, renderList(roleUsers.value, (user) => {
                    return openBlock(), createBlock("div", {
                      key: user.id
                    }, [
                      createVNode("span", { style: { "font-weight": "900" } }, toDisplayString("  • " + user.email), 1)
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="EditRoleForm" class="col-span-6 mt-2"${_scopeId}><div class="col-span-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: "Name",
              style: { "min-width": "300px" },
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              class: "block w-full",
              type: "text",
              autocomplete: "Name",
              style: { "min-width": "300px" },
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "users",
              value: "Associated Account(s)",
              class: "mt-2 block w-full",
              style: { "min-width": "300px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Multiselect), {
              modelValue: unref(form).selectedUsers,
              "onUpdate:modelValue": ($event) => unref(form).selectedUsers = $event,
              style: { "min-width": "300px" },
              placeholder: "Select Account(s)",
              label: "email",
              "track-by": "id",
              options: _ctx.$page.props.usersOptions,
              multiple: true,
              "close-on-select": false,
              "clear-on-select": false,
              "preserve-search": true,
              onSelect: ($event) => onUsersSelectChange($event, "add"),
              onRemove: ($event) => onUsersSelectChange($event, "sub")
            }, {
              selection: withCtx(({ values }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="multiselect-multiple-label"${_scopeId2}>${ssrInterpolate(values.length)} users selected </div>`);
                } else {
                  return [
                    createVNode("div", { class: "multiselect-multiple-label" }, toDisplayString(values.length) + " users selected ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "permissions",
              value: "Associated Permissions(s)",
              style: { "min-width": "300px" },
              class: "mt-2 block w-full"
            }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(permissions.value, (permission, category) => {
              _push2(`<div style="${ssrRenderStyle({ "width": "30%", "min-width": "190px", "padding": "1%", "margin": "5px", "float": "left", "border": "1px solid #e2e8f0", "border-radius": "0.5em" })}"${_scopeId}><span class="ml-2 text-gray-600 uppercase"${_scopeId}>${ssrInterpolate(category == "airlines_labels_lids" ? "LIDS" : category == "airlines_branding" ? "BRANDING" : category == "airlines_logos" ? "LOGOS" : category == "tokens" ? "API TOKENS" : category)}</span><!--[-->`);
              ssrRenderList(permission, (item, key) => {
                _push2(`<div${ssrRenderAttr("id", category + "_" + key)}${ssrRenderAttr("name", key)}${ssrRenderAttr("category", category)} style="${ssrRenderStyle({ "width": "175px", "padding-left": "15px" })}"${_scopeId}>`);
                if (category !== "teams") {
                  _push2(`<div${_scopeId}>`);
                  if (key !== "store" && key !== "update" && key !== "cancel") {
                    _push2(`<div${_scopeId}><div style="${ssrRenderStyle({ "float": "left", "padding-top": "6px" })}"${_scopeId}>${ssrInterpolate(permissionName(key))}: </div>`);
                    _push2(ssrRenderComponent(ToggleButton, {
                      modelValue: unref(form).selectedPermissions[item],
                      "onUpdate:modelValue": ($event) => unref(form).selectedPermissions[item] = $event,
                      "on-label": "On",
                      "off-label": "Off",
                      labelledby: "toggle-label",
                      describedby: "toggle-description",
                      "false-value": "false",
                      "true-value": "true",
                      style: { "float": "right" },
                      disabled: unref(disablePerms),
                      classes: {
                        container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                      },
                      onChange: ($event) => onPermissionChange($event, item, key, category)
                    }, null, _parent2, _scopeId));
                    _push2(`<div style="${ssrRenderStyle({ "clear": "both" })}"${_scopeId}></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<div${_scopeId}><div style="${ssrRenderStyle({ "float": "left", "padding-top": "6px" })}" class="role-perm-div-singles"${_scopeId}> View </div>`);
                  _push2(ssrRenderComponent(ToggleButton, {
                    modelValue: unref(form).selectedPermissions[item],
                    "onUpdate:modelValue": ($event) => unref(form).selectedPermissions[item] = $event,
                    "on-label": "On",
                    "off-label": "Off",
                    labelledby: "toggle-label",
                    describedby: "toggle-description",
                    "false-value": "false",
                    "true-value": "true",
                    style: { "float": "right" },
                    disabled: unref(disablePerms),
                    classes: {
                      container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                    },
                    onChange: ($event) => onPermissionChange($event, item, "edit", category)
                  }, null, _parent2, _scopeId));
                  _push2(`<div style="${ssrRenderStyle({ "clear": "both" })}"${_scopeId}></div></div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><div style="${ssrRenderStyle([
                category === "airlines_labels_lids" || category === "airlines_branding" || category === "airlines_logos" || category === "teams" ? null : { display: "none" },
                { "height": "10px" }
              ])}"${_scopeId}></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", {
                id: "EditRoleForm",
                class: "col-span-6 mt-2"
              }, [
                createVNode("div", { class: "col-span-6" }, [
                  createVNode(_sfc_main$2, {
                    for: "name",
                    value: "Name",
                    style: { "min-width": "300px" },
                    class: "mt-2"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    class: "block w-full",
                    type: "text",
                    autocomplete: "Name",
                    style: { "min-width": "300px" },
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    message: unref(form).errors.name,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "col-span-6" }, [
                  createVNode(_sfc_main$2, {
                    for: "users",
                    value: "Associated Account(s)",
                    class: "mt-2 block w-full",
                    style: { "min-width": "300px" }
                  }),
                  createVNode(unref(Multiselect), {
                    modelValue: unref(form).selectedUsers,
                    "onUpdate:modelValue": ($event) => unref(form).selectedUsers = $event,
                    style: { "min-width": "300px" },
                    placeholder: "Select Account(s)",
                    label: "email",
                    "track-by": "id",
                    options: _ctx.$page.props.usersOptions,
                    multiple: true,
                    "close-on-select": false,
                    "clear-on-select": false,
                    "preserve-search": true,
                    onSelect: ($event) => onUsersSelectChange($event, "add"),
                    onRemove: ($event) => onUsersSelectChange($event, "sub")
                  }, {
                    selection: withCtx(({ values }) => [
                      createVNode("div", { class: "multiselect-multiple-label" }, toDisplayString(values.length) + " users selected ", 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect", "onRemove"])
                ]),
                createVNode(_sfc_main$2, {
                  for: "permissions",
                  value: "Associated Permissions(s)",
                  style: { "min-width": "300px" },
                  class: "mt-2 block w-full"
                }),
                (openBlock(true), createBlock(Fragment, null, renderList(permissions.value, (permission, category) => {
                  return openBlock(), createBlock("div", {
                    key: permission.id,
                    style: { "width": "30%", "min-width": "190px", "padding": "1%", "margin": "5px", "float": "left", "border": "1px solid #e2e8f0", "border-radius": "0.5em" }
                  }, [
                    createVNode("span", { class: "ml-2 text-gray-600 uppercase" }, toDisplayString(category == "airlines_labels_lids" ? "LIDS" : category == "airlines_branding" ? "BRANDING" : category == "airlines_logos" ? "LOGOS" : category == "tokens" ? "API TOKENS" : category), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(permission, (item, key) => {
                      return openBlock(), createBlock("div", {
                        id: category + "_" + key,
                        key: category + "_" + key,
                        name: key,
                        category,
                        style: { "width": "175px", "padding-left": "15px" }
                      }, [
                        category !== "teams" ? (openBlock(), createBlock("div", { key: 0 }, [
                          key !== "store" && key !== "update" && key !== "cancel" ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", { style: { "float": "left", "padding-top": "6px" } }, toDisplayString(permissionName(key)) + ": ", 1),
                            createVNode(ToggleButton, {
                              modelValue: unref(form).selectedPermissions[item],
                              "onUpdate:modelValue": ($event) => unref(form).selectedPermissions[item] = $event,
                              "on-label": "On",
                              "off-label": "Off",
                              labelledby: "toggle-label",
                              describedby: "toggle-description",
                              "false-value": "false",
                              "true-value": "true",
                              style: { "float": "right" },
                              disabled: unref(disablePerms),
                              classes: {
                                container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                              },
                              onChange: ($event) => onPermissionChange($event, item, key, category)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
                            createVNode("div", { style: { "clear": "both" } })
                          ])) : createCommentVNode("", true)
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("div", {
                            style: { "float": "left", "padding-top": "6px" },
                            class: "role-perm-div-singles"
                          }, " View "),
                          createVNode(ToggleButton, {
                            modelValue: unref(form).selectedPermissions[item],
                            "onUpdate:modelValue": ($event) => unref(form).selectedPermissions[item] = $event,
                            "on-label": "On",
                            "off-label": "Off",
                            labelledby: "toggle-label",
                            describedby: "toggle-description",
                            "false-value": "false",
                            "true-value": "true",
                            style: { "float": "right" },
                            disabled: unref(disablePerms),
                            classes: {
                              container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                            },
                            onChange: ($event) => onPermissionChange($event, item, "edit", category)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
                          createVNode("div", { style: { "clear": "both" } })
                        ]))
                      ], 8, ["id", "name", "category"]);
                    }), 128)),
                    withDirectives(createVNode("div", { style: { "height": "10px" } }, null, 512), [
                      [vShow, category === "airlines_labels_lids" || category === "airlines_branding" || category === "airlines_logos" || category === "teams"]
                    ])
                  ]);
                }), 128))
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
            _push2(`<a href="/roles"${_scopeId}>`);
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
              createVNode("a", { href: "/roles" }, [
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Roles/Partials/AddRoleForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
