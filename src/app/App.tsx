import React, { useState } from "react";
import { subscribeEmail, type SubscribeSource } from "../lib/subscribe";
import svgPaths from "../imports/svg-vot6on5w32";
import imgTempImageoeBDv61 from "../assets/3350787ad17ae4b45fcbcb8b14b1a1912b5dd458.png";
import imgDividendsSvgFill from "../assets/c201ccd2ba45b33ba22918ace1cab3697713868f.png";
import imgTempImage8XWcEf1 from "../assets/3dd7241ed4005a0d974c6445526041504c310a8d.png";
import imgContainer from "../assets/Container.png";
import imgScreenshot20260222At2116362 from "../assets/48d544bc9a6bd6281edd320ac5aa2a7d9dd5a0b6.png";
import imgTempImage81Zaan1 from "../assets/f7bdaf446af6e0c6a8f762b43907a100cbbc9cfe.png";
import imgTempImageL0T8Dg1 from "../assets/70f311e56b9414a5eb0f2beda0fd3186636eb607.png";
import imgTempImagekQmQuu1 from "../assets/cdebe1705ca53c37004851485ca450b46ef8a343.png";
import imgFooter from "../assets/c1281d0f536a3a27ca6fc9ee4116202d78d4a67b.png";
import { SafetyScoreCard } from "./components/SafetyScoreCard";

// ============ LOGO ============
function WealbeeLogoSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 128 64"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <path d={svgPaths.p1812f500} fill="#0849AC" />
        <path d={svgPaths.p2d13a000} fill="#0849AC" />
        <path d={svgPaths.p27959c00} fill="#0849AC" />
        <path d={svgPaths.p6737bf0} fill="#0849AC" stroke="#0849AC" />
        <path d={svgPaths.p3ccd87f0} fill="#0849AC" stroke="#0849AC" />
        <path d={svgPaths.p120e2500} fill="#0849AC" stroke="#0849AC" />
      </g>
    </svg>
  );
}

// ============ CHECK ICON ============
function CheckCircleIcon() {
  return (
    <svg
      className="shrink-0 w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d={svgPaths.p33c9c280} fill="black" />
    </svg>
  );
}

