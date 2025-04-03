
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderDanush = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/about" className="inline-flex items-center text-virtus-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About
          </Link>
          
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto bg-virtus-primary/10 rounded-full flex items-center justify-center mb-6">
              <div className="text-3xl font-bold text-virtus-primary">DK</div>
            </div>
            <h1 className="heading-lg text-gray-900 mb-2">Danush Krishna</h1>
            <p className="text-xl text-virtus-primary font-medium mb-6">Founder</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Danush Krishna is the financial architect behind VirtusCo's sustainable growth and operational stability. As the Chief Financial Officer and Co-Founder, Danush brings strategic financial insight and business acumen to the company's leadership team.
            </p>
            
            <h2>Financial Leadership</h2>
            <p>
              With a background in finance and venture capital, Danush has developed a deep understanding of the unique financial challenges and opportunities in the technology sector. Prior to co-founding VirtusCo, he worked with several successful startups, helping them navigate funding rounds and establish sustainable business models.
            </p>
            
            <h2>Investment Strategy</h2>
            <p>
              At VirtusCo, Danush has been instrumental in securing the capital needed to fuel the company's growth while maintaining strategic independence. His approach to investor relations emphasizes transparency, realistic projections, and a clear vision for long-term value creation.
            </p>
            <p>
              This measured approach has attracted investors who share VirtusCo's vision for democratizing robotics technology and are committed to supporting the company's long-term goals rather than seeking quick returns.
            </p>
            
            <h2>Pricing Innovation</h2>
            <p>
              One of Danush's most significant contributions to VirtusCo has been the development of innovative pricing models that make advanced robotics solutions accessible to a broader range of customers. These include subscription-based options, flexible leasing arrangements, and outcome-based pricing structures.
            </p>
            <p>
              These alternatives to traditional high-capital-expenditure purchases have been particularly attractive to small and medium-sized businesses, enabling VirtusCo to reach markets that were previously underserved by robotics providers.
            </p>
            
            <h2>Sustainable Growth Vision</h2>
            <p>
              Looking forward, Danush is focused on balancing VirtusCo's ambitious growth targets with financial sustainability. He believes that responsible financial management is essential for the company to fulfill its mission over the long term.
            </p>
            <p>
              To this end, he continues to refine VirtusCo's financial strategy, exploring new revenue streams and operational efficiencies while ensuring that the company maintains the financial flexibility to respond to emerging opportunities and challenges in the rapidly evolving robotics market.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FounderDanush;
