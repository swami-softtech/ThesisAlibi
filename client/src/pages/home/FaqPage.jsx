import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { API_URL } from "../../services/api";

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/faqs`);
        setFaqs(res.data.data || []);
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading)
    return <p className="text-center py-24 text-gray-500">Loading...</p>;

  return (
   <Layout>
      {/* Hero (Same as Static Page) */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-secondary"
          >
            Frequently Asked Questions
          </motion.h1>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Answers to common questions about our thesis guidance, research
            process, and services.
          </p>
        </div>
      </section>

      {/* Content Card */}
      <section className="bg-gray-50 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-4">
            {faqs.length === 0 && (
              <p className="text-center text-gray-500">
                No FAQs available at the moment.
              </p>
            )}

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq._id || index}
                  className="border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full flex justify-between items-center text-left px-6 py-5 font-medium text-gray-900 hover:bg-gray-50 transition"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 text-gray-600"
                      >
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: faq.answer,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
