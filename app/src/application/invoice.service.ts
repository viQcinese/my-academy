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

  async markAsPaid(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) throw new Error("Invoice not found");

    invoice.markAsPaid();

    return await this.invoiceRepository.updateInvoice(id, invoice);
  }

  async markAsUnpaid(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) throw new Error("Invoice not found");

    invoice.markAsUnpaid();

    return await this.invoiceRepository.updateInvoice(id, invoice);
  }
}
