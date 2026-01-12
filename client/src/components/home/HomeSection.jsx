import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import heroBg from "../../assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Academic library background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            <span className="block">
              Expert Thesis{" "}
              <span className="text-secondary">
                Guidance
              </span>
            </span>
            <span className="block">
              For{" "}
              <span className="text-secondary">
                MD / MS / DNB Residents
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl leading-relaxed"
          >
            Submit A Flawless Dissertation With Premium Support From Experienced
            Medical Academic Experts.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/workflow">
              <Button
                variant="hero"
                size="xl"
                className="bg-secondary hover:bg-secondary/90"
              >
                Start Your Thesis Journey
              </Button>
            </Link>

            <Link to="/register">
              <Button
                size="xl"
                className="border border-white text-white bg-transparent hover:bg-white hover:text-primary"
              >
                Register/Login
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-10 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { value: "500+", label: "Researchers Guided" },
              { value: "50+", label: "Universities" },
              { value: "100%", label: "On Time Delivaries" },
              { value: "100%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-serif font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-sm text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
