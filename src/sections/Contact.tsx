import { useState } from "react";
import Section from "../components/Section";
import Map from "../components/GoogleMap";
import { LuInstagram } from "react-icons/lu";
import { ImYoutube } from "react-icons/im";
import { MdFacebook, MdCheckCircle, MdError } from "react-icons/md";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
  const hours = [
    { day: "Monday", time: "6:00 PM – 8:00 PM" },
    { day: "Tuesday", time: "Closed" },
    { day: "Wednesday", time: "6:00 PM – 8:00 PM" },
    { day: "Thursday", time: "Closed" },
    { day: "Friday", time: "Closed" },
    { day: "Saturday", time: "9:00 AM – 11:00 AM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <Section id="contact" title="Contact" subTitle="Contact Us Anytime">
      <div className="max-w-md mx-auto rounded-2xl shadow-lg bg-brand-light">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-brand-primary">
            Class Times
          </h2>
          <ul className="divide-y divide-gray-200">
            {hours.map((entry, i) => (
              <li key={i} className="flex justify-between py-2">
                <span className="font-medium text-brand-primary">
                  {entry.day}
                </span>
                <span
                  className={
                    entry.time === "Closed"
                      ? "text-brand-starkAccent"
                      : "text-brand-primary"
                  }
                >
                  {entry.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        {/* Name field */}
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

        {/* Email field */}
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

        {/* Message field */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="peer w-full rounded-lg border px-4 pt-5 pb-2 
                       border-brand-softAccent bg-brand-light 
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

      <div className="mt-6 flex gap-4 justify-center text-4xl">
        <a
          className="text-[#1877F2] hover:text-[#1877F2]/80"
          href="https://facebook.com/yourpage"
        >
          <MdFacebook />
        </a>
        <a
          className="text-[#833ab4] hover:text-[#833ab4]/80"
          href="https://instagram.com/yourpage"
        >
          <LuInstagram />
        </a>
        <a
          className="text-[#FF0000] hover:text-[#FF0000]/80"
          href="https://youtube.com/@yourchannel"
        >
          <ImYoutube />
        </a>
      </div>

      <Map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6877.888289372231!2d-97.84227286850981!3d30.466020121569095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b327adb4161cf%3A0xfedb5924ba4fac76!2s1900%20Dagama%20Dr%2C%20Cedar%20Park%2C%20TX%2078613!5e0!3m2!1sen!2sus!4v1757874481160!5m2!1sen!2sus" />
    </Section>
  );
}
