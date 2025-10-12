import { useEffect, useRef, useState } from "react";
import { Section } from "@/sections/_Section";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null); // NEW
  const yinYangRef = useRef<HTMLDivElement>(null);

  // const cloud1Ref = useWiggle(1234, 0.03, 19);
  // const cloud2Ref = useWiggle(1235, 0.04, 20);
  // const cloud3Ref = useWiggle(1236, 0.025, 18);

  useEffect(() => {
    const updateMatch = () => {
      if (!contentBoxRef.current || !yinYangRef.current) return;

      const rect = contentBoxRef.current.getBoundingClientRect();

      if (window.matchMedia("(min-width: 1280px)").matches) {
        // xl: flex-row → match HEIGHT of the actual content stack
        yinYangRef.current.style.height = `${rect.height}px`;
        yinYangRef.current.style.width = "auto";
      } else {
        // flex-col → match WIDTH of the actual content stack
        yinYangRef.current.style.width = `${rect.width}px`;
        yinYangRef.current.style.height = "auto";
      }

      yinYangRef.current.style.aspectRatio = "1 / 1";
    };

    updateMatch();

    // keep it responsive to content & viewport changes
    const ro = new ResizeObserver(updateMatch);
    if (contentBoxRef.current) ro.observe(contentBoxRef.current);

    window.addEventListener("resize", updateMatch);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMatch);
    };
  }, []);

  return (
    <Section
      id="hero"
      fullWidth
      noPadding
      className="
          relative
          flex flex-col w-full xl:flex-row justify-center items-center
          h-[calc(100vh-var(--navbar-height))]
          translate-y-[calc(var(--navbar-height))]
        "
    >
      <div className="flex flex-col xl:flex-row justify-center items-center w-full max-w-7xl">
        {/* LEFT/TOP */}
        <div
          ref={contentRef}
          className="flex flex-col w-full xl:w-1/2 justify-center items-center px-8"
        >
          <div
            ref={contentBoxRef}
            className="flex flex-col items-center text-center w-fit max-w-full"
          >
            <div className="font-logo text-6xl md:text-8xl bg-gradient-to-t from-[#372537] to-[#664c66] bg-clip-text text-transparent px-2">
              Hidden Dao
            </div>

            <div className="font-heading text-xl md:text-3xl tracking-wide bg-gradient-to-t from-[#4e3a33] to-[#5f473d] bg-clip-text text-transparent [font-variant:small-caps]">
              Train the Body, Refine the Spirit
            </div>

            <div className="font-heading text-sm md:text-lg text-brand-secondary text-center leading-relaxed pt-4 xl:pt-6">
              <p className="italic mb-1 text-brand-accent">
                A different kind of martial arts school.
              </p>
              <p className="mb-1">
                No gimmicks, no sales pitches, no hidden fees.
              </p>
              <p className="mb-1">Just genuine, personalized instruction.</p>
              <p>
                Learn <span className="font-bold italic">kung fu</span>,{" "}
                <span className="font-bold italic">t'ai chi</span>,{" "}
                <span className="font-bold italic">karate</span>, and{" "}
                <span className="font-bold italic">Daoism</span> in a natural
                outdoor setting.
              </p>
              <div className="flex justify-center pt-2">
                <img
                  src="/hidden-dao-seal.png"
                  alt="Seal Stamp"
                  className="w-[70px] h-auto"
                />
              </div>
            </div>
            <div className="xl:pt-6">
              <button
                type="button"
                className="mt-4 xl:mt-6 mb-8 xl:mb-0 rounded px-6 py-2 xl:py-4 bg-brand-starkAccent text-brand-light text-2xl font-heading hover:opacity-90 transition"
              >
                Sign Up Now!
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT/BOTTOM */}
        <div className="relative flex flex-1 w-full xl:w-1/2 justify-center items-center">
          <div
            ref={yinYangRef}
            className="flex relative justify-center items-center"
          >
            <img
              src="/yin-yang.png"
              alt="Yin Yang"
              className="absolute inset-0 w-full h-full object-contain animate-[spin_180s_linear_infinite] z-0"
            />

            {/* <img
            ref={cloud1Ref}
            src="/cloud-1.png"
            alt="Cloud 1"
            className="absolute top-[25%] left-[0%] w-[60%] z-20"
          />
          <img
            ref={cloud2Ref}
            src="/cloud-2.png"
            alt="Cloud 2"
            className="absolute top-[45%] right-[-5%] w-[60%] z-20"
          />
          <img
            ref={cloud3Ref}
            src="/cloud-3.png"
            alt="Cloud 3"
            className="absolute bottom-[25%] left-[10%] w-[60%] z-20"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-[125%] -translate-y-[50%] z-10 [writing-mode:vertical-rl] font-chinese bg-gradient-to-t from-[#3c3c3c] to-[#674d41] bg-clip-text text-transparent text-[450%] md:text-[575%] lg:text-[700%]">
            隱道
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-[580%] -translate-y-[50%] z-10 [writing-mode:vertical-rl] font-chinese text-[#251a18] text-[250%]">
            道隱無名
          </div>

          <div className="absolute top-1/2 left-1/2  -translate-x-[-420%] -translate-y-[190%] z-10 [writing-mode:vertical-rl] font-chinese text-[#251a18] text-[250%]">
            隱道宗門
          </div> */}
          </div>
        </div>
      </div>
    </Section>
  );
}
