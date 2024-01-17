import { ref, watch, reactive, resolveDirective, withCtx, createVNode, unref, isRef, createTextVNode, mergeProps, openBlock, createBlock, withDirectives, vShow, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$7 } from "./AppLayout-348f14a8.mjs";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6 } from "./ItemsPerPage-05024f13.mjs";
import { _ as _sfc_main$3 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$2 } from "./TextInput-e4b68561.mjs";
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
    messages: {
      type: Object,
      default: () => ({})
    },
    templates: {
      type: Object,
      default: () => ({})
    },
    canReadMessages: {
      type: Boolean,
      default: () => false
    },
    canEditMessages: {
      type: Boolean,
      default: () => false
    },
    canUnlockMessages: {
      type: Boolean,
      default: () => false
    },
    canDeleteMessages: {
      type: Boolean,
      default: () => false
    },
    canAddMessages: {
      type: Boolean,
      default: () => false
    },
    canDuplicateMessages: {
      type: Boolean,
      default: () => false
    },
    canRefreshMessages: {
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
    },
    flash: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const showFlashMessage = ref(false);
    const showFullSizeSelect = ref(false);
    const showFlash = (source = null) => {
      showFlashMessage.value = true;
    };
    const hideFlash = () => {
      showFlashMessage.value = false;
    };
    watch(page.props, function(val) {
      if ((val == null ? void 0 : val.flash) && val.flash.message) {
        showFlash();
      }
    }, {
      immediate: true,
      deep: true
    });
    const newMessage = useForm("newMessage", {
      template_id: "",
      name: "",
      full_size: "full",
      json_data: {}
    });
    const boxesChecked = reactive({
      active: false,
      allCheck: true
    });
    let checkedBoxes = [];
    const confirmingMessageDupe = ref(false);
    let messageDupes = [];
    let messageDupeNames = {};
    const confirmingMessageDeletion = ref(false);
    let messageTrash = [];
    const messageCreation = ref(false);
    let search = ref(props.filters.search);
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
    const clearBoxes = () => {
      boxesChecked.active = false;
      boxesChecked.allCheck = false;
      checkedBoxes = [];
      messageTrash = [];
      messageDupes = [];
      messageDupeNames = {};
      selectAllVisible(false);
    };
    const confirmMessageDupe = () => {
      props.messages.data.forEach((message) => {
        let index = messageDupes.indexOf(message);
        if (checkedBoxes.includes(message.id)) {
          if (index === -1) {
            messageDupes.push(message);
            messageDupeNames[message.id] = "";
          }
        } else {
          if (index > -1) {
            messageDupes.splice(index, 1);
          }
        }
      });
      confirmingMessageDupe.value = true;
    };
    const dupeMessages = () => {
      if (checkedBoxes.length > 0) {
        router.post(route(
          "messages.dupe",
          JSON.stringify(messageDupeNames)
        ), {
          onSuccess: () => {
            showFlash("onSuccess");
            closeModal();
          },
          onFinish: () => {
            showFlash("onFinish");
            closeModal(true);
          }
        });
      }
    };
    const confirmMessageDeletion = () => {
      props.messages.data.forEach((message) => {
        let index = messageTrash.indexOf(message);
        if (checkedBoxes.includes(message.id)) {
          if (index === -1) {
            messageTrash.push(message);
          }
        } else {
          if (index > -1) {
            messageTrash.splice(index, 1);
          }
        }
      });
      confirmingMessageDeletion.value = true;
    };
    const deleteMessage = () => {
      if (checkedBoxes.length > 0) {
        router.delete(route(
          "messages.destroy",
          JSON.stringify(checkedBoxes)
        ), {
          onSuccess: () => {
            showFlash("onSuccess");
            closeModal();
          },
          onFinish: () => {
            showFlash("onFinish");
            closeModal(true);
          }
        });
      }
    };
    const chooseTemplate = () => {
      if (props.templates.length === 0) {
        alert("No templates available to create messages.");
        return;
      }
      messageCreation.value = true;
    };
    const addMessage = () => {
      newMessage.clearErrors();
      if (newMessage.name == "") {
        newMessage.setError("name", "Name required.");
        document.getElementById("name").classList.add("form-error-input");
      }
      if (newMessage.template_id == "") {
        newMessage.setError("template_id", "Template required.");
        document.getElementById("template_id").classList.add("form-error-input");
      }
      if (Object.keys(newMessage.errors).length > 0) {
        return;
      }
      newMessage.post(route("messages.create"), {
        preserveScroll: true,
        onError: () => {
          showFlash();
          newMessage.focus();
        },
        onSuccess: () => closeModal(),
        onFinish: () => newMessage.reset()
      });
    };
    const editMessage = (message) => {
      router.get(route(
        "messages.edit",
        message.id
      ));
    };
    const unlockMessage = (message) => {
      router.post(route(
        "messages.unlock",
        message.id
      ), {});
      showFlash();
    };
    const templateChanged = (event) => {
    };
    const closeModal = (clear = false) => {
      confirmingMessageDeletion.value = false;
      messageCreation.value = false;
      confirmingMessageDupe.value = false;
      if (clear) {
        clearBoxes();
      }
    };
    const debouncedWatch = Debounce((value) => {
      router.get(
        "/messages",
        { search: value },
        {
          // preserveState: true,
          replace: true
        }
      );
    }, 300);
    watch(search, debouncedWatch);
    router.on("success", () => {
      confirmingMessageDeletion.value = false;
      messageCreation.value = false;
      confirmingMessageDupe.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { title: "AirPortal JFK Terminal 4" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | Messages </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | Messages ")
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
              placeholder: "Message Name, Template Name",
              class: "mb-6",
              style: { "width": "400px", "opacity": ".75" },
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-8 mr-2 messages-bulk-buttons"${_scopeId}><span style="${ssrRenderStyle(__props.canEditMessages ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "selectAllButton",
              class: "scala-edit-btn slim-header-btn",
              disabled: Object.keys(props.messages).length === 0,
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
              class: "scala-edit-btn slim-header-btn",
              disabled: boxesChecked.active === false || !__props.canDuplicateMessages,
              onClick: ($event) => confirmMessageDupe()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Duplicate ✓ `);
                } else {
                  return [
                    createTextVNode(" Duplicate ✓ ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "scala-delete-btn slim-header-btn",
              disabled: boxesChecked.active === false || !__props.canDeleteMessages,
              onClick: ($event) => confirmMessageDeletion()
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
              style: __props.canAddMessages ? null : { display: "none" },
              class: "scala-edit-btn slim-header-btn",
              disabled: !__props.canAddMessages,
              onClick: ($event) => chooseTemplate()
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
            _push2(`</span></div></div><div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${__props.flash ? __props.flash.message : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            if (__props.canReadMessages) {
              _push2(`<div id="messagesTable" class="bg-white overflow-hidden shadow-xl sm:rounded-lg messages-table"${_scopeId}><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Preview </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Name",
                attribute: "name"
              }, null, _parent2, _scopeId));
              _push2(`</th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                label: "Template",
                attribute: "template_name"
              }, null, _parent2, _scopeId));
              _push2(`</th><th style="${ssrRenderStyle([
                __props.canDeleteMessages || __props.canEditMessages ? null : { display: "none" },
                { "width": "95px" }
              ])}" scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> SELECT </th></tr></thead><tbody${_scopeId}>`);
              if (!__props.messages.data || !__props.messages.data.length) {
                _push2(`<tr${_scopeId}><td${_scopeId}> No data to display </td></tr>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(__props.messages.data, (message) => {
                  _push2(`<tr class="cursor-pointer scala-tr"${_scopeId}>`);
                  if (__props.canEditMessages) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>")))}${_scopeId}><svg class="svg-icon template-preview-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"${_scopeId}></path><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z"${_scopeId}></path></svg></td>`);
                  } else {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, ssrGetDirectiveProps(_ctx, _directive_tippy, "You do not have permission to edit messages.")))}${_scopeId}><svg class="svg-icon template-preview-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"${_scopeId}></path><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z"${_scopeId}></path></svg></td>`);
                  }
                  if (__props.canEditMessages) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>")))}${_scopeId}>${ssrInterpolate(message.name)}</td>`);
                  } else {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, ssrGetDirectiveProps(_ctx, _directive_tippy, "You do not have permission to edit messages.")))}${_scopeId}>${ssrInterpolate(message.name)}</td>`);
                  }
                  if (__props.canEditMessages && message.locked_by !== unref(page).props.auth.user.id) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer" }, ssrGetDirectiveProps(_ctx, _directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>")))}${_scopeId}>${ssrInterpolate(message.template_name)}</td>`);
                  } else if (__props.canUnlockMessages && message.locked_by === unref(page).props.auth.user.id) {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, ssrGetDirectiveProps(_ctx, _directive_tippy, "Click unlock button to force close your open edit.")))}${_scopeId}>${ssrInterpolate(message.template_name)} <div class="float-right border-none"${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$3, {
                      class: "scala-unlock-btn",
                      style: { "height": "21px !important" },
                      onClick: ($event) => unlockMessage(message)
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="scala-unlock-icon" style="${ssrRenderStyle({ "margin-right": "4px" })}" width="11" height="11" viewBox="0 0 16 16" fill="none" xml:space="preserve"${_scopeId2}><g transform="matrix(1 0 0 -1 0 1638)"${_scopeId2}><path d="M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,
                                                        0-2.004-0.777-2.004-2.332v-2.801h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,
                                                        0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562s1.93,1.453,3.211,
                                                        1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z"${_scopeId2}></path></g></svg>`);
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              version: "1.1",
                              xmlns: "http://www.w3.org/2000/svg",
                              "xmlns:xlink": "http://www.w3.org/1999/xlink",
                              class: "scala-unlock-icon",
                              style: { "margin-right": "4px" },
                              width: "11",
                              height: "11",
                              viewBox: "0 0 16 16",
                              fill: "none",
                              "xml:space": "preserve"
                            }, [
                              createVNode("g", { transform: "matrix(1 0 0 -1 0 1638)" }, [
                                createVNode("path", { d: "M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,\n                                                        0-2.004-0.777-2.004-2.332v-2.801h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,\n                                                        0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562s1.93,1.453,3.211,\n                                                        1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z" })
                              ])
                            ]))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</div></td>`);
                  } else {
                    _push2(`<td${ssrRenderAttrs(mergeProps({ class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, ssrGetDirectiveProps(_ctx, _directive_tippy, "You do not have permission to edit messages.")))}${_scopeId}>${ssrInterpolate(message.template_name)}</td>`);
                  }
                  _push2(`<td${ssrRenderAttrs(mergeProps({
                    style: __props.canDeleteMessages || __props.canEditMessages ? null : { display: "none" },
                    class: "border cursor-pointer"
                  }, ssrGetDirectiveProps(_ctx, _directive_tippy, { content: "Click to select message" })))}${_scopeId}><div class="px-6 py-4 ml-3 border-none float-left"${_scopeId}>`);
                  _push2(ssrRenderComponent(Checkbox, {
                    id: "checkbox" + message.id,
                    value: message.id.toString(),
                    onClick: ($event) => tdClick("checkbox" + message.id),
                    onChange: ($event) => setChecks($event)
                  }, null, _parent2, _scopeId));
                  _push2(`</div></td></tr>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</tbody></table><div class="grid-cols-2"${_scopeId}><div class="template-pagination"${_scopeId}><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 ml-4 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                links: __props.messages.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
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
                        placeholder: "Message Name, Template Name",
                        class: "mb-6",
                        style: { "width": "400px", "opacity": ".75" },
                        autofocus: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "mt-8 mr-2 messages-bulk-buttons" }, [
                      withDirectives(createVNode("span", null, [
                        createVNode(_sfc_main$3, {
                          id: "selectAllButton",
                          class: "scala-edit-btn slim-header-btn",
                          disabled: Object.keys(props.messages).length === 0,
                          onClick: ($event) => selectAllVisible()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Select All ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "scala-edit-btn slim-header-btn",
                          disabled: boxesChecked.active === false || !__props.canDuplicateMessages,
                          onClick: ($event) => confirmMessageDupe()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Duplicate ✓ ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_sfc_main$3, {
                          class: "scala-delete-btn slim-header-btn",
                          disabled: boxesChecked.active === false || !__props.canDeleteMessages,
                          onClick: ($event) => confirmMessageDeletion()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Delete ✓ ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        withDirectives(createVNode(_sfc_main$3, {
                          class: "scala-edit-btn slim-header-btn",
                          disabled: !__props.canAddMessages,
                          onClick: ($event) => chooseTemplate()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]), [
                          [vShow, __props.canAddMessages]
                        ])
                      ], 512), [
                        [vShow, __props.canEditMessages]
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
                      innerHTML: __props.flash ? __props.flash.message : ""
                    }, null, 8, ["innerHTML"]),
                    createVNode("span", { class: "px-4 py-3 justify-end" }, [
                      (openBlock(), createBlock("svg", {
                        class: "fill-current h-6 w-6 text-indigo-500",
                        role: "button",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        onClick: ($event) => hideFlash()
                      }, [
                        createVNode("title", null, "Close"),
                        createVNode("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
                      ], 8, ["onClick"]))
                    ])
                  ], 512), [
                    [vShow, showFlashMessage.value]
                  ]),
                  __props.canReadMessages ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "messagesTable",
                    class: "bg-white overflow-hidden shadow-xl sm:rounded-lg messages-table"
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
                              label: "Template",
                              attribute: "template_name"
                            })
                          ]),
                          withDirectives(createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border",
                            style: { "width": "95px" }
                          }, " SELECT ", 512), [
                            [vShow, __props.canDeleteMessages || __props.canEditMessages]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !__props.messages.data || !__props.messages.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", null, " No data to display ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.messages.data, (message) => {
                          return openBlock(), createBlock("tr", {
                            key: message.id,
                            class: "cursor-pointer scala-tr"
                          }, [
                            __props.canEditMessages ? withDirectives((openBlock(), createBlock("td", {
                              key: 0,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editMessage(message)
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "svg-icon template-preview-icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", { d: "M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" }),
                                createVNode("path", { d: "M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z" })
                              ]))
                            ], 8, ["onClick"])), [
                              [_directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>"]
                            ]) : withDirectives((openBlock(), createBlock("td", {
                              key: 1,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "svg-icon template-preview-icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg"
                              }, [
                                createVNode("path", { d: "M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" }),
                                createVNode("path", { d: "M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z" })
                              ]))
                            ])), [
                              [_directive_tippy, "You do not have permission to edit messages."]
                            ]),
                            __props.canEditMessages ? withDirectives((openBlock(), createBlock("td", {
                              key: 2,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editMessage(message)
                            }, [
                              createTextVNode(toDisplayString(message.name), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>"]
                            ]) : withDirectives((openBlock(), createBlock("td", {
                              key: 3,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, [
                              createTextVNode(toDisplayString(message.name), 1)
                            ])), [
                              [_directive_tippy, "You do not have permission to edit messages."]
                            ]),
                            __props.canEditMessages && message.locked_by !== unref(page).props.auth.user.id ? withDirectives((openBlock(), createBlock("td", {
                              key: 4,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer",
                              onClick: ($event) => editMessage(message)
                            }, [
                              createTextVNode(toDisplayString(message.template_name), 1)
                            ], 8, ["onClick"])), [
                              [_directive_tippy, message.locked_by !== 0 ? "Message being edited by " + message.locked_by_email : "Click to Edit: <b>" + message.name + "</b>"]
                            ]) : __props.canUnlockMessages && message.locked_by === unref(page).props.auth.user.id ? withDirectives((openBlock(), createBlock("td", {
                              key: 5,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, [
                              createTextVNode(toDisplayString(message.template_name) + " ", 1),
                              createVNode("div", { class: "float-right border-none" }, [
                                createVNode(_sfc_main$3, {
                                  class: "scala-unlock-btn",
                                  style: { "height": "21px !important" },
                                  onClick: ($event) => unlockMessage(message)
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      version: "1.1",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                      class: "scala-unlock-icon",
                                      style: { "margin-right": "4px" },
                                      width: "11",
                                      height: "11",
                                      viewBox: "0 0 16 16",
                                      fill: "none",
                                      "xml:space": "preserve"
                                    }, [
                                      createVNode("g", { transform: "matrix(1 0 0 -1 0 1638)" }, [
                                        createVNode("path", { d: "M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,\n                                                        0-2.004-0.777-2.004-2.332v-2.801h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,\n                                                        0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562s1.93,1.453,3.211,\n                                                        1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z" })
                                      ])
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ])
                            ])), [
                              [_directive_tippy, "Click unlock button to force close your open edit."]
                            ]) : withDirectives((openBlock(), createBlock("td", {
                              key: 6,
                              class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            }, [
                              createTextVNode(toDisplayString(message.template_name), 1)
                            ])), [
                              [_directive_tippy, "You do not have permission to edit messages."]
                            ]),
                            withDirectives((openBlock(), createBlock("td", {
                              class: "border cursor-pointer",
                              onClick: ($event) => tdClick("checkbox" + message.id)
                            }, [
                              createVNode("div", { class: "px-6 py-4 ml-3 border-none float-left" }, [
                                createVNode(Checkbox, {
                                  id: "checkbox" + message.id,
                                  value: message.id.toString(),
                                  onClick: ($event) => tdClick("checkbox" + message.id),
                                  onChange: ($event) => setChecks($event)
                                }, null, 8, ["id", "value", "onClick", "onChange"])
                              ])
                            ], 8, ["onClick"])), [
                              [vShow, __props.canDeleteMessages || __props.canEditMessages],
                              [_directive_tippy, { content: "Click to select message" }]
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "grid-cols-2" }, [
                      createVNode("div", { class: "template-pagination" }, [
                        createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                          createVNode(_sfc_main$5)
                        ]),
                        createVNode("div", { class: "mt-4 ml-4 mb-4" }, [
                          createVNode(_sfc_main$6, {
                            links: __props.messages.links
                          }, null, 8, ["links"])
                        ])
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
        show: confirmingMessageDeletion.value,
        onClose: ($event) => closeModal()
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="scala-modal-notes"${_scopeId}> Are you sure you want to delete ${ssrInterpolate(unref(checkedBoxes).length > 1 ? "these messages?" : "this message?")}</div><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Name </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Template </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(messageTrash), (trashItem) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(trashItem.name)}</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(trashItem.template_name)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("div", { class: "scala-modal-notes" }, " Are you sure you want to delete " + toDisplayString(unref(checkedBoxes).length > 1 ? "these messages?" : "this message?"), 1),
              createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                createVNode("thead", { class: "bg-gray-200 border" }, [
                  createVNode("tr", null, [
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Name "),
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Template ")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(messageTrash), (trashItem) => {
                    return openBlock(), createBlock("tr", {
                      key: trashItem.id
                    }, [
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(trashItem.name), 1),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(trashItem.template_name), 1)
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
            _push2(ssrRenderComponent(_sfc_main$9, {
              disabled: !__props.canDeleteMessages,
              onClick: deleteMessage
            }, {
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
              createVNode(_sfc_main$9, {
                disabled: !__props.canDeleteMessages,
                onClick: deleteMessage
              }, {
                default: withCtx(() => [
                  createTextVNode(" YES ")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$8, {
        show: messageCreation.value,
        "max-width": "md",
        onClose: ($event) => closeModal()
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>New Message</span>`);
          } else {
            return [
              createVNode("span", null, "New Message")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-2 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "name",
              modelValue: unref(newMessage).name,
              "onUpdate:modelValue": ($event) => unref(newMessage).name = $event,
              name: "name",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              message: unref(newMessage).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              for: "template_id",
              value: "Template"
            }, null, _parent2, _scopeId));
            _push2(`<select id="template_id" name="template_id" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category block w-full"${_scopeId}><!--[-->`);
            ssrRenderList(__props.templates, (template) => {
              _push2(`<option${ssrRenderAttr("value", template.id)}${_scopeId}>${ssrInterpolate(template.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              message: unref(newMessage).errors.template_id
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(showFullSizeSelect.value ? null : { display: "none" })}" class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              for: "full_size",
              value: "Full or Split"
            }, null, _parent2, _scopeId));
            _push2(`<select id="full_size" name="full_size" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category block w-full"${_scopeId}><option value="full"${_scopeId}> Full </option><option value="split"${_scopeId}> Split </option></select>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              message: unref(newMessage).errors.full_size
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-2 mb-4" }, [
                createVNode(_sfc_main$a, {
                  for: "name",
                  value: "Name"
                }),
                createVNode(_sfc_main$2, {
                  id: "name",
                  modelValue: unref(newMessage).name,
                  "onUpdate:modelValue": ($event) => unref(newMessage).name = $event,
                  name: "name",
                  type: "text",
                  class: "block w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$b, {
                  message: unref(newMessage).errors.name
                }, null, 8, ["message"])
              ]),
              createVNode("div", { class: "px-2 mb-4" }, [
                createVNode(_sfc_main$a, {
                  for: "template_id",
                  value: "Template"
                }),
                withDirectives(createVNode("select", {
                  id: "template_id",
                  "onUpdate:modelValue": ($event) => unref(newMessage).template_id = $event,
                  name: "template_id",
                  class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category block w-full",
                  onChange: templateChanged
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.templates, (template) => {
                    return openBlock(), createBlock("option", {
                      key: template.id,
                      value: template.id
                    }, toDisplayString(template.name), 9, ["value"]);
                  }), 128))
                ], 40, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(newMessage).template_id]
                ]),
                createVNode(_sfc_main$b, {
                  message: unref(newMessage).errors.template_id
                }, null, 8, ["message"])
              ]),
              withDirectives(createVNode("div", { class: "px-2" }, [
                createVNode(_sfc_main$a, {
                  for: "full_size",
                  value: "Full or Split"
                }),
                withDirectives(createVNode("select", {
                  id: "full_size",
                  "onUpdate:modelValue": ($event) => unref(newMessage).full_size = $event,
                  name: "full_size",
                  class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category block w-full"
                }, [
                  createVNode("option", { value: "full" }, " Full "),
                  createVNode("option", { value: "split" }, " Split ")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(newMessage).full_size]
                ]),
                createVNode(_sfc_main$b, {
                  message: unref(newMessage).errors.full_size
                }, null, 8, ["message"])
              ], 512), [
                [vShow, showFullSizeSelect.value]
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "scala-delete-btn",
              onClick: ($event) => closeModal(false)
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
              disabled: !__props.canAddMessages,
              onClick: ($event) => addMessage(unref(newMessage))
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
                onClick: ($event) => closeModal(false)
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$3, {
                class: "scala-primary-btn",
                disabled: !__props.canAddMessages,
                onClick: ($event) => addMessage(unref(newMessage))
              }, {
                default: withCtx(() => [
                  createTextVNode(" Create ")
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$8, {
        show: confirmingMessageDupe.value,
        onClose: ($event) => closeModal()
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="scala-modal-notes"${_scopeId}> Please provide new names for ${ssrInterpolate(unref(checkedBoxes).length > 1 ? "these messages." : "this message.")}</div><span${_scopeId}></span><table class="min-w-full divide-y divide-gray-200 border-separate"${_scopeId}><thead class="bg-gray-200 border"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Duplicate Name </th><th scope="col" class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"${_scopeId}> Message Name </th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(messageDupes), (messageDupe) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "name" + messageDupe.id,
                modelValue: unref(messageDupeNames)[messageDupe.id],
                "onUpdate:modelValue": ($event) => unref(messageDupeNames)[messageDupe.id] = $event,
                name: "name",
                type: "text",
                class: "mt-2 block w-full"
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"${_scopeId}>${ssrInterpolate(messageDupe.name)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
          } else {
            return [
              createVNode("div", { class: "scala-modal-notes" }, " Please provide new names for " + toDisplayString(unref(checkedBoxes).length > 1 ? "these messages." : "this message."), 1),
              createVNode("span"),
              createVNode("table", { class: "min-w-full divide-y divide-gray-200 border-separate" }, [
                createVNode("thead", { class: "bg-gray-200 border" }, [
                  createVNode("tr", null, [
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Duplicate Name "),
                    createVNode("th", {
                      scope: "col",
                      class: "px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                    }, " Message Name ")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(messageDupes), (messageDupe) => {
                    return openBlock(), createBlock("tr", {
                      key: messageDupe.id
                    }, [
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, [
                        createVNode(_sfc_main$2, {
                          id: "name" + messageDupe.id,
                          modelValue: unref(messageDupeNames)[messageDupe.id],
                          "onUpdate:modelValue": ($event) => unref(messageDupeNames)[messageDupe.id] = $event,
                          name: "name",
                          type: "text",
                          class: "mt-2 block w-full"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" }, toDisplayString(messageDupe.name), 1)
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
              onClick: dupeMessages
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Dupe ✓ `);
                } else {
                  return [
                    createTextVNode(" Dupe ✓ ")
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
                onClick: dupeMessages
              }, {
                default: withCtx(() => [
                  createTextVNode(" Dupe ✓ ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Messages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
