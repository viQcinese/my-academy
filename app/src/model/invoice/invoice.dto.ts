export type CreateInvoiceDTO = {
  id?: string;
  isPaid?: boolean;
  currency?: string;
  description?: string | null;
  dueAt?: Date | null;
  createdAt?: Date;
  studentId: number;
  amount: number;
};

export type CreateInvoicesDTO = {
  amount: number;
  studentIds: number[];
  description?: string;
  dueAt?: Date;
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
