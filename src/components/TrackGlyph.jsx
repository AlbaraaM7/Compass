// Per-track SVG glyphs. All 24x24, 1.5px stroke, inherit currentColor.
// One distinct shape per track so the picker is scannable at a glance,
// independent of color.

const PATHS = {
  engineering: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.6" fill="currentColor" stroke="none" />
      <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" strokeDasharray="2 2.5" />
      <line x1="15.5" y1="8.5" x2="15.5" y2="10.5" />
      <line x1="8.5" y1="10.5" x2="8.5" y2="15.5" />
      <line x1="11" y1="3.5" x2="11" y2="5.5" />
      <line x1="19.5" y1="11" x2="17.5" y2="11" />
    </>
  ),
  business: (
    <>
      <line x1="3" y1="20" x2="21" y2="20" strokeWidth="1" />
      <rect x="4" y="14" width="3" height="6" rx="0.5" />
      <rect x="9" y="10" width="3" height="10" rx="0.5" />
      <rect x="14" y="6" width="3" height="14" rx="0.5" />
      <rect x="19" y="3" width="3" height="17" rx="0.5" />
      <polyline points="5.5,13 10.5,9 15.5,5 20.5,2" strokeWidth="1" strokeDasharray="2 2" />
    </>
  ),
  arts: (
    <>
      <path d="M12 3 C 7.5 9.5, 6 13.5, 6 16.5 a 6 6 0 0 0 12 0 C 18 13.5, 16.5 9.5, 12 3 z" />
      <circle cx="9.5" cy="17" r="1.3" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="14" cy="14.5" r="0.9" fill="currentColor" stroke="none" opacity="0.5" />
    </>
  ),
  health: (
    <>
      <path d="M3 12 H 7 L 9 8 L 12 16 L 15 10 L 17 12 H 21" />
      <line x1="3" y1="20" x2="21" y2="20" strokeWidth="1" />
    </>
  )
};

export default function TrackGlyph({ trackId, className = '', size = 24 }) {
  const path = PATHS[trackId];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
