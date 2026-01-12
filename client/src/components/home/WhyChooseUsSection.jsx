import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Users, BookOpen, Shield, Award } from "lucide-react";
import { Badge } from "../ui/badge";

const features = [
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Guidance From MD PSM Doctors With Decades Of Research Experience Across Diverse Academic Disciplines.",
  },
  {
    icon: BookOpen,
    title: "Data Collection Support",
    description: "Assistance For Data Collection With Data collection Sheets, Google Forms, Excel Sheets, Patients Information Sheets & Informed Consent Form For Seamless Statistical Analysis" 
  },
  {
    icon: Shield,
    title: "Ethical Research Guidance",
    description: "Complete Adherence To Academic Integrity With Original, Plagiarism-Free Research Methodologies.",
  },
  {
    icon: Award,
    title: "End-to-End Thesis Assistance",
    description: "Comprehensive Support From Admission Confirmation To Viva Voce.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="gold">Why Choose Us</Badge>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Your Success Is Our Priority
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We Bring Together Academic Excellence, Ethical Practices, And Personalized Mentorship
            To Guide You Through Your Research Journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="feature" className="h-full">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border-amber-400 mb-5">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
