import { unref, useSSRContext, computed, mergeProps, withCtx, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main$2 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    nextIcon: {
      type: Boolean,
      default: () => true
    },
    previousIcon: {
      type: Boolean,
      default: () => true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.links && __props.links.length > 3) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap -mb-1"><!--[-->`);
        ssrRenderList(__props.links, (link, key) => {
          _push(`<!--[-->`);
          if (link.url === null) {
            _push(`<div class="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded">${link.label}</div>`);
          } else {
            _push(ssrRenderComponent(unref(Link), {
              key: `link-${key}`,
              class: ["mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-gray-50 border focus:border-indigo-500 rounded", { "bg-gray-200": link.active }],
              href: link.url
            }, null, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Sort",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    attribute: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const sortLink = computed(() => {
      let url = new URL(document.location);
      let sortValue = url.searchParams.get("sort");
      if (sortValue == props.attribute) {
        url.searchParams.set("sort", "-" + props.attribute);
        return url.href;
      } else if (sortValue === "-" + props.attribute) {
        url.searchParams.set("sort", props.attribute);
        return url.href;
      } else {
        url.searchParams.set("sort", props.attribute);
        return url.href;
      }
    });
    const upFill = computed(() => {
      let url = new URL(document.location);
      let sortValue = url.searchParams.get("sort");
      if (sortValue == props.attribute) {
        return "black";
      } else {
        return "lightgray";
      }
    });
    const downFill = computed(() => {
      let url = new URL(document.location);
      let sortValue = url.searchParams.get("sort");
      if (sortValue === "-" + props.attribute) {
        return "black";
      } else {
        return "lightgray";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(sortLink),
        class: "no-underline hover:underline text-cyan-600 dark:text-cyan-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col"><svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15" fill="none"><path d="M7.5 3L15 11H0L7.5 3Z"${ssrRenderAttr("fill", unref(upFill))}></path></svg><svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15" fill="none"><path d="M7.49988 12L-0.00012207 4L14.9999 4L7.49988 12Z"${ssrRenderAttr("fill", unref(downFill))}></path></svg></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sort.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ItemsPerPage",
  __ssrInlineRender: true,
  setup(__props) {
    let page = document.location.pathname.substring(1);
    new URL(location.href).searchParams.get("itemsPerPage");
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts.pop().split(";").shift();
    };
    let scalaCookies = getCookie("scalaCookies");
    if (scalaCookies != null) {
      scalaCookies = JSON.parse(getCookie("scalaCookies"));
    }
    if (scalaCookies != null && scalaCookies.itemsPerPage != null) {
      let pageItems = scalaCookies.itemsPerPage;
      for (const [key, value] of Object.entries(pageItems)) {
        if (key == page) {
          break;
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><select class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"><option value="10"> 10 </option><option value="20"> 20 </option><option value="50"> 50 </option><option value="100"> 100 </option><option value="All"> All </option></select><p><small>Items per page</small></p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ItemsPerPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  _sfc_main$2 as b
};
