import { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <ul className="space-y-3 text-accent">
        {children}
      </ul>
    </div>
  );
};

export default FooterSection;