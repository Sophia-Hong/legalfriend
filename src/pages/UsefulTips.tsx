import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TipCard from "@/components/tips/TipCard";
import { useState } from "react";

const tips = [
  {
    id: 1,
    category: "Lease Basics",
    title: "Understanding Your Lease Agreement: A Complete Guide",
    description: "Learn the essential components of a lease agreement and what to look for before signing.",
    readTime: "8 min read",
    date: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000"
  },
  {
    id: 2,
    category: "Tenant Rights",
    title: "Know Your Rights: A Guide for Tenants in the USA",
    description: "Understand your legal rights as a tenant and how to protect yourself in any rental situation.",
    readTime: "10 min read",
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000"
  },
  {
    id: 3,
    category: "Financial Planning",
    title: "Budgeting for Your First Apartment: Hidden Costs to Consider",
    description: "A comprehensive guide to all the costs involved in renting, beyond just the monthly rent.",
    readTime: "6 min read",
    date: "Mar 5, 2024",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000"
  },
  {
    id: 4,
    category: "Moving Tips",
    title: "The Ultimate Moving Checklist for Renters",
    description: "Step-by-step guide to ensure a smooth transition to your new rental home.",
    readTime: "7 min read",
    date: "Mar 1, 2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
  }
];

const UsefulTips = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium tracking-tight text-primary mb-6">
            Resources
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Expert insights and practical guides to help you navigate the rental process with confidence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-4 top-3 h-5 w-5 text-secondary" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-12 h-12 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tips Grid */}
        <ScrollArea className="h-[800px] pr-6">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredTips.map((tip) => (
              <TipCard key={tip.id} {...tip} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsefulTips;