"use client";

import * as React from "react";

// Minimal calendar stub to avoid external dependency
function Calendar({ className, ...props }: React.ComponentProps<"div"> & { showOutsideDays?: boolean; classNames?: Record<string, string> }) {
  return (
    <div className={className} {...props}>
      <input type="date" className="border rounded px-2 py-1 text-sm" />
    </div>
  );
}

export { Calendar };
