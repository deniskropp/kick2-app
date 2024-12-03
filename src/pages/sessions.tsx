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
import { KickClient, KickMessage, KickSession } from "@/clients/kick";
import './sessions.css'


export function SessionsPage() {
    const [sessions, setSessions] = useState<KickSession[]>([]);
    const kickClient = useMemo(() => new KickClient(), []);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsData = await kickClient.getSessions();
                console.log(sessionsData)
                setSessions(sessionsData);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, [kickClient]);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Sessions</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Count</TableHead>
                                <TableHead>Messages</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.map((session) => (
                                <TableRow key={session.id}>
                                    <TableCell>{session.id}</TableCell>
                                    <TableCell>{session.messages.length}</TableCell>
                                    <TableCell>{session.messages.length > 0 ? MsgCell(session.messages[0]) : ''}</TableCell>
                                    <TableCell>{session.messages.length > 1 ? MsgCell(session.messages[1]) : ''}</TableCell>
                                    <TableCell>{session.messages.length > 2 ? MsgCell(session.messages[2]) : ''}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

// Define the MsgCell function
const MsgCell = (message: KickMessage) => {
    if (message) {
        return (
            <div>
                <p className="msg-cell-role">{message.role || 'No role'}</p>
                <p className="msg-cell-content">{message.content ? message.content.slice(0, 30) : 'No message'}</p>
            </div>
        );
    }
    return <p>No message</p>;
};
