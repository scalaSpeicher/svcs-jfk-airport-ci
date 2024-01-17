import { ref, computed, watch, resolveDirective, withCtx, createVNode, unref, isRef, createTextVNode, mergeProps, openBlock, createBlock, createCommentVNode, withDirectives, vShow, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$8 } from "./AppLayout-348f14a8.mjs";
import { _ as _sfc_main$5 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$a } from "./DangerButton-5ac62031.mjs";
import { _ as _sfc_main$3 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$9 } from "./DialogModal-c762adec.mjs";
import { _ as _sfc_main$4, a as _sfc_main$6, b as _sfc_main$7 } from "./ItemsPerPage-05024f13.mjs";
import Debounce from "lodash/debounce.js";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    counters: {
      type: Object,
      default: () => ({})
    },
    counter: {
      type: Object,
      default: () => ({})
    },
    canReadCounters: {
      type: Boolean,
      default: () => false
    },
    canAddCounters: {
      type: Boolean,
      default: () => false
    },
    canEditCounters: {
      type: Boolean,
      default: () => false
    },
    canDeleteCounters: {
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
    const addNewCounter = () => {
      router.get(route(
        "counters.create"
      ));
    };
    const editCounter = (counterId) => {
      router.get(route(
        "counters.edit",
        counterId
      ));
    };
    let deleteCounterId;
    const confirmingCounterDeletion = ref(false);
    const confirmCounterDeletion = (counterId) => {
      deleteCounterId = counterId;
      confirmingCounterDeletion.value = true;
    };
    const deleteCounter = () => {
      router.delete(route(
        "counters.destroy",
        deleteCounterId
      ), {
        onSuccess: () => closeModal()
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
    const closeModal = () => {
      confirmingCounterDeletion.value = false;
    };
    let search = ref(props.filters.search);
    watch(search, Debounce(function(value) {
      router.get(
        "/counters",
        { search: value },
        {
          // preserveState: true,
          replace: true
        }
      );
    }, 500));
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { title: "AirPortal JFK Terminal 4" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Counters </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Counters ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between ml-2"${_scopeId}>`);
            if (__props.canReadCounters) {
              _push2(`<div${_scopeId}><div class="self-align-center ml-2 mb-2"${_scopeId}><small${_scopeId}>Search By:</small></div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "search",
                modelValue: unref(search),
                "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                type: "text",
                placeholder: "Location, Position, Width, Type",
                class: "mb-6",
                style: { "width": "400px", "opacity": ".75" }
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.canAddCounters) {
              _push2(`<div class="mt-8 mr-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                onClick: ($event) => addNewCounter()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Create `);
                  } else {
                    return [
                      createTextVNode(" Create ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (__props.canReadCounters) {
              _push2(`<div id="CountersTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Location",
                attribute: "counter_location"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Position",
                attribute: "position"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Width",
                attribute: "width"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Type",
                attribute: "type"
              }, null, _parent2, _scopeId));
              _push2(`</th><th style="${ssrRenderStyle([
                __props.canDeleteCounters ? null : { display: "none" },
                { "width": "150px" }
              ])}" scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Delete </th></tr></thead><tbody${_scopeId}>`);
              if (!__props.counters.data || !__props.counters.data.length) {
                _push2(`<tr${_scopeId}><td${_scopeId}> No data to display </td></tr>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(__props.counters.data, (counterData) => {
                  _push2(`<tr class="${ssrRenderClass(counterData.manual_override ? "cursor-pointer scala-tr counter-row-color-override" : "cursor-pointer scala-tr counter-row-color")}"${_scopeId}>`);
                  if (__props.canEditCounters) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit counter" })))}${_scopeId}>${ssrInterpolate(counterData.counter_location)}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(counterData.counter_location)}</td>`);
                  }
                  if (__props.canEditCounters) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit counter" })))}${_scopeId}>${ssrInterpolate(counterData.position)}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(counterData.position)}</td>`);
                  }
                  if (__props.canEditCounters) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit counter" })))}${_scopeId}>${ssrInterpolate(counterData.width)}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(counterData.width)}</td>`);
                  }
                  if (__props.canEditCounters) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit counter" })))}${_scopeId}>${ssrInterpolate(counterData.type)}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(counterData.type)}</td>`);
                  }
                  _push2(`<td${ssrRenderAttrs(mergeProps({
                    style: __props.canDeleteCounters ? null : { display: "none" },
                    class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer scala-delete-td"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to delete counter" })))}${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    class: "scala-delete-btn",
                    onClick: ($event) => confirmCounterDeletion(counterData.id)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg class="svg-icon template-delete-icon" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="2em" height="2em" viewBox="0 0 482.428 482.429" xml:space="preserve"${_scopeId2}><path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                                                            c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                                                            h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                                                            C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                                                            C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                                                            c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                                                            c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                                                            V115.744z"${_scopeId2}></path><path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"${_scopeId2}></path><path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"${_scopeId2}></path><path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			                                                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"${_scopeId2}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            class: "svg-icon template-delete-icon",
                            fill: "#000000",
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                            width: "2em",
                            height: "2em",
                            viewBox: "0 0 482.428 482.429",
                            "xml:space": "preserve"
                          }, [
                            createVNode("path", { d: "M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098\n                                                            c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117\n                                                            h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828\n                                                            C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879\n                                                            C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096\n                                                            c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266\n                                                            c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979\n                                                            V115.744z" }),
                            createVNode("path", { d: "M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07\n			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" }),
                            createVNode("path", { d: "M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07\n			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" }),
                            createVNode("path", { d: "M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07\n			                                                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" })
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</td></tr>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</tbody></table><div style="${ssrRenderStyle({ "display": "flex" })}"${_scopeId}><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                links: __props.counters.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$8, {
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
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between ml-2" }, [
                    __props.canReadCounters ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "self-align-center ml-2 mb-2" }, [
                        createVNode("small", null, "Search By:")
                      ]),
                      createVNode(_sfc_main$2, {
                        id: "search",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                        type: "text",
                        placeholder: "Location, Position, Width, Type",
                        class: "mb-6",
                        style: { "width": "400px", "opacity": ".75" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])) : createCommentVNode("", true),
                    __props.canAddCounters ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-8 mr-2"
                    }, [
                      createVNode(_sfc_main$3, {
                        onClick: ($event) => addNewCounter()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Create ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true)
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
                  __props.canReadCounters ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "CountersTable",
                    class: "bg-white overflow-hidden shadow-xl sm:rounded-lg"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                      createVNode("thead", { class: "bg-gray-200 border" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Location",
                              attribute: "counter_location"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Position",
                              attribute: "position"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Width",
                              attribute: "width"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Type",
                              attribute: "type"
                            })
                          ]),
                          withDirectives(createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "width": "150px" }
                          }, " Delete ", 512), [
                            [vShow, __props.canDeleteCounters]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !__props.counters.data || !__props.counters.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", null, " No data to display ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.counters.data, (counterData) => {
                          return openBlock(), createBlock("tr", {
                            key: counterData.id,
                            class: counterData.manual_override ? "cursor-pointer scala-tr counter-row-color-override" : "cursor-pointer scala-tr counter-row-color"
                          }, [
                            __props.canEditCounters ? withDirectives((openBlock(), createBlock("td", {
                              key: 0,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editCounter(counterData.id)
                            }, [
                              createTextVNode(toDisplayString(counterData.counter_location), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit counter" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 1,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(counterData.counter_location), 1)),
                            __props.canEditCounters ? withDirectives((openBlock(), createBlock("td", {
                              key: 2,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editCounter(counterData.id)
                            }, [
                              createTextVNode(toDisplayString(counterData.position), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit counter" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 3,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(counterData.position), 1)),
                            __props.canEditCounters ? withDirectives((openBlock(), createBlock("td", {
                              key: 4,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editCounter(counterData.id)
                            }, [
                              createTextVNode(toDisplayString(counterData.width), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit counter" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 5,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(counterData.width), 1)),
                            __props.canEditCounters ? withDirectives((openBlock(), createBlock("td", {
                              key: 6,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editCounter(counterData.id)
                            }, [
                              createTextVNode(toDisplayString(counterData.type), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit counter" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 7,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(counterData.type), 1)),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer scala-delete-td",
                              onClick: ($event) => confirmCounterDeletion(counterData.id)
                            }, [
                              createVNode(_sfc_main$5, {
                                class: "scala-delete-btn",
                                onClick: ($event) => confirmCounterDeletion(counterData.id)
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    class: "svg-icon template-delete-icon",
                                    fill: "#000000",
                                    version: "1.1",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                    width: "2em",
                                    height: "2em",
                                    viewBox: "0 0 482.428 482.429",
                                    "xml:space": "preserve"
                                  }, [
                                    createVNode("path", { d: "M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098\n                                                            c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117\n                                                            h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828\n                                                            C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879\n                                                            C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096\n                                                            c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266\n                                                            c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979\n                                                            V115.744z" }),
                                    createVNode("path", { d: "M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07\n			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z" }),
                                    createVNode("path", { d: "M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07\n			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z" }),
                                    createVNode("path", { d: "M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07\n			                                                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z" })
                                  ]))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ], 8, ["onClick"])), [
                              [vShow, __props.canDeleteCounters],
                              [_directive_tippy, { content: "Click to delete counter" }]
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { style: { "display": "flex" } }, [
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$6)
                      ]),
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$7, {
                          links: __props.counters.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", null, "You do not have permission to access this page."),
                    createVNode(_sfc_main$8, {
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
      _push(ssrRenderComponent(_sfc_main$9, {
        show: confirmingCounterDeletion.value,
        onClose: closeModal
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>DELETE COUNTER</span>`);
          } else {
            return [
              createVNode("span", null, "DELETE COUNTER")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Are you sure you want to delete this counter?</span>`);
          } else {
            return [
              createVNode("span", null, "Are you sure you want to delete this counter?")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, { onClick: closeModal }, {
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
            _push2(ssrRenderComponent(_sfc_main$a, { onClick: deleteCounter }, {
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
              createVNode(_sfc_main$5, { onClick: closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" NO ")
                ]),
                _: 1
              }),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$a, { onClick: deleteCounter }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Counters/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
