export type CreateInvoiceDTO = {
  id?: string;
  isPaid?: boolean;
  currency?: string;
  description?: string | null;
  dueDate?: Date | null;
  createdAt?: Date;
  studentId: number;
  amount: number;
};

export type ShowInvoiceDTO = {
  id: number;
  studentId: number;
  amount: number;
  isPaid: boolean;
  currency: string;
  createdAt: Date;
  description?: string;
  dueAt?: Date;
};
