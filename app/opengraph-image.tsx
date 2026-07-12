import { ImageResponse } from "next/og";

export const alt = "Isaiah Ferguson — Developer · Coding Advocate · Mentor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card: the arrival shot of the universe, drawn in CSS. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 115%, rgba(232,180,90,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 15%, rgba(169,155,245,0.18), transparent 65%), #05060f",
          color: "#e9ebf7",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Star specks */}
        <div style={{ position: "absolute", top: 80, left: 140, width: 3, height: 3, borderRadius: 99, background: "#e9ebf7", opacity: 0.8 }} />
        <div style={{ position: "absolute", top: 180, left: 980, width: 2, height: 2, borderRadius: 99, background: "#8ed3e6", opacity: 0.9 }} />
        <div style={{ position: "absolute", top: 90, left: 760, width: 2, height: 2, borderRadius: 99, background: "#a99bf5", opacity: 0.8 }} />
        <div style={{ position: "absolute", top: 420, left: 220, width: 2, height: 2, borderRadius: 99, background: "#e9ebf7", opacity: 0.6 }} />
        <div style={{ position: "absolute", top: 500, left: 1050, width: 3, height: 3, borderRadius: 99, background: "#f6cd85", opacity: 0.8 }} />

        {/* The sun cresting the bottom edge */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: 400,
            width: 400,
            height: 400,
            borderRadius: 400,
            background: "radial-gradient(circle at 50% 35%, #f6cd85, #e8934a 55%, #b35c1e)",
            boxShadow: "0 0 120px 40px rgba(232,147,74,0.45)",
          }}
        />

        <div
          style={{
            fontSize: 22,
            letterSpacing: 10,
            color: "#8288b0",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          A Universe of Impact
        </div>
        <div style={{ fontSize: 104, lineHeight: 1, textShadow: "0 0 60px rgba(169,155,245,0.35)" }}>
          Isaiah Ferguson
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 26,
            letterSpacing: 6,
            color: "#aab0d4",
            textTransform: "uppercase",
            fontFamily: "monospace",
            display: "flex",
            gap: 18,
          }}
        >
          <span>Developer</span>
          <span style={{ color: "#e8b45a" }}>·</span>
          <span>Coding Advocate</span>
          <span style={{ color: "#e8b45a" }}>·</span>
          <span>Mentor</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
