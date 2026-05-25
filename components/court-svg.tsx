export function CourtSVG() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="block h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="320" height="200" fill="#1E3A2F" />
      <rect
        x="30"
        y="20"
        width="260"
        height="160"
        fill="none"
        stroke="#F4EFE3"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <line
        x1="30"
        y1="100"
        x2="290"
        y2="100"
        stroke="#F4EFE3"
        strokeOpacity="0.85"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <line
        x1="30"
        y1="60"
        x2="290"
        y2="60"
        stroke="#F4EFE3"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="140"
        x2="290"
        y2="140"
        stroke="#F4EFE3"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <line
        x1="160"
        y1="60"
        x2="160"
        y2="140"
        stroke="#F4EFE3"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <circle cx="80" cy="40" r="6" fill="#F4EFE3" />
      <circle cx="220" cy="40" r="6" fill="#F4EFE3" />
      <circle cx="90" cy="160" r="6" fill="#D66A3C" />
      <circle cx="230" cy="160" r="6" fill="#D66A3C" />
      <path
        d="M 150 120 Q 170 70, 200 50"
        stroke="#F4EFE3"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 3"
      />
      <circle cx="200" cy="50" r="4" fill="#F4EFE3" />
    </svg>
  );
}
