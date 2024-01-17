import { ref, computed, watch, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, createTextVNode, withModifiers, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-348f14a8.mjs";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./FormSectionWide-f115e870.mjs";
import { _ as _sfc_main$4 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    currentPerms: {
      type: Object,
      default: () => ({})
    },
    permissions: {
      type: Object,
      default: () => ({})
    },
    user: {
      type: Object,
      default: () => ({})
    },
    userRole: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const showFlashMessage = ref(false);
    let flashMessageSet = ref("");
    const flashMessage = computed({
      get() {
        return flashMessageSet.value ? flashMessageSet.value : page.props.flash.message;
      },
      set(newValue) {
        flashMessageSet.value = newValue;
      }
    });
    const showError = () => {
      showFlashMessage.value = true;
      if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style = "display:justify;";
      }
    };
    const hideError = () => {
      showFlashMessage.value = false;
      if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style = "display:none;";
      }
    };
    watch(page.props, function(val) {
      if (val == null ? void 0 : val.flashMessage) {
        showError();
      }
    }, {
      immediate: true,
      deep: true
    });
    watch(flashMessage, (newValue, oldValue) => {
      if (newValue) {
        showError();
      }
    }, {
      immediate: true,
      deep: true
    });
    const form = useForm({
      permissions: props.currentPerms
    });
    const onPermissionChange = (event, id, name, category) => {
      if (!props.currentPerms[id]) {
        props.currentPerms.push([(id2) => event]);
      }
      if (name == "create") {
        let id2 = props.permissions[category]["update"];
        props.currentPerms[id2] = event;
      }
      if (name == "edit") {
        let id2 = props.permissions[category]["store"];
        props.currentPerms[id2] = event;
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
        default:
          return ucFirst(name);
      }
    };
    const savePermissions = () => {
      form.put(route(
        "permissions.update",
        props.user.id
      ), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true
      });
    };
    const processFlash = (messages) => {
      let processedMessage = "";
      if (typeof messages === "object") {
        processedMessage += "Problem updating template! (records with issues marked in red)<br/>";
        Object.entries(messages).forEach((entry) => {
          const [key, value] = entry;
          processedMessage += value;
        });
        return processedMessage;
      }
      return messages;
    };
    const resetButton = () => {
      router.get(route(
        "permissions.edit",
        props.user.id
      ));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Permissions </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Permissions ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex mr-2 mb-2"${_scopeId}><div class="mt-8 mr-4 mb-4"${_scopeId}> Permissions for: ${ssrInterpolate(_ctx.$page.props.user.first_name)} ${ssrInterpolate(_ctx.$page.props.user.last_name)} (ID: ${ssrInterpolate(_ctx.$page.props.user.id)}) | ${ssrInterpolate(_ctx.$page.props.userRole.toUpperCase())}</div></div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onSubmitted: savePermissions }, {
              form: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div id="PermissionsTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.permissions, (permission, category) => {
                    _push3(`<div style="${ssrRenderStyle({ "width": "auto", "padding": "20px 30px 25px 20px", "margin": "15px", "float": "left", "border": "1px solid #e2e8f0", "border-radius": "0.5em" })}"${_scopeId2}><span class="ml-2 text-gray-600 uppercase"${_scopeId2}>${ssrInterpolate(category == "planners" ? "PLANNERS" : category)}</span><!--[-->`);
                    ssrRenderList(permission, (item, key) => {
                      _push3(`<div${ssrRenderAttr("id", category + "_" + key)}${ssrRenderAttr("name", key)}${ssrRenderAttr("category", category)} style="${ssrRenderStyle({ "width": "175px", "padding-left": "15px" })}"${_scopeId2}>`);
                      if (key !== "store" && key !== "update") {
                        _push3(`<div${_scopeId2}><div style="${ssrRenderStyle({ "float": "left", "padding-top": "6px" })}"${_scopeId2}>${ssrInterpolate(permissionName(key))}: </div>`);
                        _push3(ssrRenderComponent(ToggleButton, {
                          modelValue: _ctx.$page.props.currentPerms[item],
                          "onUpdate:modelValue": ($event) => _ctx.$page.props.currentPerms[item] = $event,
                          "on-label": "On",
                          "off-label": "Off",
                          labelledby: "toggle-label",
                          describedby: "toggle-description",
                          disabled: _ctx.$page.props.userRole == "super-admin",
                          "false-value": "false",
                          "true-value": "true",
                          style: { "float": "right" },
                          classes: {
                            container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                          },
                          onChange: ($event) => onPermissionChange($event, item, key, category)
                        }, null, _parent3, _scopeId2));
                        _push3(`<div style="${ssrRenderStyle({ "clear": "both" })}"${_scopeId2}></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", {
                      id: "PermissionsTable",
                      class: "bg-white overflow-hidden shadow-xl sm:rounded-lg"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions, (permission, category) => {
                        return openBlock(), createBlock("div", {
                          key: permission.id,
                          style: { "width": "auto", "padding": "20px 30px 25px 20px", "margin": "15px", "float": "left", "border": "1px solid #e2e8f0", "border-radius": "0.5em" }
                        }, [
                          createVNode("span", { class: "ml-2 text-gray-600 uppercase" }, toDisplayString(category == "planners" ? "PLANNERS" : category), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(permission, (item, key) => {
                            return openBlock(), createBlock("div", {
                              id: category + "_" + key,
                              key: category + "_" + key,
                              name: key,
                              category,
                              style: { "width": "175px", "padding-left": "15px" }
                            }, [
                              key !== "store" && key !== "update" ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { style: { "float": "left", "padding-top": "6px" } }, toDisplayString(permissionName(key)) + ": ", 1),
                                createVNode(ToggleButton, {
                                  modelValue: _ctx.$page.props.currentPerms[item],
                                  "onUpdate:modelValue": ($event) => _ctx.$page.props.currentPerms[item] = $event,
                                  "on-label": "On",
                                  "off-label": "Off",
                                  labelledby: "toggle-label",
                                  describedby: "toggle-description",
                                  disabled: _ctx.$page.props.userRole == "super-admin",
                                  "false-value": "false",
                                  "true-value": "true",
                                  style: { "float": "right" },
                                  classes: {
                                    container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                                  },
                                  onChange: ($event) => onPermissionChange($event, item, key, category)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
                                createVNode("div", { style: { "clear": "both" } })
                              ])) : createCommentVNode("", true)
                            ], 8, ["id", "name", "category"]);
                          }), 128))
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="/permissions"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    type: "button",
                    onClick: resetButton
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Reset `);
                      } else {
                        return [
                          createTextVNode(" Reset ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</a><span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId2}></span>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
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
                    createVNode("a", { href: "/permissions" }, [
                      createVNode(_sfc_main$3, {
                        type: "button",
                        onClick: withModifiers(resetButton, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("span", { style: { "width": "20px" } }),
                    createVNode(_sfc_main$4, {
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
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex mr-2 mb-2" }, [
                    createVNode("div", { class: "mt-8 mr-4 mb-4" }, " Permissions for: " + toDisplayString(_ctx.$page.props.user.first_name) + " " + toDisplayString(_ctx.$page.props.user.last_name) + " (ID: " + toDisplayString(_ctx.$page.props.user.id) + ") | " + toDisplayString(_ctx.$page.props.userRole.toUpperCase()), 1)
                  ]),
                  withDirectives(createVNode("div", {
                    id: "alertnotification",
                    class: "flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3",
                    role: "alert"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "fill-current w-4 h-4 mr-2",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", { d: "M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" })
                    ])),
                    createVNode("p", {
                      innerHTML: unref(flashMessage) ? processFlash(unref(flashMessage)) : ""
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", { class: "px-4 py-3 justify-end" }, [
                      (openBlock(), createBlock("svg", {
                        class: "fill-current h-6 w-6 text-indigo-500",
                        role: "button",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        onClick: ($event) => hideError()
                      }, [
                        createVNode("title", null, "Close"),
                        createVNode("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
                      ], 8, ["onClick"]))
                    ])
                  ], 512), [
                    [vShow, showFlashMessage.value]
                  ]),
                  createVNode(_sfc_main$2, { onSubmitted: savePermissions }, {
                    form: withCtx(() => [
                      createVNode("div", {
                        id: "PermissionsTable",
                        class: "bg-white overflow-hidden shadow-xl sm:rounded-lg"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions, (permission, category) => {
                          return openBlock(), createBlock("div", {
                            key: permission.id,
                            style: { "width": "auto", "padding": "20px 30px 25px 20px", "margin": "15px", "float": "left", "border": "1px solid #e2e8f0", "border-radius": "0.5em" }
                          }, [
                            createVNode("span", { class: "ml-2 text-gray-600 uppercase" }, toDisplayString(category == "planners" ? "PLANNERS" : category), 1),
                            (openBlock(true), createBlock(Fragment, null, renderList(permission, (item, key) => {
                              return openBlock(), createBlock("div", {
                                id: category + "_" + key,
                                key: category + "_" + key,
                                name: key,
                                category,
                                style: { "width": "175px", "padding-left": "15px" }
                              }, [
                                key !== "store" && key !== "update" ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("div", { style: { "float": "left", "padding-top": "6px" } }, toDisplayString(permissionName(key)) + ": ", 1),
                                  createVNode(ToggleButton, {
                                    modelValue: _ctx.$page.props.currentPerms[item],
                                    "onUpdate:modelValue": ($event) => _ctx.$page.props.currentPerms[item] = $event,
                                    "on-label": "On",
                                    "off-label": "Off",
                                    labelledby: "toggle-label",
                                    describedby: "toggle-description",
                                    disabled: _ctx.$page.props.userRole == "super-admin",
                                    "false-value": "false",
                                    "true-value": "true",
                                    style: { "float": "right" },
                                    classes: {
                                      container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                                    },
                                    onChange: ($event) => onPermissionChange($event, item, key, category)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
                                  createVNode("div", { style: { "clear": "both" } })
                                ])) : createCommentVNode("", true)
                              ], 8, ["id", "name", "category"]);
                            }), 128))
                          ]);
                        }), 128))
                      ])
                    ]),
                    actions: withCtx(() => [
                      createVNode("a", { href: "/permissions" }, [
                        createVNode(_sfc_main$3, {
                          type: "button",
                          onClick: withModifiers(resetButton, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("span", { style: { "width": "20px" } }),
                      createVNode(_sfc_main$4, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Permissions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
