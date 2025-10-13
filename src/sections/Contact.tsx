import { Section } from "@/sections/_Section";
import { GoogleMap } from "@/components/GoogleMap";
import { LuInstagram } from "react-icons/lu";
import { ImYoutube } from "react-icons/im";
import { MdFacebook } from "react-icons/md";
import { BusinessHours } from "@/components/BusinessHours";
import { EmailUs } from "@/components/EmailUs";
import { LayoutManager } from "@/components/LayoutManager";

export default function Contact() {
  const hours = [
    { day: "Monday", time: "6:00 PM – 8:00 PM" },
    { day: "Tuesday", time: "Closed" },
    { day: "Wednesday", time: "6:00 PM – 8:00 PM" },
    { day: "Thursday", time: "Closed" },
    { day: "Friday", time: "Closed" },
    { day: "Saturday", time: "9:00 AM – 11:00 AM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <Section id="contact" title="Contact" subTitle="Contact Us Anytime">
      <LayoutManager
        layout="rightSpanLeftSplit"
        rowTemplate="topSmall"
        colTemplate="equal"
        height="h-[700px]"
        gap={4}
        slots={{
          slot1: <BusinessHours hours={hours} title="Class Times" hideClosed />,
          slot2: (
            <GoogleMap
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6877.888289372231!2d-97.84227286850981!3d30.466020121569095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b327adb4161cf%3A0xfedb5924ba4fac76!2s1900%20Dagama%20Dr%2C%20Cedar%20Park%2C%20TX%2078613!5e0!3m2!1sen!2sus!4v1757874481160!5m2!1sen!2sus"
              locationName="Hidden Dao Martial Arts"
            />
          ),
          slot3: <EmailUs />,
        }}
      />

      <div className="mt-6 flex gap-4 justify-center text-4xl">
        <a
          className="text-logo-facebook hover:text-logo-facebook/80"
          href="https://facebook.com/yourpage"
        >
          <MdFacebook />
        </a>
        <a
          className="text-logo-instagram hover:text-logo-instagram/80"
          href="https://instagram.com/yourpage"
        >
          <LuInstagram />
        </a>
        <a
          className="text-logo-youtube hover:text-logo-youtube/80"
          href="https://youtube.com/@yourchannel"
        >
          <ImYoutube />
        </a>
      </div>
    </Section>
  );
}
