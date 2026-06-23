export type MetaTag = {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
};

export type Favicon = { type: string; href: string };

export type GoogleFontAxis = {
  name: string;
  values?: (string | number)[];
};

export type GoogleFont = {
  family: string;
  weights?: number[];
  axes?: GoogleFontAxis[];
  preload?: boolean;
};

export type HeaderCustomContentProps = {
  googleFonts?: GoogleFont[];
  favicon?: Favicon | Favicon[];
  meta?: MetaTag[];
};


