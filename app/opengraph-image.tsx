import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner for the Sunrise Ward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
                    background: "#f4ecd8",
                    border: "24px solid #4a5d3a",
                    color: "#33432a",
                }}
            >
                <div style={{ fontSize: 84, display: "flex" }}>
                    Sacrament Meeting Planner
                </div>
                <div style={{ fontSize: 40, marginTop: 24, color: "#6b4f3a", display: "flex" }}>
                    Sunrise Ward · Programs for every Sunday
                </div>
            </div>
        ),
        { ...size }
    );
}