export type CreateInvoiceDTO = {
  id?: string;
  isPaid?: boolean;
  currency?: string;
  description?: string;
  studentId: number;
  amount: number;
};
