"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const navItems = [
  { label: "Add Paper", href: "/add-paper", icon: NoteAddOutlinedIcon },
  { label: "Library", href: "/library", icon: LibraryBooksOutlinedIcon },
  { label: "Analytics", href: "/analytics", icon: BarChartOutlinedIcon },
];

export default function SideNavLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const width = collapsed ? 72 : 240;

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.50" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width,
          transition: "width 0.25s ease",
          bgcolor: "white",
          borderRight: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ScienceOutlinedIcon color="secondary" />
              <Typography fontWeight={700}>PaperTrail</Typography>
            </Box>
          )}

          <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Box>

        <Divider />

        {/* Navigation */}
        <Box sx={{ mt: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const content = (
              <Box
                component={Link}
                href={item.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: collapsed ? 0 : 2,
                  px: collapsed ? 0 : 2.5,
                  py: 1.4,
                  mx: 1,
                  borderRadius: 2,
                  textDecoration: "none",
                  color: isActive ? "secondary.main" : "text.secondary",
                  bgcolor: isActive ? "rgba(99,102,241,0.1)" : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(99,102,241,0.12)",
                  },
                }}
              >
                <Icon fontSize="small" />

                {!collapsed && (
                  <Typography
                    fontSize="0.9rem"
                    fontWeight={isActive ? 700 : 500}
                  >
                    {item.label}
                  </Typography>
                )}
              </Box>
            );

            return collapsed ? (
              <Tooltip key={item.href} title={item.label} placement="right">
                {content}
              </Tooltip>
            ) : (
              <Box key={item.href}>{content}</Box>
            );
          })}
        </Box>

        <Box sx={{ flex: 1 }} />

        {!collapsed && (
          <Typography variant="caption" sx={{ opacity: 0.5, p: 2 }}>
            © {new Date().getFullYear()} PaperTrail
          </Typography>
        )}
      </Box>

      {/* Main */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
        {children}
      </Box>
    </Box>
  );
}