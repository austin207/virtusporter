import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Briefcase, Code, Users, Bot, Brain, MessageSquare, Mail, Search } from 'lucide-react';

interface JobPosting {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  icon: React.ReactNode;
}

const Careers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const jobPostings: JobPosting[] = [
    {
      title: "Senior Robotics Engineer",
      location: "Bengaluru, India",
      type: "Full-time",
      department: "Engineering",
      description: "Lead the development of advanced robotics systems, focusing on navigation algorithms, sensor integration, and autonomous behaviors for our product lineup.",
      requirements: [
        "5+ years of experience in robotics engineering",
        "Strong background in ROS development",
        "Experience with navigation systems and SLAM",
        "Proficiency in C++ and Python",
        "Master's or PhD in Robotics, Computer Science, or related field"
      ],
      icon: <Bot className="h-6 w-6" />
    },
    {
      title: "AI/ML Engineer",
      location: "Bengaluru, India",
      type: "Full-time",
      department: "Engineering",
      description: "Develop and implement machine learning algorithms for robotics applications, focusing on computer vision, predictive maintenance, and adaptive behaviors.",
      requirements: [
        "3+ years of experience in AI/ML for robotics",
        "Strong background in computer vision and deep learning",
        "Experience with TensorFlow, PyTorch, or similar frameworks",
        "Understanding of sensor fusion techniques",
        "Bachelor's or Master's in Computer Science, AI, or related field"
      ],
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      department: "Software",
      description: "Design and develop intuitive user interfaces for robot control systems and monitoring dashboards, ensuring excellent user experience and accessibility.",
      requirements: [
        "3+ years of frontend development experience",
        "Proficiency in React, TypeScript, and modern CSS",
        "Experience with data visualization libraries",
        "Understanding of UX/UI principles",
        "Portfolio demonstrating responsive and interactive web applications"
      ],
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Product Manager",
      location: "Bengaluru, India",
      type: "Full-time",
      department: "Product",
      description: "Lead the product development lifecycle for our robotics solutions, working closely with engineering, design, and business teams to deliver customer-focused products.",
      requirements: [
        "4+ years of product management experience",
        "Background in robotics, IoT, or hardware products",
        "Strong analytical and problem-solving skills",
        "Excellent communication and stakeholder management",
        "Experience with agile methodologies"
      ],
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      title: "Customer Success Specialist",
      location: "Bengaluru, India",
      type: "Full-time",
      department: "Operations",
      description: "Ensure successful implementation and adoption of our robotics solutions, providing training, support, and ongoing guidance to customers.",
      requirements: [
        "2+ years in customer success or technical support",
        "Strong technical aptitude and ability to explain complex concepts",
        "Excellent communication and relationship-building skills",
        "Problem-solving ability and attention to detail",
        "Experience in robotics, automation, or technology implementation"
      ],
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  const filteredJobs = activeTab === 'all' 
    ? jobPostings 
    : jobPostings.filter(job => job.department.toLowerCase() === activeTab);

  const culturePoints = [
    {
      title: "Innovation First",
      description: "We encourage bold thinking and creative problem-solving to push the boundaries of what's possible in robotics.",
      icon: <Bot className="h-6 w-6" />
    },
    {
      title: "Collaborative Environment",
      description: "Cross-functional teams work together, sharing knowledge and perspectives to create comprehensive solutions.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's growth through training, conferences, and dedicated time for learning new technologies.",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Impact-Driven",
      description: "Every team member contributes to our mission of transforming industries through innovative robotics solutions.",
      icon: <Briefcase className="h-6 w-6" />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="heading-lg text-gray-900 mb-6">
                Join Our <span className="text-virtus-primary">Innovative</span> Team
              </h1>
              <p className="subtitle text-gray-600 max-w-3xl mx-auto mb-8">
                At VirtusCo, we're building the future of robotics technology. Join our team of passionate engineers, designers, and problem-solvers to create solutions that make a real difference.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button href="#openings" size="lg" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  View Open Positions
                </Button>
                <Button to="/contact" variant="outline" size="lg" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Recruiting
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Our Culture</h2>
              <p className="subtitle text-gray-600">
                We've built a collaborative, innovative environment where talent thrives and ideas become reality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {culturePoints.map((point, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600 text-sm">{point.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Competitive Compensation</h4>
                        <p className="text-sm text-gray-600">Salary packages that recognize your experience and contribution.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Professional Development</h4>
                        <p className="text-sm text-gray-600">Continuous learning opportunities and career growth paths.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Flexible Work Arrangements</h4>
                        <p className="text-sm text-gray-600">Options for remote work and flexible schedules to support work-life balance.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Health & Wellness</h4>
                        <p className="text-sm text-gray-600">Comprehensive health benefits and wellness programs.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Hear From Our Team</h3>
                  <div className="border-l-4 border-virtus-primary/30 pl-4 italic text-gray-600 mb-4">
                    "Working at VirtusCo has been an incredible journey. The team is passionate about pushing the boundaries of robotics, and there's always something new to learn and work on. The collaborative environment makes complex problem-solving both challenging and rewarding."
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mr-3">
                      <span className="text-sm font-bold">RS</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Alwin George Thomas</div>
                      <div className="text-xs text-gray-600">Financial Strategist</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section ref={sectionRef} id="openings" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Open Positions</h2>
              <p className="subtitle text-gray-600">
                Explore our current openings and find the right opportunity for your skills and aspirations.
              </p>
            </div>
            
            {/* Department Filter */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1 bg-white rounded-full shadow-sm">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'all' ? 'bg-virtus-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('all')}
                >
                  All Departments
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'engineering' ? 'bg-virtus-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('engineering')}
                >
                  Engineering
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'software' ? 'bg-virtus-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('software')}
                >
                  Software
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'product' ? 'bg-virtus-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('product')}
                >
                  Product
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === 'operations' ? 'bg-virtus-primary text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => handleTabChange('operations')}
                >
                  Operations
                </button>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 transform ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mr-4">
                        {job.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {job.location}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-virtus-primary/10 text-virtus-primary">
                              {job.type}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-virtus-secondary/10 text-virtus-secondary">
                              {job.department}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="h-5 w-5 text-virtus-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm text-gray-600">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button to="/contact" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No openings found</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    We don't have any open positions in this department at the moment.
                  </p>
                  <Button onClick={() => handleTabChange('all')} variant="outline">View All Departments</Button>
                </div>
              )}
            </div>
            
            {/* Don't see a fit section */}
            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Don't see a position that fits your skills?</h3>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
                We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to VirtusCo's mission.
              </p>
              <Button to="/contact" variant="outline" className="flex items-center gap-2 mx-auto">
                <Mail className="h-4 w-4" />
                Send Spontaneous Application
              </Button>
            </div>
          </div>
        </section>

        {/* Application Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Our Hiring Process</h2>
              <p className="subtitle text-gray-600">
                A transparent and efficient process designed to find the right fit for both candidates and our team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                  <div className="text-lg font-bold">1</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Review</h3>
                <p className="text-gray-600 text-sm">Our recruiting team carefully reviews your application and matches your skills to our requirements.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                  <div className="text-lg font-bold">2</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Interview</h3>
                <p className="text-gray-600 text-sm">A conversation with our recruiting team to discuss your experience, expectations, and cultural fit.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                  <div className="text-lg font-bold">3</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Assessment</h3>
                <p className="text-gray-600 text-sm">A skills evaluation tailored to the role, which may include coding tests, design challenges, or case studies.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-virtus-primary/10 flex items-center justify-center text-virtus-primary mb-4">
                  <div className="text-lg font-bold">4</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Interviews</h3>
                <p className="text-gray-600 text-sm">In-depth discussions with team members and leadership to ensure mutual fit and alignment.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
                Our typical hiring process takes 2-3 weeks from application to offer. We respect your time and provide regular updates throughout the process.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-virtus-primary to-virtus-accent rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-12 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to shape the future of robotics?</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                  Explore our open positions and join a team that's pushing the boundaries of what's possible in robotics technology.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <Button href="#openings" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    View Open Positions
                  </Button>
                  <Button to="/contact"  className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                    Contact Recruiting
                  </Button>
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

export default Careers;
