// import AcmeLogo from "./AcmeLogo"; // Import the AcmeLogo component
import Link from "next/link"; // Import the Link component from Next.js
import Image from "next/image"; // Import the Image component from Next.js
import { ArrowRightIcon } from "@heroicons/react/24/outline"; // Import the ArrowRightIcon component
import "./global.css";
import { lusitana } from "@/app/ui/fonts";
import ExpenShareLogo from "@/app/ui/expenshare-logo";

export default function Page() {
  return (
    <main class="flex min-h-screen flex-col p-6">
      <div class="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {<ExpenShareLogo />}
      </div>
      <div class="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div class="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            class={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to ExpenShare.</strong>
          </p>
          <Link
            href="/api/auth/signin"
            class="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon class="w-5 md:w-6" />
          </Link>
        </div>
        <div class="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          {/* <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          /> */}
        </div>
      </div>
    </main>
  );
}
