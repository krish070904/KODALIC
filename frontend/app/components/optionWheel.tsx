"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

interface OptionWheelProps {
  items: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  className?: string;
}

const ROW_HEIGHT = 58;
const SPRING_MS = 220; // time constant for the settle animation
const WHEEL_SETTLE_DELAY = 130; // ms of no wheel input before snapping
const WHEEL_SENSITIVITY = 1 / (ROW_HEIGHT * 2.4);

const OptionWheel = ({
  items,
  defaultSelected = 0,
  onChange,
  className = "",
}: OptionWheelProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // positionRef is the single source of truth for where the wheel is
  // rendered right now (can be fractional). targetRef is only used by
  // the spring (settle) animation.
  const positionRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);

  const springFrameRef = useRef<number | null>(null);
  const springLastTimeRef = useRef(0);

  // rAF batching for high-frequency input (pointer/wheel)
  const renderQueuedRef = useRef(false);

  const reducedMotionRef = useRef(false);

  const dragRef = useRef<{
    y: number;
    startPosition: number;
    pointerId: number;
  } | null>(null);
  const dragMovedRef = useRef(false);

  const wheelSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const selectedRef = useRef(defaultSelected);

  const clampPosition = useCallback(
    (value: number) => Math.max(0, Math.min(value, items.length - 1)),
    [items.length],
  );

  // Pure render: paint the wheel at a given (possibly fractional) position.
  // No React state, no layout reads — transform/opacity only so the browser
  // can composite this without a repaint.
  const renderAt = useCallback((position: number) => {
    itemRefs.current.forEach((element, index) => {
      if (!element) return;

      const distance = index - position;
      const absoluteDistance = Math.abs(distance);

      // Skip work (and keep old frame) for items far enough off-screen
      // that they're already fully hidden — cheap early-out on mobile.
      if (absoluteDistance > 7) {
        if (element.style.opacity !== "0") {
          element.style.opacity = "0";
          element.style.pointerEvents = "none";
        }
        return;
      }

      const angle = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, distance * 0.16),
      );

      const radius = 365;
      const x = radius * (1 - Math.cos(angle));
      const y = radius * Math.sin(angle);

      const opacity = Math.max(0.18, 1 - absoluteDistance * 0.23);
      const scale = Math.max(0.82, 1 - absoluteDistance * 0.045);
      const rotate = distance * 3.5;

      element.style.pointerEvents = "auto";
      element.style.transform = `translate3d(${
        distance < 0 ? x : -x
      }px, ${y - ROW_HEIGHT / 2}px, 0) rotate(${rotate}deg) scale(${scale})`;
      element.style.opacity = String(opacity);
      element.style.zIndex = String(100 - Math.round(absoluteDistance));
    });
  }, []);

  // Batches renderAt calls from rapid input (pointermove/wheel) into once
  // per animation frame, so a flood of native events never paints more
  // than 60x/sec.
  const queueRender = useCallback(
    (position: number) => {
      positionRef.current = position;

      if (renderQueuedRef.current) return;
      renderQueuedRef.current = true;

      requestAnimationFrame(() => {
        renderQueuedRef.current = false;
        renderAt(positionRef.current);
      });
    },
    [renderAt],
  );

  const updateSelected = useCallback(
    (rawPosition: number) => {
      const rounded = Math.round(clampPosition(rawPosition));

      if (selectedRef.current !== rounded) {
        selectedRef.current = rounded;
        setSelectedIndex(rounded);
        onChange?.(rounded, items[rounded]);
      }
    },
    [clampPosition, items, onChange],
  );

  const stopSpring = useCallback(() => {
    if (springFrameRef.current !== null) {
      cancelAnimationFrame(springFrameRef.current);
      springFrameRef.current = null;
    }
  }, []);

  const springStep = useCallback(
    (now: number) => {
      const delta = Math.min((now - springLastTimeRef.current) / 1000, 0.05);
      springLastTimeRef.current = now;

      const current = positionRef.current;
      const target = targetRef.current;

      const tau = SPRING_MS / 1000;
      const factor = 1 - Math.exp(-delta / tau);

      let next = current + (target - current) * factor;
      if (Math.abs(target - next) < 0.001) {
        next = target;
      }

      positionRef.current = next;
      renderAt(next);

      if (next === target) {
        springFrameRef.current = null;
        return;
      }

      springFrameRef.current = requestAnimationFrame(springStep);
    },
    [renderAt],
  );

  const settleTo = useCallback(
    (index: number) => {
      const safeIndex = clampPosition(index);
      targetRef.current = safeIndex;
      updateSelected(safeIndex);

      stopSpring();

      if (reducedMotionRef.current) {
        positionRef.current = safeIndex;
        renderAt(safeIndex);
        return;
      }

      springLastTimeRef.current = performance.now();
      springFrameRef.current = requestAnimationFrame(springStep);
    },
    [clampPosition, renderAt, springStep, stopSpring, updateSelected],
  );

  // --- Wheel / trackpad ---------------------------------------------------

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      stopSpring();

      const next = clampPosition(
        positionRef.current + event.deltaY * WHEEL_SENSITIVITY,
      );

      queueRender(next);
      updateSelected(next);

      if (wheelSettleTimerRef.current) {
        clearTimeout(wheelSettleTimerRef.current);
      }
      wheelSettleTimerRef.current = setTimeout(() => {
        settleTo(Math.round(positionRef.current));
      }, WHEEL_SETTLE_DELAY);
    },
    [clampPosition, queueRender, settleTo, stopSpring, updateSelected],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // --- Pointer / touch drag ------------------------------------------------
  // Tracks the finger 1:1 in real time (no spring lag while dragging), and
  // only springs to the nearest item once the finger lifts.

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    stopSpring();

    dragRef.current = {
      y: event.clientY,
      startPosition: positionRef.current,
      pointerId: event.pointerId,
    };
    dragMovedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const distance = event.clientY - drag.y;

    if (!dragMovedRef.current && Math.abs(distance) > 5) {
      dragMovedRef.current = true;
      rootRef.current?.setPointerCapture(drag.pointerId);
    }

    if (!dragMovedRef.current) return;

    const movement = distance / ROW_HEIGHT;
    const next = clampPosition(drag.startPosition - movement);

    queueRender(next);
    updateSelected(next);
  };

  const handlePointerUp = () => {
    const wasDragging = dragMovedRef.current;
    dragRef.current = null;
    dragMovedRef.current = false;

    if (wasDragging) {
      settleTo(Math.round(positionRef.current));
    }
  };

  // --- Keyboard -------------------------------------------------------------

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      settleTo(selectedRef.current + 1);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      settleTo(selectedRef.current - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      settleTo(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      settleTo(items.length - 1);
    }
  };

  // --- Setup ------------------------------------------------------------

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initial = clampPosition(defaultSelected);
    positionRef.current = initial;
    selectedRef.current = initial;
    targetRef.current = initial;
    renderAt(initial);

    return () => {
      stopSpring();
      if (wheelSettleTimerRef.current) {
        clearTimeout(wheelSettleTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Industries"
      className={`relative h-[360px] w-full overflow-hidden outline-none touch-none sm:h-[430px] lg:h-[620px] ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      {/* CENTER GUIDE */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-zinc-900/10 dark:bg-white/10" />

      {/* ACTIVE MARKER */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 dark:bg-white" />

      {/* WHEEL */}
      <div className="absolute inset-0 left-1/2 w-[82%] -translate-x-1/2 sm:w-[75%] lg:w-full">
        {items.map((item, index) => {
          const active = selectedIndex === index;

          return (
            <button
              key={`${item}-${index}`}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                if (dragMovedRef.current) return;
                settleTo(index);
              }}
              className="absolute left-1/2 top-1/2 flex w-max max-w-[85%] -translate-x-1/2 items-center gap-4 whitespace-nowrap text-left font-display text-2xl font-medium tracking-[-0.025em] will-change-transform sm:text-3xl lg:text-4xl"
              style={
                {
                  color: active ? "var(--ow-active)" : "var(--ow-muted)",
                  transition: "color 0.2s ease",
                  "--ow-active": "var(--foreground)",
                  "--ow-muted": "var(--muted-foreground)",
                } as CSSProperties
              }
            >
              <span
                className={`font-mono text-[9px] tracking-[0.2em] transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-50"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default OptionWheel;