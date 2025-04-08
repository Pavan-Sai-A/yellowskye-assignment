"use client";

import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./fireBase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { NavItem } from "./common/NavItems";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          <Link href="/">YellowSkye</Link>
        </h1>

        <nav className="hidden md:flex space-x-6 ml-auto">
          <NavItem href="/" pathname={pathname} label="Projects" />
          <NavItem href="/map" pathname={pathname} label="View Map" />
          <NavItem href="/chart" pathname={pathname} label="View Chart" />
        </nav>

        <div className="relative ml-4" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 focus:outline-none cursor-pointer"
            aria-label="User menu"
          >
            <span className="text-sm font-semibold">P</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <nav className="md:hidden flex justify-around bg-gray-100 border-t py-2">
        <NavItem href="/" pathname={pathname} label="Projects" />
        <NavItem href="/map" pathname={pathname} label="Map" />
        <NavItem href="/chart" pathname={pathname} label="Chart" />
      </nav>
    </header>
  );
}
