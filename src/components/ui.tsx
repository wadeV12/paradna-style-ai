import * as React from "react"

type Vars = React.CSSProperties & Record<`--${string}`, string | number>

/** Inline style that also accepts CSS custom properties (e.g. `--d` stagger delays). */
export const vars = (v: Vars) => v as React.CSSProperties

/** Small uppercase section label, e.g. "(02) — Services". */
export const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rv text-[11px] tracking-[0.32em] text-muted uppercase ${className}`}>{children}</div>
)

/** Two-line section heading (`indent` in em for the second line); each line rises out of a mask on scroll, the second in italic accent. */
export const MaskHeading = ({ a, b, indent, className = "" }: { a: string; b: string; indent?: string; className?: string }) => (
  <h2 className={`m-0 font-serif font-normal ${className}`}>
    <span className="mask">
      <span className="lu">{a}</span>
    </span>{" "}
    <span className="mask">
      <span className="lu text-a italic" style={indent ? { paddingLeft: indent } : undefined}>
        {b}
      </span>
    </span>
  </h2>
)

/** Giant outlined section numeral drifting behind the content. */
export const BigNum = ({ n, className = "" }: { n: string; className?: string }) => (
  <div aria-hidden="true" className={`bignum pointer-events-none absolute right-10 font-serif text-[360px] leading-none italic ${className}`}>
    {n}
  </div>
)

/** Circular text on an SVG path (hero badge, testimonial ring, contact orb). */
export const RingText = ({
  id,
  size,
  r,
  text,
  textLength,
  fontSize,
  className = "",
  textClassName = "",
  children,
}: {
  id: string
  size: number
  r: number
  text: string
  textLength: number
  fontSize: number
  className?: string
  textClassName?: string
  children?: React.ReactNode
}) => {
  const c = size / 2
  return (
    <svg className={`spin absolute inset-0 ${className}`} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <defs>
        <path id={id} d={`M${c},${c} m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      {children}
      <text className={`font-sans font-medium uppercase ${textClassName}`} style={{ fontSize }}>
        <textPath href={`#${id}`} textLength={textLength} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  )
}

/** Placeholder caption for images that are still to come, e.g. "[ Image ]". */
export const PhCaption = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`absolute right-0 bottom-[22px] left-0 text-center text-[10px] tracking-[0.3em] uppercase ${className}`}>{children}</div>
)

/** Placeholder tones for image slots, in the design's order. */
export const tones = ["var(--ph1)", "var(--ph8)", "var(--ph9)", "var(--ph2)", "var(--ph3)", "var(--ph10)", "var(--ph11)"]
