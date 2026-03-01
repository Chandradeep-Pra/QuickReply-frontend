"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { DOMAINS, STAGES } from "@/lib/types";
import type { Paper } from "@/lib/types";

const STAGE_COLORS: Record<string, string> = {
  "Abstract Read": "#6366f1",
  "Introduction Done": "#22c55e",
  "Methodology Done": "#f59e0b",
  "Results Analyzed": "#ef4444",
  "Fully Read": "#0ea5e9",
  "Notes Completed": "#8b5cf6",
};

// Custom tick for styled domain labels
function DomainTick({ x, y, payload }: any) {
  return (
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fill="#374151"
      style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.3px",
        textTransform: "capitalize",
      }}
    >
      {payload.value}
    </text>
  );
}

export default function DomainStageStackedBar({ papers }: { papers: Paper[] }) {
  // Normalize: lowercase + trim before comparing
  const normalize = (str: string) => str.trim().toLowerCase();

  // Build rows per domain
  const rows = DOMAINS.map((domain) => {
    const row: Record<string, any> = { domain };

    STAGES.forEach((stage) => {
      row[stage] = papers.filter(
        (p) =>
          normalize(p.domain) === normalize(domain) &&
          normalize(p.stage) === normalize(stage)
      ).length;
    });

    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={rows}>
        <CartesianGrid strokeDasharray="3 3" />

        {/* Forces ALL domain names to appear */}
        <XAxis
          dataKey="domain"
          ticks={[...DOMAINS]}
          interval={0}
          height={40}
          tick={<DomainTick />}
        />

        <YAxis allowDecimals={false} />

        <Tooltip />
        <Legend />

        {/* Stacked bars */}
        {STAGES.map((stage) => (
          <Bar key={stage} dataKey={stage} stackId="a" fill={STAGE_COLORS[stage]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}