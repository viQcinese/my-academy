export type CreateInvoiceDTO = {
  id?: string;
  isPaid?: boolean;
  currency?: string;
  studentId: number;
  amount: number;
};
