import * as React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  modalPopover?: boolean;
  className?: string;
  withSelectAll?: boolean;
  withSearchInput?: boolean;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      modalPopover = false,
      className,
      withSearchInput,
      withSelectAll,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const selectedOptions = options.filter((option) =>
      selectedValues.includes(option.value)
    );

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full py-1 px-3 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className
            )}
          >
            <div className="flex items-center justify-between w-full mx-auto">
              <span className="text-sm text-muted-foreground truncate">
                {selectedValues.length === 0
                  ? placeholder
                  : selectedOptions.map((option) => option.label).join(", ")}
              </span>
              <div className="flex gap-1">
                {selectedValues.length > 0 && (
                  <span className="flex items-center h-4 w-4 justify-center text-xs font-bold text-slate-100 bg-slate-800 rounded-full">
                    {selectedValues.length}
                  </span>
                )}
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 min-w-[--radix-popover-trigger-width]"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command className="">
            {withSearchInput && (
              <CommandInput
                placeholder="Search..."
                onKeyDown={handleInputKeyDown}
              />
            )}
            <ScrollableContainer>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {withSelectAll && (
                    <CommandItem
                      key="all"
                      onSelect={toggleAll}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedValues.length === options.length
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      <span>Select All</span>
                    </CommandItem>
                  )}
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer"
                        data-value={option.value}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <span>{option.label}</span>
                        <span className="hidden">{option.value}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </ScrollableContainer>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

function ScrollableContainer({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const element = ref.current!;
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
    };

    element.addEventListener("wheel", handleWheel, true);
    element.addEventListener("touchmove", handleTouchMove, true);

    return () => {
      element.removeEventListener("wheel", handleWheel, true);
      element.removeEventListener("touchmove", handleTouchMove, true);
    };
  }, []);

  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
}

MultiSelect.displayName = "MultiSelect";
