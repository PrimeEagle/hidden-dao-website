export const animationStrategies = {
  fade: (el: HTMLDivElement, expanded: boolean) => {
    el.style.maxHeight = expanded ? `${el.scrollHeight}px` : "0px";
    el.style.opacity = expanded ? "1" : "0";
    el.style.transform = "none";
    el.style.marginTop = expanded ? "0.5rem" : "0";
  },

  slide: (el: HTMLDivElement, expanded: boolean) => {
    el.style.maxHeight = expanded ? `${el.scrollHeight}px` : "0px";
    el.style.opacity = "1";
    el.style.transform = expanded ? "translateY(0)" : "translateY(-1rem)";
    el.style.marginTop = expanded ? "0.5rem" : "0";
  },

  zoom: (el: HTMLDivElement, expanded: boolean) => {
    el.style.maxHeight = expanded ? `${el.scrollHeight}px` : "0px";
    el.style.opacity = expanded ? "1" : "0";
    el.style.transform = expanded ? "scale(1)" : "scale(0.95)";
    el.style.marginTop = expanded ? "0.5rem" : "0";
  },

  shift: (el: HTMLDivElement, expanded: boolean) => {
    el.style.maxHeight = expanded ? `${el.scrollHeight}px` : "0px";
    el.style.opacity = "1";
    el.style.transform = expanded ? "translateX(0)" : "translateX(-1rem)";
    el.style.marginTop = expanded ? "0.5rem" : "0";
  },
};
