// no need to create the entire dummy event for a test
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDesktopDragger, useDragger, useMobileDragger } from '.';
import { vDraggerBeforeMount, vDraggerUnMount } from './index';

describe('useMobileDragger', () => {
  it('sets initial values correctly', () => {
    const { touchYStart, touchXStart, touchYOffset, touchXOffset } =
      useMobileDragger();

    expect(touchYStart.value).toBe(0);
    expect(touchXStart.value).toBe(0);
    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });

  it('handles a touchStart event correctly', () => {
    const { touchYStart, touchXStart, touchStart } = useMobileDragger();

    touchStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYStart.value).toBe(1);
    expect(touchXStart.value).toBe(2);
  });

  it('handles a touchMove event correctly', () => {
    const { touchYOffset, touchXOffset, touchMove } = useMobileDragger();

    touchMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYOffset.value).toBe(-1);
    expect(touchXOffset.value).toBe(-2);
  });

  it('does nothing when clientY and clientX are both 0', () => {
    const { touchYOffset, touchXOffset, touchYStart, touchXStart, touchMove } =
      useMobileDragger();

    touchYStart.value = 10;
    touchXStart.value = 10;
    touchYOffset.value = 1;
    touchXOffset.value = 2;

    touchMove({ touches: [{ clientY: 0, clientX: 0 }] } as any);

    expect(touchYOffset.value).toBe(1);
    expect(touchXOffset.value).toBe(2);
  });

  it('does move logic when only x OR y is 0', () => {
    const { touchYOffset, touchXOffset, touchYStart, touchXStart, touchMove } =
      useMobileDragger();

    touchYStart.value = 10;
    touchXStart.value = 10;
    touchYOffset.value = -10;
    touchXOffset.value = 2;

    touchMove({ touches: [{ clientY: 2, clientX: 0 }] } as any);

    expect(touchYOffset.value).toBe(8);
    expect(touchXOffset.value).toBe(10);
  });

  it('handles a touchEnd event correctly (ie does nothing)', () => {
    const { touchYOffset, touchXOffset, touchEnd } = useMobileDragger();

    touchEnd({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });

  it('resets the state correctly', () => {
    const {
      touchYStart,
      touchXStart,
      touchYOffset,
      touchXOffset,
      touchStart,
      touchMove,
      resetState,
    } = useMobileDragger();

    touchStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);
    touchMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    resetState();

    expect(touchYStart.value).toBe(0);
    expect(touchXStart.value).toBe(0);
    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });
});

