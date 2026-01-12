import { HeroSection } from "../../components/home/HomeSection";
import { LatestBlogsSection } from "../../components/home/LatestBlogsSection";
import { PackagesSnapshot } from "../../components/home/PackagesSnapshot";
// import { TestimonialsSection } from "../../components/home/TestimonialsSection";
import { ThesisJourneyOverview } from "../../components/home/ThesisJourneyOverview";
import { WhyChooseUsSection } from "../../components/home/WhyChooseUsSection";
import { Layout } from "../../components/layout/Layout";


const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyChooseUsSection />
      <LatestBlogsSection />
      <ThesisJourneyOverview />
      <PackagesSnapshot />
      {/* <TestimonialsSection />       */}
    </Layout>
  );
};

export default Home;
