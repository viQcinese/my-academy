import { InvoiceRepository } from "../model/invoice/invoice.repository";
import {
  CreateInvoiceDTO,
  CreateInvoicesDTO,
} from "../model/invoice/invoice.dto";
import { Invoice } from "../model/invoice/invoice.entity";

export class InvoiceService {
  private invoiceRepository: InvoiceRepository;

  constructor(invoiceRepository: InvoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  async createInvoices(dto: CreateInvoicesDTO): Promise<void> {
    return await this.invoiceRepository.createInvoices(dto);
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
