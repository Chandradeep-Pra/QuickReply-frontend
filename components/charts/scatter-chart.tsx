"use client";

import {
  ResponsiveContainer,
  ScatterChart as RCScatter,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import UniversalTooltip from "@/components/charts/UniversalTooltip"; 
import { IMPACTS } from "@/lib/types";
import type { Paper } from "@/lib/types";
import ChartTooltip from "./chart-tooltip";

const IMPACT_COLORS: Record<string, string> = {
  "High Impact": "#6366f1",
  "Medium Impact": "#22c55e",
  "Low Impact": "#f59e0b",
  Unknown: "#9ca3af",
};

// jitter generator
function jitterWithin(limit = 0.35) {
  return (Math.random() * 2 - 1) * limit;
}

export default function CitationsImpactScatter({ papers }: { papers: Paper[] }) {
  // ❤️ FIX: Include "citations" so the tooltip can read it
  const data = papers.map((p) => ({
    x: p.citations,
    citations: p.citations,   // ⭐ REQUIRED FOR TOOLTIP
    y: IMPACTS.indexOf(p.impact) + jitterWithin(),
    impact: p.impact,
    title: p.title,
  }));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RCScatter margin={{ top: 20, right: 25, bottom: 20, left: 45 }}>
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-axis */}
        <XAxis
          type="number"
          dataKey="x"
          tick={{ fontSize: 11, fontWeight: 600, fill: "#374151" }}
          label={{
            value: "Citations",
            position: "insideBottomRight",
            offset: -5,
            fill: "#374151",
            fontSize: 12,
            fontWeight: 600,
          }}
        />

        {/* Y-axis — row index + jitter */}
        <YAxis
          type="number"
          dataKey="y"
          domain={[-0.5, IMPACTS.length - 1 + 0.5]}
          tickFormatter={(v) => IMPACTS[Math.round(v)]}
          tick={{ fill: "#374151", fontSize: 12, fontWeight: 600 }}
        />

        {/* ⭐ UNIVERSAL TOOLTIP */}
        <Tooltip content={<ChartTooltip papers={papers} />} />

        <Scatter data={data}>
          {data.map((entry, i) => (
            <Cell key={i} fill={IMPACT_COLORS[entry.impact]} r={6} />
          ))}
        </Scatter>
      </RCScatter>
    </ResponsiveContainer>
  );
}