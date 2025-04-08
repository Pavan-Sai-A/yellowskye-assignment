import Link from "next/link";

export function NavItem({
  href,
  pathname,
  label,
}: Readonly<{
  href: string;
  pathname: string;
  label: string;
}>) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm transition font-medium ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
