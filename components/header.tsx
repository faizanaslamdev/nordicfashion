'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from './search-bar';

export function Header() {
  const pathname = usePathname();

  const isSearchPage = pathname.startsWith('/search');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">◆</span>
            <span className="hidden sm:inline">Nordic Price</span>
          </Link>

          {/* Search Bar - Hidden on search page */}
          {!isSearchPage && (
            <div className="hidden flex-1 md:block md:max-w-sm">
              <SearchBar />
            </div>
          )}

          {/* Navigation */}
          <nav className="hidden gap-6 sm:flex">
            <Link
              href="/trending"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              All Products
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        {!isSearchPage && (
          <div className="pb-4 md:hidden">
            <SearchBar placeholder="Search..." />
          </div>
        )}
      </div>
    </header>
  );
}
