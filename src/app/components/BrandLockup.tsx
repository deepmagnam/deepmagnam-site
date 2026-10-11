import logoMark256 from "../../imports/logo-mark-256.webp";
import logoMark512 from "../../imports/logo-mark-512.webp";

type BrandLockupProps = {
  /** Sizing for the logo mark (its height drives the lockup). */
  imgClassName: string;
  /** Sizes for the mark, matching imgClassName's rendered width. */
  imgSizes: string;
  /** Sizing for the "Deepmagnam" line; the second line scales with it. */
  textClassName: string;
};

// The DM mark plus the name as real text, stacked. The img alt carries the
// full name and the visible text is aria-hidden, so screen readers hear the
// name once.
export function BrandLockup({ imgClassName, imgSizes, textClassName }: BrandLockupProps) {
  return (
    <span className="flex h-full items-center">
      <img
        src={logoMark256}
        srcSet={`${logoMark256} 274w, ${logoMark512} 549w`}
        sizes={imgSizes}
        alt="Deepmagnam Integrated Solutions logo"
        decoding="async"
        width={274}
        height={256}
        className={`w-auto shrink-0 object-contain ${imgClassName}`}
      />
      <span
        aria-hidden="true"
        data-brand-text
        className={`flex flex-col whitespace-nowrap uppercase leading-none ${textClassName}`}
      >
        <span className="font-extrabold tracking-wide text-brand-blue">Deepmagnam</span>
        <span className="mt-[0.3em] text-[0.62em] font-bold tracking-wide text-brand-grey">
          Integrated Solutions
        </span>
      </span>
    </span>
  );
}
