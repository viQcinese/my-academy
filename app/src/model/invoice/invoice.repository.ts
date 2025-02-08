import { CreateInvoicesDTO } from "./invoice.dto";
import { Invoice } from "./invoice.entity";

export interface InvoiceRepository {
  findAll(): Promise<Invoice[]>;
  findById(id: string): Promise<Invoice | null>;
  createInvoices(dto: CreateInvoicesDTO): Promise<void>;
  updateInvoice(id: string, invoice: Invoice): Promise<Invoice>;
  deleteInvoices(id: string[]): Promise<void>;
  markInvoicesAsPaid(ids: string[]): Promise<number>;
  markInvoicesAsUnpaid(ids: string[]): Promise<number>;
}
