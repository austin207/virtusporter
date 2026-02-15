
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, FileText, Users } from "lucide-react";
import useScrollToTop from "@/hooks/useScrollToTop";

const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5f5f7] mb-6">
              <Shield className="h-7 w-7 text-[#1d1d1f]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.03em' }}>Privacy Policy</h1>
            <p className="text-[#86868b] text-sm">Last updated: April 8, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 lg:pb-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-[#1d1d1f] leading-relaxed mb-12">
              At VirtusCo, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <div className="bg-[#f5f5f7] p-8 rounded-2xl mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Lock className="text-[#1d1d1f] h-5 w-5" />
                <h2 className="text-xl font-semibold text-[#1d1d1f] m-0">Information We Collect</h2>
              </div>
              <p className="text-[#86868b] text-sm leading-relaxed mb-5">
                We collect information that you provide directly to us when you register for an account,
                contact us, or participate in any interactive features of our services. This may include:
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Personal Information', desc: 'Name, email address, and contact information.' },
                  { label: 'Account Information', desc: 'Username, password, and profile details.' },
                  { label: 'Usage Data', desc: 'Information about how you use our website and services.' },
                  { label: 'Device Information', desc: 'Information about your computer, browser, IP address, and other technical data.' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#3c3c43]"><span className="font-medium text-[#1d1d1f]">{item.label}</span>: {item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-[#1d1d1f] h-5 w-5" />
                <h2 className="text-xl font-semibold text-[#1d1d1f]">How We Use Your Information</h2>
              </div>
              <p className="text-[#86868b] text-sm leading-relaxed mb-4">We may use the information we collect for various purposes, including:</p>
              <ul className="space-y-2">
                {[
                  'Providing, maintaining, and improving our services',
                  'Processing transactions and sending related information',
                  'Sending administrative messages, updates, and security alerts',
                  'Responding to your comments, questions, and requests',
                  'Monitoring and analyzing trends, usage, and activities',
                  'Personalizing and improving your experience on our website',
                  'Complying with applicable laws, regulations, and legal processes',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#3c3c43]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#86868b] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Users className="text-[#1d1d1f] h-5 w-5" />
                <h2 className="text-xl font-semibold text-[#1d1d1f]">Sharing Your Information</h2>
              </div>
              <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                VirtusCo does not sell, trade, or otherwise transfer your personally identifiable information to outside
                parties except as described in this Privacy Policy. We may share information with:
              </p>
              <ul className="space-y-2">
                {[
                  'Service providers who perform services on our behalf',
                  'Business partners with whom we jointly offer products or services',
                  'Law enforcement or other governmental entities as required by law',
                  'Other parties in connection with a company transaction, such as a merger, sale of company assets, or bankruptcy',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#3c3c43]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#86868b] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#d2d2d7] pt-10 mb-12">
              <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">Security</h2>
              <p className="text-[#86868b] text-sm leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information.
                However, no method of transmission over the Internet or electronic storage is completely secure,
                and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">Your Rights</h2>
              <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="space-y-2">
                {[
                  'Access to personal information we hold about you',
                  'Correction of inaccurate or incomplete information',
                  'Deletion of your personal information',
                  'Restriction or objection to our use of your information',
                  'Portability of your information',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#3c3c43]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#86868b] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[#86868b] text-sm leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">Changes to This Privacy Policy</h2>
              <p className="text-[#86868b] text-sm leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
                "Last Updated" date, and the updated version will be effective as soon as it is accessible. We encourage
                you to review this Privacy Policy frequently to stay informed about how we are protecting your information.
              </p>
            </div>

            <div className="bg-[#f5f5f7] p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">Contact Us</h2>
              <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="text-sm text-[#3c3c43] space-y-1">
                <div className="font-semibold text-[#1d1d1f]">VirtusCo, Ltd.</div>
                <div>Email: privacy@virtusco.in</div>
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

export default PrivacyPolicy;
