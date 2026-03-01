"use client";

import {
  ResponsiveContainer,
  FunnelChart as RCFunnel,
  Funnel,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

import { STAGES } from "@/lib/types";
import type { Paper } from "@/lib/types";
import ChartTooltip from "./chart-tooltip";

const STAGE_COLORS: Record<string, string> = {
  "Abstract Read": "#6366f1",
  "Introduction Done": "#22c55e",
  "Methodology Done": "#f59e0b",
  "Results Analyzed": "#ef4444",
  "Fully Read": "#0ea5e9",
  "Notes Completed": "#8b5cf6",
};

export default function StageFunnelChart({ papers }: { papers: Paper[] }) {
  // Build stage data
  const data = STAGES.map((stage) => ({
    name: stage,
    value: papers.filter((p) => p.stage === stage).length,
  })).filter((d) => d.value > 0);

  if (data.length === 0)
    return <div className="text-center text-sm text-gray-400">No data available</div>;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RCFunnel
        margin={{
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
        }}
      >
        <Tooltip content={<ChartTooltip papers={papers} />} />

        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
          gap={4} // Adds spacing between layers
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={STAGE_COLORS[entry.name]}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth={1}
            />
          ))}

          {/* Stage name on left */}
          <LabelList
            dataKey="name"
            position="left"
            fill="#111827"
            offset={15}
            style={{
              fontSize: "11px",
              fontWeight: 600,
            }}
          />

          {/* Value on right */}
          <LabelList
            dataKey="value"
            position="right"
            fill="#374151"
            offset={15}
            formatter={(v: number) => `${v}`}
            style={{
              fontSize: "11px",
              fontWeight: 500,
            }}
          />
        </Funnel>
      </RCFunnel>
    </ResponsiveContainer>
  );
}