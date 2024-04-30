"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import QRCode from "react-qr-code";
import { useCallback, useState } from "react";

export default function Generate() {
  const [name, setName] = useState("");
  const [qrval, setqrval] = useState("");

  const onGenerate = () => {
    setqrval(name);

    console.log(qrval);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
          <div>Hello brother, what&apos;s ur name</div>
          <div className="text-sm italic font-light ">
            I will generate qr code for u
          </div>
        </div>

        <div>
          <TextField
            required
            id="outlined-controlled"
            label="Name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          className="w-full"
          onClick={() => {
            onGenerate();
          }}
        >
          Generate
        </Button>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
          }}
          className="pt-2 w-20"
        >
          <QRCode
            className={`${qrval === "" ? "hidden" : "block w-full h-auto"}`}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrval}
            viewBox={`0 0 256 256`}
          />
        </div>
      </Box>
    </main>
  );
}
