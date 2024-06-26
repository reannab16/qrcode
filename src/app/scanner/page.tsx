"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Suspense } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button } from "@mui/material";

export default function Scanner() {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [startScan, setStartScan] = useState(false);
  const pathname = usePathname();

  function Search() {
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);

        return params.toString();
      },
      [searchParams]
    );

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
      setScannedResult(result?.data);
      router.push(
        pathname.replace("scanner", "") +
          "?" +
          createQueryString("user", `${result?.data}`)
      );
    };

    // Fail
    const onScanFail = (err: string | Error) => {
      console.log(err);
    };

    useEffect(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError: onScanFail,
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: qrBoxEl?.current || undefined,
        });

        // 🚀 Start QR Scanner
        scanner?.current
          ?.start()
          .then(() => setQrOn(true))
          .catch((err) => {
            if (err) setQrOn(false);
          });
      }
    }, [startScan]);

    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
      if (!qrOn)
        alert(
          "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
        );
    }, [qrOn]);

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className=" border-[1px] border-slate-400 rounded-md shadow-sm flex items-center justify-center p-4 flex-col gap-y-2"
        >
          <div className="flex flex-col items-center justify-start p-2">
            <div>i am allowing u to scan ur qr code</div>
            <div className="text-sm italic font-light "></div>
          </div>

          <Button
            variant="contained"
            className="w-full"
            onClick={() => {
              setStartScan(true);
            }}
          >
            scan qr code
          </Button>

          {startScan && (
            <div className="w-40 h-40">
              {/* QR */}
              <video
                ref={videoEl}
                className="w-full h-full object-cover"
              ></video>
              <div ref={qrBoxEl} className="w-full left-0"></div>
            </div>
          )}
        </Box>
      </main>
    );
  }

  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
