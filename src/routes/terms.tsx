import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        By using our website, you agree to these Terms of Service. Please read
        them carefully.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Services</h2>
      <p className="mb-4">
        You agree to use our services lawfully and in compliance with all
        applicable regulations.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for damages arising from use of our services except
        where required by law.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>
      <p>
        We may update these terms at any time. Continued use of our services
        means you accept the changes.
      </p>
    </motion.div>
  )
}