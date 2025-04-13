'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import '@/app/globals.css';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

const Community: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // Get the logged-in user
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        setUserEmail(user.email || user.id); // Store email or id
      }

      // Fetch existing messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    init();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !userEmail) return;

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          user: userEmail,
          text: message,
          timestamp: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error inserting message:', error);
    } else {
      setMessages((prev) => [...prev, data[0]]);
      setMessage('');
    }
  };

  return (
    <section className="relative overflow-hidden flex flex-col justify-center bg-gradient-to-b from-primary/5 via-primary/10 to-background py-10">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

      <div className="container relative z-10 px-4 py-10 sm:py-10 lg:py-10 mx-auto max-w-3xl lg:max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Community Chat</h1>

        <div className="w-full flex flex-col space-y-6 p-6 rounded-xl max-h-[400px] overflow-y-auto bg-transparent">
          {/* Messages display */}
          <div className="space-y-4 overflow-y-auto max-h-[300px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg ${
                  msg.user === userEmail ? 'bg-black text-white' : 'bg-gray-800 text-white'
                }`}
              >
                <div className="font-semibold">{msg.user}</div>
                <div>{msg.text}</div>
                <div className="text-xs text-gray-400">{msg.timestamp}</div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out"
              placeholder="Type your message..."
              disabled={!userEmail}
            />
            <button
              type="submit"
              className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out"
              disabled={!userEmail}
            >
              Send
            </button>
          </form>

          {!userEmail && (
            <p className="text-sm text-center text-red-400">You must be logged in to send messages.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Community;

