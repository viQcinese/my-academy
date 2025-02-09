import { PrismaClient } from "@prisma/client";
import { InvoiceRepository } from "../../model/invoice/invoice.repository";
import { Invoice } from "../../model/invoice/invoice.entity";
import { CreateInvoicesDTO } from "../../model/invoice/invoice.dto";

export class PrismaInvoiceRepository implements InvoiceRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(userId: string): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { userId },
      orderBy: [
        { isPaid: "asc" },
        { dueAt: { sort: "asc", nulls: "last" } },
        { student: { firstName: "asc" } },
      ],
    });
    return invoices.map((invoice) => new Invoice(invoice));
  }

  async findById(id: string, userId: string): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { userId, id },
    });
    return invoice ? new Invoice(invoice) : null;
  }

  async createInvoices(
    dto: CreateInvoicesDTO,
    userId: string
  ): Promise<number> {
    const { amount, studentIds, description, dueAt } = dto;
    const { count } = await this.prisma.invoice.createMany({
      data: studentIds.map((studentId) => ({
        userId,
        studentId,
        amount,
        description,
        dueAt: dueAt ? new Date(dueAt) : undefined,
        isPaid: false,
        currency: "BRL",
      })),
      skipDuplicates: true,
    });
    return count;
  }

  async updateInvoice(
    id: string,
    invoice: Invoice,
    userId: string
  ): Promise<Invoice> {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { userId, id },
      data: invoice,
    });

    return new Invoice(updatedInvoice);
  }

  async deleteInvoices(ids: string[], userId: string): Promise<number> {
    const { count } = await this.prisma.invoice.deleteMany({
      where: { userId, id: { in: ids } },
    });
    return count;
  }

  async markInvoicesAsPaid(ids: string[], userId: string): Promise<number> {
    const { count } = await this.prisma.invoice.updateMany({
      where: { userId, id: { in: ids } },
      data: { isPaid: true },
    });
    return count;
  }

  async markInvoicesAsUnpaid(ids: string[], userId: string): Promise<number> {
    const { count } = await this.prisma.invoice.updateMany({
      where: { userId, id: { in: ids } },
      data: { isPaid: false },
    });
    return count;
  }
}
