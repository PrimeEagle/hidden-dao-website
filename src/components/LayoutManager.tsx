type ThreeSlots = {
  slot1: React.ReactNode;
  slot2: React.ReactNode;
  slot3: React.ReactNode;
};

type FourSlots = {
  slot1: React.ReactNode;
  slot2: React.ReactNode;
  slot3: React.ReactNode;
  slot4: React.ReactNode;
};

type LayoutManagerProps =
  | {
      layout: "threeVertical";
      slots: ThreeSlots;
      className?: string;
      height?: string;
      width?: string;
      gap?: number;
    }
  | {
      layout: "threeHorizontal";
      slots: ThreeSlots;
      className?: string;
      height?: string;
      width?: string;
      gap?: number;
    }
  | {
      layout: "twoByTwo";
      slots: FourSlots;
      className?: string;
      rowTemplate?: RowTemplate;
      colTemplate?: ColTemplate;
      height?: string;
      width?: string;
      gap?: number;
    }
  | {
      layout: "leftSpanRightSplit";
      slots: ThreeSlots;
      className?: string;
      rowTemplate?: RowTemplate;
      colTemplate?: ColTemplate;
      height?: string;
      width?: string;
      gap?: number;
    }
  | {
      layout: "rightSpanLeftSplit";
      slots: ThreeSlots;
      className?: string;
      rowTemplate?: RowTemplate;
      colTemplate?: ColTemplate;
      height?: string;
      width?: string;
      gap?: number;
    };

type RowTemplate = "equal" | "split" | "topSmall" | "bottomSmall";
type ColTemplate = "equal" | "leftWide" | "rightWide";

const rowTemplateClasses: Record<RowTemplate, string> = {
  equal: "[grid-template-rows:1fr_1fr]",
  split: "[grid-template-rows:1fr_2fr]",
  topSmall: "[grid-template-rows:1fr_2fr]",
  bottomSmall: "[grid-template-rows:2fr_1fr]",
};

const colTemplateClasses: Record<ColTemplate, string> = {
  equal: "[grid-template-columns:1fr_1fr]",
  leftWide: "[grid-template-columns:2fr_1fr]",
  rightWide: "[grid-template-columns:1fr_2fr]",
};

type CommonProps = {
  className?: string;
  height?: string;
  width?: string;
  gap?: number;
};

const gapClasses: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

type GridProps = CommonProps & {
  rowTemplate?: RowTemplate;
  colTemplate?: ColTemplate;
};

function makeClasses({ className, height, width, gap }: CommonProps) {
  const gapClass = gap !== undefined ? (gapClasses[gap] ?? "") : "gap-2";
  return `${height ?? ""} ${width ?? ""} ${gapClass} ${className ?? ""}`;
}

function LayoutThreeVertical({
  slots,
  ...rest
}: { slots: ThreeSlots } & CommonProps) {
  return (
    <div className={`flex flex-col items-stretch ${makeClasses(rest)}`}>
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  );
}

function LayoutThreeHorizontal({
  slots,
  ...rest
}: { slots: ThreeSlots } & CommonProps) {
  return (
    <div className={`flex flex-row items-stretch ${makeClasses(rest)}`}>
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  );
}

function LayoutTwoByTwo({
  slots,
  rowTemplate = "equal",
  colTemplate = "equal",
  ...rest
}: { slots: FourSlots } & GridProps) {
  return (
    <div
      className={`grid items-stretch ${rowTemplateClasses[rowTemplate]} ${colTemplateClasses[colTemplate]} ${makeClasses(rest)}`}
    >
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
      {slots.slot4}
    </div>
  );
}

function LayoutLeftSpanRightSplit({
  slots,
  rowTemplate = "equal",
  colTemplate = "equal",
  ...rest
}: { slots: ThreeSlots } & GridProps) {
  return (
    <div
      className={`grid items-stretch ${rowTemplateClasses[rowTemplate]} ${colTemplateClasses[colTemplate]} ${makeClasses(rest)}`}
    >
      <div className="row-span-2 h-full">{slots.slot1}</div>
      <div className="h-full">{slots.slot2}</div>
      <div className="h-full">{slots.slot3}</div>
    </div>
  );
}

function LayoutRightSpanLeftSplit({
  slots,
  rowTemplate = "equal",
  colTemplate = "equal",
  ...rest
}: { slots: ThreeSlots } & GridProps) {
  return (
    <div
      className={`grid items-stretch ${rowTemplateClasses[rowTemplate]} ${colTemplateClasses[colTemplate]} ${makeClasses(rest)}`}
    >
      <div className="h-full">{slots.slot1}</div>
      <div className="row-span-2 h-full">{slots.slot3}</div>
      <div className="h-full">{slots.slot2}</div>
    </div>
  );
}

export default function LayoutManager(props: LayoutManagerProps) {
  switch (props.layout) {
    case "threeVertical":
      return <LayoutThreeVertical {...props} />;
    case "threeHorizontal":
      return <LayoutThreeHorizontal {...props} />;
    case "twoByTwo":
      return <LayoutTwoByTwo {...props} />;
    case "leftSpanRightSplit":
      return <LayoutLeftSpanRightSplit {...props} />;
    case "rightSpanLeftSplit":
      return <LayoutRightSpanLeftSplit {...props} />;
    default:
      return null;
  }
}
