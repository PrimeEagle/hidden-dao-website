import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-brand-primary">
        Terms of Service
      </h1>
      <p className="mb-4 text-brand-primary">Effective Date: September 23, 2025</p>
      
      <p className="mb-4 text-brand-primary">By using our website, you agree to
      these Terms of Service.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Use of Website
      </h2>
      <p className="mb-4 text-brand-primary">This site is provided for informational purposes only. You may not copy,
      reproduce, or distribute any content (including text, images, class
      descriptions, or Daoist writings) without our written permission.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Intellectual Property
      </h2>
      <p className="mb-4 text-brand-primary">All content on this site is the property of Hidden Dao Martial Arts unless
      otherwise noted. Unauthorized use is prohibited.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        No Medical or Training Advice
      </h2>
      <p className="mb-4 text-brand-primary">This website does not provide medical, health, or fitness advice. Martial
      arts training carries inherent risks. For actual class participation,
      students must sign separate enrollment and waiver forms offline.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        External Links
      </h2>
      <p className="mb-4 text-brand-primary">Our site may contain links to third-party services (e.g., Zoom,
      FormSpree). We are not responsible for their content or privacy practices.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Disclaimer of Liability
      </h2>
      <p className="mb-4 text-brand-primary">We are not liable for damages arising from use of this website, including
      reliance on information provided here.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Governing Law
      </h2>
      <p className="mb-4 text-brand-primary">These terms are governed by the laws of the State of Texas, USA. Any
      disputes shall be resolved in the courts located in Williamson County,
      Texas.</p>
      
      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Changes to Terms
      </h2>
      <p className="mb-4 text-brand-primary">We reserve the right to update or modify these Terms of Service at any
      time. Any changes will be effective immediately upon posting to this
      website. The “Effective Date” at the top of this page will indicate the
      most recent revision. By continuing to use the site after changes are
      posted, you agree to the revised terms.</p>
    </motion.div>
  );
}
