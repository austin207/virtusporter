import Button from '../ui/Button';

const JoinOurJourney = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#1d1d1f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
          Ready to join our investment journey?
        </h2>
        <p className="text-[#86868b] text-lg mb-10 max-w-2xl mx-auto">
          Contact our investor relations team to explore opportunities and receive our latest investor materials.
        </p>
        <Button to="/contact" className="bg-white text-[#1d1d1f] hover:bg-[#f5f5f7]" size="lg">
          Contact Investor Relations
        </Button>
      </div>
    </section>
  );
};

export default JoinOurJourney;