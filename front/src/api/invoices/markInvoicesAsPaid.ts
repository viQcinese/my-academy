import { httpClient } from "../httpClient";

export async function markInvoicesAsPaid(ids: string[]): Promise<void> {
  return httpClient.post(`invoices/mark-as-paid`, {
    body: { ids },
  });
}
