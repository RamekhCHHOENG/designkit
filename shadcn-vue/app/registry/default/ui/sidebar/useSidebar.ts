import { createInjectionState } from "@vueuse/core";
import { useMediaQuery } from "@vueuse/core";
import { computed, ref, type Ref } from "vue";

export const SIDEBAR_COOKIE_NAME = "sidebar_state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export interface SidebarContextProps {
  state: ComputedRef<"expanded" | "collapsed">;
  open: Ref<boolean>;
  setOpen: (open: boolean) => void;
  openMobile: Ref<boolean>;
  setOpenMobile: (open: boolean) => void;
  isMobile: Ref<boolean>;
  toggleSidebar: () => void;
}

const [useProvideSidebar, useInjectSidebar] = createInjectionState(
  ({ defaultOpen = true, open: openProp }: { defaultOpen?: boolean; open?: Ref<boolean> }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const openMobile = ref(false);
    const _open = ref(defaultOpen);

    const open = computed({
      get: () => (openProp ? openProp.value : _open.value),
      set: (val: boolean) => {
        if (openProp) {
          openProp.value = val;
        } else {
          _open.value = val;
        }
      },
    });

    const state = computed(() => (open.value ? "expanded" : "collapsed"));

    function setOpen(val: boolean) {
      open.value = val;
    }

    function setOpenMobile(val: boolean) {
      openMobile.value = val;
    }

    function toggleSidebar() {
      if (isMobile.value) {
        openMobile.value = !openMobile.value;
      } else {
        open.value = !open.value;
      }
    }

    return {
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    };
  }
);

function useSidebar() {
  const sidebarState = useInjectSidebar();
  if (!sidebarState) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return sidebarState;
}

export { useProvideSidebar, useSidebar };
