import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-brand-primary">
        Privacy Policy
      </h1>
      <p className="mb-4 text-brand-primary">
        Effective Date: September 23, 2025
      </p>
      <p className="mb-4 text-brand-primary">
        Hidden Dao Martial Arts (“we,” “our,” or “us”) respects your privacy.
        This Privacy Policy explains how we handle information collected through
        our website.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Information We Collect
      </h2>
      <p className="mb-4 text-brand-primary">
        When you use our “Email Us” contact form, we receive the information you
        provide (such as your name, email address, and message).
      </p>
      <p className="mb-4 text-brand-primary">
        Our site is hosted on Cloudflare Pages. Like most hosting services, it
        may collect standard technical information (such as IP addresses,
        browser type, and access times) for security and performance purposes.
        We do not control their systems, but they are a trusted provider.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        How We Use Information
      </h2>
      <p className="mb-4 text-brand-primary">To respond to your inquiries.</p>
      <p className="mb-4 text-brand-primary">
        To maintain and improve our website.
      </p>
      <p className="mb-4 text-brand-primary">
        We do not sell, rent, or share your personal information with third
        parties, except as necessary to operate our site (e.g., FormSpree for
        handling contact form submissions).
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Children's Privacy
      </h2>
      <p className="mb-4 text-brand-primary">
        Our website is not directed to children under 13, and we do not
        knowingly collect information from them.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Your Rights
      </h2>
      <p className="mb-4 text-brand-primary">
        If you contact us, you may request that we update or delete your
        personal information.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Cookies and Tracking
      </h2>
      <p className="mb-4 text-brand-primary">
        We do not intentionally use cookies or tracking tools. However, our
        hosting or third-party providers (such as Cloudflare) may use basic
        analytics or security cookies. You may disable cookies in your browser
        settings.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Cookies and Hosting Services
      </h2>
      <p className="mb-4 text-brand-primary">
        Our website is hosted on Cloudflare Pages, which may use cookies or
        similar technologies to provide essential security, performance, and
        analytics functions. Examples include:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li className="text-brand-primary">
          Security cookies to help detect malicious activity.
        </li>
        <li className="text-brand-primary">
          Performance cookies to improve loading times and reliability.
        </li>
        <li className="text-brand-primary">
          Analytics cookies that may provide anonymous statistics about site
          traffic.
        </li>
      </ul>
      <p className="mb-4 text-brand-primary">
        We do not control Cloudflare’s cookie settings. For details, please
        review{" "}
        <a
          href="https://www.cloudflare.com/cookie-policy"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Cloudflare’s cookie policy
        </a>
        .
      </p>
      <p className="mb-4 text-brand-primary">
        You may disable cookies in your browser, but some functions of the site
        may not work properly.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Changes to This Policy
      </h2>
      <p className="mb-4 text-brand-primary">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
      </p>
      <p className="mb-4 text-brand-primary">
        Updates will be posted on this page with a revised "Effective Date."
      </p>
      <p className="mb-4 text-brand-primary">
        We encourage you to review this page periodically.
      </p>
      <p className="mb-4 text-brand-primary">
        Your continued use of the site after changes indicates acceptance of the
        updated policy.
      </p>

      <h2 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">
        Contact Us
      </h2>
      <p className="mb-4 text-brand-primary">
        For questions about this Privacy Policy, contact us using the form on
        our website.
      </p>
    </motion.div>
  );
}
