// Hand-written declaration for FpsStartCard.js.
//
// The component lives in a .js file that contains JSX. `tsc` does not parse JSX
// out of a .js extension, so it cannot infer the component's props and every
// .tsx drill importing it saw `ComponentType<{}>` -- reporting a type error on
// each of the eight props it legitimately passes. Drills worked around this
// with `FpsStartCard as React.ComponentType<any>` casts, which silenced the
// error and also silenced the real one underneath it: `rules` and `stats` were
// not in the signature at all, so React dropped them.
//
// Keep this file in step with the destructured parameter list in
// FpsStartCard.js. It is the contract 66 drills are checked against.
import type { ComponentType, ReactNode } from 'react';

export interface FpsStartCardRule {
  icon?: ComponentType<{ className?: string }>;
  accent?: string;
  title: string;
  text?: string;
}

export interface FpsStartCardStat {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
  color?: string;
  accent?: string;
}

export interface FpsStartCardProps {
  icon?: ComponentType<{ className?: string }>;
  accent?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  rules?: FpsStartCardRule[] | null;
  stats?: FpsStartCardStat[] | null;
  isTouchOnlyDevice?: boolean;
  touchBlockedLabel?: string;
  onStart?: () => void | Promise<void>;
  maxWidthClassName?: string;
}

declare const FpsStartCard: ComponentType<FpsStartCardProps>;
export default FpsStartCard;
