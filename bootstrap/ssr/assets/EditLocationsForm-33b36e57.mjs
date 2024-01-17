import { ref, computed, watch, withCtx, createTextVNode, createVNode, withDirectives, vShow, unref, openBlock, createBlock, vModelSelect, withModifiers, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./TextInput-e4b68561.mjs";
import { _ as _sfc_main$6 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$8 } from "./DangerButton-5ac62031.mjs";
import { _ as _sfc_main$1 } from "./FormSectionWide-f115e870.mjs";
import { _ as _sfc_main$2 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$7 } from "./DialogModal-c762adec.mjs";
import { _ as _sfc_main$5 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$3 } from "./InputLabel-47ca9f72.mjs";
import { T as ToggleButton } from "./ToggleButton-5ebee51d.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "EditLocationsForm",
  __ssrInlineRender: true,
  props: {
    location: {
      type: Object,
      default: () => ({})
    },
    locations: {
      type: Object,
      default: () => ({})
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
    canAddFields: {
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
    const thumbnailPreview = ref(null);
    const photoInput = ref(null);
    const manifestInput = ref(null);
    const addingNewField = ref(false);
    const locationFieldsVisible = ref(false);
    const form = useForm("editLocation", {
      _method: "PUT",
      id: props.locations.id,
      name: props.locations.name,
      category: props.locations.category,
      description: props.locations.description,
      full_url: props.locations.full_url,
      thumbnail: props.locations.thumbnail,
      fields: props.locations.fields,
      photo: null,
      manifest: null
    });
    const toggleFields = () => {
      locationFieldsVisible.value = !locationFieldsVisible.value;
    };
    const confirmAddField = () => {
      addingNewField.value = true;
    };
    const addField = () => {
      fieldCreateForm.clearErrors();
      if (fieldCreateForm.type == "") {
        fieldCreateForm.setError("type", "Type required.");
      }
      if (fieldCreateForm.name == "") {
        fieldCreateForm.setError("name", "Name required.");
      }
      if (fieldCreateForm.label == "") {
        fieldCreateForm.setError("label", "Label required.");
      }
      if (fieldCreateForm.default == "") {
        fieldCreateForm.setError("default", "Default value required.");
      }
      if (fieldCreateForm.required == "") {
        fieldCreateForm.setError("required", "Required required.");
      }
      if ((fieldCreateForm.type == "string" || fieldCreateForm.type == "integer") && fieldCreateForm.max == "") {
        fieldCreateForm.setError("max", "Max required.");
      }
      if ((fieldCreateForm.type == "string" || fieldCreateForm.type == "integer") && fieldCreateForm.min == "") {
        fieldCreateForm.setError("min", "Min required.");
      }
      if ((fieldCreateForm.type == "string" || fieldCreateForm.type == "integer") && fieldCreateForm.lines == "") {
        fieldCreateForm.setError("min", "Lines required.");
      }
      if (Object.keys(fieldCreateForm.errors).length > 0) {
        return;
      }
      fieldCreateForm.post(route("location_fields.store"), {
        onSuccess: () => closeModal(),
        onError: () => fieldCreateForm.focus(),
        onFinish: () => fieldCreateForm.reset()
      });
    };
    const updateThumbnailPreview = () => {
      const thumbnail = photoInput.value.files[0];
      if (!thumbnail)
        return;
      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnailPreview.value = e.target.result;
      };
      reader.readAsDataURL(thumbnail);
    };
    const updateManifest = () => {
      const manifest = manifestInput.value.files[0];
      if (!manifest)
        return;
      const reader = new FileReader();
      reader.onload = (e) => {
        form.full_url = e.target.result;
      };
      reader.readAsDataURL(manifest);
    };
    const selectNewThumbnail = () => {
      photoInput.value.click();
    };
    const deleteThumbnail = () => {
      router.delete(route(
        "location_thumb.destroy",
        props.locations.id
      ), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => {
          thumbnailPreview.value = null;
          clearThumbnailFileInput();
        }
      });
    };
    const updateLocation = () => {
      form.clearErrors();
      if (photoInput.value) {
        form.photo = photoInput.value.files[0];
      }
      if (manifestInput.value) {
        form.manifest = manifestInput.value.files[0];
      }
      if (form.name == "") {
        form.setError("name", "Location Name required.");
        document.getElementById("location_name").classList.add("form-error-input");
      }
      if (Object.keys(form.errors).length > 0) {
        return;
      }
      if (props.formMode == "edit") {
        form.post(route("locations.update"), {
          onError: () => form.focus(),
          onFinish: () => form.reset()
        });
      } else {
        form.post(route("locations.store"), {
          onError: () => form.focus(),
          onFinish: () => form.reset()
        });
      }
    };
    const selectNewManifest = () => {
      manifestInput.value.click();
    };
    const deleteManifest = () => {
      clearManifestFileInput();
    };
    if (manifestInput.value) {
      form.full_url = manifestInput.value.files[0];
    }
    const clearManifestFileInput = () => {
      var _a;
      if ((_a = manifestInput.value) == null ? void 0 : _a.value) {
        manifestInput.value.value = null;
      }
      form.full_url = "";
      form.manifest = null;
    };
    const clearThumbnailFileInput = () => {
      var _a;
      if ((_a = photoInput.value) == null ? void 0 : _a.value) {
        photoInput.value.value = null;
      }
    };
    const closeModal = () => {
      addingNewField.value = false;
    };
    let locationErrorIds = [];
    const processFlash = (messages) => {
      let processedMessage = "";
      if (typeof messages === "object") {
        processedMessage += "Problem updating location! (records with issues marked in red)<br/>";
        Object.entries(messages).forEach((entry) => {
          const [key, value] = entry;
          locationErrorIds.push(key);
          processedMessage += value;
        });
        return processedMessage;
      }
      return messages;
    };
    const markLocationErrors = (errorIds) => {
      errorIds.forEach((id) => {
        let element = document.getElementById(id);
        if (element !== null) {
          document.getElementById(id).className = "location-row-color-error";
        }
      });
    };
    router.on("success", () => {
      markLocationErrors(locationErrorIds);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "width": "50%", "float": "left", "text-align": "left" })}"${_scopeId}><span${_scopeId}>Location:</span></div><div style="${ssrRenderStyle({ "width": "50%", "float": "left", "text-align": "right" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              style: __props.canAddFields ? null : { display: "none" },
              onClick: ($event) => confirmAddField()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add Field `);
                } else {
                  return [
                    createTextVNode(" Add Field ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "width": "50%", "float": "left", "text-align": "left" } }, [
                createVNode("span", null, "Location:")
              ]),
              createVNode("div", { style: { "width": "50%", "float": "left", "text-align": "right" } }, [
                withDirectives(createVNode(_sfc_main$2, {
                  onClick: ($event) => confirmAddField()
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Add Field ")
                  ]),
                  _: 1
                }, 8, ["onClick"]), [
                  [vShow, __props.canAddFields]
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${unref(flashMessage) ? processFlash(unref(flashMessage)) : ""}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div><div class="${ssrRenderClass(unref(form).thumbnail || thumbnailPreview.value ? "grid grid-cols-5 gap-2 bg-gray-50 border py-4" : "grid grid-cols-4 gap-2 bg-gray-50 border py-4")}"${_scopeId}><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "location_name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              name: "name",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "category",
              value: "Category"
            }, null, _parent2, _scopeId));
            _push2(`<select id="category" name="category" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm location-fields-modal-category"${_scopeId}><option value="pedestrian"${_scopeId}> Pedestrian </option><option value="pedestrian_emergency"${_scopeId}> Pedestrian Emergency </option></select>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.category
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "description",
              value: "Description"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "description",
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              name: "description",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (_ctx.manifestUpload) {
              _push2(`<div class="px-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                for: "full_url",
                value: "Manifest",
                class: "hidden"
              }, null, _parent2, _scopeId));
              if (unref(form).full_url) {
                _push2(ssrRenderComponent(_sfc_main$6, {
                  type: "button",
                  class: "mt-2 location-fields-modal-thumb-btn",
                  onClick: deleteManifest
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Remove URL `);
                    } else {
                      return [
                        createTextVNode(" Remove URL ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$6, {
                  class: "mt-2 location-fields-modal-thumb-btn",
                  type: "button",
                  onClick: selectNewManifest
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Set URL `);
                    } else {
                      return [
                        createTextVNode(" Set URL ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(`<input type="file" class="hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(form).errors.full_url,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="px-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                for: "full_url",
                value: "Full URL"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                id: "full_url",
                modelValue: unref(form).full_url,
                "onUpdate:modelValue": ($event) => unref(form).full_url = $event,
                name: "full_url",
                type: "text",
                class: "block w-full"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(form).errors.full_url
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            if (_ctx.thumbnailUpload) {
              _push2(`<div class="px-2"${_scopeId}>`);
              if (unref(form).thumbnail) {
                _push2(ssrRenderComponent(_sfc_main$6, {
                  type: "button",
                  class: "mt-2 location-fields-modal-thumb-btn",
                  onClick: deleteThumbnail
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Remove Thumbnail `);
                    } else {
                      return [
                        createTextVNode(" Remove Thumbnail ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$6, {
                  class: "mt-2 location-fields-modal-thumb-btn",
                  type: "button",
                  onClick: selectNewThumbnail
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Upload Thumbnail `);
                    } else {
                      return [
                        createTextVNode(" Upload Thumbnail ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(ssrRenderComponent(_sfc_main$5, {
                message: unref(form).errors.thumbnail,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div style="${ssrRenderStyle(unref(form).thumbnail || thumbnailPreview.value ? null : { display: "none" })}" class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "thumbnail",
              value: "Thumbnail"
            }, null, _parent2, _scopeId));
            _push2(`<input type="file" class="hidden"${_scopeId}>`);
            if (thumbnailPreview.value && !unref(form).thumbnail) {
              _push2(`<div${_scopeId}><span class="location-thumbnail-preview" style="${ssrRenderStyle("background-image: url('" + thumbnailPreview.value + "');")}"${_scopeId}></span></div>`);
            } else {
              _push2(`<div${_scopeId}><img class="location-thumbnail-image"${ssrRenderAttr("src", _ctx.$page.props.locations.thumbnail_photo_url)} alt="location-thumbnail"${_scopeId}></div>`);
            }
            _push2(`</div></div>`);
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
              createVNode("div", {
                class: unref(form).thumbnail || thumbnailPreview.value ? "grid grid-cols-5 gap-2 bg-gray-50 border py-4" : "grid grid-cols-4 gap-2 bg-gray-50 border py-4"
              }, [
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "name",
                    value: "Name"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "location_name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    name: "name",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "category",
                    value: "Category"
                  }),
                  withDirectives(createVNode("select", {
                    id: "category",
                    "onUpdate:modelValue": ($event) => unref(form).category = $event,
                    name: "category",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm location-fields-modal-category"
                  }, [
                    createVNode("option", { value: "pedestrian" }, " Pedestrian "),
                    createVNode("option", { value: "pedestrian_emergency" }, " Pedestrian Emergency ")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).category]
                  ]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.category
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "description",
                    value: "Description"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "description",
                    modelValue: unref(form).description,
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    name: "description",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.description
                  }, null, 8, ["message"])
                ]),
                _ctx.manifestUpload ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "px-2"
                }, [
                  createVNode(_sfc_main$3, {
                    for: "full_url",
                    value: "Manifest",
                    class: "hidden"
                  }),
                  unref(form).full_url ? (openBlock(), createBlock(_sfc_main$6, {
                    key: 0,
                    type: "button",
                    class: "mt-2 location-fields-modal-thumb-btn",
                    onClick: withModifiers(deleteManifest, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Remove URL ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : (openBlock(), createBlock(_sfc_main$6, {
                    key: 1,
                    class: "mt-2 location-fields-modal-thumb-btn",
                    type: "button",
                    onClick: withModifiers(selectNewManifest, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Set URL ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])),
                  createVNode("input", {
                    ref_key: "manifestInput",
                    ref: manifestInput,
                    type: "file",
                    class: "hidden",
                    onChange: updateManifest
                  }, null, 544),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.full_url,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "px-2"
                }, [
                  createVNode(_sfc_main$3, {
                    for: "full_url",
                    value: "Full URL"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "full_url",
                    modelValue: unref(form).full_url,
                    "onUpdate:modelValue": ($event) => unref(form).full_url = $event,
                    name: "full_url",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.full_url
                  }, null, 8, ["message"])
                ])),
                _ctx.thumbnailUpload ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "px-2"
                }, [
                  unref(form).thumbnail ? (openBlock(), createBlock(_sfc_main$6, {
                    key: 0,
                    type: "button",
                    class: "mt-2 location-fields-modal-thumb-btn",
                    onClick: withModifiers(deleteThumbnail, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Remove Thumbnail ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : (openBlock(), createBlock(_sfc_main$6, {
                    key: 1,
                    class: "mt-2 location-fields-modal-thumb-btn",
                    type: "button",
                    onClick: withModifiers(selectNewThumbnail, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Upload Thumbnail ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])),
                  createVNode(_sfc_main$5, {
                    message: unref(form).errors.thumbnail,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                withDirectives(createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "thumbnail",
                    value: "Thumbnail"
                  }),
                  createVNode("input", {
                    ref_key: "photoInput",
                    ref: photoInput,
                    type: "file",
                    class: "hidden",
                    onChange: updateThumbnailPreview
                  }, null, 544),
                  thumbnailPreview.value && !unref(form).thumbnail ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("span", {
                      class: "location-thumbnail-preview",
                      style: "background-image: url('" + thumbnailPreview.value + "');"
                    }, null, 4)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("img", {
                      class: "location-thumbnail-image",
                      src: _ctx.$page.props.locations.thumbnail_photo_url,
                      alt: "location-thumbnail"
                    }, null, 8, ["src"])
                  ]))
                ], 512), [
                  [vShow, unref(form).thumbnail || thumbnailPreview.value]
                ])
              ], 2)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="location-edit-form-actions"${_scopeId}><div class="location-edit-show-fields"${_scopeId}>`);
            if (__props.canAddFields) {
              _push2(ssrRenderComponent(_sfc_main$2, { onClick: toggleFields }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Show Fields `);
                  } else {
                    return [
                      createTextVNode(" Show Fields ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="location-edit-form-buttons"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("locations.index"))}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              type: "button",
              class: "mr-2"
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
            _push2(`</a>`);
            _push2(ssrRenderComponent(_sfc_main$2, { onClick: updateLocation }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save Location `);
                } else {
                  return [
                    createTextVNode(" Save Location ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "location-edit-form-actions" }, [
                createVNode("div", { class: "location-edit-show-fields" }, [
                  __props.canAddFields ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 0,
                    onClick: toggleFields
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Show Fields ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "location-edit-form-buttons" }, [
                  createVNode("a", {
                    href: _ctx.route("locations.index")
                  }, [
                    createVNode(_sfc_main$6, {
                      type: "button",
                      class: "mr-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    })
                  ], 8, ["href"]),
                  createVNode(_sfc_main$2, { onClick: updateLocation }, {
                    default: withCtx(() => [
                      createTextVNode(" Save Location ")
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
      _push(`<div style="${ssrRenderStyle(locationFieldsVisible.value ? null : { display: "none" })}" class="location-fields-container"><table class="min-w-full divide-y divide-gray-200 border-separate"><thead class="bg-gray-200 border"><tr><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Name </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Type </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Label </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Required? </th><th scope="col" style="${ssrRenderStyle({ "max-width": "100px" })}" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Data </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Max </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Min </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Lines </th><th scope="col" class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"> Default </th></tr></thead><tbody><!--[-->`);
      ssrRenderList(_ctx.locationFields, (field) => {
        _push(`<tr${ssrRenderAttr("id", field.id)}><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.name)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.type)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.label)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.required)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border" style="${ssrRenderStyle({ "max-width": "200px" })}"><pre>${ssrInterpolate(field.json_data)}</pre></td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.max)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.min)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.lines)}</td><td class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">${ssrInterpolate(field.default)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        show: addingNewField.value,
        "max-width": "max",
        onClose: ($event) => closeModal()
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}><b${_scopeId}>${ssrInterpolate(unref(form).name)}</b> Field:</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode("b", null, toDisplayString(unref(form).name), 1),
                createTextVNode(" Field:")
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="location-fields-modal-grid"${_scopeId}><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "name",
              modelValue: _ctx.fieldCreateForm.name,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.name = $event,
              name: "name",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "type",
              value: "Type"
            }, null, _parent2, _scopeId));
            _push2(`<select id="type" name="type" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input location-field-select"${_scopeId}><option value="string"${_scopeId}> String </option><option value="integer"${_scopeId}> Integer </option><option value="font"${_scopeId}> Font </option><option value="picker"${_scopeId}> Color Picker </option><option value="select"${_scopeId}> Drop Down </option><option value="textarea"${_scopeId}> Text Box </option></select>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.type
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "label",
              value: "Label"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "label",
              modelValue: _ctx.fieldCreateForm.label,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.label = $event,
              name: "label",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.label
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "default",
              value: "Default"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "default",
              modelValue: _ctx.fieldCreateForm.default,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.default = $event,
              name: "default",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.default
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(_ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea" ? null : { display: "none" })}" class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "max",
              value: "Max"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "max",
              modelValue: _ctx.fieldCreateForm.max,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.max = $event,
              name: "max",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.max
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(_ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea" ? null : { display: "none" })}" class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "min",
              value: "Min"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "min",
              modelValue: _ctx.fieldCreateForm.min,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.min = $event,
              name: "min",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.min
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(_ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea" ? null : { display: "none" })}" class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "lines",
              value: "Lines"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "lines",
              modelValue: _ctx.fieldCreateForm.lines,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.lines = $event,
              name: "lines",
              type: "text",
              class: "block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              message: _ctx.fieldCreateForm.errors.lines
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="px-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "required",
              value: "Required?"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ToggleButton, {
              modelValue: _ctx.fieldCreateForm.required,
              "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.required = $event,
              onlabel: "Yes",
              offlabel: "No",
              labelledby: "toggle-label",
              describedby: "toggle-description",
              "false-value": "0",
              "true-value": "1",
              classes: {
                container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
              }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "location-fields-modal-grid" }, [
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "name",
                    value: "Name"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "name",
                    modelValue: _ctx.fieldCreateForm.name,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.name = $event,
                    name: "name",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "type",
                    value: "Type"
                  }),
                  withDirectives(createVNode("select", {
                    id: "type",
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.type = $event,
                    name: "type",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input location-field-select"
                  }, [
                    createVNode("option", { value: "string" }, " String "),
                    createVNode("option", { value: "integer" }, " Integer "),
                    createVNode("option", { value: "font" }, " Font "),
                    createVNode("option", { value: "picker" }, " Color Picker "),
                    createVNode("option", { value: "select" }, " Drop Down "),
                    createVNode("option", { value: "textarea" }, " Text Box ")
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, _ctx.fieldCreateForm.type]
                  ]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.type
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "label",
                    value: "Label"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "label",
                    modelValue: _ctx.fieldCreateForm.label,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.label = $event,
                    name: "label",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.label
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "default",
                    value: "Default"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "default",
                    modelValue: _ctx.fieldCreateForm.default,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.default = $event,
                    name: "default",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.default
                  }, null, 8, ["message"])
                ]),
                withDirectives(createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "max",
                    value: "Max"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "max",
                    modelValue: _ctx.fieldCreateForm.max,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.max = $event,
                    name: "max",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.max
                  }, null, 8, ["message"])
                ], 512), [
                  [vShow, _ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea"]
                ]),
                withDirectives(createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "min",
                    value: "Min"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "min",
                    modelValue: _ctx.fieldCreateForm.min,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.min = $event,
                    name: "min",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.min
                  }, null, 8, ["message"])
                ], 512), [
                  [vShow, _ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea"]
                ]),
                withDirectives(createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "lines",
                    value: "Lines"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "lines",
                    modelValue: _ctx.fieldCreateForm.lines,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.lines = $event,
                    name: "lines",
                    type: "text",
                    class: "block w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    message: _ctx.fieldCreateForm.errors.lines
                  }, null, 8, ["message"])
                ], 512), [
                  [vShow, _ctx.fieldCreateForm.type == "string" || _ctx.fieldCreateForm.type == "integer" || _ctx.fieldCreateForm.type == "textarea"]
                ]),
                createVNode("div", { class: "px-2" }, [
                  createVNode(_sfc_main$3, {
                    for: "required",
                    value: "Required?"
                  }),
                  createVNode(ToggleButton, {
                    modelValue: _ctx.fieldCreateForm.required,
                    "onUpdate:modelValue": ($event) => _ctx.fieldCreateForm.required = $event,
                    onlabel: "Yes",
                    offlabel: "No",
                    labelledby: "toggle-label",
                    describedby: "toggle-description",
                    "false-value": "0",
                    "true-value": "1",
                    classes: {
                      container: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30"
                    }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, {
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
            _push2(ssrRenderComponent(_sfc_main$8, { onClick: addField }, {
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
              createVNode(_sfc_main$6, {
                onClick: ($event) => closeModal()
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode("span", { style: { "width": "20px" } }),
              createVNode(_sfc_main$8, { onClick: addField }, {
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Locations/Partials/EditLocationsForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
