export async function fetchPapers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/papers`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch papers");
  return res.json();
}

export async function createPaperApi(paper: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/papers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paper),
  });

  if (!res.ok) throw new Error("Failed to add paper");
  return res.json();
}

export async function updatePaperApi(id: string, updates: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/papers/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );

  if (!res.ok) throw new Error("Failed to update paper");
  return res.json();
}

export async function deletePaperApi(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/papers/${id}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error("Failed to delete paper");
  return res.json();
}