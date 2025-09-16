import { useState } from "react";
import Section from "../components/Section";
import Map from "../components/GoogleMap";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return ""; // don't show error for empty
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    setError(err);
    if (!err && name && email && message) {
      (e.currentTarget as HTMLFormElement).submit();
    }
  };

  const isFormValid = name.trim() && email.trim() && message.trim() && !error;

  return (
    <Section id="contact" title="Contact" subTitle="Contact Us Anytime">
      <form
        action="https://formspree.io/f/your-form-id"
        method="POST"
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4"
      >
        {/* Honeypot field — hidden from users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <input
          name="name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 
                     border-brand-softAccent
                     placeholder-shown:bg-brand-softAccent 
                     bg-brand-light"
        />

        <div className="flex flex-col">
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-4 py-2
                        placeholder-shown:bg-brand-softAccent 
                        bg-brand-light
                        ${
                          error && touched
                            ? "border-brand-starkAccent"
                            : "border-brand-softAccent"
                        }`}
          />
          {error && touched && (
            <p className="mt-1 text-sm text-brand-starkAccent">{error}</p>
          )}
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 
                     border-brand-softAccent
                     placeholder-shown:bg-brand-softAccent 
                     bg-brand-light"
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded px-4 py-2 font-medium transition-colors
            ${
              isFormValid
                ? "bg-brand-starkAccent text-brand-light hover:bg-brand-starkAccent/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Send
        </button>
      </form>

      <div className="mt-6 flex gap-4">
        <a
          className="text-blue-600 hover:underline"
          href="https://facebook.com/yourpage"
        >
          Facebook
        </a>
        <a
          className="text-blue-600 hover:underline"
          href="https://instagram.com/yourpage"
        >
          Instagram
        </a>
        <a
          className="text-blue-600 hover:underline"
          href="https://youtube.com/@yourchannel"
        >
          YouTube
        </a>
      </div>

      <Map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6877.888289372231!2d-97.84227286850981!3d30.466020121569095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b327adb4161cf%3A0xfedb5924ba4fac76!2s1900%20Dagama%20Dr%2C%20Cedar%20Park%2C%20TX%2078613!5e0!3m2!1sen!2sus!4v1757874481160!5m2!1sen!2sus" />
    </Section>
  );
}