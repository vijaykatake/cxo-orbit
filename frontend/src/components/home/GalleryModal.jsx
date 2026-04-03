import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function GalleryModal({ images = [], onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomed(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomed(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      {/* 🔥 CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        <FiX />
      </button>

      {/* 🔥 MAIN CONTENT */}
      <div className="relative w-full max-w-4xl">
        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={currentImage}
            alt="gallery"
            onClick={() => setZoomed(!zoomed)}
            className={`cursor-zoom-in transition-transform duration-300 ${
              zoomed ? "scale-150" : "scale-100"
            } max-h-[70vh] object-contain`}
          />
        </div>

        {/* 🔥 NAVIGATION */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl px-2"
            >
              <FiChevronLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl px-2"
            >
              <FiChevronRight />
            </button>
          </>
        )}

        {/* 🔥 THUMBNAILS */}
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              onClick={() => {
                setCurrentIndex(index);
                setZoomed(false);
              }}
              className={`w-16 h-12 object-cover cursor-pointer border ${
                index === currentIndex ? "border-white" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
