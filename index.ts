import { Ref, ref, watch, DirectiveBinding } from 'vue';

const isTouchEvent = (e: TouchEvent | DragEvent): e is TouchEvent =>
  !!(e as TouchEvent).touches;

const beforeEventHandler = (e: TouchEvent | DragEvent) => {
  if (isTouchEvent(e)) {
    return;
  }

  // get rid of the ghost image of the component
  const img = new Image();
  img.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  e.dataTransfer?.setDragImage(img, 0, 0);
};

const dragStartGeneric = (
  e: TouchEvent | DragEvent,
  dragYOffset: Ref<number>,
  dragYStart: Ref<number>,
  dragXOffset: Ref<number>,
  dragXStart: Ref<number>,
  clientY: number,
  clientX: number,
  customDragStart?: CustomGeneric
) => {
  if (customDragStart) {
    customDragStart(
      e,
      dragYOffset,
      dragYStart,
      dragXOffset,
      dragXStart,
      clientY,
      clientX
    );

    return;
  } else {
    dragYStart.value = clientY;
    dragXStart.value = clientX;
  }
};

const dragMoveGeneric = (
  e: TouchEvent | DragEvent,
  dragYOffset: Ref<number>,
  dragYStart: Ref<number>,
  dragXOffset: Ref<number>,
  dragXStart: Ref<number>,
  clientY: number,
  clientX: number,
  customDragMove?: CustomGeneric
) => {
  /**
   * When letting go of the mouse button, clientY and clientX both become
   * 0 for some reason, at least in chromium-based browsers.
   */
  if (clientY === 0 && clientX === 0) {
    return;
  } else {
    if (customDragMove) {
      customDragMove(
        e,
        dragYOffset,
        dragYStart,
        dragXOffset,
        dragXStart,
        clientY,
        clientX
      );

      return;
    } else {
      dragYOffset.value = dragYStart.value - clientY;
      dragXOffset.value = dragXStart.value - clientX;
    }
  }
};

const dragEndGeneric = (
  e: TouchEvent | DragEvent,
  dragYOffset: Ref<number>,
  dragYStart: Ref<number>,
  dragXOffset: Ref<number>,
  dragXStart: Ref<number>,
  clientY: number,
  clientX: number,
  customDragEnd?: CustomGeneric
) => {
  if (customDragEnd) {
    customDragEnd(
      e,
      dragYOffset,
      dragYStart,
      dragXOffset,
      dragXStart,
      clientY,
      clientX
    );
  }
  /**
   * By default, we don't do anything on end. This function
   * is declared here to get it's types down.
   */
};

interface VDraggerFunctions {
  dragStart?: (
    e: TouchEvent | DragEvent,
    dragYOffset: Ref<number>,
    dragXOffset: Ref<number>
  ) => void;
  dragMove?: (
    e: TouchEvent | DragEvent,
    dragYOffset: Ref<number>,
    dragXOffset: Ref<number>
  ) => void;
  dragEnd?: (
    e: TouchEvent | DragEvent,
    dragYOffset: Ref<number>,
    dragXOffset: Ref<number>
  ) => void;
}

export const vDraggerBeforeMount = (
  el: HTMLElement,
  binding: DirectiveBinding<VDraggerFunctions | undefined>
) => {
  const { dragYOffset, dragXOffset, dragStart, dragMove } = useDragger();

  // drag listeners
  el.addEventListener('touchstart', (e) => {
    dragStart(e);
    binding.value?.dragStart?.(e, dragYOffset, dragXOffset);
  });
  el.addEventListener('dragstart', (e) => {
    dragStart(e);
    binding.value?.dragStart?.(e, dragYOffset, dragXOffset);
  });
  el.addEventListener('touchmove', (e) => {
    dragMove(e);
    binding.value?.dragMove?.(e, dragYOffset, dragXOffset);
  });
  el.addEventListener('drag', (e) => {
    dragMove(e);
    binding.value?.dragMove?.(e, dragYOffset, dragXOffset);
  });
  el.addEventListener('touchend', (e) => {
    binding.value?.dragEnd?.(e, dragYOffset, dragXOffset);
  });
  el.addEventListener('dragend', (e) => {
    binding.value?.dragEnd?.(e, dragYOffset, dragXOffset);
  });

  // ux
  el.setAttribute('draggable', 'true');
  el.style.setProperty('cursor', 'grab');

  // initial set
  el.style.setProperty('--v-dragger-y-offset', `${-dragYOffset.value}`);
  el.style.setProperty('--v-dragger-x-offset', `${-dragXOffset.value}`);

  watch([dragYOffset, dragXOffset], () => {
    el.style.setProperty('--v-dragger-y-offset', `${-dragYOffset.value}`);
    el.style.setProperty('--v-dragger-x-offset', `${-dragXOffset.value}`);
  });
};

export const vDraggerUnMount = (el: HTMLElement) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable @typescript-eslint/no-empty-function */
  el.removeEventListener('touchstart', (e) => {});
  el.removeEventListener('dragstart', (e) => {});
  el.removeEventListener('touchmove', (e) => {});
  el.removeEventListener('drag', (e) => {});
  el.removeEventListener('touchend', (e) => {});
  el.removeEventListener('dragend', (e) => {});
  /* eslint-enable @typescript-eslint/no-unused-vars */
  /* eslint-enable @typescript-eslint/no-empty-function */
};

