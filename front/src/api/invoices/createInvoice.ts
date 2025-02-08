import { CreateInvoiceForm } from "@/model/Invoice";

export async function createInvoice(form: CreateInvoiceForm): Promise<void> {
  const response = await fetch("http://localhost:3000/invoice", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
