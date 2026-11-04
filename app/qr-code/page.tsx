"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const WEBSITE_URL = "https://siyanagoldanddiamonds.in/";

export default function QRCodePage() {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    QRCode.toDataURL(WEBSITE_URL, {
      width: 600,
      margin: 4,
      errorCorrectionLevel: "H",
      color: {
        dark: "#173F35",
        light: "#FFFFFF",
      },
    }).then(setQrImage);
  }, []);

  const downloadQR = () => {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "siyana-gold-diamonds-qr.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-[#173F35]">
          Siyana Gold & Diamonds
        </h1>

        <p className="text-gray-500 mt-2">
          Scan to explore our collection
        </p>

        {qrImage && (
          <div className="mt-7 flex justify-center">
            <img
              src={qrImage}
              alt="Siyana website QR code"
              className="w-64 h-64"
            />
          </div>
        )}

        <p className="mt-5 text-sm text-gray-500">
          www.siyanagoldanddiamonds.in
        </p>

        <button
          onClick={downloadQR}
          disabled={!qrImage}
          className="mt-7 w-full rounded-xl bg-[#173F35] text-white py-3 font-medium hover:bg-[#245747] disabled:opacity-50"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}