import { useEffect, useRef } from "react";
import Section from "@/sections/_Section";

function useWiggle(seed = 1000, freq = 0.01, amp = 10) {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const rand = (n: number) => {
      let x = Math.sin(seed++) * 10000;
      return n * (x - Math.floor(x));
    };

    const offsetX = rand(1000);
    const offsetY = rand(1000);

    const animate = () => {
      const now = Date.now() / 1000;
      const x = Math.sin((now + offsetX) * freq * 2 * Math.PI) * amp;
      const y = Math.cos((now + offsetY) * freq * 2 * Math.PI) * amp;

      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [seed, freq, amp]);

  return ref;
}

export default function Hero() {
  const cloud1Ref = useWiggle(1234, 0.03, 19);
  const cloud2Ref = useWiggle(1235, 0.04, 20);
  const cloud3Ref = useWiggle(1236, 0.02, 18);

  return (
    <Section id="hero" fullWidth>
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-[300px] lg:h-[600px] flex flex-col items-center justify-center">
          <div className="font-logo text-9xl bg-gradient-to-t from-[#372537] to-[#664c66] bg-clip-text text-transparent mb-4 pr-2">
            Hidden Dao
          </div>      
          <div className="font-heading text-3xl tracking-wide bg-gradient-to-t from-[#4e3a33] to-[#5f473d] bg-clip-text text-transparent [font-variant:small-caps] border p-2">
            Train the Body, Refine the Spirit
          </div>
          <div className="font-heading text-lg text-brand-accent">
            <p className="text-center mb-0.5">
              A different kind of martial arts school.
            </p>
            <p className="text-center mb-0.5">
              No gimmicks, no sales pitches, just genuine, personalized
              instruction.
            </p>
            <p className="text-center mb-0.5">
              Learn <span className="italic font-bold">kung fu</span>,{" "}
              <span className="italic font-bold">t'ai chi</span>,{" "}
              <span className="italic font-bold">karate</span>, and{" "}
              <span className="italic font-bold">Daoism</span> in a natural
              outdoor setting.
            </p>
            <img
              src="/hidden-dao-seal.png"
              alt="Seal Stamp"
              className="absolute w-[50vw] max-w-[75px] left-[25%] h-auto"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[600px] relative flex items-center justify-center overflow-hidden">
          <img
            src="/yin-yang.png"
            alt="Yin Yang"
            className="absolute w-[50vw] max-w-[600px] h-auto animate-[spin_180s_linear_infinite]"
          />

          <img
            ref={cloud1Ref}
            src="/cloud-1.png"
            alt="Cloud 1"
            className="absolute w-[35vw] max-w-[500px] top-[10%] left-[1%] z-10"
          />
          <img
            ref={cloud2Ref}
            src="/cloud-2.png"
            alt="Cloud 2"
            className="absolute w-[40vw] max-w-[500px] top-[43%] right-[1%] z-10"
          />
          <img
            ref={cloud3Ref}
            src="/cloud-3.png"
            alt="Cloud 3"
            className="absolute w-[38vw] max-w-[550px] top-[70%] left-[10%] z-10"
          />

          <div className="absolute left-[17%] text-center">
            <div className="font-chinese text-8xl bg-gradient-to-t from-[#3c3c3c] to-[#674d41] bg-clip-text text-transparent [writing-mode:vertical-rl]">
              隱道
            </div>
          </div>

          <div className="absolute left-[3%] top-1/2 -translate-y-1/2">
            <div className="font-chinese text-4xl text-[#251a18] [writing-mode:vertical-rl]">
              道隱無名
            </div>
          </div>

          <div className="absolute right-[5%] top-[15%] -translate-y-1/2">
            <div className="font-chinese text-4xl text-[#251a18] [writing-mode:vertical-rl]">
              隱道宗門
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
