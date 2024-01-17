import { ref, computed, watch, reactive, resolveDirective, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, toDisplayString, withDirectives, vShow, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$8 } from "./AppLayout-348f14a8.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
import { C as Checkbox } from "./Checkbox-9c26f18f.mjs";
import { _ as _sfc_main$4 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$5, a as _sfc_main$6, b as _sfc_main$7 } from "./ItemsPerPage-05024f13.mjs";
import Debounce from "lodash/debounce.js";
import { setDefaultProps } from "vue-tippy";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    planners: {
      type: Object,
      default: () => ({})
    },
    planner: {
      type: Object,
      default: () => ({})
    },
    canReadPlanners: {
      type: Boolean,
      default: () => false
    },
    canEditPlanners: {
      type: Boolean,
      default: () => false
    },
    canAddPlanners: {
      type: Boolean,
      default: () => false
    },
    canDeletePlanners: {
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
    setDefaultProps({
      onShow(instance) {
        let tippyRef = instance.reference.id.split("_");
        if (tippyRef[0] === "planner") {
          return false;
        }
      }
    });
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
    ref(false);
    let search = ref(props.filters.search);
    let checkinOpen = ref(props.filters.checkin_open);
    let checkinClose = ref(props.filters.checkin_close);
    const saveStorage = function(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    };
    const getStorage = function(key) {
      if (!localStorage.getItem(key)) {
        saveStorage(key, []);
      }
      return JSON.parse(localStorage.getItem(key));
    };
    const clearStorage = function(key = "false") {
      if (key) {
        localStorage.removeItem(key);
        saveStorage(key, []);
      } else {
        localStorage.clear();
      }
    };
    const clearBoxes = () => {
      boxesChecked.active = false;
      boxesChecked.allCheck = false;
      checkedBoxes = [];
      clearStorage("checkedBoxes");
    };
    let url = new URL(document.location);
    if (url.searchParams.get("sort") === null) {
      clearStorage("checkedBoxes");
    }
    const boxesChecked = reactive({
      active: false,
      allCheck: true
    });
    let checkedBoxes = getStorage("checkedBoxes");
    const setChecks = (e) => {
      checkedBoxes = getStorage("checkedBoxes");
      if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value));
      } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value));
        checkedBoxes.splice(index, 1);
      }
      if (checkedBoxes.length > 0) {
        boxesChecked.active = true;
        saveStorage("checkedBoxes", checkedBoxes);
      } else {
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        checkedBoxes = [];
        clearStorage("checkedBoxes");
      }
    };
    const editPlanner = (id = null) => {
      if (id) {
        checkedBoxes = [id];
      }
      if (checkedBoxes.length > 0) {
        saveStorage("clearBoxes", true);
        router.get(route(
          "planners.edit",
          JSON.stringify(checkedBoxes)
        ));
      }
    };
    const addPlanner = () => {
      saveStorage("clearBoxes", true);
      router.get(route(
        "planners.create"
      ));
    };
    const tdClick = (id) => {
      let checkbox = document.getElementById(id);
      checkbox.click();
    };
    const selectAllVisible = (click = true) => {
      let inputs = document.querySelectorAll('input[type="checkbox"]');
      checkedBoxes = getStorage("checkedBoxes");
      for (let i = 0; i < inputs.length; i++) {
        let parentRow = inputs[i].parentNode.parentNode.parentNode.parentNode;
        if (boxesChecked.allCheck && click) {
          inputs[i].checked = true;
          checkedBoxes.push(parseInt(inputs[i].value));
          parentRow.classList.add("scala-tr-selected");
        } else {
          inputs[i].checked = false;
          let index = checkedBoxes.indexOf(parseInt(inputs[i].value));
          checkedBoxes.splice(index, 1);
          parentRow.classList.remove("scala-tr-selected");
        }
      }
      if (boxesChecked.allCheck && click) {
        document.getElementById("selectAllButton").innerText = "Unselect All";
        boxesChecked.active = true;
        boxesChecked.allCheck = false;
        saveStorage("checkedBoxes", checkedBoxes);
      } else {
        document.getElementById("selectAllButton").innerText = "Select All";
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        clearStorage("checkedBoxes");
      }
    };
    const todayOnlyClick = () => {
      todayOnly = !todayOnly;
      activeOnly = false;
      filterChange();
    };
    const activeOnlyClick = () => {
      activeOnly = !activeOnly;
      todayOnly = false;
      filterChange();
    };
    const searchByOpenClick = () => {
      searchByOpen = !searchByOpen;
      filterChange();
    };
    const filterChange = () => {
      let closeText, openText, searchText = "";
      if (checkinClose.value !== "undefined") {
        closeText = checkinClose.value;
      }
      if (checkinOpen.value !== "undefined") {
        openText = checkinOpen.value;
      }
      if (search.value !== "undefined") {
        searchText = search.value;
      }
      router.get(
        "/planners",
        {
          search: searchText,
          checkin_close: todayOnly ? "" : closeText,
          checkin_open: todayOnly ? "" : openText,
          search_by: searchByOpen ? "open" : "close",
          today_only: todayOnly ? "1" : "0",
          active_only: activeOnly ? "1" : "0"
        },
        {
          replace: true
        }
      );
    };
    watch(search, Debounce(function(value) {
      filterChange();
    }, 300));
    watch(checkinOpen, function(value) {
      filterChange();
    });
    watch(checkinClose, function(value) {
      filterChange();
    });
    let todayOnly = url.searchParams.get("today_only") === "1" || props.filters.today_only === "1" ? true : false;
    let activeOnly = url.searchParams.get("active_only") === "1" || props.filters.active_only === "1" ? true : false;
    let searchByOpen = url.searchParams.get("search_by") === "close" || props.filters.search_by === "close" ? false : true;
    let searchByOpenText = searchByOpen ? "Open" : "Close";
    let searchByOpenClass = searchByOpen ? "search-by-open-btn" : "search-by-close-btn";
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
    router.on("success", () => {
      if (getStorage("clearBoxes") == true) {
        clearBoxes();
      }
      checkedBoxes = getStorage("checkedBoxes");
      if (checkedBoxes.length > 0) {
        checkedBoxes.forEach((checkedBox) => {
          if (document.getElementById(checkedBox)) {
            document.getElementById(checkedBox).checked = true;
          }
        });
        boxesChecked.active = true;
      } else {
        boxesChecked.active = false;
      }
      saveStorage("checkedBoxes", checkedBoxes);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Planners </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Planners ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><div class="max-w-9xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between ml-2"${_scopeId}><div class="planners-search-text-div"${_scopeId}><div style="${ssrRenderStyle({ "margin-bottom": "2px" })}" class="self-align-center ml-2 mb-2"${_scopeId}><small${_scopeId}>Search:</small></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "search",
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
              type: "text",
              placeholder: "Check In Desk, Flight Identity...",
              class: "mb-4 planners-search-text-input",
              style: { "opacity": ".75" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="planners-search-time-div"${_scopeId}><div style="${ssrRenderStyle({ "margin-bottom": "2px" })}" class="self-align-center ml-2 mb-2"${_scopeId}><small${_scopeId}>Search By `);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "searchByOpenButton",
              class: unref(searchByOpenClass),
              disabled: unref(activeOnly),
              onClick: ($event) => searchByOpenClick()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(searchByOpenText))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(searchByOpenText)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              style: !unref(todayOnly) ? null : { display: "none" },
              class: "today-only-btn",
              onClick: ($event) => todayOnlyClick()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Today Only `);
                } else {
                  return [
                    createTextVNode("Today Only ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              style: unref(todayOnly) ? null : { display: "none" },
              class: "today-only-btn",
              onClick: ($event) => todayOnlyClick()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Today Only `);
                } else {
                  return [
                    createTextVNode("Today Only ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              style: !unref(activeOnly) ? null : { display: "none" },
              class: "active-only-btn",
              onClick: ($event) => activeOnlyClick()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Active `);
                } else {
                  return [
                    createTextVNode("Active ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              style: unref(activeOnly) ? null : { display: "none" },
              class: "active-only-btn",
              onClick: ($event) => activeOnlyClick()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Active `);
                } else {
                  return [
                    createTextVNode("Active ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</small></div><div class="planners-search-datetime-div"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "checkinOpenDate",
              modelValue: unref(checkinOpen),
              "onUpdate:modelValue": ($event) => isRef(checkinOpen) ? checkinOpen.value = $event : checkinOpen = $event,
              type: "datetime-local",
              "format-value": "yyyy-MM-ddTHH:mm",
              placeholder: "Start Date / Time",
              disabled: unref(todayOnly) || unref(activeOnly),
              onfocus: "(this.type='datetime-local')",
              onblur: "if(!this.value)this.type='text'",
              autoblur: "",
              class: "mb-4 planners-search-datetime-input",
              style: { "opacity": ".75", "margin-right": "5px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "checkinCloseDate",
              modelValue: unref(checkinClose),
              "onUpdate:modelValue": ($event) => isRef(checkinClose) ? checkinClose.value = $event : checkinClose = $event,
              type: "datetime-local",
              placeholder: "End Date / Time",
              "format-value": "yyyy-MM-ddTHH:mm",
              disabled: unref(todayOnly) || unref(activeOnly),
              onfocus: "(this.type='datetime-local')",
              onblur: "if(!this.value)this.type='text'",
              autoblur: "",
              class: "mb-4 planners-search-datetime-input",
              style: { "opacity": ".75" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="planners-bulk-buttons-slim"${_scopeId}><span style="${ssrRenderStyle(__props.canEditPlanners ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "selectAllButton",
              class: "scala-edit-btn slim-header-btn planners-select-all-btn",
              disabled: Object.keys(props.planners.data).length === 0,
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
              class: "slim-header-btn planners-edit-btn scala-edit-btn",
              disabled: boxesChecked.active === false,
              onClick: ($event) => editPlanner()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit ✓ `);
                } else {
                  return [
                    createTextVNode(" Edit ✓ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            if (__props.canAddPlanners) {
              _push2(`<span class="mt-8 mr-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                style: [
                  boxesChecked.active === false ? null : { display: "none" },
                  { "margin-left": "5px" }
                ],
                class: "slim-header-btn planners-create-btn",
                onClick: ($event) => addPlanner()
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
              _push2(ssrRenderComponent(_sfc_main$3, {
                style: boxesChecked.active === true ? null : { display: "none" },
                class: "slim-header-btn planners-create-btn",
                disabled: ""
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
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-8 mr-2 planners-bulk-buttons-wide"${_scopeId}><span style="${ssrRenderStyle(__props.canEditPlanners ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "selectAllButton",
              class: "scala-edit-btn slim-header-btn planners-select-all-btn",
              disabled: Object.keys(props.planners.data).length === 0,
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
              class: "slim-header-btn planners-edit-btn",
              disabled: boxesChecked.active === false,
              onClick: ($event) => editPlanner()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit ✓ `);
                } else {
                  return [
                    createTextVNode(" Edit ✓ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            if (__props.canAddPlanners) {
              _push2(`<span class="mt-8 mr-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                style: [
                  boxesChecked.active === false ? null : { display: "none" },
                  { "margin-left": "5px" }
                ],
                class: "slim-header-btn planners-create-btn",
                onClick: ($event) => addPlanner()
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
              _push2(ssrRenderComponent(_sfc_main$3, {
                style: boxesChecked.active === true ? null : { display: "none" },
                class: "slim-header-btn planners-create-btn",
                disabled: ""
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
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (__props.canReadPlanners) {
              _push2(`<div id="PlannersTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg planners-table"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border" style="${ssrRenderStyle({ "max-width": "130px" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Check-In Desk",
                attribute: "checkindesk"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Flight Identity",
                attribute: "flight_identity"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Open Date",
                attribute: "converted_open"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Close Date",
                attribute: "converted_close"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Class Code",
                attribute: "class_code"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                label: "Label",
                attribute: "label"
              }, null, _parent2, _scopeId));
              _push2(`</th><th style="${ssrRenderStyle([
                __props.canEditPlanners ? null : { display: "none" },
                { "width": "95px" }
              ])}" scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> SELECT </th></tr></thead><tbody${_scopeId}>`);
              if (!__props.planners.data || !__props.planners.data.length) {
                _push2(`<tr${_scopeId}><td${_scopeId}> No data to display </td></tr>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(__props.planners.data, (plannerData) => {
                  _push2(`<tr${ssrRenderAttrs(mergeProps({
                    id: plannerData.manual_override_id === null ? "planner_" + plannerData.id : "override_" + plannerData.id,
                    key: plannerData.manual_override_id === null ? "planner_" + plannerData.id : "override_" + plannerData.id,
                    class: plannerData.manual_override_id === null ? "cursor-pointer scala-tr planner-row-color" : "cursor-pointer scala-tr planner-row-color-override"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, plannerData.manual_override !== null ? "Planner Override Exists!<br />• Overwritten by: <b>" + plannerData.manual_override.actor_email + "</b>" : "Click to edit planner")))}${_scopeId}><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.checkindesk)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.flight_identity)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.converted_open.value)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.converted_close.value)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.class_code)}</td><td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to edit planner" })))}${_scopeId}>${ssrInterpolate(plannerData.label)}</td><td${ssrRenderAttrs(mergeProps({
                    style: __props.canEditPlanners ? null : { display: "none" },
                    class: "border cursor-pointer"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select planner" })))}${_scopeId}><div class="px-6 py-4 ml-3 border-none"${_scopeId}>`);
                  _push2(ssrRenderComponent(Checkbox, {
                    id: "checkbox" + plannerData.id,
                    value: plannerData.id.toString(),
                    onClick: ($event) => tdClick("checkbox" + plannerData.id),
                    onChange: ($event) => setChecks($event)
                  }, null, _parent2, _scopeId));
                  _push2(`</div></td></tr>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</tbody></table><div style="${ssrRenderStyle({ "display": "flex" })}"${_scopeId}><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                links: __props.planners.links
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
                createVNode("div", { class: "max-w-9xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between ml-2" }, [
                    createVNode("div", { class: "planners-search-text-div" }, [
                      createVNode("div", {
                        style: { "margin-bottom": "2px" },
                        class: "self-align-center ml-2 mb-2"
                      }, [
                        createVNode("small", null, "Search:")
                      ]),
                      createVNode(_sfc_main$2, {
                        id: "search",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                        type: "text",
                        placeholder: "Check In Desk, Flight Identity...",
                        class: "mb-4 planners-search-text-input",
                        style: { "opacity": ".75" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "planners-search-time-div" }, [
                      createVNode("div", {
                        style: { "margin-bottom": "2px" },
                        class: "self-align-center ml-2 mb-2"
                      }, [
                        createVNode("small", null, [
                          createTextVNode("Search By "),
                          createVNode(_sfc_main$3, {
                            id: "searchByOpenButton",
                            class: unref(searchByOpenClass),
                            disabled: unref(activeOnly),
                            onClick: ($event) => searchByOpenClick()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(searchByOpenText)), 1)
                            ]),
                            _: 1
                          }, 8, ["class", "disabled", "onClick"]),
                          withDirectives(createVNode(_sfc_main$3, {
                            class: "today-only-btn",
                            onClick: ($event) => todayOnlyClick()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Today Only ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]), [
                            [vShow, !unref(todayOnly)]
                          ]),
                          withDirectives(createVNode(_sfc_main$4, {
                            class: "today-only-btn",
                            onClick: ($event) => todayOnlyClick()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Today Only ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]), [
                            [vShow, unref(todayOnly)]
                          ]),
                          withDirectives(createVNode(_sfc_main$3, {
                            class: "active-only-btn",
                            onClick: ($event) => activeOnlyClick()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Active ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]), [
                            [vShow, !unref(activeOnly)]
                          ]),
                          withDirectives(createVNode(_sfc_main$4, {
                            class: "active-only-btn",
                            onClick: ($event) => activeOnlyClick()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Active ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]), [
                            [vShow, unref(activeOnly)]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "planners-search-datetime-div" }, [
                        createVNode(_sfc_main$2, {
                          id: "checkinOpenDate",
                          modelValue: unref(checkinOpen),
                          "onUpdate:modelValue": ($event) => isRef(checkinOpen) ? checkinOpen.value = $event : checkinOpen = $event,
                          type: "datetime-local",
                          "format-value": "yyyy-MM-ddTHH:mm",
                          placeholder: "Start Date / Time",
                          disabled: unref(todayOnly) || unref(activeOnly),
                          onfocus: "(this.type='datetime-local')",
                          onblur: "if(!this.value)this.type='text'",
                          autoblur: "",
                          class: "mb-4 planners-search-datetime-input",
                          style: { "opacity": ".75", "margin-right": "5px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode(_sfc_main$2, {
                          id: "checkinCloseDate",
                          modelValue: unref(checkinClose),
                          "onUpdate:modelValue": ($event) => isRef(checkinClose) ? checkinClose.value = $event : checkinClose = $event,
                          type: "datetime-local",
                          placeholder: "End Date / Time",
                          "format-value": "yyyy-MM-ddTHH:mm",
                          disabled: unref(todayOnly) || unref(activeOnly),
                          onfocus: "(this.type='datetime-local')",
                          onblur: "if(!this.value)this.type='text'",
                          autoblur: "",
                          class: "mb-4 planners-search-datetime-input",
                          style: { "opacity": ".75" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      createVNode("div", { class: "planners-bulk-buttons-slim" }, [
                        withDirectives(createVNode("span", null, [
                          createVNode(_sfc_main$3, {
                            id: "selectAllButton",
                            class: "scala-edit-btn slim-header-btn planners-select-all-btn",
                            disabled: Object.keys(props.planners.data).length === 0,
                            onClick: ($event) => selectAllVisible()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Select All ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(_sfc_main$3, {
                            class: "slim-header-btn planners-edit-btn scala-edit-btn",
                            disabled: boxesChecked.active === false,
                            onClick: ($event) => editPlanner()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit ✓ ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ], 512), [
                          [vShow, __props.canEditPlanners]
                        ]),
                        __props.canAddPlanners ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "mt-8 mr-2"
                        }, [
                          withDirectives(createVNode(_sfc_main$4, {
                            class: "slim-header-btn planners-create-btn",
                            style: { "margin-left": "5px" },
                            onClick: ($event) => addPlanner()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Create ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]), [
                            [vShow, boxesChecked.active === false]
                          ]),
                          withDirectives(createVNode(_sfc_main$3, {
                            class: "slim-header-btn planners-create-btn",
                            disabled: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Create ")
                            ]),
                            _: 1
                          }, 512), [
                            [vShow, boxesChecked.active === true]
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "mt-8 mr-2 planners-bulk-buttons-wide" }, [
                      withDirectives(createVNode("span", null, [
                        createVNode(_sfc_main$3, {
                          id: "selectAllButton",
                          class: "scala-edit-btn slim-header-btn planners-select-all-btn",
                          disabled: Object.keys(props.planners.data).length === 0,
                          onClick: ($event) => selectAllVisible()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Select All ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "slim-header-btn planners-edit-btn",
                          disabled: boxesChecked.active === false,
                          onClick: ($event) => editPlanner()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit ✓ ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ], 512), [
                        [vShow, __props.canEditPlanners]
                      ]),
                      __props.canAddPlanners ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "mt-8 mr-2"
                      }, [
                        withDirectives(createVNode(_sfc_main$4, {
                          class: "slim-header-btn planners-create-btn",
                          style: { "margin-left": "5px" },
                          onClick: ($event) => addPlanner()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]), [
                          [vShow, boxesChecked.active === false]
                        ]),
                        withDirectives(createVNode(_sfc_main$3, {
                          class: "slim-header-btn planners-create-btn",
                          disabled: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create ")
                          ]),
                          _: 1
                        }, 512), [
                          [vShow, boxesChecked.active === true]
                        ])
                      ])) : createCommentVNode("", true)
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
                  __props.canReadPlanners ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "PlannersTable",
                    class: "bg-white overflow-hidden shadow-xl sm:rounded-lg planners-table"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                      createVNode("thead", { class: "bg-gray-200 border" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "max-width": "130px" }
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Check-In Desk",
                              attribute: "checkindesk"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Flight Identity",
                              attribute: "flight_identity"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Open Date",
                              attribute: "converted_open"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Close Date",
                              attribute: "converted_close"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Class Code",
                              attribute: "class_code"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$5, {
                              label: "Label",
                              attribute: "label"
                            })
                          ]),
                          withDirectives(createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "width": "95px" }
                          }, " SELECT ", 512), [
                            [vShow, __props.canEditPlanners]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !__props.planners.data || !__props.planners.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", null, " No data to display ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.planners.data, (plannerData) => {
                          return withDirectives((openBlock(), createBlock("tr", {
                            id: plannerData.manual_override_id === null ? "planner_" + plannerData.id : "override_" + plannerData.id,
                            key: plannerData.manual_override_id === null ? "planner_" + plannerData.id : "override_" + plannerData.id,
                            class: plannerData.manual_override_id === null ? "cursor-pointer scala-tr planner-row-color" : "cursor-pointer scala-tr planner-row-color-override"
                          }, [
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.checkindesk), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.flight_identity), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.converted_open.value), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.converted_close.value), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.class_code), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editPlanner(plannerData.id)
                            }, [
                              createTextVNode(toDisplayString(plannerData.label), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to edit planner" }]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + plannerData.id)
                            }, [
                              createVNode("div", { class: "px-6 py-4 ml-3 border-none" }, [
                                createVNode(Checkbox, {
                                  id: "checkbox" + plannerData.id,
                                  value: plannerData.id.toString(),
                                  onClick: ($event) => tdClick("checkbox" + plannerData.id),
                                  onChange: ($event) => setChecks($event)
                                }, null, 8, ["id", "value", "onClick", "onChange"])
                              ])
                            ], 8, ["onClick"])), [
                              [vShow, __props.canEditPlanners],
                              [_directive_tippy, { content: "Click to select planner" }]
                            ])
                          ], 10, ["id"])), [
                            [_directive_tippy, plannerData.manual_override !== null ? "Planner Override Exists!<br />• Overwritten by: <b>" + plannerData.manual_override.actor_email + "</b>" : "Click to edit planner"]
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { style: { "display": "flex" } }, [
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$6)
                      ]),
                      createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                        createVNode(_sfc_main$7, {
                          links: __props.planners.links
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planners/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
