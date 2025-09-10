"use client";

import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
];

/**
 * Navbar renders the top navigation bar with app name and links.
 */
export default function Navbar() {
  return (
    <header className="border-b bg-white/60 dark:bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-xl px-4">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="font-semibold text-primary">Guitar Teacher</Link>
          <nav className="flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}


