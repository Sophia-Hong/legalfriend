import { faqs } from "../data/faqData";

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center">
            <span className="text-sm">?</span>
          </div>
          <span className="text-sm text-secondary">Common Questions</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-6 ${faq.iconBg} rounded-full mb-6`} />
              <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
              <p className="text-secondary text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;