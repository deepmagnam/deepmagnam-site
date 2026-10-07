import logoImage from "../../imports/logo-mark.webp";

type BrandLockupProps = {
  /** Sizing for the logo mark (its height drives the lockup). */
  imgClassName: string;
  /** Sizing for the wordmark text. */
  textClassName: string;
};

// The logo mark already reads "DEEP MAGNAM", so the wordmark beside it is just
// "Integrated Solutions". The img alt carries the full name and the visible
// text is aria-hidden, so screen readers hear the name once, not
// "Deepmagnam Integrated Solutions Integrated Solutions".
export function BrandLockup({ imgClassName, textClassName }: BrandLockupProps) {
  return (
    <span className="flex h-full items-center">
      <img
        src={logoImage}
        alt="Deepmagnam Integrated Solutions"
        decoding="async"
        width={256}
        height={256}
        className={`w-auto shrink-0 object-contain ${imgClassName}`}
      />
      <span
        aria-hidden="true"
        data-brand-text
        className={`whitespace-nowrap uppercase font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent ${textClassName}`}
      >
        Integrated Solutions
      </span>
    </span>
  );
}
