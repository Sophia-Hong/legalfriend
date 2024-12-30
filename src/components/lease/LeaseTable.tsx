import { useEffect, useRef } from 'react';
import { LeaseSection } from './LeaseSection';
import { leaseSections } from './leaseData';

export const LeaseTable = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the right on component mount for mobile devices
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto -mx-4 sm:mx-0 scroll-smooth"
      >
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-surface">
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-[25%] sm:w-1/4">Provision & Section</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-[30%] sm:w-2/5">Key Terms</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20">Analysis & Context</th>
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
  );
};