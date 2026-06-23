import clsx from "clsx";
import type { ColTemplate, RowTemplate } from "./layoutManager.types";

export const layoutManagerStyles = {
  container: (
    layoutClasses: string | Record<string, boolean>,
    height?: string,
    width?: string,
    gapClass?: string,
    className?: string
  ) =>
    clsx("grid items-stretch", layoutClasses, height, width, gapClass, className),
};

export const rowTemplateClasses: Record<RowTemplate, string> = {
  equal: "[grid-template-rows:1fr_1fr]",
  split: "[grid-template-rows:1fr_2fr]",
  topSmall: "[grid-template-rows:1fr_2fr]",
  bottomSmall: "[grid-template-rows:2fr_1fr]",
};

export const mdRowTemplateClasses: Record<RowTemplate, string> = {
  equal: "md:[grid-template-rows:1fr_1fr]",
  split: "md:[grid-template-rows:1fr_2fr]",
  topSmall: "md:[grid-template-rows:1fr_2fr]",
  bottomSmall: "md:[grid-template-rows:2fr_1fr]",
};

export const colTemplateClasses: Record<ColTemplate, string> = {
  equal: "[grid-template-columns:1fr_1fr]",
  wideLeft: "[grid-template-columns:2fr_1fr]",
  wideRight: "[grid-template-columns:1fr_2fr]",
};

export const mdColTemplateClasses: Record<ColTemplate, string> = {
  equal: "md:[grid-template-columns:1fr_1fr]",
  wideLeft: "md:[grid-template-columns:2fr_1fr]",
  wideRight: "md:[grid-template-columns:1fr_2fr]",
};


