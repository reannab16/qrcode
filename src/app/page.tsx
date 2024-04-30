"use client";

import { Button } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  function Search() {
    const searchParams = useSearchParams();
    const user = searchParams.get("user");

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        {user ? (
          <div>Hello {user}</div>
        ) : (
          <div className="flex items-center justify-center flex-col w-full gap-y-2">
            <div className="">What do you want to do today?</div>
            <div className="flex items-center justify-center w-full gap-x-2">
              <Button
                variant="contained"
                className=""
                onClick={() => {
                  router.push("/generate");
                }}
              >
                Generate QR
              </Button>
              <Button
                variant="contained"
                className="text-nowrap"
                onClick={() => {
                  router.push("/scanner");
                }}
              >
                Scan QR
              </Button>
            </div>{" "}
          </div>
        )}
      </main>
    );
  }

  const router = useRouter();

  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
