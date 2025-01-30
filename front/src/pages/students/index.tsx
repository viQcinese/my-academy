import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DataTable } from "./components/students-table/students-table";
import { columns } from "./components/students-table/columns";

const data = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  isActive: true,
  fullName: "Vitor Senise Furtado",
  birthdate: new Date(),
  cellphone: "+55 11 99754-0064",
  email: "vitor.senise@gmail.com",
}));

export function StudentsPage() {
  return (
    <Layout>
      <div className="mt-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Students</h1>
        <p className="text-xl">You can manage your students here</p>
      </div>
      <div className="mt-16 flex justify-between">
        <div className="flex gap-4">
          <Input placeholder="Search..." />
        </div>
        <Button variant="outline">
          <Plus />
          Create student
        </Button>
      </div>
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}
