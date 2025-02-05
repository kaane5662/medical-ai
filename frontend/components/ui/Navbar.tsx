import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
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
  );
};

export default Navbar;
