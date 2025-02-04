import { PrismaClient } from "@prisma/client";
import { InvoiceRepository } from "../../model/invoice/invoice.repository";
import { Invoice } from "../../model/invoice/invoice.entity";

export class PrismaInvoiceRepository implements InvoiceRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany();
    return invoices.map((invoice) => new Invoice(invoice));
  }

  async findById(id: string): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    return invoice ? new Invoice(invoice) : null;
  }

  async createInvoice(dto: Invoice): Promise<Invoice> {
    const createdInvoice = await this.prisma.invoice.create({ data: dto });
    return new Invoice(createdInvoice);
  }

  async updateInvoice(id: string, invoice: Invoice): Promise<Invoice> {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: invoice,
    });

    return new Invoice(updatedInvoice);
  }

  async deleteInvoices(ids: string[]): Promise<void> {
    await this.prisma.invoice.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async markInvoicesAsPaid(ids: string[]): Promise<number> {
    const { count } = await this.prisma.invoice.updateMany({
      where: { id: { in: ids } },
      data: { isPaid: true },
    });
    return count;
  }

  async markInvoicesAsUnpaid(ids: string[]): Promise<number> {
    const { count } = await this.prisma.invoice.updateMany({
      where: { id: { in: ids } },
      data: { isPaid: false },
    });
    return count;
  }
}
