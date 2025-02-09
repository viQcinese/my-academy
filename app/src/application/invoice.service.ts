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

  async createInvoices(
    dto: CreateInvoicesDTO,
    userId: string
  ): Promise<number> {
    return await this.invoiceRepository.createInvoices(dto, userId);
  }

  async getInvoice(id: string, userId: string): Promise<Invoice | null> {
    return await this.invoiceRepository.findById(id, userId);
  }

  async listInvoices(userId: string): Promise<Invoice[]> {
    return await this.invoiceRepository.findAll(userId);
  }

  async deleteInvoices(ids: string[], userId: string): Promise<number> {
    const count = await this.invoiceRepository.deleteInvoices(ids, userId);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} invoices`);
    }

    return count;
  }

  async markInvoicesAsPaid(ids: string[], userId: string): Promise<number> {
    const count = await this.invoiceRepository.markInvoicesAsPaid(ids, userId);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} invoices`);
    }

    return count;
  }

  async markInvoicesAsUnpaid(ids: string[], userId: string): Promise<number> {
    const count = await this.invoiceRepository.markInvoicesAsUnpaid(
      ids,
      userId
    );

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} invoices`);
    }

    return count;
  }
}
