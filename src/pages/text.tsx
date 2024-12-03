import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function TextPage() {
    const [inputText, setInputText] = useState('');
    const [roleText, setRoleText] = useState('');

    const handleClick = () => {
        setInputText('')
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Text Input</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Process Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={inputText}
                        placeholder="Enter your text here..."
                        className="min-h-[200px] resize-none"
                        onChange={(e) => {setInputText(e.target.value)}}
                    />
                    <input
                        type="text"
                        value={roleText}
                        placeholder="Enter your role here..."
                        className="border rounded p-2"
                        onChange={(e) => {setRoleText(e.target.value)}}
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleClick}>
                            <Send className="mr-2 h-4 w-4" />
                            Process
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}