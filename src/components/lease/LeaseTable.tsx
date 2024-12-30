import { useEffect, useRef } from 'react';
import { LeaseSection } from './LeaseSection';
import { leaseSections } from './leaseData';

export const LeaseTable = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll position to 0 to show the leftmost content
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto -mx-2 sm:mx-0 scroll-smooth"
      >
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface">
              <th className="p-2 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-1/5">
                <span className="text-xs md:text-sm">Provision & Section</span>
              </th>
              <th className="p-2 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-2/5">
                <span className="text-xs md:text-sm">Key Terms</span>
              </th>
              <th className="p-2 md:p-4 text-left text-primary font-medium border-b border-accent/20">
                <span className="text-xs md:text-sm">Analysis & Context</span>
              </th>
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