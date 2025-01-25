'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation'; // Import useRouter
import { useState } from 'react';

// Mock data for patients and conversations
const patients = [
{
id: 1,
name: 'John Doe',
conversations: [
    { id: 1, message: 'Hello, I have a question about my medication.' },
    { id: 2, message: 'Can we schedule a follow-up appointment?' },
],
},
{
id: 2,
name: 'Jane Smith',
conversations: [
    { id: 1, message: 'I’m experiencing some side effects from the treatment.' },
    { id: 2, message: 'Should I stop taking the medication?' },
],
},
{
id: 3,
name: 'Alice Johnson',
conversations: [
    { id: 1, message: 'I need a prescription refill.' },
    { id: 2, message: 'Can you send it to my pharmacy?' },
],
},
];

// Mock data for fellow doctors
const fellowDoctors = [
{
id: 1,
name: 'Dr. Smith',
conversations: [
    { id: 1, message: 'Hi, can we discuss a patient case?' },
    { id: 2, message: 'I need your opinion on a treatment plan.' },
],
},
{
id: 2,
name: 'Dr. Johnson',
conversations: [
    { id: 1, message: 'Let’s coordinate on the surgery schedule.' },
    { id: 2, message: 'Can you review this test result?' },
],
},
{
id: 3,
name: 'Dr. Lee',
conversations: [
    { id: 1, message: 'We need to adjust the medication for a patient.' },
    { id: 2, message: 'Can we discuss the patient’s progress?' },
],
},
];

const DoctorChatPage = () => {
const [selectedPatient, setSelectedPatient] = useState(null); // Track the selected patient
const [selectedDoctor, setSelectedDoctor] = useState(null); // Track the selected fellow doctor
const router = useRouter(); // Initialize the router

return (
<div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
    <div className="flex items-center gap-4">
        {/* Back Button - Redirect to Dashboard */}
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
        {/* Fellow Doctors Section */}
        <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Fellow Doctors</h2>
        <ul>
            {fellowDoctors.map((doctor) => (
            <li
                key={doctor.id}
                className={`p-2 cursor-pointer ${
                selectedDoctor?.id === doctor.id
                    ? 'bg-[#1F7A8C] text-white rounded-lg'
                    : 'hover:bg-gray-100 rounded-lg'
                }`}
                onClick={() => {
                setSelectedDoctor(doctor); // Set the selected fellow doctor
                setSelectedPatient(null); // Clear the selected patient
                }}
            >
                {doctor.name}
            </li>
            ))}
        </ul>
        </div>

        {/* Patients List */}
        <div>
        <h2 className="text-lg font-semibold mb-4">Your Patients</h2>
        <ul>
            {patients.map((patient) => (
            <li
                key={patient.id}
                className={`p-2 cursor-pointer ${
                selectedPatient?.id === patient.id
                    ? 'bg-[#1F7A8C] text-white rounded-lg'
                    : 'hover:bg-gray-100 rounded-lg'
                }`}
                onClick={() => {
                setSelectedPatient(patient); // Set the selected patient
                setSelectedDoctor(null); // Clear the selected fellow doctor
                }}
            >
                {patient.name}
            </li>
            ))}
        </ul>
        </div>
    </div>

    {/* Chatbox */}
    <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        {/* Selected Doctor's or Patient's Name */}
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
        ) : selectedPatient ? (
        <>
            <h2 className="text-lg font-semibold mb-4">
            Chat with {selectedPatient.name}
            </h2>

            {/* Previous Conversations */}
            <div className="overflow-y-auto h-96 mb-4">
            {selectedPatient.conversations.map((convo) => (
                <div key={convo.id} className="mb-4">
                <p className="text-sm text-gray-700">{convo.message}</p>
                </div>
            ))}
            </div>
        </>
        ) : (
        <p className="text-gray-500">Select a doctor or patient to start chatting.</p>
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

export default DoctorChatPage;