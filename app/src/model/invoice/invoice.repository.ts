import { CreateInvoicesDTO } from "./invoice.dto";
import { Invoice } from "./invoice.entity";

export interface InvoiceRepository {
  findAll(userId: string): Promise<Invoice[]>;
  findById(id: string, userId: string): Promise<Invoice | null>;
  createInvoices(dto: CreateInvoicesDTO, userId: string): Promise<number>;
  updateInvoice(id: string, invoice: Invoice, userId: string): Promise<Invoice>;
  deleteInvoices(id: string[], userId: string): Promise<number>;
  markInvoicesAsPaid(ids: string[], userId: string): Promise<number>;
  markInvoicesAsUnpaid(ids: string[], userId: string): Promise<number>;
}
