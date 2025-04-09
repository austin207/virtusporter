
import React, { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, FileText, CheckCircle2, Users } from "lucide-react";
import useScrollToTop from "@/hooks/useScrollToTop";

const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-virtus-red" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          
          <div className="text-gray-500 text-sm mb-8">
            Last updated: April 8, 2025
          </div>

          <section className="prose prose-gray max-w-none mb-12">
            <p className="text-lg">
              At VirtusCo, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 my-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-virtus-red h-6 w-6" />
                <h2 className="text-xl font-semibold m-0">Information We Collect</h2>
              </div>
              <p>
                We collect information that you provide directly to us when you register for an account,
                contact us, or participate in any interactive features of our services. This may include:
              </p>
              <ul className="mt-4">
                <li className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Personal Information</strong>: Name, email address, and contact information.</span>
                </li>
                <li className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Account Information</strong>: Username, password, and profile details.</span>
                </li>
                <li className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Usage Data</strong>: Information about how you use our website and services.</span>
                </li>
                <li className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Device Information</strong>: Information about your computer, browser, IP address, and other technical data.</span>
                </li>
              </ul>
            </div>

            <div className="my-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-virtus-red h-6 w-6" />
                <h2 className="text-xl font-semibold">How We Use Your Information</h2>
              </div>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending administrative messages, updates, and security alerts</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Personalizing and improving your experience on our website</li>
                <li>Complying with applicable laws, regulations, and legal processes</li>
              </ul>
            </div>

            <div className="my-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-virtus-red h-6 w-6" />
                <h2 className="text-xl font-semibold">Sharing Your Information</h2>
              </div>
              <p>
                VirtusCo does not sell, trade, or otherwise transfer your personally identifiable information to outside
                parties except as described in this Privacy Policy. We may share information with:
              </p>
              <ul>
                <li>Service providers who perform services on our behalf</li>
                <li>Business partners with whom we jointly offer products or services</li>
                <li>Law enforcement or other governmental entities as required by law</li>
                <li>Other parties in connection with a company transaction, such as a merger, sale of company assets, or bankruptcy</li>
              </ul>
            </div>

            <div className="my-8">
              <h2 className="text-xl font-semibold">Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information.
                However, no method of transmission over the Internet or electronic storage is completely secure,
                and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="my-8">
              <h2 className="text-xl font-semibold">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li>Access to personal information we hold about you</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to our use of your information</li>
                <li>Portability of your information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
              </p>
            </div>

            <div className="my-8">
              <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
                "Last Updated" date, and the updated version will be effective as soon as it is accessible. We encourage
                you to review this Privacy Policy frequently to stay informed about how we are protecting your information.
              </p>
            </div>

            <div className="my-8">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <address className="not-italic mt-3">
                <div className="font-semibold">VirtusCo, Ltd.</div>
                <div>Email: privacy@virtusco.in</div>
                <div>Address: <p className="text-gray-600">
                          VirtusCo Headquarters<br />
                          100 Tripunithara<br />
                          Kochi, Kerala 682301<br />
                          India
                        </p></div>
              </address>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
