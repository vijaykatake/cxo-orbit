import GTS from "../../assets/Sponsors/GTS.avif";
import Webkorps from "../../assets/Sponsors/Webkorps.svg";
import Samay from "../../assets/Sponsors/Samay.png";
import techigent from "../../assets/Sponsors/Techkagent.png";
import OMSAI from "../../assets/Sponsors/OMSAI.png";
import paloaltonetworks from "../../assets/Sponsors/paloaltonetworks.svg";
import redingtongroup from "../../assets/Sponsors/redingtongroup.svg";
export default function SponsorsScroller() {
  const sponsors = [
    { name: "GTS", image: GTS, link: "#" },
    { name: "Webkorps", image: Webkorps, link: "#" },
    { name: "Samay", image: Samay, link: "#" },
    { name: "Techigent", image: techigent, link: "#" },
    { name: "OM SAI", image: OMSAI, link: "#" },
    { name: "Palo Alto", image: paloaltonetworks, link: "#" },
    { name: "Redington", image: redingtongroup, link: "#" },
  ];

  return (
    <div className="overflow-hidden mt-4">
      <div className="animate-marquee flex gap-6">
        {[...sponsors, ...sponsors].map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[140px] bg-white rounded-lg shadow-sm p-3 flex items-center justify-center"
          >
            <img src={s.image} alt={s.name} className="h-10 object-contain" />
          </a>
        ))}
      </div>
    </div>
  );
}
