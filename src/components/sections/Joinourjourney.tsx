import Button from '../ui/Button';

const JoinOurJourney = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-black via-virtus-red-dark to-virtus-red rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex items-center justify-between">
            <div className="md:max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to join our investment journey?</h2>
              <p className="text-white/80 text-lg">
                Contact our investor relations team to explore opportunities and receive our latest investor materials.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button to="/contact" className="bg-white text-virtus-primary hover:bg-white/90" size="lg">
                Contact Investor Relations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOurJourney;