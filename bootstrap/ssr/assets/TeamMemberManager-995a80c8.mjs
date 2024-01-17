import { ref, resolveDirective, withCtx, createTextVNode, unref, createVNode, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, mergeProps, vShow, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrGetDirectiveProps } from "vue/server-renderer";
import { useForm, Link, router, usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./ActionMessage-d6a1993d.mjs";
import { _ as _sfc_main$6 } from "./ActionSection-f2f6b035.mjs";
import { _ as _sfc_main$9 } from "./ConfirmationModal-43a40030.mjs";
import { _ as _sfc_main$a } from "./DangerButton-5ac62031.mjs";
import { _ as _sfc_main$7 } from "./DialogModal-c762adec.mjs";
import { _ as _sfc_main$1 } from "./FormSection-a1f03dbe.mjs";
import { _ as _sfc_main$3 } from "./InputError-32c0dc48.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-47ca9f72.mjs";
import { _ as _sfc_main$5 } from "./PrimaryButton-b8af6d50.mjs";
import { _ as _sfc_main$8 } from "./SecondaryButton-8e76ef1f.mjs";
import { S as SectionBorder } from "./SectionBorder-bc7fc547.mjs";
import "./SectionTitle-592cad78.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./Modal-23b70696.mjs";
const _sfc_main = {
  __name: "TeamMemberManager",
  __ssrInlineRender: true,
  props: {
    team: {
      type: Object,
      default: () => ({})
    },
    usersOptions: {
      type: Array,
      default: () => []
    },
    selectedEmail: {
      type: String,
      default: () => ""
    },
    permissions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const addTeamMemberForm = useForm({
      email: props.selectedEmail,
      role: null
    });
    const updateRoleForm = useForm({
      role: null
    });
    const leaveTeamForm = useForm({});
    const removeTeamMemberForm = useForm({});
    const currentlyManagingRole = ref(false);
    const managingRoleFor = ref(null);
    const confirmingLeavingTeam = ref(false);
    const teamMemberBeingRemoved = ref(null);
    const addTeamMember = () => {
      addTeamMemberForm.post(route("team-members.store", [props.team, managingRoleFor.value]), {
        errorBag: "addTeamMember",
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => addTeamMemberForm.reset()
      });
    };
    const cancelTeamInvitation = (invitation) => {
      router.delete(route("team-invitations.destroy", invitation), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true
      });
    };
    const manageRole = (teamMember) => {
      managingRoleFor.value = teamMember;
      updateRoleForm.role = teamMember.role;
      updateRoleForm.name = teamMember.name;
      updateRoleForm.email = teamMember.email;
      currentlyManagingRole.value = true;
    };
    const updateRole = () => {
      updateRoleForm.put(route("team-members.update", [props.team.id, managingRoleFor.value.user_id, updateRoleForm.role]), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => currentlyManagingRole.value = false
      });
    };
    const confirmLeavingTeam = () => {
      confirmingLeavingTeam.value = true;
    };
    const manageRoleSelectedRole = (role) => {
      updateRoleForm.role = role.key;
    };
    const leaveTeam = () => {
      leaveTeamForm.delete(route("team-members.destroy", [props.team, usePage().props.auth.user]));
    };
    const confirmTeamMemberRemoval = (teamMember) => {
      teamMemberBeingRemoved.value = teamMember;
    };
    const removeTeamMember = () => {
      removeTeamMemberForm.delete(route("team-members.destroy", [props.team, teamMemberBeingRemoved.value.user_id]), {
        errorBag: "removeTeamMember",
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => teamMemberBeingRemoved.value = null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (_ctx.$page.props.userData.canEditTeams) {
        _push(`<div>`);
        _push(ssrRenderComponent(SectionBorder, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, { onSubmitted: addTeamMember }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add Team Member `);
            } else {
              return [
                createTextVNode(" Add Team Member ")
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add a new team member to your team, allowing them to collaborate with you. `);
            } else {
              return [
                createTextVNode(" Add a new team member to your team, allowing them to collaborate with you. ")
              ];
            }
          }),
          form: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="col-span-6"${_scopeId}><div class="max-w-xl text-sm text-gray-600"${_scopeId}> Please provide the email address of the person you would like to add to this team. </div></div><div class="col-span-6 sm:col-span-4 mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                for: "email",
                value: "Email",
                style: { "min-width": "300px" }
              }, null, _parent2, _scopeId));
              _push2(`<select id="email" autocomplete="Email" style="${ssrRenderStyle({ "min-width": "300px", "cursor": "pointer" })}" required class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.usersOptions, (user) => {
                _push2(`<option${ssrRenderAttr("name", user.email)}${ssrRenderAttr("value", user.email)}${_scopeId}>${ssrInterpolate(user.email + " (" + user.first_name + " " + user.last_name + ")")}</option>`);
              });
              _push2(`<!--]--></select></div>`);
              if (_ctx.$page.props.availableRoles.length > 0) {
                _push2(`<div class="col-span-6 lg:col-span-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  for: "roles",
                  value: "Role"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(addTeamMemberForm).errors.role,
                  class: "mt-2"
                }, null, _parent2, _scopeId));
                _push2(`<div class="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer"${_scopeId}><!--[-->`);
                ssrRenderList(_ctx.$page.props.availableRoles, (role, i) => {
                  _push2(`<button type="button" class="${ssrRenderClass([{ "border-t border-gray-200 focus:border-none rounded-t-none": i > 0, "rounded-b-none": i != Object.keys(_ctx.$page.props.availableRoles).length - 1 }, "relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"])}"${_scopeId}><div class="${ssrRenderClass({ "opacity-50": unref(addTeamMemberForm).role && unref(addTeamMemberForm).role != role.key })}"${_scopeId}><div class="flex items-center"${_scopeId}><div class="${ssrRenderClass([{ "font-semibold": unref(addTeamMemberForm).role == role.key }, "text-sm text-gray-600"])}"${_scopeId}>${ssrInterpolate(role.name)}</div>`);
                  if (unref(addTeamMemberForm).role == role.key) {
                    _push2(`<svg class="ml-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="mt-2 text-xs text-gray-600 text-left"${_scopeId}>${ssrInterpolate(role.description)}</div></div></button>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "col-span-6" }, [
                  createVNode("div", { class: "max-w-xl text-sm text-gray-600" }, " Please provide the email address of the person you would like to add to this team. ")
                ]),
                createVNode("div", { class: "col-span-6 sm:col-span-4 mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: "Email",
                    style: { "min-width": "300px" }
                  }),
                  withDirectives(createVNode("select", {
                    id: "email",
                    "onUpdate:modelValue": ($event) => unref(addTeamMemberForm).email = $event,
                    autocomplete: "Email",
                    style: { "min-width": "300px", "cursor": "pointer" },
                    required: "",
                    class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.usersOptions, (user) => {
                      return openBlock(), createBlock("option", {
                        key: user.id,
                        name: user.email,
                        value: user.email
                      }, toDisplayString(user.email + " (" + user.first_name + " " + user.last_name + ")"), 9, ["name", "value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(addTeamMemberForm).email]
                  ])
                ]),
                _ctx.$page.props.availableRoles.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "col-span-6 lg:col-span-4"
                }, [
                  createVNode(_sfc_main$2, {
                    for: "roles",
                    value: "Role"
                  }),
                  createVNode(_sfc_main$3, {
                    message: unref(addTeamMemberForm).errors.role,
                    class: "mt-2"
                  }, null, 8, ["message"]),
                  createVNode("div", { class: "relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.availableRoles, (role, i) => {
                      return openBlock(), createBlock("button", {
                        key: role.key,
                        type: "button",
                        class: ["relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500", { "border-t border-gray-200 focus:border-none rounded-t-none": i > 0, "rounded-b-none": i != Object.keys(_ctx.$page.props.availableRoles).length - 1 }],
                        onClick: ($event) => unref(addTeamMemberForm).role = role.key
                      }, [
                        createVNode("div", {
                          class: { "opacity-50": unref(addTeamMemberForm).role && unref(addTeamMemberForm).role != role.key }
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", {
                              class: ["text-sm text-gray-600", { "font-semibold": unref(addTeamMemberForm).role == role.key }]
                            }, toDisplayString(role.name), 3),
                            unref(addTeamMemberForm).role == role.key ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "ml-2 h-5 w-5 text-green-400",
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mt-2 text-xs text-gray-600 text-left" }, toDisplayString(role.description), 1)
                        ], 2)
                      ], 10, ["onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$4, {
                on: unref(addTeamMemberForm).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Added. `);
                  } else {
                    return [
                      createTextVNode(" Added. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$5, {
                class: { "opacity-25": unref(addTeamMemberForm).processing },
                disabled: unref(addTeamMemberForm).processing
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Add `);
                  } else {
                    return [
                      createTextVNode(" Add ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$4, {
                  on: unref(addTeamMemberForm).recentlySuccessful,
                  class: "mr-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Added. ")
                  ]),
                  _: 1
                }, 8, ["on"]),
                createVNode(_sfc_main$5, {
                  class: { "opacity-25": unref(addTeamMemberForm).processing },
                  disabled: unref(addTeamMemberForm).processing
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Add ")
                  ]),
                  _: 1
                }, 8, ["class", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.team.team_invitations.length > 0 && _ctx.$page.props.userData.canEditTeams) {
        _push(`<div>`);
        _push(ssrRenderComponent(SectionBorder, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, { class: "mt-10 sm:mt-0" }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Pending Team Invitations `);
            } else {
              return [
                createTextVNode(" Pending Team Invitations ")
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation. `);
            } else {
              return [
                createTextVNode(" These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation. ")
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.team.team_invitations, (invitation) => {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="text-gray-600"${_scopeId}>${ssrInterpolate(invitation.email)}</div><div class="flex items-center"${_scopeId}>`);
                if (_ctx.$page.props.userData.canEditTeams) {
                  _push2(`<button class="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"${_scopeId}> Cancel </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.team.team_invitations, (invitation) => {
                    return openBlock(), createBlock("div", {
                      key: invitation.id,
                      class: "flex items-center justify-between"
                    }, [
                      createVNode("div", { class: "text-gray-600" }, toDisplayString(invitation.email), 1),
                      createVNode("div", { class: "flex items-center" }, [
                        _ctx.$page.props.userData.canEditTeams ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "cursor-pointer ml-6 text-sm text-red-500 focus:outline-none",
                          onClick: ($event) => cancelTeamInvitation(invitation)
                        }, " Cancel ", 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.team.memberships.length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(SectionBorder, null, null, _parent));
        _push(ssrRenderComponent(_sfc_main$6, { class: "mt-10 sm:mt-0" }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Team Members `);
            } else {
              return [
                createTextVNode(" Team Members ")
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` All of the people that are part of this team. `);
            } else {
              return [
                createTextVNode(" All of the people that are part of this team. ")
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.team.memberships, (user) => {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><img class="w-8 h-8 rounded-full"${ssrRenderAttr("src", user.profile_photo_url)}${ssrRenderAttr("alt", user.email)}${_scopeId}><div class="ml-4"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), mergeProps({
                  style: { "cursor": "pointer" },
                  href: _ctx.route("users.index", { _query: { search: user.email } })
                }, ssrGetDirectiveProps(_ctx, _directive_tippy, "Click to view user")), {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(user.name)} (${ssrInterpolate(user.email)}) `);
                    } else {
                      return [
                        createTextVNode(toDisplayString(user.name) + " (" + toDisplayString(user.email) + ") ", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div><div class="flex items-center"${_scopeId}>`);
                if (_ctx.$page.props.availableRoles) {
                  _push2(`<button style="${ssrRenderStyle(_ctx.$page.props.userData.canEditTeams && user.role != "owner" ? null : { display: "none" })}" class="ml-2 text-sm text-gray-400 no-underline hover:text-gray-600 pointer"${_scopeId}> Edit </button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (_ctx.$page.props.auth.user.id === user.user_id) {
                  _push2(`<button class="cursor-pointer ml-6 text-sm text-red-500"${_scopeId}> Leave </button>`);
                } else if (_ctx.$page.props.userData.canEditTeams) {
                  _push2(`<button style="${ssrRenderStyle(_ctx.$page.props.userData.canEditTeams && user.role != "owner" ? null : { display: "none" })}" class="cursor-pointer ml-6 text-sm text-red-500"${_scopeId}> Remove </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.team.memberships, (user) => {
                    return openBlock(), createBlock("div", {
                      key: user.id,
                      class: "flex items-center justify-between"
                    }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("img", {
                          class: "w-8 h-8 rounded-full",
                          src: user.profile_photo_url,
                          alt: user.email
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "ml-4" }, [
                          withDirectives((openBlock(), createBlock(unref(Link), {
                            style: { "cursor": "pointer" },
                            href: _ctx.route("users.index", { _query: { search: user.email } })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(user.name) + " (" + toDisplayString(user.email) + ") ", 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])), [
                            [_directive_tippy, "Click to view user"]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        _ctx.$page.props.availableRoles ? withDirectives((openBlock(), createBlock("button", {
                          key: 0,
                          class: "ml-2 text-sm text-gray-400 no-underline hover:text-gray-600 pointer",
                          onClick: ($event) => manageRole(user)
                        }, " Edit ", 8, ["onClick"])), [
                          [vShow, _ctx.$page.props.userData.canEditTeams && user.role != "owner"]
                        ]) : createCommentVNode("", true),
                        _ctx.$page.props.auth.user.id === user.user_id ? (openBlock(), createBlock("button", {
                          key: 1,
                          class: "cursor-pointer ml-6 text-sm text-red-500",
                          onClick: confirmLeavingTeam
                        }, " Leave ")) : _ctx.$page.props.userData.canEditTeams ? withDirectives((openBlock(), createBlock("button", {
                          key: 2,
                          class: "cursor-pointer ml-6 text-sm text-red-500",
                          onClick: ($event) => confirmTeamMemberRemoval(user)
                        }, " Remove ", 8, ["onClick"])), [
                          [vShow, _ctx.$page.props.userData.canEditTeams && user.role != "owner"]
                        ]) : createCommentVNode("", true)
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$7, {
        show: currentlyManagingRole.value,
        onClose: ($event) => currentlyManagingRole.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Manage Role | ${ssrInterpolate(unref(updateRoleForm).name)} (${ssrInterpolate(unref(updateRoleForm).email)}) `);
          } else {
            return [
              createTextVNode(" Manage Role | " + toDisplayString(unref(updateRoleForm).name) + " (" + toDisplayString(unref(updateRoleForm).email) + ") ", 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (managingRoleFor.value) {
              _push2(`<div${_scopeId}><div class="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.$page.props.availableRoles, (role, i) => {
                _push2(`<button type="button" class="${ssrRenderClass([{ "border-t border-gray-200 focus:border-none rounded-t-none": i > 0, "rounded-b-none": i !== Object.keys(_ctx.$page.props.availableRoles).length - 1 }, "relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"])}"${_scopeId}><div class="${ssrRenderClass({ "opacity-50": unref(updateRoleForm).role && unref(updateRoleForm).role !== role.key })}"${_scopeId}><div class="flex items-center"${_scopeId}><div class="${ssrRenderClass([{ "font-semibold": unref(updateRoleForm).role === role.key }, "text-sm text-gray-600"])}"${_scopeId}>${ssrInterpolate(role.name)}</div>`);
                if (unref(updateRoleForm).role == role.key) {
                  _push2(`<svg class="ml-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="mt-2 text-xs text-gray-600"${_scopeId}>${ssrInterpolate(role.description)}</div></div></button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              managingRoleFor.value ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.availableRoles, (role, i) => {
                    return openBlock(), createBlock("button", {
                      key: role.key,
                      type: "button",
                      class: ["relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500", { "border-t border-gray-200 focus:border-none rounded-t-none": i > 0, "rounded-b-none": i !== Object.keys(_ctx.$page.props.availableRoles).length - 1 }],
                      onClick: ($event) => manageRoleSelectedRole(role)
                    }, [
                      createVNode("div", {
                        class: { "opacity-50": unref(updateRoleForm).role && unref(updateRoleForm).role !== role.key }
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", {
                            class: ["text-sm text-gray-600", { "font-semibold": unref(updateRoleForm).role === role.key }]
                          }, toDisplayString(role.name), 3),
                          unref(updateRoleForm).role == role.key ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "ml-2 h-5 w-5 text-green-400",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mt-2 text-xs text-gray-600" }, toDisplayString(role.description), 1)
                      ], 2)
                    ], 10, ["onClick"]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, {
              onClick: ($event) => currentlyManagingRole.value = false
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
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: ["ml-3", { "opacity-25": unref(updateRoleForm).processing }],
              disabled: unref(updateRoleForm).processing,
              onClick: updateRole
            }, {
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
              createVNode(_sfc_main$8, {
                onClick: ($event) => currentlyManagingRole.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$5, {
                class: ["ml-3", { "opacity-25": unref(updateRoleForm).processing }],
                disabled: unref(updateRoleForm).processing,
                onClick: updateRole
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        show: confirmingLeavingTeam.value,
        onClose: ($event) => confirmingLeavingTeam.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Leave Team `);
          } else {
            return [
              createTextVNode(" Leave Team ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Are you sure you would like to leave this team? `);
          } else {
            return [
              createTextVNode(" Are you sure you would like to leave this team? ")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, {
              onClick: ($event) => confirmingLeavingTeam.value = false
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              class: ["ml-3", { "opacity-25": unref(leaveTeamForm).processing }],
              disabled: unref(leaveTeamForm).processing,
              onClick: leaveTeam
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Leave `);
                } else {
                  return [
                    createTextVNode(" Leave ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8, {
                onClick: ($event) => confirmingLeavingTeam.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$a, {
                class: ["ml-3", { "opacity-25": unref(leaveTeamForm).processing }],
                disabled: unref(leaveTeamForm).processing,
                onClick: leaveTeam
              }, {
                default: withCtx(() => [
                  createTextVNode(" Leave ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, {
        show: teamMemberBeingRemoved.value != null,
        onClose: ($event) => teamMemberBeingRemoved.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Remove Team Member `);
          } else {
            return [
              createTextVNode(" Remove Team Member ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Are you sure you would like to remove this person from the team? `);
          } else {
            return [
              createTextVNode(" Are you sure you would like to remove this person from the team? ")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, {
              onClick: ($event) => teamMemberBeingRemoved.value = null
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              class: ["ml-3", { "opacity-25": unref(removeTeamMemberForm).processing }],
              disabled: unref(removeTeamMemberForm).processing,
              onClick: removeTeamMember
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Remove `);
                } else {
                  return [
                    createTextVNode(" Remove ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8, {
                onClick: ($event) => teamMemberBeingRemoved.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$a, {
                class: ["ml-3", { "opacity-25": unref(removeTeamMemberForm).processing }],
                disabled: unref(removeTeamMemberForm).processing,
                onClick: removeTeamMember
              }, {
                default: withCtx(() => [
                  createTextVNode(" Remove ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Teams/Partials/TeamMemberManager.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
