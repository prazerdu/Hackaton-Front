"use client";

import Logo from '@/components/shadcn-studio/logo';
import { ModeToggle } from '@/components/theme-toggle';

export const SimpleHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-background/90 backdrop-blur-md shadow-sm">
      {/* Logo */}
      <Logo />

      {/* Botão de troca de tema */}
      <ModeToggle />
    </header>
  );
};
