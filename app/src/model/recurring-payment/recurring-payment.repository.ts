import { RecurringPayment } from "./recurring-payment.entity";

export interface RecurringPaymentRepository {
  findAll(userId: string): Promise<RecurringPayment[]>;
  create(
    recurringPayment: RecurringPayment,
    userId: string
  ): Promise<RecurringPayment>;
}