// ============ CHEVRON DOWN ============
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 14 8"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="#0849AC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-[#e5e7eb]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="shrink-0 flex items-center">
          <WealbeeLogoSvg className="h-18 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#" className="text-[15px] font-medium text-black hover:text-[#0849AC] transition-colors whitespace-nowrap">
            Trang chủ
          </a>
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#0849AC] transition-colors whitespace-nowrap"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Chúng tôi phục vụ
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 12 8">
                <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#e5e7eb] rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                <a href="#features" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-black hover:bg-[#f3f4f6] transition-colors">Phân tích danh mục</a>
                <a href="#features" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-black hover:bg-[#f3f4f6] transition-colors">Phân tích tài sản AI</a>
                <a href="#features" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-black hover:bg-[#f3f4f6] transition-colors">Theo dõi cổ tức</a>
              </div>
            )}
          </div>
          <a href="#" className="text-[15px] font-medium text-black hover:text-[#0849AC] transition-colors whitespace-nowrap">
            Blog
          </a>
          <a href="#" className="text-[15px] font-medium text-black hover:text-[#0849AC] transition-colors whitespace-nowrap">
            Pricing
          </a>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Login */}
          <button className="bg-[#0849AC] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#0737a0] transition-colors whitespace-nowrap">
            Đăng nhập
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-black hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb] px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 32 32">
              <path d={svgPaths.p24f28600} fill="#6B7280" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="bg-[#e5e7eb] rounded-full h-9 pl-9 pr-4 text-sm text-gray-700 placeholder-[#6b7280] focus:outline-none w-full"
            />
          </div>
          {["Trang chủ", "Chúng tôi phục vụ", "Blog", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-[15px] font-medium text-black hover:text-[#0849AC] py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-[#0849AC] text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-[#0737a0] transition-colors mt-2">
            Đăng nhập
          </button>
        </div>
      )}
    </header>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setFeedback(null);

    const result = await subscribeEmail(email, "hero");
    setLoading(false);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });

    if (result.success) {
      setEmail("");
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  return (
    <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
        {/* Left content */}
        <div className="flex-1 max-w-xl lg:max-w-none">
          {/* Headline */}
          <h1
            className="mb-4 tracking-[-1.2px]"
            style={{
              fontSize: "clamp(36px, 4vw, 48px)",
              lineHeight: "1.25",
              fontWeight: 700,
              background: "linear-gradient(to right, #0084d1, #0849ac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Where your wealth{" "}
            <br />
            will be
          </h1>

          {/* Description */}
          <div className="text-black text-[16px] leading-[24px] mb-8 max-w-[520px]">
            <p className="mb-0">
              Wealbee hợp nhất toàn bộ tài sản của bạn vào một dashboard duy nhất và tự động phân
              tích tin tức theo từng nhóm tài sản. Khi có sự kiện quan trọng xảy ra, hệ thống sẽ
              cảnh báo trong vòng dưới 1 phút kèm theo mức độ tác động dự kiến, giúp bạn tập trung
              vào bảo vệ vốn và tối ưu dòng tiền
            </p>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="flex flex-col sm:flex-row gap-3 max-w-[469px]">
              {/* Email input */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <g clipPath="url(#email-clip)">
                      <path d={svgPaths.p3d619300} stroke="#0849AC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p189c1170} stroke="#0849AC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="email-clip">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-[#0849AC] rounded-[14px] text-[#0849AC] text-[16px] placeholder-[#0849AC] focus:outline-none focus:ring-2 focus:ring-[#0849AC]/30 bg-white transition-all"
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-[14px] text-white text-[16px] font-semibold whitespace-nowrap shadow-[0px_10px_15px_0px_rgba(0,132,209,0.4)] hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(to right, #0084d1, #0849ac)" }}
              >
                {loading ? "Đang gửi..." : "Đăng ký sớm"}
                {!loading && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d="M4.16667 10H15.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p1ae0b780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* Feedback message */}
          {feedback && (
            <p
              className={`text-[14px] mb-1 transition-all ${
                feedback.type === "success"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {feedback.message}
            </p>
          )}

          {/* Promo note */}
          <p className="text-[16px] text-black tracking-[-0.15px]">
            🎁 100 người đăng ký sớm nhất sẽ nhận{" "}
            <span className="font-bold text-[#0084d1]">ưu đãi lên đến 90%</span>
          </p>
        </div>

        {/* Right side - Dashboard preview */}
        <div className="flex-1 flex items-center justify-center w-full max-w-[600px] lg:max-w-none">
          <div className="relative w-full max-w-[567px] rounded-lg border-8 border-[#e5e7eb] overflow-hidden shadow-md">
            <img
              src={imgTempImageoeBDv61}
              alt="Wealbee Dashboard Preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GIỚI THIỆU BEE SECTION ============
function IntroSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto text-center">
        <p
          className="text-[#0849AC] text-[32px] font-semibold leading-[28px] mb-3"
        >
          Giới Thiệu Bee
        </p>
        <h2 className="text-black text-[28px] sm:text-[30px] font-bold tracking-[-0.75px] leading-[36px]">
          Một CFO cá nhân hoá cho từng nhà đầu tư
        </h2>
      </div>
    </section>
  );
}

// ============ AI FEATURE CARDS ============
function AIFeatureCards() {
  return (
    <section id="features" className="pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Phân tích danh mục */}
        <div
          className="rounded-[16px] border-8 overflow-hidden relative"
          style={{ borderColor: "rgba(0,132,209,0.2)", background: "rgba(237,242,250,0.25)" }}
        >
          <div className="p-6">
            <h3 className="text-[22px] sm:text-[26px] font-bold text-black leading-tight mb-4">
              Phân tích danh mục với Bee AI, cảnh báo sớm khi có rủi ro
            </h3>

            {/* Screenshot images */}
            <div className="relative h-[240px] sm:h-[290px] mb-6">
              {/* Portfolio Analysis — fills entire container as background */}
              <img
                src={imgScreenshot20260222At2116362}
                alt="Portfolio Analysis"
                className="absolute inset-0 w-full h-full object-cover rounded-[12px] border border-white shadow-[0px_4px_6px_0px_rgba(9,15,29,0.1)]"
              />
              {/* AI Alert overlay — bottom-right, slightly protruding */}
              <div className="absolute bottom-0 right-0 w-[40%] sm:w-[42%]">
                <img
                  src={imgTempImage81Zaan1}
                  alt="AI Alert"
                  className="rounded-[12px] shadow-[0px_8px_24px_0px_rgba(9,15,29,0.18)] w-full border border-white"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-[16px] leading-[24px] mb-6">
              AI đo lường tác động của tin tức, sự kiện lên từng danh mục đầu tư trong thời gian thực.
            </p>

            {/* Checklist */}
            <div className="space-y-5">
              {[
                "Giảm thời gian đọc từng tin tức, sự kiện đơn lẻ trên thị trường",
                "Gửi cảnh báo đến cho nhà đầu tư trong 1 phút khi rủi ro xuất hiện",
                "Đo lường được mức độ tác động của từng sự kiện tài chính đến tài sản của bạn",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircleIcon />
                  <span className="text-[16px] font-bold text-black leading-[24px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Phân tích tài sản */}
        <div
          className="rounded-[16px] border-8 overflow-hidden relative"
          style={{ borderColor: "rgba(0,132,209,0.2)", background: "rgba(237,242,250,0.25)" }}
        >
          <div className="p-6">
            <h3 className="text-[22px] sm:text-[26px] font-bold text-black leading-tight mb-4">
              Phân tích tài sản với Bee AI, dự báo dòng cổ tức
            </h3>

            {/* Screenshot images */}
            <div className="relative h-[240px] sm:h-[290px] mb-6">
              {/* Asset Analysis — top-right, fixed height for guaranteed overlap */}
              <div className="absolute top-0 right-0 w-[82%] h-[62%] rounded-[16px] overflow-hidden shadow-[0px_4px_6px_0px_rgba(9,15,29,0.1)] border border-white">
                <img
                  src={imgTempImageL0T8Dg1}
                  alt="Asset Analysis"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Dividend Forecast — bottom-left, fixed height for guaranteed overlap */}
              <div className="absolute bottom-0 left-0 w-[63%] h-[56%] rounded-[16px] overflow-hidden shadow-[0px_8px_20px_0px_rgba(9,15,29,0.15)] border border-white">
                <img
                  src={imgTempImagekQmQuu1}
                  alt="Dividend Forecast"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-[16px] leading-[24px] mb-6">
              Phân tích các chỉ số tài chính, tiềm năng tăng trưởng cho từng loại tài sản
            </p>

            {/* Checklist */}
            <div className="space-y-5">
              {[
                "Chọn ra cổ phiếu có hiệu quả trả cổ tức tốt nhất",
                "Tính toán điểm an toàn và dự báo dòng cổ tức",
                "Cập nhật thường xuyên giúp giảm nguy cơ bị cắt cổ tức đột ngột",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircleIcon />
                  <span className="text-[16px] font-bold text-black leading-[24px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FEATURE GRID (2x2) ============
function FeatureItem({
  image,
  title,
  description,
  imageAlt,
  isComponent,
}: {
  image?: string;
  title: string;
  description: string;
  imageAlt: string;
  isComponent?: boolean;
}) {
  return (
    <div
      className="rounded-[4px] p-8 flex flex-col gap-4"
      style={{ background: "rgba(237,242,250,0.5)" }}
    >
      {/* Feature image */}
      <div className="w-full h-[180px] sm:h-[200px] overflow-hidden rounded-sm">
        {isComponent ? (
          <SafetyScoreCard />
        ) : (
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      {/* Text */}
      <h3 className="text-[22px] font-semibold text-black tracking-[-0.144px] leading-[33.6px]">
        {title}
      </h3>
      <p className="text-[16px] text-black leading-[24px]">{description}</p>
    </div>
  );
}

function FeatureGrid() {
  const features = [
    {
      image: imgDividendsSvgFill,
      title: "Theo dõi cổ tức đơn giản",
      description:
        "Đơn giản hóa việc theo dõi cổ tức và tái đầu tư (DRIP). Hãy loại bỏ các bảng tính thủ công và để hệ thống tự động tính toán thu nhập cổ tức từ quá khứ, hiện tại đến tương lai",
      imageAlt: "Dividend tracking",
    },
    {
      isComponent: true,
      title: "Điểm an toàn cổ tức đáng tin cậy",
      description:
        "Đầu tư với sự an tâm tuyệt đối. Hệ thống của chúng tôi cung cấp chỉ số an toàn dựa trên dữ liệu tài chính toàn diện, bao gồm cơ cấu nợ, doanh thu và lịch sử hiệu quả hoạt động.",
      imageAlt: "Safety score",
    },
    {
      image: imgTempImage8XWcEf1,
      title: "Lịch nhận cổ tức sinh động",
      description:
        "Không bao giờ bỏ lỡ những cột mốc quan trọng. Theo dõi toàn bộ thông báo và lịch chi trả cổ tức trong một giao diện lịch tháng trực quan. Cập nhật những tin tức trọng yếu nhất ngay trên dòng thời gian danh mục đầu tư của bạn.",
      imageAlt: "Dividend calendar",
    },
    {
      image: imgContainer,
      title: "Tổng quan hiệu suất dễ hiểu",
      description:
        "Vị thế đầu tư của bạn hiện ra sao? Mọi danh mục đều được quản lý tập trung tại một nơi duy nhất, giúp bạn nắm bắt hiệu quả đầu tư chỉ trong nháy mắt.",
      imageAlt: "Performance overview",
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <FeatureItem key={i} {...f} />
        ))}
      </div>
    </section>
  );
}

// ============ CTA SECTION ============
function CTASection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto flex justify-center">
        <button
          onClick={() => {
            const heroForm = document.querySelector("input[type='email']") as HTMLInputElement;
            if (heroForm) {
              heroForm.focus();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="bg-[#0849AC] text-white font-medium text-[16px] px-8 py-3.5 rounded-sm hover:bg-[#0737a0] active:scale-95 transition-all"
        >
          Đăng ký sớm ngay
        </button>
      </div>
    </section>
  );
}

// ============ FAQ SECTION ============
const faqData = [
  {
    question: "Tôi có thể theo dõi cổ tức của mình như thế nào?",
    answer:
      "Wealbee cung cấp công cụ theo dõi cổ tức toàn diện. Bạn chỉ cần nhập danh mục cổ phiếu của mình, hệ thống sẽ tự động tổng hợp lịch chi trả, số tiền cổ tức dự kiến và lịch sử nhận cổ tức theo thời gian thực.",
  },
  {
    question: "Wealbee có thể theo dõi được những loại tài sản nào?",
    answer:
      "Wealbee hỗ trợ theo dõi cổ phiếu (trong và ngoài nớc), ETF, quỹ mở, trái phiếu và các tài sản tài chính khác. Hệ thống tích hp dữ liệu từ nhiều sàn giao dịch và nguồn dữ liệu uy tín để đảm bảo thông tin luôn chính xác.",
  },
  {
    question: "Bản miễn phí được chat với Bee AI không?",
    answer:
      "Bản miễn phí có giới hạn số lần sử dụng tính năng chat với Bee AI mỗi tháng. Để sử dụng không giới hạn và trải nghiệm đầy đủ các tính năng AI, bạn có thể nâng cấp lên bản Premium với ưu đãi đặc biệt dành cho người đăng ký sớm.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[700px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 relative">
          <div className="w-[130px] h-[6px] bg-[#0084D1] mx-auto mb-5 rounded-full" />
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-black leading-[52px]">
            Những câu hỏi phổ biến nhất
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-[#e5e7eb] mb-6" />}
              <button
                className="w-full flex items-start justify-between gap-4 text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[14px] sm:text-[15px] font-medium text-black leading-[20px]">
                  {faq.question}
                </span>
                <div className="pl-6 pt-0.5 shrink-0">
                  <ChevronDown open={openIndex === index} />
                </div>
              </button>
              {openIndex === index && (
                <div className="mt-3 text-[15px] text-gray-600 leading-[24px] pr-10">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  const [footerEmail, setFooterEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;

    setLoading(true);
    setFeedback(null);

    const result = await subscribeEmail(footerEmail, "footer");
    setLoading(false);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });

    if (result.success) {
      setFooterEmail("");
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  return (
    <footer className="relative bg-white border-t border-[#e5e7eb] overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
        <img
          src={imgFooter}
          alt=""
          className="absolute w-full h-[150%] object-cover top-[-30%]"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-[11px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.2)] px-6 sm:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <WealbeeLogoSvg className="h-18 w-auto" />
          </div>

          {/* Newsletter */}
          <div className="flex-1 w-full md:max-w-md lg:max-w-lg">
            <p className="text-[16px] font-bold text-black mb-3">
              Let us reach out to you!
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={footerEmail}
                onChange={e => setFooterEmail(e.target.value)}
                className="flex-1 border border-[#e5e7eb] rounded-[10px] px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0849AC]/30 bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white font-medium text-sm px-5 py-3 rounded-[6px] hover:bg-gray-800 active:scale-95 transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
            {feedback && (
              <p
                className={`text-[13px] mt-2 ${
                  feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {feedback.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <AIFeatureCards />
        <FeatureGrid />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}