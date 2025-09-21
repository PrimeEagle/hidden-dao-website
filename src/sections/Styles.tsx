import HoverPanels from "@/components/HoverPanels";
import Section from "@/components/Section";

export default function Styles() {
   const panels = [
    {
      id: "kungfu",
      title: "Chinese Gong Fu",
      subtitle: "Central Chinese Gong Fu",
      description: "Won Hop Loong Chuan is an eclectic mix of Northern and Southern Chinese styles, which we refer to as 'Central Chinese'.",
      image: "https://picsum.photos/id/1015/800/600",
      color: {
        base: "bg-black/70",
        hover: "bg-black/40",
      },
    },
    {
      id: "karate",
      title: "Okinawan Karate",
      subtitle: "Tomarite Karate",
      description: "The style of karate we teach comes from the small fishing village of Tomari, Okinawa.",
      image: "https://picsum.photos/id/1016/800/600",
      color: {
        base: "bg-black/70",
        hover: "bg-black/40",
      },
    },
    {
      id: "taichi",
      title: "T'ai Chi",
      subtitle: "Wu Style T'ai Chi Chuan",
      description: "Hong Kong branch of the Northern Wu Style Ta'i Chi Chuan.",
      image: "https://picsum.photos/id/1018/800/600",
      color: {
        base: "bg-black/70",
        hover: "bg-black/40",
      },
    },
  ];

  return (
    <Section id="styles" title="Styles" subTitle="Styles We Teach">
      <HoverPanels panels={panels} className="h-[600px]"/>
    </Section>
  );
}
