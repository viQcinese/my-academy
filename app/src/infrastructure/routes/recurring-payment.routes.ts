import { Router } from "express";
import { prisma } from "../db/prisma.client";
import { PrismaRecurringPaymentRepository } from "../repositories/prisma.recurring-payment.repository";
import { RecurringPaymentService } from "../../application/recurring-payment.service";
import { RecurringPaymentController } from "../controllers/recurring-payment.controller";

const recurringPaymentsRepository = new PrismaRecurringPaymentRepository(
  prisma
);
const recurringPaymentService = new RecurringPaymentService(
  recurringPaymentsRepository
);
const recurringPaymentController = new RecurringPaymentController(
  recurringPaymentService
);

const recurringPaymentRoutes = Router();

recurringPaymentRoutes.post("/", (req, res, next) =>
  recurringPaymentController.createRecurringPayment(req, res, next)
);
recurringPaymentRoutes.get("/", (req, res, next) =>
  recurringPaymentController.listRecurringPayments(req, res, next)
);

export { recurringPaymentRoutes };
