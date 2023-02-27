import React from 'react';
import { FaRegHeart } from 'react-icons/fa';

interface FavIconProps extends React.HTMLProps<HTMLButtonElement> {
  color?: string;
}

const FavIcon = ({ color = 'text-gray-700', className }: FavIconProps) => {
  const classes = `p-4 hover:bg-gray-200 absolute rounded-full ${className!}`;

  return (
    <button type="button" className={classes}>
      <FaRegHeart size={20} className={color} />
    </button>
  );
};

export default FavIcon;
