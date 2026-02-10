import Link from "next/link";
import { GitHub, LinkedIn } from './Icons';
import { Mail } from 'lucide-react';

const FOOTER_LINKS = {
  me: [
    { label: "Hello", href: "#" },
    { label: "Projects", href: "#projects" },
  ],
  thisSite: [
    { label: "Source Code", href: "https://github.com/OgUrbana/matthewgajo.com" },
  ],
  elsewhere: [
    { label: "GitHub", href: "https://github.com/matthewgajo" },
    { label: "X", href: "https://x.com/matthewgajo" },
    { label: "LinkedIn", href: "https://linkedin.com/in/matthewgajo" },
  ],
} as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  const isExternal = (href: string) =>
    href.startsWith("http://") || href.startsWith("https://");

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-zinc-200">{title}</span>
      <ul className="flex flex-col gap-2">
        {links.map(({ label, href }) =>
          isExternal(href) ? (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 transition-colors duration-200 ease-out hover:text-emerald-400"
              >
                {label}
              </a>
            </li>
          ) : (
            <li key={label}>
              <Link
                href={href}
                className="text-sm text-zinc-400 transition-colors duration-200 ease-out hover:text-emerald-400"
              >
                {label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/40 px-4 py-12 md:py-16 mt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-zinc-200">
              Matthew Gajo
            </span>
            <span className="text-xs text-text-muted w-sm">Dedicated problem-solver — constantly learning, solving, and shipping meaningful solutions.</span>
          </div>
          <nav
            className="flex flex-wrap gap-x-12 gap-y-10 sm:gap-x-16"
            aria-label="Footer navigation"
          >
            <FooterColumn title="Me" links={FOOTER_LINKS.me} />
            <FooterColumn title="This site" links={FOOTER_LINKS.thisSite} />
            <FooterColumn title="Elsewhere" links={FOOTER_LINKS.elsewhere} />
          </nav>
        </div>
      </div>
      <div className="flex flex-col mx-auto max-w-7xl gap-2">
        <div className="flex justify-start">
          <Link
            href="https://github.com/matthewgajo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center size-9 rounded text-zinc-400 transition-colors duration-200 ease-out hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            <GitHub className="block size-5 shrink-0" style={{ transform: "translateZ(0)" }} />
          </Link>
          <Link
            href="https://linkedin.com/in/matthewgajo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center size-9 rounded text-zinc-400 transition-colors duration-200 ease-out hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            <LinkedIn className="block size-5 shrink-0" style={{ transform: "translateZ(0)" }} />
          </Link>
          <Link
            href="mailto:matthew.gajo@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center size-9 rounded text-zinc-400 transition-colors duration-200 ease-out hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            <Mail className="block size-5 shrink-0" style={{ transform: "translateZ(0)" }} />
          </Link>
        </div>
        <div className="text-xs text-text-muted">© 2025 Matthew Gajo. All rights reserved.</div>
      </div>
    </footer>
  );
}
