
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  image: string;
  readTime: string;
}

const Blog = () => {
  const [isInView, setIsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'product', name: 'Product Updates' },
    { id: 'industry', name: 'Industry Insights' },
    { id: 'technology', name: 'Technology' },
    { id: 'sustainability', name: 'Sustainability' },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'Introducing the Next Generation Porter Robot',
      excerpt: 'Our latest autonomous porter robot features enhanced payload capacity, improved navigation AI, and a more intuitive user interface.',
      date: 'August 15, 2022',
      author: 'Alwin George Thomas',
      authorRole: 'CTO & Co-Founder',
      category: 'product',
      image: '/placeholder.svg',
      readTime: '5 min read',
    },
    {
      id: 'post-2',
      title: 'The Future of Airport Technology: 2023 Trends',
      excerpt: 'Explore emerging technologies and trends shaping the future of airport operations and passenger experience.',
      date: 'July 28, 2022',
      author: 'Antony Austin',
      authorRole: 'CEO & Co-Founder',
      category: 'industry',
      image: '/placeholder.svg',
      readTime: '8 min read',
    },
    {
      id: 'post-3',
      title: 'How AI is Revolutionizing Autonomous Navigation',
      excerpt: 'Deep dive into the neural network architecture and machine learning techniques powering our autonomous navigation system.',
      date: 'July 12, 2022',
      author: 'Alwin George Thomas',
      authorRole: 'CTO & Co-Founder',
      category: 'technology',
      image: '/placeholder.svg',
      readTime: '12 min read',
    },
    {
      id: 'post-4',
      title: 'Designing for Sustainability in Robotics',
      excerpt: 'Our approach to eco-friendly design, from material selection to energy efficiency and lifecycle management.',
      date: 'June 30, 2022',
      author: 'Allen George Thomas',
      authorRole: 'CDO & Co-Founder',
      category: 'sustainability',
      image: '/placeholder.svg',
      readTime: '7 min read',
    },
    {
      id: 'post-5',
      title: 'Case Study: Chennai Airport Deployment',
      excerpt: 'Results and insights from our successful deployment of 50 porter robots at Chennai International Airport.',
      date: 'June 15, 2022',
      author: 'A.Azeem Kouther',
      authorRole: 'COO & Co-Founder',
      category: 'product',
      image: '/placeholder.svg',
      readTime: '10 min read',
    },
    {
      id: 'post-6',
      title: 'The Economics of Airport Automation',
      excerpt: 'Analysis of the financial impact of automation technologies on airport operations and revenue generation.',
      date: 'May 25, 2022',
      author: 'Danush Krishna',
      authorRole: 'CFO & Co-Founder',
      category: 'industry',
      image: '/placeholder.svg',
      readTime: '9 min read',
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="heading-lg text-gray-900 mb-6">
                VirtusCo <span className="text-virtus-primary">Blog</span>
              </h1>
              <p className="subtitle text-gray-600 mb-8">
                Insights, updates, and perspectives on autonomous technology, airport innovation, and the future of travel.
              </p>
              <div className="w-full max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full px-4 py-3 pr-10 rounded-full border border-gray-200 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section ref={sectionRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories */}
            <div className="flex flex-wrap justify-center mb-12 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-virtus-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <div 
                    key={post.id}
                    className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 transform ${
                      isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${150 * index}ms` }}
                  >
                    <div className="relative">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                        <div className="w-full h-full bg-gradient-to-br from-virtus-primary/10 to-virtus-accent/10 flex items-center justify-center">
                          <div className="text-3xl text-virtus-primary/30 font-bold">VirtusCo</div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-virtus-primary">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-virtus-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-virtus-primary">
                              {post.author.split(' ').map(name => name[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.authorRole}</p>
                          </div>
                        </div>
                        
                        <Button variant="link" className="p-0">
                          Read more
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center">
                  <div className="text-4xl text-gray-300 mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    We couldn't find any posts matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <a href="#" className="inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-virtus-primary">
                    1
                  </a>
                  <a href="#" className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-virtus-primary">
                    2
                  </a>
                  <a href="#" className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-virtus-primary">
                    3
                  </a>
                  <a href="#" className="inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </a>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8 md:p-12 md:flex items-center justify-between">
                <div className="md:max-w-2xl mb-8 md:mb-0">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-virtus-primary/10 text-virtus-primary mb-4">
                    Stay Updated
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h2>
                  <p className="text-gray-600 text-lg">
                    Get the latest insights, updates, and industry news delivered to your inbox.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input
                      type="email"
                      className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-virtus-primary focus:border-virtus-primary transition-colors"
                      placeholder="Your email address"
                    />
                    <Button size="lg">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
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

export default Blog;
