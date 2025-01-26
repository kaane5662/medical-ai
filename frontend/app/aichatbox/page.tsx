'use client'; // Mark this as a Client Component

import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react';
interface Message {
    role: string; // Role associated with the log
    text: string; // The main text content of the log
    // patient?: string; // ObjectId of the referenced Patient, optional on the frontend
    // aiChat?: string; // ObjectId of the referenced AIChat, optional on the frontend
    // cache?: string; // Cache information, optional field
}
const ChatPage = () => {
const router = useRouter(); // Initialize the router
const [Messages,setMessages] = useState<Message[]>([]) 

const fetchChat  =()=>{
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/aichat`,{withCredentials:true}).then((res)=>{
        setMessages(res.data)
    }).catch((error:any)=>{
        console.error(error)
    })
}

useEffect(()=>{
    fetchChat()
})

return (
<div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
    <div className="flex items-center gap-4">
        {/* Back Button - Redirect to PDashboard */}
        <button className="text-white" onClick={() => router.push('/pdashboard')}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
        </button>
    </div>
    </nav>

    {/* Chatbox */}
    <div className="flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* Chat Messages */}
        <div className="overflow-y-auto h-96 mb-4">
        <div className="text-sm text-gray-700">
            {/* Example Chat Messages */}
            {Messages.map((message,index)=>{
                return(
                    <div className="mb-4">
                    <p className={`font-semibold ${message.role == "user" && "p-2 font-semibold"}`}>{message.role}</p>
                    <p>{message.text}</p>
                    </div>
                )
            })}
            
            <div className="mb-4">
            <p className="font-semibold">User 2:</p>
            <p>Hi! I have a question about my order.</p>
            </div>
        </div>
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
        <form>
            
        </form>
        <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F7A8C]"
        />
        <button className="px-4 py-2 bg-[#1F7A8C] text-white rounded-lg hover:bg-[#1a6a7a] transition-colors">
            Send
        </button>
        </div>
    </div>
    </div>
</div>
);
};

export default ChatPage;