import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What ages can join the classes?",
    answer:
      "We welcome students of all ages, from kids (5+) to adults. Classes are grouped to match age and skill level.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No experience is necessary. Beginners are always welcome, and we’ll guide you step by step.",
  },
  {
    question: "What should I wear to my first class?",
    answer:
      "Comfortable athletic clothes are fine to start. Once you enroll, uniforms are available through the school.",
  },
];

function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-2 shrink-0 text-gray-800"
    >
      {/* Horizontal line (always visible) */}
      <line x1="5" y1="12" x2="19" y2="12" />

      {/* Vertical line (fades out when open) */}
      <motion.line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }} // match panel duration
      />
    </svg>
  );
}

function FAQItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200 py-1">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-lg font-medium hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-accent"
      >
        <span>{q}</span>
        <PlusMinusIcon isOpen={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} // same duration
            className="overflow-hidden px-2 pb-4 text-brand-primary"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" title="FAQ" subTitle="Common Questions">
      <div className="mx-auto max-w-2xl divide-y divide-brand-softAccent">
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            q={item.question}
            a={item.answer}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}
