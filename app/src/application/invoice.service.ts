import { InvoiceRepository } from "../model/invoice/invoice.repository";
import { CreateInvoiceDTO } from "../model/invoice/invoice.dto";
import { Invoice } from "../model/invoice/invoice.entity";

export class InvoiceService {
  private invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async createInvoice(dto: CreateInvoiceDTO): Promise<Invoice> {
    const invoice = new Invoice(dto);
    return await this.invoiceRepository.createInvoice(invoice);
  }

  async getInvoice(id: string): Promise<Invoice | null> {
    return await this.invoiceRepository.findById(id);
  }

  async listInvoices(): Promise<Invoice[]> {
    return await this.invoiceRepository.findAll();
  }

  async deleteInvoices(ids: string[]): Promise<void> {
    return await this.invoiceRepository.deleteInvoices(ids);
  }

  async markInvoicesAsPaid(ids: string[]): Promise<void> {
    const count = await this.invoiceRepository.markInvoicesAsPaid(ids);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} invoices`);
    }
  }

  async markInvoicesAsUnpaid(ids: string[]): Promise<void> {
    const count = await this.invoiceRepository.markInvoicesAsUnpaid(ids);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} invoices`);
    }
  }
}
