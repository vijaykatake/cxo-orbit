import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { format } from "date-fns";
import {
  FiCalendar,
  FiMapPin,
  FiFilter,
  FiUsers,
  FiImage,
} from "react-icons/fi";

import table1Hero from "../../assets/Tables/Table1/Hero.jpeg";
import table2Hero from "../../assets/Tables/Table2/Hero.jpeg";
import table3Hero from "../../assets/Tables/Table3/Hero.jpeg";
import table4Hero from "../../assets/Tables/Table4/Hero.jpeg";
import t1_img1 from "../../assets/Tables/Table1/img1.jpeg";
import t1_img2 from "../../assets/Tables/Table1/img2.jpeg";
import t1_img3 from "../../assets/Tables/Table1/img3.jpeg";

import t2_img1 from "../../assets/Tables/Table2/img1.jpeg";
import t2_img2 from "../../assets/Tables/Table2/img2.jpeg";
import t2_img3 from "../../assets/Tables/Table2/img3.jpeg";
import t2_img4 from "../../assets/Tables/Table2/img4.jpeg";

import t4_img1 from "../../assets/Tables/Table4/img1.jpeg";
import t4_img2 from "../../assets/Tables/Table4/img2.jpeg";
import t4_img3 from "../../assets/Tables/Table4/img3.jpeg";
import t4_img4 from "../../assets/Tables/Table4/img4.jpeg";

// Upcomming Images
import Upcomming01 from "../../assets/Tables/Upcomming/Beyond Cost Savings.jpg";
import Upcomming02 from "../../assets/Tables/Upcomming/Infrastructure2026.png";
import Upcomming03 from "../../assets/Tables/Upcomming/ScallingWorkload.png";
import Upcomming04 from "../../assets/Tables/Upcomming/Cybersecurity01.jpg";
import Upcomming05 from "../../assets/Tables/Upcomming/Overseas.png";
import Upcomming06 from "../../assets/Tables/Upcomming/ModernIT.jpg";
import Upcomming07 from "../../assets/Tables/Upcomming/WareFare.png";
import Upcomming08 from "../../assets/Tables/Upcomming/Balancing.jpg";

