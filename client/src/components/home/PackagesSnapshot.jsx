import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { PackageCard } from "../PackageCard";
import { fetchPackages } from "../../services/packageApi";

export function PackagesSnapshot() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p>Loading packages...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="gold">Pricing Plans</Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Choose Your Support Package
          </h2>
          <p className="max-w-2xl mx-auto">
            Flexible pricing options designed to meet your research needs at every stage of your doctoral journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg._id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
