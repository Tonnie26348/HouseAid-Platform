import React, { useState } from "react";
import { useMessages } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

interface MessagingProps {
  receiverId: string;
  receiverName: string;
}

const Messaging: React.FC<MessagingProps> = ({ receiverId, receiverName }) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, sendMessage } = useMessages(receiverId);
  const { user } = useAuth();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    await sendMessage.mutateAsync({ receiverId, content: newMessage });
    setNewMessage("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Chat with {receiverName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4 p-4 border rounded-md">
          {messages.data?.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                msg.sender_id === user?.id
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit" disabled={sendMessage.isPending}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Messaging;
