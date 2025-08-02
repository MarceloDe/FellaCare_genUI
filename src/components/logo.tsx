
export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FellaCare Logo"
    >
      <circle cx="16" cy="16" r="16" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="hsl(var(--primary-foreground))"
        fontSize="18"
        fontFamily="Inter, sans-serif"
        fontWeight="bold"
        dy=".05em"
      >
        F
      </text>
    </svg>
  );
}
