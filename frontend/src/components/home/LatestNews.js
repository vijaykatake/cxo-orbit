import { useEffect, useState } from "react";
import api from "../../api";
import NewsCard from "./NewsCard";
import GalleryModal from "./GalleryModal";

export default function LatestNews() {
  const [latestNews, setLatestNews] = useState([]);
  const [pastNews, setPastNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGallery, setSelectedGallery] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    api
      .get("/home/news")
      .then((res) => {
        console.log("HOME NEWS:", res.data); // 👈 ADD THIS

        setLatestNews(res.data.latestNews || []);
        setPastNews(res.data.pastNews || []);
      })
      .catch((err) => {
        console.error("NEWS API ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpenGallery = (images) => {
    if (!images || images.length === 0) return; // safety

    setSelectedGallery(images);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedGallery([]);
  };

  // 🔥 Loader UI
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 animate-pulse">
        <div className="text-lg font-medium">Loading Latest News...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-[2%] py-6">
      {/* 🔥 LATEST NEWS */}
      {latestNews.length > 0 && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">Latest News</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {latestNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                onOpenGallery={handleOpenGallery}
              />
            ))}
          </div>
        </>
      )}
      {latestNews.length === 0 && !loading && (
        <div className="text-center text-gray-400 mb-10">
          No Latest News Available
        </div>
      )}
      {/* 🔥 PAST NEWS */}
      {pastNews.length > 0 && (
        <>
          <div className="text-center mt-12 mb-6">
            <h2 className="text-3xl font-bold text-[#0B2C4D]">Past News</h2>
            <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {pastNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                onOpenGallery={handleOpenGallery}
              />
            ))}
          </div>
        </>
      )}
      {pastNews.length === 0 && !loading && (
        <div className="text-center text-gray-400">No Past News Available</div>
      )}
      {/* 🔥 Gallery Modal */}
      {isGalleryOpen && (
        <GalleryModal images={selectedGallery} onClose={handleCloseGallery} />
      )}
    </div>
  );
}
