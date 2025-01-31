import { useQuery } from "@tanstack/react-query";
import { Class } from "@/pages/students/model/Class";
import { MultiSelect } from "@/components/ui/multi-select";

export function ClassesMultiSelect() {
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const options =
    data?.map((studentClass) => ({
      label: studentClass.name,
      value: studentClass.id.toString(),
    })) || [];

  return (
    <MultiSelect
      options={options}
      onValueChange={() => undefined}
      defaultValue={[]}
      placeholder="Select options"
      withSearchInput={options.length > 8}
      withSelectAll={options.length > 3}
    />
  );
}
