"use client";

import { useEffect } from "react";

export const BRANCHES = [
  { name: "Vengara", phone: "918938916916" },
  { name: "Othukkungal", phone: "917232916916" },
  { name: "Kizhisseri", phone: "917699916916" },
];

export default function BranchWhatsAppModal({ open, onClose, productName }) {
  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const openWhatsApp = (branch) => {
    const text = productName
      ? `Hi, I would like to know the latest price and availability of: ${productName}`
      : "Hi, I would like to know the latest price and availability.";
    const url = `https://wa.me/${branch.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-modal-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              id="branch-modal-title"
              className="text-lg font-semibold text-slate-900"
            >
              Choose a branch
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              We will open WhatsApp with the branch you select.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {BRANCHES.map((branch) => (
            <button
              key={branch.name}
              onClick={() => openWhatsApp(branch)}
              className="flex w-full items-center justify-between rounded-lg border border-[#b67b2a] px-4 py-3 text-left text-sm font-semibold text-[#935a13] transition hover:bg-[#f5ead8]"
            >
              <span>{branch.name}</span>
              <span className="text-xs font-medium text-slate-500">
                Chat on WhatsApp
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   USAGE (in your product card / page component)

   import { useState } from "react";
   import BranchWhatsAppModal from "@/components/BranchWhatsAppModal";

   const [branchModalOpen, setBranchModalOpen] = useState(false);

   <button
     onClick={() => setBranchModalOpen(true)}
     className="rounded-lg border border-[#b67b2a] px-4 py-2.5 text-sm font-semibold text-[#935a13] transition hover:bg-[#f5ead8]"
   >
     Get Latest Price
   </button>

   <BranchWhatsAppModal
     open={branchModalOpen}
     onClose={() => setBranchModalOpen(false)}
     productName={product.name}   // optional
   />
------------------------------------------------------------------- */