type CustomGeneric = (
  e: TouchEvent | DragEvent,
  dragYOffset: Ref<number>,
  dragYStart: Ref<number>,
  dragXOffset: Ref<number>,
  dragXStart: Ref<number>,
  clientY: number,
  clientX: number
) => void;

export const useDragger = (
  customDragEndGeneric?: CustomGeneric,
  customDragMoveGeneric?: CustomGeneric,
  customDragStartGeneric?: CustomGeneric
) => {
  const dragYStart = ref(0);
  const dragYOffset = ref(0);
  const dragXStart = ref(0);
  const dragXOffset = ref(0);

  const dragStart = (e: TouchEvent | DragEvent) => {
    beforeEventHandler(e);

    isTouchEvent(e)
      ? dragStartGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.touches[0].clientY,
          e.touches[0].clientX,
          customDragStartGeneric
        )
      : dragStartGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.clientY,
          e.clientX,
          customDragStartGeneric
        );
  };

  const dragMove = (e: TouchEvent | DragEvent) => {
    beforeEventHandler(e);

    isTouchEvent(e)
      ? dragMoveGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.touches[0].clientY,
          e.touches[0].clientX,
          customDragMoveGeneric
        )
      : dragMoveGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.clientY,
          e.clientX,
          customDragMoveGeneric
        );
  };

  const dragEnd = (e: TouchEvent | DragEvent) => {
    isTouchEvent(e)
      ? dragEndGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.touches[0].clientY,
          e.touches[0].clientX,
          customDragEndGeneric
        )
      : dragEndGeneric(
          e,
          dragYOffset,
          dragYStart,
          dragXOffset,
          dragXStart,
          e.clientY,
          e.clientX,
          customDragEndGeneric
        );
  };

  const resetState = () => {
    dragYStart.value = 0;
    dragYOffset.value = 0;
    dragXStart.value = 0;
    dragXOffset.value = 0;
  };

  return {
    dragYStart,
    dragYOffset,
    dragXStart,
    dragXOffset,
    dragStart,
    dragMove,
    dragEnd,
    resetState,
  };
};

export const useMobileDragger = (
  customDragEndGeneric?: CustomGeneric,
  customDragMoveGeneric?: CustomGeneric,
  customDragStartGeneric?: CustomGeneric
) => {
  const touchYStart = ref(0);
  const touchYOffset = ref(0);
  const touchXStart = ref(0);
  const touchXOffset = ref(0);

  const touchStart = (e: TouchEvent) => {
    dragStartGeneric(
      e,
      touchYOffset,
      touchYStart,
      touchXOffset,
      touchXStart,
      e.touches[0].clientY,
      e.touches[0].clientX,
      customDragStartGeneric
    );
  };

  const touchMove = (e: TouchEvent) => {
    dragMoveGeneric(
      e,
      touchYOffset,
      touchYStart,
      touchXOffset,
      touchXStart,
      e.touches[0].clientY,
      e.touches[0].clientX,
      customDragMoveGeneric
    );
  };

  const touchEnd = (e: TouchEvent) => {
    dragEndGeneric(
      e,
      touchYOffset,
      touchYStart,
      touchXOffset,
      touchXStart,
      e.touches[0].clientY,
      e.touches[0].clientX,
      customDragEndGeneric
    );
  };

  const resetState = () => {
    touchYStart.value = 0;
    touchYOffset.value = 0;
    touchXStart.value = 0;
    touchXOffset.value = 0;
  };

  return {
    touchYStart,
    touchXStart,
    touchYOffset,
    touchXOffset,
    touchStart,
    touchMove,
    touchEnd,
    resetState,
  };
};

export const useDesktopDragger = (
  customDragEndGeneric?: CustomGeneric,
  customDragMoveGeneric?: CustomGeneric,
  customDragStartGeneric?: CustomGeneric
) => {
  const dragYStart = ref(0);
  const dragYOffset = ref(0);
  const dragXStart = ref(0);
  const dragXOffset = ref(0);

  const dragStart = (e: DragEvent) => {
    beforeEventHandler(e);

    dragStartGeneric(
      e,
      dragYOffset,
      dragYStart,
      dragXOffset,
      dragXStart,
      e.clientY,
      e.clientX,
      customDragStartGeneric
    );
  };

  const dragMove = (e: DragEvent) => {
    beforeEventHandler(e);

    dragMoveGeneric(
      e,
      dragYOffset,
      dragYStart,
      dragXOffset,
      dragXStart,
      e.clientY,
      e.clientX,
      customDragMoveGeneric
    );
  };

  const dragEnd = (e: DragEvent) => {
    dragEndGeneric(
      e,
      dragYOffset,
      dragYStart,
      dragXOffset,
      dragXStart,
      e.clientY,
      e.clientX,
      customDragEndGeneric
    );
  };

  const resetState = () => {
    dragYStart.value = 0;
    dragYOffset.value = 0;
    dragXStart.value = 0;
    dragXOffset.value = 0;
  };

  return {
    dragYStart,
    dragXStart,
    dragYOffset,
    dragXOffset,
    dragStart,
    dragMove,
    dragEnd,
    resetState,
  };
};
