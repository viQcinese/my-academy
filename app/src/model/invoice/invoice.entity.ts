import { CreateInvoiceDTO } from "./invoice.dto";

export class Invoice {
  public id?: string;
  public studentId: number;
  public amount: number;
  public currency: string = "BRL";
  public isPaid: boolean = false;

  constructor(params: CreateInvoiceDTO) {
    this.id = params.id;
    this.isPaid = params.isPaid ?? this.isPaid;
    this.currency = params.currency ?? this.currency;
    this.studentId = params.studentId;
    this.amount = params.amount;
  }

  markAsPaid() {
    this.isPaid = true;
  }

  markAsUnpaid() {
    this.isPaid = false;
  }
}
