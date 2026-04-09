import GTS from "../../assets/Sponsors/GTS.avif";
import Webkorps from "../../assets/Sponsors/Webkorps.svg";
import Samay from "../../assets/Sponsors/Samay.png";
import techigent from "../../assets/Sponsors/Techkagent.png";
import OMSAI from "../../assets/Sponsors/OMSAI.png";
import paloaltonetworks from "../../assets/Sponsors/paloaltonetworks.svg";
import redingtongroup from "../../assets/Sponsors/redingtongroup.svg";

export default function SponsorsPage() {
  const sponsors = [
    {
      name: "GTS Technosoft Pvt. Ltd",
      image: GTS,
      link: "https://www.gtstechnosoft.com/",
    },
    {
      name: "Webkorps",
      image: Webkorps,
      link: "https://www.webkorps.com/",
    },
    {
      name: "Samay Info Solutions",
      image: Samay,
      link: "https://www.samayinfo.net/",
    },
    {
      name: "Techigent",
      image: techigent,
      link: "https://www.techigent.in/",
    },
    {
      name: "OM SAI CORPORATION",
      image: OMSAI,
      link: "https://omsaigroup.com/",
    },
    {
      name: "Palo Alto Networks",
      image: paloaltonetworks,
      link: "https://www.paloaltonetworks.com/",
    },
    {
      name: "Redington Limited",
      image: redingtongroup,
      link: "https://redingtongroup.com/",
    },
  ];

  return (
    <div className="min-h-[70vh] flex flex-col justify-center px-4">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Our Partners</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      {/* MARQUEE CONTAINER */}
      <div className="overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="animate-marquee">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[200px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition text-center"
              >
                {/* LOGO */}
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="h-12 object-contain mb-2"
                />

                {/* NAME */}
                <p className="text-sm font-semibold text-[#0B2C4D]">
                  {sponsor.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
