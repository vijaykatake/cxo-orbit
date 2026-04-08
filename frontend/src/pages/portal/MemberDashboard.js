import dashboardImg from "../../assets/dashboard-placeholder.png"; // 👉 change image path later
export default function MemberDashboard() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* HEADING */}
        <h1 className="text-3xl font-bold text-[#0B2C4D] mb-3">
          Welcome to CXO Orbit
        </h1>

        {/* SUBTEXT */}
        <p className="text-[rgb(31_166_160)] text-lg font-semibold mb-2">
          Your Rewards are coming soon
        </p>

        {/* DESCRIPTION */}
        <section className="max-w-4xl mx-auto text-center mb-2 px-4">
          <p className="text-[#0B2C4D] text-[18px] leading-7 text-center">
            We are building an exclusive experience for our members.{" "}
            <span className="font-semibold relative animated-highlight">
              ✨ Your dashboard, rewards, and personalized insights will be
              available very soon. ✨
            </span>
            Stay tuned for something exceptional.
          </p>
        </section>
        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-fadeInUp">
            <img
              src={dashboardImg}
              alt="CXO Orbit Dashboard Coming Soon"
              className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
