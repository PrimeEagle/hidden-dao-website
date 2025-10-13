import { MdCheckCircle, MdError } from "react-icons/md";
import { emailUsStyles } from "./emailUs.styles";
import { useEmailUs } from "./useEmailUs";
import type { EmailUsProps } from "./emailUs.types";

export function EmailUs({ className = "" }: EmailUsProps = {}) {
  const {
    formData,
    touched,
    error,
    status,
    isFormValid,
    handleBlur,
    handleSubmit,
    updateField,
  } = useEmailUs();

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className={emailUsStyles.form}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className={emailUsStyles.hiddenInput}
      />

      <div className={emailUsStyles.inputContainer}>
        <input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={emailUsStyles.input()}
        />
        <label
          htmlFor="name"
          className={emailUsStyles.label}
        >
          Your Name
        </label>
      </div>

      <div className={`${emailUsStyles.inputContainer} flex flex-col`}>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={handleBlur}
          className={emailUsStyles.input(!!(error && touched))}
        />
        <label
          htmlFor="email"
          className={emailUsStyles.label}
        >
          Your Email
        </label>
        {error && touched && (
          <p className={emailUsStyles.errorMessage} role="alert">{error}</p>
        )}
      </div>

      <div className={`${emailUsStyles.inputContainer} flex-1 min-h-0`}>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={emailUsStyles.textarea}
        />
        <label
          htmlFor="message"
          className={emailUsStyles.label}
        >
          Your Message
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || status === "loading"}
        aria-disabled={!isFormValid || status === "loading"}
        className={emailUsStyles.submitButton(isFormValid, isLoading)}
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "success" && (
        <div className={emailUsStyles.successMessage} role="status">
          <MdCheckCircle className="w-5 h-5" />
          <span>Message Sent!</span>
        </div>
      )}
      {status === "error" && (
        <div className={emailUsStyles.errorStatus} role="status">
          <MdError className="w-5 h-5" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </form>
  );
}