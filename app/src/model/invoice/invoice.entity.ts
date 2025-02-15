import { CreateInvoiceDTO } from "./invoice.dto";

export class Invoice {
  public id?: string;
  public studentId: number;
  public amount: number;
  public currency: string = "BRL";
  public isPaid: boolean = false;
  public description: string = "";
  public dueAt?: Date;
  public createdAt?: Date;

  constructor(params: CreateInvoiceDTO) {
    this.id = params.id;
    this.isPaid = params.isPaid ?? this.isPaid;
    this.currency = params.currency ?? this.currency;
    this.description = params.description ?? this.description;
    this.studentId = params.studentId;
    this.amount = params.amount;
    this.dueAt = params.dueAt ?? this.dueAt;
    this.createdAt = params.createdAt;
  }
}
