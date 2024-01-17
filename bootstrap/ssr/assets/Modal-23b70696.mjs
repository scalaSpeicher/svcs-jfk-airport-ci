import { watch, onMounted, onUnmounted, computed, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    maxWidth: {
      type: String,
      default: () => "2xl"
    },
    setHeight: {
      type: Number,
      default: () => 0
    },
    setWidth: {
      type: Number,
      default: () => 0
    },
    closeable: {
      type: Boolean,
      default: () => true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    watch(() => props.show, () => {
      if (props.show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = null;
      }
    });
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        "sm": "sm:max-w-sm",
        "md": "sm:max-w-md",
        "lg": "sm:max-w-lg",
        "xl": "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "light": "light-modal-container",
        "regular": "regular-modal-container",
        "plus": "super-modal-container",
        "super": "super-plus-modal-container",
        "ultra": "ultra-modal-container",
        "max": "max-modal-container",
        "full": "sm:max-w-full",
        "screen": "sm:max-w-screen"
      }[props.maxWidth];
    });
    const setStyle = computed(() => {
      let style = "";
      if (props.setHeight !== 0) {
        style += `height: ${props.setHeight}px !important;`;
      }
      if (props.setWidth !== 0) {
        style += `width: ${props.setWidth}px !important;`;
      }
      return style;
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div style="${ssrRenderStyle([
          __props.show ? null : { display: "none" },
          unref(setStyle)
        ])}" class="${ssrRenderClass([unref(maxWidthClass), "mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"])}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
