"use client";

import React from "react";
import { portfolio } from "~/portfolio.config";
import styles from "./flip-cover-button.module.css";
import SoftPillButton from "./soft-pill-button";

interface FlipCoverButtonProps {
  /** Cal.com booking link target */
  href?: string;
  /** Label for the white cover button (default: "Book an intro call") */
  label?: string;
  /** Optional custom class */
  className?: string;
}

/**
 * 3D Flip Cover Button Component.
 * Styled to 100% exact size, padding, and height match with SoftPillButton ("Send an email").
 * On hover, the white "Book an intro call" lid flips open -120deg on a 3D hinge,
 * revealing the button inside.
 */
export function FlipCoverButton({
  href = portfolio.resume,
  label = "Book an intro call",
  className = "",
}: FlipCoverButtonProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {/* In-flow element that sets the EXACT height, padding, and width matching SoftPillButton */}
      <SoftPillButton
        as="div"
        variant="primary"
        className="px-3 py-1.5 !text-[12px] opacity-0 pointer-events-none aria-hidden"
      >
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="whitespace-nowrap">{label}</span>
        </div>
      </SoftPillButton>

      {/* Inside: Revealed small cal.com button matching Cal.com theme */}
      <div className={styles.button}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-[4px] text-[12px] font-semibold tracking-wide whitespace-nowrap shadow-sm border border-white/10 dark:border-black/10 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>cal.com</span>
        </a>
      </div>

      {/* 3D Cover Lid (The white button) */}
      <div className={styles.cover} aria-hidden="true">
        <div className={styles.innie}>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-white whitespace-nowrap">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>cal.com</span>
          </div>
        </div>
        <div className={styles.spine} />
        <div className={styles.outie}>
          {/* Front face of lid: The white "Book an intro call" button */}
          <SoftPillButton
            as="div"
            variant="primary"
            className="w-full h-full flex items-center justify-center px-3 py-1.5 !text-[12px] whitespace-nowrap pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="whitespace-nowrap">{label}</span>
            </div>
          </SoftPillButton>
        </div>
      </div>

      {/* Cast 3D Shadow */}
      <div className={styles.shadow} aria-hidden="true" />
    </section>
  );
}

export default FlipCoverButton;
