import Section from "@/sections/_Section";
import FadeVideo from "@/components/FadeVideo";

export default function Hero() {
  return (
    <Section id="hero" fullWidth>
      <div className="relative h-[100svh] overflow-hidden">
        <FadeVideo
          src="/hidden_dao_logo_web_1080.mp4"
          title="Hidden Dao Martial Arts Logo"
          background
          decorative
        />
      </div>
    </Section>
  );
}
