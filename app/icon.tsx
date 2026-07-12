import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: the sun with a single orbit. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060f",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            borderRadius: 99,
            border: "1.5px solid rgba(169,155,245,0.55)",
            transform: "rotate(-20deg) scaleY(0.55)",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 99,
            background: "radial-gradient(circle at 40% 35%, #f6cd85, #e8934a)",
            boxShadow: "0 0 6px 2px rgba(232,147,74,0.7)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
