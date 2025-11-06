import { Star } from "lucide-react";

interface GoogleReviewsProps {
  rating?: number;
  reviewCount?: number;
  googleMapsUrl?: string;
}

export function GoogleReviews({ 
  rating = 4.8, 
  reviewCount = 47,
  googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Pottenbakkerij+de+Graal+Nijmegen"
}: GoogleReviewsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300 group border border-border"
    >
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="h-5 w-5 fill-amber-400 text-amber-400"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <Star className="h-5 w-5 text-gray-300" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
              </div>
            );
          } else {
            return (
              <Star
                key={i}
                className="h-5 w-5 text-gray-300"
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-lg text-charcoal">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
          Google Reviews
        </span>
      </div>
    </a>
  );
}
