import { useState, type ReactNode } from "react";

interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Expand/collapse block used for the Design–Build–Test–Learn cycles.
 * Pattern referenced from the 2025 ZJU-China engineering page.
 */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-container">
      <button
        type="button"
        className="collapsible-header"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <span className="collapsible-icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
}
