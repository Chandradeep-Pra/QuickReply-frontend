"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DOMAINS, STAGES, IMPACTS, type Domain, type Stage, type Impact } from "@/lib/types";
import { usePapers } from "@/lib/paper-context";

interface FormData {
  title: string;
  author: string;
  domain: Domain | "";
  stage: Stage | "";
  citations: string;
  impact: Impact | "";
  date: string;
}

const initialForm: FormData = {
  title: "",
  author: "",
  domain: "",
  stage: "",
  citations: "",
  impact: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function AddPaperPage() {
  const { addPaper } = usePapers();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.domain) newErrors.domain = "Domain is required";
    if (!form.stage) newErrors.stage = "Stage is required";
    if (form.citations === "" || Number(form.citations) < 0)
      newErrors.citations = "Citations must be 0 or more";
    if (!form.impact) newErrors.impact = "Impact is required";
    if (!form.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  await addPaper({
    title: form.title.trim(),
    author: form.author.trim(),
    domain: form.domain as Domain,
    stage: form.stage as Stage,
    citations: Number(form.citations),
    impact: form.impact as Impact,
    date: form.date,
  });

  setForm(initialForm);
  setShowSuccess(true);
}

  return (
    <Fade in timeout={400}>
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
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
              <NoteAddOutlinedIcon sx={{ color: "secondary.main", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.3 }}>
                Add Paper
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Add a new research paper to your library.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Section 1: Paper Details */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                mb: 2.5,
                display: "block",
              }}
            >
              Paper Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Paper Title"
                fullWidth
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="e.g., Deep Learning for Natural Language Understanding"
                size="small"
              />
              <TextField
                label="Author(s)"
                fullWidth
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
                error={!!errors.author}
                helperText={errors.author}
                placeholder="e.g., Dr. Jane Smith, Prof. John Doe"
                size="small"
              />
            </Box>
          </Box>

          {/* Section 2: Classification */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                mb: 2.5,
                display: "block",
              }}
            >
              Classification
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              <TextField
                select
                label="Domain"
                fullWidth
                value={form.domain}
                onChange={(e) => handleChange("domain", e.target.value)}
                error={!!errors.domain}
                helperText={errors.domain}
                size="small"
              >
                {DOMAINS.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Stage"
                fullWidth
                value={form.stage}
                onChange={(e) => handleChange("stage", e.target.value)}
                error={!!errors.stage}
                helperText={errors.stage}
                size="small"
              >
                {STAGES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* Section 3: Metrics */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                mb: 2.5,
                display: "block",
              }}
            >
              Metrics
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                gap: 2.5,
              }}
            >
              <TextField
                label="Citations"
                type="number"
                fullWidth
                value={form.citations}
                onChange={(e) => handleChange("citations", e.target.value)}
                error={!!errors.citations}
                helperText={errors.citations}
                slotProps={{ htmlInput: { min: 0 } }}
                size="small"
              />
              <TextField
                select
                label="Impact Level"
                fullWidth
                value={form.impact}
                onChange={(e) => handleChange("impact", e.target.value)}
                error={!!errors.impact}
                helperText={errors.impact}
                size="small"
              >
                {IMPACTS.map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                error={!!errors.date}
                helperText={errors.date}
                slotProps={{ inputLabel: { shrink: true } }}
                size="small"
              />
            </Box>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              bgcolor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              type="button"
              variant="text"
              onClick={() => router.push("/library")}
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
              }}
            >
              View Library
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: "secondary.main",
                "&:hover": { bgcolor: "secondary.dark" },
                px: 3.5,
                py: 1,
                fontWeight: 600,
              }}
            >
              Add Paper
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Paper added successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
}
