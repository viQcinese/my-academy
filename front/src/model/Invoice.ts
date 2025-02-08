export type Invoice = {
  id: number;
  studentId: number;
  amount: number;
  currency: string;
  createdAt: string;
  dueAt: string;
  description?: string;
};
