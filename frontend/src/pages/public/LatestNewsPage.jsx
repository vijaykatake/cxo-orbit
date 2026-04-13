import LatestNews from "../../components/home/LatestNews";

export default function LatestNewsPage() {
  return (
    <div className="min-h-[70vh] px-4 pt-6">
      {/* TITLE (MATCH HOME STYLE) */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Latest News</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      {/* FULL NEWS */}
      <div className="max-w-7xl mx-auto">
        <LatestNews hideTitle />
      </div>
    </div>
  );
}
