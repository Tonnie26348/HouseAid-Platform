import React, { useState } from "react";
import { useMessages } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

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
    
    try {
      await sendMessage.mutateAsync({ receiverId, content: newMessage });
      setNewMessage("");
      toast.success("Message sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-4">
          {messages.data?.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[85%] md:max-w-[70%]",
                msg.sender_id === user?.id ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "p-3 md:p-4 rounded-2xl text-sm md:text-base shadow-sm",
                  msg.sender_id === user?.id
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                )}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest px-1">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {messages.data?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
               <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-sm font-bold uppercase tracking-widest">Start of conversation</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 md:p-6 border-t border-gray-50 bg-white">
        <form onSubmit={handleSend} className="flex gap-2 md:gap-3 items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="h-12 md:h-14 rounded-xl md:rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm md:text-base"
          />
          <Button 
            type="submit" 
            disabled={sendMessage.isPending || !newMessage.trim()}
            className="h-12 w-12 md:h-14 md:px-8 rounded-xl md:rounded-2xl font-black shadow-lg shadow-primary/20 flex-shrink-0"
          >
            <span className="hidden md:inline">Send Message</span>
            <span className="md:hidden">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Messaging;
