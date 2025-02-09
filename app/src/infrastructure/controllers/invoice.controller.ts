import { InvoiceService } from "../../application/invoice.service";
import { Request, Response } from "express";

export class InvoiceController {
  private invoiceService: InvoiceService;

  constructor(invoiceService: InvoiceService) {
    this.invoiceService = invoiceService;
  }

  async createInvoices(req: Request, res: Response): Promise<void> {
    const { amount, studentIds, description, dueAt, currency } = req.body;
    const userId = req.auth.sub;

    if (!amount || !Array.isArray(studentIds) || studentIds.length === 0) {
      res.status(400).json({ error: "amount and studentIds are required" });
      return;
    }

    const createdInvoices = await this.invoiceService.createInvoices(
      {
        amount,
        studentIds,
        description,
        dueAt,
      },
      userId
    );

    res.status(201).json({ createdInvoices });
  }

  async listInvoices(req: Request, res: Response): Promise<void> {
    const userId = req.auth.sub;

    const invoices = await this.invoiceService.listInvoices(userId);
    res.status(200).json(invoices);
  }

  async getInvoice(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.auth.sub;

    const invoice = await this.invoiceService.getInvoice(id, userId);
    res.status(200).json(invoice);
  }

  async markInvoicesAsPaid(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const invoicesMarkedAsPaid = await this.invoiceService.markInvoicesAsPaid(
      ids,
      userId
    );
    res.status(200).json({ invoicesMarkedAsPaid });
  }

  async markInvoicesAsUnpaid(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const invoicesMarkedAsUnpaid =
      await this.invoiceService.markInvoicesAsUnpaid(ids, userId);
    res.status(200).json({ invoicesMarkedAsUnpaid });
  }
}
