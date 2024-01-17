import { mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./AppLayout-348f14a8.mjs";
import _sfc_main$2 from "./EditCounterForm-e89cd3d5.mjs";
import { S as SectionBorder } from "./SectionBorder-bc7fc547.mjs";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./ActionMessage-d6a1993d.mjs";
import "./FormSection-a1f03dbe.mjs";
import "./SectionTitle-592cad78.mjs";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./TextInput-e4b68561.mjs";
const _sfc_main = {
  __name: "EditCounter",
  __ssrInlineRender: true,
  props: {
    counter: {
      type: Object,
      default: () => ({})
    },
    canEditCounters: {
      type: Boolean,
      default: () => false
    },
    airlinesData: {
      type: Object,
      default: () => ({})
    },
    formMode: {
      type: String,
      default: () => ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | ${ssrInterpolate(props.formMode === "editCounter" ? "Modify " : "Add ")}Counter </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | " + toDisplayString(props.formMode === "editCounter" ? "Modify " : "Add ") + "Counter ", 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.canEditCounters) {
              _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                counter: _ctx.$page.props.counter,
                "airlines-data": _ctx.$page.props.airlinesData,
                "form-mode": _ctx.$page.props.formMode
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(SectionBorder, null, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}><p${_scopeId}>You do not have permission to access this page.</p>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                href: _ctx.route("counters.index"),
                active: _ctx.route().current("counters.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Return to Counters List Page `);
                  } else {
                    return [
                      createTextVNode(" Return to Counters List Page ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              __props.canEditCounters ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$2, {
                    counter: _ctx.$page.props.counter,
                    "airlines-data": _ctx.$page.props.airlinesData,
                    "form-mode": _ctx.$page.props.formMode
                  }, null, 8, ["counter", "airlines-data", "form-mode"]),
                  createVNode(SectionBorder)
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
              }, [
                createVNode("p", null, "You do not have permission to access this page."),
                createVNode(_sfc_main$3, {
                  href: _ctx.route("counters.index"),
                  active: _ctx.route().current("counters.index")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Return to Counters List Page ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Counters/EditCounter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
