import { CreateInvoiceForm } from "@/model/Invoice";
import { httpClient } from "../httpClient";

export async function createInvoice(form: CreateInvoiceForm): Promise<void> {
  return httpClient.post(`invoices`, {
    body: { ...form, studentIds: form.studentIds.map((id) => Number(id)) },
  });
}
