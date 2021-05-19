import { onUnmounted, Ref } from "vue";

export default function usePopoverInstance(): {
  initialiseAnnotationPopover: (currentSelectedTextRange: Range) => void;
  hideAnnotationPopoverInstance: () => void;
  resetSelectionSpanElement: (inputSpecificTextAnnotation: Ref<string>) => void;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let popoverInstance: any;
  let selectedPopoverSpan: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bootstrap = (window as Window & typeof globalThis & { bootstrap: any })
    .bootstrap;

  const initialiseAnnotationPopover = (currentSelectedTextRange: Range) => {
    hideAnnotationPopoverInstance();
    if (currentSelectedTextRange) {
      selectedPopoverSpan = document.createElement("span");
      selectedPopoverSpan.id = "selected-text-create-annotation";
      selectedPopoverSpan.appendChild(
        currentSelectedTextRange.extractContents()
      );
      currentSelectedTextRange.insertNode(selectedPopoverSpan);
    }
    const allowList = { ...bootstrap.Tooltip.Default.allowList, input: ["*"] };
    popoverInstance = new bootstrap.Popover(selectedPopoverSpan, {
      allowList,
      title: "Specific text annotation",
      html: true,
      sanitize: false,
      container: "body",
      toggle: "popover",
      placement: "top",
      trigger: "manual",
      content() {
        return document.querySelector("#PopoverContent")?.innerHTML;
      },
    });
    if (popoverInstance) {
      popoverInstance.show();
    }
  };

  const hideAnnotationPopoverInstance = () => {
    if (popoverInstance) {
      popoverInstance.hide();
    }
  };

  const resetSelectionSpanElement = (
    inputSpecificTextAnnotation: Ref<string>
  ) => {
    if (
      selectedPopoverSpan &&
      selectedPopoverSpan.parentNode &&
      selectedPopoverSpan.innerHTML
    ) {
      inputSpecificTextAnnotation.value = "";
      selectedPopoverSpan.outerHTML = selectedPopoverSpan.innerHTML;
    }
  };

  onUnmounted(() => {
    popoverInstance?.dispose();
  });

  return {
    initialiseAnnotationPopover,
    hideAnnotationPopoverInstance,
    resetSelectionSpanElement,
  };
}
