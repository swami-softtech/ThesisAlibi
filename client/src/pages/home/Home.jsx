import { HeroSection } from "../../components/home/HomeSection";
import { LatestBlogsSection } from "../../components/home/LatestBlogsSection";
import { PackagesSnapshot } from "../../components/home/PackagesSnapshot";
// import { TestimonialsSection } from "../../components/home/TestimonialsSection";
import { ThesisJourneyOverview } from "../../components/home/ThesisJourneyOverview";
import { WhyChooseUsSection } from "../../components/home/WhyChooseUsSection";
import { Layout } from "../../components/layout/Layout";
import SEO from "../../components/SEO";


const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Discover ThesisAlibi, your trusted partner for comprehensive thesis assistance. Get expert guidance, research support, and professional writing services to excel in your academic journey."
        keywords="thesis assistance, academic writing help, dissertation support, research guidance, thesis writing services, academic success"
      />
      <Layout>
        <HeroSection />
        <WhyChooseUsSection />
        <LatestBlogsSection />
        <ThesisJourneyOverview />
        <PackagesSnapshot />
        {/* <TestimonialsSection />       */}
      </Layout>
    </>
  );
};

export default Home;
