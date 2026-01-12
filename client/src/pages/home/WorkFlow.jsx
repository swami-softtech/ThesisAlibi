import { Layout } from "../../components/layout/Layout";
import { Badge } from "../../components/ui/badge";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState, useEffect } from "react"; 
import { PackageCard } from "../../components/PackageCard";
import { fetchPackages } from "../../services/packageApi";

const timelineStages = [
  {
    stage: 1,
    title: "Registration & Topic Finalization",
    description: [
      "Student onboarding & profile creation", 
      "Understanding university/NMC guidelines", 
      "Interest-based topic discussion", 
      "Feasibility & scope evaluation,Final thesis title" ,
      "Mentor allocation & timeline planning", "Outcome: Approved thesis topic with a clear execution plan.",
      ],
    position: "left" // Added position property
  },
  {
    stage: 2,
    title: "Synopsis Submission",
    description:
      "Prepare and submit a structured research proposal outlining objectives and methodology.",
    position: "right" // Added position property
  },
  {
    stage: 3,
    title: "Data Collection & Statistical Analysis",
    description:
      "Conduct experiments, collect data, and perform statistical analysis to validate findings.",
    position: "left" // Added position property
  },
  {
    stage: 4,
    title: "Thesis Writing & Final Submission",
    description:
      "Compile results, write the thesis, and submit for evaluation and defense.",
    position: "right" // Added position property
  },
];

const paymentStages = [
  { stage: "Stage 1", description: "Registeration and Topic Finalisation", percentage: 20 },
  { stage: "Stage 2", description: "Synopsis Development Approval", percentage: 30 },
  { stage: "Stage 3", description: "Data Handling and Stactical Analysis", percentage: 20 },
  { stage: "Stage 4", description: "Final Thesis Report Creaction", percentage: 30 },
];


const WorkFlow = () => {
  const [isMobile, setIsMobile] = useState(false);

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
  


  return (
    <Layout>
      {/* Header */}
      <section className="bg-linear-to-r from-primary to-primary/90 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
            Your Thesis Journey
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            A structured, milestone-based approach from admission to doctoral success.
          </p>
        </motion.div>
      </section>

      {/* Timeline - Simplified version */}
      <div className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Vertical center line - hidden on mobile, show on tablet+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-gray-300 to-gray-300 transform -translate-x-1/2"></div>

          {timelineStages.map((item, index) => (
            <div key={item.stage} className="relative mb-12 md:mb-20">
              {/* Mobile Layout - Stacked */}
              {isMobile ? (
                <div className="flex flex-col items-center">
                  {/* Stage Number in Circle */}
                  <motion.div
                    className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="font-bold text-white text-lg">{item.stage}</span>
                  </motion.div>

                  {/* Connecting line between circles on mobile */}
                  {index !== timelineStages.length - 1 && (
                    <motion.div
                      className="absolute top-12 left-1/2 h-12 w-0.5 bg-linear-to-b from-blue-300 to-purple-300 transform -translate-x-1/2"
                      initial={{ height: 0 }}
                      whileInView={{ height: "48px" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    />
                  )}

                  {/* Content Card */}
                  <motion.div
                    className="w-full bg-white p-5 rounded-xl shadow-md border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </div>
              ) : (
                /* Desktop/Tablet Layout - Alternating */
                <div className={`flex items-center ${item.position === 'left' ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Left side content */}
                  {item.position === 'left' && (
                    <div className="w-full md:w-5/12 lg:w-5/12 pr-0 md:pr-8 lg:pr-12 text-left md:text-right">
                      <motion.div
                        className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: -5 }}
                      >
                        <div className="inline-flex md:inline-flex items-center justify-start md:justify-end w-full">
                          <div className="md:mr-4 lg:mr-4">
                            <h3 className="font-bold text-gray-800 text-sm md:text-base lg:text-lg">{item.title}</h3>
                            <p className="text-gray-600 text-xs md:text-sm lg:text-base mt-1">{item.description}</p>
                          </div>
                          <motion.div
                            className="hidden md:flex ml-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 border-2 border-blue-500 items-center justify-center shrink-0"
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className="font-bold text-blue-600 text-sm md:text-base">{item.stage}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Center dot - hidden on mobile */}
                  <div className="hidden md:absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-4 h-4 md:w-6 md:h-6 rounded-full ${index === 1 ? 'bg-purple-500' : 'bg-blue-500'} shadow-lg`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Right side content */}
                  {item.position === 'right' && (
                    <div className="w-full md:w-5/12 lg:w-5/12 pl-0 md:pl-8 lg:pl-12">
                      <motion.div
                        className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start">
                          <motion.div
                            className="hidden md:flex mr-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 border-2 border-purple-500 items-center justify-center shrink-0"
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className="font-bold text-purple-600 text-sm md:text-base">{item.stage}</span>
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm md:text-base lg:text-lg">{item.title}</h3>
                            <p className="text-gray-600 text-xs md:text-sm lg:text-base mt-1">{item.description}</p>
                          </div>
                          {/* Show stage number on mobile for right side */}
                          <div className="md:hidden ml-4">
                            <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center shrink-0">
                              <span className="font-bold text-purple-600 text-sm">{item.stage}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}

              {/* Special Center Card after Stage 2 */}
              {item.stage === 2 && (
                <motion.div
                  className="flex justify-center mt-4 md:mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="w-full md:w-full lg:max-w-md mx-auto bg-linear-to-r from-blue-500 to-purple-500 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg">
                    <div className="bg-white rounded-lg p-4 md:p-5">
                      <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2 flex items-center">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2" />
                        Data Collection
                      </h4>
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base">
                        Data Collection period : up to 1 Year (can be shorter if completed early)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Payments */}
      <section className="py-20 bg-linear-to-b from-background to-gray-50">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-primary hover:bg-secondary/90">Flexible Payments</Badge>
            <h2 className="text-3xl font-serif font-bold text-primary">
              Stepwise Payment Distribution
            </h2>
            <p className="text-muted-foreground mt-4">
              Pay as you progress through each milestone
            </p>
          </div>

          {paymentStages.map((item, index) => (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {item.stage}
                  </Badge>
                  <span className="font-semibold text-primary">{item.description}</span>
                </div>
                <span className="text-2xl font-serif font-bold text-secondary">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-linear-to-r from-secondary to-secondary/80"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-primary hover:bg-secondary/90">
            Choose Your Plan
          </Badge>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Thesis Packages
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Select the package that best fits your research needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default WorkFlow;