import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import ApiTokenManager from "./ApiTokenManager-70ca7297.mjs";
import { _ as _sfc_main$1 } from "./AppLayout-348f14a8.mjs";
import "@inertiajs/vue3";
import "./ActionMessage-d6a1993d.mjs";
import "./ActionSection-f2f6b035.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Checkbox-9c26f18f.mjs";
import "./ConfirmationModal-43a40030.mjs";
import "./Modal-23b70696.mjs";
import "./DangerButton-5ac62031.mjs";
import "./DialogModal-c762adec.mjs";
import "./FormSection-a1f03dbe.mjs";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./SectionBorder-bc7fc547.mjs";
import "./TextInput-e4b68561.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tokens: {
      type: Object,
      default: () => ({})
    },
    availablePermissions: {
      type: Array,
      default: () => []
    },
    apiRoutes: {
      type: Array,
      default: () => []
    },
    defaultPermissions: {
      type: Array,
      default: () => []
    },
    canReadTokens: {
      type: Boolean,
      default: false
    },
    canCreateTokens: {
      type: Boolean,
      default: false
    },
    canDeleteTokens: {
      type: Boolean,
      default: false
    },
    canEditTokens: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "API Manager" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> API Access &amp; Token Manager </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " API Access & Token Manager ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(ApiTokenManager, {
              tokens: __props.tokens,
              "available-permissions": __props.availablePermissions,
              "default-permissions": __props.defaultPermissions,
              "api-routes": __props.apiRoutes,
              "can-read-tokens": __props.canReadTokens,
              "can-create-tokens": __props.canCreateTokens,
              "can-delete-tokens": __props.canDeleteTokens,
              "can-edit-tokens": __props.canEditTokens
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(ApiTokenManager, {
                    tokens: __props.tokens,
                    "available-permissions": __props.availablePermissions,
                    "default-permissions": __props.defaultPermissions,
                    "api-routes": __props.apiRoutes,
                    "can-read-tokens": __props.canReadTokens,
                    "can-create-tokens": __props.canCreateTokens,
                    "can-delete-tokens": __props.canDeleteTokens,
                    "can-edit-tokens": __props.canEditTokens
                  }, null, 8, ["tokens", "available-permissions", "default-permissions", "api-routes", "can-read-tokens", "can-create-tokens", "can-delete-tokens", "can-edit-tokens"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
