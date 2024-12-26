import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-highlight text-primary text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2 hover:text-primary/80 transition-colors">
          {title}
        </h3>
        <p className="text-secondary mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipCard;