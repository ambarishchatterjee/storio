// utils/formatGB.js

export function formatGB(bytes) {
  if (!bytes || isNaN(bytes)) return "0.00";

  const gb = bytes / (1024 * 1024 * 1024);

  // Use toPrecision if less than 0.01 to avoid showing 0.00
  return gb < 0.01 ? gb.toPrecision(2) : gb.toFixed(2);
}
