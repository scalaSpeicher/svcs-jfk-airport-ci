import { ref, computed, watch, reactive, mergeProps, withCtx, createVNode, toDisplayString, unref, withDirectives, openBlock, createBlock, vShow, Fragment, renderList, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$1 } from "./FormSectionWide-f115e870.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "EditPlannersForm",
  __ssrInlineRender: true,
  props: {
    planners: {
      type: Object,
      default: () => ({})
    },
    checkinDesks: {
      type: Array,
      default: () => []
    },
    airlineLabels: {
      type: Object,
      default: () => ({})
    },
    canEditPlanners: {
      type: Boolean,
      default: () => false
    },
    formMode: {
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
    const plannerChanges = reactive({});
    const plannerUpdates = reactive([]);
    const form = useForm({
      checkindesk: "",
      flight_identity: "",
      checkin_plan_open_date_time: "",
      checkin_plan_close_date_time: "",
      checkin_open_date_time: "",
      checkin_close_date_time: "",
      class_code: ""
    });
    const updatePlannersInformation = () => {
      if (props.formMode == "edit") {
        Object.keys(plannerChanges).forEach(function callback(index) {
          let plannerUpdate = {};
          plannerUpdate["id"] = index;
          let planner = props.planners.find((planner2) => planner2.id == index);
          plannerUpdate["converted_open"] = planner["converted_open"];
          plannerUpdate["converted_close"] = planner["converted_close"];
          let plannerChange = plannerChanges[index];
          Object.keys(plannerChange).forEach(function callback2(index2) {
            if (index2 == "converted_open" || index2 == "converted_close") {
              plannerUpdate[index2]["value"] = plannerChange[index2];
            } else {
              plannerUpdate[index2] = plannerChange[index2];
            }
          });
          plannerUpdates.push(plannerUpdate);
        });
        router.put(route(
          "planners.update",
          JSON.stringify(plannerUpdates)
        ), {
          preserveScroll: true
        });
      } else {
        form.post(route(
          "planners.store"
        ), {
          preserveScroll: true
        });
      }
    };
    const handleChange = (event) => {
      let recordId = event.target.id.split("-")[1];
      let plannerChange = [];
      plannerChange[event.target.name] = event.target.value;
      let keys = Object.keys(plannerChanges);
      if (!keys.includes(recordId)) {
        plannerChanges[recordId] = plannerChange;
        document.getElementById(recordId).classList.add("planner-row-color-changed");
      } else {
        plannerChanges[recordId][event.target.name] = event.target.value;
      }
    };
    const planOpenChange = (event) => {
      handleChange(event);
    };
    const planCloseChange = (event) => {
      handleChange(event);
    };
    const classCodeChange = (event) => {
      let original = event.target.oldvalue;
      if (typeof event.key === "undefined") {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9.]/gi, "").toUpperCase();
        if (event.target.value != original) {
          handleChange(event);
        }
      } else if (event.key.length == 1) {
        event.preventDefault();
        event.target.value = event.key.replace(/[^A-Za-z0-9.]/gi, "").toUpperCase();
        if (event.target.value != original) {
          handleChange(event);
        }
      } else {
        if (event.target.value != original) {
          handleChange(event);
        }
      }
    };
    let plannerErrorIds = [];
    const processFlash = (messages) => {
      let processedMessage = "";
      if (typeof messages === "object") {
        processedMessage += "Problem updating planners! (records with issues marked in red)<br/>";
        Object.entries(messages).forEach((entry) => {
          const [key, value] = entry;
          plannerErrorIds.push(key);
          processedMessage += value;
        });
        return processedMessage;
      }
      return messages;
    };
    const markPlannerErrors = (errorIds) => {
      errorIds.forEach((id) => {
        let element = document.getElementById(id);
        if (element !== null) {
          document.getElementById(id).className = "planner-row-color-error";
        }
      });
    };
    router.on("success", () => {
      markPlannerErrors(plannerErrorIds);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: updatePlannersInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$page.props.formMode === "add" ? "New Planner" : _ctx.$page.props.planners.length > 1 ? "Bulk Update Planners" : "Update Planner")}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(_ctx.$page.props.formMode === "add" ? "New Planner" : _ctx.$page.props.planners.length > 1 ? "Bulk Update Planners" : "Update Planner"), 1)
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (_ctx.$page.props.formMode === "add") {
              _push2(`<div id="PlannerAddForm"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Check-In Desk </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Flight Identity </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Plan Open Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Plan Close Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Actual Open Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Actual Close Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Class Code </th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}><select id="checkindesk" name="checkindesk" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input" style="${ssrRenderStyle({ "width": "100px" })}"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.checkinDesks, (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item)}${_scopeId}>${ssrInterpolate(item)}</option>`);
              });
              _push2(`<!--]--></select></td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "flight_identity",
                modelValue: unref(form).flight_identity,
                "onUpdate:modelValue": ($event) => unref(form).flight_identity = $event,
                name: "flight_identity",
                type: "text",
                class: "block w-full",
                autocomplete: "Flight ID",
                style: { "width": "100px" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "checkin_plan_open_date_time",
                modelValue: unref(form).checkin_plan_open_date_time,
                "onUpdate:modelValue": ($event) => unref(form).checkin_plan_open_date_time = $event,
                name: "checkin_plan_open_date_time",
                type: "datetime-local",
                class: "block w-full",
                autocomplete: "Plan Open Time",
                style: { "width": "125px" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "checkin_plan_close_date_time",
                modelValue: unref(form).checkin_plan_close_date_time,
                "onUpdate:modelValue": ($event) => unref(form).checkin_plan_close_date_time = $event,
                name: "checkin_plan_close_date_time",
                type: "datetime-local",
                class: "block w-full",
                autocomplete: "Plan Close Time",
                style: { "width": "125px" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "checkin_open_date_time",
                modelValue: unref(form).checkin_open_date_time,
                "onUpdate:modelValue": ($event) => unref(form).checkin_open_date_time = $event,
                name: "checkin_open_date_time",
                type: "datetime-local",
                class: "block w-full",
                autocomplete: "Actual Open Time",
                style: { "width": "125px" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "checkin_close_date_time",
                modelValue: unref(form).checkin_close_date_time,
                "onUpdate:modelValue": ($event) => unref(form).checkin_close_date_time = $event,
                name: "checkin_close_date_time",
                type: "datetime-local",
                class: "block w-full",
                autocomplete: "Actual Close Time",
                style: { "width": "125px" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "class_code",
                modelValue: unref(form).class_code,
                "onUpdate:modelValue": ($event) => unref(form).class_code = $event,
                name: "class_code",
                type: "text",
                class: "block w-full",
                autocomplete: "Class Code",
                style: { "width": "100px" }
              }, null, _parent2, _scopeId));
              _push2(`</td></tr></tbody></table></div>`);
            } else {
              _push2(`<div id="PlannerEditForm"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Check-In Desk </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Flight Identity </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Open Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Close Date </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Class Code${ssrInterpolate(_ctx.$page.props.formMode === "edit" ? ": Label" : "")}</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.planners, (planner) => {
                _push2(`<tr${ssrRenderAttr("id", planner.id)}${_scopeId}><td${ssrRenderAttr("id", "checkindesk-" + planner.id)} class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(planner.checkindesk)}</td><td${ssrRenderAttr("id", "flight_identity-" + planner.id)} class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(planner.flight_identity)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "converted_open-" + planner.id,
                  modelValue: planner.converted_open.value,
                  "onUpdate:modelValue": ($event) => planner.converted_open.value = $event,
                  name: "converted_open",
                  type: "datetime-local",
                  step: "1",
                  class: "block w-full planners-edit-open-date-input",
                  autocomplete: "Plan Open Time",
                  onChange: planOpenChange
                }, null, _parent2, _scopeId));
                _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  id: "converted_close-" + planner.id,
                  modelValue: planner.converted_close.value,
                  "onUpdate:modelValue": ($event) => planner.converted_close.value = $event,
                  name: "converted_close",
                  type: "datetime-local",
                  step: "1",
                  class: "block w-full planners-edit-close-date-input",
                  autocomplete: "Plan Close Time",
                  onChange: planCloseChange
                }, null, _parent2, _scopeId));
                _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}><select${ssrRenderAttr("id", "class_code-" + planner.id)} name="class_code" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input"${_scopeId}><!--[-->`);
                ssrRenderList(_ctx.$page.props.airlineLabels[planner.id], (item, index) => {
                  _push2(`<option${ssrRenderAttr("value", index)}${_scopeId}>${ssrInterpolate(index)}: ${ssrInterpolate(item)}</option>`);
                });
                _push2(`<!--]--></select></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
          } else {
            return [
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
              _ctx.$page.props.formMode === "add" ? (openBlock(), createBlock("div", {
                key: 0,
                id: "PlannerAddForm"
              }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                  createVNode("thead", { class: "bg-gray-200 border" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Check-In Desk "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Flight Identity "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Plan Open Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Plan Close Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Actual Open Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Actual Close Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Class Code ")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        withDirectives(createVNode("select", {
                          id: "checkindesk",
                          "onUpdate:modelValue": ($event) => unref(form).checkindesk = $event,
                          name: "checkindesk",
                          class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input",
                          style: { "width": "100px" }
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.checkinDesks, (item, index) => {
                            return openBlock(), createBlock("option", {
                              key: index,
                              value: item
                            }, toDisplayString(item), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).checkindesk]
                        ])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "flight_identity",
                          modelValue: unref(form).flight_identity,
                          "onUpdate:modelValue": ($event) => unref(form).flight_identity = $event,
                          name: "flight_identity",
                          type: "text",
                          class: "block w-full",
                          autocomplete: "Flight ID",
                          style: { "width": "100px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "checkin_plan_open_date_time",
                          modelValue: unref(form).checkin_plan_open_date_time,
                          "onUpdate:modelValue": ($event) => unref(form).checkin_plan_open_date_time = $event,
                          name: "checkin_plan_open_date_time",
                          type: "datetime-local",
                          class: "block w-full",
                          autocomplete: "Plan Open Time",
                          style: { "width": "125px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "checkin_plan_close_date_time",
                          modelValue: unref(form).checkin_plan_close_date_time,
                          "onUpdate:modelValue": ($event) => unref(form).checkin_plan_close_date_time = $event,
                          name: "checkin_plan_close_date_time",
                          type: "datetime-local",
                          class: "block w-full",
                          autocomplete: "Plan Close Time",
                          style: { "width": "125px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "checkin_open_date_time",
                          modelValue: unref(form).checkin_open_date_time,
                          "onUpdate:modelValue": ($event) => unref(form).checkin_open_date_time = $event,
                          name: "checkin_open_date_time",
                          type: "datetime-local",
                          class: "block w-full",
                          autocomplete: "Actual Open Time",
                          style: { "width": "125px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "checkin_close_date_time",
                          modelValue: unref(form).checkin_close_date_time,
                          "onUpdate:modelValue": ($event) => unref(form).checkin_close_date_time = $event,
                          name: "checkin_close_date_time",
                          type: "datetime-local",
                          class: "block w-full",
                          autocomplete: "Actual Close Time",
                          style: { "width": "125px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "class_code",
                          modelValue: unref(form).class_code,
                          "onUpdate:modelValue": ($event) => unref(form).class_code = $event,
                          name: "class_code",
                          type: "text",
                          class: "block w-full",
                          autocomplete: "Class Code",
                          style: { "width": "100px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                id: "PlannerEditForm"
              }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                  createVNode("thead", { class: "bg-gray-200 border" }, [
                    createVNode("tr", null, [
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Check-In Desk "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Flight Identity "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Open Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Close Date "),
                      createVNode("th", {
                        scope: "col",
                        class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                      }, " Class Code" + toDisplayString(_ctx.$page.props.formMode === "edit" ? ": Label" : ""), 1)
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.planners, (planner) => {
                      return openBlock(), createBlock("tr", {
                        id: planner.id,
                        key: planner.id
                      }, [
                        createVNode("td", {
                          id: "checkindesk-" + planner.id,
                          class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                        }, toDisplayString(planner.checkindesk), 9, ["id"]),
                        createVNode("td", {
                          id: "flight_identity-" + planner.id,
                          class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                        }, toDisplayString(planner.flight_identity), 9, ["id"]),
                        createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                          createVNode(_sfc_main$2, {
                            id: "converted_open-" + planner.id,
                            modelValue: planner.converted_open.value,
                            "onUpdate:modelValue": ($event) => planner.converted_open.value = $event,
                            name: "converted_open",
                            type: "datetime-local",
                            step: "1",
                            class: "block w-full planners-edit-open-date-input",
                            autocomplete: "Plan Open Time",
                            onChange: planOpenChange
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                          createVNode(_sfc_main$2, {
                            id: "converted_close-" + planner.id,
                            modelValue: planner.converted_close.value,
                            "onUpdate:modelValue": ($event) => planner.converted_close.value = $event,
                            name: "converted_close",
                            type: "datetime-local",
                            step: "1",
                            class: "block w-full planners-edit-close-date-input",
                            autocomplete: "Plan Close Time",
                            onChange: planCloseChange
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                          withDirectives(createVNode("select", {
                            id: "class_code-" + planner.id,
                            "onUpdate:modelValue": ($event) => planner.class_code = $event,
                            name: "class_code",
                            class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input",
                            onChange: classCodeChange
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.airlineLabels[planner.id], (item, index) => {
                              return openBlock(), createBlock("option", {
                                key: item.id,
                                value: index
                              }, toDisplayString(index) + ": " + toDisplayString(item), 9, ["value"]);
                            }), 128))
                          ], 40, ["id", "onUpdate:modelValue"]), [
                            [vModelSelect, planner.class_code]
                          ])
                        ])
                      ], 8, ["id"]);
                    }), 128))
                  ])
                ])
              ]))
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="/planners"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { type: "button" }, {
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
            _push2(ssrRenderComponent(_sfc_main$4, null, {
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
              createVNode("a", { href: "/planners" }, [
                createVNode(_sfc_main$3, { type: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Planners/Partials/EditPlannersForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
