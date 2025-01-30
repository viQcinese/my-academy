import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

type StudentRow = {
  id: number;
  fullName: string;
  isActive: boolean;
  birthdate: Date;
  cellphone?: string;
  document?: string;
  email?: string;
};

export const columns: ColumnDef<StudentRow>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="ml-1"
        {...{
          checked: table.getIsAllRowsSelected(),
          onCheckedChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            onCheckedChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "birthdate",
    header: "Idade",
  },
  {
    accessorKey: "cellphone",
    header: "Cellphone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
