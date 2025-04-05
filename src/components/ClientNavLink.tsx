"use client";
import Link from "next/link";

interface ClientNavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ClientNavLink({ href, className, children, onClick }: ClientNavLinkProps) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}