import type { ComponentType } from "react";
import { Cog, Lightbulb, CodeXml, ShoppingCart, Palette, Cpu } from "lucide-react";

export type ServiceIconProps = {
  className?: string;
  strokeWidth?: number | string;
  "aria-hidden"?: boolean | "true" | "false";
};

// To use a custom icon, replace an entry with any component that takes
// className (and optionally strokeWidth), e.g. an inline <svg> component
// using stroke="currentColor"; callers don't change.
export const serviceIcons = {
  mechanical: Cog,
  product: Lightbulb,
  web: CodeXml,
  ecommerce: ShoppingCart,
  uiux: Palette,
  it: Cpu,
} satisfies Record<string, ComponentType<ServiceIconProps>>;

export type ServiceIconName = keyof typeof serviceIcons;
