"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 z-50 flex w-full justify-between px-8 py-6 mix-blend-difference">
            <Link href="/" className="text-sm font-medium uppercase tracking-widest text-primary hover:text-accent">
                Emmanuel
            </Link>
            <div className="flex gap-8">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx(
                            "text-sm font-light uppercase tracking-widest transition-colors hover:text-accent",
                            pathname === link.href ? "text-accent" : "text-primary/60"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
