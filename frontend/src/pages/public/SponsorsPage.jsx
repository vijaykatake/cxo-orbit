import GTS from "../../assets/Sponsors/GTS.avif";
import Webkorps from "../../assets/Sponsors/Webkorps.svg";
import Samay from "../../assets/Sponsors/Samay.png";

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
  ];

  return (
    <div className="min-h-[70vh] flex flex-col justify-center px-4">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Our Sponsors</h2>
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
                className="min-w-[200px] bg-white rounded-xl shadow-md p-4 flex items-center justify-center hover:shadow-lg transition"
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="h-12 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
