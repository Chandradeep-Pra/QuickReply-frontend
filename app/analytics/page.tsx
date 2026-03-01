"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import StageFunnelChart from "@/components/charts/funnel-chart";
import CitationsImpactScatter from "@/components/charts/scatter-chart";
import DomainStageStackedBar from "@/components/charts/stacked-bar-chart";
import SummaryCards from "@/components/charts/summary-cards";
import { usePapers } from "@/lib/paper-context";

// ----------------------
// Reusable Dashboard Card
// ----------------------
function DashboardCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 280,
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.2 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Divider />

      <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
    </Paper>
  );
}

// ----------------------
// MAIN PAGE
// ----------------------


export default function AnalyticsPage() {
  const { papers } = usePapers();

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* ---------------- HEADER ---------------- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(100,100,240,0.25)",
            }}
          >
            <BarChartOutlinedIcon sx={{ color: "white" }} />
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Analytics Dashboard
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Insights into your research progress & performance
            </Typography>
          </Box>
        </Box>

        {/* ---------------- SUMMARY ---------------- */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "white",
          }}
        >
          <SummaryCards papers={papers} />
        </Paper>

        {/* ---------------- MAIN CHARTS ---------------- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 3,
          }}
        >
          <DashboardCard
            title="Research Pipeline"
            subtitle="Paper distribution across reading stages"
          >
            <StageFunnelChart papers={papers} />
          </DashboardCard>

          <DashboardCard
            title="Citations vs Impact"
            subtitle="Impact level compared with number of citations"
          >
            <CitationsImpactScatter papers={papers} />
          </DashboardCard>
        </Box>

        {/* ---------------- DOMAIN BREAKDOWN ---------------- */}
        <DashboardCard
          title="Domain Breakdown"
          subtitle="Reading stages across different research domains"
        >
          <DomainStageStackedBar papers={papers} />
        </DashboardCard>
      </Box>
    </Fade>
  );
}