const EVENT_TYPES = ["all", "conference", "roundtable", "webinar"];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  /* =========================
     GALLERY STATE
  ========================= */
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = filter !== "all" ? `?type=${filter}` : "";
    api
      .get(`/events${params}`)
      .then((res) => setEvents(res.data.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [filter]);

  /* =========================
     ROUND TABLE DATA
  ========================= */
  const upcomingEvents = [
    {
      title: "Round Table",
      image: Upcomming01, // ✅ ADD
      topic: "Beyond Cost Savings: Driving ROI from Cloud Investments",
      date: "April",
      location: "Pune",
      partner: "Teleglobal Internationals",
      url: "https://forms.gle/XMLEA6XPex11ReWV7",
      gallery: [table1Hero], // ✅ ADD
    },
    {
      title: "Round Table",
      image: Upcomming02,
      topic: "Infrastructure 2026: From Cost Center to Business Enabler",
      date: "June",
      location: "Hyderabad",
      partner: "To Be decide",
      url: "https://forms.gle/Saq6sbivNtkJoVdv9",
      gallery: [table2Hero],
    },
    {
      title: "Round Table",
      image: Upcomming03,
      topic: "Scaling AI Workloads Without Breaking Infra Budgets",
      date: "May",
      location: "Bangalore",
      partner: "To Be decide",
      url: "https://forms.gle/boK26QnpQbd1E8FQA",
      gallery: [table3Hero],
    },
    {
      title: "Round Table",
      image: Upcomming04,
      topic: "Cybersecurity as a Business Risk: Boardroom Conversations",
      date: "May",
      location: "Mumbai",
      partner: "To Be decide",
      url: "https://forms.gle/7iFu2QVGrhGfPGPy8",
      gallery: [table4Hero],
    },

    {
      title: "Mini Conference",
      image: Upcomming05,
      topic: "Overseas CIO Meet",
      date: "September",
      location: "Phuket, Krabi",
      partner: "To be decide",
      url: "https://forms.gle/8CfhvzmUPqQup6TE8",
      gallery: [table1Hero],
    },
    {
      title: "Round Table",
      image: Upcomming06,
      topic: "Zero Trust 2.0: Beyond ‘Never Trust, Always Verify’",
      date: "July",
      location: "Chennai",
      partner: "To Be decide",
      url: "https://forms.gle/3G4Qba3Fk6NZYcTG9",
      gallery: [table2Hero],
    },
    {
      title: "Round Table",
      image: Upcomming07,
      topic: "Cyber Warfare & Enterprise Security: Are We Prepared?",
      date: "June",
      location: "Mumbai",
      partner: "To Be decide",
      url: "https://forms.gle/4zxCJbGYJFtLysm97",
      gallery: [table3Hero],
    },
    {
      title: "Round Table",
      image: Upcomming08,
      topic: "Balancing Cost, Risk & Performance in Modern IT",
      date: "May",
      location: "Pune",
      partner: "To Be decide",
      url: "https://forms.gle/CFTWUnhL4ZDCgu6R6",
      gallery: [table4Hero],
    },
  ];
  const roundTables = [
    {
      title: "Round Table 1",
      image: table1Hero,
      topic: "CIO Kite-Festival @ Zapurza Museum of Art & Culture",
      date: "January 13th 2026 @ 9:00am to 4pm",
      location: "Zapurza Museum of Art & Culture, Pune",
      partner: "Techigent technologies pvt ltd",
      gallery: [t1_img1, t1_img2, t1_img3],
    },
    {
      title: "Round Table 2",
      image: table2Hero,
      topic: `"Modern IT, Real Impact" → Focus: Delivering actual business value through IT transformation.`,
      date: "July 30th, 2025 at 6:30 PM",
      location: "Novotel, Pune",
      partner: "Webkorps Services India Pvt Ltd.",
      gallery: [t2_img1, t2_img2, t2_img3, t2_img4, table2Hero],
    },
    {
      title: "Round Table 3",
      image: table3Hero,
      topic: "Redefining Network Security in the Age of AI-Powered Threats",
      date: "25th July 2025 @ 6:30PM",
      location: "Conrad, Pune",
      partner: "GTS, Paloalto and Redington",
      gallery: [table3Hero, table3Hero, table3Hero, table3Hero, table3Hero],
    },
    {
      title: "Round Table 4",
      image: table4Hero,
      topic:
        "How effective are your current cyber-security operations and controls?",
      date: "Details coming soon",
      location: "Novotel, Pune",
      partner: "Samay InfoSolution",
      gallery: [t4_img1, t4_img2, t4_img3, t4_img4],
    },
  ];

  const openGallery = (images) => {
    setGalleryImages(images);
    setCurrentIndex(0);
    setGalleryOpen(true);
  };

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);

  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title">Events & Conferences</h1>
        <p className="section-subtitle">
          Exclusive CXO gatherings, forums, and roundtables
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all capitalize
            ${
              filter === type
                ? "bg-royal-blue text-white border-royal-blue"
                : "border-gray-300 text-gray-600 hover:border-royal-blue"
            }`}
          >
            {type === "all" ? "All Events" : type}
          </button>
        ))}
      </div>
      {/* =========================
    UPCOMING EVENTS
========================= */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-[#0B2C4D] mb-10">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingEvents.map((ev, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow text-sm">
                {/* TOPIC */}
                <p className="font-semibold text-[rgb(31_166_160)] text-[15px] mb-2 text-center">
                  {ev.topic}
                </p>

                {/* DATE */}
                <div className="flex gap-2 mb-2">
                  <FiCalendar className="text-[#D4AF37] text-lg" />
                  <span>{ev.date}</span>
                </div>

                {/* LOCATION */}
                <div className="flex gap-2 mb-2">
                  <FiMapPin className="text-[#D4AF37] text-lg" />
                  <span>{ev.location}</span>
                </div>

                {/* PARTNER */}
                <div className="flex gap-2 mb-4">
                  <FiUsers className="text-[#D4AF37] text-lg" />
                  <span>{ev.partner}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-auto">
                  {/* GALLERY */}

                  {/* REGISTER */}
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[rgb(31_166_160)] text-white py-2 rounded text-center font-medium hover:opacity-90 transition"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROUND TABLES */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-[#0B2C4D] mb-10">
          CXO Round Tables
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roundTables.map((rt, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={rt.image}
                alt={rt.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow text-sm">
                <p className="font-semibold text-[#0B2C4D] mb-1">Topic</p>
                <p className="font-semibold text-[rgb(31_166_160)] text-[15px] mb-1 text-center">
                  {rt.topic}
                </p>

                <div className="flex gap-2 mb-2">
                  <FiCalendar className="text-[#D4AF37] text-lg" />
                  <span>{rt.date}</span>
                </div>

                <div className="flex gap-2 mb-2">
                  <FiMapPin className="text-[#D4AF37] text-lg" />
                  <span>{rt.location}</span>
                </div>

                <div className="flex gap-2 mb-4">
                  <FiUsers className="text-[#D4AF37] text-lg" />
                  <span>{rt.partner}</span>
                </div>

                <button
                  onClick={() => openGallery(rt.gallery)}
                  className="mt-auto bg-[#0B2C4D] text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FiImage /> View Gallery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          GALLERY MODAL
      ========================= */}
      {/* =========================
    PROFESSIONAL GALLERY MODAL
========================= */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-5xl">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>

            {/* MAIN IMAGE */}
            <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={galleryImages[currentIndex]}
                alt="gallery"
                className="max-h-[75vh] object-contain"
              />
            </div>

            {/* NAVIGATION */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-r hover:bg-black"
            >
              ◀
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-l hover:bg-black"
            >
              ▶
            </button>

            {/* IMAGE COUNT */}
            <div className="text-center text-white text-sm mt-3">
              {currentIndex + 1} / {galleryImages.length}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${
                    currentIndex === i ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
