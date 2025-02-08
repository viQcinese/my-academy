export async function markInvoicesAsUnaid(ids: string[]): Promise<void> {
  const response = await fetch(
    "http://localhost:3000/invoices/mark-as-unpaid",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
