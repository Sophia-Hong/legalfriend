import { useEffect, useRef } from 'react';
import { LeaseSection } from './LeaseSection';
import { leaseSections } from './leaseData';

export const LeaseTable = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the left on component mount for mobile devices
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-accent/20">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto -mx-4 sm:-mx-2 scroll-smooth"
      >
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-surface">
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-[20%] sm:w-1/3 text-[13px] sm:text-sm whitespace-normal">Provision & Section</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 w-[40%] sm:w-1/3 text-[13px] sm:text-sm">Key Terms</th>
              <th className="p-2 sm:p-3 md:p-4 text-left text-primary font-medium border-b border-accent/20 text-[13px] sm:text-sm">Analysis & Context</th>
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