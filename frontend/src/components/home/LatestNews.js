import { newsData } from "../../data/newsData";

export default function LatestNews() {
  return (
    <section className="bg-[#F8F6F2] py-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#0B2C4D] tracking-wide">
          LATEST NEWS
        </h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {newsData.map((item) => (
          <div key={item.id} className="bg-white shadow-md">
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white px-3 py-2 font-bold text-lg shadow">
                  {item.title}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-red-600 text-sm font-semibold mb-2">
                | {item.category} | Editorial Team
              </p>

              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
