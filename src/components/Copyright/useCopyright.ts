import { useMemo } from "react";
import type { CopyrightProps } from "./copyright.types";

export function useCopyright({ entity, terms = [] }: Pick<CopyrightProps, 'entity' | 'terms'>) {
  const year = useMemo(() => new Date().getFullYear(), []);
  
  const copyrightText = useMemo(() => {
    return `© ${year} ${entity}. All rights reserved.`;
  }, [year, entity]);

  const hasTerms = useMemo(() => {
    return terms.length > 0;
  }, [terms.length]);

  return {
    year,
    copyrightText,
    hasTerms,
  };
}
