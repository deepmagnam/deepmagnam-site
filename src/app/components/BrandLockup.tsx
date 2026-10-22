import logoMark256 from "../../imports/logo-mark-256.webp";
import logoMark512 from "../../imports/logo-mark-512.webp";

type BrandLockupProps = {
  /** Sizing for the logo mark (its height drives the lockup). */
  imgClassName: string;
  /** Sizes for the mark, matching imgClassName's rendered width. */
  imgSizes: string;
  /** Sizing for the "Deepmagnam" line; the second line scales with it. */
  textClassName: string;
  /** White text, and a white plate behind the mark, for a dark background. */
  onDark?: boolean;
};

// The DM mark plus the name as real text, stacked. The img alt carries the
// full name and the visible text is aria-hidden, so screen readers hear the
// name once.
export function BrandLockup({ imgClassName, imgSizes, textClassName, onDark = false }: BrandLockupProps) {
  return (
    <span className="flex h-full items-center">
      <span className="relative flex h-full shrink-0 items-center">
        {/* The mark's darker blues fall below 3:1 on a dark background, so
            there it sits on a white plate: 4px clear of the mark on every side
            (the img's padding is 8px, 10px from md). Absolutely positioned, so
            it never moves anything. */}
        <span
          aria-hidden="true"
          data-brand-plate
          className={`absolute -inset-x-1 inset-y-1 rounded-lg bg-white transition-opacity duration-300 md:inset-y-1.5 ${
            onDark ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={logoMark256}
          srcSet={`${logoMark256} 274w, ${logoMark512} 549w`}
          sizes={imgSizes}
          alt="Deepmagnam Integrated Solutions logo"
          decoding="async"
          width={274}
          height={256}
          className={`relative w-auto shrink-0 object-contain ${imgClassName}`}
        />
      </span>
      <span
        aria-hidden="true"
        data-brand-text
        className={`flex flex-col whitespace-nowrap uppercase leading-none ${textClassName}`}
      >
        <span className={`font-extrabold tracking-wide transition-colors duration-300 ${onDark ? "text-white" : "text-brand-blue"}`}>
          Deepmagnam
        </span>
        <span
          className={`mt-[0.3em] text-[0.62em] font-bold tracking-wide transition-colors duration-300 ${
            onDark ? "text-white" : "text-brand-grey"
          }`}
        >
          Integrated Solutions
        </span>
      </span>
    </span>
  );
}
