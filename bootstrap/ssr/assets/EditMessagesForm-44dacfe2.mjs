import { computed, useSlots, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, unref, useSSRContext, ref, watchEffect, mergeProps, createVNode, toDisplayString, onMounted, createTextVNode, withDirectives, vModelSelect, isRef, vShow } from "vue";
import { ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { S as SectionTitle } from "./SectionTitle-592cad78.mjs";
import { _ as _sfc_main$9 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$8 } from "./SecondaryButton-8e76ef1f.mjs";
import { _ as _sfc_main$7 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$5 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$6 } from "./TextInput-e4b68561.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
import Multiselect from "vue-multiselect";
/* empty css                                                                    */const _sfc_main$4 = {
  __name: "FormSectionPreview",
  __ssrInlineRender: true,
  props: {
    previewHeight: {
      type: Number,
      default: () => 540
    },
    previewWidth: {
      type: Number,
      default: () => 960
    },
    defaultPreview: {
      type: Boolean,
      default: () => false
    },
    defaultPreviewSlot: {
      type: Boolean,
      default: () => true
    }
  },
  emits: ["submitted"],
  setup(__props) {
    const hasActions = computed(() => !!useSlots().actions);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="player-preview-flex"><div class="player-preview-left" style="${ssrRenderStyle("width: " + __props.previewWidth * 0.5 + "px;")}">`);
      _push(ssrRenderComponent(SectionTitle, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "title")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent2, _scopeId);
            if (__props.defaultPreviewSlot) {
              _push2(`<div id="message-preview-container-left" class="message-preview-container"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "preview", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "description"),
              __props.defaultPreviewSlot ? (openBlock(), createBlock("div", {
                key: 0,
                id: "message-preview-container-left",
                class: "message-preview-container"
              }, [
                renderSlot(_ctx.$slots, "preview")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div><div class="player-preview-right"><form><div class="${ssrRenderClass([unref(hasActions) ? "sm:rounded-tl-md sm:rounded-tr-md" : "sm:rounded-md", "px-4 py-5 bg-white sm:p-6 shadow"])}">`);
      ssrRenderSlot(_ctx.$slots, "form", {}, null, _push, _parent);
      _push(`</div>`);
      if (unref(hasActions)) {
        _push(`<div>`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div><div class="player-preview-bottom mt-4"><div class="block w-full border-t border-gray-200 mb-4"></div>`);
      if (!__props.defaultPreview && !__props.defaultPreviewSlot) {
        _push(`<div id="message-preview-container-bottom" class="message-preview-container">`);
        ssrRenderSlot(_ctx.$slots, "preview", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.defaultPreview) {
        _push(`<div class="message-preview-container"><div style="${ssrRenderStyle("height: " + __props.previewHeight + "px; width: " + __props.previewWidth + "px;")}" class="message-preview"><div class="${ssrRenderClass(_ctx.containerClass)}"><iframe id="iframe"${ssrRenderAttr("src", _ctx.iframeSource)} style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0", "transform": "scale(0.5, 0.5)", "transform-origin": "0% 0%" })}" height="1080" width="1920"></iframe></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FormSectionPreview.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Slider_vue_vue_type_style_index_0_scoped_b8fe140c_lang = "";
const _sfc_main$3 = {
  __name: "Slider",
  __ssrInlineRender: true,
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    id: {
      type: String,
      default: ""
    },
    step: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const { min, max, id, step, modelValue } = __props;
    const sliderValue = ref(modelValue);
    const slider = ref(null);
    const getProgress = (value, min2, max2) => {
      return (value - min2) / (max2 - min2) * 100;
    };
    const setCSSProgress = (progress) => {
      slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
    };
    watchEffect(() => {
      if (slider.value) {
        emit("update:modelValue", sliderValue.value);
        const progress = getProgress(
          sliderValue.value,
          slider.value.min,
          slider.value.max
        );
        let extraWidth = (100 - progress) / 10;
        setCSSProgress(progress + extraWidth);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "slider" }, _attrs))} data-v-b8fe140c><input${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("value", sliderValue.value)}${ssrRenderAttr("min", __props.min)}${ssrRenderAttr("max", __props.max)}${ssrRenderAttr("step", __props.step)} type="number" class="input" onkeydown="return false" style="${ssrRenderStyle({ "width": "25%", "margin-right": "5%" })}" data-v-b8fe140c><input${ssrRenderAttr("value", sliderValue.value)} type="range"${ssrRenderAttr("min", __props.min)}${ssrRenderAttr("max", __props.max)}${ssrRenderAttr("step", __props.step)} class="slider" style="${ssrRenderStyle({ "width": "65%", "margin-right": "5%" })}" data-v-b8fe140c></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Slider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b8fe140c"]]);
const _sfc_main$2 = {
  __name: "FlipSwitch",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    componentProps: {
      type: Object,
      default: () => ({})
    },
    flipOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const { modelValue, componentProps, flipOptions } = __props;
    const flipValue = ref(modelValue);
    ref(null);
    const checked = flipValue.value === flipOptions[1].value ? true : false;
    const flipLabel = checked ? flipOptions[1].label : flipOptions[0].label;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><div class="col-span-6 sm:col-span-4 mt-3 mr-2"><div class="flipswitch"><input${ssrRenderAttr("id", __props.componentProps.name + "_flipswitch")}${ssrRenderAttr("name", __props.componentProps.name + "_flipswitch")} type="checkbox"${ssrRenderAttr("value", flipValue.value)}${ssrIncludeBooleanAttr(unref(checked)) ? " checked" : ""} class="flipswitch-cb"><label${ssrRenderAttr("for", __props.componentProps.name + "_flipswitch")} class="flipswitch-label"><div class="flipswitch-inner"></div><div class="flipswitch-switch"></div></label></div></div><div class="col-span-6 sm:col-span-4 mt-0"><input${ssrRenderAttr("id", __props.componentProps.name)}${ssrRenderAttr("value", unref(flipLabel))} type="text" class="mt-1 ml-2 block w-full" style="${ssrRenderStyle({ "width": "150px" })}"></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FlipSwitch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PlayerMessageEditor",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    messageComponents: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const { show, messageComponents, modelValue } = __props;
    const playerValue = ref(modelValue);
    const player = ref(null);
    const selectedAirlines = ref(playerValue.value.airlines ? playerValue.value.airlines : []);
    const onMultiSelectChange = (event, action) => {
      if (action === "add") {
        selectedAirlines.value.push(event);
      } else {
        selectedAirlines.value = selectedAirlines.value.filter(function(airline) {
          return airline.id != event.id;
        });
      }
      playerValue.value.airlines = selectedAirlines.value;
    };
    watchEffect(() => {
      if (player.value) {
        emit("update:modelValue", playerValue.value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="item item-skinny">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        for: "name",
        value: "Message Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        id: "name",
        ref_key: "player",
        ref: player,
        modelValue: playerValue.value["name"],
        "onUpdate:modelValue": ($event) => playerValue.value["name"] = $event,
        name: "name",
        type: "text",
        class: "mt-2 block w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7, {
        message: playerValue.value.errors["name"],
        class: "mt-2"
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(__props.messageComponents, (messageComponent, name) => {
        _push(`<div${ssrRenderAttrs(mergeProps({ key: name }, _ctx.$attrs, {
          class: messageComponent.type === "font" || messageComponent.type === "textarea" || messageComponent.type === "number" || messageComponent.type === "airlines-select" || messageComponent.type === "toggle" ? "item item-fat" : "item item-skinny"
        }))}>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          for: name,
          value: messageComponent.label
        }, null, _parent));
        if (messageComponent.type === "text") {
          _push(`<div>`);
          _push(ssrRenderComponent(_sfc_main$6, {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            name,
            type: messageComponent.type,
            disabled: messageComponent.readonly,
            class: "mt-2 block w-full"
          }, null, _parent));
          _push(`</div>`);
        } else if (messageComponent.type === "number") {
          _push(`<div><div class="slider">`);
          _push(ssrRenderComponent(Slider, {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            name,
            min: messageComponent.min,
            max: messageComponent.max,
            disabled: messageComponent.readonly,
            class: "mt-2 block w-full",
            step: 1,
            onInput: ({ target }) => playerValue.value[name] = parseFloat(target.value)
          }, null, _parent));
          _push(`</div></div>`);
        } else if (messageComponent.type === "textarea") {
          _push(`<div><textarea${ssrRenderAttr("id", name)}${ssrRenderAttr("name", name)}${ssrRenderAttr("type", messageComponent.type)} style="${ssrRenderStyle({ "width": "100%" })}"${ssrRenderAttr("rows", messageComponent.rows)}${ssrIncludeBooleanAttr(messageComponent.readonly) ? " disabled" : ""} class="mt-2 block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${ssrInterpolate(playerValue.value[name])}</textarea></div>`);
        } else if (messageComponent.type === "select") {
          _push(`<div><select${ssrRenderAttr("id", name)}${ssrRenderAttr("name", name)}${ssrRenderAttr("value", playerValue.value[name])}${ssrIncludeBooleanAttr(messageComponent.readonly) ? " disabled" : ""} class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 block w-full"><!--[-->`);
          ssrRenderList(messageComponent.options, (option) => {
            _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(option.default) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else if (messageComponent.type === "airlines-select") {
          _push(`<div>`);
          _push(ssrRenderComponent(unref(Multiselect), {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            name,
            disabled: messageComponent.readonly,
            class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 block w-full",
            placeholder: "Select Airlines",
            "track-by": "id",
            label: "name",
            options: messageComponent.options,
            multiple: true,
            "close-on-select": false,
            "clear-on-select": false,
            "preserve-search": true,
            onSelect: ($event) => onMultiSelectChange($event, "add"),
            onRemove: ($event) => onMultiSelectChange($event, "sub")
          }, {
            selection: withCtx(({ values }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="multiselect-multiple-label"${_scopeId}>${ssrInterpolate(values.length)} airlines selected </div>`);
              } else {
                return [
                  createVNode("div", { class: "multiselect-multiple-label" }, toDisplayString(values.length) + " airlines selected ", 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        } else if (messageComponent.type === "toggle") {
          _push(`<div>`);
          _push(ssrRenderComponent(_sfc_main$2, {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            name,
            "flip-options": messageComponent.options,
            disabled: messageComponent.readonly,
            classes: "mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30 mt-2 block w-full",
            onChange: ({ target }) => playerValue.value[name] = target.value
          }, null, _parent));
          _push(`</div>`);
        } else if (messageComponent.type === "picker") {
          _push(`<div><div class="flex"><div class="col-span-6">`);
          _push(ssrRenderComponent(_sfc_main$6, {
            id: name + "_picker",
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            type: "color",
            class: "mt-2 block w-full",
            autocomplete: "Color",
            disabled: messageComponent.readonly,
            style: { "width": "24px" },
            onInput: ({ target }) => playerValue.value[name] = target.value
          }, null, _parent));
          _push(`</div><div class="col-span-6 mt-0">`);
          _push(ssrRenderComponent(_sfc_main$6, {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            name,
            type: "text",
            class: "mt-1 ml-2 block w-full",
            autocomplete: "Primary Color",
            disabled: messageComponent.readonly,
            style: { "width": "100px" },
            onInput: ({ target }) => playerValue.value[name] = target.value
          }, null, _parent));
          _push(`</div></div></div>`);
        } else if (messageComponent.type === "font") {
          _push(`<div><div class="sm:p-6 shadow sm:rounded-md mt-2 bg-gray-50">`);
          if (messageComponent.family) {
            _push(`<div class="flex mb-3"><div class="col-span-6 mt-2 mr-2" style="${ssrRenderStyle({ "width": "55px" })}"> Family: </div><div class="col-span-6 mt-0" style="${ssrRenderStyle({ "min-width": "132px", "width": "150px" })}"><select${ssrRenderAttr("id", name + ".family")}${ssrRenderAttr("name", name + ".family")}${ssrRenderAttr("value", playerValue.value[name].family)}${ssrIncludeBooleanAttr(messageComponent.readonly) ? " disabled" : ""} class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" style="${ssrRenderStyle({ "min-width": "132px", "width": "150px" })}"><!--[-->`);
            ssrRenderList(messageComponent.family.options, (option) => {
              _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(option.value == messageComponent.family.options.default) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
            });
            _push(`<!--]--></select></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (messageComponent.color) {
            _push(`<div class="flex mb-3"><div class="col-span-6 mt-2 mr-2" style="${ssrRenderStyle({ "width": "55px" })}"> Color: </div><div class="col-span-6 mt-0">`);
            _push(ssrRenderComponent(_sfc_main$6, {
              ref_for: true,
              ref_key: "player",
              ref: player,
              modelValue: playerValue.value[name].color,
              "onUpdate:modelValue": ($event) => playerValue.value[name].color = $event,
              name: name + ".color_picker",
              disabled: messageComponent.readonly,
              type: "color",
              class: "mt-2 block w-full",
              autocomplete: "Color",
              style: { "width": "24px" },
              onInput: ({ target }) => playerValue.value[name].color = target.value
            }, null, _parent));
            _push(`</div><div class="col-span-6">`);
            _push(ssrRenderComponent(_sfc_main$6, {
              id: name + ".color",
              ref_for: true,
              ref_key: "player",
              ref: player,
              modelValue: playerValue.value[name].color,
              "onUpdate:modelValue": ($event) => playerValue.value[name].color = $event,
              disabled: messageComponent.readonly,
              name: name + ".color",
              type: "text",
              class: "mt-0 ml-2 block w-full",
              autocomplete: "Primary Color",
              style: { "width": "100px" },
              onInput: ({ target }) => playerValue.value[name].color = target.value
            }, null, _parent));
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (messageComponent.weight) {
            _push(`<div class="flex mb-3"><div class="col-span-6 mt-3 mr-2" style="${ssrRenderStyle({ "width": "55px" })}"> Weight: </div><div class="col-span-6"><div class="slider">`);
            _push(ssrRenderComponent(Slider, {
              id: name + ".weight",
              ref_for: true,
              ref_key: "player",
              ref: player,
              modelValue: playerValue.value[name].weight,
              "onUpdate:modelValue": ($event) => playerValue.value[name].weight = $event,
              disabled: messageComponent.readonly,
              name: name + ".weight",
              min: messageComponent.weight.min,
              max: messageComponent.weight.max,
              step: 50,
              onInput: ({ target }) => playerValue.value[name].weight = parseFloat(target.value)
            }, null, _parent));
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (messageComponent.size) {
            _push(`<div class="flex mb-3"><div class="col-span-6 mt-3 mr-2" style="${ssrRenderStyle({ "width": "55px" })}"> Size: </div><div class="col-span-6"><div class="slider">`);
            _push(ssrRenderComponent(Slider, {
              id: name + ".size",
              ref_for: true,
              ref_key: "player",
              ref: player,
              modelValue: playerValue.value[name].size,
              "onUpdate:modelValue": ($event) => playerValue.value[name].size = $event,
              disabled: messageComponent.readonly,
              name: name + ".size",
              min: messageComponent.size.min,
              max: messageComponent.size.max,
              step: 1,
              onInput: ({ target }) => playerValue.value[name].size = parseFloat(target.value)
            }, null, _parent));
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div>`);
          _push(ssrRenderComponent(_sfc_main$6, {
            id: name,
            ref_for: true,
            ref_key: "player",
            ref: player,
            modelValue: playerValue.value[name],
            "onUpdate:modelValue": ($event) => playerValue.value[name] = $event,
            disabled: messageComponent.readonly,
            name,
            type: messageComponent.type,
            class: "mt-2 block w-full",
            onInput: ({ target }) => playerValue.value[name] = target.value
          }, null, _parent));
          _push(`</div>`);
        }
        _push(ssrRenderComponent(_sfc_main$7, {
          message: __props.modelValue.errors[name],
          class: "mt-2"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PlayerMessageEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "EditMessagesForm",
  __ssrInlineRender: true,
  props: {
    playerMessage: {
      type: Object,
      default: () => ({})
    },
    messageComponents: {
      type: Object,
      default: () => ({})
    },
    template: {
      type: Object,
      default: () => ({})
    },
    canEditMessages: {
      type: Boolean,
      default: () => false
    },
    canAddMessages: {
      type: Boolean,
      default: () => false
    },
    canRefreshMessages: {
      type: Boolean,
      default: () => false
    },
    formMode: {
      type: String,
      default: () => ""
    },
    flash: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const setCookie = (name, value) => {
      let oldCookies = getCookie("scalaCookies");
      if (oldCookies != null) {
        oldCookies[name] = value;
      } else {
        oldCookies = {};
        oldCookies[name] = value;
      }
      document.cookie = "scalaCookies=" + JSON.stringify(oldCookies) + "; path=/; max-age=${60 * 60 * 24 * 14};";
    };
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return JSON.parse(parts.pop().split(";").shift());
      } else {
        return null;
      }
    };
    usePage();
    const showFlashMessage = ref(false);
    const refreshingPreview = ref(false);
    const previewDefaultLoc = ref(true);
    const previewWidth = ref(props.playerMessage.appWidth);
    let editMessageForm = null;
    editMessageForm = useForm("editMessage", props.playerMessage);
    let messagePreviewId = null;
    if (props.playerMessage) {
      messagePreviewId = props.playerMessage.id;
    }
    let iframeUpdate = false;
    const iframeSource = props.template.full_url + "?message_id=" + props.playerMessage.id;
    const previewContainerClass = ref("message-preview player-preview-md");
    const playerMessageEditor = ref(null);
    let playerPreviewLeft = null;
    let templateDescription = null;
    let playerPreviewFlex = null;
    let playerPreviewHeight = null;
    let messagePreviewSizeCookieName = "messagePreviewSize-" + props.playerMessage.id;
    let scalaCookies = getCookie("scalaCookies");
    if (scalaCookies === null) {
      scalaCookies = {};
    }
    let messagePreviewSizeCookie = scalaCookies[messagePreviewSizeCookieName];
    if (messagePreviewSizeCookie !== null) {
      if (messagePreviewSizeCookie) {
        previewContainerClass.value = messagePreviewSizeCookie;
      } else {
        previewContainerClass.value = "message-preview player-preview-md";
      }
    }
    const showFlash = (error = false) => {
      showFlashMessage.value = true;
      if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style = "display:justify;";
      }
    };
    const hideFlash = () => {
      showFlashMessage.value = false;
      if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style = "display:none;";
      }
    };
    const refreshPlayerMessage = () => {
      navBlock = false;
      showFlashMessage.value = false;
      refreshingPreview.value = true;
      editMessageForm.clearErrors();
      editMessageForm.put(route(
        "messages.refresh"
      ), {
        onError: () => {
          showFlash(true);
          editMessageForm.focus();
          navBlock = true;
          refreshingPreview.value = false;
        },
        onSuccess: () => {
          showFlash();
          iframeUpdate = !iframeUpdate;
          navBlock = true;
          let iframeLeft = document.getElementById("message-preview-container-left");
          if (iframeLeft) {
            iframeLeft.classList.remove("animate-pulse-slow");
            iframeLeft.classList.add("animate-pulse-slow");
          } else {
            let iframeBottom = document.getElementById("message-preview-container-bottom");
            if (iframeBottom) {
              iframeBottom.classList.remove("animate-pulse-slow");
              iframeBottom.classList.add("animate-pulse-slow");
            }
          }
        },
        onFinish: () => {
          refreshingPreview.value = false;
          editMessageForm.reset();
        }
      });
    };
    const cancelMessage = () => {
      navBlock = false;
      showFlashMessage.value = false;
      refreshingPreview.value = false;
      router.delete(route(
        "messages.cancel",
        messagePreviewId
      ), {
        onError: () => {
          showFlash(true);
          editMessageForm.focus();
          navBlock = true;
          refreshingPreview.value = false;
        },
        onSuccess: () => {
          window.removeEventListener("popstate", listenerManager, false);
        }
      });
    };
    const previewSizeChange = (classValue) => {
      previewContainerClass.value = classValue;
      playerPreviewLeft = document.getElementsByClassName("player-preview-left")[0];
      templateDescription = document.getElementsByClassName("template-description-section")[0];
      playerPreviewFlex = document.getElementsByClassName("player-preview-flex")[0];
      setCookie([messagePreviewSizeCookieName], classValue);
      switch (classValue) {
        case "message-preview player-preview-full":
        case "message-preview player-preview-lg":
          previewDefaultLoc.value = false;
          playerPreviewLeft.style.width = previewWidth.value * 0.25 + "px";
          templateDescription.style.width = previewWidth.value * 0.25 + "px";
          playerPreviewFlex.style.minWidth = previewWidth.value * 0.25 + 330 + "px";
          playerPreviewLeft.style.height = playerPreviewHeight - props.playerMessage.appHeight + "px";
          break;
        case "message-preview player-preview-md":
          previewDefaultLoc.value = true;
          playerPreviewLeft.style.width = previewWidth.value * 0.5 + "px";
          templateDescription.style.width = previewWidth.value * 0.5 + "px";
          playerPreviewFlex.style.minWidth = previewWidth.value * 0.5 + 330 + "px";
          playerPreviewLeft.style.height = playerPreviewHeight - props.playerMessage.appHeight * 0.5 + "px";
          break;
        case "message-preview player-preview-sm":
          previewDefaultLoc.value = true;
          playerPreviewLeft.style.width = previewWidth.value * 0.25 + "px";
          templateDescription.style.width = previewWidth.value * 0.25 + "px";
          playerPreviewFlex.style.minWidth = previewWidth.value * 0.25 + 330 + "px";
          playerPreviewLeft.style.height = playerPreviewHeight - props.playerMessage.appHeight * 0.67 + "px";
          break;
      }
    };
    const postMessage = () => {
      navBlock = false;
      if (props.formMode == "edit") {
        editMessageForm.put(route(
          "messages.update"
        ), {
          onError: () => {
            editMessageForm.focus();
            navBlock = true;
          },
          onSuccess: () => {
            editMessageForm.reset();
            navBlock = false;
            window.removeEventListener("popstate", listenerManager);
          }
        });
      } else {
        editMessageForm.put(route(
          "messages.update"
        ), {
          onError: () => {
            editMessageForm.focus();
            navBlock = true;
          },
          onSuccess: () => {
            editMessageForm.reset();
            navBlock = false;
            window.removeEventListener("popstate", listenerManager);
          }
        });
      }
    };
    let navBlockPage = router.page.url.indexOf("/messages/edit/") > -1 || router.page.url.indexOf("/messages/create") > -1;
    let navBlock = true;
    const listenerManager = (event) => {
      if (navBlockPage && navBlock) {
        if (confirm("Are you sure you want to navigate away? You will lose any changes that are not finalized!")) {
          cancelMessage();
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
    };
    onMounted(() => {
      playerPreviewLeft = document.getElementsByClassName("player-preview-left")[0];
      playerPreviewHeight = playerPreviewLeft.clientHeight;
      previewSizeChange(previewContainerClass.value);
      router.on("before", (event) => {
        if (event.type !== "popstate") {
          listenerManager(event);
        }
      });
      window.addEventListener("popstate", listenerManager);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$4, mergeProps({
        "preview-height": props.playerMessage.appHeight,
        "preview-width": props.playerMessage.appWidth,
        "default-preview": false,
        "default-preview-slot": previewDefaultLoc.value,
        onSubmitted: postMessage
      }, _attrs), {
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="template-description-section"${_scopeId}><span class="text-lg font-medium text-gray-900"${_scopeId}>Template Information:</span><div class="mt-1 ml-6"${_scopeId}><span${_scopeId}><b${_scopeId}>Name:</b>  </span><span class="capitalize"${_scopeId}>${ssrInterpolate(_ctx.$page.props.template.name)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}><b${_scopeId}>Category:</b>  </span><span class="capitalize"${_scopeId}>${ssrInterpolate(_ctx.$page.props.template.category)}</span></div><div class="ml-6"${_scopeId}><span${_scopeId}><b${_scopeId}>Description:</b>  </span><span class="capitalize"${_scopeId}>${ssrInterpolate(_ctx.$page.props.template.description)}</span></div><div class="mt-2 text-lg font-medium text-gray-900"${_scopeId}> Message ID: ${ssrInterpolate(__props.playerMessage.id)}</div><div class="mt-1 mb-4"${_scopeId}><span class="text-gray-900 font-medium text-lg"${_scopeId}>Preview Size:  </span><span${_scopeId}><select id="preview_size" name="preview_size" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category mt-1"${_scopeId}><option value="message-preview player-preview-full"${_scopeId}> Full </option><option value="message-preview player-preview-lg"${_scopeId}> Large </option><option value="message-preview player-preview-md"${_scopeId}> Medium </option><option value="message-preview player-preview-sm"${_scopeId}> Small </option></select></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "template-description-section" }, [
                createVNode("span", { class: "text-lg font-medium text-gray-900" }, "Template Information:"),
                createVNode("div", { class: "mt-1 ml-6" }, [
                  createVNode("span", null, [
                    createVNode("b", null, "Name:"),
                    createTextVNode("  ")
                  ]),
                  createVNode("span", { class: "capitalize" }, toDisplayString(_ctx.$page.props.template.name), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, [
                    createVNode("b", null, "Category:"),
                    createTextVNode("  ")
                  ]),
                  createVNode("span", { class: "capitalize" }, toDisplayString(_ctx.$page.props.template.category), 1)
                ]),
                createVNode("div", { class: "ml-6" }, [
                  createVNode("span", null, [
                    createVNode("b", null, "Description:"),
                    createTextVNode("  ")
                  ]),
                  createVNode("span", { class: "capitalize" }, toDisplayString(_ctx.$page.props.template.description), 1)
                ]),
                createVNode("div", { class: "mt-2 text-lg font-medium text-gray-900" }, " Message ID: " + toDisplayString(__props.playerMessage.id), 1),
                createVNode("div", { class: "mt-1 mb-4" }, [
                  createVNode("span", { class: "text-gray-900 font-medium text-lg" }, "Preview Size:  "),
                  createVNode("span", null, [
                    withDirectives(createVNode("select", {
                      id: "preview_size",
                      "onUpdate:modelValue": ($event) => previewContainerClass.value = $event,
                      name: "preview_size",
                      class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm message-fields-modal-category mt-1",
                      onChange: ($event) => previewSizeChange($event.target.value)
                    }, [
                      createVNode("option", { value: "message-preview player-preview-full" }, " Full "),
                      createVNode("option", { value: "message-preview player-preview-lg" }, " Large "),
                      createVNode("option", { value: "message-preview player-preview-md" }, " Medium "),
                      createVNode("option", { value: "message-preview player-preview-sm" }, " Small ")
                    ], 40, ["onUpdate:modelValue", "onChange"]), [
                      [vModelSelect, previewContainerClass.value]
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="player-message-editor"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(editMessageForm),
              "onUpdate:modelValue": ($event) => isRef(editMessageForm) ? editMessageForm.value = $event : editMessageForm = $event,
              "message-components": __props.messageComponents,
              show: true
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "playerMessageEditor",
                ref: playerMessageEditor,
                class: "player-message-editor"
              }, [
                createVNode(_sfc_main$1, {
                  modelValue: unref(editMessageForm),
                  "onUpdate:modelValue": ($event) => isRef(editMessageForm) ? editMessageForm.value = $event : editMessageForm = $event,
                  "message-components": __props.messageComponents,
                  show: true
                }, null, 8, ["modelValue", "onUpdate:modelValue", "message-components"])
              ], 512)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle(showFlashMessage.value ? null : { display: "none" })}" id="alertnotification" class="flex justify-end items-center scala-alert text-white text-sm font-bold px-1" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${__props.flash.message}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div><div class="flex px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"${_scopeId}><div class="justify-start" style="${ssrRenderStyle({ "max-width": "390px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              disabled: refreshingPreview.value || !__props.canRefreshMessages,
              class: { "opacity-25": refreshingPreview.value, "scala-edit-btn": true, "slim-header-btn": true },
              style: { "float": "left" },
              onClick: ($event) => refreshPlayerMessage()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="scala-btn-label"${_scopeId2}><div style="${ssrRenderStyle(refreshingPreview.value ? null : { display: "none" })}" class="scala-btn-loader"${_scopeId2}><svg id="L3" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"${_scopeId2}><circle fill="none" stroke="#4fa4fd" stroke-width="4" cx="50" cy="50" r="44" style="${ssrRenderStyle({ "opacity": "0.5" })}"${_scopeId2}></circle><circle fill="#DFF0D8" stroke="#4fa4fd" stroke-width="3" cx="8" cy="54" r="6"${_scopeId2}><animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"${_scopeId2}></animateTransform></circle></svg></div><div class="scala-btn-text"${_scopeId2}> Refresh </div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "scala-btn-label" }, [
                      withDirectives(createVNode("div", { class: "scala-btn-loader" }, [
                        (openBlock(), createBlock("svg", {
                          id: "L3",
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "xmlns:xlink": "http://www.w3.org/1999/xlink",
                          x: "0px",
                          y: "0px",
                          viewBox: "0 0 100 100",
                          "enable-background": "new 0 0 0 0",
                          "xml:space": "preserve"
                        }, [
                          createVNode("circle", {
                            fill: "none",
                            stroke: "#4fa4fd",
                            "stroke-width": "4",
                            cx: "50",
                            cy: "50",
                            r: "44",
                            style: { "opacity": "0.5" }
                          }),
                          createVNode("circle", {
                            fill: "#DFF0D8",
                            stroke: "#4fa4fd",
                            "stroke-width": "3",
                            cx: "8",
                            cy: "54",
                            r: "6"
                          }, [
                            createVNode("animateTransform", {
                              attributeName: "transform",
                              dur: "2s",
                              type: "rotate",
                              from: "0 50 48",
                              to: "360 50 52",
                              repeatCount: "indefinite"
                            })
                          ])
                        ]))
                      ], 512), [
                        [vShow, refreshingPreview.value]
                      ]),
                      createVNode("div", { class: "scala-btn-text" }, " Refresh ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="justify-end flex-grow"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              disabled: refreshingPreview.value,
              class: { "opacity-25": refreshingPreview.value, "scala-delete-btn": true, "slim-header-btn": true },
              onClick: ($event) => cancelMessage()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Discard `);
                } else {
                  return [
                    createTextVNode(" Discard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              type: "submit",
              class: { "opacity-25": refreshingPreview.value, "scala-edit-btn": true, "slim-header-btn": true },
              disabled: refreshingPreview.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Finalize `);
                } else {
                  return [
                    createTextVNode(" Finalize ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              withDirectives(createVNode("div", {
                id: "alertnotification",
                class: "flex justify-end items-center scala-alert text-white text-sm font-bold px-1",
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
                  innerHTML: __props.flash.message
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
              createVNode("div", { class: "flex px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md" }, [
                createVNode("div", {
                  class: "justify-start",
                  style: { "max-width": "390px" }
                }, [
                  createVNode(_sfc_main$8, {
                    disabled: refreshingPreview.value || !__props.canRefreshMessages,
                    class: { "opacity-25": refreshingPreview.value, "scala-edit-btn": true, "slim-header-btn": true },
                    style: { "float": "left" },
                    onClick: ($event) => refreshPlayerMessage()
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "scala-btn-label" }, [
                        withDirectives(createVNode("div", { class: "scala-btn-loader" }, [
                          (openBlock(), createBlock("svg", {
                            id: "L3",
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink",
                            x: "0px",
                            y: "0px",
                            viewBox: "0 0 100 100",
                            "enable-background": "new 0 0 0 0",
                            "xml:space": "preserve"
                          }, [
                            createVNode("circle", {
                              fill: "none",
                              stroke: "#4fa4fd",
                              "stroke-width": "4",
                              cx: "50",
                              cy: "50",
                              r: "44",
                              style: { "opacity": "0.5" }
                            }),
                            createVNode("circle", {
                              fill: "#DFF0D8",
                              stroke: "#4fa4fd",
                              "stroke-width": "3",
                              cx: "8",
                              cy: "54",
                              r: "6"
                            }, [
                              createVNode("animateTransform", {
                                attributeName: "transform",
                                dur: "2s",
                                type: "rotate",
                                from: "0 50 48",
                                to: "360 50 52",
                                repeatCount: "indefinite"
                              })
                            ])
                          ]))
                        ], 512), [
                          [vShow, refreshingPreview.value]
                        ]),
                        createVNode("div", { class: "scala-btn-text" }, " Refresh ")
                      ])
                    ]),
                    _: 1
                  }, 8, ["disabled", "class", "onClick"])
                ]),
                createVNode("div", { class: "justify-end flex-grow" }, [
                  createVNode(_sfc_main$8, {
                    disabled: refreshingPreview.value,
                    class: { "opacity-25": refreshingPreview.value, "scala-delete-btn": true, "slim-header-btn": true },
                    onClick: ($event) => cancelMessage()
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Discard ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "class", "onClick"]),
                  createVNode(_sfc_main$9, {
                    type: "submit",
                    class: { "opacity-25": refreshingPreview.value, "scala-edit-btn": true, "slim-header-btn": true },
                    disabled: refreshingPreview.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Finalize ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ])
            ];
          }
        }),
        preview: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="message-preview" style="${ssrRenderStyle("height: " + props.playerMessage.appHeight + "px; width: " + props.playerMessage.appWidth + "px;")}" class="${ssrRenderClass(previewContainerClass.value)}"${_scopeId}><iframe id="iframe" class="iframe-preview"${ssrRenderAttr("src", iframeSource)} style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0" })}"${ssrRenderAttr("height", props.playerMessage.appHeight)}${ssrRenderAttr("width", props.playerMessage.appWidth)}${_scopeId}></iframe></div>`);
          } else {
            return [
              createVNode("div", {
                id: "message-preview",
                style: "height: " + props.playerMessage.appHeight + "px; width: " + props.playerMessage.appWidth + "px;",
                class: previewContainerClass.value
              }, [
                (openBlock(), createBlock("iframe", {
                  id: "iframe",
                  ref: "iframe",
                  key: unref(iframeUpdate),
                  class: "iframe-preview",
                  src: iframeSource,
                  style: { "position": "absolute", "top": "0", "left": "0" },
                  height: props.playerMessage.appHeight,
                  width: props.playerMessage.appWidth
                }, null, 8, ["height", "width"]))
              ], 6)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Messages/Partials/EditMessagesForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
