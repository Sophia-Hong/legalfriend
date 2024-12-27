import React from 'react';

const LeaseCallToAction = () => {
  return (
    <div className="text-center mt-4">
      <button className="inline-flex items-center gap-2 bg-highlight text-primary px-6 py-3 rounded-lg font-medium hover:bg-highlight/90 transition-colors">
        Review Your Lease Now
      </button>
      <p className="mt-3 text-sm text-secondary">
        Get your complete lease analysis in minutes
      </p>
    </div>
  );
};

export default LeaseCallToAction;