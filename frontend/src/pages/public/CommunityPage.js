import { useState } from "react";
import RegisterMemberModal from "../../components/modal/RegisterMemberModal";

export default function CommunityPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="section-title text-center mb-6">CXO Community</h1>

      <p className="text-center mb-10 text-gray-600">
        Join the CXO Orbit Global community to connect with technology leaders,
        participate in exclusive events, and build strategic partnerships.
      </p>

      <div className="text-center">
        <button onClick={() => setOpen(true)} className="btn-primary">
          Join as CXO Member
        </button>
      </div>

      {/* Registration Modal */}
      <RegisterMemberModal open={open} setOpen={setOpen} />
    </div>
  );
}
