import bhushan from "../../assets/advisory/bhushan.jpg";
import sandesh from "../../assets/advisory/sandesh.jpg";
import randhir from "../../assets/advisory/randhir.jpg";

export default function AdvisoryBoardPage() {
  const members = [
    {
      name: "Bhushan Patil",
      role: "Strategy & Finance Director",
      image: bhushan,
      description:
        "Bhushan brings over 22 years of experience across strategy, finance, human capital, and organisational development. He leads financial controls, risk management, and corporate governance — architecting capital strategies and compliance frameworks that underpin institutional partnerships.",
    },
    {
      name: "Sandesh Yadav",
      role: "Cybersecurity Advisor",
      image: sandesh,
      description:
        "Sandesh is a distinguished cybersecurity expert with over two decades of experience in enterprise-grade security programs. Specializing in cloud security, application defense, and compliance, he translates complex technical challenges into business solutions and ensures secure digital growth.",
    },
    {
      name: "Dr. Randhir Padwal",
      role: "Technology & Strategy Advisor",
      image: randhir,
      description:
        "Dr. Randhir Padwal is a transformative technology executive with over 20 years of experience across pharma, healthcare, and manufacturing. His expertise spans digital transformation, cybersecurity, ERP modernization, and regulatory compliance.",
    },
  ];

  return (
    <div>
      {/* ── Header ───────────────── */}
      <section className="text-white py-6 text-center">
        <h1 className="text-3xl font-bold text-soft-gold">Advisory Board</h1>
      </section>

      {/* ── Section Title ───────────────── */}
      <section className="py-4 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-[#0B2C4D] tracking-wide">
            Strategic Leadership & Guidance
          </h2>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>

          <p className="fade-up text-gray-600 text-base md:text-lg mt-3 max-w-3xl mx-auto leading-relaxed">
            Our advisors bring decades of leadership experience across finance,
            cybersecurity, digital transformation, and enterprise strategy —
            ensuring CXO Orbit remains{" "}
            <span className="text-soft-gold font-semibold">future-ready</span>{" "}
            and globally relevant.
          </p>
        </div>

        {/* ── Members Grid ───────────────── */}
        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[4/3] object-fill"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-[#0B2C4D] font-bold text-lg">
                  {member.name}
                </h3>

                <p className="text-soft-gold text-sm font-semibold mb-2">
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
