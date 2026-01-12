import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/layout/Layout";
import { Badge } from "../../components/ui/badge";
import { PackageCard } from "../../components/PackageCard";
import { fetchPackages } from "../../services/packageApi";

export function Pricing() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadPackages = async () => {
            try {
                const data = await fetchPackages();

                // ✅ Ensure data is an array
                if (isMounted && Array.isArray(data)) {
                    setPackages(data);
                } else if (isMounted) {
                    throw new Error("Invalid package data received");
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Something went wrong");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadPackages();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Layout>
            {loading && (
                <section className="py-20 text-center">
                    <p>Loading packages...</p>
                </section>
            )}

            {!loading && error && (
                <section className="py-20 text-center text-red-500">
                    <p>{error}</p>
                </section>
            )}

            {!loading && !error && (
                <>
                    {/* Page Header */}
                    <section className="bg-primary py-20">
                        <div className="container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
                                    Pricing Plans
                                </h1>
                                <p className="text-gray-100 max-w-2xl mx-auto text-lg">
                                    Expert advice, tips, and guides to help you navigate your doctoral journey successfully.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Packages */}
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
                                    <PackageCard
                                        key={pkg._id ?? index}
                                        pkg={pkg}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </Layout>
    );
}
