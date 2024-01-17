import { mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./AppLayout-348f14a8.mjs";
import _sfc_main$2 from "./EditMessagesForm-44dacfe2.mjs";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./SectionTitle-592cad78.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./TextInput-e4b68561.mjs";
import "vue-multiselect";
/* empty css                                                                    */const _sfc_main = {
  __name: "EditMessages",
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
    canDeleteMessages: {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | ${ssrInterpolate(props.formMode === "add" ? "New Message" : "Modify Message(s)")}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | " + toDisplayString(props.formMode === "add" ? "New Message" : "Modify Message(s)"), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.canEditMessages) {
              _push2(`<div${_scopeId}><div class="w-full mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                "player-message": _ctx.$page.props.playerMessage,
                "message-components": _ctx.$page.props.messageComponents,
                template: _ctx.$page.props.template,
                "can-edit-messages": __props.canEditMessages,
                "can-refresh-messages": __props.canRefreshMessages,
                "can-add-messages": __props.canAddMessages,
                "form-mode": _ctx.$page.props.formMode,
                flash: _ctx.$page.props.flash
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
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
          } else {
            return [
              __props.canEditMessages ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "w-full mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$2, {
                    "player-message": _ctx.$page.props.playerMessage,
                    "message-components": _ctx.$page.props.messageComponents,
                    template: _ctx.$page.props.template,
                    "can-edit-messages": __props.canEditMessages,
                    "can-refresh-messages": __props.canRefreshMessages,
                    "can-add-messages": __props.canAddMessages,
                    "form-mode": _ctx.$page.props.formMode,
                    flash: _ctx.$page.props.flash
                  }, null, 8, ["player-message", "message-components", "template", "can-edit-messages", "can-refresh-messages", "can-add-messages", "form-mode", "flash"])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
              }, [
                createVNode("p", null, "You do not have permission to access this page."),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("planners.index", { _query: { today_only: 0, search_by: "open", active_only: 1, sort: "checkindesk" } }),
                  active: _ctx.route().current("planners.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Return to Main Page ")
                  ]),
                  _: 1
                }, 8, ["href", "active"])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Messages/EditMessages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
