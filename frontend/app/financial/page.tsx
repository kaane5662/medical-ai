'use client'; // Mark this as a Client Component

import { useRouter } from 'next/navigation';

const financialResources = [
{ name: 'HealthWell Foundation', url: 'https://www.healthwellfoundation.org', description: 'Provides financial assistance for medications and treatments.' },
{ name: 'GoodRx', url: 'https://www.goodrx.com', description: 'Find discounts and coupons for prescription medications.' },
{ name: 'PAN Foundation', url: 'https://www.panfoundation.org', description: 'Offers assistance for out-of-pocket medical costs.' },
];

export default function FinancialHelpPage() {
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 0v1m0-1H9m3 0h3m-3 0H9m3 0h3"
            />
        </svg>
        Financial Help
        </h1>
        <div className="space-y-6">
        {financialResources.map((resource, index) => (
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