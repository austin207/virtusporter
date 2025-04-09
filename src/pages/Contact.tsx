
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { XIcon } from "@/components/icons/x-icon"

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="heading-lg text-gray-900 mb-6">
                Get in <span className="text-virtus-primary">Touch</span>
              </h1>
              <p className="subtitle text-gray-600 mb-8">
                Have questions about our autonomous porter robots or interested in a demo? Our team is here to help. Reach out to us and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Contact Information */}
              <div>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600 mb-1">General Inquiries:</p>
                        <a href="mailto:info@virtusco.com" className="text-virtus-primary hover:underline">virtusco.tech@gmail.com</a>
                        <p className="text-gray-600 mb-1 mt-2">Investor Relations:</p>
                        <a href="mailto:investors@virtusco.com" className="text-virtus-primary hover:underline">investors@virtusco.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600 mb-1">Sales & Support:</p>
                        <a href="tel:+919876543210" className="text-virtus-primary hover:underline">+91 90617 54652</a>
                        <p className="text-gray-600 mb-1 mt-2">Corporate Office:</p>
                        <a href="tel:+919876543211" className="text-virtus-primary hover:underline">+91 99473 32462</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-virtus-primary/10 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-virtus-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600">
                          VirtusCo Headquarters<br />
                          100 Tripunithara<br />
                          Kochi, Kerala 682301<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map or Office Image */}
                <div className="bg-gray-100 rounded-xl overflow-hidden h-64 md:h-80">
                  <div className="w-full h-full bg-gradient-to-r from-virtus-primary/10 to-virtus-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-virtus-primary mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="text-gray-600">Interactive Map Coming Soon</div>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://x.com/VirtuscoTech" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-virtus-primary hover:text-white transition-colors">
                    <XIcon className="h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com/company/virtusco/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-virtus-primary hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/virtuscotech/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-virtus-primary hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={cn(
                          "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                          formData.name ? "border-gray-300" : "border-gray-200"
                        )}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={cn(
                          "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                          formData.email ? "border-gray-300" : "border-gray-200"
                        )}
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                          formData.phone ? "border-gray-300" : "border-gray-200"
                        )}
                        placeholder="+91 123 456 7890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={cn(
                          "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                          formData.company ? "border-gray-300" : "border-gray-200"
                        )}
                        placeholder="Airport Authority"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request a Demo</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="investor">Investor Relations</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={cn(
                        "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                        formData.subject ? "border-gray-300" : "border-gray-200"
                      )}
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={cn(
                        "block w-full px-4 py-3 rounded-lg border bg-white/50 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors",
                        formData.message ? "border-gray-300" : "border-gray-200"
                      )}
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-virtus-primary border-gray-300 rounded focus:ring-virtus-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600">
                        I agree to the{' '}
                        <a href="#" className="text-virtus-primary hover:underline">privacy policy</a>
                        {' '}and consent to being contacted regarding my inquiry.
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full py-3" 
                      size="lg"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-md text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="subtitle text-gray-600">
                Find answers to common questions about our autonomous porter robots and services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I request a demonstration?</h3>
                <p className="text-gray-600">
                  You can request a demonstration by filling out our contact form, specifying "Request a Demo" as the inquiry type. Our team will reach out to schedule a personalized demonstration at your facility or via a virtual session.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is the deployment timeline?</h3>
                <p className="text-gray-600">
                  Typical deployment timelines range from 3-6 months, depending on the scale and specific requirements. This includes site assessment, customization, installation, staff training, and initial operational support.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How does the revenue model work?</h3>
                <p className="text-gray-600">
                  Our hybrid revenue model combines profit-sharing from porter services with fixed maintenance fees. We also offer opportunities for additional revenue through digital advertising and data services. Detailed financials are available upon request.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What maintenance and support do you provide?</h3>
                <p className="text-gray-600">
                  We provide comprehensive maintenance and 24/7 technical support as part of our service agreement. This includes regular preventive maintenance, software updates, emergency repairs, and continuous monitoring through our advanced diagnostics system.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do the autonomous porter robots navigate airports?</h3>
                <p className="text-gray-600">
                  Our robots utilize a combination of LiDAR, computer vision, and AI algorithms to create detailed maps of the environment and navigate autonomously. They can track users, avoid obstacles, and adapt to changing conditions in real-time.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Is training provided for airport staff?</h3>
                <p className="text-gray-600">
                  Yes, comprehensive training is included in our deployment process. We provide hands-on training for operators, maintenance personnel, and customer service staff to ensure smooth operation and integration with existing airport services.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions? Our team is ready to help.</p>
              <Button to="#" variant="outline" size="lg">View Full FAQ</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
