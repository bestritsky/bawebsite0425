import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, BookOpen, BarChart, Cpu, ChevronDown } from 'lucide-react';

function CollapsibleSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden transition-colors hover:bg-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left group"
      >
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0' }}
      >
        <div ref={contentRef} className="p-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

function AutomationsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
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
                <Sparkles className="w-16 h-16 text-blue-500/30" />
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text animate-gradient text-center">
            Learn What Business Automation Really Means
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-center">
            Our education center is designed to give you practical information about business automation without the hype or technical jargon. We believe in empowering you to make informed decisions, whether or not you decide to work with us.
          </p>
        </div>
      </section>

      {/* Collapsible Sections Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

          <CollapsibleSection title='"Plain English" Automation Series' icon={BookOpen}>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong>What Is Business Automation (Without the BS)</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Define automation in practical terms</li>
                  <li>Show examples of tasks that should and shouldn't be automated</li>
                  <li>Explain the difference between valuable automation and technology for its own sake</li>
                </ul>
              </li>
              <li>
                <strong>Why Most Automation Projects Fail</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Complex systems with poor interfaces</li>
                  <li>Solutions designed without understanding the business</li>
                  <li>Unrealistic expectations set by vendors</li>
                  <li>How to avoid these common pitfalls</li>
                </ul>
              </li>
              <li>
                <strong>The Truth About AI in Business Today</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>What current AI can reliably do</li>
                  <li>What current AI struggles with or can't do</li>
                  <li>Realistic expectation setting without the hype</li>
                  <li>Simple applications that actually deliver value</li>
                </ul>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Business Focus Masterclass Series" icon={BarChart}>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong>Understanding Your Business Process</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>How to map your current workflows</li>
                  <li>Identifying critical bottlenecks</li>
                  <li>Calculating the real cost of inefficiencies</li>
                  <li>Simple templates for process documentation</li>
                </ul>
              </li>
              <li>
                <strong>The 80/20 Rule of Business Improvement</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Finding the 20% of activities that create 80% of results</li>
                  <li>Identifying automation opportunities with highest ROI</li>
                  <li>Practical worksheet for analyzing your business</li>
                  <li>Case studies showing successful implementation</li>
                </ul>
              </li>
              <li>
                <strong>Pricing Your Products and Services Properly</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Understanding value-based pricing</li>
                  <li>How automation can support premium pricing</li>
                  <li>Calculating your true service delivery costs</li>
                  <li>Frameworks for testing different price points</li>
                </ul>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="Economic Response Section" icon={Cpu}>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong>Doing More With Less: Automation in Tough Times</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Cost-effective automation solutions</li>
                  <li>Prioritizing initiatives based on immediate ROI</li>
                  <li>Low-risk implementation approaches</li>
                  <li>Case study: How a struggling business turned around with targeted automation</li>
                </ul>
              </li>
              <li>
                <strong>Staying Competitive When Margins Are Tight</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Identifying automation that preserves margins</li>
                  <li>Improving customer experience without adding cost</li>
                  <li>Balancing efficiency with quality</li>
                  <li>Implementation timeline focused on quick wins</li>
                </ul>
              </li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="AI Demystified" icon={Sparkles}>
            <ul className="space-y-4 text-gray-300 list-disc list-inside ml-4">
              <li>What AI Really Can and Cannot Do For Your Business Today</li>
              <li>Understanding AI Without the Technical Background</li>
              <li>Legitimate Concerns About AI and How to Address Them</li>
              <li>How to Start Small With AI in Your Business</li>
            </ul>
          </CollapsibleSection>

        </div>
      </section>
    </div>
  );
}

export default AutomationsPage;