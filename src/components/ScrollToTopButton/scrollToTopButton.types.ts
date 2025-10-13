export type ResponsiveValue<T> = T | { desktop: T; mobile: T };

export type ScrollToTopButtonProps = {
  threshold?: number;
  fadeDelay?: number;
  stickAtBottom?: boolean;
  bottomOffset?: ResponsiveValue<number>;
  rightOffset?: ResponsiveValue<number>;
  size?: ResponsiveValue<number>;
  desktopBreakpoint?: number;
};


