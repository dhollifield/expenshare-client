"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home after signout
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
