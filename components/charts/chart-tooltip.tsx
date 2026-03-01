"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ChartTooltip({ active, payload, label, papers }) {
  if (!active || !payload || payload.length === 0) return null;

  const p = payload[0];            // recharts wrapper
  const entry = p?.payload || {};  // actual data point

  // Detect chart type
  const isFunnel = entry?.name && typeof entry?.value === "number";
  const isScatter = entry?.title && entry?.citations !== undefined;
  const isBar = entry?.domain;

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 1.5,
        border: "1px solid #e5e7eb",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
        maxWidth: 260,
      }}
    >
      {isFunnel && renderFunnel(entry, papers)}
      {isScatter && renderScatter(entry)}
      {isBar && renderBar(entry)}

      {!isFunnel && !isScatter && !isBar && (
        <Typography fontSize="0.75rem">No data available</Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------
   FUNNEL TOOLTIP: Shows papers for the stage
------------------------------------------- */
function renderFunnel(entry, papers) {
  const stage = entry.name; // Funnel always passes "name"
  const stagePapers = papers.filter((p) => p.stage === stage);

  return (
    <>
      <Typography
        sx={{ fontSize: "0.8rem", fontWeight: 700, mb: 1 }}
      >
        {stage} — {stagePapers.length} papers
      </Typography>

      {stagePapers.slice(0, 4).map((p) => (
        <Typography
          key={p.id}
          sx={{
            fontSize: "0.75rem",
            mb: 0.4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          • {p.title}
        </Typography>
      ))}

      {stagePapers.length > 4 && (
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.6 }}>
          +{stagePapers.length - 4} more…
        </Typography>
      )}
    </>
  );
}

/* ------------------------------------------
   SCATTER TOOLTIP: Paper title + citations
------------------------------------------- */
function renderScatter(entry) {
  return (
    <>
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, mb: 1 }}>
        {entry.title}
      </Typography>

      <Typography sx={{ fontSize: "0.75rem", mb: 0.4 }}>
        Citations: <b>{entry.citations}</b>
      </Typography>

      <Typography sx={{ fontSize: "0.75rem", mb: 0.4 }}>
        Impact: <b>{entry.impact}</b>
      </Typography>
    </>
  );
}

/* ------------------------------------------
   BAR TOOLTIP: Stage counts per domain
------------------------------------------- */
function renderBar(entry) {
  const domain = entry.domain;

  return (
    <>
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, mb: 1 }}>
        {domain}
      </Typography>

      {Object.entries(entry)
        .filter(([k]) => k !== "domain")
        .map(([stage, count]) => (
          <Typography
            key={stage}
            sx={{ fontSize: "0.75rem", mb: 0.4 }}
          >
            {stage}: <b>{count}</b>
          </Typography>
        ))}
    </>
  );
}
