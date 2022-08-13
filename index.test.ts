// no need to create the entire dummy event for a test
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDesktopDragger, useDragger, useMobileDragger } from ".";

describe("useMobileDragger", () => {
  it("sets initial values correctly", () => {
    const { touchYStart, touchXStart, touchYOffset, touchXOffset } =
      useMobileDragger();

    expect(touchYStart.value).toBe(0);
    expect(touchXStart.value).toBe(0);
    expect(touchYOffset.value).toBe(0);
    expect(touchXOffset.value).toBe(0);
  });

  it("handles a touchStart event correctly", () => {
    const { touchYStart, touchXStart, touchStart } = useMobileDragger();

    touchStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYStart.value).toBe(1);
    expect(touchXStart.value).toBe(2);
  });

  it("handles a touchMove event correctly", () => {
    const { touchYOffset, touchXOffset, touchMove } = useMobileDragger();

    touchMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYOffset.value).toBe(-1);
    expect(touchXOffset.value).toBe(-2);
  });

  it("resets the state correctly", () => {
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

describe("useDesktopDragger", () => {
  it("sets initial values correctly", () => {
    const { dragYStart, dragXStart, dragYOffset, dragXOffset } =
      useDesktopDragger();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it("handles a dragStart event correctly", () => {
    const { dragYStart, dragXStart, dragStart } = useDesktopDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);

    expect(dragYStart.value).toBe(1);
    expect(dragXStart.value).toBe(2);
  });

  it("handles a dragMove event correctly", () => {
    const { dragYOffset, dragXOffset, dragMove } = useDesktopDragger();

    dragMove({ clientY: 1, clientX: 2 } as any);

    expect(dragYOffset.value).toBe(-1);
    expect(dragXOffset.value).toBe(-2);
  });

  it("resets the state correctly", () => {
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

describe("useDragger", () => {
  it("sets initial values correctly", () => {
    const { dragYStart, dragXStart, dragYOffset, dragXOffset } = useDragger();

    expect(dragYStart.value).toBe(0);
    expect(dragXStart.value).toBe(0);
    expect(dragYOffset.value).toBe(0);
    expect(dragXOffset.value).toBe(0);
  });

  it("handles a dragStart (desktop) event correctly", () => {
    const { dragYStart, dragXStart, dragStart } = useDragger();

    dragStart({ clientY: 1, clientX: 2 } as any);

    expect(dragYStart.value).toBe(1);
    expect(dragXStart.value).toBe(2);
  });

  it("handles a dragMove (desktop) event correctly", () => {
    const { dragYOffset, dragXOffset, dragMove } = useDragger();

    dragMove({ clientY: 1, clientX: 2 } as any);

    expect(dragYOffset.value).toBe(-1);
    expect(dragXOffset.value).toBe(-2);
  });

  it("resets the state correctly (desktop)", () => {
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

  it("handles a touchStart event correctly", () => {
    const { touchYStart, touchXStart, touchStart } = useMobileDragger();

    touchStart({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYStart.value).toBe(1);
    expect(touchXStart.value).toBe(2);
  });

  it("handles a touchMove event correctly", () => {
    const { touchYOffset, touchXOffset, touchMove } = useMobileDragger();

    touchMove({ touches: [{ clientY: 1, clientX: 2 }] } as any);

    expect(touchYOffset.value).toBe(-1);
    expect(touchXOffset.value).toBe(-2);
  });

  it("resets the state correctly", () => {
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
