import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

interface TestimonialProps {
  brand: string;
  comment: string;
}

function Testimonial({ brand, comment }: TestimonialProps) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center text-center">
      <h1 className="text-2xl font-semibold max-md:text-xl text-[#BFDBF7]">{brand}</h1>
      <h3 className="text-lg max-md:text-sm text-[#E1E5F2]">{comment}</h3>
      <div className="flex justify-center items-center gap-2 text-[#FFD700]">
        {[...Array(5)].map((_, index) => (
          <span key={index}>&#9733;</span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#022B3A] text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <Image
          src="/company-logo.png"
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

      {/* Testimonials Section */}
      <div
        id="testimonials"
        className="relative min-h-screen text-secondary flex justify-center items-center"
      >
        <div className="justify-center items-center flex flex-col gap-12 p-12">
          <h1 className="text-5xl font-bold max-md:text-4xl text-[#BFDBF7]">
            Testimonials
          </h1>
          <h1 className="text-3xl font-semibold max-md:text-xl text-[#E1E5F2]">
            What our clients say about us
          </h1>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-24 max-md:gap-16 px-0 items-start">
            <Testimonial
              brand="SafeMed Solutions"
              comment="SafeMed's platform has revolutionized how we approach patient safety. The advanced tools and analytics have significantly reduced medical errors in our practice, ensuring better outcomes for our patients."
            />
            <Testimonial
              brand="Guardian Health"
              comment="Thanks to SafeMed, we have successfully implemented a robust error prevention system. Their insights and solutions have empowered our team to deliver safer, more reliable care."
            />
            <Testimonial
              brand="Precision Care"
              comment="SafeMed's dedication to patient safety is unmatched. Their innovative approach and user-friendly tools have transformed our workflows, making safety a top priority in every step of the patient journey."
            />
          </div>
        </div>
      </div>
    </div>
  );
}