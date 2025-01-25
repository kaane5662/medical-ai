'use client'; // Mark this as a Client Component

import { useRouter, useSearchParams } from 'next/navigation';

// Mock data for doctors and conversations
const doctors = [
{
id: 1,
name: 'Dr. Smith',
conversations: [
    { id: 1, message: 'Hello, how are you feeling today?' },
    { id: 2, message: 'I have reviewed your test results.' },
],
},
{
id: 2,
name: 'Dr. Johnson',
conversations: [
    { id: 1, message: 'Your appointment is scheduled for next week.' },
    { id: 2, message: 'Please bring your medical records.' },
],
},
{
id: 3,
name: 'Dr. Lee',
conversations: [
    { id: 1, message: 'We need to adjust your medication.' },
    { id: 2, message: 'Let me know if you experience any side effects.' },
],
},
];

const healthcareProvider = {
id: 0,
name: 'Healthcare Provider',
conversations: [
{ id: 1, message: 'Welcome to your healthcare portal!' },
{ id: 2, message: 'How can we assist you today?' },
],
};

const PatientChatPage = () => {
const router = useRouter();
const searchParams = useSearchParams();
const doctorId = searchParams.get('doctorId'); // Get the selected doctor ID from the URL

// Find the selected doctor based on the URL query parameter
const selectedDoctor = doctors.find((doctor) => doctor.id === Number(doctorId));

return (
<div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
    <div className="flex items-center gap-4">
        {/* Back Button - Redirect to PDashboard */}
        <button className="text-white" onClick={() => router.push('/ddashboard')}>
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

    {/* Main Content */}
    <div className="flex p-4 gap-4">
    {/* Left Sidebar */}
    <div className="w-1/4 bg-white rounded-lg shadow-lg p-4">
        {/* Healthcare Provider Section */}
        <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Your Healthcare Provider</h2>
        <div
            className={`p-2 cursor-pointer ${
            !doctorId
                ? 'bg-[#1F7A8C] text-white rounded-lg'
                : 'hover:bg-gray-100 rounded-lg'
            }`}
            onClick={() => router.push('/chatbox')} // Clear doctorId to show healthcare provider chat
        >
            {healthcareProvider.name}
        </div>
        </div>

        {/* Doctors List */}
        <div>
        <h2 className="text-lg font-semibold mb-4">Your Doctors</h2>
        <ul>
            {doctors.map((doctor) => (
            <li
                key={doctor.id}
                className={`p-2 cursor-pointer ${
                selectedDoctor?.id === doctor.id
                    ? 'bg-[#1F7A8C] text-white rounded-lg'
                    : 'hover:bg-gray-100 rounded-lg'
                }`}
                onClick={() => router.push(`/chatbox?doctorId=${doctor.id}`)} // Update URL with selected doctor
            >
                {doctor.name}
            </li>
            ))}
        </ul>
        </div>
    </div>

    {/* Chatbox */}
    <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        {/* Selected Doctor's or Healthcare Provider's Name */}
        {selectedDoctor ? (
        <>
            <h2 className="text-lg font-semibold mb-4">
            Chat with {selectedDoctor.name}
            </h2>

            {/* Previous Conversations */}
            <div className="overflow-y-auto h-96 mb-4">
            {selectedDoctor.conversations.map((convo) => (
                <div key={convo.id} className="mb-4">
                <p className="text-sm text-gray-700">{convo.message}</p>
                </div>
            ))}
            </div>
        </>
        ) : (
        <>
            <h2 className="text-lg font-semibold mb-4">
            Chat with {healthcareProvider.name}
            </h2>

            {/* Previous Conversations */}
            <div className="overflow-y-auto h-96 mb-4">
            {healthcareProvider.conversations.map((convo) => (
                <div key={convo.id} className="mb-4">
                <p className="text-sm text-gray-700">{convo.message}</p>
                </div>
            ))}
            </div>
        </>
        )}

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

export default PatientChatPage;