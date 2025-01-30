import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

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
    </Layout>
  );
}
