import { useState } from "react";
import SponsorsScroller from "../../components/home/SponsorsScroller";
import PartnerRegistrationModal from "../../components/modal/PartnerRegistrationModal";

export default function SponsorsPage() {
  const [openPartnerModal, setOpenPartnerModal] = useState(false);

  return (
    <div className="min-h-[70vh] px-4 pt-6">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Our Partners</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      {/* SCROLLER */}
      <SponsorsScroller />

      {/* BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setOpenPartnerModal(true)}
          className="bg-soft-gold text-royal-blue text-sm px-6 py-2 rounded font-medium hover:opacity-90"
        >
          Partner With Us
        </button>
      </div>

      {/* ✅ CORRECT MODAL */}
      <PartnerRegistrationModal
        isOpen={openPartnerModal}
        onClose={() => setOpenPartnerModal(false)}
      />
    </div>
  );
}
