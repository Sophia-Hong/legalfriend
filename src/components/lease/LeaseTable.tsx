import { LeaseSection } from './LeaseSection';
import { leaseSections } from './leaseData';
import { useEffect, useRef } from 'react';

export const LeaseTable = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the right on mobile devices when component mounts
    if (window.innerWidth < 640 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div ref={scrollContainerRef} className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[700px] relative">
          {/* Mobile View Hint */}
          <div className="sm:hidden absolute -top-4 right-4 text-xs text-secondary animate-bounce">
            ← Swipe to see more
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface">
                <th className="p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-1/4">Provision & Section</th>
                <th className="p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20">Key Terms</th>
                <th className="p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-1/3">Analysis & Context</th>
              </tr>
            </thead>
            <tbody>
              {leaseSections.map((section, index) => (
                <LeaseSection key={index} {...section} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};