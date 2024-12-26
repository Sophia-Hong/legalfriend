const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[#F8FAFF]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, #E2E8F3 2px, transparent 2px)`,
          backgroundSize: '48px 48px',
          opacity: 0.5
        }}></div>
      </div>

      {/* Floating circles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-white border-2 border-gray-200"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-white border-2 border-gray-200"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-white border-2 border-gray-200"></div>
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-[80px] leading-[1] font-medium tracking-[-0.02em] text-[#141413] mb-8">
          Save time &<br />money on AWS
        </h1>
        
        <div className="max-w-[600px] mx-auto mb-12">
          <p className="text-xl text-[#141413]/80">
            Savings, visibility, and infrastructure guardrails.
            <br />
            One automated platform.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#F2FF44] text-[#141413] px-6 py-3 rounded-lg font-medium hover:bg-[#E6FF00] transition-colors mb-12">
          <span className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Book a demo
        </button>

        <div className="max-w-[800px] mx-auto border-4 border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <img 
            src="https://antimetal.com/images/hero/preview.png" 
            alt="Antimetal Demo Preview" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;