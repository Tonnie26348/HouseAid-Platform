import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Send, MoreVertical, Phone, Video, Info } from "lucide-react";
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

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      setLoading(true);
      
      // Fetch distinct contacts the user has messaged
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
        if (contactsList.length > 0 && !selectedContact) {
          setSelectedContact(contactsList[0]);
        }
      }
      setLoading(false);
    };

    fetchConversations();
  }, [user]);

  return (
    <DashboardLayout pageTitle="Communication Hub">
      <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] min-h-[600px]">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col md:flex-row">
          
          {/* Contacts Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-gray-50/30">
            <div className="p-6 border-b border-gray-100 bg-white">
               <h3 className="text-xl font-black text-gray-900 mb-4">Messages</h3>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search conversations..." className="pl-10 h-11 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all" />
               </div>
            </div>

            <ScrollArea className="flex-1">
               <div className="p-3 space-y-1">
                  {loading ? (
                    [1,2,3].map(i => <div key={i} className="h-20 bg-white animate-pulse rounded-2xl mx-2 mt-2" />)
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-10 px-6">
                       <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                       <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={cn(
                          "w-full p-4 rounded-[1.5rem] flex items-center gap-4 transition-all group",
                          selectedContact?.id === contact.id 
                            ? "bg-primary text-white shadow-lg shadow-primary/20" 
                            : "hover:bg-white hover:shadow-sm text-gray-600"
                        )}
                      >
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                            <AvatarImage src={contact.avatar_url} />
                            <AvatarFallback className={cn("font-bold", selectedContact?.id === contact.id ? "bg-white/20 text-white" : "bg-primary/5 text-primary")}>
                              {contact.full_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-bold truncate">{contact.full_name}</span>
                            <span className={cn("text-[10px] font-bold uppercase", selectedContact?.id === contact.id ? "text-white/60" : "text-gray-400")}>12:45</span>
                          </div>
                          <p className={cn("text-xs truncate font-medium", selectedContact?.id === contact.id ? "text-white/80" : "text-gray-400")}>
                            {contact.role === 'worker' ? 'Professional' : 'Household'} • Recent message...
                          </p>
                        </div>
                      </button>
                    ))
                  )}
               </div>
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-white">
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
                  <div className="h-20 px-8 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-primary/5 shadow-sm">
                        <AvatarImage src={selectedContact.avatar_url} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                          {selectedContact.full_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-black text-gray-900 leading-tight">{selectedContact.full_name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Now</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50"><Phone className="w-5 h-5" /></Button>
                       <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50"><Video className="w-5 h-5" /></Button>
                       <div className="w-px h-6 bg-gray-100 mx-2" />
                       <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:bg-gray-50"><Info className="w-5 h-5" /></Button>
                    </div>
                  </div>

                  {/* Messaging Component Integration */}
                  <div className="flex-1 overflow-hidden">
                    <Messaging receiverId={selectedContact.id} receiverName={selectedContact.full_name} />
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                   <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-6">
                      <MessageSquare className="w-12 h-12" />
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 mb-2">Welcome to Secure Chat</h3>
                   <p className="text-gray-500 font-medium max-w-sm">Select a conversation from the left to start communicating with your household professional or employer.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Messages;
