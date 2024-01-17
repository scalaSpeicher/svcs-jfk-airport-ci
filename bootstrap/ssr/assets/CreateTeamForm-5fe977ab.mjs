import { mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$4 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$5 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$3 } from "./TextInput-e4b68561.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "CreateTeamForm",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: ""
    });
    const createTeam = () => {
      form.post(route("teams.store"), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onSubmitted: createTeam }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Team Details `);
          } else {
            return [
              createTextVNode(" Team Details ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create a new team to collaborate with others on projects. `);
          } else {
            return [
              createTextVNode(" Create a new team to collaborate with others on projects. ")
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Team Owner" }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center mt-2"${_scopeId}><img class="object-cover w-12 h-12 rounded-full"${ssrRenderAttr("src", _ctx.$page.props.auth.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.auth.user.email)}${_scopeId}><div class="ml-4 leading-tight"${_scopeId}><div class="text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.first_name)} ${ssrInterpolate(_ctx.$page.props.auth.user.last_name)}</div><div class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div></div></div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "name",
              value: "Team Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "block w-full mt-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "col-span-6" }, [
                createVNode(_sfc_main$2, { value: "Team Owner" }),
                createVNode("div", { class: "flex items-center mt-2" }, [
                  createVNode("img", {
                    class: "object-cover w-12 h-12 rounded-full",
                    src: _ctx.$page.props.auth.user.profile_photo_url,
                    alt: _ctx.$page.props.auth.user.email
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "ml-4 leading-tight" }, [
                    createVNode("div", { class: "text-gray-900" }, toDisplayString(_ctx.$page.props.auth.user.first_name) + " " + toDisplayString(_ctx.$page.props.auth.user.last_name), 1),
                    createVNode("div", { class: "text-sm text-gray-700" }, toDisplayString(_ctx.$page.props.auth.user.email), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$2, {
                  for: "name",
                  value: "Team Name"
                }),
                createVNode(_sfc_main$3, {
                  id: "name",
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  type: "text",
                  class: "block w-full mt-1"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$4, {
                  message: unref(form).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
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
              createVNode(_sfc_main$5, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Create ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Partials/CreateTeamForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
