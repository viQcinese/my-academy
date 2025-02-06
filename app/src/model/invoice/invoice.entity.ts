import { CreateInvoiceDTO } from "./invoice.dto";

export class Invoice {
  public id?: string;
  public studentId: number;
  public amount: number;
  public currency: string = "BRL";
  public isPaid: boolean = false;
  public description: string = "";
  public dueDate?: Date;
  public createdAt?: Date;

  constructor(params: CreateInvoiceDTO) {
    this.id = params.id;
    this.isPaid = params.isPaid ?? this.isPaid;
    this.currency = params.currency ?? this.currency;
    this.description = params.description ?? this.description;
    this.studentId = params.studentId;
    this.amount = params.amount;
    this.dueDate = params.dueDate ?? this.dueDate;
    this.createdAt = params.createdAt;
  }
}
