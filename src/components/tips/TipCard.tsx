import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface TipCardProps {
  category: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  image: string;
}

const TipCard = ({ category, title, description, readTime, date, image }: TipCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-none">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-highlight text-primary text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="px-0">
        <h3 className="text-[32px] leading-[1.2] font-medium text-primary mb-3">
          {title}
        </h3>
        <p className="text-lg text-muted mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-2 text-base text-muted">
          <Calendar className="h-5 w-5" />
          <span>{date}</span>
          <span className="mx-2">·</span>
          <span>{readTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipCard;