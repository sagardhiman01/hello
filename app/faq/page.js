'use client';

export default function FAQ() {
  const faqs = [
    {
      question: "Are your jewelry pieces certified?",
      answer: "Yes, all our gold and diamond jewelry comes with authentic certifications from recognized laboratories. Silver pieces are hallmarked for purity."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping rates and delivery times vary by location and are calculated at checkout."
    },
    {
      question: "How should I care for my jewelry?",
      answer: "We recommend storing your jewelry in a cool, dry place, ideally in the original packaging. Avoid contact with perfumes, lotions, and harsh chemicals. For more details, check our Jewelry Care guide."
    },
    {
      question: "Can I customize a design?",
      answer: "We offer customization on select pieces. Please contact our concierge team with your requirements, and we'll be happy to assist you."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 7 days of delivery for unused items in original packaging. Custom-made pieces are not eligible for returns unless damaged."
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Support</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about our products and services.</p>
        </div>

        <div className="faq-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              background: 'var(--bg-card)', 
              padding: '2.5rem', 
              borderRadius: '1.5rem', 
              border: '1px solid var(--border-color)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.3rem', fontFamily: 'Outfit, sans-serif' }}>
                {faq.question}
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
