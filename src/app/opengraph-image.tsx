/* eslint-disable react-refresh/only-export-components */
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { portfolio } from "~/portfolio.config";
import { experiences } from "@/data/experienceData";
import snapshot from "@/data/stats-snapshot.json";

export const alt = `${portfolio.name} - ${portfolio.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated rather than committed, so a fork gets its own card from
 * `portfolio.config.ts` and its own assets without opening a design tool.
 *
 * Built on the site's own hero artwork rather than a flat panel: a link
 * preview competes with everything else in a feed, and a picture wins where a
 * dark rectangle of text does not. The text sits on the left, over a gradient
 * scrim, because the artwork's subject is on the right.
 *
 * ImageResponse renders through Satori: flexbox only, no CSS grid, every
 * element with more than one child needs an explicit `display: flex`, and
 * `radial-gradient` is unsupported (`linear-gradient` works).
 */

/**
 * The media type read from the file's magic bytes, not its extension.
 * `public/avatar.png` is in fact a JPEG - browsers sniff and render it anyway,
 * but Satori trusts the data URI's declared type and silently draws nothing.
 */
function sniff(buf: Buffer): string | null {
  if (buf.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") return "image/png";
  if (buf.subarray(0, 3).toString("hex") === "ffd8ff") return "image/jpeg";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP")
    return "image/webp";
  if (buf.subarray(0, 4).toString("ascii") === "GIF8") return "image/gif";
  return null;
}

/** Inlined: Satori has no origin to resolve a root-relative path against. */
function embed(file: string): string | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", file));
    const type = sniff(buf);
    return type ? `data:${type};base64,${buf.toString("base64")}` : null;
  } catch {
    return null;
  }
}

const banner = embed("banner-dark.jpg");
const avatar = embed("avatar.png");

/**
 * The artwork is 3:1 and the card is 1.9:1, so it is scaled to the card's
 * height and slid left - keeping the figure on the right and clearing the
 * left side for type.
 */
const ART = { w: 1887, h: 630, left: -546 };

const n = (v: number) => v.toLocaleString("en-US");

/** One restrained line of proof - the artwork does the attracting. */
const PROOF = [
  "GSoC '26",
  `${experiences.length} roles`,
  `${n(snapshot.leetcode.maxRating)} LeetCode`,
  `${n(snapshot.codeforces.maxRating)} Codeforces`,
].join("   ·   ");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#070b16",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {banner && (
          <img
            src={banner}
            width={ART.w}
            height={ART.h}
            style={{ position: "absolute", left: ART.left, top: 0 }}
          />
        )}

        {/* scrim: dense behind the type, clear over the figure. Explicit
            width/height - Satori ignores the `inset` shorthand. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(4,7,14,0.90) 0%, rgba(4,7,14,0.72) 34%, rgba(4,7,14,0.26) 66%, rgba(4,7,14,0.00) 100%)",
          }}
        />
        {/* a second pass down the frame: the flower field at the bottom is the
            brightest part of the art and the url sits on top of it. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage:
              "linear-gradient(180deg, rgba(4,7,14,0.14) 0%, rgba(4,7,14,0.0) 44%, rgba(4,7,14,0.38) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {avatar && (
              <img
                src={avatar}
                width={84}
                height={84}
                style={{ borderRadius: 42, border: "2px solid rgba(255,255,255,0.22)" }}
              />
            )}
            <div
              style={{
                fontSize: 19,
                letterSpacing: 5,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {portfolio.location.toUpperCase()}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div
              style={{
                fontSize: 94,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -2.5,
                lineHeight: 1,
                textShadow: "0 2px 26px rgba(0,0,0,0.65)",
              }}
            >
              {portfolio.name}
            </div>
            <div
              style={{
                fontSize: 30,
                color: "rgba(255,255,255,0.84)",
                lineHeight: 1.35,
                marginTop: 18,
                textShadow: "0 1px 14px rgba(0,0,0,0.7)",
              }}
            >
              {portfolio.tagline}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 1,
                color: "rgba(255,255,255,0.78)",
                textShadow: "0 1px 12px rgba(0,0,0,0.7)",
              }}
            >
              {PROOF}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 22 }}>
              <div style={{ height: 4, width: 52, background: "#d6242b", borderRadius: 2 }} />
              <div style={{ fontSize: 26, color: "#ffffff" }}>
                {portfolio.url.replace(/^https?:\/\//, "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
