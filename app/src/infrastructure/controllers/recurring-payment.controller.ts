import { NextFunction, Request, Response } from "express";
import { ErrorHandled } from "../decorators/ErrorHandled";
import { RecurringPaymentService } from "../../application/recurring-payment.service";
import { RecurringPayment } from "../../model/recurring-payment/recurring-payment.entity";

export class RecurringPaymentController {
  private recurringPaymentService: RecurringPaymentService;

  constructor(recurringPaymentService: RecurringPaymentService) {
    this.recurringPaymentService = recurringPaymentService;
  }

  @ErrorHandled()
  async createRecurringPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, amount, currency } = req.body;
    const userId = req.auth.sub;

    const recurringPayment =
      await this.recurringPaymentService.createRecurringPayment(
        new RecurringPayment({ name, amount }),
        userId
      );

    res.status(201).json({ recurringPayment });
  }

  @ErrorHandled()
  async listRecurringPayments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.auth.sub;

    const invoices = await this.recurringPaymentService.listRecurringPayment(
      userId
    );
    res.status(200).json(invoices);
  }
}
