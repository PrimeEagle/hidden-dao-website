import clsx from "clsx";

export const emailUsStyles = {
  form: "flex flex-col gap-4 h-full min-h-0",
  
  hiddenInput: "hidden",
  
  inputContainer: "relative",
  
  input: (hasError?: boolean) => clsx(
    "peer w-full rounded-lg border px-4 pt-5 pb-2 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-starkAccent",
    hasError ? "border-brand-starkAccent" : "border-brand-softAccent"
  ),
  
  textarea: "peer w-full h-full rounded-lg border px-4 pt-5 pb-2 border-brand-softAccent bg-brand-light resize-y focus:outline-none focus:ring-2 focus:ring-brand-starkAccent",
  
  label: "absolute left-4 top-2.5 text-brand-softAccent text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-softAccent peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-brand-starkAccent",
  
  errorMessage: "mt-1 text-sm text-brand-starkAccent",
  
  submitButton: (isValid: boolean, isLoading: boolean) => clsx(
    "w-full rounded px-4 py-2 font-medium transition-colors flex items-center justify-center gap-2",
    isValid && !isLoading
      ? "bg-brand-starkAccent text-brand-light hover:bg-brand-starkAccent/90"
      : "bg-brand-light text-brand-softAccent cursor-not-allowed"
  ),
  
  successMessage: "flex items-center gap-2 text-green-600 mt-2 opacity-100 transition-opacity duration-500",
  
  errorStatus: "flex items-center gap-2 text-brand-starkAccent mt-2 opacity-100 transition-opacity duration-500"
};
