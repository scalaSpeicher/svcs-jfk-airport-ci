import { mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$3 } from "./AppLayout-348f14a8.mjs";
import _sfc_main$2 from "./EditTemplatesForm-d19dbf9a.mjs";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-e4b68561.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./DangerButton-5ac62031.mjs";
import "./FormSectionWide-f115e870.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./DialogModal-c762adec.mjs";
import "./Modal-23b70696.mjs";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./ToggleButton-5ebee51d.mjs";
import "@vueform/toggle";
const _sfc_main = {
  __name: "EditTemplates",
  __ssrInlineRender: true,
  props: {
    template: {
      type: Object,
      default: () => ({})
    },
    templates: {
      type: Object,
      default: () => ({})
    },
    templateField: {
      type: Object,
      default: () => ({})
    },
    templateFields: {
      type: Object,
      default: () => ({})
    },
    canEditTemplates: {
      type: Boolean,
      default: () => false
    },
    canDeleteTemplates: {
      type: Boolean,
      default: () => false
    },
    canAddTemplates: {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "AirPortal JFK Terminal 4" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> AirPortal JFK Terminal 4 | ${ssrInterpolate(props.formMode === "add" ? "New Template" : "Modify Template")}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " AirPortal JFK Terminal 4 | " + toDisplayString(props.formMode === "add" ? "New Template" : "Modify Template"), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.canEditTemplates) {
              _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                templates: _ctx.$page.props.templates,
                template: _ctx.$page.props.template,
                "template-fields": _ctx.$page.props.templateFields,
                "template-field": _ctx.$page.props.templateField,
                "can-edit-templates": __props.canEditTemplates,
                "can-delete-templates": __props.canDeleteTemplates,
                "can-add-templates": __props.canAddTemplates,
                "form-mode": _ctx.$page.props.formMode
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
                    _push3(` Return to Planners List Page `);
                  } else {
                    return [
                      createTextVNode(" Return to Planners List Page ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              __props.canEditTemplates ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$2, {
                    templates: _ctx.$page.props.templates,
                    template: _ctx.$page.props.template,
                    "template-fields": _ctx.$page.props.templateFields,
                    "template-field": _ctx.$page.props.templateField,
                    "can-edit-templates": __props.canEditTemplates,
                    "can-delete-templates": __props.canDeleteTemplates,
                    "can-add-templates": __props.canAddTemplates,
                    "form-mode": _ctx.$page.props.formMode
                  }, null, 8, ["templates", "template", "template-fields", "template-field", "can-edit-templates", "can-delete-templates", "can-add-templates", "form-mode"])
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
                    createTextVNode(" Return to Planners List Page ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Templates/EditTemplates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
