import { ImageResponse } from "next/og";
import {
  PROJECT_TITLE,
  PROJECT_DESCRIPTION,
  PROJECT_AVATAR_URL,
} from "~/lib/constants";

export const alt = PROJECT_TITLE;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f172a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient with teal and purple */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
            opacity: 0.15,
          }}
        />

        {/* Subtle pattern overlay for depth */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(13, 148, 136, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Main content container - centered in safe zone */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "80px 60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Sleep icon representation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            {/* Moon and stars visual */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                position: "relative",
              }}
            >
              {/* Crescent moon shape */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
                  }}
                />
              </div>
            </div>
            
            {/* Stars around moon */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "12px",
                height: "12px",
                background: "#ffffff",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "0px",
                width: "8px",
                height: "8px",
                background: "#ffffff",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
          </div>

          {/* Project title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "32px",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              textShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
              maxWidth: "1000px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Sleep Calculator
          </h1>

          {/* Subtitle with gradient */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
              marginBottom: "24px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Optimize Your Sleep Cycles
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "28px",
              fontWeight: "500",
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "700px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginBottom: "40px",
            }}
          >
            Calculate the perfect bedtime and wake-up times based on 90-minute sleep cycles
          </p>

          {/* Sleep cycle visualization */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px 32px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#ffffff",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              90min cycles × 4-6 = Perfect rest
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}