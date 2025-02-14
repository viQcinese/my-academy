import { Router } from "express";
import { prisma } from "../db/prisma.client";
import { PrismaInvoiceRepository } from "../repositories/prisma.invoice.repository";
import { InvoiceService } from "../../application/invoice.service";
import { InvoiceController } from "../controllers/invoice.controller";

const invoiceRepository = new PrismaInvoiceRepository(prisma);
const invoiceService = new InvoiceService(invoiceRepository);
const invoiceController = new InvoiceController(invoiceService);

const invoiceRoutes = Router();

invoiceRoutes.post("/", (req, res, next) =>
  invoiceController.createInvoices(req, res, next)
);
invoiceRoutes.get("/", (req, res, next) =>
  invoiceController.listInvoices(req, res, next)
);
invoiceRoutes.get("/:id", (req, res, next) =>
  invoiceController.getInvoice(req, res, next)
);
invoiceRoutes.post("/mark-as-paid", (req, res, next) =>
  invoiceController.markInvoicesAsPaid(req, res, next)
);
invoiceRoutes.post("/mark-as-unpaid", (req, res, next) =>
  invoiceController.markInvoicesAsUnpaid(req, res, next)
);

export { invoiceRoutes };
