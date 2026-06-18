import { useState } from "react";
import { X, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function LoginModal({
  open,
  onClose,
  theme,
  onOpenDemo,
}: {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onOpenDemo: () => void;
}) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b13" : "#ffffff";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#ffffff" : "#1a1a2e";
  const mutedColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => { setEmail(""); setPassword(""); }, 350);
  };

  const borderFor = (f: string) =>
    focused === f ? "#4D8FE8" : isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const labelFor = (f: string) =>
    focused === f ? "#4D8FE8" : mutedColor;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="login-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            key="login-modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 z-[61] mx-auto w-full max-w-[440px]"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: bg,
                border: `1px solid ${dividerColor}`,
                boxShadow: isDark
                  ? "0 32px 80px rgba(0,0,0,0.55)"
                  : "0 32px 80px rgba(0,0,0,0.14)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between px-8 pt-8 pb-6" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                <div>
                  <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.1, color: textColor }}>
                    Đăng nhập.
                  </h2>
                  <p className="mt-1.5" style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13.5, color: mutedColor }}>
                    Chào mừng trở lại Wealbee.
                  </p>
                </div>
                <button type="button" onClick={handleClose} aria-label="Đóng" className="transition-opacity hover:opacity-60" style={{ color: mutedColor, marginTop: 4 }}>
                  <X size={20} />
                </button>
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
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="ban@email.com" required autoComplete="email"
                      style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${borderFor("email")}`, outline: "none", padding: "6px 0 10px", fontFamily: "Montserrat, sans-serif", fontSize: 15, color: textColor, transition: "border-color .18s" }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: 12.5, fontWeight: 500, color: labelFor("password"), marginBottom: 8, letterSpacing: "0.02em", transition: "color .18s" }}>
                      Mật khẩu<span style={{ color: "#4D8FE8", marginLeft: 2 }}>*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                        placeholder="••••••••" required autoComplete="current-password"
                        style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${borderFor("password")}`, outline: "none", padding: "6px 32px 10px 0", fontFamily: "Montserrat, sans-serif", fontSize: 15, color: textColor, transition: "border-color .18s" }}
                      />
                      <button type="button" onClick={() => setShowPass((v) => !v)} tabIndex={-1} aria-label="Toggle password" className="absolute right-0 top-1 transition-opacity hover:opacity-60" style={{ color: mutedColor }}>
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    <div className="mt-2 text-right">
                      <button type="button" style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#4D8FE8", background: "none", border: "none", cursor: "pointer" }} className="hover:opacity-70 transition-opacity">
                        Quên mật khẩu?
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-white transition-all hover:opacity-90" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 15, background: "var(--wb-primary)" }}>
                  Đăng nhập <ArrowRight size={16} />
                </button>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: dividerColor }} />
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: mutedColor }}>hoặc</span>
                  <div className="h-px flex-1" style={{ background: dividerColor }} />
                </div>

                <p className="text-center" style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13.5, color: mutedColor }}>
                  Chưa có tài khoản?{" "}
                  <button type="button" onClick={() => { handleClose(); onOpenDemo(); }} className="transition-opacity hover:opacity-70" style={{ color: "#4D8FE8", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                    Yêu cầu bản Demo →
                  </button>
                </p>

                <p className="mt-5 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)", lineHeight: 1.6 }}>
                  Bằng cách đăng nhập, bạn đồng ý với Điều khoản &amp; Chính sách bảo mật của Wealbee.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
