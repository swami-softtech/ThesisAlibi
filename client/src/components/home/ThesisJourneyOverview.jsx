import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";

const stages = [
  "Registration & Topic Finalisation",
  "Synopsis Development & Approval",
  "Data Handling & Statistical Analysis",
  "Final Thesis Report Creation",
];

export function ThesisJourneyOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="default" className={`px-2 py-1.5`}>Your Research Roadmap</Badge>

            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Complete Thesis Journey Support
            </h2>
            <p className="text-gray-800 mb-8 leading-relaxed">
              From Your First Step Of Admission Confirmation To The Final Triumph Of Your Viva Voce,
              We Provide Structured, Milestone-Based Guidance Throughout Your Entire Doctoral Journey.
            </p>
            <Link to="/workflow">
              <Button className="bg-secondary" size="lg">
                View Full Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl shadow-lg p-8 border-0 bg-white">
              <h3 className="font-serif text-xl font-semibold mb-6">
                4-Stage Research Framework
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-200 hover:bg-secondary/30 transition-colors"
                  >
                    <Badge variant="gold">{index + 1}</Badge>

                    <span className="text-sm  font-semibold">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/30 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gray-500 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
