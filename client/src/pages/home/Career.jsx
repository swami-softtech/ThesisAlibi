import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Upload } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const jobs = [
  {
    id: 1,
    title: "Research Associate",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Assist doctoral scholars with literature review, data analysis, and thesis writing. Requires strong academic background and research experience.",
    requirements: [
      "Master's or PhD in relevant field",
      "2+ years research experience",
      "Strong academic writing skills",
      "Familiarity with statistical tools",
    ],
  },
  {
    id: 2,
    title: "PhD Mentor",
    location: "Remote",
    type: "Part-time / Freelance",
    description: "Guide and mentor doctoral students through their research journey. Provide expert advice on methodology, publication, and thesis defense.",
    requirements: [
      "PhD in any discipline",
      "5+ years post-doctoral experience",
      "Published research papers",
      "Excellent communication skills",
    ],
  },
  {
    id: 3,
    title: "Academic Writer",
    location: "Remote",
    type: "Full-time",
    description: "Create high-quality academic content, research proposals, and thesis chapters while maintaining ethical standards and originality.",
    requirements: [
      "Master's degree minimum",
      "Proven academic writing portfolio",
      "Knowledge of APA/MLA/Harvard citation",
      "Strong research skills",
    ],
  },
];

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverMessage: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = (jobTitle) => {
    setSelectedJob(jobs.find(j => j.title === jobTitle)?.id || null);
    setFormData({ ...formData, position: jobTitle });
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    setFormData({ fullName: "", email: "", phone: "", position: "", coverMessage: "" });
    setSelectedJob(null);
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
              Career Opportunities
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Join our team of experts and help shape the future of doctoral research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-4">Current Openings</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Open Positions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="feature" className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-gold-dark" />
                      </div>
                      <Badge variant="navy">{job.type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="mb-6">
                      <p className="text-sm font-semibold mb-2">Requirements:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gold">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="gold"
                      className="mt-auto"
                      onClick={() => handleApply(job.title)}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="gold" className="mb-4">Join Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Apply Now
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below to submit your application.
              </p>
            </motion.div>

            <Card variant="elevated">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position Applied For *</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Select or enter position"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume *</Label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your resume or <span className="text-gold">browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverMessage">Cover Message</Label>
                    {/* <Textarea
                      id="coverMessage"
                      name="coverMessage"
                      value={formData.coverMessage}
                      onChange={handleInputChange}
                      placeholder="Tell us why you'd be a great fit..."
                      rows={5}
                    /> */}
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Career;
