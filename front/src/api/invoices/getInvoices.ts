import { Invoice, InvoiceTableItem } from "@/model/Invoice";
import { Student } from "@/model/Student";
import { httpClient } from "../httpClient";

export async function getInvoices(
  students: Student[]
): Promise<InvoiceTableItem[]> {
  const invoices = await httpClient.get<Invoice[]>(`invoices`);

  return invoices.map((invoice) => ({
    invoice,
    student: students.find((student) => student.id === invoice.studentId),
  }));
}
