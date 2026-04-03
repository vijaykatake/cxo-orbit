import {
  FiCalendar,
  FiMapPin,
  FiExternalLink,
  FiImage,
  FiCreditCard, // 👈 visiting card style
} from "react-icons/fi";
import { format } from "date-fns";

export default function NewsCard({ news, onOpenGallery }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-[0_8px_25px_rgba(212,175,55,0.25)] overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* 🔥 IMAGE + TITLE OVERLAY */}
      <div className="relative group">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={news.main_image}
            alt={news.title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            onClick={() => window.open(news.main_image, "_blank")}
          />
        </div>

        {/* Overlay Title */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white text-sm font-semibold leading-tight">
            {news.title}
          </h3>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-4 text-sm text-gray-700">
        {/* 🔥 DATE + VENUE */}
        <div className="flex gap-2 mb-3 text-sm border-b border-[#f0e6c2] pb-2">
          {/* DATE (fixed width, no wrap) */}
          <div className="flex items-center gap-1 whitespace-nowrap min-w-[120px] font-semibold">
            <FiCalendar size={14} className="text-red-500" />
            <span>
              {news.date ? format(new Date(news.date), "dd-MMM-yyyy") : "TBA"}
            </span>
          </div>

          {/* VENUE (multi-line allowed) */}
          <div className="flex text-sm  items-start gap-1 leading-snug ">
            <FiMapPin size={14} className="text-red-500 mt-[2px]" />
            <span>{news.venue || "TBA"}</span>
          </div>
        </div>

        {/* 🔥 INFO (HIGHLIGHTED / RAISED) */}
        {news.info && (
          <div className="mb-3 p-2 bg-[#f5f8fc] border-l-4 border-[#0B2C4D] text-[#0B2C4D] font-medium leading-snug">
            {news.info}
          </div>
        )}

        {/* 🔥 ADDRESS */}
        {news.address && (
          <div className="mb-3 flex items-start gap-2  text-sm border-b border-[#f0e6c2] pb-2">
            <FiCreditCard size={14} className="text-red-500 mt-[2px]" />
            <span className="leading-snug">{news.address}</span>
          </div>
        )}

        {/* 🔥 LINK */}
        {news.link && (
          <div className="mb-2">
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-1 text-red-600 font-semibold text-sm hover:underline transition"
            >
              Visit Link <FiExternalLink size={14} />
            </a>
          </div>
        )}

        {/* 🔥 GALLERY BUTTON */}
        {news.gallery && news.gallery.length > 0 && (
          <button
            onClick={() => onOpenGallery(news.gallery)}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-[#0B2C4D] text-white text-xs py-2 rounded-md hover:bg-[#163d66] transition"
          >
            <FiImage size={14} />
            View Gallery
          </button>
        )}
      </div>
    </div>
  );
}
