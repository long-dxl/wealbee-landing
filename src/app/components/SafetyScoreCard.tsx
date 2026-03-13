import React from "react";
import svgPaths from "../../imports/svg-txof2uimnh";

const CRITERIA = [
  "Analyst estimates",
  "Dividend growth",
  "Company debt",
  "Past revenues",
  "Business growth",
];

// Row center Y positions as % of container height (matching Figma row spacing)
const ROW_Y = [10, 27, 46, 65, 82];

// Score badge center Y positions (derived from Figma inset top% values)
const SCORE_Y = [9.7, 29, 49.6, 71, 90.3];

// Wealbee logo bounds (from Figma inset-[24.97%_31%_28.33%_46.46%])
const LOGO_LEFT  = 46.5;
const LOGO_CY    = 48.3;  // vertical center
const LOGO_RIGHT = 69.0;  // right edge

// Bracket vertical line X (just right of criteria text block end ~26.56%)
const BRACKET_X  = 29;

// Score badge left edge (from Figma left: 79.47%)
const SCORE_LEFT = 79.5;

export function SafetyScoreCard() {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden">

      {/* ───────────────────────────────────────────────────────────
          CONNECTOR SVG  (viewBox 0 0 100 100, preserveAspectRatio=none)
          → each unit  = 1% of the container's corresponding dimension
          ─────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* ── Left: criteria → logo ── */}

        {/* Vertical bracket line spanning all rows */}
        <line
          x1={BRACKET_X} y1={ROW_Y[0]}
          x2={BRACKET_X} y2={ROW_Y[4]}
          stroke="#DFDFDF" strokeWidth="0.4"
        />

        {/* Short horizontal branch from each criteria row to bracket */}
        {ROW_Y.map((y, i) => (
          <line key={`lb-${i}`}
            x1="23.5" y1={y} x2={BRACKET_X} y2={y}
            stroke="#DFDFDF" strokeWidth="0.4"
          />
        ))}

        {/* Curves converging from bracket → logo left-center */}
        <path
          d={`M ${BRACKET_X} ${ROW_Y[0]} C ${BRACKET_X + 10} ${ROW_Y[0]}, ${LOGO_LEFT} ${LOGO_CY}, ${LOGO_LEFT} ${LOGO_CY}`}
          stroke="#DFDFDF" strokeWidth="0.4"
        />
        <path
          d={`M ${BRACKET_X} ${ROW_Y[1]} C ${BRACKET_X + 7}  ${ROW_Y[1]}, ${LOGO_LEFT} ${LOGO_CY}, ${LOGO_LEFT} ${LOGO_CY}`}
          stroke="#DFDFDF" strokeWidth="0.4"
        />
        {/* Middle row — direct horizontal */}
        <line
          x1={BRACKET_X} y1={LOGO_CY}
          x2={LOGO_LEFT} y2={LOGO_CY}
          stroke="#DFDFDF" strokeWidth="0.4"
        />
        <path
          d={`M ${BRACKET_X} ${ROW_Y[3]} C ${BRACKET_X + 7}  ${ROW_Y[3]}, ${LOGO_LEFT} ${LOGO_CY}, ${LOGO_LEFT} ${LOGO_CY}`}
          stroke="#DFDFDF" strokeWidth="0.4"
        />
        <path
          d={`M ${BRACKET_X} ${ROW_Y[4]} C ${BRACKET_X + 10} ${ROW_Y[4]}, ${LOGO_LEFT} ${LOGO_CY}, ${LOGO_LEFT} ${LOGO_CY}`}
          stroke="#DFDFDF" strokeWidth="0.4"
        />

        {/* ── Right: logo → score badges ── */}

        {/* Fan lines from logo right-center to each score badge */}
        {SCORE_Y.map((sy, i) => (
          <line key={`rf-${i}`}
            x1={LOGO_RIGHT} y1={LOGO_CY}
            x2={SCORE_LEFT} y2={sy}
            stroke="#DFDFDF" strokeWidth="0.4"
          />
        ))}
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          CRITERIA TEXT (left column)
          ───────────────────────────────────────────────────────────── */}
      {CRITERIA.map((label, i) => (
        <div
          key={label}
          className="absolute flex items-center"
          style={{ left: "2%", top: `${ROW_Y[i]}%`, transform: "translateY(-50%)" }}
        >
          <span
            style={{
              fontSize: "10.5px",
              color: "#374151",
              whiteSpace: "nowrap",
              letterSpacing: "-0.2px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {label}
          </span>
        </div>
      ))}

      {/* ─────────────────────────────────────────────────────────────
          WEALBEE LOGO (center)
          — exact SVG paths imported from the Figma asset
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: `${LOGO_LEFT}%`,
          top: `${LOGO_CY}%`,
          width: "22.5%",
          transform: "translateY(-50%)",
        }}
      >
        <svg viewBox="0 0 108.197 102.738" fill="none" style={{ width: "100%", height: "auto" }}>
          <path d={svgPaths.p7642200} fill="white" />
          <path d={svgPaths.p1e9f67c0} fill="#0084D1" />
          <path d={svgPaths.p164a6080} fill="#0084D1" />
          <path d={svgPaths.p1d03d5f0} fill="#0084D1" stroke="#0084D1" />
          <path d={svgPaths.p403fb00}  fill="#0084D1" stroke="#0084D1" />
          <path d={svgPaths.p32ac080}  fill="#0084D1" stroke="#0084D1" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SCORE BADGES (right column)

          Score   Style                 Color
          ────    ──────────────────    ──────────────────────────────
          100     circle outline        gradient text: white→#009966
          90      circle outline        solid #009966
          85      green-tint rect       solid #009966   ← highlighted
          50      circle outline        solid #fe9a00
          35      circle outline        gradient text: white→#820d1e
          ───────────────────────────────────────────────────────────── */}

      {/* 100 — white-to-green gradient text */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "3%", top: `${SCORE_Y[0]}%`, transform: "translateY(-50%)",
          width: "7.5%", aspectRatio: "1 / 1",
          borderRadius: "50%", border: "1px solid #E5E7EB",
        }}
      >
        <span style={{
          fontSize: "10px", fontWeight: 500, letterSpacing: "-0.06em",
          background: "linear-gradient(to bottom, white 10%, #009966 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          100
        </span>
      </div>

      {/* 90 — solid green */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "3%", top: `${SCORE_Y[1]}%`, transform: "translateY(-50%)",
          width: "7.5%", aspectRatio: "1 / 1",
          borderRadius: "50%", border: "1px solid #E5E7EB",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 500, color: "#009966", letterSpacing: "-0.06em" }}>
          90
        </span>
      </div>

      {/* 85 — green-tinted rounded rect (highlighted row) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "3%", top: `${SCORE_Y[2]}%`, transform: "translateY(-50%)",
          width: "7.5%", height: "14%",
          borderRadius: "5px",
          background: "rgba(17, 126, 48, 0.12)",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 500, color: "#009966", letterSpacing: "-0.06em" }}>
          85
        </span>
      </div>

      {/* 50 — orange */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "3%", top: `${SCORE_Y[3]}%`, transform: "translateY(-50%)",
          width: "7.5%", aspectRatio: "1 / 1",
          borderRadius: "50%", border: "1px solid #E5E7EB",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 500, color: "#fe9a00", letterSpacing: "-0.06em" }}>
          50
        </span>
      </div>

      {/* 35 — white-to-dark-red gradient text */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "3%", top: `${SCORE_Y[4]}%`, transform: "translateY(-50%)",
          width: "7.5%", aspectRatio: "1 / 1",
          borderRadius: "50%", border: "1px solid #E5E7EB",
        }}
      >
        <span style={{
          fontSize: "11px", fontWeight: 500, letterSpacing: "-0.06em",
          background: "linear-gradient(to bottom, white 10%, #820d1e 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          35
        </span>
      </div>

    </div>
  );
}
