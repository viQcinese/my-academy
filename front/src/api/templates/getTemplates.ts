import { httpClient } from "../httpClient";
import { PaymentTemplate } from "@/model/PaymentTemplate";

export async function getTemplates(): Promise<PaymentTemplate[]> {
  return await httpClient.get<PaymentTemplate[]>("recurring-payments");
}
