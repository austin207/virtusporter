
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Scale, AlertTriangle } from "lucide-react";
import useScrollToTop from "@/hooks/useScrollToTop";

const TermsOfService = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-8 w-8 text-virtus-red" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <div className="text-gray-500 text-sm mb-8">
            Last updated: April 8, 2025
          </div>
          
          <section className="prose prose-gray max-w-none">
            <p className="text-lg">
              These Terms of Service ("Terms") govern your access to and use of VirtusCo's website, 
              products, services, and applications (collectively, the "Services"). By accessing or 
              using our Services, you agree to be bound by these Terms.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 my-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500 h-6 w-6" />
                <h2 className="text-xl font-semibold m-0">Important Notice</h2>
              </div>
              <p className="text-gray-600">
                By accessing or using our Services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms. If you do not agree to these Terms, please do 
                not access or use our Services.
              </p>
            </div>

            <h2 className="text-xl font-bold mt-10 mb-5">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Services, you agree to these Terms and our Privacy Policy, which is incorporated by reference.
              We may update these Terms from time to time. If we make significant changes, we will provide notice, such as by sending an 
              email or displaying a notice within our Services.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">2. Using Our Services</h2>
            <p>
              You must follow any policies made available to you within the Services. You may not misuse our Services. We may suspend 
              or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
            </p>
            <p>
              Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access.
              You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">3. Your Account</h2>
            <p>
              You may need to create an account to use some of our Services. You are responsible for safeguarding the password 
              that you use to access the Services and for any activities or actions under your account.
            </p>
            <p>
              We encourage you to use a strong password (using a combination of upper and lower case letters, 
              numbers, and symbols) with your account.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">4. Privacy and Copyright Protection</h2>
            <p>
              Our <a href="/privacy-policy" className="text-red-500 hover:text-red-600">Privacy Policy</a> explains how we treat your personal data and protect your privacy when you use our Services.
              By using our Services, you agree that we can use such data in accordance with our Privacy Policy.
            </p>
            <p>
              We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to applicable laws.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">5. Modifying and Terminating our Services</h2>
            <p>
              We are constantly changing and improving our Services. We may add or remove functionalities or features, 
              and we may suspend or stop a Service altogether.
            </p>
            <p>
              You can stop using our Services at any time. We may also stop providing Services to you, or add or 
              create new limits to our Services at any time.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">6. Liability for our Services</h2>
            <p>
              TO THE EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              TO THE EXTENT PERMITTED BY LAW, VIRTUSCO WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, CONSEQUENTIAL, 
              INCIDENTAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, OR DATA) ARISING OUT OF OR RELATING 
              TO THESE TERMS OR THE SERVICES, HOWEVER CAUSED, WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), 
              OR OTHERWISE.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">7. Business uses of our Services</h2>
            <p>
              If you are using our Services on behalf of a business, that business accepts these terms. 
              It will hold harmless and indemnify VirtusCo and its affiliates, officers, agents, and 
              employees from any claim, suit or action arising from or related to the use of the Services.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">8. About these Terms</h2>
            <p>
              We may modify these Terms to, for example, reflect changes to the law or changes to our Services.
              You should look at the Terms regularly. We'll post notice of modifications to these Terms on this page.
            </p>
            <p>
              If you do not agree to the modified Terms, you should discontinue your use of the Services.
            </p>

            <h2 className="text-xl font-bold mt-10 mb-5">9. Contact Information</h2>
            <p>
              If you have any questions about these Terms or our Services, please contact us at:
            </p>
            <address className="not-italic mt-3">
              <div className="font-semibold">VirtusCo, Ltd.</div>
              <div>Email: legal@virtusco.in</div>
              <div>Address: <p className="text-gray-600">
                          VirtusCo Headquarters<br />
                          100 Tripunithara<br />
                          Kochi, Kerala 682301<br />
                          India
                        </p></div>
            </address>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
