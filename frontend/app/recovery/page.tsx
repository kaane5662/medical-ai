'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation';

const recoveryResources = [
{ name: 'PatientsLikeMe', url: 'https://www.patientslikeme.com', description: 'Connect with others who share your condition.' },
{ name: 'Smart Patients', url: 'https://www.smartpatients.com', description: 'Online community for patients and caregivers.' },
{ name: 'American Cancer Society', url: 'https://www.cancer.org', description: 'Support groups and resources for cancer patients.' },
];

export default function RecoverySupportPage() {
const router = useRouter();

return (
<div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
    {/* Navbar with Back Button and Centered Buttons */}
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
    {/* Back Button - Redirect to Recommendations */}
    <button
        className="p-2 bg-[#1F7A8C] text-white rounded-lg hover:bg-[#1A6A7B] transition-colors"
        onClick={() => router.push('/recommendations')}
    >
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

    {/* Centered Navbar Buttons */}
    <div className="flex items-center gap-4 mx-auto">
        <button
        onClick={() => router.push('/financial')}
        className="bg-[#1F7A8C] text-white py-2 px-4 rounded-lg hover:bg-[#1A6A7B] transition-colors"
        >
        Financial Help
        </button>
        <button
        onClick={() => router.push('/mentalhealth')}
        className="bg-[#1F7A8C] text-white py-2 px-4 rounded-lg hover:bg-[#1A6A7B] transition-colors"
        >
        Mental Health Support
        </button>
        <button
        onClick={() => router.push('/recovery')}
        className="bg-[#1F7A8C] text-white py-2 px-4 rounded-lg hover:bg-[#1A6A7B] transition-colors"
        >
        Recovery/Support Groups
        </button>
    </div>

    {/* Empty Div to Balance the Navbar */}
    <div className="w-10"></div>
    </nav>

    {/* Resource Content */}
    <div className="flex flex-col items-center justify-center p-8">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1F7A8C] mb-6 flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
        </svg>
        Recovery/Support Groups
        </h1>
        <div className="space-y-6">
        {recoveryResources.map((resource, index) => (
            <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-lg hover:bg-[#F0F0F0] transition-colors"
            >
            <h2 className="text-xl font-semibold text-[#1F7A8C] mb-2">{resource.name}</h2>
            <p className="text-gray-600">{resource.description}</p>
            </a>
        ))}
        </div>
    </div>
    </div>
</div>
);
}