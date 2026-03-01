"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import TableSortLabel from "@mui/material/TableSortLabel";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import { format, subDays, subMonths, isAfter } from "date-fns";
import {
  DOMAINS,
  STAGES,
  IMPACTS,
  type Domain,
  type Stage,
  type Impact,
} from "@/lib/types";
import { usePapers } from "@/lib/paper-context";

type DateFilter = "all" | "week" | "month" | "3months";
type SortField = "title" | "author" | "domain" | "stage" | "citations" | "impact" | "date";
type SortDir = "asc" | "desc";

const impactColor: Record<Impact, "default" | "info" | "warning" | "error"> = {
  "Low Impact": "default",
  "Medium Impact": "info",
  "High Impact": "warning",
  "Unknown": "error",
};

const stageColor: Record<Stage, string> = {
  "Abstract Read": "#94A3B8",
  "Introduction Done": "#60A5FA",
  "Methodology Done": "#A78BFA",
  "Results Analyzed": "#FBBF24",
  "Fully Read": "#34D399",
  "Notes Completed": "#2563EB",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
    },
  },
};


export default function LibraryPage() {
  const { papers } = usePapers();
  const [domainFilter, setDomainFilter] = useState<Domain[]>([]);
  const [stageFilter, setStageFilter] = useState<Stage[]>([]);
  const [impactFilter, setImpactFilter] = useState<Impact[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filteredPapers = useMemo(() => {
    const now = new Date();
    let cutoff: Date | null = null;
    if (dateFilter === "week") cutoff = subDays(now, 7);
    else if (dateFilter === "month") cutoff = subMonths(now, 1);
    else if (dateFilter === "3months") cutoff = subMonths(now, 3);

    return papers
      .filter((p) => {
        if (domainFilter.length > 0 && !domainFilter.includes(p.domain)) return false;
        if (stageFilter.length > 0 && !stageFilter.includes(p.stage)) return false;
        if (impactFilter.length > 0 && !impactFilter.includes(p.impact)) return false;
        if (cutoff && !isAfter(new Date(p.date), cutoff)) return false;
        return true;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortField === "citations") return (a.citations - b.citations) * dir;
        if (sortField === "date") return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
        const aVal = a[sortField];
        const bVal = b[sortField];
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
  }, [papers, domainFilter, stageFilter, impactFilter, dateFilter, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function handleMultiSelect<T extends string>(
    event: SelectChangeEvent<T[]>,
    setter: (v: T[]) => void
  ) {
    const value = event.target.value;
    setter((typeof value === "string" ? value.split(",") : value) as T[]);
  }

  function clearFilters() {
    setDomainFilter([]);
    setStageFilter([]);
    setImpactFilter([]);
    setDateFilter("all");
  }

  const hasFilters =
    domainFilter.length > 0 ||
    stageFilter.length > 0 ||
    impactFilter.length > 0 ||
    dateFilter !== "all";

  return (
    <Fade in timeout={400}>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "rgba(37, 99, 235, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LibraryBooksOutlinedIcon sx={{ color: "secondary.main", fontSize: 22 }} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.3 }}>
                  Library
                </Typography>
                <Chip
                  label={`${filteredPapers.length} paper${filteredPapers.length !== 1 ? "s" : ""}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.08)",
                    color: "secondary.main",
                    fontWeight: 600,
                    height: 24,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Browse and filter your research paper collection.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Filters */}
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <FilterListIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600 }}>
              Filters
            </Typography>
            {hasFilters && (
              <Button size="small" onClick={clearFilters} sx={{ ml: "auto", color: "secondary.main" }}>
                Clear All
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Domain</InputLabel>
              <Select
                multiple
                value={domainFilter}
                onChange={(e) => handleMultiSelect(e, setDomainFilter)}
                input={<OutlinedInput label="Domain" />}
                renderValue={(selected) =>
                  selected.length === 1 ? selected[0] : `${selected.length} selected`
                }
                MenuProps={MenuProps}
              >
                {DOMAINS.map((d) => (
                  <MenuItem key={d} value={d}>
                    <Checkbox checked={domainFilter.includes(d)} size="small" />
                    <ListItemText primary={d} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Stage</InputLabel>
              <Select
                multiple
                value={stageFilter}
                onChange={(e) => handleMultiSelect(e, setStageFilter)}
                input={<OutlinedInput label="Stage" />}
                renderValue={(selected) =>
                  selected.length === 1 ? selected[0] : `${selected.length} selected`
                }
                MenuProps={MenuProps}
              >
                {STAGES.map((s) => (
                  <MenuItem key={s} value={s}>
                    <Checkbox checked={stageFilter.includes(s)} size="small" />
                    <ListItemText primary={s} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Impact</InputLabel>
              <Select
                multiple
                value={impactFilter}
                onChange={(e) => handleMultiSelect(e, setImpactFilter)}
                input={<OutlinedInput label="Impact" />}
                renderValue={(selected) =>
                  selected.length === 1 ? selected[0] : `${selected.length} selected`
                }
                MenuProps={MenuProps}
              >
                {IMPACTS.map((i) => (
                  <MenuItem key={i} value={i}>
                    <Checkbox checked={impactFilter.includes(i)} size="small" />
                    <ListItemText primary={i} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                label="Date Range"
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {(
                  [
                    { id: "title", label: "Title" },
                    { id: "author", label: "Author" },
                    { id: "domain", label: "Domain" },
                    { id: "stage", label: "Stage" },
                    { id: "citations", label: "Citations" },
                    { id: "impact", label: "Impact" },
                    { id: "date", label: "Date" },
                  ] as const
                ).map((col) => (
                  <TableCell key={col.id}>
                    <TableSortLabel
                      active={sortField === col.id}
                      direction={sortField === col.id ? sortDir : "asc"}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPapers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      No papers match the current filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPapers.map((paper) => (
                  <TableRow
                    key={paper.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ maxWidth: 280, fontWeight: 500 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 280,
                        }}
                      >
                        {paper.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{paper.author}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{paper.domain}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={paper.stage}
                        size="small"
                        sx={{
                          bgcolor: `${stageColor[paper.stage]}18`,
                          color: stageColor[paper.stage],
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                        {paper.citations.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={paper.impact}
                        size="small"
                        color={impactColor[paper.impact]}
                        variant="outlined"
                        sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {format(new Date(paper.date), "MMM d, yyyy")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
}
