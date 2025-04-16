'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import '@/app/globals.css';

interface Message {
  id: number;
  user_id: string;
  username: string;
  text: string;
  timestamp: string;
}

const Community: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        setUserId(user.id);
        setUsername(user.user_metadata?.name || user.email || 'Anonymous');
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !userId || !username) {
      console.error('Missing message, userId, or username.');
      return;
    }

    console.log('Sending message:', { userId, username, message });

    // Ensure the userId exists in the 'users' table
    console.log('Checking if userId exists:', userId);  // Log the userId to ensure it's correct

    const { data: userCheck, error: userCheckError } = await supabase
      .from('users')
      .select('id')  // Make sure this matches the column name in your table
      .eq('id', userId)  // Use the correct column name here ('id' or 'user_id')
      .single();

    console.log('userCheck:', userCheck);  // Log the result of the query
    console.error('userCheckError:', userCheckError);  // Log any error

    if (userCheckError || !userCheck) {
      console.error('Invalid userId:', userCheckError || 'User not found');
      return;
    }

    // Insert the message into the 'messages' table
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          user_id: userId,
          username,
          text: message,
          timestamp: new Date().toISOString(),
        },
      ])
      .select(); // This is critical for getting the inserted row back

    if (error) {
      console.error('Error inserting message:', error.message || error.details || error);
    } else if (data && data.length > 0) {
      setMessages((prev) => [...prev, data[0]]);
      setMessage('');
    } else {
      console.warn('Message inserted but no data returned');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0000] text-white grid grid-cols-1 lg:grid-cols-4">
      <div className="col-span-1 bg-[#121212] p-6 space-y-8">
        <div className="bg-[#1e1e1e] rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">👥 Online Users</h2>
          <p className="text-sm text-gray-400">No users online</p>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">📌 Community Guidelines</h2>
          <ul className="text-sm list-disc list-inside space-y-2 text-gray-300">
            <li>Be respectful to other members</li>
            <li>No spam or self-promotion</li>
            <li>Keep conversations relevant to books</li>
            <li>Protect your personal information</li>
          </ul>
        </div>
      </div>

      <div className="col-span-3 p-8 flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">
          💬 Community Chat{' '}
          <span className="text-sm font-normal text-gray-400">Live</span>
        </h1>
        <p className="text-gray-400">Connect with readers from around the world</p>

        <div className="flex-1 overflow-y-auto bg-[#121212] rounded-xl p-6 space-y-4 max-h-[400px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg ${msg.user_id === userId ? 'bg-[#000000] text-white' : 'bg-[#1e1e1e] text-white'}`}
            >
              <div className="font-semibold">{msg.username}</div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-4 rounded-lg bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={!userId}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black border-2 border-white text-white hover:bg-gray-900 rounded-lg transition"
            disabled={!userId}
          >
            Send
          </button>
        </form>

        {!userId && (
          <p className="text-sm text-center text-red-400">
            Please sign in to join the conversation
          </p>
        )}
      </div>
    </div>
  );
};

export default Community;
