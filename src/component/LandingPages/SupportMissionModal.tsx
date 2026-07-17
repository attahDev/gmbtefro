// SupportMissionModal.tsx

import React, { useEffect, useState } from "react";
import { X, Heart, Copy, Check, Phone } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const bankDetails = [
  { label: "Account Name", value: "Greater Manchester Black Tech Expo" },
  { label: "Account Number", value: "71813360" },
  { label: "Sort Code", value: "30-54-66" },
];

const phoneNumber = "+447405230017";

const SupportMissionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-[480px]
          max-h-[90vh]
          bg-white
          rounded-2xl
          shadow-[0_40px_120px_rgba(0,0,0,0.35)]
          flex
          flex-col
          overflow-hidden
          animate-[fadeInScale_0.25s_ease-out]
        "
      >
        {/* HEADER */}
        <div className="bg-[#0B1F3B] px-6 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#FFD700] hover:scale-110 transition"
          >
            <X size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <Heart className="text-[#FFD700]" size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Support the Mission</h2>
              <p className="mt-1 text-sm text-white/80 leading-5">
                Empower more people across Greater Manchester through tech and opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-[#0B1F3B]">
              Bank Transfer Details
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              You can send your support directly using the details below.
            </p>

            <div className="mt-4 space-y-3">
              {bankDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3"
                >
                  <div>
                    <p className="text-xs text-gray-500">{detail.label}</p>
                    <p className="text-base font-semibold text-[#0B1F3B]">
                      {detail.value}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(detail.label, detail.value)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#0B1F3B] transition hover:border-[#FFD700]"
                  >
                    {copiedField === detail.label ? (
                      <>
                        <Check size={14} className="text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#FFF8DB] border-2 border-[#FFD700] px-4 py-3">
            <div className="flex items-center gap-2 text-[#0B1F3B]">
              <Phone size={16} />
              <p className="text-xs font-medium">
                Questions about your donation? Call us
              </p>
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="mt-1 block text-lg font-bold text-[#0B1F3B]"
            >
              {phoneNumber}
            </a>
          </div>

          <p className="text-center text-xs text-gray-500">
            Thank you for empowering Greater Manchester's next generation.
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SupportMissionModal;
