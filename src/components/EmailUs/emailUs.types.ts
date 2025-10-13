export type FormStatus = "idle" | "loading" | "success" | "error";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type EmailUsProps = {
  className?: string;
};
