import { ref, computed, watch, reactive, resolveDirective, withCtx, createVNode, unref, isRef, createTextVNode, mergeProps, withDirectives, vShow, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$7 } from "./AppLayout-348f14a8.mjs";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6 } from "./ItemsPerPage-05024f13.mjs";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$9 } from "./DangerButton-5ac62031.mjs";
import { _ as _sfc_main$8 } from "./DialogModal-c762adec.mjs";
import { _ as _sfc_main$b } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$a } from "./InputLabel-47ca9f72.mjs";
import { C as Checkbox } from "./Checkbox-9c26f18f.mjs";
import Debounce from "lodash/debounce.js";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    locations: {
      type: Object,
      default: () => ({})
    },
    canReadLocations: {
      type: Boolean,
      default: () => false
    },
    canEditLocations: {
      type: Boolean,
      default: () => false
    },
    canAddLocations: {
      type: Boolean,
      default: () => false
    },
    canDeleteLocations: {
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
    const locationForm = useForm("locationForm", {
      name: "",
      category: "",
      description: "",
      full_url: null,
      thumbnail: null,
      store_by_url: false
    });
    const clearBoxes = () => {
      boxesChecked.active = false;
      boxesChecked.allCheck = false;
      checkedBoxes = [];
      locationTrash = [];
      confirmingLocationDeletion.value = false;
      selectAllVisible(false);
    };
    const boxesChecked = reactive({
      active: false,
      allCheck: true
    });
    let checkedBoxes = [];
    const setChecks = (e) => {
      let parentRow = e.target.parentNode.parentNode.parentNode.parentNode;
      if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value));
        parentRow.classList.add("scala-tr-selected");
      } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value));
        checkedBoxes.splice(index, 1);
        parentRow.classList.remove("scala-tr-selected");
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
      let checkbox = document.getElementById(id);
      checkbox.click();
    };
    const selectAllVisible = (click = true) => {
      let inputs = document.querySelectorAll('input[type="checkbox"]');
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
      } else {
        document.getElementById("selectAllButton").innerText = "Select All";
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
      }
    };
    const confirmingLocationDeletion = ref(false);
    const locationCreation = ref(false);
    ref(null);
    ref(null);
    const manifestInput = ref(null);
    let locationTrash = [];
    const confirmLocationDeletion = () => {
      props.locations.data.forEach((location) => {
        let index = locationTrash.indexOf(location);
        if (checkedBoxes.includes(location.id)) {
          if (index === -1) {
            locationTrash.push(location);
          }
        } else {
          if (index > -1) {
            locationTrash.splice(index, 1);
          }
        }
      });
      confirmingLocationDeletion.value = true;
    };
    const deleteLocation = () => {
      if (checkedBoxes.length > 0) {
        router.delete(route(
          "locations.destroy",
          JSON.stringify(checkedBoxes)
        ), {
          onSuccess: () => closeModal(),
          onFinish: () => closeModal()
        });
      }
    };
    const createLocation = () => {
      locationCreation.value = true;
    };
    const editLocation = (location_id) => {
      router.get(route(
        "locations.edit",
        location_id
      ));
    };
    const addLocationByUrl = () => {
      locationForm.clearErrors();
      if (locationForm.full_url == "") {
        locationForm.setError("full_url", "Full URL required.");
        document.getElementById("full_url").classList.add("form-error-input");
      }
      if (Object.keys(locationForm.errors).length > 0) {
        return;
      }
      locationForm.store_by_url = true;
      locationForm.post(route("locations.store"), {
        preserveScroll: true,
        onError: () => locationForm.focus(),
        onSuccess: () => closeModal(),
        onFinish: () => locationForm.reset()
      });
    };
    if (manifestInput.value) {
      locationForm.full_url = manifestInput.value.files[0];
    }
    const closeModal = (clear = false) => {
      confirmingLocationDeletion.value = false;
      locationCreation.value = false;
      if (clear) {
        clearBoxes();
      }
    };
    const processFlash = (messages) => {
      let processedMessage = "";
      if (typeof messages === "object") {
        processedMessage += "Problem updating location! (records with issues marked in red)<br/>";
        Object.entries(messages).forEach((entry) => {
          const [key, value] = entry;
          processedMessage += value;
        });
        return processedMessage;
      }
      return messages;
    };
    const formatCategory = (string) => {
      let category = string;
      if (category.indexOf("_") > -1) {
        category = category.split("_");
        category = category[0].charAt(0).toUpperCase() + category[0].slice(1) + " " + category[1].charAt(0).toUpperCase() + category[1].slice(1);
      } else {
        category = category.charAt(0).toUpperCase() + category.slice(1);
      }
      return category;
    };
    let search = ref(props.filters.search);
    const debouncedWatch = Debounce((value) => {
      router.get(
        "/locations",
        { search: value },
        {
          // preserveState: true,
          replace: true
        }
      );
    }, 300);
    watch(search, debouncedWatch);
    router.on("success", () => {
      confirmingLocationDeletion.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { title: "AirPortal JFK Terminal 4" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Locations </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Locations ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><div class="max-w-9xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between ml-2"${_scopeId}><div class="messages-search-text-div"${_scopeId}><div class="self-align-center ml-2 mb-2"${_scopeId}><small${_scopeId}>Search By:</small></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "search",
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
              type: "text",
              placeholder: "Location Name, Message Name",
              class: "mb-6",
              style: { "width": "400px", "opacity": ".75" }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-8 mr-2 messages-bulk-buttons"${_scopeId}><span style="${ssrRenderStyle(__props.canEditLocations ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "selectAllButton",
              class: "scala-edit-btn slim-header-btn",
              disabled: Object.keys(props.locations).length === 0,
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
              class: "scala-delete-btn slim-header-btn",
              disabled: boxesChecked.active === false,
              onClick: ($event) => confirmLocationDeletion()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete ✓ `);
                } else {
                  return [
                    createTextVNode(" Delete ✓ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              style: __props.canAddLocations ? null : { display: "none" },
              class: "scala-edit-btn slim-header-btn",
              onClick: ($event) => createLocation()
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
            _push2(`</span></div></div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (__props.canReadLocations) {
              _push2(`<div id="locationsTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg locations-table"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Preview </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Name",
                attribute: "name"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Categories",
                attribute: "category"
              }, null, _parent2, _scopeId));
              _push2(`</th><th style="${ssrRenderStyle([
                __props.canDeleteLocations || __props.canEditLocations ? null : { display: "none" },
                { "width": "95px" }
              ])}" scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> SELECT </th></tr></thead><tbody${_scopeId}>`);
              if (!__props.locations.data || !__props.locations.data.length) {
                _push2(`<tr${_scopeId}><td${_scopeId}> No data to display </td></tr>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(__props.locations.data, (location) => {
                  _push2(`<tr class="cursor-pointer scala-tr"${_scopeId}>`);
                  if (__props.canEditLocations) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" })))}${_scopeId}>`);
                    if (location.thumbnail_photo_url) {
                      _push2(`<img class="location-thumbnail-image"${ssrRenderAttr("src", location.thumbnail_photo_url)} alt="location-thumbnail"${_scopeId}>`);
                    } else {
                      _push2(`<svg class="svg-icon location-preview-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20
                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60
                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"${_scopeId}></path><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167
                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5
                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127
                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9
                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20
                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9
                                            20-20s-9-20-20-20h-61.7z"${_scopeId}></path></svg>`);
                    }
                    _push2(`</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
                    if (location.thumbnail_photo_url) {
                      _push2(`<img class="location-thumbnail-image"${ssrRenderAttr("src", location.thumbnail_photo_url)} alt="location-thumbnail"${_scopeId}>`);
                    } else {
                      _push2(`<svg class="svg-icon location-preview-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20
                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60
                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"${_scopeId}></path><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167
                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5
                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127
                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9
                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20
                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9
                                            20-20s-9-20-20-20h-61.7z"${_scopeId}></path></svg>`);
                    }
                    _push2(`</td>`);
                  }
                  if (__props.canEditLocations) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" })))}${_scopeId}>${ssrInterpolate(location.name)}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(location.name)}</td>`);
                  }
                  if (__props.canEditLocations) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" })))}${_scopeId}>${ssrInterpolate(formatCategory(location.category))}</td>`);
                  } else {
                    _push2(`<td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(formatCategory(location.category))}</td>`);
                  }
                  _push2(`<td${ssrRenderAttrs(mergeProps({
                    style: __props.canDeleteLocations || __props.canEditLocations ? null : { display: "none" },
                    class: "border cursor-pointer"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select location" })))}${_scopeId}><div class="px-6 py-4 ml-3 border-none"${_scopeId}>`);
                  _push2(ssrRenderComponent(Checkbox, {
                    id: "checkbox" + location.id,
                    value: location.id.toString(),
                    onClick: ($event) => tdClick("checkbox" + location.id),
                    onChange: ($event) => setChecks($event)
                  }, null, _parent2, _scopeId));
                  _push2(`</div></td></tr>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</tbody></table><div class="grid-cols-2"${_scopeId}><div class="location-pagination"${_scopeId}><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                links: __props.locations.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="location-upload-btn-box"${_scopeId}></div></div></div>`);
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
                    createVNode("div", { class: "messages-search-text-div" }, [
                      createVNode("div", { class: "self-align-center ml-2 mb-2" }, [
                        createVNode("small", null, "Search By:")
                      ]),
                      createVNode(_sfc_main$2, {
                        id: "search",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event,
                        type: "text",
                        placeholder: "Location Name, Message Name",
                        class: "mb-6",
                        style: { "width": "400px", "opacity": ".75" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "mt-8 mr-2 messages-bulk-buttons" }, [
                      withDirectives(createVNode("span", null, [
                        createVNode(_sfc_main$3, {
                          id: "selectAllButton",
                          class: "scala-edit-btn slim-header-btn",
                          disabled: Object.keys(props.locations).length === 0,
                          onClick: ($event) => selectAllVisible()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Select All ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "scala-delete-btn slim-header-btn",
                          disabled: boxesChecked.active === false,
                          onClick: ($event) => confirmLocationDeletion()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Delete ✓ ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        withDirectives(createVNode(_sfc_main$3, {
                          class: "scala-edit-btn slim-header-btn",
                          onClick: ($event) => createLocation()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]), [
                          [vShow, __props.canAddLocations]
                        ])
                      ], 512), [
                        [vShow, __props.canEditLocations]
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
                  __props.canReadLocations ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "locationsTable",
                    class: "bg-white overflow-hidden shadow-xl sm:rounded-lg locations-table"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                      createVNode("thead", { class: "bg-gray-200 border" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, " Preview "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Name",
                              attribute: "name"
                            })
                          ]),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                          }, [
                            createVNode(_sfc_main$4, {
                              label: "Categories",
                              attribute: "category"
                            })
                          ]),
                          withDirectives(createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "width": "95px" }
                          }, " SELECT ", 512), [
                            [vShow, __props.canDeleteLocations || __props.canEditLocations]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !__props.locations.data || !__props.locations.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", null, " No data to display ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.locations.data, (location) => {
                          return openBlock(), createBlock("tr", {
                            key: location.id,
                            class: "cursor-pointer scala-tr"
                          }, [
                            __props.canEditLocations ? withDirectives((openBlock(), createBlock("td", {
                              key: 0,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editLocation(location.id)
                            }, [
                              location.thumbnail_photo_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                class: "location-thumbnail-image",
                                src: location.thumbnail_photo_url,
                                alt: "location-thumbnail"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                                key: 1,
                                class: "svg-icon location-preview-icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", { d: "M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20\n                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60\n                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" }),
                                createVNode("path", { d: "M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167\n                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5\n                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127\n                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9\n                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20\n                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9\n                                            20-20s-9-20-20-20h-61.7z" })
                              ]))
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 1,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, [
                              location.thumbnail_photo_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                class: "location-thumbnail-image",
                                src: location.thumbnail_photo_url,
                                alt: "location-thumbnail"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("svg", {
                                key: 1,
                                class: "svg-icon location-preview-icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", { d: "M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20\n                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60\n                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" }),
                                createVNode("path", { d: "M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167\n                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5\n                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127\n                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9\n                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20\n                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9\n                                            20-20s-9-20-20-20h-61.7z" })
                              ]))
                            ])),
                            __props.canEditLocations ? withDirectives((openBlock(), createBlock("td", {
                              key: 2,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editLocation(location.id)
                            }, [
                              createTextVNode(toDisplayString(location.name), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 3,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(location.name), 1)),
                            __props.canEditLocations ? withDirectives((openBlock(), createBlock("td", {
                              key: 4,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editLocation(location.id)
                            }, [
                              createTextVNode(toDisplayString(formatCategory(location.category)), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, { content: "Click to Edit: <b>" + location.name + "</b>" }]
                            ]) : (openBlock(), createBlock("td", {
                              key: 5,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, toDisplayString(formatCategory(location.category)), 1)),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + location.id)
                            }, [
                              createVNode("div", { class: "px-6 py-4 ml-3 border-none" }, [
                                createVNode(Checkbox, {
                                  id: "checkbox" + location.id,
                                  value: location.id.toString(),
                                  onClick: ($event) => tdClick("checkbox" + location.id),
                                  onChange: ($event) => setChecks($event)
                                }, null, 8, ["id", "value", "onClick", "onChange"])
                              ])
                            ], 8, ["onClick"])), [
                              [vShow, __props.canDeleteLocations || __props.canEditLocations],
                              [_directive_tippy, { content: "Click to select location" }]
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "grid-cols-2" }, [
                      createVNode("div", { class: "location-pagination" }, [
                        createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                          createVNode(_sfc_main$5)
                        ]),
                        createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                          createVNode(_sfc_main$6, {
                            links: __props.locations.links
                          }, null, 8, ["links"])
                        ])
                      ]),
                      createVNode("div", { class: "location-upload-btn-box" })
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
        show: confirmingLocationDeletion.value,
        onClose: ($event) => closeModal()
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="scala-modal-notes"${_scopeId}> Are you sure you want to delete ${ssrInterpolate(unref(checkedBoxes).length > 1 ? "these locations?" : "this location?")}<br${_scopeId}><span class="scala-modal-warning"${_scopeId}>Any messages linked to deleted location(s) will be deleted as well.</span><br${_scopeId}><span class="scala-modal-warning"${_scopeId}>Note: Locations that have linked messages are highlighted red.</span></div><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Preview </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Name </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Category </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(locationTrash), (trashItem) => {
              _push2(`<tr class="${ssrRenderClass(trashItem.messages.length > 0 ? "scala-tr-warn" : "")}"${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              if (trashItem.thumbnail_photo_url) {
                _push2(`<img class="location-thumbnail-image"${ssrRenderAttr("src", trashItem.thumbnail_photo_url)} alt="location-thumbnail"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(trashItem.name)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(formatCategory(trashItem.category))}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("div", { class: "scala-modal-notes" }, [
                createTextVNode(" Are you sure you want to delete " + toDisplayString(unref(checkedBoxes).length > 1 ? "these locations?" : "this location?"), 1),
                createVNode("br"),
                createVNode("span", { class: "scala-modal-warning" }, "Any messages linked to deleted location(s) will be deleted as well."),
                createVNode("br"),
                createVNode("span", { class: "scala-modal-warning" }, "Note: Locations that have linked messages are highlighted red.")
              ]),
              createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                createVNode("thead", { class: "bg-gray-200 border" }, [
                  createVNode("tr", null, [
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Preview "),
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Name "),
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Category ")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(locationTrash), (trashItem) => {
                    return openBlock(), createBlock("tr", {
                      key: trashItem.id,
                      class: trashItem.messages.length > 0 ? "scala-tr-warn" : ""
                    }, [
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        trashItem.thumbnail_photo_url ? (openBlock(), createBlock("img", {
                          key: 0,
                          class: "location-thumbnail-image",
                          src: trashItem.thumbnail_photo_url,
                          alt: "location-thumbnail"
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(trashItem.name), 1),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(formatCategory(trashItem.category)), 1)
                    ], 2);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "scala-delete-btn",
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
            _push2(ssrRenderComponent(_sfc_main$9, { onClick: deleteLocation }, {
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
                class: "scala-delete-btn",
                onClick: ($event) => closeModal()
              }, {
                default: withCtx(() => [
                  createTextVNode(" NO ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$9, { onClick: deleteLocation }, {
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
      _push(ssrRenderComponent(_sfc_main$8, {
        show: locationCreation.value,
        "max-width": "md",
        onClose: ($event) => closeModal()
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Create Location:</span>`);
          } else {
            return [
              createVNode("span", null, "Create Location:")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid-cols-2"${_scopeId}><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              for: "full_url",
              value: "Full URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "full_url",
              modelValue: unref(locationForm).full_url,
              "onUpdate:modelValue": ($event) => unref(locationForm).full_url = $event,
              name: "full_url",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              message: unref(locationForm).errors.full_url
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid-cols-2" }, [
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$a, {
                    for: "full_url",
                    value: "Full URL"
                  }),
                  createVNode(_sfc_main$2, {
                    id: "full_url",
                    modelValue: unref(locationForm).full_url,
                    "onUpdate:modelValue": ($event) => unref(locationForm).full_url = $event,
                    name: "full_url",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$b, {
                    message: unref(locationForm).errors.full_url
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "scala-delete-btn",
              onClick: ($event) => closeModal()
            }, {
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
            _push2(`<span style="${ssrRenderStyle({ "width": "20px" })}"${_scopeId}></span>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "scala-primary-btn",
              onClick: addLocationByUrl
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
          } else {
            return [
              createVNode(_sfc_main$3, {
                class: "scala-delete-btn",
                onClick: ($event) => closeModal()
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$3, {
                class: "scala-primary-btn",
                onClick: addLocationByUrl
              }, {
                default: withCtx(() => [
                  createTextVNode(" Create ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Locations/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
