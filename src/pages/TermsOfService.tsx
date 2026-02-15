
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Scale, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

const TermsOfService = () => {
  useScrollToTop();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing or using the Services, you agree to these Terms and our Privacy Policy, which is incorporated by reference. We may update these Terms from time to time. If we make significant changes, we will provide notice, such as by sending an email or displaying a notice within our Services.',
      ],
    },
    {
      title: '2. Using Our Services',
      content: [
        'You must follow any policies made available to you within the Services. You may not misuse our Services. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.',
        'Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law.',
      ],
    },
    {
      title: '3. Your Account',
      content: [
        'You may need to create an account to use some of our Services. You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your account.',
        'We encourage you to use a strong password (using a combination of upper and lower case letters, numbers, and symbols) with your account.',
      ],
    },
    {
      title: '5. Modifying and Terminating our Services',
      content: [
        'We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.',
        'You can stop using our Services at any time. We may also stop providing Services to you, or add or create new limits to our Services at any time.',
      ],
    },
    {
      title: '6. Liability for our Services',
      content: [
        'TO THE EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
        'TO THE EXTENT PERMITTED BY LAW, VIRTUSCO WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, OR DATA) ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES, HOWEVER CAUSED, WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE.',
      ],
    },
    {
      title: '7. Business uses of our Services',
      content: [
        'If you are using our Services on behalf of a business, that business accepts these terms. It will hold harmless and indemnify VirtusCo and its affiliates, officers, agents, and employees from any claim, suit or action arising from or related to the use of the Services.',
      ],
    },
    {
      title: '8. About these Terms',
      content: [
        'We may modify these Terms to, for example, reflect changes to the law or changes to our Services. You should look at the Terms regularly. We\'ll post notice of modifications to these Terms on this page.',
        'If you do not agree to the modified Terms, you should discontinue your use of the Services.',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5f5f7] mb-6">
              <Scale className="h-7 w-7 text-[#1d1d1f]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.03em' }}>Terms of Service</h1>
            <p className="text-[#86868b] text-sm">Last updated: April 8, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 lg:pb-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-[#1d1d1f] leading-relaxed mb-12">
              These Terms of Service ("Terms") govern your access to and use of VirtusCo's website,
              products, services, and applications (collectively, the "Services"). By accessing or
              using our Services, you agree to be bound by these Terms.
            </p>

            <div className="bg-[#f5f5f7] p-8 rounded-2xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-[#86868b] h-5 w-5" />
                <h2 className="text-lg font-semibold text-[#1d1d1f] m-0">Important Notice</h2>
              </div>
              <p className="text-[#86868b] text-sm leading-relaxed">
                By accessing or using our Services, you acknowledge that you have read, understood,
                and agree to be bound by these Terms. If you do not agree to these Terms, please do
                not access or use our Services.
              </p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className={`mb-10 ${index > 0 ? 'pt-10 border-t border-[#f5f5f7]' : ''}`}>
                <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">{section.title}</h2>
                {section.content.map((para, pi) => (
                  <p key={pi} className="text-[#86868b] text-sm leading-relaxed mb-3">{para}</p>
                ))}
              </div>
            ))}

            {/* Privacy section with link */}
            <div className="mb-10 pt-10 border-t border-[#f5f5f7]">
              <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">4. Privacy and Copyright Protection</h2>
              <p className="text-[#86868b] text-sm leading-relaxed mb-3">
                Our <Link to="/privacy-policy" className="text-[#1d1d1f] font-medium hover:underline">Privacy Policy</Link> explains how we treat your personal data and protect your privacy when you use our Services.
                By using our Services, you agree that we can use such data in accordance with our Privacy Policy.
              </p>
              <p className="text-[#86868b] text-sm leading-relaxed">
                We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to applicable laws.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#f5f5f7] p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">9. Contact Information</h2>
              <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                If you have any questions about these Terms or our Services, please contact us at:
              </p>
              <div className="text-sm text-[#3c3c43] space-y-1">
                <div className="font-semibold text-[#1d1d1f]">VirtusCo, Ltd.</div>
                <div>Email: legal@virtusco.in</div>
                <div className="text-[#86868b] mt-2">
                  VirtusCo Headquarters<br />
                  100 Tripunithara<br />
                  Kochi, Kerala 682301<br />
                  India
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
