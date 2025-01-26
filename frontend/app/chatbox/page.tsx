"use client"; // Mark this as a Client Component

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Mock data for doctors and conversations
const initialDoctors = [
  {
    id: 1,
    name: "Dr. Smith",
    conversations: [
      { id: 1, message: "Hello, how are you feeling today?" },
      { id: 2, message: "I have reviewed your test results." },
    ],
  },
  {
    id: 2,
    name: "Dr. Johnson",
    conversations: [
      { id: 1, message: "Your appointment is scheduled for next week." },
      { id: 2, message: "Please bring your medical records." },
    ],
  },
  {
    id: 3,
    name: "Dr. Lee",
    conversations: [
      { id: 1, message: "We need to adjust your medication." },
      { id: 2, message: "Let me know if you experience any side effects." },
    ],
  },
];

const healthcareProvider = {
  id: 0,
  name: "Healthcare Provider",
  conversations: [
    { id: 1, message: "Welcome to your healthcare portal!" },
    { id: 2, message: "How can we assist you today?" },
  ],
};

const PatientChatPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId"); // Get the selected doctor ID from the URL

  // State for managing doctors and the "Add Doctor" popup
  const [doctors, setDoctors] = useState(initialDoctors);
  const [showPopup, setShowPopup] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    hospital: "",
    number: "",
  });

  // WebSocket state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Find the selected doctor based on the URL query parameter
  const selectedDoctor = doctors.find((doctor) => doctor.id === Number(doctorId));

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("http://localhost:5000"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  // Function to send a message via WebSocket
  const sendSocketMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      console.log("Message sent:", message);
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  // Handle sending a message from the input field
  const sendMessage = () => {
    if (inputValue.trim()) {
      sendSocketMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <div className="flex items-center gap-4">
          {/* Back Button - Redirect to PDashboard */}
          <button className="text-white" onClick={() => router.push("/pdashboard")}>
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
                  ? "bg-[#ffffff] text-black rounded-lg"
                  : "hover:bg-gray-100 rounded-lg"
              }`}
              onClick={() => router.push("/chatbox")} // Clear doctorId to show healthcare provider chat
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
                      ? "bg-[#1F7A8C] text-white rounded-lg"
                      : "hover:bg-gray-100 rounded-lg"
                  }`}
                  onClick={() => router.push(`/chatbox?doctorId=${doctor.id}`)} // Update URL with selected doctor
                >
                  {doctor.name}
                </li>
              ))}
            </ul>

            {/* Add Doctor Button */}
            <button
              onClick={() => setShowPopup(true)}
              className="mt-4 w-full bg-[#1F7A8C] text-white py-2 px-4 rounded-lg hover:bg-[#1A6A7B] transition-colors"
            >
              Add Doctor
            </button>
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#1F7A8C] text-white rounded-lg hover:bg-[#1a6a7a] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Popup for Adding a Doctor */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-[#1F7A8C] mb-4">Add a Doctor</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Doctor's Full Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Hospital"
                value={newDoctor.hospital}
                onChange={(e) => setNewDoctor({ ...newDoctor, hospital: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newDoctor.number}
                onChange={(e) => setNewDoctor({ ...newDoctor, number: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDoctor}
                className="bg-[#1F7A8C] text-white py-2 px-4 rounded-lg hover:bg-[#1A6A7B] transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientChatPage;