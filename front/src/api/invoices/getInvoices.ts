import { Invoice, InvoiceTableItem } from "@/model/Invoice";
import { Student } from "@/model/Student";

export async function getInvoices(
  students: Student[]
): Promise<InvoiceTableItem[]> {
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

  const invoices: Invoice[] = await response.json();

  return invoices.map((invoice) => ({
    invoice,
    student: students.find((student) => student.id === invoice.studentId),
  }));
}
