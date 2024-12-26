const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24">
      <div className="absolute inset-0 bg-secondary/30">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6">
          Lease Contract<br />Review Assistant
        </h1>
        
        <div className="max-w-[600px] mx-auto mb-12">
          <p className="text-xl text-gray-600">
            AI-powered lease contract analysis.
            <br />
            Fast, accurate, and reliable.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-accent text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-accent/90 transition-colors mb-16">
          Upload Contract
        </button>

        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="/lovable-uploads/be11a140-3975-4c88-ae26-f8a7f7850894.png" 
              alt="Contract Analysis Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;