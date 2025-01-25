'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation';

const mentalHealthResources = [
{ name: 'BetterHelp', url: 'https://www.betterhelp.com', description: 'Affordable online therapy with licensed professionals.' },
{ name: 'Crisis Text Line', url: 'https://www.crisistextline.org', description: 'Text HOME to 741741 for free, 24/7 crisis support.' },
{ name: 'NAMI', url: 'https://www.nami.org', description: 'National Alliance on Mental Illness support and resources.' },
];

export default function MentalHealthSupportPage() {
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
        Mental Health Support
        </h1>
        <div className="space-y-6">
        {mentalHealthResources.map((resource, index) => (
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