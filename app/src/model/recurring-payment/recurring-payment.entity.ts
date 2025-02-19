export class RecurringPayment {
  public id: number | null = null;
  public name: string;
  public frequency: string = "monthly";
  public currency: string = "BRL";
  public amount: number;

  constructor(params: CreateRecurringPaymentDTO) {
    this.id = params.id || this.id;
    this.name = params.name;
    this.amount = params.amount;
  }
}
