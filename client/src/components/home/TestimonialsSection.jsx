import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "../ui/badge";

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "PhD in Management",
    university: "Delhi University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote: "Doctor Research Thesis provided exceptional guidance throughout my doctoral journey. Their expert mentors helped me publish in two Scopus journals before my thesis submission.",
  },
  {
    name: "Dr. Rahul Verma",
    role: "PhD in Computer Science",
    university: "IIT Bombay",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "The structured approach and milestone-based payment system made the entire process stress-free. I completed my PhD in just 3.5 years with their support.",
  },
  {
    name: "Dr. Anita Patel",
    role: "PhD in Economics",
    university: "Mumbai University",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "From topic selection to viva preparation, their end-to-end support was invaluable. The dedicated mentor was always available whenever I needed guidance.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="gold" className={`mb-2`}> Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            What Our Scholars Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Join hundreds of successful doctoral scholars who achieved their academic dreams with our guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-secondary mb-4" />
                  <p className="text-white/90 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <p className="font-serif font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-white/80">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-secondary">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
