import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export default function About() {
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
          <li className="hover:underline">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link href="/mission">Mission</Link>
          </li>
          <li className="hover:underline">
            <Link href="/testimony">Testimony</Link>
          </li>
          <li className="hover:underline">
            <Link href="/about">About</Link>
          </li>
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

      {/* About Section */}
      <div
        id="about"
        className="relative min-h-screen text-secondary flex justify-center items-center"
      >
        <div className="justify-center items-center flex flex-col gap-12 p-12">
          <h1 className="text-5xl font-bold max-md:text-4xl text-[#BFDBF7]">
            About Us
          </h1>

          {/* Who We Are Section */}
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl font-semibold mb-6 text-[#BFDBF7]">
              Who We Are
            </h2>
            <p className="text-xl font-medium text-[#E1E5F2]">
              At <span className="font-bold text-[#BFDBF7]">Your Company Name</span>, we are a team of passionate professionals dedicated to transforming healthcare through innovation and technology. Our mission is to make healthcare safer, more efficient, and accessible for everyone.
            </p>
          </div>

          {/* Our Team Section */}
          <div className="max-w-3xl text-center mt-12">
            <h2 className="text-3xl font-semibold mb-6 text-[#BFDBF7]">
              Our Team
            </h2>
            <p className="text-xl font-medium text-[#E1E5F2]">
              Our team consists of experienced healthcare professionals, software engineers, and data scientists who work together to develop cutting-edge solutions. We are united by a shared vision of improving patient outcomes and empowering healthcare providers.
            </p>
          </div>

          {/* Our Values Section */}
          <div className="max-w-3xl text-center mt-12">
            <h2 className="text-3xl font-semibold mb-6 text-[#BFDBF7]">
              Our Values
            </h2>
            <ul className="text-lg text-[#E1E5F2] list-disc list-inside">
              <li className="mb-3">
                <span className="font-semibold text-[#BFDBF7]">Innovation:</span> We constantly push the boundaries of what's possible in healthcare technology.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#BFDBF7]">Integrity:</span> We are committed to transparency, honesty, and ethical practices.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#BFDBF7]">Collaboration:</span> We believe in the power of teamwork and partnerships to achieve our goals.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#BFDBF7]">Patient-Centricity:</span> Everything we do is focused on improving the lives of patients.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}