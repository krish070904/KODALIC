"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Falloff = "linear" | "smooth" | "sharp";

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<
  Falloff,
  (progress: number) => number
> = {
  linear: (progress) => progress,

  smooth: (progress) =>
    progress * progress * (3 - 2 * progress),

  sharp: (progress) =>
    progress * progress * progress,
};

const DEFAULT_ITEMS = [
  "Overview",
  "Components",
  "Animations",
  "Backgrounds",
  "Showcase",
  "Playground",
  "Templates",
  "Changelog",
  "Community",
  "Resources",
  "Documentation",
  "Support",
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,

  accentColor = "#8B5E3C",
  textColor = "#a1a1aa",
  markerColor = "#d4d4d8",

  showIndex = true,
  showMarker = true,

  proximityRadius = 100,
  maxShift = 30,

  falloff = "smooth",

  markerLength = 60,
  markerGap = 0,

  tickScale = 0.5,
  scaleTick = true,

  itemGap = 20,
  fontSize = 1.1,

  smoothing = 100,

  defaultActive = null,

  onItemClick,

  className = "",
}: LineSidebarProps) => {
  const listRef =
    useRef<HTMLUListElement>(null);

  const itemRefs =
    useRef<(HTMLLIElement | null)[]>([]);

  const targetsRef =
    useRef<number[]>([]);

  const currentRef =
    useRef<number[]>([]);

  const rafRef =
    useRef<number | null>(null);

  const lastRef =
    useRef(0);

  const activeRef =
    useRef<number | null>(defaultActive);

  const smoothingRef =
    useRef(smoothing);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(defaultActive);

  /*
   * Keep refs synchronized with state/props.
   */
  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  /*
   * Animation loop.
   *
   * Every item receives an --effect value between 0 and 1.
   * That value controls:
   *
   * - color
   * - horizontal movement
   * - marker length
   * - marker scale
   * - opacity
   */
  const runFrame = useCallback(
    (now: number) => {
      const dt = Math.min(
        (now - lastRef.current) / 1000,
        0.05,
      );

      lastRef.current = now;

      const tau =
        Math.max(
          smoothingRef.current,
          1,
        ) / 1000;

      const k =
        1 - Math.exp(-dt / tau);

      let moving = false;

      const elements =
        itemRefs.current;

      for (
        let i = 0;
        i < elements.length;
        i++
      ) {
        const element = elements[i];

        if (!element) continue;

        const proximityEffect =
          targetsRef.current[i] || 0;

        const activeEffect =
          activeRef.current === i
            ? 1
            : 0;

        const target = Math.max(
          proximityEffect,
          activeEffect,
        );

        const current =
          currentRef.current[i] || 0;

        const next =
          current +
          (target - current) * k;

        const settled =
          Math.abs(target - next) <
          0.0015;

        const value = settled
          ? target
          : next;

        currentRef.current[i] =
          value;

        element.style.setProperty(
          "--effect",
          value.toFixed(4),
        );

        if (!settled) {
          moving = true;
        }
      }

      rafRef.current = moving
        ? requestAnimationFrame(runFrame)
        : null;
    },
    [],
  );

  /*
   * Start animation loop.
   */
  const startLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(
        rafRef.current,
      );
    }

    lastRef.current =
      performance.now();

    rafRef.current =
      requestAnimationFrame(runFrame);
  }, [runFrame]);

  /*
   * Pointer proximity effect.
   */
  const handlePointerMove = useCallback(
    (
      event: PointerEvent<HTMLUListElement>,
    ) => {
      const list = listRef.current;

      if (!list) return;

      const rect =
        list.getBoundingClientRect();

      const pointerY =
        event.clientY - rect.top;

      const ease =
        FALLOFF_CURVES[falloff] ??
        FALLOFF_CURVES.linear;

      const elements =
        itemRefs.current;

      for (
        let i = 0;
        i < elements.length;
        i++
      ) {
        const element =
          elements[i];

        if (!element) continue;

        const center =
          element.offsetTop +
          element.offsetHeight / 2;

        const distance =
          Math.abs(
            pointerY - center,
          );

        const progress = Math.max(
          0,
          1 -
            distance /
              proximityRadius,
        );

        targetsRef.current[i] =
          ease(progress);
      }

      startLoop();
    },
    [
      falloff,
      proximityRadius,
      startLoop,
    ],
  );

  /*
   * Reset proximity effect.
   */
  const handlePointerLeave =
    useCallback(() => {
      targetsRef.current =
        targetsRef.current.map(
          () => 0,
        );

      startLoop();
    }, [startLoop]);

  /*
   * Select item.
   */
  const handleClick = useCallback(
    (
      index: number,
      label: string,
    ) => {
      setActiveIndex(index);

      onItemClick?.(
        index,
        label,
      );
    },
    [onItemClick],
  );

  /*
   * Keep active state animated.
   */
  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  /*
   * Cleanup animation frame.
   */
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current,
        );
      }

      rafRef.current = null;
    };
  }, []);

  /*
   * Calculate marker styling.
   */
  const tickClass = showMarker
    ? `
      after:absolute
      after:left-[calc(-1*var(--marker-length)-var(--marker-gap))]
      after:top-[calc(100%+var(--item-gap)/2)]
      after:h-px
      after:opacity-50
      after:content-['']
      after:[background-color:var(--marker-color)]
      after:[width:calc(var(--marker-length)*var(--tick-scale))]
      ${
        scaleTick
          ? `
            after:origin-left
            after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]
          `
          : "after:-translate-y-1/2"
      }
    `
    : "";

  /*
   * CSS custom properties.
   */
  const style = {
    "--accent-color": accentColor,
    "--text-color": textColor,
    "--marker-color": markerColor,
    "--marker-length": `${markerLength}px`,
    "--marker-gap": `${markerGap}px`,
    "--tick-scale": tickScale,
    "--max-shift": `${maxShift}px`,
    "--item-gap": `${itemGap}px`,
    "--font-size": `${fontSize}rem`,
    "--smoothing": `${smoothing}ms`,
  } as CSSProperties;

  return (
    <nav
      aria-label="Process navigation"
      className={`
        relative
        flex
        justify-start
        ${
          showMarker
            ? "[padding-left:calc(var(--marker-length)+var(--marker-gap))]"
            : ""
        }
        ${className}
      `}
      style={style}
    >
      <ul
        ref={listRef}
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={
          handlePointerLeave
        }
        className="
          m-0
          flex
          list-none
          flex-col
          py-4
          [gap:var(--item-gap)]
        "
      >
        {items.map(
          (label, index) => (
            <li
              key={`${label}-${index}`}
              ref={(element) => {
                itemRefs.current[
                  index
                ] = element;
              }}
              aria-current={
                activeIndex === index
                  ? "true"
                  : undefined
              }
              onClick={() =>
                handleClick(
                  index,
                  label,
                )
              }
              className={`
                relative
                cursor-pointer
                before:absolute
                before:-inset-x-12
                before:-inset-y-[6px]
                before:content-['']
                ${tickClass}
              `}
            >
              {/* LEFT MARKER */}
              {showMarker && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    left-[calc(-1*var(--marker-length)-var(--marker-gap))]
                    top-1/2
                    h-px
                    w-[length:var(--marker-length)]
                    origin-left
                    [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))]
                    [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]
                  "
                />
              )}

              {/* TEXT */}
              <span
                className="
                  relative
                  inline-flex
                  items-baseline
                  leading-[1.2]
                  transition-none
                  [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))]
                  [font-size:var(--font-size)]
                  [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]
                "
              >
                {/* INDEX */}
                {showIndex && (
                  <span
                    className="
                      mr-[0.6rem]
                      font-mono
                      text-[0.85em]
                      [opacity:calc(0.55+var(--effect,0)*0.45)]
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                )}

                {/* LABEL */}
                <span>
                  {label}
                </span>
              </span>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default LineSidebar;