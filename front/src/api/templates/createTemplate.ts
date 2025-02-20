import { httpClient } from "../httpClient";
import {
  CreatePaymentTemplateForm,
  PaymentTemplate,
} from "@/model/PaymentTemplate";

export async function createTemplate(
  paymentTemplate: CreatePaymentTemplateForm
): Promise<PaymentTemplate> {
  return httpClient.post<PaymentTemplate>(`recurring-payments`, {
    body: paymentTemplate,
  });
}
