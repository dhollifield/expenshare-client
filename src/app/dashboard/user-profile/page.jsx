// app/user-profile/page.js

"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Show a loading state while authentication status is being determined
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Render the user profile if the user is authenticated
  return (
    <div class="mc-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">User Profile</h1>
      
      <div class="border-black rounded-lg p-4 drop-shadow-xl">
          {session && (
            <div>
              <p class="mt-1.5 text-sm text-gray-500">User Name: {session.user.name}</p>
              <p class="mt-1.5 text-sm text-gray-500">Email: {session.user.email}</p>
              {/* Display other user information as needed */}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
