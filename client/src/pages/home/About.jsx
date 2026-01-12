import { Layout } from "../../components/layout/Layout";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { motion } from "motion/react";
import {
  Target,
  Eye,
  Shield,
  Award,
  Users,
  GraduationCap,
  Building,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAboutSections } from "../../services/aboutApi";

const achievements = [
  { icon: GraduationCap, value: "100+", label: "PGs Guided" },
  { icon: Building, value: "100%", label: "On-Time Deliveries" },
  { icon: Users, value: "100%", label: "Success Rate" },
];

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await getAboutSections();
        setAbout(data?.data?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch about section", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-center py-20 text-gray-500">Loading...</p>
      </Layout>
    );
  }

  if (!about) {
    return (
      <Layout>
        <p className="text-center py-20 text-red-500">
          Failed to load About section.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
              About Us
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Empowering doctoral scholars with expert guidance since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-4">
                About Us
              </Badge>

              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {about.title}
              </h2>

              <div className="text-gray-600 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="p-6 text-center">
                <Target className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">{about.isMission}</p>
              </Card>

              <Card className="p-6 text-center">
                <Eye className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Our Vision</h3>
                <p className="text-sm text-gray-600">{about.isVision}</p>
              </Card>

              <Card className="p-6 text-center">
                <Shield className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Ethics</h3>
                <p className="text-sm text-gray-600">{about.ethics}</p>
              </Card>

              <Card className="p-6 text-center">
                <Award className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">{about.excellence}</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-4">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Achievements & Milestones
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary mb-4">
                  <item.icon className="h-8 w-8 text-gold" />
                </div>
                <p className="text-4xl font-serif font-bold text-white mb-2">
                  {item.value}
                </p>
                <p className="text-white/70">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
