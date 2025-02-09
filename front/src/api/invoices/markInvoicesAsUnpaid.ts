import { httpClient } from "../httpClient";

export async function markInvoicesAsUnaid(ids: string[]): Promise<void> {
  return httpClient.post(`invoices/mark-as-unpaid`, {
    body: { ids },
  });
}
