import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export default function Mission() {
  return (
    <div className="min-h-screen bg-[#022B3A] text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <Image
          src="/company-logo.png" // Replace with your company logo
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
            <Link href="/">About</Link>
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

      {/* Mission Statement Section */}
      <div
        id="mission"
        className="relative min-h-screen text-secondary flex justify-center items-center"
      >
        <div className="justify-center items-center flex flex-col gap-12 p-12">
          <h1 className="text-5xl font-bold max-md:text-4xl text-[#BFDBF7]">
            Our Mission
          </h1>
          <div className="max-w-3xl text-center">
            <p className="text-xl font-medium text-[#E1E5F2]">
              At <span className="font-bold text-[#FFD700]">Care4All</span>, our mission is to streamline communication between you and your Health Care Provider. Care4All strives to rid the days of hospital miscommunication. This is why we are committed to:
            </p>
            <ul className="mt-6 text-lg text-[#E1E5F2] list-disc list-inside">
              <li className="mb-3">
                <span className="font-semibold text-[#FFD700]">Enhancing Patient Safety:</span> Reducing medical errors and ensuring the highest standards of care.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#FFD700]">Empowering Healthcare Professionals:</span> Providing tools and insights to improve decision-making and efficiency.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#FFD700]">Driving Innovation:</span> Continuously pushing the boundaries of what's possible in healthcare technology.
              </li>
              <li className="mb-3">
                <span className="font-semibold text-[#FFD700]">Building Trust:</span> Fostering transparency and accountability in every aspect of our work.
              </li>
            </ul>
            <p className="mt-6 text-xl font-medium text-[#E1E5F2]">
              Together, we are shaping a future where healthcare is safer, smarter, and more accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}