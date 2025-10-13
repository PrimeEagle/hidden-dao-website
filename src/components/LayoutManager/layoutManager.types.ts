export type RowTemplate = "equal" | "split" | "topSmall" | "bottomSmall";
export type ColTemplate = "equal" | "wideLeft" | "wideRight";
export type Layout =
  | "twoVertical"
  | "twoHorizontal"
  | "threeVertical"
  | "threeHorizontal"
  | "leftSpanRightSplit"
  | "rightSpanLeftSplit"
  | "grid";

export type Slots = {
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
  slot3?: React.ReactNode;
};

export type LayoutManagerProps = {
  layout: Layout;
  rowTemplate?: RowTemplate;
  colTemplate?: ColTemplate;
  height?: string;
  width?: string;
  gap?: number | string;
  className?: string;
  slots: Slots;
};


