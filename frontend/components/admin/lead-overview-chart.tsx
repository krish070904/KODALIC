"use client";

import { useMemo } from "react";
import { useTheme } from "../../app/theme-provider";

type LeadOverviewPoint = {
  day: string;
  lead_count: number;
};

type LeadOverviewChartProps = {
  data: LeadOverviewPoint[];
};

export default function LeadOverviewChart({ data }: LeadOverviewChartProps) {
  const { isDark } = useTheme();

  const chart = useMemo(() => {
    if (!data.length) {
      return null;
    }

    const width = 760;
    const height = 280;

    const padding = {
      top: 20,
      right: 20,
      bottom: 45,
      left: 45,
    };

    const chartWidth = width - padding.left - padding.right;

    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map((item) => item.lead_count), 1);

    const points = data.map((item, index) => {
      const x =
        data.length === 1
          ? padding.left + chartWidth / 2
          : padding.left + (index / (data.length - 1)) * chartWidth;

      const y =
        padding.top + chartHeight - (item.lead_count / maxValue) * chartHeight;

      return {
        ...item,
        x,
        y,
      };
    });

    const linePath = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    const areaPath = [
      `M ${points[0].x} ${padding.top + chartHeight}`,
      ...points.map((point) => `L ${point.x} ${point.y}`),
      `L ${points[points.length - 1].x} ${padding.top + chartHeight}`,
      "Z",
    ].join(" ");

    return {
      width,
      height,
      padding,
      chartWidth,
      chartHeight,
      maxValue,
      points,
      linePath,
      areaPath,
    };
  }, [data]);

  if (!chart) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <p className="text-sm text-slate-400 dark:text-white/35">No lead activity yet.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  const gridLines = 4;

  const yAxisMax = chart.maxValue <= 4 ? 4 : Math.ceil(chart.maxValue / 4) * 4;

  // Theme-aware colors for SVG elements
  const gridColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const labelClass = isDark ? "fill-white/30 text-[11px]" : "fill-slate-400 text-[11px]";
  const areaFill = isDark ? "rgba(115,87,255,0.12)" : "rgba(115,87,255,0.08)";
  const pointFill = isDark ? "#080c1e" : "#ffffff";

  return (
    <div className="w-full px-5 pb-5 pt-4">
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Lead activity over time"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid lines */}
          {Array.from({
            length: gridLines + 1,
          }).map((_, index) => {
            const y =
              chart.padding.top + (index / gridLines) * chart.chartHeight;

            const value = Math.ceil(yAxisMax - (index / gridLines) * yAxisMax);

            return (
              <g key={index}>
                <line
                  x1={chart.padding.left}
                  x2={chart.width - chart.padding.right}
                  y1={y}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth="1"
                />

                <text
                  x={chart.padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className={labelClass}
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Area */}
          <path d={chart.areaPath} fill={areaFill} />

          {/* Line */}
          <path
            d={chart.linePath}
            fill="none"
            stroke="#8b6cff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {chart.points.map((point) => (
            <circle
              key={point.day}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={pointFill}
              stroke="#8b6cff"
              strokeWidth="2"
            />
          ))}

          {/* Date labels */}
          {chart.points.map((point) => (
            <text
              key={`label-${point.day}`}
              x={point.x}
              y={chart.height - 14}
              textAnchor="middle"
              className={labelClass}
            >
              {formatDate(point.day)}
            </text>
          ))}
        </svg>
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4">
        <div>
          <p className="text-xs text-slate-400 dark:text-white/35">Total in period</p>

          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {data.reduce((total, item) => total + item.lead_count, 0)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 dark:text-white/35">Peak day</p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-white">
            {formatDate(
              data.reduce(
                (peak, item) =>
                  item.lead_count > peak.lead_count ? item : peak,
                data[0],
              ).day,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
