"use client";
import { Button } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Scanner() {
  const [scanResult, setScanResult] = useState<null | string>(null);
  const router = useRouter();
  const [cameraWorks, setCameraworks] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 5, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    scanner.render(success, error);

    function success(result: string) {
      setScanResult(result);
      scanner.clear();
      router.push("/" + result);
    }

    function error(err: any) {
      console.warn(err);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 App w-full h-full gap-y-2">
      <div className="">i am allowing u to scan ur qr</div>
      {scanResult ? <></> : <div id="reader" className="rounded-md p-2"></div>}
      { <Button
        variant="contained"
        className=""
        onClick={() => {
          Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              var cameraId = devices[0].id;
              setCameraworks(true);
              // .. use this to start scanning.
            }
          }).catch(err => {
            // handle err
          });
        }}
      >
        {cameraWorks ? "start scanning":"request camera permissions"}
      </Button>}
    </main>
  );
}
