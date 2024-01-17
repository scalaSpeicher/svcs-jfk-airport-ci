import { ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
const _imports_0 = "/build/assets/T4_logo_black-b3675e2d.png";
const _sfc_main = {
  __name: "AuthenticationCardLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="prose strong justify-center"><h1>Welcome to AirPortal</h1></div><br><div><img width="300"${ssrRenderAttr("src", _imports_0)}></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AuthenticationCardLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
