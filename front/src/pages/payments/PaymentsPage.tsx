import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";
import { InvoicesTab } from "./components/invoices-tab/InvoicesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplatesTab } from "./components/templates-tab/TemplatesTab";

export function PaymentsPage() {
  useEffect(() => {
    document.title = "Zygurat | Payments";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Payments</h1>
        <p className="text">You can manage your payments here</p>
      </div>
      <Tabs defaultValue="invoices" className="mt-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-8">
          <InvoicesTab />
        </TabsContent>
        <TabsContent value="templates" className="mt-8">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
