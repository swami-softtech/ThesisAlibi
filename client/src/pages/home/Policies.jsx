import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "motion/react";
import { Layout } from "../../components/layout/Layout";
import { API_URL } from "../../services/api";

export default function Policies() {
  const { type } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/pages/${type.toUpperCase()}`
        );
        setPage(res.data.data);
      } catch {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [type]);

  if (loading)
    return <p className="text-center py-24 text-gray-500">Loading...</p>;

  if (!page)
    return <p className="text-center py-24 text-gray-500">Page not found</p>;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-secondary"
          >
            {page.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <article
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
