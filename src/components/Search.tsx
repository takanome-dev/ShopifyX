import { Dialog } from '@headlessui/react';
import React from 'react';

interface Props {
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

export default function Search({ onSearchClose, isSearchOpen }: Props) {
  if (!isSearchOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-10 transition ease-in-out bg-black/30"
        aria-hidden="true"
      />
      <Dialog
        open={isSearchOpen}
        onClose={onSearchClose}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20"
      >
        <div className="p-8">
          <h1 className="text-3xl">SEARCH</h1>
        </div>
      </Dialog>
    </>
  );
}
