export type PositionValue =
  | "0"
  | "px"
  | "full"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | (string & {});

export type BackgroundImage = {
  src: string;
  alt: string;
  className?: string;
  top?: PositionValue;
  bottom?: PositionValue;
  left?: PositionValue;
  right?: PositionValue;
};

export type MultiBackgroundImagesProps = {
  images: BackgroundImage[];
  className?: string;
};


