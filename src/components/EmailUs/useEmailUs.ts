import { useState, useCallback } from "react";
import type { FormStatus, FormData } from "./emailUs.types";

export function useEmailUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateEmail = useCallback((value: string) => {
    if (!value.trim()) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address.";
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
    setError(validateEmail(formData.email));
  }, [formData.email, validateEmail]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(formData.email);
    setError(err);
    
    if (!err && formData.name && formData.email && formData.message) {
      setStatus("loading");
      try {
        const res = await fetch("https://formspree.io/f/your-form-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (res.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
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
  }, [formData, validateEmail]);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const isFormValid = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.message.trim() !== "" && !error;

  return {
    formData,
    touched,
    error,
    status,
    isFormValid,
    handleBlur,
    handleSubmit,
    updateField,
  };
}
