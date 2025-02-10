"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data } = useSession();

  if (!data?.user) {
    return (
      <div className="flex flex-col items-center align-center justify-center h-screen">
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center align-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center align-center justify-center">
        <div>{JSON.stringify(data)}</div>
        <Link href="http://localhost:3001">Go to app</Link>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
};

export default Page;
