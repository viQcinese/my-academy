export type PaymentTemplate = {
  id: number;
  name: string;
  amount: number;
  frequency: "monthly";
  currency: string;
};

export type CreatePaymentTemplateForm = {
  name: string;
  amount: number;
};
