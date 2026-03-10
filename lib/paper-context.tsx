"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import type { Paper } from "./types";
import { mockPapers } from "./mock-data";

interface PaperContextValue {
  papers: Paper[];
  addPaper: (paper: Omit<Paper, "id">) => Promise<void>;
  editPaper: (id: string, updated: Partial<Paper>) => Promise<void>;
  removePaper: (id: string) => Promise<void>;
}

const PaperContext = createContext<PaperContextValue | undefined>(undefined);

export function PaperProvider({ children }: { children: ReactNode }) {
  
  // Initialize directly from mock data
  const [papers, setPapers] = useState<Paper[]>(mockPapers);

  // ADD
  const addPaper = useCallback(async (paper: Omit<Paper, "id">) => {
    const newPaper: Paper = {
      ...paper,
      id: crypto.randomUUID(),
    };

    setPapers((prev) => [...prev, newPaper]);
  }, []);

  // EDIT
  const editPaper = useCallback(async (id: string, updated: Partial<Paper>) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  }, []);

  // DELETE
  const removePaper = useCallback(async (id: string) => {
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