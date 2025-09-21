import HoverPanels from "@/components/HoverPanels";
import Section from "@/components/Section";

export default function Styles() {
   const panels = [
    {
      id: "kungfu",
      title: "Gong Fu",
      subtitle: "Central Chinese Gong Fu",
      description: "Won Hop Loong Chuan is an eclectic mix of Northern and Southern Chinese styles, which we refer to as 'Central Chinese'.",
      color: {
        base: "bg-brand-starkAccent/40",
        hover: "bg-brand-starkAccent/15",
      },
      children: (
        <div className="relative w-full h-full">
          <img src="/luoyang-mountains.png" className="absolute inset-0 w-full h-full object-cover" />
          <img src="/kung-fu.png" className="absolute bottom-0 left-0 right-0 object-contain mx-auto" />
        </div>
      ),
    },
    {
      id: "karate",
      title: "Karate",
      subtitle: "Okinawan Tomarite Karate",
      description: "The style of karate we teach comes from the small fishing village of Tomari, Okinawa.",
      color: {
        base: "bg-brand-secondary/40",
        hover: "bg-brand-secondary/15",
      },
      children: (
        <div className="relative w-full h-full">
          <img src="/tomari-beach.png" className="absolute inset-0 w-full h-full object-cover" />
          <img src="/karate.png" className="absolute bottom-0 left-0 right-0 object-contain mx-auto" />
        </div>
      ),
    },
    {
      id: "taichi",
      title: "T'ai Chi",
      subtitle: "Wu Style T'ai Chi Chuan",
      description: "Hong Kong branch of the Northern Wu Style Ta'i Chi Chuan.",
      color: {
        base: "bg-brand-accent/40",
        hover: "bg-brand-accent/15",
      },
      children: (
        <div className="relative w-full h-full">
          <img src="/forbidden-city.png" className="absolute inset-0 w-full h-full object-cover" />
          <img src="/tai-chi.png" className="absolute bottom-0 left-0 right-0 object-contain mx-auto" />
        </div>
      ),
    },
  ];

  return (
    <Section id="styles" title="Styles" subTitle="Styles We Teach">
      <HoverPanels panels={panels} className="h-[600px]"/>
    </Section>
  );
}
