import clsx from "clsx"

type RowTemplate = "equal" | "split" | "topSmall" | "bottomSmall"
type ColTemplate = "equal" | "wideLeft" | "wideRight"
type Layout =
  | "twoVertical"
  | "twoHorizontal"
  | "threeVertical"
  | "threeHorizontal"
  | "leftSpanRightSplit"
  | "rightSpanLeftSplit"
  | "grid"

type Slots = {
  slot1?: React.ReactNode
  slot2?: React.ReactNode
  slot3?: React.ReactNode
}

type LayoutManagerProps = {
  layout: Layout
  rowTemplate?: RowTemplate
  colTemplate?: ColTemplate
  height?: string
  width?: string
  gap?: number | string
  className?: string
  slots: Slots
}

const rowTemplateClasses: Record<RowTemplate, string> = {
  equal: "[grid-template-rows:1fr_1fr]",
  split: "[grid-template-rows:1fr_2fr]",
  topSmall: "[grid-template-rows:1fr_2fr]",
  bottomSmall: "[grid-template-rows:2fr_1fr]",
}

const colTemplateClasses: Record<ColTemplate, string> = {
  equal: "[grid-template-columns:1fr_1fr]",
  wideLeft: "[grid-template-columns:2fr_1fr]",
  wideRight: "[grid-template-columns:1fr_2fr]",
}

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
        className={clsx(
          "grid items-stretch",
          rowTemplateClasses[rowTemplate],
          colTemplateClasses[colTemplate],
          height,
          width,
          gapClass,
          className
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
        className={clsx(
          "grid items-stretch",
          rowTemplateClasses[rowTemplate],
          colTemplateClasses[colTemplate],
          height,
          width,
          gapClass,
          className
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
      className={clsx(
        "grid w-full h-full items-stretch",
        {
          [rowTemplateClasses[rowTemplate]]:
            layout === "twoVertical" || layout === "threeVertical",
          [colTemplateClasses[colTemplate]]:
            layout === "twoHorizontal" || layout === "threeHorizontal",
        },
        height,
        width,
        gapClass,
        className
      )}
    >
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  )
}