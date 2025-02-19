import { RecurringPayment } from "../model/recurring-payment/recurring-payment.entity";
import { RecurringPaymentRepository } from "../model/recurring-payment/recurring-payment.repository";

export class RecurringPaymentService {
  private recurringPaymentRepository: RecurringPaymentRepository;

  constructor(recurringPaymentRepository: RecurringPaymentRepository) {
    this.recurringPaymentRepository = recurringPaymentRepository;
  }

  async createRecurringPayment(
    dto: CreateRecurringPaymentDTO,
    userId: string
  ): Promise<RecurringPayment> {
    const recurringPayment = new RecurringPayment(dto);
    const createdRecurringPayment =
      await this.recurringPaymentRepository.create(recurringPayment, userId);
    return new RecurringPayment(createdRecurringPayment);
  }

  async listRecurringPayment(userId: string): Promise<RecurringPayment[]> {
    return await this.recurringPaymentRepository.findAll(userId);
  }
}
