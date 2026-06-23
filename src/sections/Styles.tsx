import { HoverPanel } from "@/components/HoverPanel";
import { Section } from "@/sections/_Section";

export default function Styles() {
  const panels = [
    {
      id: "kungfu",
      title: "Kung Fu",
      subtitle: "Won Hop Loong Chuan",
      description:
        "Won Hop Loong Chuan is an eclectic mix of Northern and Southern Chinese styles, which we refer to as 'Central Chinese'.",
      color: {
        base: "bg-brand-accent/30",
        hover: "bg-brand-accent/0",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/kung_fu.png"
            alt="Kung Fu"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 origin-top group-hover:scale-110"
          />
        </div>
      ),
    },
    {
      id: "karate",
      title: "Karate",
      subtitle: "Okinawan Tomarite Karate",
      description:
        "The style of karate we teach comes from the small fishing village of Tomari, Okinawa.",
      color: {
        base: "bg-brand-accent/30",
        hover: "bg-brand-accent/0",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/karate.png"
            alt="Karate"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 origin-top group-hover:scale-110"
          />
        </div>
      ),
    },
    {
      id: "taichi",
      title: "T'ai Chi",
      subtitle: "Wu Style T'ai Chi Chuan",
      description: "Hong Kong branch of the Northern Wu Style Ta'i Chi Chuan.",
      color: {
        base: "bg-brand-accent/30",
        hover: "bg-brand-accent/0",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/tai_chi.png"
            alt="Tai Chi"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 origin-top group-hover:scale-110"
          />
        </div>
      ),
    },
  ];

  return (
    <Section id="styles" title="Styles" subTitle="Styles We Teach">
      <HoverPanel panels={panels} className="h-[600px]" />
    </Section>
  );
}
