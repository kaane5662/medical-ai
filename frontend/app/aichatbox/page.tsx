'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation'; // Import useRouter

const ChatPage = () => {
const router = useRouter(); // Initialize the router

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
            <div className="mb-4">
            <p className="font-semibold">User 1:</p>
            <p>Hello! How can I help you today?</p>
            </div>
            <div className="mb-4">
            <p className="font-semibold">User 2:</p>
            <p>Hi! I have a question about my order.</p>
            </div>
        </div>
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
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