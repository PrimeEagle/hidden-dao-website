import HoverPanels from "@/components/HoverPanels";
import Section from "@/sections/_Section";

export default function Styles() {
  const panels = [
    {
      id: "kungfu",
      title: "Gong Fu",
      subtitle: "Central Chinese Gong Fu",
      description:
        "Won Hop Loong Chuan is an eclectic mix of Northern and Southern Chinese styles, which we refer to as 'Central Chinese'.",
      color: {
        base: "bg-brand-accent/50",
        hover: "bg-brand-accent/20",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/kung-fu-in-mountains.png"
            alt="Mountains"
            className="absolute inset-0 w-full h-full object-cover"
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
        base: "bg-brand-secondary/40",
        hover: "bg-brand-secondary/10",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/karate-in-tomari-2.png"
            alt="Rocky Beach"
            className="absolute inset-0 w-full h-full object-cover"
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
        base: "bg-brand-starkAccent/20",
        hover: "bg-brand-starkAccent/10",
      },
      children: (
        <div className="relative w-full h-full">
          <img
            src="/tai-chi-in-forbidden-city.png"
            alt="Forbidden City"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ),
    },
  ];

  return (
    <Section id="styles" title="Styles" subTitle="Styles We Teach">
      <HoverPanels panels={panels} className="h-[600px]" />
    </Section>
  );
}
