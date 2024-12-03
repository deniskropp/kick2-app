import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { KickFile } from "@/lib/types";

interface PromptSelectorProps {
    files: KickFile[];
    onSelect: (filename: string) => void;
}

export function PromptSelector({ files, onSelect }: PromptSelectorProps) {
    const [value, setValue] = useState("");

    return (
        <Select value={value} onValueChange={(selectedValue) => {
            setValue(selectedValue);
            onSelect(selectedValue);
        }}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select prompt..." />
            </SelectTrigger>
            <SelectContent>
                {files.map((file) => (
                    <SelectItem key={file.filename} value={file.filename}>
                        <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value === file.filename
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}
                        />
                        {file.filename}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}