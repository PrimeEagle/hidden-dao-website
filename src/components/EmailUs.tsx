import { useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";

export default function EmailUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validateEmail = (value: string) => {
    if (!value.trim()) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address.";
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    setError(err);
    if (!err && name && email && message) {
      setStatus("loading");
      try {
        const res = await fetch("https://formspree.io/f/your-form-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (res.ok) {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
          setTouched(false);
          setError("");
          setTimeout(() => setStatus("idle"), 5000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }
  };

  const isFormValid = name.trim() && email.trim() && message.trim() && !error;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-full min-h-0"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="relative">
        <input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer w-full rounded-lg border px-4 pt-5 pb-2 
                     border-brand-softAccent bg-brand-light 
                     focus:outline-none focus:ring-2 focus:ring-brand-starkAccent"
        />
        <label
          htmlFor="name"
          className="absolute left-4 top-2.5 text-brand-softAccent text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-softAccent
                     peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-brand-starkAccent"
        >
          Your Name
        </label>
      </div>

      <div className="relative flex flex-col">
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          className={`peer w-full rounded-lg border px-4 pt-5 pb-2 
                      bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-starkAccent
                      ${error && touched ? "border-brand-starkAccent" : "border-brand-softAccent"}`}
        />
        <label
          htmlFor="email"
          className="absolute left-4 top-2.5 text-brand-softAccent text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-softAccent
                     peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-brand-starkAccent"
        >
          Your Email
        </label>
        {error && touched && (
          <p className="mt-1 text-sm text-brand-starkAccent">{error}</p>
        )}
      </div>

      <div className="relative flex-1 min-h-0">
        <textarea
          id="message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="peer w-full h-full rounded-lg border px-4 pt-5 pb-2 
                     border-brand-softAccent bg-brand-light resize-none
                     focus:outline-none focus:ring-2 focus:ring-brand-starkAccent"
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-2.5 text-brand-softAccent text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-softAccent
                     peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-brand-starkAccent"
        >
          Your Message
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || status === "loading"}
        className={`w-full rounded px-4 py-2 font-medium transition-colors flex items-center justify-center gap-2
          ${
            isFormValid && status !== "loading"
              ? "bg-brand-starkAccent text-brand-light hover:bg-brand-starkAccent/90"
              : "bg-brand-light text-brand-softAccent cursor-not-allowed"
          }`}
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 mt-2 opacity-100 transition-opacity duration-500">
          <MdCheckCircle className="w-5 h-5" />
          <span>Message Sent!</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-brand-starkAccent mt-2 opacity-100 transition-opacity duration-500">
          <MdError className="w-5 h-5" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </form>
  );
}
