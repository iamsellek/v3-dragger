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
  dragYStart: Ref<number>,
  dragXStart: Ref<number>,
  clientY: number,
  clientX: number
) => {
  dragYStart.value = clientY;
  dragXStart.value = clientX;
};

const dragMoveGeneric = (
  dragYOffset: Ref<number>,
  dragYStart: number,
  dragXOffset: Ref<number>,
  dragXStart: number,
  clientY: number,
  clientX: number
) => {
  dragYOffset.value = dragYStart - clientY;
  dragXOffset.value = dragXStart - clientX;
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

export const useDragger = () => {
  const dragYStart = ref(0);
  const dragYOffset = ref(0);
  const dragXStart = ref(0);
  const dragXOffset = ref(0);

  const dragStart = (e: TouchEvent | DragEvent) => {
    beforeEventHandler(e);

    isTouchEvent(e)
      ? dragStartGeneric(
          dragYStart,
          dragXStart,
          e.touches[0].clientY,
          e.touches[0].clientX
        )
      : dragStartGeneric(dragYStart, dragXStart, e.clientY, e.clientX);
  };

  const dragMove = (e: TouchEvent | DragEvent) => {
    beforeEventHandler(e);

    isTouchEvent(e)
      ? dragMoveGeneric(
          dragYOffset,
          dragYStart.value,
          dragXOffset,
          dragXStart.value,
          e.touches[0].clientY,
          e.touches[0].clientX
        )
      : dragMoveGeneric(
          dragYOffset,
          dragYStart.value,
          dragXOffset,
          dragXStart.value,
          e.clientY,
          e.clientX
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
    resetState,
  };
};

export const useMobileDragger = () => {
  const touchYStart = ref(0);
  const touchYOffset = ref(0);
  const touchXStart = ref(0);
  const touchXOffset = ref(0);

  const touchStart = (e: TouchEvent) => {
    dragStartGeneric(
      touchYStart,
      touchXStart,
      e.touches[0].clientY,
      e.touches[0].clientX
    );
  };

  const touchMove = (e: TouchEvent) => {
    dragMoveGeneric(
      touchYOffset,
      touchYStart.value,
      touchXOffset,
      touchXStart.value,
      e.touches[0].clientY,
      e.touches[0].clientX
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
    resetState,
  };
};

export const useDesktopDragger = () => {
  const dragYStart = ref(0);
  const dragYOffset = ref(0);
  const dragXStart = ref(0);
  const dragXOffset = ref(0);

  const dragStart = (e: DragEvent) => {
    beforeEventHandler(e);

    dragStartGeneric(dragYStart, dragXStart, e.clientY, e.clientX);
  };

  const dragMove = (e: DragEvent) => {
    beforeEventHandler(e);

    dragMoveGeneric(
      dragYOffset,
      dragYStart.value,
      dragXOffset,
      dragXStart.value,
      e.clientY,
      e.clientX
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
    resetState,
  };
};
