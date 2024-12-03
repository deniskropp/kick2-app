import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { KickClient, KickMessage } from "@/clients/kick";

export function MessagesPage() {
    const [messages, setMessages] = useState<KickMessage[]>([]);
    const kickClient = useMemo(() => new KickClient(), []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messagesData = await kickClient.getMessages();
                console.log(messagesData)
                setMessages(messagesData);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [kickClient]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Messages</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Session</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Content</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messages.map((message) => (
                                <TableRow key={message.id}>
                                    <TableCell>{message.id}</TableCell>
                                    <TableCell>{message.session}</TableCell>
                                    <TableCell>{message.role}</TableCell>
                                    <TableCell>{message.content}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}