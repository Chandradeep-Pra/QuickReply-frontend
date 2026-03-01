"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

import type { Paper } from "./types";
import {
  fetchPapers,
  createPaperApi,
  updatePaperApi,
  deletePaperApi,
} from "@/hooks/usePapers";

interface PaperContextValue {
  papers: Paper[];
  addPaper: (paper: Omit<Paper, "id">) => Promise<void>;
  editPaper: (id: string, updated: Partial<Paper>) => Promise<void>;
  removePaper: (id: string) => Promise<void>;
}

const PaperContext = createContext<PaperContextValue | undefined>(undefined);

export function PaperProvider({ children }: { children: ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>([]);

  // Load papers from backend
  useEffect(() => {
    async function load() {
      const data = await fetchPapers();
      setPapers(data);
    }
    load();
  }, []);

  // ADD
  const addPaper = useCallback(async (paper: Omit<Paper, "id">) => {
    const newPaper = await createPaperApi(paper);
    setPapers((prev) => [...prev, newPaper]);
  }, []);

  // EDIT
  const editPaper = useCallback(async (id: string, updated: Partial<Paper>) => {
    const newData = await updatePaperApi(id, updated);
    setPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...newData } : p))
    );
  }, []);

  // DELETE
  const removePaper = useCallback(async (id: string) => {
    await deletePaperApi(id);
    setPapers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PaperContext.Provider
      value={{ papers, addPaper, editPaper, removePaper }}
    >
      {children}
    </PaperContext.Provider>
  );
}

export function usePapers() {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error("usePapers must be used within a PaperProvider");
  }
  return context;
}
