import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <header className="text-center mb-10">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={150}
          height={35}
          className="dark:invert mx-auto"
        />
        <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-100">
          Welcome to Your App
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore the power of Next.js and ShadCN components.
        </p>
      </header>

      <main className="flex flex-col items-center gap-8 w-full max-w-lg">
        <Card className="w-full">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Interactive Features
            </h2>
            <form className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Enter your name"
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="default">Default Theme</Button>
          <Button variant="secondary">Secondary Theme</Button>
        </div>
      </main>

      <footer className="mt-10 text-center text-gray-500 dark:text-gray-400">
        <p>
          Built with <a href="https://nextjs.org" className="underline">Next.js</a>{" "}
          and <a href="https://shadcn.dev" className="underline">ShadCN</a>.
        </p>
      </footer>
    </div>
  );
}