describe('useDesktopDragger', () => {
  it('sets initial values correctly', () => {
    const { dragYStart, dragXStart, dragYOffset, dragXOffset } =
      useDesktopDragger();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it('handles a dragStart event correctly', () => {
    const { dragYStart, dragXStart, dragStart } = useDesktopDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);

    expect(dragYStart.value).toBe(1);
    expect(dragXStart.value).toBe(2);
  });

  it('handles a dragMove event correctly', () => {
    const { dragYOffset, dragXOffset, dragMove } = useDesktopDragger();

    dragMove({ clientY: 1, clientX: 2 } as any);

    expect(dragYOffset.value).toBe(-1);
    expect(dragXOffset.value).toBe(-2);
  });

  it('does nothing when clientY and clientX are both 0', () => {
    const { dragYOffset, dragXOffset, dragYStart, dragXStart, dragMove } =
      useDesktopDragger();

    dragYStart.value = 10;
    dragXStart.value = 10;
    dragYOffset.value = 1;
    dragXOffset.value = 2;

    dragMove({ clientY: 0, clientX: 0 } as any);

    expect(dragYOffset.value).toBe(1);
    expect(dragXOffset.value).toBe(2);
  });

  it('does move logic when only x OR y is 0', () => {
    const { dragYOffset, dragXOffset, dragYStart, dragXStart, dragMove } =
      useDesktopDragger();

    dragYStart.value = 10;
    dragXStart.value = 10;
    dragYOffset.value = -10;
    dragXOffset.value = 2;

    dragMove({ clientY: 2, clientX: 0 } as any);

    expect(dragYOffset.value).toBe(8);
    expect(dragXOffset.value).toBe(10);
  });

  it('handles a dragEnd event correctly (ie does nothing)', () => {
    const { dragYOffset, dragXOffset, dragEnd } = useDesktopDragger();

    dragEnd({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it('resets the state correctly', () => {
    const {
      dragYStart,
      dragXStart,
      dragYOffset,
      dragXOffset,
      dragStart,
      dragMove,
      resetState,
    } = useDesktopDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);
    dragMove({ clientY: 1, clientX: 2 } as any);

    resetState();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });
});

describe('useDragger', () => {
  it('sets initial values correctly', () => {
    const { dragYStart, dragXStart, dragYOffset, dragXOffset } = useDragger();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it('handles a dragStart (desktop) event correctly', () => {
    const { dragYStart, dragXStart, dragStart } = useDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);

    expect(dragYStart.value).toBe(1);
    expect(dragXStart.value).toBe(2);
  });

  it('handles a dragMove (desktop) event correctly', () => {
    const { dragYOffset, dragXOffset, dragMove } = useDragger();

    dragMove({ clientY: 1, clientX: 2 } as any);

    expect(dragYOffset.value).toBe(-1);
    expect(dragXOffset.value).toBe(-2);
  });

  it('does nothing when clientY and clientX are both 0 (desktop)', () => {
    const { dragYOffset, dragXOffset, dragYStart, dragXStart, dragMove } =
      useDesktopDragger();

    dragYStart.value = 10;
    dragXStart.value = 10;
    dragYOffset.value = 1;
    dragXOffset.value = 2;

    dragMove({ clientY: 0, clientX: 0 } as any);

    expect(dragYOffset.value).toBe(1);
    expect(dragXOffset.value).toBe(2);
  });

  it('does move logic when only x OR y is 0 (desktop)', () => {
    const { dragYOffset, dragXOffset, dragYStart, dragXStart, dragMove } =
      useDesktopDragger();

    dragYStart.value = 10;
    dragXStart.value = 10;
    dragYOffset.value = -10;
    dragXOffset.value = 2;

    dragMove({ clientY: 2, clientX: 0 } as any);

    expect(dragYOffset.value).toBe(8);
    expect(dragXOffset.value).toBe(10);
  });

  it('handles a dragEnd event correctly (ie does nothing) (desktop)', () => {
    const { dragYOffset, dragXOffset, dragEnd } = useDesktopDragger();

    dragEnd({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it('resets the state correctly (desktop)', () => {
    const {
      dragYStart,
      dragXStart,
      dragYOffset,
      dragXOffset,
      dragStart,
      dragMove,
      resetState,
    } = useDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);
    dragMove({ clientY: 1, clientX: 2 } as any);

    resetState();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it('handles a dragStart (mobile) event correctly', () => {
    const { dragYStart, dragXStart, dragStart } = useDragger();

    dragStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(dragYStart.value).toBe(1);
    expect(dragXStart.value).toBe(2);
  });

  it('handles a dragMove (mobile) event correctly', () => {
    const { dragYOffset, dragXOffset, dragMove } = useDragger();

    dragMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(dragYOffset.value).toBe(-1);
    expect(dragXOffset.value).toBe(-2);
  });

  it('does nothing when clientY and clientX are both 0 (mobile)', () => {
    const { touchYOffset, touchXOffset, touchYStart, touchXStart, touchMove } =
      useMobileDragger();

    touchYStart.value = 10;
    touchXStart.value = 10;
    touchYOffset.value = 1;
    touchXOffset.value = 2;

    touchMove({ touches: [{ clientY: 0, clientX: 0 }] } as any);

    expect(touchYOffset.value).toBe(1);
    expect(touchXOffset.value).toBe(2);
  });

  it('does move logic when only x OR y is 0 (mobile)', () => {
    const { touchYOffset, touchXOffset, touchYStart, touchXStart, touchMove } =
      useMobileDragger();

    touchYStart.value = 10;
    touchXStart.value = 10;
    touchYOffset.value = -10;
    touchXOffset.value = 2;

    touchMove({ touches: [{ clientY: 2, clientX: 0 }] } as any);

    expect(touchYOffset.value).toBe(8);
    expect(touchXOffset.value).toBe(10);
  });

  it('handles a touchEnd event correctly (ie does nothing) (mobile)', () => {
    const { touchYOffset, touchXOffset, touchEnd } = useMobileDragger();

    touchEnd({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });

  it('resets the state correctly', () => {
    const {
      touchYStart,
      touchXStart,
      touchYOffset,
      touchXOffset,
      touchStart,
      touchMove,
      resetState,
    } = useMobileDragger();

    touchStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);
    touchMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    resetState();

    expect(touchYStart.value).toBe(0);
    expect(touchXStart.value).toBe(0);
    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });
});

describe('vDraggerBeforeMount', () => {
  const addEventListener = jest.fn();
  const setAttribute = jest.fn();
  const setProperty = jest.fn();

  test('sets all the proper event listeners and sets attributes/styles correctly', () => {
    vDraggerBeforeMount(
      { addEventListener, setAttribute, style: { setProperty } } as any,
      {} as any
    );

    // event listeners
    expect(addEventListener).toHaveBeenCalledTimes(6);
    expect(addEventListener).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith(
      'dragstart',
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith('drag', expect.any(Function));
    expect(addEventListener).toHaveBeenCalledWith(
      'touchend',
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith(
      'dragend',
      expect.any(Function)
    );

    // attributes/styles
    expect(setAttribute).toHaveBeenCalledTimes(1);
    expect(setAttribute).toHaveBeenCalledWith('draggable', 'true');
    expect(setProperty).toHaveBeenCalledTimes(3);
    expect(setProperty).toHaveBeenCalledWith('cursor', 'grab');
    expect(setProperty).toHaveBeenCalledWith('--v-dragger-y-offset', '0');
    expect(setProperty).toHaveBeenCalledWith('--v-dragger-x-offset', '0');
  });
});

describe('vDraggerUnMount', () => {
  const removeEventListener = jest.fn();

  it('removes all event listeners', () => {
    vDraggerUnMount({ removeEventListener } as any);

    expect(removeEventListener).toHaveBeenCalledTimes(6);
    expect(removeEventListener).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'dragstart',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'drag',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'touchend',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'dragend',
      expect.any(Function)
    );
  });
});
