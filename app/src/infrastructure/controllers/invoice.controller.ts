import { InvoiceService } from "../../application/invoice.service";
import { Request, Response } from "express";

export class InvoiceController {
  private invoiceService: InvoiceService;

  constructor(invoiceService: InvoiceService) {
    this.invoiceService = invoiceService;
  }

  async createInvoice(req: Request, res: Response): Promise<void> {
    const { amount, studentId, description } = req.body;

    if (!amount || !studentId) {
      res.status(400).json({ error: "amount and studentId are required" });
      return;
    }

    const student = await this.invoiceService.createInvoice({
      amount,
      studentId,
      description,
    });

    res.status(201).json(student);
  }

  async listInvoices(req: Request, res: Response): Promise<void> {
    const invoices = await this.invoiceService.listInvoices();
    res.status(200).json(invoices);
  }

  async getInvoice(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const invoice = await this.invoiceService.getInvoice(id);
    res.status(200).json(invoice);
  }

  async markInvoicesAsPaid(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;
    const invoice = await this.invoiceService.markInvoicesAsPaid(ids);
    res.status(200).json(invoice);
  }

  async markInvoicesAsUnpaid(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;
    const invoice = await this.invoiceService.markInvoicesAsUnpaid(ids);
    res.status(200).json(invoice);
  }
}
