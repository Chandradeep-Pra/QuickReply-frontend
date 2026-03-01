"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import type { Paper as PaperType } from "@/lib/types";
import { STAGES, DOMAINS } from "@/lib/types";

const stageBarColors: Record<string, string> = {
  Idea: "#94A3B8",
  Draft: "#60A5FA",
  Submitted: "#A78BFA",
  "Under Review": "#FBBF24",
  Accepted: "#34D399",
  Published: "#2563EB",
};

interface Props {
  papers: PaperType[];
}

export default function SummaryCards({ papers }: Props) {
  const total = papers.length;
  const published = papers.filter((p) => p.stage === "Published" || p.stage === "Accepted").length;
  const completionRate = total > 0 ? ((published / total) * 100).toFixed(1) : "0.0";
  const totalCitations = papers.reduce((sum, p) => sum + p.citations, 0);

  const stageCounts = STAGES.map((stage) => ({
    stage,
    count: papers.filter((p) => p.stage === stage).length,
  }));

  const avgCitationsByDomain = DOMAINS.map((domain) => {
    const domainPapers = papers.filter((p) => p.domain === domain);
    const avg =
      domainPapers.length > 0
        ? domainPapers.reduce((sum, p) => sum + p.citations, 0) / domainPapers.length
        : 0;
    return { domain, avg: Math.round(avg) };
  }).sort((a, b) => b.avg - a.avg);

  const maxAvg = Math.max(...avgCitationsByDomain.map((d) => d.avg), 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      {/* Top-level KPIs in a row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        {[
          { label: "Total Papers", value: total, color: "#2563EB" },
          { label: "Total Citations", value: totalCitations.toLocaleString(), color: "#A78BFA" },
          { label: "Completion Rate", value: `${completionRate}%`, color: "#34D399" },
          { label: "Published + Accepted", value: published, color: "#F59E0B" },
        ].map((stat) => (
          <Paper
            key={stat.label}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
              borderRadius: 2.5,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                bgcolor: stat.color,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                mt: 0.5,
              }}
            >
              {stat.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Stage Breakdown */}
      <Paper sx={{ p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2.5, flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "text.primary", fontSize: "0.8rem" }}>
          Papers by Stage
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {stageCounts.map((item) => {
            const pct = total > 0 ? (item.count / total) * 100 : 0;
            return (
              <Box key={item.stage}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary", fontSize: "0.8rem" }}>
                    {item.stage}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem", fontVariantNumeric: "tabular-nums" }}>
                    {item.count}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#F1F5F9",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: stageBarColors[item.stage],
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Avg Citations by Domain */}
      <Paper sx={{ p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2.5, flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "text.primary", fontSize: "0.8rem" }}>
          Avg Citations by Domain
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {avgCitationsByDomain.map((item, i) => (
            <Box key={item.domain}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.25 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.domain}
                  </Typography>
                </Box>
                <Box sx={{ width: 80, flexShrink: 0 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(item.avg / maxAvg) * 100}
                    sx={{
                      height: 5,
                      borderRadius: 3,
                      bgcolor: "#F1F5F9",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#2563EB",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "secondary.main",
                    fontSize: "0.8rem",
                    fontVariantNumeric: "tabular-nums",
                    width: 36,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {item.avg}
                </Typography>
              </Box>
              {i < avgCitationsByDomain.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
