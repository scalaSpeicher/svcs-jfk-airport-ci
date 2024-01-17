import { ref, computed, watch, reactive, resolveDirective, withCtx, createVNode, unref, isRef, createTextVNode, mergeProps, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vShow, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$7 } from "./AppLayout-348f14a8.mjs";
import { usePage, router, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6 } from "./ItemsPerPage-05024f13.mjs";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$9 } from "./DangerButton-5ac62031.mjs";
import { C as Checkbox } from "./Checkbox-9c26f18f.mjs";
import Debounce from "lodash/debounce.js";
import { _ as _sfc_main$8 } from "./DialogModal-c762adec.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    overrides: {
      type: Object,
      default: () => ({})
    },
    canReadOverrides: {
      type: Boolean,
      default: () => false
    },
    canRestoreOverrides: {
      type: Boolean,
      default: () => false
    },
    isSuperAdmin: {
      type: Boolean,
      default: () => false
    },
    filters: {
      type: Object,
      default: () => ({})
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
    const boxesChecked = reactive({
      active: false,
      allCheck: true
    });
    let checkedBoxes = [];
    const setChecks = (e) => {
      if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value));
      } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value));
        checkedBoxes.splice(index, 1);
      }
      if (checkedBoxes.length > 0) {
        boxesChecked.active = true;
      } else {
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        checkedBoxes = [];
      }
    };
    const tdClick = (id) => {
      let element = document.getElementById(id);
      element.click();
    };
    const selectAllVisible = () => {
      let inputs = document.querySelectorAll('input[type="checkbox"]');
      for (let i = 0; i < inputs.length; i++) {
        if (boxesChecked.allCheck) {
          inputs[i].checked = true;
          checkedBoxes.push(parseInt(inputs[i].value));
        } else {
          inputs[i].checked = false;
          let index = checkedBoxes.indexOf(parseInt(inputs[i].value));
          checkedBoxes.splice(index, 1);
        }
      }
      if (boxesChecked.allCheck) {
        document.getElementById("selectAllButton").innerText = "Unselect All";
        boxesChecked.active = true;
        boxesChecked.allCheck = false;
      } else {
        document.getElementById("selectAllButton").innerText = "Select All";
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
      }
    };
    const confirmingOverrideRestore = ref(false);
    let overridesRestore = [];
    const confirmOverrideRestore = () => {
      props.overrides.data.forEach((override) => {
        let index = overridesRestore.indexOf(override);
        if (checkedBoxes.includes(override.id)) {
          if (index === -1) {
            overridesRestore.push(override);
          }
        } else {
          if (index > -1) {
            overridesRestore.splice(index, 1);
          }
        }
      });
      confirmingOverrideRestore.value = true;
    };
    const restoreOverride = () => {
      if (checkedBoxes.length > 0) {
        router.put(route(
          "overrides.restore",
          JSON.stringify(checkedBoxes)
        ), {
          onSuccess: () => closeModal()
        });
      }
    };
    const closeModal = () => {
      confirmingOverrideRestore.value = false;
    };
    const debouncedWatch = Debounce((value) => {
      router.get(
        "/overrides",
        { search: value },
        {
          // preserveState: true,
          replace: true
        }
      );
    }, 300);
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
    let search = ref(props.filters.search);
    watch(search, debouncedWatch);
    router.on("success", () => {
      boxesChecked.active = false;
      boxesChecked.allCheck = false;
      checkedBoxes = [];
      overridesRestore = [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { title: "AirPortal JFK Terminal 4" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Overrides </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Overrides ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><div class="max-w-9xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between ml-2"${_scopeId}>`);
            if (__props.canReadOverrides) {
              _push2(`<div${_scopeId}><div class="self-align-center ml-2 mb-2"${_scopeId}><small${_scopeId}>Search By:</small></div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "search",
                modelValue: unref(search),
                "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                type: "text",
                placeholder: "Check In Desk, Flight Identity, Class Code",
                class: "mb-6",
                style: { "width": "400px", "opacity": ".75" }
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-8 mr-2 overrides-bulk-buttons"${_scopeId}><span style="${ssrRenderStyle(__props.canRestoreOverrides ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "selectAllButton",
              class: "slim-header-btn",
              disabled: Object.keys(props.overrides.data).length === 0,
              onClick: ($event) => selectAllVisible()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Select All `);
                } else {
                  return [
                    createTextVNode(" Select All ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "slim-header-btn",
              disabled: boxesChecked.active === false,
              onClick: ($event) => confirmOverrideRestore()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Remove ✓ `);
                } else {
                  return [
                    createTextVNode(" Remove ✓ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div></div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (__props.canReadOverrides) {
              _push2(`<div id="overridesTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg overrides-table"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Check-In Desk",
                attribute: "checkindesk"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Flight Identity",
                attribute: "flight_identity"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Plan Open Date",
                attribute: "checkin_plan_open_date_time"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Plan Close Date",
                attribute: "checkin_plan_close_date_time"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Actual Open Date",
                attribute: "checkin_open_date_time"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Actual Close Date",
                attribute: "checkin_close_date_time"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Class Code",
                attribute: "class_code"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Label",
                attribute: "label"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Overridden By",
                attribute: "overridden_by_name"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Created At",
                attribute: "updated_at"
              }, null, _parent2, _scopeId));
              _push2(`</th><th style="${ssrRenderStyle([
                __props.canRestoreOverrides ? null : { display: "none" },
                { "width": "95px" }
              ])}" scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> SELECT </th></tr></thead><tbody${_scopeId}>`);
              if (!__props.overrides.data || !__props.overrides.data.length) {
                _push2(`<tr${_scopeId}><td${_scopeId}> No data to display </td></tr>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(__props.overrides.data, (overrideData) => {
                  _push2(`<tr${ssrRenderAttrs(mergeProps({
                    key: overrideData.id,
                    class: overrideData.deletion ? "cursor-pointer override-deletion-row-color" : "cursor-pointer override-row-color"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, overrideData.deletion ? { content: "Deleted Planner" } : { content: "Overriden Planner" })))}${_scopeId}><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.checkindesk)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.flight_identity)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.checkin_plan_open_date_time)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.checkin_plan_close_date_time)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.checkin_open_date_time)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.checkin_close_date_time)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.class_code)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.label)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, "Click to View: <b>" + overrideData.overridden_by_name + "</b>")))}${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    id: "user" + overrideData.id,
                    style: { "cursor": "pointer" },
                    href: _ctx.route("users.index", { _query: { search: overrideData.actor_email } })
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(overrideData.overridden_by_name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(overrideData.overridden_by_name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}>${ssrInterpolate(overrideData.updated_at)}</td><td${ssrRenderAttrs(mergeProps({
                    style: __props.canRestoreOverrides ? null : { display: "none" },
                    class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select override" })))}${_scopeId}><div class="px-6 py-4 ml-3 border-none"${_scopeId}>`);
                  _push2(ssrRenderComponent(Checkbox, {
                    id: "checkbox" + overrideData.id,
                    value: overrideData.id.toString(),
                    onClick: ($event) => tdClick("checkbox" + overrideData.id),
                    onChange: ($event) => setChecks($event)
                  }, null, _parent2, _scopeId));
                  _push2(`</div></td></tr>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</tbody></table><div style="${ssrRenderStyle({ "display": "flex" })}"${_scopeId}><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                links: __props.overrides.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                href: _ctx.route("planners.index", { _query: { today_only: 0, search_by: "open", active_only: 1, sort: "checkindesk" } }),
                active: _ctx.route().current("planners.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Return to Main Page `);
                  } else {
                    return [
                      createTextVNode(" Return to Main Page ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("div", { class: "max-w-9xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between ml-2" }, [
                    __props.canReadOverrides ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "self-align-center ml-2 mb-2" }, [
                        createVNode("small", null, "Search By:")
                      ]),
                      createVNode(_sfc_main$2, {
                        id: "search",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                        type: "text",
                        placeholder: "Check In Desk, Flight Identity, Class Code",
                        class: "mb-6",
                        style: { "width": "400px", "opacity": ".75" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mt-8 mr-2 overrides-bulk-buttons" }, [
                      withDirectives(createVNode("span", null, [
                        createVNode(_sfc_main$3, {
                          id: "selectAllButton",
                          class: "slim-header-btn",
                          disabled: Object.keys(props.overrides.data).length === 0,
                          onClick: ($event) => selectAllVisible()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Select All ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "slim-header-btn",
                          disabled: boxesChecked.active === false,
                          onClick: ($event) => confirmOverrideRestore()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Remove ✓ ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ], 512), [
                        [vShow, __props.canRestoreOverrides]
                      ])
                    ])
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
                  __props.canReadOverrides ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "overridesTable",
                    class: "bg-white overflow-hidden shadow-xl sm:rounded-lg overrides-table"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                      createVNode("thead", { class: "bg-gray-200 border" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Check-In Desk",
                              attribute: "checkindesk"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Flight Identity",
                              attribute: "flight_identity"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Plan Open Date",
                              attribute: "checkin_plan_open_date_time"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Plan Close Date",
                              attribute: "checkin_plan_close_date_time"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Actual Open Date",
                              attribute: "checkin_open_date_time"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Actual Close Date",
                              attribute: "checkin_close_date_time"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Class Code",
                              attribute: "class_code"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Label",
                              attribute: "label"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Overridden By",
                              attribute: "overridden_by_name"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Created At",
                              attribute: "updated_at"
                            })
                          ]),
                          withDirectives(createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "width": "95px" }
                          }, " SELECT ", 512), [
                            [vShow, __props.canRestoreOverrides]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !__props.overrides.data || !__props.overrides.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", null, " No data to display ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.overrides.data, (overrideData) => {
                          return withDirectives((openBlock(), createBlock("tr", {
                            key: overrideData.id,
                            class: overrideData.deletion ? "cursor-pointer override-deletion-row-color" : "cursor-pointer override-row-color"
                          }, [
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.checkindesk), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.flight_identity), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.checkin_plan_open_date_time), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.checkin_plan_close_date_time), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.checkin_open_date_time), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.checkin_close_date_time), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.class_code), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.label), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("user" + overrideData.id)
                            }, [
                              createVNode(unref(Link), {
                                id: "user" + overrideData.id,
                                style: { "cursor": "pointer" },
                                href: _ctx.route("users.index", { _query: { search: overrideData.actor_email } })
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(overrideData.overridden_by_name), 1)
                                ]),
                                _: 2
                              }, 1032, ["id", "href"])
                            ], 8, ["onClick"])), [
                              [_directive_tippy, "Click to View: <b>" + overrideData.overridden_by_name + "</b>"]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createTextVNode(toDisplayString(overrideData.updated_at), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to select override" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + overrideData.id)
                            }, [
                              createVNode("div", { class: "px-6 py-4 ml-3 border-none" }, [
                                createVNode(Checkbox, {
                                  id: "checkbox" + overrideData.id,
                                  value: overrideData.id.toString(),
                                  onClick: ($event) => tdClick("checkbox" + overrideData.id),
                                  onChange: ($event) => setChecks($event)
                                }, null, 8, ["id", "value", "onClick", "onChange"])
                              ])
                            ], 8, ["onClick"])), [
                              [vShow, __props.canRestoreOverrides],
                              [_directive_tippy, { content: "Click to select override" }]
                            ])
                          ], 2)), [
                            [_directive_tippy, overrideData.deletion ? { content: "Deleted Planner" } : { content: "Overriden Planner" }]
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { style: { "display": "flex" } }, [
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$5)
                      ]),
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$6, {
                          links: __props.overrides.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", null, "You do not have permission to access this page."),
                    createVNode(_sfc_main$7, {
                      href: _ctx.route("planners.index", { _query: { today_only: 0, search_by: "open", active_only: 1, sort: "checkindesk" } }),
                      active: _ctx.route().current("planners.index")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Return to Main Page ")
                      ]),
                      _: 1
                    }, 8, ["href", "active"])
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$8, {
        show: confirmingOverrideRestore.value,
        onClose: ($event) => closeModal()
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>REMOVE OVERRIDE(S)</span>`);
          } else {
            return [
              createVNode("span", null, "REMOVE OVERRIDE(S)")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Are you sure you want to remove ${ssrInterpolate(unref(checkedBoxes).length > 1 ? "these overrides?" : "this override?")}</span><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(overridesRestore), (overrideRestore) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(overrideRestore.checkindesk)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(overrideRestore.flight_identity)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(overrideRestore.checkin_plan_open_date_time)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(overrideRestore.checkin_plan_close_date_time)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("span", null, "Are you sure you want to remove " + toDisplayString(unref(checkedBoxes).length > 1 ? "these overrides?" : "this override?"), 1),
              createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(overridesRestore), (overrideRestore) => {
                    return openBlock(), createBlock("tr", {
                      key: overrideRestore.id
                    }, [
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(overrideRestore.checkindesk), 1),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(overrideRestore.flight_identity), 1),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(overrideRestore.checkin_plan_open_date_time), 1),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(overrideRestore.checkin_plan_close_date_time), 1)
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              onClick: ($event) => closeModal()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` NO `);
                } else {
                  return [
                    createTextVNode(" NO ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId}></span>`);
            _push2(ssrRenderComponent(_sfc_main$9, { onClick: restoreOverride }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` YES `);
                } else {
                  return [
                    createTextVNode(" YES ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                onClick: ($event) => closeModal()
              }, {
                default: withCtx(() => [
                  createTextVNode(" NO ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$9, { onClick: restoreOverride }, {
                default: withCtx(() => [
                  createTextVNode(" YES ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Overrides/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
