import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#022B3A] text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <Image
          src="/company-logo.svg" // Replace with your company logo
          alt="Company Logo"
          width={50}
          height={50}
        />

        <ul className="flex gap-8 text-lg font-semibold text-[#FFFFFF]">
          <li className="hover:underline">Home</li>
          <li className="hover:underline">Mission</li>
          <li className="hover:underline">Testimony</li>
          <li className="hover:underline">About</li>
        </ul>

        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#BFDBF7] text-[#022B3A] px-4 py-2 rounded">
                Login
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#E1E5F2]">
              <DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-[#022B3A]">
                      Patient
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#FFFFFF]">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                    <DropdownMenuItem>Signup</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-[#022B3A]">
                      Doctor
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#FFFFFF]">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                    <DropdownMenuItem>Signup</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20">
        <Image
          src="/company-logo.svg" // Replace with your company logo
          alt="Company Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-5xl font-bold mb-4 text-[#BFDBF7]">
          Your Company Name
        </h1>
        <p className="text-xl font-medium text-[#E1E5F2]">
          Inspiring Future, Today. {/* Replace with your slogan */}
        </p>
      </header>

      {/* Call to Action */}
      <main className="flex justify-center mt-10">
        <Button className="px-8 py-4 text-lg font-semibold" style={{ backgroundColor: "#BFDBF7", color: "#022B3A" }}>
          Get Started
        </Button>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-[#E1E5F2]">
        <p>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
