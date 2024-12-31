import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface TipCardProps {
  category: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  image: string;
  slug?: string;
}

const TipCard = ({ category, title, description, readTime, date, image, slug }: TipCardProps) => {
  const content = (
    <Card className="overflow-hidden border-none shadow-none group">
      <div className="relative h-[240px] overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-highlight text-primary text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="px-0">
        <h3 className="text-2xl font-medium text-primary mb-2 group-hover:text-primary/80 transition-colors">
          {title}
        </h3>
        <p className="text-secondary mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
          <span className="mx-2">·</span>
          <span>{readTime}</span>
        </div>
      </CardContent>
    </Card>
  );

  return slug ? (
    <Link to={`/blog/${slug}`} className="block">
      {content}
    </Link>
  ) : (
    content
  );
};

export default TipCard;