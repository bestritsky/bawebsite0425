import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Clock, TrendingUp, DollarSign, CheckCircle, Network,
  Sparkles, ArrowRight, Menu, X, Users, Shield,
  Phone, ChevronDown, MessageCircle, Target, Zap, Heart
} from 'lucide-react';

import AutomationsPage from './AutomationsPage';
import EducationPage from './EducationPage';
// Components
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-gray-300 hover:text-white transition-colors duration-200">
    {children}
  </Link>
);

const ValueCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
    <Icon className="w-12 h-12 text-blue-400 mb-4" />
    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const ProcessStep = ({ number, title, description }: {
  number: number;
  title: string;
  description: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className={`timeline-item ${isVisible ? 'animate' : ''} relative md:flex md:justify-center md:gap-8 md:even:flex-row-reverse`}
    >
      <div className={`absolute left-0 md:static flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 z-10`}>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] p-6 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition-all duration-300 group`}>
        <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-white transition-all duration-300">
          {title}
        </h4>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

const ChaosCard = ({ title, issue, solution }: { title: string; issue: string; solution: string }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
      {title}
    </h3>
    <div className="space-y-4">
      <div>
        <strong className="text-white block mb-2">Issue:</strong>
        <p className="text-gray-400">{issue}</p>
      </div>
      <div>
        <strong className="text-white block mb-2">Solution:</strong>
        <p className="text-gray-400">{solution}</p>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden transition-colors duration-300 hover:bg-white/10">
      <button
        className="w-full py-4 px-6 flex justify-between items-center text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0' }}
      >
        <div ref={contentRef} className="px-6 pb-4">
          <p className="text-gray-400 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const ValueItem = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300 group">
    <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
    <p className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">{title}</p>
  </div>
);

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="hexagon-grid absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                <Network className="w-16 h-16 text-blue-500/30" />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-gradient">
              Results First, AI Second
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-8">
              Cut through the chaos—We simplify your business and deliver measurable results without technical complexity.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mb-12">
              In today's economy, practical solutions matter more than flashy technology. We understand your business challenges, clarify your processes, and determine if automation can genuinely help.
            </p>

            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-lg group">
              <Sparkles className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              See How We've Helped Similar Businesses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Value Proposition Cards */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Clock}
              title="Time Recovery"
              description="Recover 15+ hours per week lost to manual tasks"
            />
            <ValueCard
              icon={TrendingUp}
              title="Increased Revenue"
              description="Convert more leads through consistent follow-up"
            />
            <ValueCard
              icon={DollarSign}
              title="Reduced Costs"
              description="Accomplish more without expanding your team"
            />
            <ValueCard
              icon={CheckCircle}
              title="Peace of Mind"
              description="Never worry about dropped balls or missed opportunities"
            />
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Our Process
          </h2>
          <div className="timeline-container relative space-y-12 md:space-y-24 max-w-5xl mx-auto">
            <ProcessStep
              number={1}
              title="Understand Your Business"
              description="We focus on your business needs, not your technology. Our first step is always about understanding your unique challenges and goals."
            />
            <ProcessStep
              number={2}
              title="Identify High-ROI Opportunities"
              description="We target automation that delivers real value, focusing on quick wins that make an immediate impact on your bottom line."
            />
            <ProcessStep
              number={3}
              title="Build Simple, Effective Systems"
              description="We create solutions that work without complexity, ensuring your team can easily adopt and maintain them."
            />
            <ProcessStep
              number={4}
              title="Train Your Team"
              description="We ensure your team actually uses the solutions through comprehensive training and ongoing support."
            />
            <ProcessStep
              number={5}
              title="Measure Real Results"
              description="We focus on tangible business impact, tracking and reporting on the metrics that matter most to your success."
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
            <div className="mb-8">
              <svg className="w-12 h-12 text-blue-400 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11H6C6 6.58172 9.58172 3 14 3V7C11.7909 7 10 8.79086 10 11Z" fill="currentColor"/>
                <path d="M24 11H20C20 6.58172 23.5817 3 28 3V7C25.7909 7 24 8.79086 24 11Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              "Working with [Your Company] helped us increase our lead response time from 24 hours to under 5 minutes. This simple change increased our sales conversion by 37% within the first month. What impressed me most was their honesty about what was worth automating and what wasn't."
            </p>
            <div className="text-gray-400">
              <p className="font-bold">John Smith</p>
              <p>CEO, Tech Solutions Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reducing Chaos Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Reducing Business Chaos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-16">
            Chaos arises from unclear processes, overwhelmed teams, uncertain decisions, and complex technology implementations. Our pragmatic approach prioritizes simplicity, clarity, measurable improvements, and team empowerment, turning your chaos into clarity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ChaosCard
              title="Operational Chaos"
              issue="Lack of structured processes or clear systems within a business. Employees unsure of their roles, tasks slipping through the cracks, inefficiencies piling up."
              solution="Establish clear, documented processes and streamlined workflows, clarifying roles and responsibilities to improve productivity and accountability."
            />
            <ChaosCard
              title="Decision-Making Chaos"
              issue="Feeling overwhelmed by too many choices or unclear next steps, especially around technology implementation."
              solution="Provide clear, simple decision-making frameworks and direct guidance on high-impact solutions."
            />
            <ChaosCard
              title="Implementation Chaos"
              issue="Introducing complex solutions that are difficult for teams to adopt and manage. Frustration from overly ambitious automation attempts."
              solution="Implement practical, user-friendly solutions with thorough training and continuous support."
            />
            <ChaosCard
              title="Market and Economic Chaos"
              issue="Uncertainty driven by economic fluctuations and external market pressures."
              solution="Develop agile, cost-effective solutions that enhance efficiency and adaptability."
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-16">
            Get answers to common questions about our services, process, and commitment to your success.
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FAQItem
                question="How quickly will I see results from your solutions?"
                answer="Typically, noticeable improvements occur within weeks, with significant business outcomes evident within 1-3 months."
              />
              <FAQItem
                question="Will your solutions replace my employees?"
                answer="No, our solutions empower your existing team by removing repetitive tasks, allowing them to focus on strategic and impactful activities."
              />
              <FAQItem
                question="Do I need technical knowledge to implement these solutions?"
                answer="Not at all. We handle the technical complexities, ensuring simplicity and ease of use for you and your team."
              />
              <FAQItem
                question="How do you guarantee measurable results?"
                answer="We identify clear, quantifiable metrics upfront, ensuring accountability and measurable outcomes."
              />
              <FAQItem
                question="What if the solution doesn't deliver the expected results?"
                answer="We provide ongoing support and adjustments until we achieve the agreed outcomes."
              />
              <FAQItem
                question="Are there hidden costs in your services?"
                answer="No hidden costs—our pricing is transparent and clearly outlined upfront."
              />
              <FAQItem
                question="How involved does my team need to be?"
                answer="We keep your team engaged minimally, focusing on thorough training and straightforward adoption."
              />
              <FAQItem
                question="Do your services require a long-term commitment?"
                answer="We offer flexible engagement options, from short-term projects to ongoing partnerships, depending on your needs."
              />
              <FAQItem
                question="Can you work with our existing systems and tools?"
                answer="Absolutely. Our solutions seamlessly integrate with your current technology stack."
              />
              <FAQItem
                question="Will this disrupt our daily operations?"
                answer="We use phased implementations designed to minimize disruption and maximize smooth transitions."
              />
            </div>
            <div className="space-y-4">
              <FAQItem
                question="How do you manage resistance to change?"
                answer="Through clear communication, training, and emphasizing the immediate personal and business benefits to your team."
              />
              <FAQItem
                question="What ongoing support do you provide after implementation?"
                answer="We offer continuous support, regular check-ins, and optimization sessions to ensure sustained success."
              />
              <FAQItem
                question="How secure are the systems you implement?"
                answer="Security is our top priority. We follow industry-best security practices to protect your data and privacy."
              />
              <FAQItem
                question="Do you offer customized solutions?"
                answer="Yes, every solution is tailored specifically to your business needs and goals."
              />
              <FAQItem
                question="How do we get started with your services?"
                answer="Begin with a simple discovery call, where we discuss your challenges and opportunities clearly and transparently."
              />
              <FAQItem
                question="What kind of ROI can we realistically expect?"
                answer="Our clients typically experience at least a 3X return on investment within months of implementation."
              />
              <FAQItem
                question="How do you measure customer satisfaction?"
                answer="Through direct feedback, regular reviews, and clear, consistent communication."
              />
              <FAQItem
                question="Can small businesses benefit from your solutions?"
                answer="Absolutely. We tailor our services specifically to your size, ensuring affordability and practical impact."
              />
              <FAQItem
                question="Why should I trust you with my business?"
                answer="Transparency, proven results, and genuine empathy underpin our approach, building lasting trust and partnerships."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Let's have a conversation about your business goals and how we can help you achieve them.
            </p>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-lg mx-auto group">
              <Phone className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              Schedule a Discovery Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
          <div className="hexagon-grid absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                <Heart className="w-16 h-16 text-blue-500/30" />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text animate-gradient">
              Why I Started This Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              I started this company after seeing businesses struggle with expensive technology that didn't solve their problems. Most businesses need practical solutions, not flashy AI or complex systems. We focus on simple solutions that actually work, not impressive demos that fail in practice.
            </p>
          </div>
        </div>
      </div>

      {/* No BS Values Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            "No BS" Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ValueItem
              icon={MessageCircle}
              title="Speak plainly, not in technical jargon"
            />
            <ValueItem
              icon={Target}
              title="Focus on business results, not flashy technology"
            />
            <ValueItem
              icon={Shield}
              title="Honesty about project viability"
            />
            <ValueItem
              icon={Users}
              title="Systems your team can easily adopt"
            />
            <ValueItem
              icon={Zap}
              title="Success measured by your outcomes"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                <img src="/images/leaf-logo.png" alt="AI Sherpas Logo" className="w-8 h-8" />
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  AI Sherpas
                </span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/education">Education</NavLink>
                <NavLink to="/automations">Automations</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <button className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Book a Call
                </button>
              </div>
            </div>

            {/* Mobile navigation */}
            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? 'max-h-64 opacity-100'
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="py-4 space-y-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/education">Education</NavLink>
                <NavLink to="/automations">Automations</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <button className="w-full px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4" />
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/automations" element={<AutomationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;