import { layoutManagerStyles, rowTemplateClasses, colTemplateClasses } from "./layoutManager.styles"
import type { LayoutManagerProps } from "./layoutManager.types"

export function LayoutManager({
  layout,
  rowTemplate = "equal",
  colTemplate = "equal",
  height,
  width,
  gap = 4,
  className,
  slots,
}: LayoutManagerProps) {
  const gapClass =
    typeof gap === "number" && gap >= 0 && gap <= 12
      ? `gap-${gap}`
      : typeof gap === "string"
      ? `gap-[${gap}]`
      : "gap-4"

  if (layout === "leftSpanRightSplit") {
    return (
      <div
        className={layoutManagerStyles.container(
          `${rowTemplateClasses[rowTemplate]} ${colTemplateClasses[colTemplate]}`,
          height,
          width,
          gapClass,
          className,
        )}
      >
        <div className="row-span-2 h-full">{slots.slot1}</div>
        <div className="h-full">{slots.slot2}</div>
        <div className="h-full">{slots.slot3}</div>
      </div>
    )
  }

  if (layout === "rightSpanLeftSplit") {
    return (
      <div
        className={layoutManagerStyles.container(
          `${rowTemplateClasses[rowTemplate]} ${colTemplateClasses[colTemplate]}`,
          height,
          width,
          gapClass,
          className,
        )}
      >
        <div className="h-full">{slots.slot1}</div>
        <div className="row-span-2 h-full">{slots.slot3}</div>
        <div className="h-full">{slots.slot2}</div>
      </div>
    )
  }

  return (
    <div
      className={layoutManagerStyles.container(
        {
          [rowTemplateClasses[rowTemplate]]:
            layout === "twoVertical" || layout === "threeVertical",
          [colTemplateClasses[colTemplate]]:
            layout === "twoHorizontal" || layout === "threeHorizontal",
        },
        height,
        width,
        gapClass,
        className,
      )}
    >
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  )
}