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
  | { layout: "threeVertical"; slots: ThreeSlots }
  | { layout: "threeHorizontal"; slots: ThreeSlots }
  | { layout: "leftSpanRightSplit"; slots: ThreeSlots }
  | { layout: "rightSpanLeftSplit"; slots: ThreeSlots }
  | { layout: "twoByTwo"; slots: FourSlots };

function LayoutThreeVertical({ slots }: { slots: ThreeSlots }) {
  return (
    <div className="flex flex-col gap-2">
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  )
}

function LayoutThreeHorizontal({ slots }: { slots: ThreeSlots }) {
  return (
    <div className="flex flex-row gap-2">
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
    </div>
  )
}

function LayoutTwoByTwo({ slots }: { slots: FourSlots }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.slot1}
      {slots.slot2}
      {slots.slot3}
      {slots.slot4}
    </div>
  )
}

function LayoutLeftSpanRightSplit({ slots }: { slots: ThreeSlots }) {
  return (
    <div className="grid grid-cols-2 gap-6 items-stretch">
      <div className="row-span-2 h-full">{slots.slot1}</div>
      <div className="w-full h-full">{slots.slot2}</div>
      <div className="w-full h-full">{slots.slot3}</div>
    </div>
  )
}


function LayoutRightSpanLeftSplit({ slots }: { slots: ThreeSlots }) {
  return (
    <div className="grid grid-cols-2 gap-4 items-stretch">
      <div className="w-full h-full">{slots.slot1}</div>
      <div className="row-span-2 h-full">{slots.slot3}</div>
      <div className="w-full h-full">{slots.slot2}</div>
    </div>
  )
}

export default function LayoutManager(props: LayoutManagerProps) {
  switch (props.layout) {
    case "threeVertical":
      return <LayoutThreeVertical slots={props.slots} />;
    case "threeHorizontal":
      return <LayoutThreeHorizontal slots={props.slots} />;
    case "leftSpanRightSplit":
      return <LayoutLeftSpanRightSplit slots={props.slots} />;
    case "rightSpanLeftSplit":
      return <LayoutRightSpanLeftSplit slots={props.slots} />;
    case "twoByTwo":
      return <LayoutTwoByTwo slots={props.slots} />;
    default:
      return null;
  }
}