"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

const navItems = [
  { label: "Add Paper", href: "/add-paper", icon: NoteAddOutlinedIcon },
  { label: "Library", href: "/library", icon: LibraryBooksOutlinedIcon },
  { label: "Analytics", href: "/analytics", icon: BarChartOutlinedIcon },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1.5,
                bgcolor: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 0.5,
              }}
            >
              <ScienceOutlinedIcon sx={{ color: "#FFFFFF", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              component={Link}
              href="/library"
              sx={{
                color: "text.primary",
                textDecoration: "none",
                fontWeight: 700,
                mr: 4,
              }}
            >
              PaperTrail
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    startIcon={<Icon sx={{ fontSize: 18 }} />}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      color: isActive ? "secondary.main" : "text.secondary",
                      bgcolor: isActive ? "rgba(37, 99, 235, 0.08)" : "transparent",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.875rem",
                      "&:hover": {
                        bgcolor: isActive
                          ? "rgba(37, 99, 235, 0.12)"
                          : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
