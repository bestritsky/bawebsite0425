import React from 'react';
import { Sparkles, BookOpen, BarChart, Cpu } from 'lucide-react';

interface TopicProps {
  title: string;
  items: string[];
}

function TopicPanel({ title, items }: TopicProps) {
  return (
    <div className="relative p-6 bg-black/60 backdrop-blur-lg rounded-2xl transition-all duration-300 transform hover:bg-black/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 group overflow-hidden">
      {/* Blue border on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/70 group-hover:bg-blue-400"></div>

      <h3 className="text-xl font-bold mb-4 text-blue-400 group-hover:text-blue-300 transition-all duration-300">
        {title}
      </h3>
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionPanel({
  title,
  icon: Icon,
  topics,
}: {
  title: string;
  icon: any;
  topics: TopicProps[];
}) {
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:bg-black/60 border border-gray-800 hover:border-blue-500/30">
      <div className="p-6 flex items-center gap-4">
        <Icon className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 p-6 pt-0">
        {topics.map((topic, index) => (
          <TopicPanel key={index} title={topic.title} items={topic.items} />
        ))}
      </div>
    </div>
  );
}

function EducationPage() {
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

      {/* Floating Panels Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

          <SectionPanel
            title='"Plain English" Automation Series'
            icon={BookOpen}
            topics={[
              {
                title: "What Is Business Automation (Without the BS)",
                items: [
                  "Define automation in practical terms",
                  "Show examples of tasks that should and shouldn't be automated",
                  "Explain the difference between valuable automation and technology for its own sake"
                ]
              },
              {
                title: "Why Most Automation Projects Fail",
                items: [
                  "Complex systems with poor interfaces",
                  "Solutions designed without understanding the business",
                  "Unrealistic expectations set by vendors",
                  "How to avoid these common pitfalls"
                ]
              },
              {
                title: "The Truth About AI in Business Today",
                items: [
                  "What current AI can reliably do",
                  "What current AI struggles with or can't do",
                  "Realistic expectation setting without the hype",
                  "Simple applications that actually deliver value"
                ]
              }
            ]}
          />

          <SectionPanel
            title="Business Focus Masterclass Series"
            icon={BarChart}
            topics={[
              {
                title: "Understanding Your Business Process",
                items: [
                  "How to map your current workflows",
                  "Identifying critical bottlenecks",
                  "Calculating the real cost of inefficiencies",
                  "Simple templates for process documentation"
                ]
              },
              {
                title: "The 80/20 Rule of Business Improvement",
                items: [
                  "Finding the 20% of activities that create 80% of results",
                  "Identifying automation opportunities with highest ROI",
                  "Practical worksheet for analyzing your business",
                  "Case studies showing successful implementation"
                ]
              },
              {
                title: "Pricing Your Products and Services Properly",
                items: [
                  "Understanding value-based pricing",
                  "How automation can support premium pricing",
                  "Calculating your true service delivery costs",
                  "Frameworks for testing different price points"
                ]
              }
            ]}
          />

          <SectionPanel
            title="Economic Response Section"
            icon={Cpu}
            topics={[
              {
                title: "Doing More With Less: Automation in Tough Times",
                items: [
                  "Cost-effective automation solutions",
                  "Prioritizing initiatives based on immediate ROI",
                  "Low-risk implementation approaches",
                  "Case study: How a struggling business turned around with targeted automation"
                ]
              },
              {
                title: "Staying Competitive When Margins Are Tight",
                items: [
                  "Identifying automation that preserves margins",
                  "Improving customer experience without adding cost",
                  "Balancing efficiency with quality",
                  "Implementation timeline focused on quick wins"
                ]
              }
            ]}
          />

          <SectionPanel
            title="AI Demystified"
            icon={Sparkles}
            topics={[
              {
                title: "AI in Business Today",
                items: [
                  "What AI Really Can and Cannot Do For Your Business Today",
                  "Understanding AI Without the Technical Background",
                  "Legitimate Concerns About AI and How to Address Them",
                  "How to Start Small With AI in Your Business"
                ]
              }
            ]}
          />

        </div>
      </section>
    </div>
  );
}

export default EducationPage;
