'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation';

export default function RecommendationsPage() {
const router = useRouter();

return (
<div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
    {/* Navbar with Back Button and Centered Buttons */}
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
    {/* Back Button - Redirect to Dashboard */}
    <button
        className="p-2 bg-[#1F7A8C] text-white rounded-lg hover:bg-[#1A6A7B] transition-colors"
        onClick={() => router.push('/pdashboard')}
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

    {/* Main Content */}
    <div className="flex flex-col items-center justify-center p-8">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1F7A8C] mb-6">Recommendations</h1>
        <p className="text-lg text-gray-700 mb-8">
        Welcome to the Recommendations page! Here, you can find resources for financial help, mental health support, and recovery/support groups. Click on the buttons above to explore each category.
        </p>

        {/* Financial Help Section */}
        <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F7A8C] mb-4 flex items-center gap-2">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 0v1m0-1H9m3 0h3m-3 0H9m3 0h3"
            />
            </svg>
            Financial Help
        </h2>
        <p className="text-gray-600">
            Access resources to help with medical bills, medication costs, and other financial challenges.
        </p>
        </div>

        {/* Mental Health Support Section */}
        <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F7A8C] mb-4 flex items-center gap-2">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
            </svg>
            Mental Health Support
        </h2>
        <p className="text-gray-600">
            Find support for mental health challenges, including therapy, crisis hotlines, and self-help tools.
        </p>
        </div>

        {/* Recovery/Support Groups Section */}
        <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1F7A8C] mb-4 flex items-center gap-2">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
            </svg>
            Recovery/Support Groups
        </h2>
        <p className="text-gray-600">
            Connect with others who share similar experiences through support groups and recovery programs.
        </p>
        </div>
    </div>
    </div>
</div>
);
}