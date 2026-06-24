import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

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
          background: "transparent",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          <path d="M 15 20 L 50 85 L 85 20 L 60 20 L 50 45 L 40 20 Z" fill="#D946EF" />
          <path d="M 35 20 L 65 20 L 50 55 Z" fill="#8B5CF6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
