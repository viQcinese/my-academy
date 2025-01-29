import { Router } from "express";
import { prisma } from "../db/prisma.client";
import { PrismaInvoiceRepository } from "../repositories/prisma.invoce.repository";
import { InvoiceService } from "../../application/invoice.service";
import { InvoiceController } from "../controllers/invoice.controller";

const invoiceRepository = new PrismaInvoiceRepository(prisma);
const invoiceService = new InvoiceService(invoiceRepository);
const invoiceController = new InvoiceController(invoiceService);

const invoiceRoutes = Router();

invoiceRoutes.post("/", (req, res) =>
  invoiceController.createInvoice(req, res)
);
invoiceRoutes.get("/", (req, res) => invoiceController.listInvoices(req, res));
invoiceRoutes.get("/:id", (req, res) => invoiceController.getInvoice(req, res));
invoiceRoutes.post("/:id/mark-as-paid", (req, res) =>
  invoiceController.markAsPaid(req, res)
);
invoiceRoutes.post("/:id/mark-as-unpaid", (req, res) =>
  invoiceController.markAsUnpaid(req, res)
);

export { invoiceRoutes };
