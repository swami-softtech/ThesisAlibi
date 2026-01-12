import { useState, useRef } from "react";
import { Layout } from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import emailjs from "@emailjs/browser";
import TextArea from "../../components/TextArea";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_ifio43q",
        "template_48jfbca",
        formRef.current,
        "noAldpRF1HbtifYaQ"
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              Contact Us
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Have questions? We're here to help you start your doctoral journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-4">Get in Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                We'd Love to Hear From You
              </h2>

              <div className="space-y-6">
                <Info icon={<MapPin />} title="Visit Us" text="Nashik, Maharashtra, India" />
                <Info
                  icon={<Mail />}
                  title="Email Us"
                  link="mailto:thesisalibi@gmail.com"
                  text="thesisalibi@gmail.com"
                />
                <Info
                  icon={<Phone />}
                  title="Call Us"
                  link="tel:+918468861109"
                  text="+91 84688 61109"
                  sub="Mon–Sat, 9:00 AM – 6:00 PM IST"
                />
                <Info
                  icon={<MessageSquare />}
                  title="WhatsApp"
                  link="https://wa.me/918468861109"
                  text="+91 84688 61109"
                  sub="Quick responses guaranteed"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="elevated">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-semibold mb-6">
                    Send Us a Message
                  </h3>

                  <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                    <Field label="Your Name *">
                      <Input name="name" className="border-gray-300" required />
                    </Field>

                    <Field label="Email Address *">
                      <Input name="email" type="email" className="border-gray-300" required />
                    </Field>

                    <Field label="Subject *">
                      <Input name="subject" className="border-gray-300" required />
                    </Field>

                    <Field label="Message *">
                      <TextArea name="message"  required />
                    </Field>

                    <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                      <Send className="mr-2 h-5 w-5" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* Reusable helpers */
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <Label className="font-semibold">{label}</Label>
    {children}
  </div>
);

const Info = ({ icon, title, text, link, sub }) => (
  <div className="flex items-start gap-4">
    <div className="h-12 w-12 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      {link ? (
        <a href={link} className="text-amber-500 hover:underline">{text}</a>
      ) : (
        <p className="text-gray-600">{text}</p>
      )}
      {sub && <p className="text-sm text-gray-500">{sub}</p>}
    </div>
  </div>
);

export default Contact;
