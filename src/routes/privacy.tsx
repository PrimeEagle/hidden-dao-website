import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we handle your
        information when you use our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email, and usage
        data to improve our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Information</h2>
      <p className="mb-4">
        Collected data is used to provide services, analyze performance, and
        deliver updates.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p>
        Questions? Email us at{' '}
        <a href="mailto:support@example.com" className="text-blue-600 underline">
          support@example.com
        </a>.
      </p>
    </motion.div>
  )
}