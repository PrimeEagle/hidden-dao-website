import Section from "@/sections/_Section";
import ContentSlider from "@/components/ContentSlider/ContentSlider";

const testimonials = [
  {
    quote: "This school has completely transformed my discipline and fitness.",
    author: "Jane Doe",
    role: "Student",
  },
  {
    quote: "The instructors are patient, professional, and inspiring.",
    author: "John Smith",
    role: "Parent",
  },
  {
    quote: "Training here gave me strength, confidence, and new friends.",
    author: "Alex Lee",
    role: "Student",
  },
  {
    quote: "A truly supportive community that pushes you to grow.",
    author: "Maria Lopez",
    role: "Student",
  },
];

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      title="Testimonials"
      subTitle="What Our Students Say"
    >
      <ContentSlider
        className="max-w-6xl"
        data={testimonials}
        renderItem={(t) => (
          <>
            <p className="italic">“{t.quote}”</p>
            <p className="mt-4 font-semibold">{t.author}</p>
            {t.role && <p className="text-sm text-brand-accent">{t.role}</p>}
          </>
        )}
      />
    </Section>
  );
}