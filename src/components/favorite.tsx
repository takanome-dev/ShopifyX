import { Heart } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/merge-classnames';

interface FavoriteProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Favorite = ({ className, color, ...props }: FavoriteProps) => (
  <Button
    className={cn(
      'absolute top-4 right-4 rounded-full py-4 px-2 border',
      className
    )}
    {...props}
  >
    <Heart className={cn('w-6 text-slate-500 h-6', color)} />
  </Button>
);

export default Favorite;
