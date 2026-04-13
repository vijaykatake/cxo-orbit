import { useEffect, useState } from "react";
import api from "../../api";
import NewsCard from "./NewsCard";
import GalleryModal from "./GalleryModal";

export default function LatestNews({ hideTitle = false, limit }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGallery, setSelectedGallery] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    api
      .get("/home/news")
      .then((res) => {
        setNews(res.data.news || []);
      })
      .catch((err) => {
        console.error("NEWS API ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpenGallery = (images) => {
    if (!images || images.length === 0) return;
    setSelectedGallery(images);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedGallery([]);
  };

  // Loader
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 animate-pulse">
        <div className="text-lg font-medium">Loading Latest News...</div>
      </div>
    );
  }

  // Limit support (for homepage)
  const displayNews = limit ? news.slice(0, limit) : news;

  return (
    <div className="w-full px-[2%] py-6">
      {/* TITLE */}
      {!hideTitle && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#0B2C4D]">Latest News</h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>
      )}

      {/* NEWS GRID */}
      {displayNews.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {displayNews.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onOpenGallery={handleOpenGallery}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No News Available</div>
      )}

      {/* GALLERY MODAL */}
      {isGalleryOpen && (
        <GalleryModal images={selectedGallery} onClose={handleCloseGallery} />
      )}
    </div>
  );
}
