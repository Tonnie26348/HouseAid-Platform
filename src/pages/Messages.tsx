import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Phone, Video, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Messaging from "@/components/shared/Messaging";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from("messages")
        .select(`
          sender_id,
          receiver_id,
          sender:profiles!sender_id(id, full_name, avatar_url, role),
          receiver:profiles!receiver_id(id, full_name, avatar_url, role)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (data) {
        const uniqueContacts = new Map();
        data.forEach(msg => {
          const contact = msg.sender_id === user.id ? msg.receiver : msg.sender;
          if (contact && !uniqueContacts.has(contact.id)) {
            uniqueContacts.set(contact.id, contact);
          }
        });
        const contactsList = Array.from(uniqueContacts.values());
        setConversations(contactsList);
      }
      setLoading(false);
    };

    fetchConversations();
  }, [user]);

  const handleSelectContact = (contact: any) => {
    setSelectedContact(contact);
    setShowMobileChat(true);
  };

  return (
    <div className="h-[calc(100dvh-7rem)] min-h-[500px] md:min-h-[600px]">
      <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 h-full overflow-hidden flex relative">
        
        {/* Contacts Sidebar */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-gray-50/30 transition-all duration-300",
          showMobileChat ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 md:p-6 border-b border-gray-100 bg-white">
             <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4">Messages</h3>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 h-10 md:h-11 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all" />
             </div>
          </div>

          <ScrollArea className="flex-1">
             <div className="p-2 md:p-3 space-y-1">
                {loading ? (
                  [1,2,3,4].map(i => <div key={i} className="h-16 md:h-20 bg-white animate-pulse rounded-2xl mx-2 mt-2" />)
                ) : conversations.length === 0 ? (
                  <div className="text-center py-10 px-6">
                     <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-gray-300 mx-auto mb-3" />
                     <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">No conversations</p>
                  </div>
                ) : (
                  conversations.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className={cn(
                        "w-full p-3 md:p-4 rounded-xl md:rounded-[1.5rem] flex items-center gap-3 md:gap-4 transition-all group",
                        selectedContact?.id === contact.id 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "hover:bg-white hover:shadow-sm text-gray-600"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                          <AvatarImage src={contact.avatar_url} />
                          <AvatarFallback className={cn("font-bold", selectedContact?.id === contact.id ? "bg-white/20 text-white" : "bg-primary/5 text-primary")}>
                            {contact.full_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex-1 text-left overflow-hidden">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-bold truncate text-sm md:text-base">{contact.full_name}</span>
                        </div>
                        <p className={cn("text-[10px] md:text-xs truncate font-medium", selectedContact?.id === contact.id ? "text-white/80" : "text-gray-400")}>
                          {contact.role === 'Domestic Worker' ? 'Professional' : 'Household'}
                        </p>
                      </div>
                    </button>
                  ))
                )}
             </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className={cn(
          "flex-1 flex flex-col bg-white transition-all duration-300",
          !showMobileChat ? "hidden md:flex" : "flex"
        )}>
          <AnimatePresence mode="wait">
            {selectedContact ? (
              <motion.div 
                key={selectedContact.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Chat Header */}
                <div className="h-16 md:h-20 px-4 md:px-8 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden rounded-full -ml-2"
                      onClick={() => setShowMobileChat(false)}
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Button>
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-primary/5 shadow-sm">
                      <AvatarImage src={selectedContact.avatar_url} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs md:text-sm">
                        {selectedContact.full_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-black text-gray-900 leading-tight truncate text-sm md:text-base">{selectedContact.full_name}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 md:gap-2">
                     <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50 h-8 w-8 md:h-10 md:w-10"><Phone className="w-4 h-4 md:w-5 md:h-5" /></Button>
                     <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50 h-8 w-8 md:h-10 md:w-10"><Video className="w-4 h-4 md:w-5 md:h-5" /></Button>
                     <div className="hidden sm:block w-px h-6 bg-gray-100 mx-1 md:mx-2" />
                     <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50 h-8 w-8 md:h-10 md:w-10 hidden sm:flex"><Info className="w-4 h-4 md:w-5 md:h-5" /></Button>
                  </div>
                </div>

                {/* Messaging Component Integration */}
                <div className="flex-1 overflow-hidden">
                  <Messaging receiverId={selectedContact.id} receiverName={selectedContact.full_name} />
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-12">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/5 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-primary mb-6">
                    <MessageSquare className="w-8 h-8 md:w-12 md:h-12" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Welcome to Secure Chat</h3>
                 <p className="text-gray-500 font-medium max-w-sm text-sm md:text-base">Select a conversation to start communicating with your domestic professional or employer.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Messages;