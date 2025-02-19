import { PrismaClient } from "@prisma/client";
import { RecurringPaymentRepository } from "../../model/recurring-payment/recurring-payment.repository";
import { RecurringPayment } from "../../model/recurring-payment/recurring-payment.entity";

export class PrismaRecurringPaymentRepository
  implements RecurringPaymentRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(userId: string): Promise<RecurringPayment[]> {
    const recurringPayments = await this.prisma.recurringPayment.findMany({
      where: { userId },
      orderBy: [{ name: "asc" }, { amount: "desc" }],
    });
    return recurringPayments.map((data) => new RecurringPayment(data));
  }

  async create(
    recurringPayment: RecurringPayment,
    userId: string
  ): Promise<RecurringPayment> {
    const createdRecurringPayment = await this.prisma.recurringPayment.create({
      data: {
        userId,
        name: recurringPayment.name,
        amount: recurringPayment.amount,
        currency: recurringPayment.currency,
        frequency: recurringPayment.frequency,
      },
    });

    return new RecurringPayment(createdRecurringPayment);
  }
}
