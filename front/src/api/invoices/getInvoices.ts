import { Invoice } from "@/model/Invoice";

export async function getInvoices(): Promise<Invoice[]> {
  const response = await fetch("http://localhost:3000/invoices", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
