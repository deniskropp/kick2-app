import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { KickClient } from "@/clients/kick";
import { PromptSelector } from "@/components/system/prompt-selector";
import { KickFile } from "@/lib/types";

export function SystemPage() {
    const [prompts, setPrompts] = useState<KickFile[]>([]);
    const [promptBuffer, setPromptBuffer] = useState("");
    const kickClient = useMemo(() => new KickClient(), []);

    useEffect(() => {
        const loadFiles = async () => {
            const availableFiles = await kickClient.getPrompts();

            setPrompts(availableFiles);
        };

        loadFiles();
    }, [kickClient]);

    const handlePromptSelect = async (filename: string) => {
        const content = await kickClient.getPromptContent(filename);

        setPromptBuffer(`${promptBuffer}${content}\n\n\n\n`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">System Prompt</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Prompt Board</span>
                        <PromptSelector files={prompts} onSelect={handlePromptSelect} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Enter your system prompt here..."
                        className="min-w-[600px] min-h-[400px] resize-none"
                        value={promptBuffer}
                        onChange={(e) => setPromptBuffer(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Send Prompt
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}