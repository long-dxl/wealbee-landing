import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { WealbeeLogo } from "../components/wealbee-logo";
import { useTheme } from "../use-theme";

export function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const canvas = "var(--wb-canvas)";
  const card = isDark ? "#0e0e16" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const text = isDark ? "#ffffff" : "#1a1a2e";
  const muted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const faint = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const borderFor = (f: string) => focused === f ? "#4D8FE8" : border;
  const labelFor = (f: string) => focused === f ? "#4D8FE8" : muted;

  return (
    <div
      className={isDark ? "wb-dark" : "wb-light"}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: canvas, fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Top bar - matches landing navbar (same container, height, logo size) */}
      <header>
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Link to="/" className="flex items-center">
          <WealbeeLogo size={30} />
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Chuyển giao diện"
            className="transition-opacity hover:opacity-60"
            style={{ color: muted }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, color: muted }}>
            Chưa có tài khoản?{" "}
            <Link
              to="/"
              style={{ color: "#4D8FE8", fontWeight: 600, textDecoration: "none" }}
            >
              Yêu cầu Demo
            </Link>
          </span>
        </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px]">
          {/* Card */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{ background: card, border: `1px solid ${border}`, boxShadow: isDark ? "0 24px 80px rgba(0,0,0,0.4)" : "0 24px 80px rgba(0,0,0,0.08)" }}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: `1px solid ${border}` }}>
              <h1
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 1.1,
                  color: text,
                  marginBottom: 6,
                }}
              >
                Đăng nhập.
              </h1>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, color: muted }}>
                Chào mừng trở lại Wealbee.
              </p>
            </div>

            {/* Form */}
            <form className="px-8 py-7" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-7">
                {/* Email */}
                <div>
                  <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: 12.5, fontWeight: 500, color: labelFor("email"), marginBottom: 8, letterSpacing: "0.02em", transition: "color .18s" }}>
                    Email<span style={{ color: "#4D8FE8", marginLeft: 2 }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="ban@email.com"
                    required
                    autoComplete="email"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${borderFor("email")}`,
                      outline: "none",
                      padding: "6px 0 10px",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 15,
                      color: text,
                      transition: "border-color .18s",
                    }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: 12.5, fontWeight: 500, color: labelFor("password"), marginBottom: 8, letterSpacing: "0.02em", transition: "color .18s" }}>
                    Mật khẩu<span style={{ color: "#4D8FE8", marginLeft: 2 }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${borderFor("password")}`,
                        outline: "none",
                        padding: "6px 32px 10px 0",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 15,
                        color: text,
                        transition: "border-color .18s",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      tabIndex={-1}
                      aria-label="Toggle password"
                      className="absolute right-0 top-1 transition-opacity hover:opacity-60"
                      style={{ color: muted }}
                    >
                      {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  <div className="mt-2.5 text-right">
                    <button
                      type="button"
                      className="transition-opacity hover:opacity-70"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#4D8FE8", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 15, background: "var(--wb-primary)" }}
              >
                Đăng nhập <ArrowRight size={16} />
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: border }} />
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: muted }}>hoặc</span>
                <div className="h-px flex-1" style={{ background: border }} />
              </div>

              {/* Register */}
              <p className="text-center" style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13.5, color: muted }}>
                Chưa có tài khoản?{" "}
                <Link to="/" style={{ color: "#4D8FE8", fontWeight: 600, textDecoration: "none" }}>
                  Yêu cầu bản Demo →
                </Link>
              </p>

              <p className="mt-5 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: faint, lineHeight: 1.6 }}>
                Bằng cách đăng nhập, bạn đồng ý với Điều khoản &amp; Chính sách bảo mật của Wealbee.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
