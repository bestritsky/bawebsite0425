import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart,
  BarChart2,
  Database,
  Briefcase,
  MessageSquare,
  Clock,
  Search,
  Filter,
  X,
  ChevronRight,
  Cpu,
  Users,
  DollarSign,
  Star
} from 'lucide-react';

// Define the structure of an automation item
interface AutomationItem {
  id: string;
  title: string;
  description: string;
  primaryBenefit: string; // first benefit focus, for compatibility
  primaryBenefits: string[]; // all benefit focuses
  tags: string[];
  category: string; // derived from tags or default
}

// Define the props for the AutomationCard component
interface AutomationCardProps {
  automation: AutomationItem;
  index: number;
}

// Component for displaying a single automation card
const AutomationCard: React.FC<AutomationCardProps> = ({ automation }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Get icon based on category
  const getIcon = () => {
    switch (automation.category) {
      case 'Sales & CRM':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'Marketing & Content Creation':
        return <BarChart2 className="w-5 h-5 text-purple-400" />;
      case 'Operations & Productivity':
        return <Clock className="w-5 h-5 text-green-400" />;
      case 'Data Integration & Management':
        return <Database className="w-5 h-5 text-yellow-400" />;
      case 'IT, HR, and Finance':
        return <Briefcase className="w-5 h-5 text-red-400" />;
      case 'E-commerce':
        return <ShoppingCart className="w-5 h-5 text-pink-400" />;
      default:
        return <Database className="w-5 h-5 text-gray-400" />;
    }
  };

  // Get color class based on primary benefit
  const getBenefitColorClass = () => {
    switch (automation.primaryBenefit) {
      case 'Productivity':
        return 'bg-green-500/20 text-green-300';
      case 'Sales':
        return 'bg-blue-500/20 text-blue-300';
      case 'Cost Savings':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative p-6 bg-black/60 backdrop-blur-lg rounded-2xl transition-all duration-500
                 transform hover:bg-black/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20
                 opacity-0 translate-y-8 group overflow-hidden cursor-pointer stagger-animation`}
    >
      {/* Blue border on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/70 group-hover:bg-blue-400"></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-black/50">
            {getIcon()}
          </div>
          <h3 className="text-lg font-bold text-blue-400 group-hover:text-blue-300 transition-all duration-300 pr-4">
            {automation.title}
          </h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getBenefitColorClass()} font-medium`}>
          {automation.primaryBenefit}
        </span>
      </div>

      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm mb-4">
        {automation.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">{automation.category}</span>
        <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
          Learn more
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

// Main component for the automation gallery
const AutomationGallery: React.FC = () => {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<string>('');
  const [automations, setAutomations] = useState<AutomationItem[]>([]);
  const [filteredAutomations, setFilteredAutomations] = useState<AutomationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Categories and benefits are now hardcoded in the UI with icons and colors

  // Sample automation data
  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/Files/automations.json');
        const json = await response.json();

        const knownCategories = [
          'Sales & CRM',
          'Marketing',
          'Operations',
          'Data',
          'IT',
          'HR',
          'Finance',
          'E-commerce'
        ];

        const categoryMap: Record<string, string> = {
          'Sales & CRM': 'Sales & CRM',
          'Marketing': 'Marketing & Content Creation',
          'Operations': 'Operations & Productivity',
          'Data': 'Data Integration & Management',
          'IT': 'IT',
          'HR': 'HR',
          'Finance': 'Finance',
          'E-commerce': 'E-commerce'
        };

        const data: AutomationItem[] = json.map((item: any, index: number) => {
          const title = item['Automation Title'] || '';
          const description = item['Benefit Description'] || '';

          const primaryBenefits = item['Primary Benefit Focus']
            ? item['Primary Benefit Focus'].split(',').map((s: string) => s.trim())
            : [];

          const tags = item['Tags']
            ? item['Tags'].split(',').map((s: string) => s.trim())
            : [];

          // Derive category from tags
          let category = 'Other';
          for (const cat of knownCategories) {
            if (tags.includes(cat)) {
              category = categoryMap[cat];
              break;
            }
          }
          if (category === 'Other' && tags.length > 0) {
            category = tags[0];
          }

          return {
            id: crypto.randomUUID ? crypto.randomUUID() : `${index}`,
            title,
            description,
            primaryBenefits,
            primaryBenefit: primaryBenefits[0] || '',
            tags,
            category
          };
        });

        setAutomations(data);
        setFilteredAutomations(data);
      } catch (error) {
        console.error('Error fetching automations.json:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAutomations();
  }, []);

  // Helper function to get color class for category
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'Sales & CRM':
        return 'bg-blue-500/30 text-blue-100';
      case 'Marketing & Content Creation':
        return 'bg-purple-500/30 text-purple-100';
      case 'Operations & Productivity':
        return 'bg-green-500/30 text-green-100';
      case 'Data Integration & Management':
        return 'bg-yellow-500/30 text-yellow-100';
      case 'IT':
        return 'bg-red-500/30 text-red-100';
      case 'HR':
        return 'bg-indigo-500/30 text-indigo-100';
      case 'Finance':
        return 'bg-emerald-500/30 text-emerald-100';
      case 'E-commerce':
        return 'bg-pink-500/30 text-pink-100';
      default:
        return 'bg-gray-500/30 text-gray-100';
    }
  };

  // Helper function to get color class for benefit
  const getBenefitColorClass = (benefit: string) => {
    switch (benefit) {
      case 'Productivity':
        return 'bg-green-500/30 text-green-100';
      case 'Sales':
        return 'bg-blue-500/30 text-blue-100';
      case 'Cost Savings':
        return 'bg-yellow-500/30 text-yellow-100';
      default:
        return 'bg-gray-500/30 text-gray-100';
    }
  };

  // Filter automations based on search term and selected filters
  useEffect(() => {
    let filtered = automations;

    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category));
    }

    if (selectedBenefit) {
      filtered = filtered.filter(item =>
        item.primaryBenefits.includes(selectedBenefit)
      );
    }

    setFilteredAutomations(filtered);
  }, [searchTerm, selectedCategories, selectedBenefit, automations]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedBenefit('');
  };

  return (
    <div className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Automation Gallery
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our collection of powerful automation templates that can transform your business operations.
            Filter by category or benefit to find the perfect solution.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                placeholder="Search automations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-blue-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white shadow-sm shadow-blue-500/20 transition-all duration-300 hover:border-blue-400/70"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {(selectedCategories.length > 0 || selectedBenefit || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Visual Filter options */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 mb-8 border border-gray-800">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-3/4">
                  <h3 className="text-lg font-semibold mb-4 text-white inline-flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-400" />
                    Categories:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {/* Category buttons with icons and colors */}
                    <button
                      onClick={() => toggleCategory('Sales & CRM')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('Sales & CRM')
                        ? 'bg-blue-500/40 text-white ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-blue-400" />
                      </div>
                      <span>Sales & CRM</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('Marketing & Content Creation')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('Marketing & Content Creation')
                        ? 'bg-purple-500/40 text-white ring-2 ring-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
                        <BarChart2 className="w-3 h-3 text-purple-400" />
                      </div>
                      <span>Marketing</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('Operations & Productivity')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('Operations & Productivity')
                        ? 'bg-green-500/40 text-white ring-2 ring-green-500 shadow-lg shadow-green-500/20'
                        : 'bg-green-500/10 text-green-300 hover:bg-green-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-green-400" />
                      </div>
                      <span>Operations</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('Data Integration & Management')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('Data Integration & Management')
                        ? 'bg-yellow-500/40 text-white ring-2 ring-yellow-500 shadow-lg shadow-yellow-500/20'
                        : 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center">
                        <Database className="w-3 h-3 text-yellow-400" />
                      </div>
                      <span>Data</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('IT')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('IT')
                        ? 'bg-red-500/40 text-white ring-2 ring-red-500 shadow-lg shadow-red-500/20'
                        : 'bg-red-500/10 text-red-300 hover:bg-red-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center">
                        <Cpu className="w-3 h-3 text-red-400" />
                      </div>
                      <span>IT</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('HR')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('HR')
                        ? 'bg-indigo-500/40 text-white ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20'
                        : 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center">
                        <Users className="w-3 h-3 text-indigo-400" />
                      </div>
                      <span>HR</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('Finance')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('Finance')
                        ? 'bg-emerald-500/40 text-white ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span>Finance</span>
                    </button>

                    <button
                      onClick={() => toggleCategory('E-commerce')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategories.includes('E-commerce')
                        ? 'bg-pink-500/40 text-white ring-2 ring-pink-500 shadow-lg shadow-pink-500/20'
                        : 'bg-pink-500/10 text-pink-300 hover:bg-pink-500/20'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center">
                        <ShoppingCart className="w-3 h-3 text-pink-400" />
                      </div>
                      <span>E-commerce</span>
                    </button>
                  </div>
                </div>

                <div className="md:w-1/4">
                  <h3 className="text-lg font-semibold mb-4 text-white inline-flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Benefits:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedBenefit(selectedBenefit === 'Productivity' ? '' : 'Productivity')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedBenefit === 'Productivity'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'}`}
                    >
                      Productivity
                    </button>

                    <button
                      onClick={() => setSelectedBenefit(selectedBenefit === 'Sales' ? '' : 'Sales')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedBenefit === 'Sales'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'}`}
                    >
                      Sales
                    </button>

                    <button
                      onClick={() => setSelectedBenefit(selectedBenefit === 'Cost Savings' ? '' : 'Cost Savings')}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedBenefit === 'Cost Savings'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'}`}
                    >
                      Cost Savings
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400">
            Showing <span className="text-white font-medium">{filteredAutomations.length}</span> of {automations.length} automations
          </p>

          {/* Display active filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span key={category} className={`px-3 py-1 rounded-full text-sm flex items-center ${getCategoryColorClass(category)}`}>
                {category}
                <button onClick={() => toggleCategory(category)} className="ml-2 hover:bg-white/10 rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedBenefit && (
              <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getBenefitColorClass(selectedBenefit)}`}>
                {selectedBenefit}
                <button onClick={() => setSelectedBenefit('')} className="ml-2 hover:bg-white/10 rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-64 bg-black/40 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* No results state */}
            {filteredAutomations.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">No automations found</p>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              /* Automation cards grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAutomations.map((automation, index) => (
                  <AutomationCard
                    key={automation.id}
                    automation={automation}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AutomationGallery;


