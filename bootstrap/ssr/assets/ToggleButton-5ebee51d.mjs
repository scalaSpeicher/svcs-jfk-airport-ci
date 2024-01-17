import Toggle from "@vueform/toggle";
import { resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const default_css_vue_type_style_index_0_src_true_lang = "";
const _sfc_main = {
  components: {
    Toggle
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Toggle = resolveComponent("Toggle");
  _push(ssrRenderComponent(_component_Toggle, mergeProps({
    "on-label": "On",
    "off-label": "Off",
    labelledby: "toggle-label",
    describedby: "toggle-description",
    "false-value": "Closed",
    "true-value": "Open",
    classes: {
      container: "focus:ring focus:ring-white-500 focus:ring-opacity-30"
    }
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ToggleButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ToggleButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ToggleButton as T
};
