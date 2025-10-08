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
    <Section
      id="hero"
      fullWidth
      noPadding
      className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* LEFT */}
      <div className="flex flex-1 flex-col min-w-[50vw] justify-between items-center px-8">
        <div>
          <div className="font-logo text-9xl lg:text-8xl bg-gradient-to-t from-[#372537] to-[#664c66] bg-clip-text text-transparent px-2">
            Hidden Dao
          </div>

          <div className="font-heading text-2xl lg:text-3xl tracking-wide bg-gradient-to-t from-[#4e3a33] to-[#5f473d] bg-clip-text text-transparent [font-variant:small-caps]">
            Train the Body, Refine the Spirit
          </div>
        </div>

        <div className="font-heading text-lg text-brand-secondary text-center leading-relaxed">
          <p className="italic mb-1 text-brand-starkAccent">
            A different kind of martial arts school.
          </p>
          <p className="mb-1">No gimmicks, no sales pitches, no hidden fees.</p>
          <p className="mb-1">Just genuine, personalized instruction.</p>
          <p>
            Learn <span className="font-bold italic">kung fu</span>,{" "}
            <span className="font-bold italic">t'ai chi</span>,{" "}
            <span className="font-bold italic">karate</span>, and{" "}
            <span className="font-bold italic">Daoism</span> in a natural
            outdoor setting.
          </p>
          <div className="flex justify-center mt-4">
            <img
              src="/hidden-dao-seal.png"
              alt="Seal Stamp"
              className="w-[70px] h-auto"
            />
          </div>
        </div>
        <div>
          <div className="flex -translate-y-[100%]">
            <button
              type="button"
              className="mt-6 rounded px-6 py-4 bg-brand-starkAccent text-brand-light text-2xl font-heading hover:opacity-90 transition"
            >
              Sign Up Now!
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex-1 flex justify-center">
        <div className="flex h-screen min-h-[450px] aspect-square items-center">
          <img
            src="/yin-yang.png"
            alt="Yin Yang"
            className="object-contain animate-[spin_180s_linear_infinite] z-0"
          />

          {/* <img
            ref={cloud1Ref}
            src="/cloud-1.png"
            alt="Cloud 1"
            className="absolute top-[25%] left-[20%] w-[35%] z-10"
          />
          <img
            ref={cloud2Ref}
            src="/cloud-2.png"
            alt="Cloud 2"
            className="absolute top-[50%] right-[15%] w-[40%] z-10"
          />
          <img
            ref={cloud3Ref}
            src="/cloud-3.png"
            alt="Cloud 3"
            className="absolute bottom-[10%] left-[25%] w-[38%] z-10"
          /> */}

          {/* <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-20 [writing-mode:vertical-rl] font-chinese bg-gradient-to-t from-[#3c3c3c] to-[#674d41] bg-clip-text text-transparent text-[8%]">
            隱道
          </div>

          <div className="absolute top-1/2 left-[15%] -translate-y-[50%] z-20 [writing-mode:vertical-rl] font-chinese text-[#251a18] text-[5%]">
            道隱無名
          </div>

          <div className="absolute top-1/2 right-[15%] -translate-y-[50%] z-20 [writing-mode:vertical-rl] font-chinese text-[#251a18] text-[5%]">
            隱道宗門
          </div> */}
        </div>
      </div>
    </Section>
  );
}
