import { mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-348f14a8.mjs";
import _sfc_main$4 from "./DeleteTeamForm-b1400756.mjs";
import { S as SectionBorder } from "./SectionBorder-bc7fc547.mjs";
import _sfc_main$3 from "./TeamMemberManager-995a80c8.mjs";
import _sfc_main$2 from "./UpdateTeamNameForm-be213812.mjs";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./ActionSection-f2f6b035.mjs";
import "./SectionTitle-592cad78.mjs";
import "./ConfirmationModal-43a40030.mjs";
import "./Modal-23b70696.mjs";
import "./DangerButton-5ac62031.mjs";
import "./SecondaryButton-8e76ef1f.mjs";
import "./ActionMessage-d6a1993d.mjs";
import "./DialogModal-c762adec.mjs";
import "./FormSection-a1f03dbe.mjs";
import "./InputError-32c0dc48.mjs";
import "./InputLabel-47ca9f72.mjs";
import "./PrimaryButton-b8af6d50.mjs";
import "./TextInput-e4b68561.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    team: {
      type: Object,
      default: () => ({})
    },
    availableRoles: {
      type: Object,
      default: () => ({})
    },
    permissions: {
      type: Object,
      default: () => ({})
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Team Settings" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Team Settings </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Team Settings ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (_ctx.$page.props.flash.message) {
              _push2(`<div id="alertnotification" class="flex justify-end items-center bg-indigo-500 text-white text-sm font-bold px-4 py-3" style="${ssrRenderStyle({ "height": "40px" })}" role="alert"${_scopeId}><svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"${_scopeId}></path></svg><p${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.message)}</p><span class="px-4 py-3 justify-end"${_scopeId}><svg class="fill-current h-6 w-6 text-indigo-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"${_scopeId}><title${_scopeId}>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"${_scopeId}></path></svg></span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.usersWithTeam) {
              _push2(`<div class="justify-end"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.usersWithTeam, (user) => {
                _push2(`<div${_scopeId}><p class="flex justify-end"${_scopeId}> ID: ${ssrInterpolate(user.id)}, Name: ${ssrInterpolate(user.first_name)} ${ssrInterpolate(user.last_name)}</p></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              team: __props.team,
              permissions: __props.permissions
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              class: "mt-10 sm:mt-0",
              team: __props.team,
              "available-roles": __props.availableRoles,
              "user-permissions": __props.permissions
            }, null, _parent2, _scopeId));
            if (__props.permissions.canDeleteTeam && !__props.team.personal_team) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(SectionBorder, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, {
                class: "mt-10 sm:mt-0",
                team: __props.team
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                _ctx.$page.props.flash.message ? (openBlock(), createBlock("div", {
                  key: 0,
                  id: "alertnotification",
                  class: "flex justify-end items-center bg-indigo-500 text-white text-sm font-bold px-4 py-3",
                  style: { "height": "40px" },
                  role: "alert"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "fill-current w-4 h-4 mr-2",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", { d: "M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" })
                  ])),
                  createVNode("p", null, toDisplayString(_ctx.$page.props.flash.message), 1),
                  createVNode("span", { class: "px-4 py-3 justify-end" }, [
                    (openBlock(), createBlock("svg", {
                      class: "fill-current h-6 w-6 text-indigo-500",
                      role: "button",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      onClick: ($event) => _ctx.closeAlert()
                    }, [
                      createVNode("title", null, "Close"),
                      createVNode("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
                    ], 8, ["onClick"]))
                  ])
                ])) : createCommentVNode("", true),
                _ctx.$page.props.usersWithTeam ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "justify-end"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.usersWithTeam, (user) => {
                    return openBlock(), createBlock("div", {
                      key: user.id
                    }, [
                      createVNode("p", { class: "flex justify-end" }, " ID: " + toDisplayString(user.id) + ", Name: " + toDisplayString(user.first_name) + " " + toDisplayString(user.last_name), 1)
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$2, {
                    team: __props.team,
                    permissions: __props.permissions
                  }, null, 8, ["team", "permissions"]),
                  createVNode(_sfc_main$3, {
                    class: "mt-10 sm:mt-0",
                    team: __props.team,
                    "available-roles": __props.availableRoles,
                    "user-permissions": __props.permissions
                  }, null, 8, ["team", "available-roles", "user-permissions"]),
                  __props.permissions.canDeleteTeam && !__props.team.personal_team ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(SectionBorder),
                    createVNode(_sfc_main$4, {
                      class: "mt-10 sm:mt-0",
                      team: __props.team
                    }, null, 8, ["team"])
                  ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
