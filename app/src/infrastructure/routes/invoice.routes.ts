import { Router } from "express";
import { prisma } from "../db/prisma.client";
import { PrismaInvoiceRepository } from "../repositories/prisma.invoice.repository";
import { InvoiceService } from "../../application/invoice.service";
import { InvoiceController } from "../controllers/invoice.controller";

const invoiceRepository = new PrismaInvoiceRepository(prisma);
const invoiceService = new InvoiceService(invoiceRepository);
const invoiceController = new InvoiceController(invoiceService);

const invoiceRoutes = Router();

invoiceRoutes.post("/", (req, res) =>
  invoiceController.createInvoices(req, res)
);
invoiceRoutes.get("/", (req, res) => invoiceController.listInvoices(req, res));
invoiceRoutes.get("/:id", (req, res) => invoiceController.getInvoice(req, res));
invoiceRoutes.post("/mark-as-paid", (req, res) =>
  invoiceController.markInvoicesAsPaid(req, res)
);
invoiceRoutes.post("/mark-as-unpaid", (req, res) =>
  invoiceController.markInvoicesAsUnpaid(req, res)
);

export { invoiceRoutes };
