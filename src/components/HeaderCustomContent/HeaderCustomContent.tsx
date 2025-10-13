import React from "react";
import type { HeaderCustomContentProps } from "./headerCustomContent.types";

export function HeaderCustomContent({
  googleFonts = [],
  favicon,
  meta = [],
}: HeaderCustomContentProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {googleFonts.map((font, i) => {
        const familyParam = font.family.replace(/\s+/g, "+");

        let axesParam = "";
        if (font.weights || font.axes) {
          const axisNames: string[] = [];
          const axisValues: string[][] = [];

          if (font.weights && font.weights.length > 0) {
            axisNames.push("wght");
            axisValues.push(font.weights.map((w) => String(w)));
          }

          if (font.axes && font.axes.length > 0) {
            for (const axis of font.axes) {
              axisNames.push(axis.name);

              if (axis.values && axis.values.length > 0) {
                axisValues.push(axis.values.map((v) => String(v)));
              } else if (font.weights && font.weights.length > 0) {
                axisValues.push(font.weights.map((w) => String(w)));
              } else {
                axisValues.push([]);
              }
            }
          }

          if (axisNames.length > 0) {
            const combos: string[] = [];
            const buildCombos = (prefix: string[], depth: number) => {
              if (depth === axisValues.length) {
                combos.push(prefix.join(","));
                return;
              }
              for (const v of axisValues[depth]) {
                buildCombos([...prefix, v], depth + 1);
              }
            };
            buildCombos([], 0);

            axesParam = `:${axisNames.join(",")}@${combos.join(";")}`;
          }
        }

        const href = `https://fonts.googleapis.com/css2?family=${familyParam}${axesParam}&display=swap`;
        return (
          <React.Fragment key={i}>
            <link href={href} rel="stylesheet" />
          </React.Fragment>
        );
      })}

      {Array.isArray(favicon)
        ? favicon.map((f, i) => (
            <link key={i} rel="icon" type={f.type} href={f.href} />
          ))
        : favicon && (
            <link rel="icon" type={favicon.type} href={favicon.href} />
          )}

      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}
    </>
  );
}
