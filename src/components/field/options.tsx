import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface OptionsProps {
  options: string[];
  onChange: (options: string[]) => void;
}

export const Options = ({ options, onChange }: OptionsProps) => {
  const isAnyOptionEmpty = options.some((option) => option.trim() === "");

  const handleAddNewOption = () => {
    onChange([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onChange(updatedOptions);
  };

  const handleOptionChange = (index: number, label: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? label : option
    );
    onChange(updatedOptions);
  };

  useEffect(() => {
    if (!options || options.length === 0) {
      onChange([""]);
    }
  }, [options, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4">
        {options.map((option, index) => (
          <OptionItem
            key={index}
            index={index}
            option={option}
            onRemove={() => handleRemoveOption(index)}
            onChange={(label) => handleOptionChange(index, label)}
          />
        ))}
      </div>
      <Button
        variant="outline"
        className="w-fit"
        onClick={handleAddNewOption}
        disabled={isAnyOptionEmpty}
      >
        Add Option(s)
      </Button>
    </div>
  );
};

const OptionItem = ({
  index,
  option,
  onChange,
  onRemove,
}: {
  option: string;
  index: number;
  onRemove: () => void;
  onChange: (label: string) => void;
}) => {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        autoFocus
        type="text"
        value={option}
        placeholder={`Option ${index + 1}`}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="outline" onClick={onRemove}>
        <X />
      </Button>
    </div>
  );
};
