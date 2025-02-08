import { Student } from "./Student";

export type Invoice = {
  id: number;
  studentId: number;
  amount: number;
  currency: string;
  createdAt: string;
  dueAt: string;
  isPaid: boolean;
  description?: string;
};

export type InvoiceTableItem = {
  invoice: Invoice;
  student?: Student;
};
