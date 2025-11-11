import { lazy, Suspense } from 'react';

const FoodCard = lazy(() => import('./FoodCard').then(module => ({
  default: module.FoodCard
})));

interface LazyFoodCardProps {
  food: any;
  onEdit: (food: any) => void;
  onDelete: (food: any) => void;
  index: number;
}

export const LazyFoodCard: React.FC<LazyFoodCardProps> = (props) => {
  return (
    <Suspense 
      fallback={
        <div className="food-card-skeleton rounded-2xl bg-gray-200 animate-pulse h-80">
          <div className="h-48 bg-gray-300 rounded-2xl"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      }
    >
      <FoodCard {...props} />
    </Suspense>
  );
};